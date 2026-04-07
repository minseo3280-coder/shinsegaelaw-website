"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, ExternalLink, Youtube, Instagram } from "lucide-react";
import MediaTabs from "@/components/shared/MediaTabs";
import SubPageHero from "@/components/shared/SubPageHero";

/* ─── Types ─── */
interface ShortVideo {
  id: string;
  title: string;
  thumbnail?: string;
}

/* ─── Data ─── */
import shortsRaw from "@/../../data/shorts.json";
const shortsData = shortsRaw as { meta?: { total: number }; videos: ShortVideo[] };

const ITEMS_PER_PAGE = 30;

export default function ShortsPage() {
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const videos = shortsData.videos || [];
  const totalCount = videos.length;
  const visibleVideos = videos.slice(0, visibleCount);
  const hasMore = visibleCount < totalCount;

  return (
    <div className="">
      <SubPageHero
        titleKo="쇼츠 모아보기"
        breadcrumbs={[
          { label: "미디어", href: "/news" },
          { label: "쇼츠 모아보기" },
        ]}
        bannerImage="/images/office/banner-reviews.jpg"
      />

      <MediaTabs activeTab={3} />

      <div className="max-w-7xl mx-auto px-6 md:px-8 pt-12 md:pt-16 pb-20 md:pb-28">
        {/* Section Header */}
        <div className="mb-10">
          <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-burgundy-500 mb-3">
            YouTube Shorts
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight leading-tight">
            <span className="text-burgundy-500">1분</span>으로 알아보는 법률 상식
          </h2>
          <p className="text-[15px] text-[#444444] leading-relaxed mt-3 max-w-[600px]">
            복잡한 법률 이야기를 짧고 핵심만 담은 쇼츠로 빠르게 확인하세요.
          </p>
          <div className="w-12 h-[2px] bg-gold-500 mt-4" />
        </div>

        {/* Count Badge */}
        {totalCount > 0 && (
          <div className="flex items-center gap-2 mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-burgundy-50 text-burgundy-600 text-[13px] font-semibold">
              <Play size={12} fill="currentColor" />
              총 {totalCount}개 쇼츠
            </span>
          </div>
        )}

        {/* Shorts Grid */}
        {visibleVideos.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {visibleVideos.map((video) => (
              <a
                key={video.id}
                href={`https://www.youtube.com/shorts/${video.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-gray-100 group-hover:scale-[1.03] group-hover:shadow-xl transition-all duration-300">
                  <Image
                    src={video.thumbnail || `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                    alt={video.title || "쇼츠 영상"}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                    className="object-cover"
                  />
                  {/* Shorts Badge */}
                  <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-2 py-0.5 rounded bg-red-600/90 text-white text-[11px] font-bold">
                    <Play size={10} fill="currentColor" />
                    Shorts
                  </span>
                  {/* Bottom Gradient + Title + Date */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                    <p className="text-[13px] font-semibold text-white leading-tight line-clamp-2">
                      {video.title || "법률 상담 쇼츠"}
                    </p>
                    {(video as { date?: string | null }).date && (
                      <p className="text-[11px] text-white/60 mt-1">
                        {(video as { date?: string | null }).date}
                      </p>
                    )}
                  </div>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Youtube size={48} className="text-gray-200 mx-auto mb-4" />
            <p className="text-[15px] text-[#888888]">쇼츠 데이터를 준비 중입니다.</p>
          </div>
        )}

        {/* Load More */}
        {hasMore && (
          <div className="text-center mt-10">
            <button
              onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_PAGE)}
              className="px-10 py-3.5 rounded-full border border-gray-200 bg-white hover:bg-gray-50 text-[#333333] text-[14px] font-semibold transition-all duration-200 hover:border-burgundy-200 hover:text-burgundy-500"
            >
              더보기 ({totalCount - visibleCount}개 남음)
            </button>
          </div>
        )}

        {/* Subscribe Banner */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-12 p-6 rounded-2xl bg-gray-50 border border-gray-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-red-600 flex items-center justify-center">
              <Youtube size={24} className="text-white" />
            </div>
            <div>
              <h4 className="text-[16px] font-bold text-gray-900">더 많은 쇼츠를 보고 싶다면?</h4>
              <p className="text-[13px] text-[#444444]">조인섭 변호사 채널에서 매주 새로운 법률 쇼츠가 업로드됩니다</p>
            </div>
          </div>
          <a
            href="https://www.youtube.com/@cho_ssglaw/shorts"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-[14px] font-semibold transition-colors"
          >
            채널 바로가기
            <ExternalLink size={14} />
          </a>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          인스타 웹툰 섹션
      ═══════════════════════════════════════════ */}
      <section className="bg-[#F8F4EE] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          {/* 헤더 */}
          <div className="flex items-center justify-between mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#E1306C] to-[#C13584] text-white text-[12px] font-bold mb-4">
                <Instagram size={14} />
                Instagram Webtoon
              </div>
              <h2 className="text-[28px] md:text-[36px] font-bold text-[#1A1A1A]">
                조변호사의 이혼사건 다이어리
              </h2>
              <p className="text-[15px] text-[#444444] mt-2 max-w-[500px]" style={{ wordBreak: "keep-all" }}>
                조인섭 변호사가 경험한 실제 사건들을 인스타그램에 연재하는 카툰입니다.
              </p>
            </div>
            <a
              href="https://www.instagram.com/insup_cho/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 text-[14px] text-[#9B2335] font-semibold hover:gap-2.5 transition-all"
            >
              인스타그램 보기 <ExternalLink size={14} />
            </a>
          </div>

          {/* 5화 그리드 */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {[
              { src: "/images/etc/webtoon/webtoon-01.jpg", alt: "이혼사건 다이어리 1화", ep: 1 },
              { src: "/images/etc/webtoon/webtoon-02.jpg", alt: "이혼사건 다이어리 2화", ep: 2 },
              { src: "/images/etc/webtoon/webtoon-03.jpg", alt: "이혼사건 다이어리 3화", ep: 3 },
              { src: "/images/etc/webtoon/webtoon-04.jpg", alt: "이혼사건 다이어리 4화", ep: 4 },
              { src: "/images/etc/webtoon/webtoon-05.jpg", alt: "이혼사건 다이어리 5화", ep: 5 },
            ].map((item) => (
              <a
                key={item.ep}
                href="https://www.instagram.com/insup_cho/"
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-white border border-[#E8E4DE] group-hover:-translate-y-1 group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#9B2335] text-white text-[11px] font-bold">
                    EP.{String(item.ep).padStart(2, "0")}
                  </span>
                </div>
                <p className="text-[14px] font-bold text-[#2C2028] mt-3 text-center group-hover:text-[#9B2335] transition-colors">
                  이혼사건 다이어리 {item.ep}화
                </p>
              </a>
            ))}
          </div>

          {/* 모바일 인스타 링크 */}
          <div className="text-center mt-8 md:hidden">
            <a
              href="https://www.instagram.com/insup_cho/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[14px] text-[#9B2335] font-semibold"
            >
              <Instagram size={16} />
              인스타그램에서 더보기
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
