"use client";

import { useState, useMemo, useEffect, Suspense, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  ChevronLeft,
  Search,
  X,
  Quote,
  Phone,
} from "lucide-react";
import CasesTabs from "@/components/shared/CasesTabs";
import ScrollReveal from "@/components/ScrollReveal";
import { EASE } from "@/lib/motion";
import reviewsData from "@/../../data/reviews.json";
import firmData from "@/../../data/firm_info.json";

/* ─── Types ─── */
interface ReviewItem {
  id: number;
  title: string;
  case_type: string;
  lawyer: string;
  content: string;
  result: string;
  image: string;
  images: string[];
  date: string;
  views: number;
  reply: string;
  replyAuthor: string;
  contentSource: string;
  k_id: number;
}

/* ─── Constants ─── */
const CATEGORIES = [
  { key: "전체", label: "전체" },
  { key: "이혼", label: "이혼" },
  { key: "재산분할", label: "재산분할" },
  { key: "상간자", label: "상간자" },
  { key: "양육권", label: "양육권" },
  { key: "상속", label: "상속" },
  { key: "가정폭력", label: "가정폭력" },
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

/* ─── Review Card ─── */
function ReviewCard({ item, index }: { item: ReviewItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.35), ease: EASE }}
      className="h-full"
    >
      <Link
        href={`/reviews/${item.id}`}
        className="group flex flex-col bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.05)] hover:-translate-y-[3px] hover:shadow-[0_12px_32px_rgba(155,35,53,0.09)] transition-all duration-300 h-full overflow-hidden"
      >
        {/* Hover top accent */}
        <div className="h-[2px] bg-burgundy-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

        {/* Image — 4:3 ratio */}
        <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#f0ebe4]">
          {item.image ? (
            <Image
              src={item.image}
              alt={`${item.case_type} 후기`}
              fill
              className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Quote size={32} className="text-burgundy-300/50" />
            </div>
          )}
        </div>

        {/* Content — flex-1 stretches to fill remaining height */}
        <div className="p-4 md:p-6 flex flex-col flex-1">
          {/* Result — main highlight */}
          {item.result && (
            <div className="flex items-center gap-2 mb-2.5">
              <div className="w-[5px] h-[5px] rounded-full bg-burgundy-500 flex-shrink-0" />
              <span className="text-[14px] md:text-[16px] text-burgundy-600 font-bold line-clamp-1">
                {item.result}
              </span>
            </div>
          )}

          {/* Title — fixed 3-line height so cards align uniformly */}
          <h3 className="font-sans text-[14px] md:text-[16px] font-bold text-[#2C2028] leading-[1.6] line-clamp-3 min-h-[67px] md:min-h-[77px]" style={{ wordBreak: "keep-all" }}>
            {item.title}
          </h3>

          {/* Bottom info — always pinned to bottom */}
          <div className="mt-auto pt-3.5 border-t border-gray-100">
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-[14px] md:text-[15px] font-semibold text-[#2C2028]">{item.case_type}</span>
              {item.lawyer && (
                <span className="text-[15px] md:text-[16px] text-[#333333] truncate max-w-[55%] text-right line-clamp-1">담당: {item.lawyer}</span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ─── Main Content ─── */
function ReviewsContent() {
  const searchParams = useSearchParams();
  const isMobile = useIsMobile();
  const itemsPerPage = isMobile ? ITEMS_MOBILE : ITEMS_DESKTOP;
  const activeTab = Number(searchParams.get("tab")) || 0;
  const [activeCategory, setActiveCategory] = useState("전체");
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const allReviews = reviewsData.reviews as ReviewItem[];

  useEffect(() => {
    setActiveCategory("전체");
    setSearch("");
    setSearchOpen(false);
    setCurrentPage(1);
  }, [activeTab]);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { "전체": allReviews.length };
    CATEGORIES.forEach((cat) => {
      if (cat.key !== "전체") {
        counts[cat.key] = allReviews.filter(
          (r) => r.case_type?.includes(cat.key) || r.title?.includes(cat.key)
        ).length;
      }
    });
    return counts;
  }, [allReviews]);

  const filteredReviews = useMemo(() => {
    let result = [...allReviews];
    if (activeCategory !== "전체") {
      result = result.filter(
        (r) => r.case_type?.includes(activeCategory) || r.title?.includes(activeCategory)
      );
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (r) =>
          r.title?.toLowerCase().includes(q) ||
          r.content?.toLowerCase().includes(q) ||
          r.lawyer?.toLowerCase().includes(q) ||
          r.result?.toLowerCase().includes(q) ||
          r.case_type?.toLowerCase().includes(q)
      );
    }
    return result;
  }, [allReviews, activeCategory, search]);

  const totalPages = Math.ceil(filteredReviews.length / itemsPerPage);
  const paginatedReviews = filteredReviews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setCurrentPage(1);
    setSearch("");
    setSearchOpen(false);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 500, behavior: "smooth" });
  };

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
    <div className="">
      {/* ─── Banner ─── */}
      <section className="relative h-[180px] md:h-[280px] bg-[#0f0f1a] overflow-hidden">
        <Image
          src="/images/office/banner-reviews.jpg"
          alt="의뢰인 후기"
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
            <span className="text-white/70 font-semibold">의뢰인 후기</span>
          </nav>
          <p className="text-[14px] tracking-[0.3em] text-[#C9A84C]/70 uppercase font-semibold mb-2">
            Client Reviews
          </p>
          <h1 className="font-sans text-[22px] md:text-[38px] font-extrabold text-white tracking-tight">
            의뢰인 후기
          </h1>
        </div>
      </section>

      {/* ─── Tabs ─── */}
      <CasesTabs />

      {/* ─── Intro Heading ─── */}
      <section className="bg-white py-14 md:py-20">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <ScrollReveal y={40}>
            <div className="mb-4 md:mb-6">
              <p className="text-[15px] md:text-[16px] tracking-[0.3em] uppercase font-bold text-burgundy-500">
                의뢰인 후기
              </p>
            </div>
            <h2 className="font-sans text-[22px] md:text-[42px] lg:text-[48px] leading-[1.3] font-bold text-[#2C2028] mb-4 md:mb-6">
              의뢰인의 목소리가<br />
              <span className="text-burgundy-500">신뢰를 증명</span>합니다.
            </h2>
            <p className="text-[16px] md:text-[18px] leading-[1.8] text-[#333333] max-w-3xl">
              90건의 실제 의뢰인 후기로 확인하는 신세계로의 진심.<br />
              모든 후기는 실제 의뢰인이 직접 작성한 내용입니다.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Tab content */}
      <div role="tabpanel">
        {activeTab === 0 && (
          <>
            {/* ─── Filter Bar ─── */}
            <div className="bg-white pb-4 md:pb-10">
              <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10">
                <ScrollReveal y={40} delay={100}>
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
                          activeCategory === cat.key ? "text-white/70" : "text-gray-400"
                        }`}>
                          {categoryCounts[cat.key] || 0}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Controls */}
                  <div className="flex items-center justify-between">
                    <p className="text-[15px] text-[#333333] font-semibold">
                      총 <strong className="text-burgundy-600 font-bold">{filteredReviews.length}</strong>건
                    </p>
                    <div className="flex items-center gap-3">
                      {/* Search icon → expand */}
                      <div className="relative flex items-center">
                        {searchOpen ? (
                          <div className="flex items-center gap-1.5 animate-in fade-in slide-in-from-right-2 duration-200">
                            <input
                              ref={searchInputRef}
                              type="text"
                              value={search}
                              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                              placeholder="후기 검색..."
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
                </ScrollReveal>
              </div>
            </div>

            {/* ─── Reviews Grid ─── */}
            <div className="bg-[#F8F4EE] border-t border-[#e8e3d9]">
              <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10 py-14 md:py-20">
                <ScrollReveal y={40} delay={200}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${activeCategory}-${search}-${currentPage}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7"
                  >
                    {paginatedReviews.length > 0 ? (
                      paginatedReviews.map((item, i) => (
                        <ReviewCard key={item.id} item={item} index={i} />
                      ))
                    ) : (
                      <div className="col-span-full py-20 text-center">
                        <p className="text-[16px] text-[#333333] font-semibold">해당 조건에 맞는 후기가 없습니다.</p>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

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
                        <span key={`dots-${i}`} className="w-10 text-center text-gray-400 text-[14px]">⋯</span>
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
                </ScrollReveal>
              </div>
            </div>
          </>
        )}

        {activeTab === 1 && (
          <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10 py-16 text-center">
            <p className="text-[17px] font-semibold text-gray-900 mb-2">준비 중입니다</p>
            <p className="text-[16px] text-[#333333] font-semibold">언론매체 콘텐츠는 빠른 시일 내에 업데이트됩니다.</p>
          </div>
        )}
      </div>

      <div className="bg-white border-t border-gray-100">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10 py-14 md:py-20 text-center">
          <ScrollReveal y={40}>
            <p className="text-[15px] md:text-[16px] tracking-[0.3em] text-[#C9A84C] uppercase font-bold mb-3 md:mb-4">Consultation</p>
            <h3 className="font-sans text-[24px] md:text-[36px] lg:text-[40px] font-bold text-[#2C2028] mb-3 md:mb-4 leading-tight">
              당신의 이야기도
              <br />
              <span className="text-burgundy-500">승리의 기록</span>이 됩니다.
            </h3>
            <p className="text-[16px] md:text-[18px] text-[#333333] font-semibold leading-[1.8] mb-8 md:mb-10 max-w-xl mx-auto">
              지금 바로 전문 변호사와 상담하세요.
              비밀이 보장되는 무료 상담을 제공합니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`tel:${firmData.main_phone.replace(/-/g, "")}`}
                className="inline-flex items-center justify-center gap-2.5 bg-burgundy-500 text-white px-8 py-4 rounded-full text-[16px] font-bold hover:bg-burgundy-600 transition-colors duration-300 shadow-lg shadow-burgundy-500/20"
                aria-label={`전화 상담 ${firmData.main_phone}`}
              >
                <Phone size={18} />
                무료 상담 신청 {firmData.main_phone}
              </a>
              <Link
                href="/consultation"
                className="inline-flex items-center justify-center gap-2.5 border-2 border-burgundy-500 text-burgundy-500 px-8 py-4 rounded-full text-[16px] font-bold hover:bg-burgundy-500 hover:text-white transition-colors duration-300"
              >
                온라인 상담 신청
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>

    </div>
  );
}

export default function ReviewsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-burgundy-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <ReviewsContent />
    </Suspense>
  );
}
