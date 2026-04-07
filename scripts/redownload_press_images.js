/**
 * 언론매체 이미지 재다운로드
 * 세션 쿠키 유지 + /lib/download.php 경로 사용
 */
const https = require("https");
const fs = require("fs");
const path = require("path");

const DATA_PATH = path.join(__dirname, "..", "data", "press.json");
const IMG_DIR = path.join(__dirname, "..", "frontend", "public", "images", "press");

const data = JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));
const articles = data.articles.filter(a => a.images && a.images.length > 0);

console.log(`이미지 있는 기사: ${articles.length}건`);

// 세션 쿠키 저장
let sessionCookie = "";

function httpsGet(url, options = {}) {
  return new Promise((resolve, reject) => {
    const headers = {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      ...(sessionCookie ? { Cookie: sessionCookie } : {}),
      ...options.headers,
    };
    const req = https.get(url, { headers, timeout: 15000 }, (res) => {
      // 쿠키 저장
      const setCookies = res.headers["set-cookie"];
      if (setCookies) {
        sessionCookie = setCookies.map(c => c.split(";")[0]).join("; ");
      }

      // 리다이렉트 처리
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let loc = res.headers.location;
        if (loc.startsWith("/")) loc = "https://www.shinsegaelaw.kr" + loc;
        return httpsGet(loc, options).then(resolve).catch(reject);
      }

      const chunks = [];
      res.on("data", (c) => chunks.push(c));
      res.on("end", () => resolve({ data: Buffer.concat(chunks), headers: res.headers, status: res.statusCode }));
    });
    req.on("error", reject);
    req.on("timeout", () => { req.destroy(); reject(new Error("timeout")); });
  });
}

async function getSession() {
  // 메인 페이지 방문해서 세션 쿠키 획득
  await httpsGet("https://www.shinsegaelaw.kr/mediaReport/presslist.php");
  console.log("세션 쿠키:", sessionCookie ? "획득" : "실패");
}

async function downloadImage(k_id, k_num, outPath) {
  // 먼저 상세페이지 방문 (세션 유지)
  await httpsGet(`https://www.shinsegaelaw.kr/mediaReport/press_view.php?k_id=${k_id}`);

  // 이미지 다운로드 - /lib/download.php 경로
  const url = `https://www.shinsegaelaw.kr/lib/download.php?k_table=kr_mediaboard&k_bid=${k_id}&k_num=${k_num}`;
  const res = await httpsGet(url);

  // JPEG/PNG/GIF 확인
  const magic = res.data.slice(0, 4);
  const isJPEG = magic[0] === 0xFF && magic[1] === 0xD8;
  const isPNG = magic[0] === 0x89 && magic[1] === 0x50;
  const isGIF = magic[0] === 0x47 && magic[1] === 0x49;

  if (!isJPEG && !isPNG && !isGIF) {
    return false; // HTML 에러 페이지
  }

  fs.writeFileSync(outPath, res.data);
  return true;
}

async function run() {
  await getSession();

  let success = 0, fail = 0, skip = 0;
  const total = articles.reduce((s, a) => s + a.images.length, 0);
  console.log(`총 이미지: ${total}개\n`);

  for (let ai = 0; ai < articles.length; ai++) {
    const article = articles[ai];
    for (let ii = 0; ii < article.images.length; ii++) {
      const localPath = article.localImages?.[ii];
      if (!localPath) continue;

      const outPath = path.join(IMG_DIR, path.basename(localPath));

      // 이미 유효한 이미지인지 확인
      if (fs.existsSync(outPath)) {
        const existing = fs.readFileSync(outPath);
        const m = existing.slice(0, 4);
        if ((m[0] === 0xFF && m[1] === 0xD8) || (m[0] === 0x89 && m[1] === 0x50) || (m[0] === 0x47 && m[1] === 0x49)) {
          skip++;
          continue;
        }
      }

      try {
        const ok = await downloadImage(article.k_id, ii, outPath);
        if (ok) {
          success++;
          process.stdout.write(`\r[${success + fail + skip}/${total}] k_id=${article.k_id} ✓ ${path.basename(outPath)}`);
        } else {
          fail++;
          // 깨진 파일 삭제
          if (fs.existsSync(outPath)) fs.unlinkSync(outPath);
          process.stdout.write(`\r[${success + fail + skip}/${total}] k_id=${article.k_id} ✗ HTML 응답`);
        }
      } catch (err) {
        fail++;
        process.stdout.write(`\r[${success + fail + skip}/${total}] k_id=${article.k_id} ✗ ${err.message}`);
      }

      // 서버 부하 방지
      await new Promise(r => setTimeout(r, 200));
    }

    // 50건마다 세션 갱신
    if (ai > 0 && ai % 50 === 0) {
      await getSession();
    }
  }

  console.log(`\n\n=== 완료 ===`);
  console.log(`성공: ${success}, 실패: ${fail}, 기존 유효: ${skip}`);
  console.log(`총: ${success + fail + skip}/${total}`);
}

run().catch(console.error);
