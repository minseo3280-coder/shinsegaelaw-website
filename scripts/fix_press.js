/**
 * press.json 재파싱 — 상세 페이지를 다시 크롤링하여 정확한 제목/출처/조회수/변호사/본문 추출
 * Usage: node scripts/fix_press.js
 */
const https = require("https");
const fs = require("fs");
const path = require("path");

const BASE = "https://www.shinsegaelaw.kr";
const DATA_DIR = path.join(__dirname, "..", "data");
const IMG_DIR = path.join(__dirname, "..", "frontend", "public", "images", "press");
if (!fs.existsSync(IMG_DIR)) fs.mkdirSync(IMG_DIR, { recursive: true });

function fetchUrl(url, encoding = "utf-8") {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchUrl(res.headers.location, encoding).then(resolve).catch(reject);
      }
      const chunks = [];
      if (encoding === "binary") res.setEncoding("binary");
      res.on("data", (c) => chunks.push(c));
      res.on("end", () => resolve(encoding === "binary" ? Buffer.from(chunks.join(""), "binary") : chunks.join("")));
      res.on("error", reject);
    }).on("error", reject);
  });
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function decodeHtml(str) {
  return str
    .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(n));
}

function stripTags(html) {
  return html.replace(/<br\s*\/?>/gi, "\n").replace(/<[^>]+>/g, "").trim();
}

async function parseDetail(kid) {
  const url = `${BASE}/mediaReport/press_view.php?k_id=${kid}&mode=v`;
  const html = await fetchUrl(url);

  const result = { k_id: kid, title: "", date: "", source: "", lawyer: "", views: 0, content: "", images: [], localImages: [] };

  // 제목: <div class="viewlayout"> 내의 <h2>
  const titleMatch = html.match(/<div[^>]*class="viewlayout"[^>]*>[\s\S]*?<h2>([\s\S]*?)<\/h2>/i);
  if (titleMatch) result.title = decodeHtml(stripTags(titleMatch[1])).trim();

  // 매체
  const sourceMatch = html.match(/매체\s*<span>([^<]+)<\/span>/i);
  if (sourceMatch) result.source = decodeHtml(sourceMatch[1]).trim();

  // 등록일
  const dateMatch = html.match(/등록일\s*<span>([^<]+)<\/span>/i);
  if (dateMatch) result.date = dateMatch[1].trim();

  // 조회수
  const viewMatch = html.match(/조회수\s*<span>([\d,]+)<\/span>/i);
  if (viewMatch) result.views = parseInt(viewMatch[1].replace(/,/g, ""));

  // 변호사
  const lawyerMatch = html.match(/<dd>([^<]*변호사[^<]*)<\/dd>/i);
  if (lawyerMatch) result.lawyer = decodeHtml(lawyerMatch[1]).trim();

  // 본문: <div class="view"> 내부
  const viewMatch2 = html.match(/<div class="view">([\s\S]*?)(?:<div class="(?:file|btn_list|board_btn))/i)
    || html.match(/<div class="view">([\s\S]*?)<\/div>\s*(?:<div|<ul|<\/div>)/i);
  if (viewMatch2) {
    let content = viewMatch2[1]
      .replace(/<div class="videobox">[\s\S]*?<\/div>/gi, "") // 비디오박스 제거
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?<\/style>/gi, "");
    result.content = decodeHtml(stripTags(content)).replace(/\n{3,}/g, "\n\n").trim();
  }

  // 본문이 짧으면 더 넓은 패턴
  if (!result.content || result.content.length < 30) {
    const broader = html.match(/<div class="view">([\s\S]*?)<\/div>\s*<div/i);
    if (broader) {
      let content = broader[1]
        .replace(/<div class="videobox">[\s\S]*?<\/div>/gi, "")
        .replace(/<script[\s\S]*?<\/script>/gi, "");
      const text = decodeHtml(stripTags(content)).replace(/\n{3,}/g, "\n\n").trim();
      if (text.length > (result.content?.length || 0)) result.content = text;
    }
  }

  // 첨부파일 이미지
  const filePattern = /download\.php\?[^"']*k_bid=(\d+)[^"']*/gi;
  const files = new Set();
  let fm;
  while ((fm = filePattern.exec(html)) !== null) {
    files.add(fm[0]);
  }

  // 본문 내 이미지
  const imgPattern = /src=["']([^"']*(?:\/data\/|\/upload\/|\/board\/)[^"']*\.(?:jpg|jpeg|png|gif))["']/gi;
  let im;
  while ((im = imgPattern.exec(html)) !== null) {
    let imgUrl = im[1];
    if (!imgUrl.startsWith("http")) imgUrl = `${BASE}${imgUrl.startsWith("/") ? "" : "/"}${imgUrl}`;
    files.add(imgUrl);
  }

  result.images = [...files].map(f => f.startsWith("http") ? f : `${BASE}/${f}`);

  return result;
}

async function downloadImage(url, kid, idx) {
  try {
    const fullUrl = url.startsWith("http") ? url : `${BASE}/${url}`;
    const ext = ".jpg"; // 대부분 jpg
    const filename = `press-${kid}-${idx + 1}${ext}`;
    const filepath = path.join(IMG_DIR, filename);
    if (fs.existsSync(filepath) && fs.statSync(filepath).size > 500) return `/images/press/${filename}`;
    const data = await fetchUrl(fullUrl, "binary");
    if (data.length > 500) {
      fs.writeFileSync(filepath, data);
      return `/images/press/${filename}`;
    }
    return null;
  } catch {
    return null;
  }
}

async function main() {
  const existing = JSON.parse(fs.readFileSync(path.join(DATA_DIR, "press.json"), "utf-8"));
  const kids = existing.articles.map(a => a.k_id);

  console.log(`📰 ${kids.length}건 재파싱 시작\n`);

  const articles = [];
  const batchSize = 5;

  for (let i = 0; i < kids.length; i += batchSize) {
    const batch = kids.slice(i, i + batchSize);
    const results = await Promise.all(batch.map(async kid => {
      try { return await parseDetail(kid); }
      catch (e) { console.error(`  k_id=${kid} 에러:`, e.message); return { k_id: kid, title: "", content: "", error: e.message }; }
    }));
    articles.push(...results);

    if ((i + batchSize) % 100 === 0 || i + batchSize >= kids.length) {
      console.log(`  ${Math.min(i + batchSize, kids.length)}/${kids.length} 완료`);
    }
    await sleep(250);
  }

  // 이미지 다운로드
  console.log("\n📸 이미지 다운로드...");
  let imgCount = 0;
  for (const a of articles) {
    if (a.images && a.images.length > 0) {
      const locals = [];
      for (let j = 0; j < a.images.length; j++) {
        const lp = await downloadImage(a.images[j], a.k_id, j);
        if (lp) locals.push(lp);
        await sleep(80);
      }
      a.localImages = locals;
      imgCount += locals.length;
    } else {
      a.localImages = [];
    }
  }

  // 통계
  const withContent = articles.filter(a => a.content && a.content.length > 30).length;
  const withImages = articles.filter(a => a.localImages.length > 0).length;
  const sources = {};
  articles.forEach(a => { if (a.source) sources[a.source] = (sources[a.source] || 0) + 1; });

  const output = {
    meta: {
      total: articles.length,
      crawledAt: new Date().toISOString(),
      withContent,
      withImages,
      sources: Object.entries(sources).sort((a, b) => b[1] - a[1]).map(([name, count]) => ({ name, count })),
    },
    articles: articles.sort((a, b) => b.k_id - a.k_id),
  };

  fs.writeFileSync(path.join(DATA_DIR, "press.json"), JSON.stringify(output, null, 2), "utf-8");

  console.log(`\n✅ 완료!`);
  console.log(`  총 ${articles.length}건`);
  console.log(`  제목 있음: ${articles.filter(a => a.title && a.title.length > 5).length}건`);
  console.log(`  본문 있음: ${withContent}건`);
  console.log(`  이미지: ${imgCount}개`);
  console.log(`  출처 상위:`, Object.entries(sources).sort((a, b) => b[1] - a[1]).slice(0, 10));
}

main().catch(console.error);
