"use client";

import { useState, useMemo, useCallback, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  ChevronRight,
  ChevronLeft,
  Calendar,
  Newspaper,
  ArrowRight,
  Phone,
  ExternalLink,
} from "lucide-react";
import MediaTabs from "@/components/shared/MediaTabs";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import pressData from "@/../../data/press.json";
import firmData from "@/../../data/firm_info.json";
import pressYoutubeIds from "@/../../data/press_youtube_ids.json";

/* ─── Types ─── */
interface PressArticle {
  k_id: number;
  title: string;
  date: string;
  source: string;
  lawyer: string;
  views: number;
  content: string;
  images: string[];
  localImages: string[];
}

/* ─── Constants ─── */
const articles = (pressData as { articles: PressArticle[] }).articles;

/* ── Content-type categorization (경쟁사 스타일) ── */
const BROADCAST_SOURCES = ["YTN", "KBS", "SBS", "MBC", "JTBC", "MBN", "EBS", "TV리포트", "SBSbiz"];
const NEWSPAPER_SOURCES = ["머니투데이", "아이뉴스24", "뉴스1", "파이낸셜뉴스", "이데일리", "세계일보", "서울경제", "뉴시스", "서울신문", "조선일보", "매일경제", "헤럴드경제", "노컷뉴스", "동아일보", "국민일보", "연합뉴스", "중앙일보", "한겨레", "경향신문", "문화일보", "아주경제", "아시아경제", "한경"];

function getContentType(source: string): "broadcast" | "newspaper" | "column" | "other" {
  if (BROADCAST_SOURCES.some((s) => source?.includes(s))) return "broadcast";
  if (NEWSPAPER_SOURCES.some((s) => source?.includes(s))) return "newspaper";
  return "newspaper"; // default to newspaper
}

const CONTENT_TYPE_CONFIG: Record<string, { label: string; color: string; bgColor: string }> = {
  broadcast: { label: "방송출연", color: "text-red-600", bgColor: "bg-red-50" },
  newspaper: { label: "신문기사", color: "text-blue-700", bgColor: "bg-blue-50" },
  column: { label: "칼럼", color: "text-emerald-700", bgColor: "bg-emerald-50" },
  other: { label: "언론보도", color: "text-[#333333]", bgColor: "bg-gray-100" },
};

const SOURCE_CATEGORIES = [
  { key: "전체", label: "전체" },
  { key: "YTN", label: "YTN 라디오" },
  { key: "머니투데이", label: "머니투데이" },
  { key: "아이뉴스24", label: "아이뉴스24" },
  { key: "뉴스1", label: "뉴스1" },
  { key: "파이낸셜뉴스", label: "파이낸셜뉴스" },
  { key: "기타", label: "기타" },
] as const;

const ITEMS_PER_PAGE_DESKTOP = 12;
const ITEMS_PER_PAGE_MOBILE = 6;

/* ─── Source counts ─── */
function getSourceCounts() {
  const counts: Record<string, number> = { 전체: articles.length };
  const mainKeys = ["YTN", "머니투데이", "아이뉴스24", "뉴스1", "파이낸셜뉴스"];
  articles.forEach((a) => {
    const matched = mainKeys.find((k) => a.source?.includes(k));
    if (matched) {
      counts[matched] = (counts[matched] || 0) + 1;
    } else {
      counts["기타"] = (counts["기타"] || 0) + 1;
    }
  });
  return counts;
}

const sourceCounts = getSourceCounts();

/* ─── YouTube thumbnails for YTN radio articles (실제 매칭된 영상) ─── */
const ytIdMapping = (pressYoutubeIds as { mapping: Record<string, string> }).mapping;
const ytThumbnailMap = new Map<number, string>();
Object.entries(ytIdMapping).forEach(([kId, videoId]) => {
  ytThumbnailMap.set(Number(kId), `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`);
});

/* ─── Media logos ─── */
const MEDIA_LOGOS = [
  { name: "KBS", src: "/images/system/kbs.png" },
  { name: "SBS", src: "/images/system/sbs.png" },
  { name: "MBC", src: "/images/system/mbc.png" },
  { name: "JTBC", src: "/images/system/jtbc.png" },
  { name: "YTN", src: "/images/system/ytn_radio.png" },
];

/* ─── Truncate ─── */
function truncate(text: string, max: number) {
  if (!text) return "";
  const clean = text
    .replace(/&middot;/g, "·")
    .replace(/&hellip;/g, "…")
    .replace(/\r?\n/g, " ")
    .trim();
  return clean.length > max ? clean.slice(0, max) + "…" : clean;
}

/* ═══════════════════════════════════════════════════
   Article Card — 경쟁사 스타일 (이미지 상단 + 카테고리 + CTA)
   ═══════════════════════════════════════════════════ */
function ArticleCard({ article, index }: { article: PressArticle; index: number }) {
  const hasImage = article.localImages && article.localImages.length > 0;
  const ytThumb = ytThumbnailMap.get(article.k_id);
  // YTN 라디오: 유튜브 썸네일 우선 (원본은 모두 동일한 상담소 포스터)
  const displayImage = ytThumb || (hasImage ? article.localImages[0] : null);
  const contentType = getContentType(article.source);
  const typeConfig = CONTENT_TYPE_CONFIG[contentType];

  return (
    <Link
      href={`/press/${article.k_id}`}
      className="group block bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-[0_20px_50px_rgba(155,35,53,0.07)] hover:-translate-y-1 transition-all duration-500"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Image */}
      <div className="relative aspect-[16/10] bg-[#F8F4EE] overflow-hidden">
        {displayImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={displayImage}
            alt={article.title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#F8F4EE] to-[#EDE8E0]">
            <div className="text-center">
              <Newspaper size={36} className="text-burgundy-200 mx-auto mb-2" />
              <p className="text-[15px] font-semibold text-burgundy-300/60">{article.source}</p>
            </div>
          </div>
        )}
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Content */}
      <div className="p-4 md:p-6 flex flex-col min-h-[180px] md:min-h-[220px]">
        {/* Category + Date row */}
        <div className="flex items-center gap-2.5 mb-3">
          <span className={`px-2.5 py-1 rounded text-[14px] font-bold tracking-[0.03em] ${typeConfig.color} ${typeConfig.bgColor}`}>
            {typeConfig.label}
          </span>
          <span className="text-[15px] text-[#444444] flex items-center gap-1">
            <Calendar size={10} />
            {article.date}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-sans text-[16px] md:text-[17px] font-bold text-[#2C2028] leading-[1.5] mb-3 line-clamp-2 group-hover:text-burgundy-600 transition-colors duration-300">
          {article.title}
        </h3>

        {/* Description */}
        <p className="text-[16px] md:text-[17px] text-[#333333] font-semibold leading-[1.8] line-clamp-3 mb-auto">
          {truncate(article.content, 120)}
        </p>

        {/* Bottom: Source + CTA */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <span className="text-[15px] text-[#444444] font-semibold tracking-[0.02em]">
            SOURCE: {article.source}
          </span>
          <span className="text-[14px] font-bold text-burgundy-500 flex items-center gap-1 group-hover:gap-2 transition-all duration-300">
            자세히 보기
            <ArrowRight size={12} />
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ═══════════════════════════════════════════════════
   Pagination
   ═══════════════════════════════════════════════════ */
function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  const pages: number[] = [];
  const start = Math.max(1, currentPage - 2);
  const end = Math.min(totalPages, start + 4);
  for (let i = start; i <= end; i++) pages.push(i);

  return (
    <div className="flex items-center justify-center gap-1.5 mt-8 md:mt-14">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-11 h-11 rounded-lg border border-gray-200 flex items-center justify-center text-[#888888] hover:text-burgundy-500 hover:border-burgundy-300 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <ChevronLeft size={16} />
      </button>
      {start > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="w-11 h-11 rounded-lg text-[15px] font-semibold border border-gray-200 text-[#444444] hover:border-burgundy-300 hover:text-burgundy-500 transition-all duration-200"
          >
            1
          </button>
          {start > 2 && <span className="w-6 text-center text-gray-300 text-[15px]">···</span>}
        </>
      )}
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`w-11 h-11 rounded-lg text-[15px] font-semibold transition-all duration-200 ${
            p === currentPage
              ? "bg-burgundy-500 text-white shadow-md shadow-burgundy-500/20"
              : "border border-gray-200 text-[#444444] hover:border-burgundy-300 hover:text-burgundy-500"
          }`}
        >
          {p}
        </button>
      ))}
      {end < totalPages && (
        <>
          {end < totalPages - 1 && <span className="w-6 text-center text-gray-300 text-[15px]">···</span>}
          <button
            onClick={() => onPageChange(totalPages)}
            className="w-11 h-11 rounded-lg text-[15px] font-semibold border border-gray-200 text-[#444444] hover:border-burgundy-300 hover:text-burgundy-500 transition-all duration-200"
          >
            {totalPages}
          </button>
        </>
      )}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-11 h-11 rounded-lg border border-gray-200 flex items-center justify-center text-[#888888] hover:text-burgundy-500 hover:border-burgundy-300 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   Main Content
   ═══════════════════════════════════════════════════ */
function PressContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const revealRef = useScrollReveal();

  // URL query state
  const filter = searchParams.get("source") || "전체";
  const search = searchParams.get("q") || "";
  const sort = (searchParams.get("sort") as "latest" | "views") || "latest";
  const page = Number(searchParams.get("page")) || 1;

  // Responsive page size
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  const itemsPerPage = isMobile ? ITEMS_PER_PAGE_MOBILE : ITEMS_PER_PAGE_DESKTOP;

  // Search expand state
  const [searchOpen, setSearchOpen] = useState(!!search);

  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (
          value === null ||
          value === "" ||
          (key === "source" && value === "전체") ||
          (key === "sort" && value === "latest") ||
          (key === "page" && value === "1")
        ) {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });
      const qs = params.toString();
      router.replace(qs ? `/press?${qs}` : "/press", { scroll: false });
    },
    [searchParams, router]
  );

  const setFilter = useCallback((v: string) => updateParams({ source: v, page: null }), [updateParams]);
  const setSort = useCallback((v: string) => updateParams({ sort: v, page: null }), [updateParams]);
  const setPage = useCallback((v: number) => updateParams({ page: String(v) }), [updateParams]);

  // Search input + debounce
  const [searchInput, setSearchInput] = useState(search);
  useEffect(() => {
    setSearchInput(search);
  }, [search]);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput !== search) {
        updateParams({ q: searchInput, page: null });
      }
    }, 300);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  const filtered = useMemo(() => {
    let result = [...articles];

    // Source filter
    if (filter !== "전체") {
      const mainKeys = ["YTN", "머니투데이", "아이뉴스24", "뉴스1", "파이낸셜뉴스"];
      if (filter === "기타") {
        result = result.filter((a) => !mainKeys.some((k) => a.source?.includes(k)));
      } else {
        result = result.filter((a) => a.source?.includes(filter));
      }
    }

    // Search
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (a) =>
          a.title?.toLowerCase().includes(q) ||
          a.content?.toLowerCase().includes(q) ||
          a.source?.toLowerCase().includes(q) ||
          a.lawyer?.toLowerCase().includes(q)
      );
    }

    // Sort
    if (sort === "views") {
      result.sort((a, b) => (b.views || 0) - (a.views || 0));
    } else {
      result.sort((a, b) => {
        if (!a.date || !b.date) return 0;
        return b.date.localeCompare(a.date);
      });
    }

    return result;
  }, [filter, search, sort]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handlePageChange = useCallback(
    (p: number) => {
      setPage(p);
      window.scrollTo({ top: 500, behavior: "smooth" });
    },
    [setPage]
  );

  return (
    <div ref={revealRef} className="">
      {/* ══════════════ Banner ══════════════ */}
      <section className="relative h-[180px] md:h-[280px] bg-[#0f0f1a] overflow-hidden">
        <Image
          src="/images/office/banner-reviews.jpg"
          alt="언론보도"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10 h-full flex flex-col justify-end pb-8">
          <nav className="flex items-center gap-2 text-[15px] text-white/30 mb-3" aria-label="breadcrumb">
            <Link href="/" className="hover:text-white/50 transition-colors duration-200">
              홈
            </Link>
            <ChevronRight size={12} className="text-white/20" />
            <Link href="/news" className="hover:text-white/50 transition-colors duration-200">
              미디어
            </Link>
            <ChevronRight size={12} className="text-white/20" />
            <span className="text-white/60">언론보도</span>
          </nav>
          <h1 className="font-sans text-2xl md:text-3xl font-bold text-white tracking-tight">언론보도</h1>
        </div>
      </section>

      {/* ══════════════ MediaTabs ══════════════ */}
      <MediaTabs activeTab={1} />

      {/* ══════════════ Hero Headline + Media Logos ══════════════ */}
      <section className="bg-white pt-14 md:pt-20 pb-8 md:pb-14">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="mb-8 md:mb-14" data-reveal>
            <div className="mb-4 md:mb-6">
              <p className="text-[15px] md:text-[16px] tracking-[0.3em] uppercase font-bold text-burgundy-500">
                Press Coverage
              </p>
            </div>
            <h2
              className="font-sans text-[22px] md:text-[42px] lg:text-[48px] leading-[1.3] font-bold text-[#2C2028] mb-4 md:mb-6"
              style={{ wordBreak: "keep-all" }}
            >
              신세계로의 <span className="text-burgundy-500">전문성</span>,
              <br className="hidden md:block" />
              언론이 먼저 주목합니다
            </h2>
            <p className="text-[16px] md:text-[19px] text-[#333333] font-semibold leading-relaxed max-w-3xl">
              KBS, MBC, SBS, JTBC, YTN 등 국내 주요 언론에 소개된
              <br className="hidden md:block" />
              법무법인 신세계로의 전문 분석과 법률 자문 기사입니다.
            </p>
          </div>

          {/* Media Logos */}
          <div className="flex items-center justify-center gap-6 md:gap-10 flex-wrap py-6 border-t border-b border-gray-100" data-reveal>
            {MEDIA_LOGOS.map((logo) => (
              <Image
                key={logo.name}
                src={logo.src}
                alt={logo.name}
                width={80}
                height={28}
                className="h-[22px] md:h-[28px] w-auto opacity-35 grayscale hover:opacity-70 hover:grayscale-0 transition-all duration-400"
              />
            ))}
            <span className="text-[14px] text-[#444444] font-semibold">외 70+ 매체</span>
          </div>
        </div>
      </section>

      {/* ══════════════ Filter + Grid Section ══════════════ */}
      <section className="bg-[#F8F4EE] py-14 md:py-20">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10">
          {/* ── Filters ── */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8" data-reveal>
            {/* Pills */}
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide md:flex-wrap -mx-5 px-5 md:mx-0 md:px-0 pb-2 md:pb-0 w-full md:w-auto snap-x snap-mandatory">
              {SOURCE_CATEGORIES.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setFilter(cat.key)}
                  className={`px-4 py-2.5 rounded-full text-[15px] font-semibold transition-all duration-200 whitespace-nowrap flex-shrink-0 min-h-[44px] snap-start ${
                    filter === cat.key
                      ? "bg-[#2C2028] text-white shadow-sm"
                      : "bg-white text-[#444444] hover:bg-white/80 hover:text-[#2C2028] border border-gray-200/60"
                  }`}
                >
                  {cat.label}
                  <span className={`ml-1.5 text-[14px] ${filter === cat.key ? "text-white/60" : "text-[#888888]"}`}>
                    {sourceCounts[cat.key] || 0}
                  </span>
                </button>
              ))}
            </div>

            {/* Search + Sort */}
            <div className="flex items-center gap-3">
              {/* Sort */}
              <div className="flex items-center bg-white rounded-full border border-gray-200/60 overflow-hidden">
                <button
                  onClick={() => setSort("latest")}
                  className={`px-3.5 py-2 text-[15px] font-semibold transition-all duration-200 ${
                    sort === "latest" ? "bg-[#2C2028] text-white" : "text-[#888888] hover:text-[#333333]"
                  }`}
                >
                  최신순
                </button>
                <button
                  onClick={() => setSort("views")}
                  className={`px-3.5 py-2 text-[15px] font-semibold transition-all duration-200 ${
                    sort === "views" ? "bg-[#2C2028] text-white" : "text-[#888888] hover:text-[#333333]"
                  }`}
                >
                  조회순
                </button>
              </div>

              {/* Search */}
              <div className="relative">
                {searchOpen ? (
                  <div className="flex items-center bg-white rounded-full border border-gray-200/60 overflow-hidden">
                    <Search size={14} className="ml-3.5 text-[#888888] flex-shrink-0" />
                    <input
                      type="text"
                      placeholder="기사 검색..."
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      onBlur={() => !searchInput && setSearchOpen(false)}
                      autoFocus
                      className="w-[140px] md:w-[200px] px-2.5 py-2 text-[14px] focus:outline-none bg-transparent"
                    />
                  </div>
                ) : (
                  <button
                    onClick={() => setSearchOpen(true)}
                    className="w-11 h-11 rounded-full bg-white border border-gray-200/60 flex items-center justify-center text-[#888888] hover:text-burgundy-500 hover:border-burgundy-300 transition-all duration-200"
                  >
                    <Search size={14} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Count */}
          <div className="flex items-center justify-between mb-6" data-reveal>
            <p className="text-[15px] text-[#333333] font-semibold">
              전체{" "}
              <span className="font-bold text-burgundy-600">{filtered.length.toLocaleString()}</span>건
            </p>
            {search.trim() && (
              <button
                onClick={() => {
                  setSearchInput("");
                  updateParams({ q: null, page: null });
                }}
                className="text-[15px] text-burgundy-500 hover:text-burgundy-700 transition-colors duration-200"
              >
                검색 초기화 ×
              </button>
            )}
          </div>

          {/* ── 3-Column Card Grid ── */}
          {filtered.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-2xl" data-reveal>
              <Newspaper size={48} className="text-gray-200 mx-auto mb-4" />
              <p className="text-[17px] font-bold text-[#444444] mb-2">검색 결과가 없습니다</p>
              <p className="text-[15px] text-[#444444]">다른 검색어로 시도해보세요</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7" data-reveal>
              {paginated.map((article, i) => (
                <ArticleCard key={article.k_id} article={article} index={i} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
          )}
        </div>
      </section>

      <section className="bg-white py-16 md:py-20" data-reveal>
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10 text-center">
          <p className="text-[14px] tracking-[0.3em] text-gold-500 uppercase font-bold mb-4">
            Free Consultation
          </p>
          <h2 className="font-sans text-[24px] md:text-[32px] font-bold text-[#2C2028] leading-[1.4] mb-4">
            언론이 인정한 전문성으로
            <br />
            당신의 권리를 지켜드립니다
          </h2>
          <p className="text-[16px] text-[#333333] font-semibold leading-[1.8] mb-8 max-w-md mx-auto">
            52년 법조 전통의 법무법인 신세계로가
            <br />
            무료 사건 분석을 제공합니다.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={`tel:${firmData.main_phone}`}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-burgundy-500 text-white text-[16px] font-bold hover:bg-burgundy-600 transition-all duration-300 shadow-lg shadow-burgundy-500/20"
            >
              <Phone size={16} />
              {firmData.main_phone}
            </a>
            <Link
              href="/consultation"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border-2 border-[#2C2028] text-[#2C2028] text-[16px] font-bold hover:bg-[#2C2028] hover:text-white transition-all duration-300"
            >
              온라인 상담 신청
              <ExternalLink size={14} />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

/* ─── Page ─── */
export default function PressPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-burgundy-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <PressContent />
    </Suspense>
  );
}
