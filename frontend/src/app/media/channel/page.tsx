"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, ExternalLink, Instagram } from "lucide-react";
import MediaTabs from "@/components/shared/MediaTabs";
import SubPageHero from "@/components/shared/SubPageHero";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/* ─── Data ─── */
import youtubeData from "@/../../data/youtube.json";
import shortsRaw from "@/../../data/shorts.json";
import webtoonData from "@/../../data/webtoon.json";

const shortsData = shortsRaw as {
  meta?: { total: number };
  videos: {
    id: string;
    title: string;
    thumbnail?: string;
    date?: string | null;
  }[];
};

const YT_PER_PAGE = 3;
const SHORTS_PER_PAGE = 4;

/* ─── 공통 컨테이너 (YK 스타일 넓은 레이아웃) ─── */
const CONTAINER = "max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10";

export default function ChannelPage() {
  const revealRef = useScrollReveal();

  /* ── YouTube ── */
  const videos = youtubeData.recent_videos;
  const channels = youtubeData.channels;
  const ytTotal = videos.length;
  const [ytVisible, setYtVisible] = useState(YT_PER_PAGE);
  const ytSlice = videos.slice(0, ytVisible);
  const ytMore = ytVisible < ytTotal;

  /* ── Shorts ── */
  const shorts = shortsData.videos || [];
  const shortsTotal = shorts.length;
  const [shortsVisible, setShortsVisible] = useState(SHORTS_PER_PAGE);
  const shortsSlice = shorts.slice(0, shortsVisible);
  const shortsMore = shortsVisible < shortsTotal;

  /* ── Webtoon ── */
  const webtoonEpisodes = webtoonData.episodes;

  return (
    <div ref={revealRef} className="">
      <SubPageHero
        titleKo="영상채널"
        breadcrumbs={[
          { label: "미디어", href: "/news" },
          { label: "영상채널" },
        ]}
        bannerImage="/images/office/banner-reviews.jpg"
      />

      <MediaTabs activeTab={2} />

      {/* ═══════════════════════════════════════════
          헤드라인 섹션
      ═══════════════════════════════════════════ */}
      <section className="bg-white py-14 md:py-20">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10" data-reveal>
          <div className="mb-6">
            <p className="text-[14px] tracking-[0.3em] uppercase font-bold text-burgundy-500">
              Media Channels
            </p>
          </div>
          <h2
            className="font-sans text-[21px] md:text-[42px] lg:text-[48px] leading-[1.3] font-bold text-[#2C2028] mb-4 md:mb-6"
            style={{ wordBreak: "keep-all" }}
          >
            법률의 문턱을 낮추는
            <br />
            신세계로 <span className="text-burgundy-500">디지털 소통</span>
          </h2>
          <p
            className="text-[15px] md:text-[18px] leading-[1.9] text-[#333333] max-w-3xl"
            style={{ wordBreak: "keep-all" }}
          >
            유튜브 영상부터 인스타그램 웹툰까지, 신세계로가 제안하는 다채로운
            미디어 채널을 통해 복잡한 법률 지식을 쉽고 친근하게 만나보세요.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          ZONE 1 — YouTube
      ═══════════════════════════════════════════ */}

      {/* Channel Banner */}
      <div className="bg-[#F5F5F5] border-b border-gray-200">
        <div className={`${CONTAINER} py-7 md:py-8`}>
          <div className="flex items-center gap-5 md:gap-6" data-reveal>
            <Image
              src="/images/etc/youtube/channel-divorce.jpg"
              alt={channels[0].name}
              width={96}
              height={96}
              className="rounded-full object-cover flex-shrink-0 w-[72px] h-[72px] md:w-[96px] md:h-[96px]"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="font-sans text-[24px] md:text-[30px] font-bold text-[#222]">
                  {channels[0].name}
                </h2>
                <a
                  href={channels[0].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 rounded bg-[#222] text-white text-[15px] font-semibold hover:bg-[#9B2335] transition-colors"
                >
                  구독하기
                </a>
              </div>
              <p className="text-[14px] md:text-[17px] text-[#333333] mt-2">
                {channels[0].description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* YouTube Grid */}
      <section className="bg-white py-14 md:py-20">
        <div className={CONTAINER}>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            data-reveal
          >
            {ytSlice.map((video) => (
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
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 450px"
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  />
                </div>
                <h3 className="font-sans text-[14px] md:text-[18px] font-semibold text-[#333] mt-3 md:mt-4 leading-[1.5] line-clamp-2 group-hover:text-[#9B2335] transition-colors">
                  {video.title}
                </h3>
                {(video as unknown as { date?: string | null }).date && (
                  <p className="text-[16px] text-[#444444] mt-2">
                    {(video as unknown as { date?: string | null }).date}
                  </p>
                )}
              </a>
            ))}
          </div>

          {ytMore && (
            <div className="text-center mt-14">
              <button
                onClick={() => setYtVisible((prev) => prev + YT_PER_PAGE)}
                className="inline-flex items-center gap-2 px-14 py-4 rounded-full border border-gray-300 text-[16px] font-semibold text-[#555] hover:border-[#9B2335] hover:text-[#9B2335] transition-colors"
              >
                더보기
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          ZONE 2 — Shorts
      ═══════════════════════════════════════════ */}
      <section className="bg-white py-14 md:py-20">
        <div className={CONTAINER}>
          {/* Header */}
          <div className="flex items-center justify-between mb-10" data-reveal>
            <div className="flex items-center gap-2.5">
              <Image
                src="/images/etc/youtube/shorts-logo.png"
                alt="YouTube Shorts"
                width={180}
                height={52}
                className="h-[44px] md:h-[52px] w-auto flex-shrink-0"
              />
            </div>
            <a
              href="https://www.youtube.com/@divorce_story/shorts"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 text-[16px] text-[#999] hover:text-[#9B2335] transition-colors"
            >
              전체보기 <ExternalLink size={15} />
            </a>
          </div>

          {/* 4-Column Grid */}
          <div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-7"
            data-reveal
          >
            {shortsSlice.map((video) => (
              <a
                key={video.id}
                href={`https://www.youtube.com/shorts/${video.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="relative aspect-[3/4] sm:aspect-[9/16] max-h-[240px] sm:max-h-[360px] md:max-h-none rounded-xl overflow-hidden bg-gray-100">
                  <Image
                    src={
                      video.thumbnail ||
                      `https://i.ytimg.com/vi/${video.id}/oardefault.jpg`
                    }
                    alt={video.title || "쇼츠 영상"}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-3 py-1.5 rounded bg-red-600/90 text-white text-[15px] font-bold backdrop-blur-sm">
                    <Play size={11} fill="currentColor" />
                    Shorts
                  </span>
                </div>
                <p className="text-[14px] md:text-[17px] font-semibold text-[#333] mt-2.5 md:mt-3.5 line-clamp-2 group-hover:text-[#9B2335] transition-colors">
                  {video.title || ""}
                </p>
              </a>
            ))}
          </div>

          {shortsMore && (
            <div className="text-center mt-12">
              <button
                onClick={() =>
                  setShortsVisible((prev) => prev + SHORTS_PER_PAGE)
                }
                className="inline-flex items-center gap-2 px-14 py-4 rounded-full border border-gray-300 text-[16px] font-semibold text-[#555] hover:border-[#9B2335] hover:text-[#9B2335] transition-colors"
              >
                더보기
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ─── 구분선 ─── */}
      <div className={CONTAINER}>
        <hr className="border-gray-200" />
      </div>

      {/* ═══════════════════════════════════════════
          ZONE 3 — 인스타 웹툰
      ═══════════════════════════════════════════ */}
      <section className="bg-white py-14 md:py-20">
        <div className={CONTAINER}>
          {/* Header */}
          <div className="flex items-center justify-between mb-10" data-reveal>
            <div className="flex items-center gap-4 md:gap-5">
              <div className="relative flex-shrink-0">
                <Image
                  src="/images/etc/webtoon/instagram-profile.jpg"
                  alt="@insup_cho"
                  width={68}
                  height={68}
                  className="rounded-full object-cover w-[56px] h-[56px] md:w-[68px] md:h-[68px]"
                />
                <div className="absolute -bottom-0.5 -right-0.5 w-6 h-6 rounded-full bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF] flex items-center justify-center border-2 border-white">
                  <Instagram size={12} className="text-white" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 flex-wrap">
                  <h2 className="font-sans text-[24px] md:text-[28px] font-bold text-[#222]">
                    조인섭 이혼전문변호사의 다이어리
                  </h2>
                  <a
                    href="https://www.instagram.com/insup_cho/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-5 py-2 rounded bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white text-[15px] font-semibold hover:opacity-90 transition-opacity"
                  >
                    <Instagram size={14} />
                    팔로우
                  </a>
                </div>
                <p className="text-[16px] text-[#444444] mt-1">
                  @insup_cho · 에피소드 {webtoonEpisodes.length}화
                </p>
              </div>
            </div>
          </div>

          {/* Episode Grid */}
          <div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5 md:gap-7"
            data-reveal
          >
            {webtoonEpisodes.map((ep) => (
              <a
                key={ep.id}
                href={
                  ep.instagram_url || "https://www.instagram.com/insup_cho/"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="relative aspect-square sm:aspect-[3/4] max-h-[200px] sm:max-h-[280px] md:max-h-none rounded-xl overflow-hidden bg-gray-100">
                  <Image
                    src={ep.image}
                    alt={`${ep.title} - ${ep.id}화`}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
                    className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1.5 rounded bg-[#9B2335]/90 text-white text-[15px] font-bold">
                    EP.{String(ep.id).padStart(2, "0")}
                  </span>
                </div>
                <p className="text-[17px] md:text-[18px] font-semibold text-[#333] mt-3.5 group-hover:text-[#9B2335] transition-colors leading-tight">
                  {ep.title}
                </p>
                <p className="text-[16px] text-[#444444] mt-1.5">{ep.date}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
