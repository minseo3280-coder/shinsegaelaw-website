"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import ScrollReveal from "@/components/ScrollReveal";
import reviewsData from "@/../../data/reviews.json";

const displayReviews = reviewsData.reviews
  .filter((r) => r.content && r.content.length >= 50)
  .slice(0, 6);

export default function Reviews() {
  return (
    <section id="reviews" className="py-12 md:py-28 lg:py-36 bg-white">
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10">
        {/* Header — 감성 카피 */}
        <ScrollReveal className="text-center mb-6 md:mb-20">
          <p className="text-[14px] md:text-[15px] tracking-[0.35em] text-burgundy-500/70 font-bold uppercase mb-3 md:mb-6">
            Client Reviews
          </p>
          <h2
            className="text-[22px] md:text-[48px] lg:text-[56px] font-bold text-[#2C2028] tracking-tight mb-4 md:mb-6"
            style={{ wordBreak: "keep-all" }}
          >
            진심은 <span className="text-burgundy-600">결과</span>로 전해집니다.
          </h2>
          <p className="text-[15px] md:text-[19px] text-[#333333] leading-[1.8] md:leading-[1.9] mt-3 md:mt-5" style={{ wordBreak: "keep-all" }}>
            처음 상담부터 마지막까지,<br />
            한 사람의 삶에도 진심으로 다가섭니다.
          </p>
        </ScrollReveal>

        {/* Swiper Carousel */}
        <ScrollReveal delay={200}>
          <Swiper
            modules={[Autoplay]}
            slidesPerView={1.1}
            spaceBetween={16}
            autoplay={{ delay: 5000, disableOnInteraction: true }}
            breakpoints={{
              768: { slidesPerView: 2.2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {displayReviews.map((item) => (
              <SwiperSlide key={item.id}>
                <Link href={`/reviews/${item.id}`} className="block group h-full">
                  <div className="relative rounded-lg md:rounded-xl border border-gray-200 bg-white hover:border-burgundy-200 hover:-translate-y-1 hover:shadow-[0_6px_15px_rgba(16,24,40,0.05)] transition-all duration-300 h-full flex flex-col overflow-hidden">
                    {/* Image thumbnail */}
                    {item.images && item.images.length > 0 && (
                      <div className="relative w-full h-[120px] md:h-[160px] overflow-hidden bg-gray-100">
                        <Image
                          src={item.images[0]}
                          alt={item.title || "의뢰인 후기"}
                          fill
                          className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                          sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 33vw"
                        />
                        {/* Result badge overlay */}
                        {item.result && (
                          <div className="absolute bottom-3 left-3">
                            <span className="px-3 py-1.5 rounded-md bg-white/95 backdrop-blur-sm text-burgundy-600 text-[14px] font-bold shadow-sm">
                              {item.result}
                            </span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Content area */}
                    <div className="p-4 md:p-7 flex-1 flex flex-col">
                      {/* Content */}
                      <p className="text-[15px] md:text-[17px] text-[#333333] leading-[1.75] md:leading-[1.85] mb-auto line-clamp-3">
                        {item.content}
                      </p>

                      {/* Divider */}
                      <div className="w-full h-[1px] bg-gray-100 mt-4 md:mt-5 mb-3 md:mb-4" />

                      {/* Bottom info */}
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-[14px] md:text-[15px] font-bold text-gray-900">{item.case_type}</p>
                          {item.lawyer && (
                            <p className="text-[15px] md:text-[16px] text-[#444444] mt-0.5">담당: {item.lawyer}</p>
                          )}
                        </div>
                        <span className="text-[14px] text-burgundy-500 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                          자세히 →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
          <p className="lg:hidden flex items-center gap-2 text-[14px] text-gray-400 mt-4 pl-6">
            좌우로 스와이프
            <span className="flex-1 h-px bg-gradient-to-r from-gray-300 to-transparent" />
          </p>

          {/* View all */}
          <div className="flex justify-center mt-8 md:mt-10">
            <Link
              href="/reviews"
              className="inline-flex items-center gap-2 px-6 md:px-9 py-3 md:py-4 rounded-full border-2 border-burgundy-500 text-burgundy-600 text-[14px] md:text-[17px] font-bold hover:bg-burgundy-500 hover:text-white transition-all duration-300"
            >
              의뢰인 후기 전체보기
              <ArrowRight size={16} />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
