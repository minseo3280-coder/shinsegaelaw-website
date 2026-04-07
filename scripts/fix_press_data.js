/**
 * press.json 데이터 정합성 수정
 * 1. HTML 엔티티 디코딩
 * 2. 출처명 오타/불일치 정규화
 * 3. 콘텐츠 접두사 아티팩트 제거
 */
const fs = require("fs");
const path = require("path");

const DATA_PATH = path.join(__dirname, "..", "data", "press.json");
const data = JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));

let entityFixed = 0;
let sourceFixed = 0;
let prefixFixed = 0;

// ── 1. HTML 엔티티 디코딩 ──
const ENTITIES = {
  "&ldquo;": "\u201C",   // "
  "&rdquo;": "\u201D",   // "
  "&lsquo;": "\u2018",   // '
  "&rsquo;": "\u2019",   // '
  "&hellip;": "\u2026",  // …
  "&middot;": "\u00B7",  // ·
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&copy;": "\u00A9",    // ©
  "&rarr;": "\u2192",    // →
  "&rArr;": "\u21D2",    // ⇒
  "&alpha;": "\u03B1",   // α
  "&nbsp;": " ",
};

function decodeEntities(text) {
  if (!text) return text;
  let changed = false;
  let result = text;
  for (const [entity, char] of Object.entries(ENTITIES)) {
    if (result.includes(entity)) {
      result = result.split(entity).join(char);
      changed = true;
    }
  }
  if (changed) entityFixed++;
  return result;
}

// ── 2. 출처명 정규화 ──
const SOURCE_MAP = {
  "YTN라디오": "YTN 라디오",
  "아이뉴스 24": "아이뉴스24",
  "아니뉴스24": "아이뉴스24",
  "아이뉴스": "아이뉴스24",
  "해럴드경제": "헤럴드경제",
  "헤럴드 경제": "헤럴드경제",
  "파이낼셜뉴스": "파이낸셜뉴스",
  "디지털타임즈": "디지털타임스",
  "메디컬 투데이": "메디컬투데이",
  "한겨례": "한겨레",
  "한겨례신문": "한겨레신문",
  "news1": "뉴스1",
  "MONEY S": "머니S",
};

// ── 3. 접두사 아티팩트 제거 ──
const PREFIX_FIXES = {
  12: /^광고\s*/,
  13: /^광고\s*(\(::[^:]+::\)\s*)*/,
};

// ── 적용 ──
data.articles.forEach((a) => {
  // 엔티티
  a.title = decodeEntities(a.title);
  a.content = decodeEntities(a.content);

  // 출처
  if (SOURCE_MAP[a.source]) {
    console.log(`출처 수정: k_id=${a.k_id} "${a.source}" → "${SOURCE_MAP[a.source]}"`);
    a.source = SOURCE_MAP[a.source];
    sourceFixed++;
  }

  // 접두사
  if (PREFIX_FIXES[a.k_id] && a.content) {
    const before = a.content;
    a.content = a.content.replace(PREFIX_FIXES[a.k_id], "");
    if (before !== a.content) {
      console.log(`접두사 제거: k_id=${a.k_id}`);
      prefixFixed++;
    }
  }
});

// ── 저장 ──
fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), "utf-8");

console.log(`\n=== 완료 ===`);
console.log(`HTML 엔티티 수정: ${entityFixed}건`);
console.log(`출처명 수정: ${sourceFixed}건`);
console.log(`접두사 제거: ${prefixFixed}건`);
