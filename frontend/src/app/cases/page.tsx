"use client";

import { Suspense, useState, useMemo, useCallback, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  ChevronLeft,
  Search,
  X,
  Phone,
  ArrowRight,
  Check,
} from "lucide-react";
import CasesTabs from "@/components/shared/CasesTabs";
import ScrollReveal from "@/components/ScrollReveal";
import StampSeal from "@/components/shared/StampSeal";
import { EASE } from "@/lib/motion";
import casesAll from "@/../../data/cases_all.json";
import firmData from "@/../../data/firm_info.json";

/* ─── Types ─── */
interface CaseItem {
  id: number;
  k_id: number;
  category: string;
  categories: string[];
  title: string;
  summary: string;
  result: string;
  result_type: string;
  lawyers: string[];
  winDate: string;
  regDate: string;
  views: number;
  hasImages: boolean;
  imageCount: number;
}

/* ─── Constants ─── */
const CATEGORIES = [
  { key: "전체", label: "전체" },
  { key: "이혼", label: "이혼소송" },
  { key: "재산분할", label: "재산분할" },
  { key: "양육권", label: "양육권" },
  { key: "상간", label: "상간소송" },
  { key: "상속", label: "상속" },
] as const;

const ITEMS_DESKTOP = 12;
const ITEMS_MOBILE = 6;

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

/* ─── Helpers ─── */
function extractAmount(result: string): { amount: string; unit: string } | null {
  if (!result) return null;
  const m = result.match(/(\d[\d,.]*)\s*(억|만)\s*원?/);
  if (m) {
    return { amount: m[1], unit: m[2] + "원" };
  }
  const m2 = result.match(/(\d[\d,.]*)\s*원/);
  if (m2) {
    return { amount: m2[1], unit: "원" };
  }
  return null;
}

function extractShortResult(result: string, category?: string): string | null {
  if (!result) return null;
  const first = result.split("|")[0].trim();
  if (category && first === category) return null;
  if (first.length <= 2) return null;
  if (first.length <= 16) return first;
  return null;
}

/** Compact one-line result for standard cards (like main page Cases.tsx) */
function shortResult(result: string, resultType: string): string {
  if (!result || result.trim() === "") {
    return resultType === "조정" ? "조정 성립" : resultType === "합의" ? "합의 성립" : "승소";
  }
  const amounts: string[] = [];
  const amountRe = /(위자료|재산분할|양육비|손해배상|합의금|배상금|청구취지지급액)[^\d]*(\d[\d,.]*\s*[억만천원][\d,.만억천원\s]*)/g;
  let m;
  while ((m = amountRe.exec(result)) !== null) {
    const label = m[1] === "청구취지지급액" ? "청구 인용" : m[1];
    amounts.push(`${label} ${m[2].replace(/\s+/g, "").trim()}`);
  }
  if (amounts.length > 0) return amounts[0];
  const solo = result.match(/(\d[\d,.]*\s*[억만천][\d,.만억천\s]*원)/);
  if (solo) return solo[1].replace(/\s+/g, "") + " 인정";
  if (result.includes("조정 성립") || result.includes("조정성립")) return "조정 성립";
  if (result.includes("승소")) return "승소";
  if (result.includes("인용")) return "청구 인용";
  if (result.includes("기각")) return "상대방 청구 기각";
  if (result.includes("이혼")) return "이혼 성립";
  return resultType === "조정" ? "조정 성립" : resultType === "합의" ? "합의 성립" : "승소";
}

/* ─── StampSeal: 공통 컴포넌트 사용 (components/shared/StampSeal.tsx) ─── */

/* ─── Result Display (large — for HighlightCards only) ─── */
function ResultDisplay({ amountInfo, shortRes, resultType }: {
  amountInfo: { amount: string; unit: string } | null;
  shortRes: string | null;
  resultType: string;
}) {
  return (
    <div className="min-h-[52px] flex items-end">
      {amountInfo ? (
        <p className="text-[26px] md:text-[48px] font-black text-burgundy-600 leading-none tracking-tight">
          {amountInfo.amount}
          <span className="text-[20px] md:text-[24px] font-bold text-burgundy-500/50 ml-0.5">{amountInfo.unit}</span>
        </p>
      ) : shortRes ? (
        <p className="text-[24px] md:text-[28px] font-extrabold text-burgundy-600 leading-tight flex items-center gap-2.5">
          <Check size={22} className="text-burgundy-400 flex-shrink-0" />
          {shortRes}
        </p>
      ) : (
        <p className="text-[24px] md:text-[28px] font-extrabold text-burgundy-600 leading-tight flex items-center gap-2.5">
          <Check size={22} className="text-burgundy-400 flex-shrink-0" />
          {resultType === "판결" ? "승소 판결" : resultType === "합의" ? "합의 성립" : "조정 성립"}
        </p>
      )}
    </div>
  );
}

/* ─── Highlight Card (1페이지 상위 2개, 가로형 프리미엄) ─── */
function HighlightCard({ caseItem, index }: { caseItem: CaseItem; index: number }) {
  const amountInfo = extractAmount(caseItem.result);
  const shortRes = !amountInfo ? extractShortResult(caseItem.result, caseItem.category) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: EASE }}
    >
      <Link
        href={`/cases/${caseItem.id}`}
        className="group block bg-white rounded-2xl overflow-hidden border-l-[4px] border-l-burgundy-500 shadow-[0_2px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_50px_rgba(155,35,53,0.10)] hover:bg-gradient-to-br hover:from-white hover:to-[#FDF8F3] transition-all duration-500 h-full"
      >
        <div className="p-5 md:p-10 flex flex-col h-full relative">
          {/* Stamp seal */}
          <div className="absolute top-6 right-6 md:top-8 md:right-8 opacity-[0.2] group-hover:opacity-[0.35] transition-opacity duration-500">
            <StampSeal resultType={caseItem.result_type} size="lg" />
          </div>

          {/* BEST label + Date */}
          <div className="flex items-center justify-between mb-6 pr-20">
            <span className="text-[15px] font-extrabold tracking-[0.2em] text-[#C9A84C] uppercase flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
              Best Case
            </span>
            <span className="text-[15px] text-[#333333] font-semibold tracking-wide">
              {caseItem.winDate}
            </span>
          </div>

          {/* Amount / Result */}
          <div className="mb-5">
            <ResultDisplay amountInfo={amountInfo} shortRes={shortRes} resultType={caseItem.result_type} />
          </div>

          {/* Title */}
          <h3
            className="text-[17px] md:text-[18px] font-bold text-[#2C2028] leading-[1.6] tracking-tight line-clamp-2 group-hover:text-burgundy-600 transition-colors duration-300 mb-auto"
            style={{ wordBreak: "keep-all" }}
          >
            {caseItem.title}
          </h3>

          {/* Bottom meta */}
          <div className="flex items-center justify-between mt-7 pt-5 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <span className="text-[15px] font-bold px-3 py-1 rounded-full bg-burgundy-50 text-burgundy-600">
                {caseItem.category}
              </span>
              <span className="text-[15px] text-[#333333] font-semibold">
                {caseItem.lawyers.length > 0
                  ? caseItem.lawyers.slice(0, 2).join(" · ") + " 변호사"
                  : ""}
              </span>
            </div>
            <span className="text-[14px] text-burgundy-500 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-semibold">
              자세히 보기 <ArrowRight size={13} />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ─── Standard Card (3열 그리드 — shortResult + summary visible) ─── */
function CaseCard({ caseItem, index }: { caseItem: CaseItem; index: number }) {
  const resultLine = shortResult(caseItem.result, caseItem.result_type);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.35), ease: EASE }}
    >
      <Link
        href={`/cases/${caseItem.id}`}
        className="group relative flex flex-col bg-white rounded-2xl border border-gray-200/60 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(155,35,53,0.09)] hover:border-burgundy-200/60 transition-all duration-400 h-full overflow-hidden"
      >
        {/* Top accent line — scale-x on hover */}
        <div className="h-[2.5px] bg-burgundy-500 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

        <div className="p-4 md:p-7 flex flex-col flex-1 relative">
          {/* Stamp seal — top-right */}
          <div className="absolute top-4 right-4 md:top-5 md:right-5 opacity-[0.2] group-hover:opacity-[0.35] transition-opacity duration-500">
            <StampSeal resultType={caseItem.result_type} size="md" />
          </div>

          {/* Category pill + Date */}
          <div className="flex items-center justify-between mb-4 pr-16">
            <span className="text-[15px] font-bold px-3 py-1 rounded-full bg-burgundy-50 text-burgundy-600">
              {caseItem.category}
            </span>
            <span className="text-[15px] text-[#333333] font-semibold">
              {caseItem.winDate}
            </span>
          </div>

          {/* Title */}
          <h4
            className="text-[17px] md:text-[18px] font-bold text-[#2C2028] leading-[1.55] tracking-tight line-clamp-2 group-hover:text-burgundy-600 transition-colors duration-300 mb-2"
            style={{ wordBreak: "keep-all" }}
          >
            {caseItem.title}
          </h4>

          {/* Summary — 2 lines visible */}
          {caseItem.summary && (
            <p className="text-[15px] text-[#333333] leading-[1.7] line-clamp-2 mb-auto">
              {caseItem.summary}
            </p>
          )}
          {!caseItem.summary && <div className="mb-auto" />}

          {/* Result + Lawyer — bottom area */}
          <div className="mt-5 pt-4 border-t border-gray-100">
            {/* Result line */}
            <span className="flex items-center gap-1.5 text-[15px] font-bold text-burgundy-600 mb-2.5">
              <Check size={14} className="text-burgundy-500 shrink-0" />
              <span className="line-clamp-1">{resultLine}</span>
            </span>
            {/* Lawyer */}
            <div className="flex items-center justify-between">
              <span className="text-[14px] text-[#333333] font-semibold">
                {caseItem.lawyers.length > 0
                  ? caseItem.lawyers.slice(0, 2).join(" · ") + " 변호사"
                  : ""}
              </span>
              <span className="w-7 h-7 rounded-full bg-gray-50 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:bg-burgundy-50 transition-all duration-300">
                <ArrowRight size={12} className="text-burgundy-500" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ─── Main Content ─── */
function CasesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isMobile = useIsMobile();
  const itemsPerPage = isMobile ? ITEMS_MOBILE : ITEMS_DESKTOP;
  const initialCategory = searchParams.get("category") || "전체";
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [sortBy, setSortBy] = useState<"latest" | "popular">("latest");
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const cat = searchParams.get("category") || "전체";
    setActiveCategory(cat);
    setCurrentPage(1);
    setSearch("");
    setSearchOpen(false);
  }, [searchParams]);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  const allCases = casesAll.cases as CaseItem[];

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { "전체": allCases.length };
    CATEGORIES.forEach((cat) => {
      if (cat.key !== "전체") {
        counts[cat.key] = allCases.filter(
          (c) => c.category === cat.key || c.categories.includes(cat.key)
        ).length;
      }
    });
    return counts;
  }, [allCases]);

  const filteredCases = useMemo(() => {
    let result = allCases;
    if (activeCategory !== "전체") {
      result = result.filter(
        (c) => c.category === activeCategory || c.categories.includes(activeCategory)
      );
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.summary?.toLowerCase().includes(q) ||
          c.result?.toLowerCase().includes(q) ||
          c.lawyers?.some((l) => l.toLowerCase().includes(q))
      );
    }
    if (sortBy === "popular") {
      result = [...result].sort((a, b) => b.views - a.views);
    }
    return result;
  }, [allCases, activeCategory, search, sortBy]);

  // 1페이지: highlight 2 + grid (모바일 4 / 데스크톱 9), 나머지: itemsPerPage
  const PAGE1_GRID = isMobile ? 4 : 9;
  const PAGE1_TOTAL = 2 + PAGE1_GRID;
  const totalItems = filteredCases.length;
  const totalPages = totalItems <= PAGE1_TOTAL ? 1 : 1 + Math.ceil((totalItems - PAGE1_TOTAL) / itemsPerPage);

  const highlightCases = currentPage === 1 ? filteredCases.slice(0, 2) : [];
  const gridCases = (() => {
    if (currentPage === 1) {
      return filteredCases.slice(2, 2 + PAGE1_GRID);
    }
    const offset = PAGE1_TOTAL + (currentPage - 2) * itemsPerPage;
    return filteredCases.slice(offset, offset + itemsPerPage);
  })();

  const handleCategoryChange = useCallback(
    (cat: string) => {
      setActiveCategory(cat);
      setCurrentPage(1);
      setSearch("");
      setSearchOpen(false);
      if (cat === "전체") {
        router.replace("/cases", { scroll: false });
      } else {
        router.replace(`/cases?category=${cat}`, { scroll: false });
      }
    },
    [router]
  );

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 500, behavior: "smooth" });
  }, []);

  const getPageNumbers = () => {
    const pages: (number | "dots")[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("dots");
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push("dots");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div>
      {/* ─── Banner ─── */}
      <section className="relative h-[180px] md:h-[280px] bg-[#0f0f1a] overflow-hidden">
        <Image
          src="/images/office/banner-cases.jpg"
          alt="승소사례"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10 h-full flex flex-col justify-end pb-10">
          <nav className="flex items-center gap-2 text-[15px] text-white/40 mb-4" aria-label="breadcrumb">
            <Link href="/" className="hover:text-white/60 transition-colors duration-200">홈</Link>
            <ChevronRight size={12} className="text-white/20" />
            <Link href="/cases" className="hover:text-white/60 transition-colors duration-200">해결사례</Link>
            <ChevronRight size={12} className="text-white/20" />
            <span className="text-white/70 font-semibold">승소사례</span>
          </nav>
          <p className="text-[14px] tracking-[0.3em] text-[#C9A84C]/70 uppercase font-semibold mb-2">
            Winning Cases
          </p>
          <h1 className="font-sans text-[22px] md:text-[38px] font-extrabold text-white tracking-tight">
            승소사례
          </h1>
        </div>
      </section>

      {/* ─── Tabs ─── */}
      <CasesTabs />

      {/* ─── Intro Heading ─── */}
      <section className="bg-white py-14 md:py-20">
        <ScrollReveal y={40}>
          <div className="max-w-[1400px] mx-auto px-5 md:px-10">
            <div className="mb-4 md:mb-6">
              <p className="text-[15px] md:text-[16px] tracking-[0.3em] uppercase font-bold text-burgundy-500">
                승소사례
              </p>
            </div>
            <h2
              className="font-sans text-[22px] md:text-[42px] lg:text-[48px] leading-[1.3] font-bold text-[#2C2028] mb-4 md:mb-6"
              style={{ wordBreak: "keep-all" }}
            >
              성과는 말로 꾸며지지 않습니다.<br />
              <span className="text-burgundy-500">기록으로 남습니다.</span>
            </h2>
            <p className="text-[16px] md:text-[18px] leading-[1.8] text-[#333333] max-w-3xl">
              비식별화된 판결문으로 검증된 독보적인 실력.<br />
              신세계로가 걸어온 {allCases.length.toLocaleString()}건의 승리 기록입니다.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* ─── Filter Bar (pill 중앙 + 검색/정렬 우측) ─── */}
      <div className="bg-white pb-4 md:pb-10">
        <ScrollReveal y={40} delay={100}>
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10">
          {/* Filter Pills */}
          <div className="flex md:flex-wrap md:justify-center gap-2 mb-5 overflow-x-auto pb-2 md:pb-0 scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                onClick={() => handleCategoryChange(cat.key)}
                className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-[15px] md:text-[16px] font-semibold border transition-all duration-200 whitespace-nowrap flex-shrink-0 min-h-[44px] ${
                  activeCategory === cat.key
                    ? "bg-burgundy-500 text-white border-burgundy-500 shadow-sm"
                    : "bg-white text-[#333333] border-gray-200 hover:border-burgundy-300 hover:text-burgundy-600"
                }`}
              >
                {cat.label}
                <span className={`text-[15px] ${
                  activeCategory === cat.key ? "text-white/70" : "text-[#444444]"
                }`}>
                  {categoryCounts[cat.key]?.toLocaleString()}
                </span>
              </button>
            ))}
          </div>

          {/* Sort + Search */}
          <div className="flex items-center justify-between">
            <p className="text-[15px] text-[#333333] font-semibold">
              총 <strong className="text-burgundy-600 font-bold">{filteredCases.length.toLocaleString()}</strong>건
            </p>
            <div className="flex items-center gap-3">
              {/* Sort toggle */}
              <div className="flex items-center text-[15px] text-[#333333]">
                <button
                  onClick={() => { setSortBy("latest"); setCurrentPage(1); }}
                  className={`transition-colors duration-200 ${sortBy === "latest" ? "text-[#2C2028] font-semibold" : "hover:text-[#333333]"}`}
                >
                  최신순
                </button>
                <span className="mx-2 text-gray-300">|</span>
                <button
                  onClick={() => { setSortBy("popular"); setCurrentPage(1); }}
                  className={`transition-colors duration-200 ${sortBy === "popular" ? "text-[#2C2028] font-semibold" : "hover:text-[#333333]"}`}
                >
                  인기순
                </button>
              </div>

              {/* Search icon expand */}
              <div className="relative flex items-center">
                {searchOpen ? (
                  <div className="flex items-center gap-1.5 animate-in fade-in slide-in-from-right-2 duration-200">
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={search}
                      onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                      placeholder="검색..."
                      className="w-[160px] md:w-[200px] bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-[15px] text-[#2C2028] focus:outline-none focus:border-burgundy-400 transition-all duration-200"
                    />
                    <button
                      onClick={() => { setSearchOpen(false); setSearch(""); setCurrentPage(1); }}
                      className="w-11 h-11 rounded-full flex items-center justify-center text-[#444444] hover:bg-gray-100 transition-colors duration-200"
                      aria-label="검색 닫기"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setSearchOpen(true)}
                    className="w-11 h-11 rounded-full flex items-center justify-center text-[#444444] hover:bg-gray-100 hover:text-burgundy-500 transition-all duration-200"
                    aria-label="검색 열기"
                  >
                    <Search size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        </ScrollReveal>
      </div>

      {/* ─── Cases Content ─── */}
      <div className="bg-[#F8F4EE] border-t border-[#e8e3d9]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10 py-14 md:py-20">

          {/* Highlight Cards (1페이지, 2개 가로형) */}
          {highlightCases.length > 0 && (
            <ScrollReveal y={40} delay={150}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7 mb-10">
                {highlightCases.map((c, i) => (
                  <HighlightCard key={c.id} caseItem={c} index={i} />
                ))}
              </div>

              {/* Divider */}
              <div className="flex items-center gap-4 mb-10">
                <div className="flex-1 h-px bg-[#ddd6cc]" />
                <span className="text-[15px] tracking-[0.2em] text-[#444444] font-semibold uppercase">
                  All Cases
                </span>
                <div className="flex-1 h-px bg-[#ddd6cc]" />
              </div>
            </ScrollReveal>
          )}

          {/* Main Grid (3열) */}
          <ScrollReveal y={40} delay={200}>
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeCategory}-${sortBy}-${search}-${currentPage}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7"
              >
                {gridCases.length > 0 ? (
                  gridCases.map((c, i) => (
                    <CaseCard key={c.id} caseItem={c} index={i} />
                  ))
                ) : (
                  highlightCases.length === 0 && (
                    <div className="col-span-full py-20 text-center">
                      <p className="text-[16px] text-[#333333] font-semibold">해당 조건에 맞는 사례가 없습니다.</p>
                    </div>
                  )
                )}
              </motion.div>
            </AnimatePresence>
          </ScrollReveal>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-1.5 mt-8 md:mt-14">
              <button
                onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="w-11 h-11 rounded-lg flex items-center justify-center text-gray-400 border border-gray-300 bg-white hover:border-burgundy-300 hover:text-burgundy-600 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="이전 페이지"
              >
                <ChevronLeft size={16} />
              </button>
              {getPageNumbers().map((page, i) =>
                page === "dots" ? (
                  <span key={`dots-${i}`} className="w-10 text-center text-gray-400 text-[14px]">...</span>
                ) : (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-11 h-11 rounded-lg flex items-center justify-center text-[14px] font-semibold border transition-all duration-200 ${
                      currentPage === page
                        ? "bg-burgundy-600 border-burgundy-600 text-white font-bold"
                        : "border-gray-300 bg-white text-[#444444] hover:border-burgundy-300 hover:text-burgundy-600"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
              <button
                onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="w-11 h-11 rounded-lg flex items-center justify-center text-gray-400 border border-gray-300 bg-white hover:border-burgundy-300 hover:text-burgundy-600 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="다음 페이지"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ─── Bottom CTA ─── */}
      <div className="bg-white border-t border-gray-100">
        <ScrollReveal y={40}>
          <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10 py-20 md:py-28 text-center">
            <p className="text-[15px] md:text-[16px] tracking-[0.3em] text-[#C9A84C] uppercase font-bold mb-3 md:mb-4">Consultation</p>
            <h3 className="text-[24px] md:text-[36px] lg:text-[40px] font-bold text-[#2C2028] mb-3 md:mb-4 leading-tight">
              다음 승소사례의 주인공은
              <br />
              <span className="text-burgundy-500">당신</span>이 될 수 있습니다.
            </h3>
            <p className="text-[16px] md:text-[18px] text-[#333333] font-semibold leading-[1.8] mb-8 md:mb-10 max-w-xl mx-auto">
              1,053건의 승소 경험이 증명하는 전문성으로,<br />
              의뢰인의 새로운 시작을 함께하겠습니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`tel:${firmData.main_phone.replace(/-/g, "")}`}
                className="inline-flex items-center justify-center gap-2.5 bg-burgundy-500 text-white px-8 py-4 rounded-full text-[16px] font-bold hover:bg-burgundy-600 transition-colors duration-300 shadow-lg shadow-burgundy-500/20"
                aria-label={`전화 상담 ${firmData.main_phone}`}
              >
                <Phone size={18} />
                무료 사건 분석 요청 {firmData.main_phone}
              </a>
              <Link
                href="/consultation"
                className="inline-flex items-center justify-center gap-2.5 border-2 border-burgundy-500 text-burgundy-500 px-8 py-4 rounded-full text-[16px] font-bold hover:bg-burgundy-500 hover:text-white transition-colors duration-300"
              >
                온라인 상담 신청
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>

    </div>
  );
}

export default function CasesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-burgundy-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <CasesContent />
    </Suspense>
  );
}
