/**
 * 언론매체 전수 크롤링 스크립트
 * 1,010건 목록 + 상세 본문 + 첨부 이미지 전부 수집
 *
 * Usage: node scripts/crawl_press.js
 */

const https = require("https");
const http = require("http");
const fs = require("fs");
const path = require("path");

const BASE = "https://www.shinsegaelaw.kr";
const LIST_URL = (page) =>
  `${BASE}/mediaReport/presslist.php?selectvalue=&searchvalue=&page=${page}`;
const DETAIL_URL = (kid) =>
  `${BASE}/mediaReport/press_view.php?k_id=${kid}&mode=v&selectvalue=&searchvalue=&page=1`;

const DATA_DIR = path.join(__dirname, "..", "data");
const IMG_DIR = path.join(
  __dirname,
  "..",
  "frontend",
  "public",
  "images",
  "press"
);

// Ensure dirs
if (!fs.existsSync(IMG_DIR)) fs.mkdirSync(IMG_DIR, { recursive: true });

/* ── HTTP helper ── */
function fetch(url, encoding = "utf-8") {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith("https") ? https : http;
    mod
      .get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return fetch(res.headers.location, encoding).then(resolve).catch(reject);
        }
        const chunks = [];
        if (encoding === "binary") res.setEncoding("binary");
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => resolve(encoding === "binary" ? Buffer.from(chunks.join(""), "binary") : chunks.join("")));
        res.on("error", reject);
      })
      .on("error", reject);
  });
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

/* ── HTML 파싱 헬퍼 (정규식 기반, cheerio 없이) ── */
function decodeHtml(str) {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(n));
}

function stripTags(html) {
  return html.replace(/<br\s*\/?>/gi, "\n").replace(/<[^>]+>/g, "").trim();
}

/* ── STEP 1: 목록 크롤링 ── */
async function crawlList() {
  const allItems = [];
  let page = 1;
  let totalPages = 169; // 1010 / 6 ≈ 169

  console.log("=== STEP 1: 목록 크롤링 시작 ===");

  while (page <= totalPages) {
    try {
      const html = await fetch(LIST_URL(page));

      // 첫 페이지에서 총 건수 확인
      if (page === 1) {
        const totalMatch = html.match(/전체글\s*(\d[\d,]*)\s*건/);
        if (totalMatch) {
          const total = parseInt(totalMatch[1].replace(/,/g, ""));
          totalPages = Math.ceil(total / 6);
          console.log(`총 ${total}건, ${totalPages} 페이지`);
        }
      }

      // 게시글 링크에서 k_id 추출
      const linkPattern = /press_view\.php\?k_id=(\d+)/g;
      const ids = new Set();
      let m;
      while ((m = linkPattern.exec(html)) !== null) {
        ids.add(parseInt(m[1]));
      }

      // 각 게시글의 메타 정보 추출 (목록 카드에서)
      // 패턴: pressCard 또는 리스트 아이템
      const cardPattern =
        /press_view\.php\?k_id=(\d+)[^"]*"[^>]*>[\s\S]*?<\/a>/gi;
      let card;
      const pageIds = [...ids];

      for (const kid of pageIds) {
        if (!allItems.find((it) => it.k_id === kid)) {
          allItems.push({ k_id: kid });
        }
      }

      if (page % 10 === 0 || page === 1) {
        console.log(
          `  페이지 ${page}/${totalPages} — 누적 ${allItems.length}건`
        );
      }

      page++;
      await sleep(200); // 200ms 딜레이
    } catch (err) {
      console.error(`  페이지 ${page} 에러:`, err.message);
      await sleep(1000);
      page++;
    }
  }

  // k_id 내림차순 정렬
  allItems.sort((a, b) => b.k_id - a.k_id);
  console.log(`\n목록 크롤링 완료: ${allItems.length}건 ID 수집`);
  return allItems;
}

/* ── STEP 2: 상세 크롤링 ── */
async function crawlDetail(kid) {
  const html = await fetch(DETAIL_URL(kid));

  const result = {
    k_id: kid,
    title: "",
    date: "",
    source: "",
    lawyer: "",
    views: 0,
    content: "",
    images: [],
    category: "",
  };

  // 제목
  const titleMatch = html.match(
    /<h[23][^>]*class="[^"]*tit[^"]*"[^>]*>([\s\S]*?)<\/h[23]>/i
  ) || html.match(/<div[^>]*class="[^"]*view[_-]?tit[^"]*"[^>]*>([\s\S]*?)<\/div>/i)
    || html.match(/<div[^>]*class="[^"]*subject[^"]*"[^>]*>([\s\S]*?)<\/div>/i);
  if (titleMatch) {
    result.title = decodeHtml(stripTags(titleMatch[1]));
  }

  // 날짜
  const dateMatch = html.match(/(\d{4}\.\d{2}\.\d{2})/);
  if (dateMatch) result.date = dateMatch[1];

  // 출처 (미디어)
  const sourceMatch =
    html.match(/출처[^:：]*[:：]\s*([^<\n]+)/i) ||
    html.match(/media[^:：]*[:：]\s*([^<\n]+)/i) ||
    html.match(/<span[^>]*class="[^"]*source[^"]*"[^>]*>([^<]+)/i);
  if (sourceMatch) result.source = decodeHtml(stripTags(sourceMatch[1])).trim();

  // 조회수
  const viewMatch = html.match(/조회[^:：]*[:：]?\s*(\d[\d,]*)/);
  if (viewMatch) result.views = parseInt(viewMatch[1].replace(/,/g, ""));

  // 변호사
  const lawyerMatch = html.match(/(조인섭|김미루|류현주|신진희|조윤용|이명인|이준헌|박경내|임경미|홍수현|김나희|김수진|정은영|우진서|배수지|신고운|임형창|박선아|조용국)/);
  if (lawyerMatch) result.lawyer = lawyerMatch[1];

  // 본문 — 여러 패턴 시도
  const contentPatterns = [
    /<div[^>]*class="[^"]*view[_-]?con(?:tent)?[^"]*"[^>]*>([\s\S]*?)<\/div>\s*(?:<div[^>]*class="[^"]*(?:file|attach|btn|list))/i,
    /<div[^>]*class="[^"]*view[_-]?con(?:tent)?[^"]*"[^>]*>([\s\S]*?)<\/div>/i,
    /<div[^>]*class="[^"]*board[_-]?con(?:tent)?[^"]*"[^>]*>([\s\S]*?)<\/div>/i,
    /<td[^>]*class="[^"]*con(?:tent)?[^"]*"[^>]*>([\s\S]*?)<\/td>/i,
  ];

  for (const pattern of contentPatterns) {
    const match = html.match(pattern);
    if (match && match[1].length > 50) {
      result.content = decodeHtml(stripTags(match[1]))
        .replace(/\n{3,}/g, "\n\n")
        .trim();
      break;
    }
  }

  // content가 비어있으면 더 넓은 범위로 시도
  if (!result.content || result.content.length < 30) {
    // body 전체에서 긴 텍스트 블록 찾기
    const bodyMatch = html.match(/<body[\s\S]*<\/body>/i);
    if (bodyMatch) {
      // script, style, nav, header, footer 제거
      let cleaned = bodyMatch[0]
        .replace(/<script[\s\S]*?<\/script>/gi, "")
        .replace(/<style[\s\S]*?<\/style>/gi, "")
        .replace(/<nav[\s\S]*?<\/nav>/gi, "")
        .replace(/<header[\s\S]*?<\/header>/gi, "")
        .replace(/<footer[\s\S]*?<\/footer>/gi, "");

      // 가장 긴 텍스트 블록 찾기
      const blocks = cleaned.split(/<div[^>]*>/i);
      let longest = "";
      for (const block of blocks) {
        const text = decodeHtml(stripTags(block)).trim();
        if (text.length > longest.length && text.length > 100) {
          longest = text;
        }
      }
      if (longest.length > result.content.length) {
        result.content = longest.replace(/\n{3,}/g, "\n\n").trim();
      }
    }
  }

  // 이미지 — 본문 내 이미지 + 첨부파일
  const imgPattern = /(?:src|href)=["']([^"']*(?:\.jpg|\.jpeg|\.png|\.gif|\.webp)[^"']*)["']/gi;
  const foundImages = new Set();
  let imgMatch;
  while ((imgMatch = imgPattern.exec(html)) !== null) {
    let imgUrl = imgMatch[1];
    // 로고, 아이콘 등 제외
    if (
      imgUrl.includes("logo") ||
      imgUrl.includes("icon") ||
      imgUrl.includes("btn_") ||
      imgUrl.includes("bg_") ||
      imgUrl.includes("footer") ||
      imgUrl.includes("header") ||
      imgUrl.includes("banner") ||
      imgUrl.includes("searchBar") ||
      imgUrl.includes("allMenu") ||
      imgUrl.includes("person_icon") ||
      imgUrl.includes("phone_icon") ||
      imgUrl.includes("teleImg") ||
      imgUrl.includes("kakaotalk") ||
      imgUrl.includes("naver") ||
      imgUrl.includes("facebook") ||
      imgUrl.includes("google")
    ) continue;

    if (!imgUrl.startsWith("http")) {
      imgUrl = `${BASE}${imgUrl.startsWith("/") ? "" : "/"}${imgUrl}`;
    }
    foundImages.add(imgUrl);
  }
  result.images = [...foundImages];

  // 제목이 없으면 다른 패턴
  if (!result.title) {
    const altTitle = html.match(/<title>([^<]+)/i);
    if (altTitle) result.title = decodeHtml(altTitle[1]).replace(/\s*-\s*법무법인.*$/, "").trim();
  }

  return result;
}

/* ── STEP 3: 이미지 다운로드 ── */
async function downloadImage(url, kid, idx) {
  try {
    const ext = path.extname(new URL(url).pathname).split("?")[0] || ".jpg";
    const filename = `press-${kid}-${idx + 1}${ext}`;
    const filepath = path.join(IMG_DIR, filename);

    if (fs.existsSync(filepath)) return `/images/press/${filename}`;

    const data = await fetch(url, "binary");
    fs.writeFileSync(filepath, data);
    return `/images/press/${filename}`;
  } catch (err) {
    console.error(`    이미지 다운로드 실패: ${url} — ${err.message}`);
    return null;
  }
}

/* ── MAIN ── */
async function main() {
  console.log("📰 언론매체 전수 크롤링 시작\n");

  // Step 1: 목록
  const items = await crawlList();

  // Step 2: 상세
  console.log("\n=== STEP 2: 상세 크롤링 시작 ===");
  const articles = [];
  let count = 0;
  const batchSize = 5; // 동시 5건

  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    const results = await Promise.all(
      batch.map(async (item) => {
        try {
          const detail = await crawlDetail(item.k_id);
          return detail;
        } catch (err) {
          console.error(`  k_id=${item.k_id} 에러:`, err.message);
          return { k_id: item.k_id, title: "", content: "", error: err.message };
        }
      })
    );

    for (const r of results) {
      articles.push(r);
    }

    count += batch.length;
    if (count % 50 === 0 || count === items.length) {
      console.log(`  상세 ${count}/${items.length} 완료`);
    }

    await sleep(300);
  }

  // Step 3: 이미지 다운로드
  console.log("\n=== STEP 3: 이미지 다운로드 ===");
  let imgCount = 0;
  for (const article of articles) {
    if (article.images && article.images.length > 0) {
      const localPaths = [];
      for (let j = 0; j < article.images.length; j++) {
        const localPath = await downloadImage(article.images[j], article.k_id, j);
        if (localPath) localPaths.push(localPath);
        await sleep(100);
      }
      article.localImages = localPaths;
      imgCount += localPaths.length;
    } else {
      article.localImages = [];
    }
  }
  console.log(`이미지 ${imgCount}개 다운로드 완료`);

  // 통계
  const withContent = articles.filter((a) => a.content && a.content.length > 30).length;
  const withImages = articles.filter((a) => a.localImages && a.localImages.length > 0).length;
  const sources = {};
  articles.forEach((a) => {
    if (a.source) sources[a.source] = (sources[a.source] || 0) + 1;
  });

  // Save
  const output = {
    meta: {
      total: articles.length,
      crawledAt: new Date().toISOString(),
      withContent,
      withImages,
      sources: Object.entries(sources)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 20)
        .map(([name, count]) => ({ name, count })),
    },
    articles: articles.sort((a, b) => b.k_id - a.k_id),
  };

  fs.writeFileSync(
    path.join(DATA_DIR, "press.json"),
    JSON.stringify(output, null, 2),
    "utf-8"
  );

  console.log(`\n✅ 완료!`);
  console.log(`  총 ${articles.length}건`);
  console.log(`  본문 있음: ${withContent}건`);
  console.log(`  이미지 있음: ${withImages}건`);
  console.log(`  저장: data/press.json`);
  console.log(`  이미지: frontend/public/images/press/`);
}

main().catch(console.error);
