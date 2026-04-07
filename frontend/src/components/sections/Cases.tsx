"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import StampSeal from "@/components/shared/StampSeal";
import casesAllData from "@/../../data/cases_all.json";

interface CaseItem {
  id: number;
  k_id: number;
  category: string;
  categories: string[];
  title: string;
  summary: string;
  result: string;
  result_type: string;
  lawyers: string[];
  views: number;
}

const allCases = (casesAllData as { stats: { total: number; categories: Record<string, number> }; cases: CaseItem[] }).cases;
const stats = (casesAllData as { stats: { total: number; categories: Record<string, number> } }).stats;

const FILTER_KEYS = ["전체", "이혼", "재산분할", "상간", "양육권", "상속"] as const;

/* 결과 요약 — 핵심만 짧게 추출 */
function shortResult(result: string, resultType: string): string {
  if (!result || result.trim() === "") {
    return resultType === "조정" ? "조정 성립" : "승소";
  }

  // 금액 추출 (예: "위자료 9000만원", "재산분할 5억 4000만원")
  const amounts: string[] = [];
  const amountRe = /(위자료|재산분할|양육비|손해배상|합의금|배상금|청구취지지급액)[^\d]*(\d[\d,.]*\s*[억만천원][\d,.만억천원\s]*)/g;
  let m;
  while ((m = amountRe.exec(result)) !== null) {
    const label = m[1] === "청구취지지급액" ? "청구 인용" : m[1];
    amounts.push(`${label} ${m[2].replace(/\s+/g, "").trim()}`);
  }
  if (amounts.length > 0) return amounts[0];

  // 금액만 단독
  const solo = result.match(/(\d[\d,.]*\s*[억만천][\d,.만억천\s]*원)/);
  if (solo) return solo[1].replace(/\s+/g, "") + " 인정";

  // 키워드 기반
  if (result.includes("조정 성립") || result.includes("조정성립")) return "조정 성립";
  if (result.includes("승소")) return "승소";
  if (result.includes("인용")) return "청구 인용";
  if (result.includes("기각")) return "상대방 청구 기각";
  if (result.includes("이혼")) return "이혼 성립";

  return resultType === "조정" ? "조정 성립" : "승소";
}


export default function Cases() {
  const [activeFilter, setActiveFilter] = useState("전체");

  const displayCases = useMemo(() => {
    let filtered = allCases;
    if (activeFilter !== "전체") {
      filtered = allCases.filter((c) => c.category === activeFilter);
    }
    // 금액 있는 사건 우선 → 조회수 높은 순으로 대표 6건
    const hasAmount = (r: string) => /\d[\d,.]*\s*[억만천][\d,.만억천\s]*원/.test(r);
    return [...filtered]
      .sort((a, b) => {
        const aHas = hasAmount(a.result) ? 1 : 0;
        const bHas = hasAmount(b.result) ? 1 : 0;
        if (bHas !== aHas) return bHas - aHas;
        return b.views - a.views;
      })
      .slice(0, 6);
  }, [activeFilter]);

  return (
    <section id="cases" className="py-12 md:py-28 lg:py-36 bg-[#F8F4EE]">
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10">
        {/* Header — 스토리텔링 */}
        <ScrollReveal>
          <div className="text-center mb-6 md:mb-20">
            <p className="text-[12px] md:text-[15px] tracking-[0.35em] text-burgundy-500/70 font-bold uppercase mb-3 md:mb-6">
              Winning Cases
            </p>
            <h2
              className="text-[22px] md:text-[48px] lg:text-[56px] font-bold text-[#2C2028] leading-[1.35] tracking-tight mb-4 md:mb-6"
              style={{ wordBreak: "keep-all" }}
            >
              성과는 말로 꾸며지지 않습니다.<br />
              <span className="text-burgundy-600">성과는 기록</span>으로 남습니다.
            </h2>
            <div className="w-12 md:w-16 h-[2px] bg-burgundy-500/30 mx-auto mb-3 md:mb-5" />
            <p className="text-[15px] md:text-[19px] text-[#333333] leading-[1.8] md:leading-[1.9]" style={{ wordBreak: "keep-all" }}>
              모든 성과는 비식별화된 판결문으로 검증됩니다.<br />
              광고 문구는 포장될 수 있어도,<br className="md:hidden" />
              법원의 기록은 결코 거짓을 말하지 않습니다.
            </p>

            {/* Total count */}
            <div className="flex items-baseline justify-center gap-1.5 md:gap-3 mt-4 md:mt-10">
              <span className="text-[32px] md:text-[56px] font-black text-burgundy-500 tracking-tighter leading-none">
                {stats.total.toLocaleString()}
              </span>
              <span className="text-[15px] md:text-[20px] text-[#333333] font-semibold">건의 승소사례</span>
            </div>
          </div>
        </ScrollReveal>

        {/* Category Filter Pills */}
        <ScrollReveal delay={100}>
          <div className="flex flex-wrap items-center gap-1.5 md:gap-3 mb-5 md:mb-10">
            {FILTER_KEYS.map((cat) => {
              const count = cat === "전체" ? stats.total : (stats.categories[cat] || 0);
              return (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`inline-flex items-center gap-1 md:gap-1.5 px-3 md:px-5 min-h-[36px] md:min-h-[44px] rounded-full text-[12px] md:text-[14px] font-semibold border transition-all duration-200 ${
                    activeFilter === cat
                      ? "bg-burgundy-500 text-white border-burgundy-500 shadow-sm"
                      : "bg-white text-[#333333] border-gray-200 hover:border-burgundy-300 hover:text-burgundy-600"
                  }`}
                >
                  {cat}
                  <span className={`text-[12px] md:text-[13px] ${activeFilter === cat ? "text-white/70" : "text-gray-400"}`}>
                    {count.toLocaleString()}
                  </span>
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Grid — 카테고리별 대표 사례 */}
        <ScrollReveal delay={200}>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 md:gap-6">
            {displayCases.map((caseItem) => (
                <Link
                  key={caseItem.id}
                  href={`/cases/${caseItem.id}`}
                  className="group relative flex flex-col rounded-lg md:rounded-xl border border-gray-200 bg-white hover:border-burgundy-300/60 hover:-translate-y-1 hover:shadow-[0_6px_15px_rgba(16,24,40,0.05)] transition-all duration-300 overflow-hidden h-full"
                >
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-burgundy-500 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />

                  <div className="p-3 md:p-6 flex-1 flex flex-col relative">
                    {/* 도장 — 우상단 */}
                    <div className="absolute top-1 right-1 md:top-3 md:right-3 opacity-[0.2] group-hover:opacity-[0.35] transition-opacity duration-500">
                      <StampSeal result={caseItem.result} resultType={caseItem.result_type} size="sm" />
                    </div>

                    <span className="inline-block px-2 py-0.5 md:px-3 md:py-1 rounded-full bg-burgundy-50 text-burgundy-600 text-[12px] md:text-[14px] font-bold tracking-wide mb-1.5 md:mb-3 self-start">
                      {caseItem.category}
                    </span>
                    <h4 className="text-[14px] md:text-[18px] font-bold text-gray-900 group-hover:text-burgundy-600 transition-colors leading-[1.45] md:leading-[1.5] mb-1 md:mb-3 line-clamp-2 pr-10 md:pr-14" style={{ wordBreak: "keep-all" }}>
                      {caseItem.title}
                    </h4>
                    <p className="hidden md:block text-[16px] text-[#333333] leading-[1.7] line-clamp-2 flex-1">
                      {caseItem.summary}
                    </p>
                  </div>

                  <div className="px-3 md:px-6 pb-3 md:pb-6 pt-2 md:pt-4 border-t border-gray-100 mt-auto">
                    <span className="flex items-center gap-1 md:gap-1.5 text-[13px] md:text-[15px] font-bold text-burgundy-600">
                      <Check size={11} className="text-burgundy-500 shrink-0 md:!w-[14px] md:!h-[14px]" />
                      <span className="line-clamp-1">{shortResult(caseItem.result, caseItem.result_type)}</span>
                    </span>
                  </div>
                </Link>
            ))}
          </div>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal delay={300}>
          <div className="flex justify-center mt-8 md:mt-12">
            <Link
              href="/cases"
              className="inline-flex items-center gap-2 px-6 md:px-9 py-3 md:py-4 rounded-full border-2 border-burgundy-500 text-burgundy-600 text-[14px] md:text-[17px] font-bold hover:bg-burgundy-500 hover:text-white hover:shadow-[0_8px_30px_rgba(155,35,53,0.25)] hover:-translate-y-0.5 transition-all duration-300"
            >
              승소사례 더보기
              <ArrowRight size={16} />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
