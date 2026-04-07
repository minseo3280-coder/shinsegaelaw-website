/**
 * 본문이 짧거나 잘린 케이스 재크롤링
 * - 150자 미만 또는 간략내용이 잘린 케이스 대상
 * - 더 공격적인 파싱으로 전체 본문 복원
 */
const https = require("https");
const fs = require("fs");
const path = require("path");

const BASE = "https://www.shinsegaelaw.kr";
const VIEW_URL = (k_id) =>
  `${BASE}/prevail/view.php?k_id=${k_id}&mode=v`;
const DATA_FILE = path.join(__dirname, "data", "cases_all.json");

function fetch(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400) {
          const loc = res.headers.location;
          return resolve(fetch(loc.startsWith("http") ? loc : BASE + loc));
        }
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => resolve(Buffer.concat(chunks).toString("utf-8")));
        res.on("error", reject);
      })
      .on("error", (err) => {
        setTimeout(() => resolve(fetch(url)), 2000); // retry once
      });
  });
}

function decode(s) {
  return s
    .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, " ")
    .replace(/&ndash;/g, "–").replace(/&mdash;/g, "—")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(parseInt(n)));
}

function strip(html) {
  return decode(
    html
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/p>/gi, "\n\n")
      .replace(/<\/div>/gi, "\n")
      .replace(/<\/li>/gi, "\n")
      .replace(/<\/h[1-6]>/gi, "\n\n")
      .replace(/<[^>]+>/g, "")
  ).replace(/[ \t]+/g, " ").replace(/\n /g, "\n").replace(/\n{3,}/g, "\n\n").trim();
}

async function fetchFullContent(k_id) {
  const html = await fetch(VIEW_URL(k_id));

  // Extract the entire content area between 승소일/조회수 and 목록/이전글
  // Strategy: find the main content div and extract everything

  const sections = {};

  // Method 1: Extract each section by its heading
  const sectionPatterns = [
    { key: "review", re: /담당\s*변호사\s*재판\s*후기[\s\S]*?<\/[^>]*>([\s\S]*?)(?=<[^>]*>\s*간략\s*내용|<[^>]*>\s*신세계로|$)/i },
    { key: "summary", re: /간략\s*내용[\s\S]*?<\/[^>]*>([\s\S]*?)(?=<[^>]*>\s*신세계로|<[^>]*>\s*주요\s*쟁점|<[^>]*>\s*결\s*과|$)/i },
    { key: "approach", re: /신세계로에서는[\s\S]*?<\/[^>]*>([\s\S]*?)(?=<[^>]*>\s*결\s*과|<div[^>]*class="[^"]*pvResult|$)/i },
    { key: "result", re: /(?:class="[^"]*pvResult[^"]*"[^>]*>|<[^>]*>\s*결\s*과\s*<\/[^>]*>)([\s\S]*?)(?=<div[^>]*class="[^"]*bot|<\/section|목록|이전글|<footer)/i },
  ];

  for (const { key, re } of sectionPatterns) {
    const m = html.match(re);
    if (m) {
      const text = strip(m[1]).trim();
      if (text.length > 5) sections[key] = text;
    }
  }

  // Method 2: Broader extraction if method 1 missed sections
  if (!sections.summary && !sections.approach) {
    // Try getting everything from after the lawyer info to the footer
    const broad = html.match(/(?:quote2\.png|담당\s*변호사)([\s\S]*?)(?:btn_list|목록|이전글|<footer)/i);
    if (broad) {
      const fullText = strip(broad[1]).trim();
      if (fullText.length > 100) {
        // Try to split into sections
        const reviewM = fullText.match(/([\s\S]*?)(?=간략\s*내용|$)/i);
        const summaryM = fullText.match(/간략\s*내용\s*([\s\S]*?)(?=신세계로에서는|주요\s*쟁점|결\s*과|$)/i);
        const approachM = fullText.match(/신세계로에서는\s*([\s\S]*?)(?=결\s*과|$)/i);
        const resultM = fullText.match(/결\s*과\s*([\s\S]*?)$/i);

        if (reviewM && !sections.review) sections.review = reviewM[1].trim();
        if (summaryM && !sections.summary) sections.summary = summaryM[1].trim();
        if (approachM && !sections.approach) sections.approach = approachM[1].trim();
        if (resultM && !sections.result) sections.result = resultM[1].trim();
      }
    }
  }

  // Build structured content
  const parts = [];
  if (sections.review) parts.push("【담당변호사 재판 후기】\n" + sections.review);
  if (sections.summary) parts.push("【간략내용】\n" + sections.summary);
  if (sections.approach) parts.push("【신세계로에서는】\n" + sections.approach);
  if (sections.result) parts.push("【결과】\n" + sections.result);

  const content = parts.join("\n\n");

  // Extract result separately
  let result = sections.result || "";

  // Extract lawyers
  const lawyers = [];
  const lawyerArea = html.match(/person_icon[\s\S]{0,600}/i) || html.match(/담당\s*변호사[\s\S]{0,600}/i);
  if (lawyerArea) {
    const lrx = /([가-힣]{2,4})\s+(?:대표|수석|책임|선임|변호사|팀장)/g;
    let lm;
    while ((lm = lrx.exec(lawyerArea[0])) !== null) {
      if (!lawyers.includes(lm[1])) lawyers.push(lm[1]);
    }
  }

  return { content, result, lawyers };
}

async function main() {
  const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));

  // Find cases that need fixing
  const needFix = data.cases.filter(c => {
    const content = c.content || "";
    // Short content
    if (content.length < 200) return true;
    // Truncated 간략내용
    const summaryMatch = content.match(/【간략내용】\n([\s\S]*?)(?=【|$)/);
    if (summaryMatch && summaryMatch[1].trim().length < 60) return true;
    // Missing sections
    if (!content.includes("【") && content.length < 400) return true;
    return false;
  });

  console.log("재크롤링 대상:", needFix.length, "건\n");

  let improved = 0, failed = 0, unchanged = 0;

  const BATCH = 5;
  for (let i = 0; i < needFix.length; i += BATCH) {
    const batch = needFix.slice(i, i + BATCH);

    const results = await Promise.all(batch.map(async (c) => {
      try {
        const fetched = await fetchFullContent(c.k_id);
        return { k_id: c.k_id, ...fetched };
      } catch (e) {
        failed++;
        return { k_id: c.k_id, content: "", result: "", lawyers: [] };
      }
    }));

    for (const r of results) {
      const idx = data.cases.findIndex(c => c.k_id === r.k_id);
      if (idx < 0) continue;

      const old = data.cases[idx];
      if (r.content.length > (old.content || "").length) {
        data.cases[idx].content = r.content;
        improved++;
      } else {
        unchanged++;
      }

      if (r.result && r.result.length > (old.result || "").length) {
        data.cases[idx].result = r.result;
      }
      if (r.lawyers.length > 0 && (!old.lawyers || old.lawyers.length === 0)) {
        data.cases[idx].lawyers = r.lawyers;
      }
    }

    if ((i + BATCH) % 50 === 0 || i + BATCH >= needFix.length) {
      console.log(`  ${Math.min(i + BATCH, needFix.length)}/${needFix.length} (improved: ${improved}, unchanged: ${unchanged}, failed: ${failed})`);
    }

    await new Promise(r => setTimeout(r, 300));
  }

  // Save
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");

  // Stats
  const lens = data.cases.map(c => (c.content || "").length);
  console.log(`\n=== 완료 ===`);
  console.log(`개선: ${improved}, 변경없음: ${unchanged}, 실패: ${failed}`);
  console.log(`평균 본문: ${Math.round(lens.reduce((a,b)=>a+b,0)/lens.length)}자`);
  console.log(`150자 미만: ${data.cases.filter(c => (c.content||"").length < 150).length}건`);
  console.log(`파일: ${(fs.statSync(DATA_FILE).size/1024/1024).toFixed(2)} MB`);
}

main().catch(console.error);
