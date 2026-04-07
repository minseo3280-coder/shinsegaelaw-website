"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, ExternalLink, Mic, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import MediaTabs from "@/components/shared/MediaTabs";
import SubPageHero from "@/components/shared/SubPageHero";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/* ─── Data ─── */
import newsData from "@/../../data/news.json";
import aboutData from "@/../../data/competitor_about_data.json";

/* ─── 카테고리별 색상 ─── */
const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  언론: { bg: "bg-blue-50", text: "text-blue-600" },
  소식: { bg: "bg-emerald-50", text: "text-emerald-600" },
  수상: { bg: "bg-amber-50", text: "text-amber-700" },
  특강: { bg: "bg-violet-50", text: "text-violet-600" },
  협약: { bg: "bg-teal-50", text: "text-teal-600" },
  학회: { bg: "bg-slate-100", text: "text-slate-600" },
};

/* ─── 원본 사이트 history_cards + 연도/이미지 매핑 ─── */
const historyCards = aboutData.sections.sec_03_specialty_firm.history_cards;
const HISTORY_YEARS = ["24인의 전문가 법률 그룹", "2021년", "2020년", "2019년", "2018년", "2016년", "2016년", "2014년", "2013년"];
const HISTORY_IMAGES = [
  "/images/ihon-site/about/about_history_01.webp",
  "/images/ihon-site/about/about_history_02.webp",
  "/images/ihon-site/about/about_history_03.webp",
  "/images/ihon-site/about/about_history_04.webp",
  "/images/ihon-site/about/about_history_05.webp",
  "/images/ihon-site/about/about_history_06.webp",
  "/images/ihon-site/about/about_history_07.webp",
  "/images/ihon-site/about/about_history_08.webp",
  "/images/ihon-site/about/about_history_09.webp",
];

/* ─── Featured + 특별 뉴스 ─── */
const featuredNews = newsData.find(
  (n) => n.id === "news-09" || (n as Record<string, unknown>).featured === true
);
const specialNews = newsData.find((n) => n.id === "news-special");

/* ─── 뉴스 캐러셀 컴포넌트 ─── */
function NewsCarousel() {
  const [swiperRef, setSwiperRef] = useState<SwiperType | null>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section className="bg-[#F8F4EE]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-10 md:py-24">
        {/* 헤더 + 네비게이션 */}
        <div className="flex items-end justify-between mb-8 md:mb-10" data-reveal>
          <div>
            <p className="text-[13px] font-bold tracking-[0.3em] uppercase text-burgundy-500 mb-2">
              Professional Recognition
            </p>
            <h3
              className="font-sans text-[24px] md:text-[30px] font-bold text-[#2C2028]"
              style={{ wordBreak: "keep-all" }}
            >
              전문가가 인정한 <span className="text-burgundy-500">전문 이혼 로펌</span>
            </h3>
          </div>
          {/* 화살표 네비게이션 */}
          <div className="flex items-center gap-3">
            <span className="text-[15px] text-[#333333] font-semibold hidden sm:block">
              {String(activeIdx + 1).padStart(2, "0")}{" "}
              <span className="text-[#D0CACC]">/</span>{" "}
              {String(historyCards.length).padStart(2, "0")}
            </span>
            <button
              onClick={() => swiperRef?.slidePrev()}
              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:border-burgundy-500 hover:text-burgundy-500 transition-colors"
              aria-label="이전"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => swiperRef?.slideNext()}
              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:border-burgundy-500 hover:text-burgundy-500 transition-colors"
              aria-label="다음"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Swiper */}
        <Swiper
          modules={[Navigation, Autoplay]}
          onSwiper={setSwiperRef}
          onSlideChange={(s) => setActiveIdx(s.realIndex)}
          slidesPerView={1.15}
          spaceBetween={16}
          breakpoints={{
            640: { slidesPerView: 2.2, spaceBetween: 20 },
            1024: { slidesPerView: 3.2, spaceBetween: 24 },
          }}
          autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          loop
          className="!overflow-visible"
        >
          {historyCards.map((card, i) => {
            const year = HISTORY_YEARS[i];
            const img = HISTORY_IMAGES[i];

            return (
              <SwiperSlide key={i} className="!h-auto">
                <article className="group relative bg-white rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                  {/* 골드 연도/라벨 배지 — 항상 표시 */}
                  <div className="bg-[#C9A84C] text-center py-2.5 flex-shrink-0">
                    <span className="text-white text-[15px] font-bold tracking-wide">
                      {year}
                    </span>
                  </div>

                  {/* 이미지 */}
                  <div className="relative aspect-[4/3] overflow-hidden flex-shrink-0">
                    <Image
                      src={img}
                      alt={card.title}
                      fill
                      sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* 텍스트 */}
                  <div className="p-4 md:p-6 flex-1 flex flex-col">
                    <h3
                      className="font-sans text-[16px] md:text-[17px] font-bold text-[#2C2028] leading-snug mb-2.5 group-hover:text-burgundy-600 transition-colors"
                      style={{ wordBreak: "keep-all" }}
                    >
                      {card.title}
                    </h3>

                    <p
                      className="text-[14px] md:text-[16px] text-[#333333] leading-relaxed"
                      style={{ wordBreak: "keep-all" }}
                    >
                      {card.description}
                    </p>
                  </div>
                </article>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}

export default function NewsPage() {
  const containerRef = useScrollReveal();

  return (
    <div ref={containerRef} className="">
      <SubPageHero
        titleKo="신세계로 소식"
        breadcrumbs={[
          { label: "미디어", href: "/news" },
          { label: "신세계로 소식" },
        ]}
        bannerImage="/images/office/banner-about.jpg"
      />

      <MediaTabs activeTab={0} />

      {/* ═══════════════════════════════════════════
          섹션 1 — Featured 뉴스
      ═══════════════════════════════════════════ */}
      <section className="bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-8 md:pt-24 pb-10 md:pb-20">
          {/* 헤드라인 */}
          <div className="mb-8 md:mb-14" data-reveal>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-[2px] bg-burgundy-500" />
              <p className="text-[14px] tracking-[0.3em] uppercase font-bold text-burgundy-500">
                Shinsegae Law News
              </p>
            </div>
            <h2
              className="font-sans text-[24px] md:text-[42px] lg:text-[48px] leading-[1.3] font-bold text-[#2C2028] mb-6"
              style={{ wordBreak: "keep-all" }}
            >
              법률의 <span className="text-burgundy-500">새로운 기준</span>을
              <br className="hidden md:block" />
              만들어가는 신세계로
            </h2>
            <p className="text-[15px] md:text-[18px] text-[#333333] leading-relaxed max-w-3xl">
              학술 활동, 언론 출연, 주요 협약 등 법무법인 신세계로의 활동을 전합니다.
            </p>
          </div>

          {/* Featured Card — 제1호 가족법 전문변호사 */}
          {featuredNews && (
            <div
              className="group relative overflow-hidden rounded-2xl bg-[#F8F4EE] shadow-[0_8px_40px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_48px_rgba(0,0,0,0.12)] transition-all duration-500"
              data-reveal
            >
              <div className="grid md:grid-cols-2 gap-0">
                {/* 이미지 */}
                <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden">
                  <Image
                    src={featuredNews.image || "/images/etc/news_img04.png"}
                    alt={featuredNews.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10 md:bg-gradient-to-l md:from-[#F8F4EE]/30 md:to-transparent" />
                  {/* FEATURED 라벨 */}
                  <div className="absolute top-5 left-5">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-burgundy-500 text-white text-[12px] font-bold tracking-wide shadow-lg">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
                      FEATURED
                    </span>
                  </div>
                </div>

                {/* 텍스트 */}
                <div className="flex flex-col justify-center p-5 md:p-10 lg:p-14">
                  <div className="flex items-center gap-3 mb-5">
                    <span className={`px-3 py-1 rounded-full text-[12px] font-bold ${CATEGORY_COLORS[featuredNews.category]?.bg || "bg-gray-100"} ${CATEGORY_COLORS[featuredNews.category]?.text || "text-[#333333]"}`}>
                      {featuredNews.category}
                    </span>
                    <span className="text-[15px] text-[#333333] font-semibold">
                      {featuredNews.date}
                    </span>
                  </div>
                  <h3
                    className="font-sans text-[24px] md:text-[30px] lg:text-[34px] font-bold text-[#2C2028] leading-[1.3] mb-5"
                    style={{ wordBreak: "keep-all" }}
                  >
                    {featuredNews.title}
                  </h3>
                  <p className="text-[15px] md:text-[18px] text-[#333333] leading-[1.8] mb-6">
                    {featuredNews.desc}
                  </p>
                  {featuredNews.relatedLawyer && (
                    <p className="text-[15px] text-burgundy-500 font-semibold">
                      {featuredNews.relatedLawyer}
                    </p>
                  )}
                  {featuredNews.link && (
                    <a
                      href={featuredNews.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[15px] text-burgundy-500 font-semibold mt-3 hover:underline"
                    >
                      기사 보기
                      <ExternalLink size={13} />
                    </a>
                  )}
                </div>
              </div>
              {/* 골드 상단 악센트 */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-gold-400 via-gold-500 to-gold-400" />
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          섹션 2 — 뉴스 Swiper 캐러셀
      ═══════════════════════════════════════════ */}
      <NewsCarousel />


      {/* ═══════════════════════════════════════════
          섹션 3 — 사회를 향한 따뜻한 마음 (특별 뉴스 + 인용 밴드)
      ═══════════════════════════════════════════ */}
      {specialNews && (
        <section className="relative py-8 md:py-28 overflow-hidden" data-reveal>
          <Image
            src="/images/office/banner-consultation.jpg"
            alt=""
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/65" />
          <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 text-center">
            <p className="text-[13px] font-bold tracking-[0.3em] uppercase text-gold-400 mb-6">
              Our Commitment
            </p>
            <blockquote
              className="text-[18px] md:text-[34px] text-white leading-[1.5] font-semibold"
              style={{ wordBreak: "keep-all" }}
            >
              &ldquo;사회를 향한 따뜻한 마음,
              <br className="hidden md:block" />
              의뢰인에 대한 따뜻한 마음으로 이어집니다.&rdquo;
            </blockquote>
            <div className="w-12 h-[2px] bg-gold-500 mt-8 mx-auto rounded-full" />
            <p className="text-[14px] md:text-[18px] text-white/75 mt-6 max-w-[560px] mx-auto leading-[1.8]">
              2012년 조두순 사건 국가배상 승소 변호사로서
              여성가족부 장관 표창을 받았습니다.
            </p>
            {specialNews.link && (
              <a
                href={specialNews.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-6 px-6 py-2.5 rounded-full border border-white/30 text-white/90 text-[15px] font-semibold hover:bg-white/10 transition-colors"
              >
                관련 기사 보기
                <ExternalLink size={14} />
              </a>
            )}
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════
          섹션 4 — YTN 라디오 + 홍보영상
      ═══════════════════════════════════════════ */}
      <section className="bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-10 md:py-24">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* 홍보영상 */}
            <div data-reveal>
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.1)]">
                <iframe
                  src="https://www.youtube.com/embed/C_qK42v-Djo"
                  title="법무법인 신세계로 홍보영상"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                  loading="lazy"
                />
              </div>
              <p className="text-[15px] text-[#333333] text-center mt-3">
                법무법인 신세계로 공식 홍보영상
              </p>
            </div>

            {/* YTN 라디오 소개 */}
            <div data-reveal>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-11 h-11 rounded-full bg-burgundy-50 flex items-center justify-center">
                  <Mic size={20} className="text-burgundy-500" />
                </div>
                <span className="text-[13px] font-bold tracking-[0.2em] uppercase text-burgundy-500">
                  YTN Radio
                </span>
              </div>
              <h3
                className="font-sans text-[20px] md:text-[32px] font-bold text-[#2C2028] leading-[1.3] mb-5"
                style={{ wordBreak: "keep-all" }}
              >
                조인섭 변호사의 상담소
              </h3>
              <p className="text-[15px] md:text-[18px] text-[#333333] leading-[1.8] mb-6">
                2023년부터 YTN 라디오를 통해 법률 상담 프로그램을 진행하며
                대중에게 정확한 법률 지식을 전달하고 있습니다.
                이혼, 상속, 양육권 등 가사 사건에 대한 실질적인 조언을 제공합니다.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/media/channel"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-burgundy-500 text-white text-[15px] font-semibold hover:bg-burgundy-600 transition-colors"
                >
                  영상 채널 보기
                  <ArrowRight size={14} />
                </Link>
                <Link
                  href="/media/column"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-300 text-[#333333] text-[15px] font-semibold hover:border-burgundy-300 hover:text-burgundy-500 transition-all"
                >
                  법률 칼럼 보기
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          섹션 5 — 전문분야 인증 변호사
      ═══════════════════════════════════════════ */}
      <section className="bg-[#F8F4EE]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-10 md:py-24">
          {/* Header: 좌정렬 + 우측 통계 */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12" data-reveal>
            <div>
              <p className="text-[13px] font-bold tracking-[0.3em] uppercase text-burgundy-500 mb-3">
                Certified Specialists
              </p>
              <h2
                className="font-sans text-[28px] md:text-[38px] font-bold text-[#2C2028] leading-[1.3]"
                style={{ wordBreak: "keep-all" }}
              >
                대한변협이 인증한
                <br />
                <span className="text-burgundy-500">전문분야 등록 변호사</span>
              </h2>
              <p className="text-[14px] md:text-[17px] text-[#333333] mt-3 max-w-[480px] leading-relaxed">
                대한변호사협회의 엄격한 심사를 거쳐 전문분야 등록을 완료한 변호사들이
                의뢰인의 사건을 전담합니다.
              </p>
            </div>
            <div className="flex gap-6 md:gap-8 flex-shrink-0">
              <div className="text-center">
                <p className="text-[26px] md:text-[44px] font-bold text-burgundy-500 leading-none">8</p>
                <p className="text-[13px] text-[#333333] mt-1 font-semibold">인증 변호사</p>
              </div>
              <div className="text-center">
                <p className="text-[26px] md:text-[44px] font-bold text-burgundy-500 leading-none">5</p>
                <p className="text-[13px] text-[#333333] mt-1 font-semibold">전문 분야</p>
              </div>
            </div>
          </div>

          {/* 변호사별 인증 카드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: "조인섭", position: "대표변호사", role: "제1호", photo: "/images/attorneys/cho-inseop.jpg", certifications: ["가족법", "상속"] },
              { name: "김미루", position: "서울총괄 · 이혼소송총괄팀장", role: "총괄", photo: "/images/attorneys/kim-miru.jpg", certifications: ["이혼"] },
              { name: "류현주", position: "대전총괄 · 재산분할팀장", role: "총괄", photo: "/images/attorneys/ryu-hyunju.jpg", certifications: ["가사법", "상속"] },
              { name: "신진희", position: "수원총괄 · 위자료팀장", role: "총괄", photo: "/images/attorneys/shin-jinhee.jpg", certifications: ["가사법"] },
              { name: "이명인", position: "수석 · 형사팀장", role: null, photo: "/images/attorneys/lee-myungin.jpg", certifications: ["이혼"] },
              { name: "조윤용", position: "수석 · 상속팀장", role: null, photo: "/images/attorneys/cho-yunyong.jpg", certifications: ["가사법", "상속"] },
            ].map((lawyer, i) => (
              <div
                key={lawyer.name}
                className="group flex gap-5 p-5 rounded-xl bg-[#FAFAF8] border border-gray-100 hover:bg-white hover:shadow-[0_4px_24px_rgba(0,0,0,0.08)] hover:border-burgundy-100 transition-all duration-300"
                data-reveal
              >
                {/* 좌: 순번 + 사진 */}
                <div className="flex-shrink-0 relative">
                  <span className="absolute -top-1 -left-1 z-10 w-6 h-6 rounded-full bg-burgundy-500 text-white text-[12px] font-bold flex items-center justify-center">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="w-[72px] h-[72px] rounded-xl overflow-hidden bg-gray-100">
                    <Image
                      src={lawyer.photo}
                      alt={`${lawyer.name} 변호사`}
                      width={72}
                      height={72}
                      className="object-cover object-top w-full h-full"
                    />
                  </div>
                </div>

                {/* 우: 정보 */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-sans text-[16px] font-bold text-[#2C2028]">
                      {lawyer.name} <span className="font-medium text-[#333333]">변호사</span>
                    </h3>
                    {lawyer.role && (
                      <span className="px-2 py-0.5 rounded bg-burgundy-50 text-burgundy-600 text-[12px] font-bold flex-shrink-0">
                        {lawyer.role}
                      </span>
                    )}
                  </div>
                  <p className="text-[15px] text-[#333333] mb-2.5">{lawyer.position}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {lawyer.certifications.map((cert) => (
                      <span
                        key={cert}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white border border-gray-200 text-[12px] font-semibold text-[#333333] group-hover:border-burgundy-200 group-hover:text-burgundy-600 transition-colors"
                      >
                        <Award size={11} className="text-gold-500" />
                        {cert} 전문
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-[13px] text-[#333333] text-center mt-8" data-reveal>
            * 대한변호사협회 전문분야 등록 변호사 기준
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          섹션 6 — 학위 · 수상 · 인증 갤러리
      ═══════════════════════════════════════════ */}
      <section className="bg-[#F8F4EE]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-10 md:py-24">
          <div className="text-center mb-12" data-reveal>
            <p className="text-[13px] font-bold tracking-[0.3em] uppercase text-[#333333] mb-4">
              Degrees &amp; Awards
            </p>
            <h3
              className="font-sans text-[26px] md:text-[34px] font-bold text-[#2C2028] leading-[1.3]"
              style={{ wordBreak: "keep-all" }}
            >
              학위와 수상으로 증명된 <span className="text-burgundy-500">전문성</span>
            </h3>
            <p className="text-[13px] md:text-[16px] text-[#333333] mt-4 max-w-[480px] mx-auto leading-relaxed">
              대한변호사협회 전문분야 등록과 학위, 표창으로 검증된 역량입니다.
            </p>
          </div>

          <div
            className="grid grid-cols-3 gap-3 md:gap-8 max-w-[1400px] mx-auto"
            data-reveal
          >
            {[
              {
                src: "/images/etc/cert-family-law.png",
                label: "전문분야 등록증서",
                sub: "가족법",
              },
              {
                src: "/images/etc/cert-inheritance.png",
                label: "전문분야 등록증서",
                sub: "상속",
              },
              {
                src: "/images/etc/award-minister.png",
                label: "여성가족부 장관 표창장",
                sub: "조두순 사건 국가배상 승소",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group text-center"
              >
                <div className="relative aspect-[3/4] rounded-lg md:rounded-xl overflow-hidden border border-gray-200/80 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)] group-hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)] group-hover:-translate-y-1 transition-all duration-300">
                  <Image
                    src={item.src}
                    alt={item.label}
                    fill
                    sizes="33vw"
                    className="object-contain p-1.5 md:p-3"
                  />
                </div>
                <h4 className="font-sans text-[12px] md:text-[16px] font-bold text-[#2C2028] mt-2 md:mt-4 mb-0.5 md:mb-1">
                  {item.label}
                </h4>
                <p className="text-[11px] md:text-[15px] text-[#333333] break-keep">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
