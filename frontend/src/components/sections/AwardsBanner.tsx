"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import { Award, GraduationCap, Globe, Clock, Building } from "lucide-react";

/* ─── 수상/경력 뱃지 ─── */
const awards = [
  { id: 1, label: "가족법전문 제1호", Icon: Award },
  { id: 2, label: "이화여대 겸임교수", Icon: GraduationCap },
  { id: 3, label: "ABA 한국대표", Icon: Globe },
  { id: 4, label: "52년 3대 법조전통", Icon: Clock },
  { id: 5, label: "하나은행 유언신탁", Icon: Building },
];

/* ─── 언론사 로고 SVG ─── */
const mediaLogos = [
  {
    name: "KBS",
    color: "#1A1A1A",
    svg: (
      <svg viewBox="0 0 80 28" fill="currentColor" className="h-5">
        <text x="0" y="22" fontFamily="Arial Black, Arial" fontWeight="900" fontSize="24" letterSpacing="-1">KBS</text>
      </svg>
    ),
  },
  {
    name: "SBS",
    color: "#0055A5",
    svg: (
      <svg viewBox="0 0 80 28" fill="currentColor" className="h-5">
        <text x="0" y="22" fontFamily="Arial Black, Arial" fontWeight="900" fontSize="24" letterSpacing="-1">SBS</text>
      </svg>
    ),
  },
  {
    name: "MBC",
    color: "#D32F2F",
    svg: (
      <svg viewBox="0 0 80 28" fill="currentColor" className="h-5">
        <text x="0" y="22" fontFamily="Arial Black, Arial" fontWeight="900" fontSize="24" letterSpacing="-1">MBC</text>
      </svg>
    ),
  },
  {
    name: "JTBC",
    color: "#E53935",
    svg: (
      <svg viewBox="0 0 80 28" fill="currentColor" className="h-5">
        <text x="0" y="22" fontFamily="Arial Black, Arial" fontWeight="900" fontSize="22" letterSpacing="-0.5">JTBC</text>
      </svg>
    ),
  },
  {
    name: "YTN",
    color: "#1565C0",
    svg: (
      <svg viewBox="0 0 80 28" fill="currentColor" className="h-5">
        <text x="0" y="22" fontFamily="Arial Black, Arial" fontWeight="900" fontSize="24" letterSpacing="-1">YTN</text>
      </svg>
    ),
  },
];

export default function AwardsBanner() {
  return (
    <section className="bg-white border-b border-gray-100 overflow-hidden">
      {/* 언론사 로고 배너 */}
      <div className="border-b border-gray-50">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-10 py-4 md:py-6">
          <div className="flex items-center justify-center gap-3 mb-3 md:mb-5">
            <div className="h-[1px] flex-1 max-w-[40px] md:max-w-[60px] bg-gray-200" />
            <p className="text-[15px] md:text-[15px] text-[#666666] tracking-[0.2em] uppercase font-semibold">
              As Featured In
            </p>
            <div className="h-[1px] flex-1 max-w-[40px] md:max-w-[60px] bg-gray-200" />
          </div>
          <div className="flex items-center justify-center gap-4 sm:gap-10 md:gap-16">
            {mediaLogos.map((logo) => (
              <div
                key={logo.name}
                className="text-gray-300 hover:text-[color:var(--logo-color)] transition-all duration-500 cursor-default"
                style={{ "--logo-color": logo.color } as React.CSSProperties}
                title={logo.name}
              >
                {logo.svg}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 수상/경력 Swiper 캐러셀 */}
      <div className="py-3 md:py-4">
        <Swiper
          modules={[Autoplay, FreeMode]}
          slidesPerView="auto"
          spaceBetween={14}
          freeMode
          loop
          autoplay={{ delay: 0, disableOnInteraction: false }}
          speed={4000}
          className="!overflow-visible"
        >
          {[...awards, ...awards, ...awards].map((award, i) => (
            <SwiperSlide key={`${award.id}-${i}`} style={{ width: "auto" }}>
              <div className="px-3 md:px-4 py-1.5 md:py-2 bg-white rounded-lg border border-gray-200 flex items-center gap-2 hover:border-burgundy-500/20 transition-colors">
                <div className="w-7 h-7 md:w-8 md:h-8 bg-burgundy-50 rounded-lg flex items-center justify-center">
                  <award.Icon className="w-3 h-3 md:w-3.5 md:h-3.5 text-burgundy-500" />
                </div>
                <span className="text-[14px] md:text-[16px] font-semibold text-[#2C2028] whitespace-nowrap">
                  {award.label}
                </span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
