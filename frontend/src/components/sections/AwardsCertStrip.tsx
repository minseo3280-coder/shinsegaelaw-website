"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import { Award, GraduationCap, Globe, Clock, Building, Star, Medal } from "lucide-react";

const awards = [
  { id: 1, label: "대한변협 가족법전문 제1호", Icon: Award },
  { id: 2, label: "여성가족부 장관 표창", Icon: Medal },
  { id: 3, label: "이화여대 겸임교수", Icon: GraduationCap },
  { id: 4, label: "ABA 한국대표", Icon: Globe },
  { id: 5, label: "52년 3대 법조전통", Icon: Clock },
  { id: 6, label: "하나은행 유언신탁 협약", Icon: Building },
  { id: 7, label: "KBS·SBS·MBC·JTBC 출연", Icon: Star },
  { id: 8, label: "YTN 라디오 상담소 진행", Icon: Star },
];

export default function AwardsCertStrip() {
  return (
    <section className="hidden lg:block bg-white py-8 md:py-10 overflow-hidden border-b border-gray-100">
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
            <div className="px-5 py-2.5 bg-white rounded-full border border-gray-200 flex items-center gap-2.5 hover:border-burgundy-500/30 transition-colors">
              <div className="w-8 h-8 bg-burgundy-50 rounded-full flex items-center justify-center">
                <award.Icon className="w-3.5 h-3.5 text-burgundy-500" />
              </div>
              <span className="text-[14px] font-semibold text-[#2C2028] whitespace-nowrap">
                {award.label}
              </span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
