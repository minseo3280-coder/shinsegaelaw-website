/**
 * press.json 변호사 이름 전수 검증 + 수정
 * 원본 사이트에서 btn_person 영역의 변호사명을 추출하여 대조
 */
const https = require("https");
const fs = require("fs");
const path = require("path");

const DATA_PATH = path.join(__dirname, "..", "data", "press.json");
const data = JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));
const articles = data.articles;

let sessionCookie = "";

function httpsGet(url) {
  return new Promise((resolve, reject) => {
    const headers = {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      ...(sessionCookie ? { Cookie: sessionCookie } : {}),
    };
    const req = https.get(url, { headers, timeout: 15000 }, (res) => {
      const setCookies = res.headers["set-cookie"];
      if (setCookies) {
        sessionCookie = setCookies.map(c => c.split(";")[0]).join("; ");
      }
      const chunks = [];
      res.on("data", (c) => chunks.push(c));
      res.on("end", () => resolve(Buffer.concat(chunks).toString("utf-8")));
    });
    req.on("error", reject);
    req.on("timeout", () => { req.destroy(); reject(new Error("timeout")); });
  });
}

function extractLawyer(html) {
  // btn_person 패턴: <a ...class="btn_person"...>텍스트</a>
  const matches = [];
  const regex = /class="btn_person"[^>]*>([^<]+)</g;
  let m;
  while ((m = regex.exec(html)) !== null) {
    const name = m[1].trim();
    if (name) matches.push(name);
  }
  return matches;
}

async function run() {
  // 세션
  await httpsGet("https://www.shinsegaelaw.kr/mediaReport/presslist.php");
  console.log("세션 획득:", sessionCookie ? "OK" : "FAIL");

  const mismatches = [];
  let checked = 0;
  let matched = 0;

  for (let i = 0; i < articles.length; i++) {
    const a = articles[i];

    try {
      const html = await httpsGet(
        `https://www.shinsegaelaw.kr/mediaReport/press_view.php?k_id=${a.k_id}&mode=v`
      );
      const origLawyers = extractLawyer(html);
      const origStr = origLawyers.join(", ");

      checked++;

      if (origLawyers.length === 0) {
        // 원본에도 변호사 없음 — skip
      } else if (origStr !== a.lawyer && !origLawyers.includes(a.lawyer)) {
        mismatches.push({
          k_id: a.k_id,
          json: a.lawyer,
          original: origStr,
          origArray: origLawyers,
        });
        // 수정
        a.lawyer = origStr;
      } else {
        matched++;
      }

      if (checked % 50 === 0) {
        process.stdout.write(`\r[${checked}/${articles.length}] 불일치: ${mismatches.length}`);
      }
    } catch (err) {
      process.stdout.write(`\r[${checked}/${articles.length}] k_id=${a.k_id} ✗ ${err.message}`);
    }

    // 서버 부하 방지
    await new Promise(r => setTimeout(r, 150));

    // 50건마다 세션 갱신
    if (i > 0 && i % 100 === 0) {
      await httpsGet("https://www.shinsegaelaw.kr/mediaReport/presslist.php");
    }
  }

  console.log(`\n\n=== 변호사 검증 완료 ===`);
  console.log(`검증: ${checked}건`);
  console.log(`일치: ${matched}건`);
  console.log(`불일치: ${mismatches.length}건`);

  if (mismatches.length > 0) {
    console.log(`\n--- 불일치 목록 ---`);
    mismatches.forEach((m) => {
      console.log(`k_id=${m.k_id}: "${m.json}" → "${m.original}"`);
    });

    // 저장
    fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), "utf-8");
    console.log(`\npress.json 저장 완료 (${mismatches.length}건 수정)`);
  } else {
    console.log("모두 일치합니다!");
  }
}

run().catch(console.error);
