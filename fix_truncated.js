/**
 * 간략내용이 잘린 케이스 전수 재크롤링
 * - 【간략내용】 섹션이 80자 미만인 케이스 대상
 * - 전체 HTML을 받아서 수동 파싱
 */
const https = require("https");
const fs = require("fs");
const path = require("path");

const BASE = "https://www.shinsegaelaw.kr";
const DATA_FILE = path.join(__dirname, "data", "cases_all.json");

function fetchPage(k_id) {
  return new Promise((resolve, reject) => {
    const url = `${BASE}/prevail/view.php?k_id=${k_id}&mode=v`;
    https.get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
      const chunks = [];
      res.on("data", c => chunks.push(c));
      res.on("end", () => resolve(Buffer.concat(chunks).toString("utf-8")));
      res.on("error", reject);
    }).on("error", reject);
  });
}

function decode(s) {
  return s.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, " ")
    .replace(/&ndash;/g, "–").replace(/&mdash;/g, "—")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(parseInt(n)));
}

function strip(html) {
  return decode(html.replace(/<br\s*\/?>/gi, "\n").replace(/<\/p>/gi, "\n\n")
    .replace(/<\/div>/gi, "\n").replace(/<\/li>/gi, "\n").replace(/<[^>]+>/g, ""))
    .replace(/[ \t]+/g, " ").replace(/\n /g, "\n").replace(/\n{3,}/g, "\n\n").trim();
}

async function fetchAndParse(k_id) {
  const html = await fetchPage(k_id);

  // Get everything between pvVlayout0 (or content area) and bot/footer
  // Try multiple extraction strategies
  let fullText = "";

  // Strategy 1: Find all content between sections
  const strategies = [
    // pvVlayout0 div to end
    /class="pvVlayout0"[^>]*>([\s\S]*?)(?:<div[^>]*class="[^"]*bot|<\/article|<footer)/i,
    // From 담당변호사 to 목록
    /담당\s*변호사\s*재판\s*후기([\s\S]*?)(?:btn_list|목록|이전글|<footer)/i,
    // From quote icon to end
    /quote2\.png([\s\S]*?)(?:btn_list|목록|이전글|<footer)/i,
    // tp cont area
    /class="[^"]*cont[^"]*"[^>]*>([\s\S]*?)(?:<div[^>]*class="[^"]*bot|<\/section)/i,
  ];

  for (const re of strategies) {
    const m = html.match(re);
    if (m) {
      const text = strip(m[1]);
      if (text.length > fullText.length) fullText = text;
    }
  }

  if (fullText.length < 50) return null;

  // Parse into sections
  const sections = {};

  // Find review section
  const reviewMatch = fullText.match(/(?:담당\s*변호사\s*재판\s*후기|재판\s*후기)\s*([\s\S]*?)(?=간략\s*내용|신세계로에서는|주요\s*쟁점|결\s*과|$)/i);
  if (reviewMatch) sections.review = reviewMatch[1].replace(/^[\s\n]+/, "").trim();

  // Find summary - GREEDY match
  const summaryMatch = fullText.match(/간략\s*내용\s*([\s\S]*?)(?=신세계로에서는|주요\s*쟁점|$)/i);
  if (summaryMatch) sections.summary = summaryMatch[1].replace(/^[\s\n]+/, "").trim();

  // Find approach
  const approachMatch = fullText.match(/신세계로에서는\s*([\s\S]*?)(?=결\s*과|$)/i);
  if (approachMatch) sections.approach = approachMatch[1].replace(/^[\s\n]+/, "").replace(/신세계로에서는/g, "").trim();

  // Find result
  const resultMatch = fullText.match(/(?:^|\n)\s*결\s*과\s*\n([\s\S]*?)$/i);
  if (resultMatch) sections.result = resultMatch[1].replace(/^[\s\n]+/, "").trim();

  // Build content
  const parts = [];
  if (sections.review) parts.push("【담당변호사 재판 후기】\n" + sections.review);
  if (sections.summary) parts.push("【간략내용】\n" + sections.summary);
  if (sections.approach) parts.push("【신세계로에서는】\n" + sections.approach);
  if (sections.result) parts.push("【결과】\n" + sections.result);

  return {
    content: parts.join("\n\n"),
    result: sections.result || "",
  };
}

async function main() {
  const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));

  // Find cases with truncated 간략내용
  const needFix = data.cases.filter(c => {
    const content = c.content || "";
    const sm = content.match(/【간략내용】\n([\s\S]*?)(?=【|$)/);
    if (sm && sm[1].trim().length < 80) return true;
    // Also: content < 200 with sections
    if (content.includes("【") && content.length < 300) return true;
    return false;
  });

  console.log("재크롤링 대상:", needFix.length, "건\n");

  let improved = 0, unchanged = 0, failed = 0;

  for (let i = 0; i < needFix.length; i++) {
    const c = needFix[i];
    try {
      const result = await fetchAndParse(c.k_id);
      if (result && result.content.length > (c.content || "").length) {
        const idx = data.cases.findIndex(x => x.k_id === c.k_id);
        data.cases[idx].content = result.content;
        if (result.result && result.result.length > (data.cases[idx].result || "").length) {
          data.cases[idx].result = result.result;
        }
        improved++;
      } else {
        unchanged++;
      }
    } catch (e) {
      failed++;
    }

    if ((i + 1) % 20 === 0 || i === needFix.length - 1) {
      console.log(`  ${i + 1}/${needFix.length} (improved: ${improved}, unchanged: ${unchanged}, failed: ${failed})`);
    }

    await new Promise(r => setTimeout(r, 250));
  }

  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");

  console.log(`\n=== 완료 ===`);
  console.log(`개선: ${improved}, 변경없음: ${unchanged}, 실패: ${failed}`);

  // Verify k_id=1054
  const reloaded = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
  const c1054 = reloaded.cases.find(x => x.k_id === 1054);
  if (c1054) {
    const sm = c1054.content.match(/【간략내용】\n([\s\S]*?)(?=【|$)/);
    console.log("\nk_id=1054 간략내용 길이:", sm ? sm[1].trim().length : 0);
  }
}

main().catch(console.error);
