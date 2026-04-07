"use client";

import ScrollReveal from "@/components/ScrollReveal";

/* ─── 언론사 데이터 ─── */
const mediaLogos = [
  {
    name: "KBS",
    brandColor: "#1A1A1A",
    svg: (
      <svg viewBox="0 0 80 28" fill="currentColor" className="h-7 md:h-8">
        <text x="0" y="22" fontFamily="Arial Black, Arial" fontWeight="900" fontSize="24" letterSpacing="-1">KBS</text>
      </svg>
    ),
  },
  {
    name: "SBS",
    brandColor: "#0055A5",
    svg: (
      <svg viewBox="0 0 80 28" fill="currentColor" className="h-7 md:h-8">
        <text x="0" y="22" fontFamily="Arial Black, Arial" fontWeight="900" fontSize="24" letterSpacing="-1">SBS</text>
      </svg>
    ),
  },
  {
    name: "MBC",
    brandColor: "#D32F2F",
    svg: (
      <svg viewBox="0 0 80 28" fill="currentColor" className="h-7 md:h-8">
        <text x="0" y="22" fontFamily="Arial Black, Arial" fontWeight="900" fontSize="24" letterSpacing="-1">MBC</text>
      </svg>
    ),
  },
  {
    name: "JTBC",
    brandColor: "#E53935",
    svg: (
      <svg viewBox="0 0 80 28" fill="currentColor" className="h-7 md:h-8">
        <text x="0" y="22" fontFamily="Arial Black, Arial" fontWeight="900" fontSize="22" letterSpacing="-0.5">JTBC</text>
      </svg>
    ),
  },
  {
    name: "YTN",
    brandColor: "#1565C0",
    svg: (
      <svg viewBox="0 0 80 28" fill="currentColor" className="h-7 md:h-8">
        <text x="0" y="22" fontFamily="Arial Black, Arial" fontWeight="900" fontSize="24" letterSpacing="-1">YTN</text>
      </svg>
    ),
  },
  {
    name: "머니투데이",
    brandColor: "#E8370C",
    svg: (
      <svg viewBox="0 0 130 28" fill="currentColor" className="h-6 md:h-7">
        <text x="0" y="21" fontFamily="Arial Black, Arial" fontWeight="800" fontSize="18" letterSpacing="-0.5">머니투데이</text>
      </svg>
    ),
  },
  {
    name: "파이낸셜",
    brandColor: "#003D7C",
    svg: (
      <svg viewBox="0 0 130 28" fill="currentColor" className="h-6 md:h-7">
        <text x="0" y="21" fontFamily="Arial Black, Arial" fontWeight="800" fontSize="18" letterSpacing="-0.5">파이낸셜뉴스</text>
      </svg>
    ),
  },
];

export default function PressLogoBanner() {
  return (
    <section className="hidden lg:block bg-[#F8F4EE] py-10 md:py-14 border-t border-[#E8E0D8]/60">
      <div className="max-w-[1600px] mx-auto px-5 md:px-8 lg:px-10">
        <ScrollReveal>
          {/* Label */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-[1px] flex-1 max-w-[80px] bg-[#C9A84C]/30" />
            <p className="text-[11px] md:text-[12px] text-[#444444] tracking-[0.25em] uppercase font-semibold">
              As Featured In
            </p>
            <div className="h-[1px] flex-1 max-w-[80px] bg-[#C9A84C]/30" />
          </div>

          {/* Logos — 웜 모노크롬 통일 (프리미엄 톤 유지) */}
          <div className="flex items-center justify-center flex-wrap gap-8 md:gap-12 lg:gap-16">
            {mediaLogos.map((logo) => (
              <div
                key={logo.name}
                className="text-[#9C9097] hover:text-[#5C5055] transition-all duration-500 cursor-default"
                title={logo.name}
              >
                {logo.svg}
              </div>
            ))}
          </div>

          {/* Press count + YTN info */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6 mt-8">
            <span className="text-[13px] md:text-[14px] text-[#6B5E64] font-semibold">
              총 <span className="text-burgundy-500 font-bold">1,010건</span> 이상의 언론보도
            </span>
            <span className="hidden md:inline text-[#C9A84C]/50">·</span>
            <span className="text-[13px] md:text-[14px] text-[#6B5E64]">
              YTN 라디오 「조인섭 변호사의 상담소」 고정 출연
            </span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
