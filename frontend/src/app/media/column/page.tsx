"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { Search, BookOpen, ChevronRight, ChevronLeft } from "lucide-react";
import MediaTabs from "@/components/shared/MediaTabs";
import SubPageHero from "@/components/shared/SubPageHero";

/* ─── Types ─── */
interface ColumnArticle {
  k_id: number;
  title: string;
  date: string;
  lawyer?: string;
  content?: string;
  source?: string;
  views?: number;
}

/* ─── Data ─── */
import columnsRaw from "@/../../data/columns.json";
const columnsData = columnsRaw as { meta?: { total: number }; articles: ColumnArticle[] };

const ITEMS_PER_PAGE = 8;
const MAX_PAGE_BUTTONS = 5;

/* ─── Helpers ─── */
function extractSource(article: ColumnArticle): string {
  if (article.source) return article.source;
  if (article.content?.includes("방송분")) return "YTN 라디오";
  return "신세계로 칼럼";
}

function extractTags(article: ColumnArticle): string[] {
  if (!article.content) return [];
  const matches = article.content.match(/#[^\s#]+/g);
  if (!matches) return [];
  return matches.map((t) => t.replace("#", "")).slice(0, 4);
}

export default function ColumnPage() {
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("전체");
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = () => {
    setSearch(searchInput.trim());
    setCurrentPage(1);
  };

  const articles = columnsData.articles || [];

  /* ─── Source filters ─── */
  const sourceCounts = useMemo(() => {
    const counts: Record<string, number> = { "전체": articles.length };
    articles.forEach((a) => {
      const src = extractSource(a);
      counts[src] = (counts[src] || 0) + 1;
    });
    return counts;
  }, [articles]);

  const filterKeys = ["전체", ...Object.keys(sourceCounts).filter((k) => k !== "전체")];

  /* ─── Filtered articles ─── */
  const filtered = useMemo(() => {
    let result = articles;
    if (activeFilter !== "전체") {
      result = result.filter((a) => extractSource(a) === activeFilter);
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (a) =>
          a.title?.toLowerCase().includes(q) ||
          a.content?.toLowerCase().includes(q) ||
          a.lawyer?.toLowerCase().includes(q)
      );
    }
    return result;
  }, [articles, activeFilter, search]);

  /* ─── Pagination ─── */
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const pageItems = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const goToPage = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 400, behavior: "smooth" });
  }, []);

  // Page button range
  const startPage = Math.max(1, currentPage - Math.floor(MAX_PAGE_BUTTONS / 2));
  const endPage = Math.min(totalPages, startPage + MAX_PAGE_BUTTONS - 1);
  const adjustedStart = Math.max(1, endPage - MAX_PAGE_BUTTONS + 1);
  const pageNumbers = Array.from(
    { length: endPage - adjustedStart + 1 },
    (_, i) => adjustedStart + i
  );

  const resetPage = () => setCurrentPage(1);

  return (
    <div className="">
      <SubPageHero
        titleKo="신세계로 칼럼"
        breadcrumbs={[
          { label: "미디어", href: "/news" },
          { label: "신세계로 칼럼" },
        ]}
        bannerImage="/images/office/banner-reviews.jpg"
      />

      <MediaTabs activeTab={3} />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-12 md:pt-16 pb-20 md:pb-28">
        {/* Section Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-[2px] bg-burgundy-500" />
            <p className="text-[14px] tracking-[0.3em] uppercase font-bold text-burgundy-500">
              Expert Column
            </p>
          </div>
          <h2 className="font-sans text-[24px] md:text-[42px] lg:text-[48px] leading-[1.3] font-bold text-[#2C2028] mb-6">
            52년의 경험이 전하는<br />
            <span className="text-burgundy-500">법률 인사이트</span>
          </h2>
          <p className="text-[17px] md:text-[18px] leading-[1.9] text-[#2C2028] font-semibold max-w-3xl">
            이혼·재산분할·양육권 등 가족법 전반에 걸친 실무 지식과 판례 분석을 칼럼으로 전해드립니다.
          </p>
        </div>

        {/* Centered Search Bar — 대륜 style, full-width bg */}
        <div className="-mx-6 md:-mx-8 lg:-mx-10 mb-10">
          <div className="bg-gradient-to-b from-[#FDF2F4] via-[#FDF2F4]/60 to-white px-6 md:px-8 lg:px-10 py-10 md:py-14">
            <div className="max-w-3xl mx-auto">
              <form
                onSubmit={(e) => { e.preventDefault(); handleSearch(); }}
                className="relative"
              >
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="검색어를 입력 후 Enter를 눌러주세요."
                  className="w-full pl-6 pr-14 py-5 md:py-6 rounded-2xl border border-[#9B2335]/15 bg-white text-[17px] text-[#2C2028] font-semibold placeholder:text-[#888888] focus:outline-none focus:border-[#9B2335]/30 focus:ring-2 focus:ring-[#9B2335]/10 transition-all shadow-sm"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-xl flex items-center justify-center hover:bg-burgundy-50 transition-colors"
                  aria-label="검색"
                >
                  <Search size={20} className="text-[#9B2335]/40" />
                </button>
              </form>
              {search && (
                <div className="flex items-center gap-2 mt-3">
                  <p className="text-[15px] text-[#444444]">
                    &ldquo;<strong className="text-burgundy-600">{search}</strong>&rdquo; 검색 결과
                  </p>
                  <button
                    onClick={() => { setSearch(""); setSearchInput(""); resetPage(); }}
                    className="text-[14px] text-[#888888] hover:text-burgundy-500 transition-colors underline"
                  >
                    초기화
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {filterKeys.map((key) => (
            <button
              key={key}
              onClick={() => { setActiveFilter(key); resetPage(); }}
              className={`px-5 py-2 rounded-full text-[14px] font-semibold border transition-all duration-200 whitespace-nowrap ${
                activeFilter === key
                  ? "bg-burgundy-500 text-white border-burgundy-500 shadow-sm"
                  : "bg-white text-[#333333] border-gray-200 hover:border-burgundy-300 hover:text-burgundy-600"
              }`}
            >
              {key}
              <span className={`ml-1.5 text-[13px] ${
                activeFilter === key ? "text-white/70" : "text-[#888888]"
              }`}>
                {sourceCounts[key] || 0}
              </span>
            </button>
          ))}
        </div>

        {/* Results Count + Page Info */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-[15px] text-[#444444]">
            {filtered.length > 0
              ? `총 ${filtered.length}건의 칼럼`
              : <strong className="text-[#2C2028]">검색 결과가 없습니다.</strong>}
          </p>
          {totalPages > 1 && (
            <p className="text-[15px] text-[#444444]">
              {currentPage} / {totalPages} 페이지
            </p>
          )}
        </div>

        {/* Column List — 2-col clean rows */}
        {pageItems.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {pageItems.map((article) => (
              <Link
                key={article.k_id}
                href={`/media/column/${article.k_id}`}
                className="group flex flex-col md:flex-row md:items-baseline gap-2 md:gap-10 py-7 md:py-8 hover:bg-gray-50/60 -mx-4 px-4 transition-colors duration-200"
              >
                {/* Left: source + date */}
                <div className="md:w-[180px] flex-shrink-0">
                  <p className="text-[16px] font-bold text-burgundy-600 leading-snug">
                    {extractSource(article)}
                  </p>
                  {article.date && (
                    <p className="text-[15px] text-[#666666] mt-1">
                      {article.date}
                    </p>
                  )}
                </div>

                {/* Right: title + tags */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-sans text-[17px] md:text-[19px] font-bold text-gray-900 leading-snug group-hover:text-burgundy-600 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  {(() => {
                    const tags = extractTags(article);
                    return tags.length > 0 ? (
                      <p className="text-[15px] text-[#444444] mt-2">
                        {tags.map((t) => `#${t}`).join("  ")}
                      </p>
                    ) : article.lawyer ? (
                      <p className="text-[15px] text-[#444444] mt-2">
                        <span className="text-[#888888] font-semibold mr-2">담당변호사</span>
                        {article.lawyer}
                      </p>
                    ) : null;
                  })()}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <BookOpen size={48} className="text-gray-200 mx-auto mb-4" />
            {articles.length === 0 ? (
              <p className="text-[16px] text-[#444444]">칼럼 데이터를 준비 중입니다.</p>
            ) : (
              <>
                <p className="text-[17px] font-bold text-[#2C2028] mb-2">
                  &ldquo;{search}&rdquo;에 대한 검색 결과가 없습니다.
                </p>
                <p className="text-[16px] text-[#888888] mb-5">
                  다른 키워드로 검색하거나 필터를 변경해보세요.
                </p>
                <button
                  onClick={() => { setSearch(""); setSearchInput(""); setActiveFilter("전체"); resetPage(); }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-burgundy-300 text-burgundy-600 text-[14px] font-semibold hover:bg-burgundy-50 transition-all"
                >
                  전체 칼럼 보기
                </button>
              </>
            )}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <nav className="flex items-center justify-center gap-1 mt-10" aria-label="페이지 네비게이션">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="w-9 h-9 rounded-lg flex items-center justify-center border border-gray-200 text-[#888888] hover:border-burgundy-200 hover:text-burgundy-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft size={16} />
            </button>

            {adjustedStart > 1 && (
              <>
                <button
                  onClick={() => goToPage(1)}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-[13px] font-semibold border border-gray-200 text-[#444444] hover:border-burgundy-200 hover:text-burgundy-500 transition-all"
                >
                  1
                </button>
                {adjustedStart > 2 && (
                  <span className="w-9 h-9 flex items-center justify-center text-gray-300 text-[13px]">…</span>
                )}
              </>
            )}

            {pageNumbers.map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`w-9 h-9 rounded-lg flex items-center justify-center text-[13px] font-semibold border transition-all ${
                  page === currentPage
                    ? "bg-burgundy-500 border-burgundy-500 text-white"
                    : "border-gray-200 text-[#444444] hover:border-burgundy-200 hover:text-burgundy-500"
                }`}
              >
                {page}
              </button>
            ))}

            {endPage < totalPages && (
              <>
                {endPage < totalPages - 1 && (
                  <span className="w-9 h-9 flex items-center justify-center text-gray-300 text-[13px]">…</span>
                )}
                <button
                  onClick={() => goToPage(totalPages)}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-[13px] font-semibold border border-gray-200 text-[#444444] hover:border-burgundy-200 hover:text-burgundy-500 transition-all"
                >
                  {totalPages}
                </button>
              </>
            )}

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="w-9 h-9 rounded-lg flex items-center justify-center border border-gray-200 text-[#888888] hover:border-burgundy-200 hover:text-burgundy-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight size={16} />
            </button>
          </nav>
        )}
      </div>

    </div>
  );
}
