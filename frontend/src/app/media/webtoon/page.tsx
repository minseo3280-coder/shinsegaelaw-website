"use client";

import Image from "next/image";
import { Instagram } from "lucide-react";
import MediaTabs from "@/components/shared/MediaTabs";
import SubPageHero from "@/components/shared/SubPageHero";

const INSTAGRAM_URL = "https://www.instagram.com/insup_cho/";

const webtoons = [
  { src: "/images/etc/webtoon/webtoon-01.jpg", alt: "이혼사건 다이어리 1화", ep: 1 },
  { src: "/images/etc/webtoon/webtoon-02.jpg", alt: "이혼사건 다이어리 2화", ep: 2 },
  { src: "/images/etc/webtoon/webtoon-03.jpg", alt: "이혼사건 다이어리 3화", ep: 3 },
  { src: "/images/etc/webtoon/webtoon-04.jpg", alt: "이혼사건 다이어리 4화", ep: 4 },
  { src: "/images/etc/webtoon/webtoon-05.jpg", alt: "이혼사건 다이어리 5화", ep: 5 },
];

export default function WebtoonPage() {
  return (
    <div className="">
      <SubPageHero
        titleKo="인스타웹툰"
        breadcrumbs={[
          { label: "미디어", href: "/news" },
          { label: "인스타웹툰" },
        ]}
        bannerImage="/images/office/banner-reviews.jpg"
      />

      <MediaTabs activeTab={3} />

      <div className="max-w-7xl mx-auto px-6 md:px-8 pt-12 md:pt-16 pb-20 md:pb-28">
        {/* Webtoon Hero */}
        <div className="bg-gradient-to-br from-burgundy-50 via-white to-burgundy-50 rounded-[20px] border border-burgundy-100 p-10 md:p-12 text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#E1306C] to-[#C13584] text-white text-[12px] font-semibold mb-4">
            <Instagram size={14} />
            Instagram Webtoon
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight mb-3">
            조변호사의 이혼사건 다이어리
          </h2>
          <p className="text-[15px] text-[#444444] leading-relaxed max-w-[500px] mx-auto">
            조인섭 변호사가 이혼전문 변호사로 경험한 실제 사건들을 인스타그램에
            연재하고 있는 카툰입니다. 무겁고 어려운 법률 이야기를 따뜻하고 쉽게
            전해드립니다.
          </p>
        </div>

        {/* Webtoon Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {webtoons.map((item) => (
            <a
              key={item.src}
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-gray-200 group-hover:border-burgundy-200 group-hover:-translate-y-1 group-hover:shadow-xl transition-all duration-300">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-burgundy-500 text-white text-[11px] font-bold">
                  EP.{String(item.ep).padStart(2, "0")}
                </span>
              </div>
              <p className="text-[14px] font-semibold text-[#2C2028] mt-3 text-center">
                이혼사건 다이어리 {item.ep}화
              </p>
              <p className="text-[12px] text-[#888888] text-center mt-0.5">
                조인섭 변호사
              </p>
            </a>
          ))}
        </div>

        {/* Instagram Follow Banner */}
        <div className="mt-12 rounded-[20px] overflow-hidden" style={{ background: "linear-gradient(135deg, #405DE6, #5851DB, #833AB4, #C13584, #E1306C, #FD1D1D, #F56040, #F77737, #FCAF45)" }}>
          <div className="py-10 px-8 text-center">
            <h3 className="text-xl md:text-2xl font-extrabold text-white mb-2">
              인스타그램에서 더 많은 이야기를 만나보세요
            </h3>
            <p className="text-[14px] text-white/80 mb-5">
              조인섭 변호사의 일상과 법률 이야기가 매주 업데이트됩니다
            </p>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-white/95 hover:bg-white text-[#2C2028] text-[14px] font-bold transition-all duration-200 hover:-translate-y-0.5"
            >
              <Instagram size={16} />
              @insup_cho 팔로우하기
            </a>
          </div>
        </div>
      </div>

    </div>
  );
}
