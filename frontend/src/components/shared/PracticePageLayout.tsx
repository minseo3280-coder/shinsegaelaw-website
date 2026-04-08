import Link from "next/link";
import SubPageHero from "@/components/shared/SubPageHero";
import PracticeTabs from "@/components/shared/PracticeTabs";
import MobileCTA from "@/components/shared/MobileCTA";
import PracticeRevealWrapper from "@/components/shared/PracticeRevealWrapper";

/* ─── Types ─── */
interface Section {
  heading: string;
  type: string;
  content: string[];
  list?: string[];
}

interface StatItem {
  value: string;
  suffix?: string;
  label: string;
}

interface KeypointItem {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

interface TeamInfo {
  name: string;
  leader: string;
  desc: string;
  slug: string;
}

interface HighlightBand {
  quote: string;
  author: string;
  statValue: string;
  statSuffix: string;
  statLabel: string;
}

interface RelatedCase {
  id?: number;
  category: string;
  title: string;
  result: string;
  amount?: string;
  amountSuffix?: string;
}

interface PracticePageLayoutProps {
  titleKo: string;
  titleEn: string;
  bannerImage: string;
  breadcrumbs: { label: string; href?: string }[];
  heroText?: string;
  stats?: StatItem[];
  pageHeadline: string;
  pageDesc: string;
  keypoints?: KeypointItem[];
  sections: Section[];
  images?: unknown[];
  highlight?: HighlightBand;
  team: TeamInfo;
  relatedCases?: RelatedCase[];
  ctaHeadline: string;
  ctaDesc: string;
  children?: React.ReactNode;
}

export default function PracticePageLayout({
  titleKo,
  titleEn,
  bannerImage,
  breadcrumbs,
  heroText: _heroText,
  stats,
  pageHeadline,
  pageDesc,
  keypoints,
  sections,
  images: _images,
  highlight,
  team,
  relatedCases,
  ctaHeadline,
  ctaDesc,
  children,
}: PracticePageLayoutProps) {
  /* 인용밴드 위/아래 분리 */
  const splitIndex = highlight
    ? Math.min(Math.ceil(sections.length * 0.4), 3)
    : sections.length;
  const sectionsTop = sections.slice(0, splitIndex);
  const sectionsBottom = sections.slice(splitIndex);

  /* ── 섹션 렌더 ── */
  const renderSection = (section: Section, i: number, isFirst: boolean) => {
    const isH2 = section.type === "h2";

    return (
      <div
        key={i}
        data-reveal
        className={isH2 ? "mt-16 md:mt-20 first:mt-0" : "mt-10"}
      >
        {/* h2 구분선 */}
        {isH2 && !isFirst && (
          <div className="border-t border-gray-100 mb-14 md:mb-16" />
        )}

        {isH2 ? (
          <h2 className="text-[22px] md:text-[26px] lg:text-[28px] font-bold text-gray-900 leading-[1.45] tracking-tight mb-8">
            {section.heading}
          </h2>
        ) : (
          <h3 className="text-[18px] md:text-[20px] font-bold text-[#2C2028] leading-[1.45] mb-6 pl-5 border-l-[2px] border-burgundy-500/25">
            {section.heading}
          </h3>
        )}

        {/* 본문 */}
        {section.content.map((p, j) => (
          <p
            key={j}
            className="text-[17px] md:text-[19px] text-[#333333] leading-[1.85] mb-5 last:mb-0"
            style={{ wordBreak: "keep-all" as const }}
          >
            {p}
          </p>
        ))}

        {/* 리스트 — 체크마크 카드형 */}
        {section.list && (
          <div className="mt-8 bg-[#FAFAF8] rounded-xl p-6 md:p-8">
            <div className="space-y-3.5">
              {section.list.map((item, k) => (
                <div key={k} className="flex items-start gap-3">
                  <svg className="w-5 h-5 mt-0.5 text-burgundy-500/60 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[16px] md:text-[18px] text-[#333333] leading-[1.75]">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderSections = (secs: Section[], startIdx: number) => {
    let isFirst = true;
    return secs.map((section, i) => {
      const firstFlag = isFirst;
      if (section.type === "h2") isFirst = false;
      return renderSection(section, startIdx + i, firstFlag && section.type === "h2");
    });
  };

  return (
    <PracticeRevealWrapper>
      <SubPageHero
        titleKo={titleKo}
        breadcrumbs={breadcrumbs}
        bannerImage={bannerImage}
      />
      <PracticeTabs />

      {/* ═══ 0. 통계 밴드 ═══ */}
      {stats && stats.length > 0 && (
        <div className="bg-[#F8F4EE]" data-reveal>
          <div className="max-w-5xl mx-auto px-6 md:px-10 py-8 md:py-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <p className="text-[24px] md:text-[28px] font-bold text-burgundy-500 tracking-tight leading-none">
                    {stat.value}
                    {stat.suffix && (
                      <span className="text-[16px] text-gold-500 font-bold ml-0.5">
                        {stat.suffix}
                      </span>
                    )}
                  </p>
                  <p className="text-[15px] text-[#444444] mt-2 font-semibold">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ═══ 1. 페이지 헤더 ═══ */}
      <div className="max-w-[860px] mx-auto px-6 md:px-10 pt-16 md:pt-24">
        {/* 영문 라벨 + 헤드라인 */}
        <p className="text-[15px] text-burgundy-500/40 tracking-[0.25em] uppercase font-semibold mb-4">
          {titleEn}
        </p>
        <h2
          className="text-[30px] md:text-[38px] lg:text-[44px] font-bold text-gray-900 tracking-tight leading-[1.3] whitespace-pre-line"
        >
          {pageHeadline}
        </h2>
        <p
          className="text-[17px] md:text-[19px] text-[#444444] leading-[1.8] mt-6 max-w-[640px]"
          style={{ wordBreak: "keep-all" as const }}
        >
          {pageDesc}
        </p>
      </div>

      {/* ═══ 1.5 키포인트 카드 ═══ */}
      {keypoints && keypoints.length > 0 && (
        <div className="max-w-[960px] mx-auto px-6 md:px-10 mt-12 md:mt-16" data-reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {keypoints.map((kp, i) => (
              <div
                key={i}
                className="bg-white border border-gray-100 rounded-xl p-5 md:p-6 transition-all duration-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 group"
              >
                <div className="w-10 h-10 rounded-lg bg-burgundy-500/[0.06] flex items-center justify-center mb-4 group-hover:bg-burgundy-500/[0.1] transition-colors">
                  {kp.icon}
                </div>
                <p className="text-[16px] font-bold text-gray-900 mb-2 leading-snug">
                  {kp.title}
                </p>
                <p className="text-[14.5px] text-[#444444] leading-[1.65]">
                  {kp.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ═══ 2. 법률 콘텐츠 (상단) ═══ */}
      <div className="max-w-[860px] mx-auto px-6 md:px-10 pt-16 md:pt-20 pb-4">
        {children}
        {renderSections(sectionsTop, 0)}
      </div>

      {/* ═══ 3. 인용 밴드 — 풀와이드 ═══ */}
      {highlight && (
        <div className="my-14 md:my-20 bg-[#F8F4EE]" data-reveal>
          <div className="max-w-[960px] mx-auto px-6 md:px-10 py-14 md:py-20">
            <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-start md:items-center">
              {/* 인용 */}
              <div className="flex-1 relative">
                <span className="absolute -top-6 -left-2 text-[80px] md:text-[100px] text-burgundy-500/[0.06] leading-none select-none">
                  &ldquo;
                </span>
                <p
                  className="relative text-[19px] md:text-[22px] text-[#2C2028] leading-[1.75] italic"
                  style={{ wordBreak: "keep-all" as const }}
                >
                  {highlight.quote}
                </p>
                <p className="mt-6 text-[16px] text-burgundy-500/70 font-semibold tracking-wide">
                  — {highlight.author}
                </p>
              </div>

              {/* 구분선 */}
              <div className="hidden md:block w-px h-24 bg-gray-300/40" />

              {/* 통계 */}
              <div className="flex-shrink-0 text-center md:text-right md:min-w-[140px]">
                <p className="flex items-baseline justify-center md:justify-end gap-0.5 whitespace-nowrap">
                  <span className="text-[44px] md:text-[56px] font-bold text-burgundy-500 tracking-tight leading-none">
                    {highlight.statValue}
                  </span>
                  <span className="text-[19px] font-bold text-gold-500 ml-0.5">
                    {highlight.statSuffix}
                  </span>
                </p>
                <p className="text-[15px] text-gray-400 mt-2 font-semibold">
                  {highlight.statLabel}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══ 4. 법률 콘텐츠 (하단) ═══ */}
      {sectionsBottom.length > 0 && (
        <div className="max-w-[860px] mx-auto px-6 md:px-10 pb-16 md:pb-24">
          {renderSections(sectionsBottom, splitIndex)}
        </div>
      )}

      {/* ═══ 5. 팀 + 승소사례 ═══ */}
      <div className="border-t border-gray-100">
        <div className="max-w-[860px] mx-auto px-6 md:px-10 py-16 md:py-24">
          {/* 팀 연결 */}
          <Link
            href={`/about/teams/${team.slug}`}
            data-reveal
            className="flex items-center gap-5 group p-5 md:p-6 -mx-1 rounded-xl hover:bg-[#FAFAF8] transition-all duration-300 mb-16"
          >
            <div
              className="w-[3px] h-12 rounded-full flex-shrink-0"
              style={{ background: "linear-gradient(to bottom, #9B2335, #C9A84C)" }}
            />
            <div className="flex-1 min-w-0">
              <p className="text-[15px] text-gray-400 font-semibold mb-1">
                전담 팀
              </p>
              <p className="text-[18px] md:text-[20px] font-bold text-gray-900 group-hover:text-burgundy-500 transition-colors">
                {team.name}
                <span className="text-gray-400 font-medium text-[16px] md:text-[18px] ml-2">
                  {team.leader} 팀장
                </span>
              </p>
            </div>
            <span className="text-[16px] text-gray-400 group-hover:text-burgundy-500 transition-colors whitespace-nowrap flex items-center gap-1">
              상세보기
              <svg
                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </Link>

          {/* 관련 승소사례 */}
          {relatedCases && relatedCases.length > 0 && (
            <div data-reveal>
              <div className="flex justify-between items-end mb-8">
                <h3 className="text-[22px] md:text-[24px] font-bold text-gray-900">
                  관련 승소사례
                </h3>
                <Link
                  href="/cases"
                  className="text-[15px] text-burgundy-500 font-semibold hover:underline"
                >
                  전체보기 →
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedCases.map((c, i) => (
                  <Link
                    key={i}
                    href={c.id ? `/cases/${c.id}` : "/cases"}
                    className="block border border-gray-100 rounded-xl p-6 transition-all duration-300 hover:border-burgundy-500/15 hover:shadow-[0_4px_20px_rgba(0,0,0,0.05)] group"
                  >
                    <span className="text-[14px] text-burgundy-500/60 font-semibold">
                      {c.category}
                    </span>
                    <h4 className="text-[16px] font-bold text-[#2C2028] mt-2 leading-[1.5] line-clamp-2 group-hover:text-burgundy-500 transition-colors">
                      {c.title}
                    </h4>
                    {c.amount ? (
                      <p className="mt-3 text-[26px] font-bold text-burgundy-500 tracking-tight">
                        {c.amount}
                        <span className="text-[16px] text-gold-500 font-bold ml-0.5">
                          {c.amountSuffix}
                        </span>
                      </p>
                    ) : (
                      <p className="mt-3 text-[16px] text-burgundy-500 font-bold">
                        {c.result}
                      </p>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ═══ 6. 하단 CTA ═══ */}
      <div className="relative overflow-hidden bg-[#1A1A2E]">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, #9B2335 0%, transparent 50%), radial-gradient(circle at 80% 50%, #C9A84C 0%, transparent 50%)",
          }}
        />
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(to right, transparent, #C9A84C40, transparent)" }}
        />

        <div className="relative max-w-4xl mx-auto px-6 md:px-10 py-16 md:py-20 text-center">
          <h3 className="text-[22px] md:text-[28px] lg:text-[32px] font-bold text-white mb-3 leading-[1.4]">
            {ctaHeadline}
          </h3>
          <p className="text-[16px] md:text-[18px] text-white/40 mb-10">
            {ctaDesc}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/consultation"
              className="inline-flex items-center gap-2 px-9 py-4 rounded-xl text-[16px] font-bold bg-burgundy-500 text-white hover:bg-burgundy-600 transition-all duration-300 shadow-lg hover:shadow-burgundy-500/20 group"
            >
              무료 상담 신청
              <svg
                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <a
              href="tel:1555-5961"
              className="inline-flex items-center gap-2 text-[16px] text-white/35 hover:text-gold-400 transition-colors"
              aria-label="대표전화 1555-5961"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>
              1555-5961
            </a>
          </div>
        </div>
      </div>

      <MobileCTA />
    </PracticeRevealWrapper>
  );
}
