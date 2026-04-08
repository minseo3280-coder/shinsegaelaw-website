"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import ScrollReveal from "@/components/ScrollReveal";
import lawyersData from "@/../../data/lawyers.json";

const allLawyers = lawyersData.lawyers;
const representatives = allLawyers.filter((l) => l.is_representative || l.role === "대표" || l.role === "제1대 대표변호사");
const teamLawyers = allLawyers.filter((l) => !l.is_representative && l.role !== "대표" && l.role !== "제1대 대표변호사");

export default function Lawyers() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  return (
    <section id="lawyers" className="relative py-12 md:py-28 lg:py-36 bg-[#F8F4EE] overflow-hidden">
      <div className="relative z-10 max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10">
        {/* Header */}
        <ScrollReveal className="mb-6 md:mb-20">
          <div className="text-center">
            <p className="text-[14px] md:text-[15px] tracking-[0.35em] text-gold-600 font-bold uppercase mb-3 md:mb-6">
              Our Attorneys
            </p>
            <h2
              className="text-[22px] md:text-[48px] lg:text-[56px] font-bold text-[#2C2028] leading-[1.35] tracking-tight mb-4 md:mb-6"
              style={{ wordBreak: "keep-all" }}
            >
              오직 이혼과 상속,<br />
              한 길만 걸어온 <span className="text-burgundy-600">{allLawyers.length}인</span>의 전문가
            </h2>
            <p className="text-[15px] md:text-[19px] text-[#333333] leading-[1.8] md:leading-[1.9] mt-3 md:mt-5" style={{ wordBreak: "keep-all" }}>
              전문분야별 팀이 분업과 협업을 통해 체계적으로 대응하고,<br className="hidden md:inline" />
              대표변호사가 직접 총괄하여 사건의 흐름을 빈틈없이 관리합니다.
            </p>
          </div>
        </ScrollReveal>

        {/* ─── 대표 변호사 (Featured) ─── */}
        <ScrollReveal delay={100} className="mb-8 md:mb-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
            {representatives.map((lawyer) => (
              <Link key={lawyer.id} href={`/about/lawyers/${lawyer.id}`}>
                <div className="group relative bg-white rounded-lg md:rounded-xl overflow-hidden border border-gray-200 hover:-translate-y-1 hover:shadow-[0_6px_15px_rgba(16,24,40,0.05)] transition-all duration-300">
                  {/* Top accent line */}
                  <div className="h-[3px] bg-gradient-to-r from-[#C9A84C] via-[#D4AF37] to-[#C9A84C]" />
                  <div className="flex flex-row">
                    {/* Photo */}
                    <div className="relative w-[110px] sm:w-[220px] md:w-[260px] aspect-auto min-h-[160px] sm:min-h-[320px] flex-shrink-0 overflow-hidden bg-[#E8E0D8]">
                      <Image
                        src={lawyer.profile_image}
                        alt={lawyer.name}
                        fill
                        sizes="(max-width: 640px) 110px, 260px"
                        className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-700"
                      />
                    </div>
                    {/* Info */}
                    <div className="flex-1 p-4 md:p-8 flex flex-col justify-center">
                      <span className="inline-flex items-center gap-1.5 text-[14px] md:text-[15px] font-bold tracking-[0.15em] md:tracking-[0.2em] text-[#C9A84C] uppercase mb-2 md:mb-4">
                        <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-[#C9A84C]" />
                        {lawyer.label || "Representative"}
                      </span>
                      <h3 className="text-[18px] md:text-[32px] font-bold text-[#2C2028] tracking-tight mb-0.5 md:mb-1">
                        {lawyer.name}
                      </h3>
                      <p className="text-[15px] md:text-[17px] text-[#333333] font-semibold mb-2 md:mb-4">
                        {lawyer.position}
                        {lawyer.role && <span className="text-burgundy-500 ml-1 md:ml-2">· {lawyer.role}</span>}
                      </p>
                      <div className="flex flex-wrap gap-1 md:gap-1.5 mb-3 md:mb-5">
                        {lawyer.specialty.slice(0, 3).map((s) => (
                          <span key={s} className="text-[14px] md:text-[16px] px-2 md:px-3 py-0.5 md:py-1 rounded-full bg-burgundy-50 text-burgundy-600 font-semibold">
                            {s}
                          </span>
                        ))}
                      </div>
                      {lawyer.description && (
                        <p className="hidden md:block text-[16px] text-[#333333] leading-[1.7] mb-5 line-clamp-2">
                          {lawyer.description}
                        </p>
                      )}
                      <span className="inline-flex items-center gap-1.5 text-[15px] md:text-[15px] text-burgundy-600 font-bold group-hover:gap-2.5 transition-all duration-300">
                        프로필 보기 <ArrowRight size={12} className="md:!w-[14px] md:!h-[14px]" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </ScrollReveal>

        {/* ─── 팀 변호사 (Swiper 캐러셀) ─── */}
        <ScrollReveal delay={200}>
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h3 className="text-[16px] md:text-[20px] font-bold text-[#2C2028]">
              전문 변호사팀
            </h3>
            {/* Navigation arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => swiperRef.current?.slidePrev()}
                className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-200 ${
                  isBeginning
                    ? "border-gray-200 text-gray-300 cursor-default"
                    : "border-gray-300 text-[#333333] hover:border-burgundy-400 hover:text-burgundy-500 hover:bg-burgundy-50"
                }`}
                disabled={isBeginning}
                aria-label="이전"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => swiperRef.current?.slideNext()}
                className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-200 ${
                  isEnd
                    ? "border-gray-200 text-gray-300 cursor-default"
                    : "border-gray-300 text-[#333333] hover:border-burgundy-400 hover:text-burgundy-500 hover:bg-burgundy-50"
                }`}
                disabled={isEnd}
                aria-label="다음"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <Swiper
            modules={[Navigation]}
            onSwiper={(sw) => (swiperRef.current = sw)}
            onSlideChange={(sw) => {
              setIsBeginning(sw.isBeginning);
              setIsEnd(sw.isEnd);
            }}
            slidesPerView={2.2}
            spaceBetween={12}
            breakpoints={{
              640: { slidesPerView: 3, spaceBetween: 16 },
              768: { slidesPerView: 4, spaceBetween: 18 },
              1024: { slidesPerView: 5, spaceBetween: 20 },
              1280: { slidesPerView: 6, spaceBetween: 20 },
            }}
          >
            {teamLawyers.map((lawyer) => (
              <SwiperSlide key={lawyer.id}>
                <Link href={`/about/lawyers/${lawyer.id}`}>
                  <div className="group cursor-pointer">
                    {/* Photo card */}
                    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-[#E8E0D8] mb-3">
                      <Image
                        src={lawyer.profile_image}
                        alt={lawyer.name}
                        fill
                        sizes="(max-width: 640px) 45vw, (max-width: 768px) 25vw, 16vw"
                        className="object-cover object-top group-hover:scale-[1.04] transition-transform duration-500"
                      />
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-burgundy-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-3">
                        <span className="text-[14px] text-white font-semibold flex items-center gap-1">
                          프로필 보기 <ArrowRight size={12} />
                        </span>
                      </div>
                    </div>
                    {/* Info */}
                    <h4 className="text-[14px] md:text-[18px] font-bold text-[#2C2028] tracking-tight group-hover:text-burgundy-600 transition-colors duration-300">
                      {lawyer.name}
                    </h4>
                    <p className="text-[14px] md:text-[15px] text-[#333333] font-semibold mt-0.5">
                      {lawyer.position}
                    </p>
                    {lawyer.role && (
                      <p className="text-[14px] md:text-[16px] text-burgundy-500 mt-0.5 font-semibold">
                        {lawyer.role}
                      </p>
                    )}
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
          <p className="lg:hidden flex items-center gap-2 text-[14px] text-gray-400 mt-4 pl-6">
            좌우로 스와이프
            <span className="flex-1 h-px bg-gradient-to-r from-gray-300 to-transparent" />
          </p>
        </ScrollReveal>

        {/* View all */}
        <ScrollReveal delay={300}>
          <div className="flex justify-center mt-8 md:mt-16">
            <Link
              href="/about/lawyers"
              className="inline-flex items-center gap-2 px-6 md:px-9 py-3 md:py-4 rounded-full border-2 border-burgundy-500 text-burgundy-600 text-[14px] md:text-[17px] font-bold hover:bg-burgundy-500 hover:text-white hover:shadow-[0_8px_30px_rgba(155,35,53,0.25)] hover:-translate-y-0.5 transition-all duration-300"
            >
              전체 변호사 보기 ({allLawyers.length}명)
              <ArrowRight size={14} />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
