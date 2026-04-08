"use client";

import Link from "next/link";
import { Gavel, Shield, Scale, Landmark, Handshake, BookOpen, Coins, Building2, Baby, Globe, ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const areas = [
  {
    icon: Gavel,
    title: "이혼소송",
    desc: "재산분할, 양육권, 위자료까지 종합 전략 수립.",
    href: "/practice/divorce",
    count: "555건+",
    tags: ["협의이혼", "재판이혼", "위자료", "재산분할", "양육권"],
  },
  {
    icon: Shield,
    title: "상간자소송",
    desc: "증거 수집부터 손해배상 청구까지 전 과정 대리.",
    href: "/practice/adultery",
    count: "112건+",
    tags: ["상간자 위자료청구", "소송절차·주의점", "소송시효", "증거확보", "손해배상"],
  },
  {
    icon: Scale,
    title: "가사관련 형사소송",
    desc: "가정폭력, 스토킹, 명예훼손 등 형사 대응.",
    href: "/practice/criminal",
    count: "88건+",
    tags: ["가정폭력", "스토킹", "명예훼손", "아동학대"],
  },
  {
    icon: Landmark,
    title: "상속·유류분",
    desc: "유언, 유류분, 상속재산 분쟁 해결.",
    href: "/practice/divorce/family-relations",
    count: "37건+",
    tags: ["유류분반환", "상속재산분할", "기여분심판", "유언·신탁", "한정승인"],
  },
  {
    icon: Handshake,
    title: "협의이혼",
    desc: "원만한 합의와 조건 검토로 빠르고 안전하게.",
    href: "/practice/divorce/mutual",
    count: "",
    tags: ["합의조건", "숙려기간", "서류작성", "양육합의"],
  },
  {
    icon: BookOpen,
    title: "재판이혼",
    desc: "민법 840조 이혼사유부터 조정까지 전략 수립.",
    href: "/practice/divorce/litigation",
    count: "",
    tags: ["이혼사유", "조정이혼", "유책배우자", "사전처분"],
  },
  {
    icon: Coins,
    title: "위자료 청구",
    desc: "정확한 증거와 산정 기준으로 최대 금액 청구.",
    href: "/practice/divorce/alimony",
    count: "",
    tags: ["위자료 산정", "제3자 청구", "증거확보", "소멸시효"],
  },
  {
    icon: Building2,
    title: "재산분할",
    desc: "기여도 분석과 자산 추적으로 정당한 몫 확보.",
    href: "/practice/divorce/property",
    count: "261건+",
    tags: ["재산분할 비율", "특유재산", "은닉재산", "부동산"],
  },
  {
    icon: Baby,
    title: "양육권·친권",
    desc: "자녀의 최선의 이익을 최우선으로 대리합니다.",
    href: "/practice/divorce/custody",
    count: "88건+",
    tags: ["친권", "양육권", "면접교섭", "양육비"],
  },
  {
    icon: Globe,
    title: "국제이혼",
    desc: "외국 국적·재산이 얽힌 복합 이혼 전문 처리.",
    href: "/practice/divorce/international",
    count: "",
    tags: ["국제재판관할", "외국판결 승인", "이중국적", "해외재산"],
  },
];

export default function PracticeAreasQuick() {
  return (
    <section id="practice" className="py-14 md:py-36 lg:py-44 bg-[#F8F4EE]">
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10">
        {/* Header */}
        <ScrollReveal>
          <div className="mb-8 md:mb-20">
            <p className="text-[14px] md:text-[15px] tracking-[0.35em] text-burgundy-500/70 font-bold uppercase mb-6">
              Practice Areas
            </p>
            <h2
              className="text-[26px] md:text-[56px] lg:text-[68px] font-bold text-gray-900 leading-[1.2] tracking-tight"
              style={{ wordBreak: "keep-all" }}
            >
              우리가 해결하는 문제
            </h2>
            <div className="w-16 h-[2px] bg-burgundy-500/30 mt-6" />
          </div>
        </ScrollReveal>

        {/* 4 cards grid */}
        <ScrollReveal delay={100}>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-6">
            {areas.map((area, i) => (
              <Link
                key={area.title}
                href={area.href}
                className="group relative flex flex-col rounded-2xl border border-gray-200/80 bg-white hover:bg-[#9B2335] hover:border-[#9B2335] hover:-translate-y-2.5 hover:shadow-[0_24px_64px_rgba(155,35,53,0.18)] transition-all duration-500 overflow-hidden"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                {/* Top accent line */}
                <div className="h-[3px] bg-gradient-to-r from-[#9B2335] to-[#C9A84C] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

                <div className="p-4 md:p-8 lg:p-9 flex-1 flex flex-col">
                  {/* Icon + Count row */}
                  <div className="flex items-start justify-between mb-3 md:mb-6">
                    <div className="w-11 h-11 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-burgundy-50 group-hover:bg-white/15 flex items-center justify-center transition-colors duration-400">
                      <area.icon
                        size={22}
                        strokeWidth={1.5}
                        className="text-burgundy-500 group-hover:text-white transition-colors duration-400 md:!w-[30px] md:!h-[30px]"
                      />
                    </div>
                    <span className="text-[15px] md:text-[15px] font-bold text-burgundy-500/60 group-hover:text-white/60 tracking-wide transition-colors duration-400">
                      {area.count}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-[16px] md:text-[24px] font-bold text-gray-900 group-hover:text-white transition-colors duration-400 mb-1.5 md:mb-3 tracking-tight leading-snug">
                    {area.title}
                  </h3>

                  {/* Description — 모바일 숨김 */}
                  <p className="hidden md:block text-[15px] text-[#444444] group-hover:text-white/70 leading-[1.7] transition-colors duration-400 mb-5 flex-1">
                    {area.desc}
                  </p>

                  {/* Tags — 모바일에서 2개만 */}
                  <div className="flex flex-wrap gap-1 md:gap-1.5 mb-3 md:mb-6">
                    {area.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 md:px-2.5 md:py-1 text-[15px] md:text-[16px] font-semibold rounded-full bg-burgundy-50/80 text-burgundy-600/80 group-hover:bg-white/15 group-hover:text-white/80 transition-colors duration-400"
                      >
                        {tag}
                      </span>
                    ))}
                    {area.tags.slice(2).map((tag) => (
                      <span
                        key={tag}
                        className="hidden md:inline-block px-2.5 py-1 text-[14px] font-semibold rounded-full bg-burgundy-50/80 text-burgundy-600/80 group-hover:bg-white/15 group-hover:text-white/80 transition-colors duration-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Arrow */}
                  <div className="flex items-center gap-1 md:gap-1.5 text-[14px] md:text-[16px] text-burgundy-500 group-hover:text-white font-semibold md:opacity-0 group-hover:opacity-100 md:translate-x-[-8px] group-hover:translate-x-0 transition-all duration-400">
                    자세히 보기 <ArrowRight size={12} className="md:!w-[14px] md:!h-[14px]" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </ScrollReveal>

        {/* Team link */}
        <ScrollReveal delay={200}>
          <div className="text-center mt-12 md:mt-16">
            <Link
              href="/about/teams/divorce-general"
              className="inline-flex items-center gap-2 text-[16px] md:text-[17px] text-burgundy-600 font-semibold hover:text-burgundy-500 transition-colors"
            >
              7개 전문팀 자세히 보기
              <ArrowRight size={16} />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
