"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, ExternalLink, Youtube, Video } from "lucide-react";
import MediaTabs from "@/components/shared/MediaTabs";
import SubPageHero from "@/components/shared/SubPageHero";
import youtubeData from "@/../../data/youtube.json";

const ITEMS_PER_PAGE = 16;

export default function YoutubePage() {
  const featured = youtubeData.featured_video;
  const videos = youtubeData.recent_videos;
  const channels = youtubeData.channels;
  const totalCount = videos.length;

  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const visibleVideos = videos.slice(0, visibleCount);
  const hasMore = visibleCount < totalCount;

  return (
    <div className="">
      <SubPageHero
        titleKo="유튜브채널"
        breadcrumbs={[
          { label: "미디어", href: "/news" },
          { label: "유튜브채널" },
        ]}
        bannerImage="/images/office/banner-reviews.jpg"
      />

      <MediaTabs activeTab={2} />

      <div className="max-w-7xl mx-auto px-6 md:px-8 pt-12 md:pt-16 pb-20 md:pb-28">
        {/* Section Header */}
        <div className="mb-10">
          <p className="text-[15px] font-semibold tracking-[0.3em] uppercase text-burgundy-500 mb-3">
            YouTube Channel
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight leading-tight">
            법률 전문가의 <span className="text-burgundy-500">생생한 이야기</span>
          </h2>
          <p className="text-[15px] text-[#444444] leading-relaxed mt-3 max-w-[600px]">
            이혼·상속 전문 조인섭 변호사가 법률 지식과 실무 경험을 영상으로 전해드립니다.
          </p>
        </div>

        {/* Channel Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
          {channels.map((ch) => (
            <a
              key={ch.handle}
              href={ch.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-5 p-6 rounded-2xl border border-gray-200 bg-white hover:border-burgundy-200 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center flex-shrink-0">
                <Youtube size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-[16px] font-bold text-gray-900 group-hover:text-burgundy-600 transition-colors">
                  {ch.name}
                </h3>
                <p className="text-[15px] text-[#888888] mt-0.5">
                  {(ch as { description?: string }).description || "법률 상담 채널"}
                </p>
                <p className="text-[14px] font-semibold text-burgundy-500 mt-1">{ch.handle}</p>
              </div>
            </a>
          ))}
        </div>

        {/* Featured Video */}
        <div className="mb-12">
          <div className="w-full rounded-2xl overflow-hidden shadow-xl">
            <div className="aspect-video">
              <iframe
                src={featured.embed_url}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title={featured.title}
              />
            </div>
          </div>
          <div className="mt-4 px-1">
            <h3 className="text-[18px] font-bold text-gray-900 leading-snug">
              {featured.title}
            </h3>
            <p className="text-[15px] text-[#888888] mt-1">
              법무법인 신세계로 대표변호사 · 제1호 가족법 전문변호사
            </p>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-200 rounded-2xl overflow-hidden mb-12">
          {[
            { num: "2", label: "공식 채널" },
            { num: `${totalCount}+`, label: "영상 콘텐츠" },
            { num: "52년", label: "법조 전통" },
            { num: "1,053건", label: "승소사례" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white py-7 text-center">
              <p className="text-2xl md:text-3xl font-extrabold text-burgundy-500 tracking-tight">
                {stat.num}
              </p>
              <p className="text-[15px] text-[#444444] font-semibold mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Recent Videos */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-xl font-bold text-gray-900">전체 영상</h3>
            <p className="text-[15px] text-[#888888] mt-1">조인섭 변호사의 법률 상담 영상 총 {totalCount}개</p>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-burgundy-50 text-burgundy-600 text-[15px] font-semibold">
            <Video size={12} />
            {totalCount}개
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {visibleVideos.map((video) => (
            <a
              key={video.id}
              href={`https://www.youtube.com/watch?v=${video.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center backdrop-blur-sm">
                    <Play size={20} className="text-burgundy-500 ml-0.5" fill="currentColor" />
                  </div>
                </div>
              </div>
              <p className="text-[14px] font-semibold text-[#2C2028] mt-3 leading-snug line-clamp-2">
                {video.title}
              </p>
              <p className="text-[14px] text-[#888888] mt-1">
                {(video as unknown as { date?: string | null }).date || "조인섭 변호사"}
              </p>
            </a>
          ))}
        </div>

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
              <h4 className="text-[16px] font-bold text-gray-900">조인섭 변호사 채널 구독하기</h4>
              <p className="text-[15px] text-[#444444]">이혼·상속 법률의 모든 것을 영상으로 만나보세요</p>
            </div>
          </div>
          <a
            href={channels[0].url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-[14px] font-semibold transition-colors"
          >
            구독하기
            <ExternalLink size={14} />
          </a>
        </div>
      </div>

    </div>
  );
}
