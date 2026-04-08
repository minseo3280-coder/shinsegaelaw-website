"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Search, PenLine, Lock, ChevronLeft, ChevronRight,
  CheckCircle2, Phone, Eye, Clock, Scale, ShieldCheck,
} from "lucide-react";
import SubPageHero from "@/components/shared/SubPageHero";
import ConsultationTabs from "@/components/shared/ConsultationTabs";
import firmData from "@/../../data/firm_info.json";

interface Consultation {
  id: number;
  category: string;
  name: string;
  title: string;
  status: string;
  views: number;
  created_at: string;
  has_reply: number;
}

interface Pagination {
  page: number;
  total: number;
  totalPages: number;
}

const CATEGORIES = ["전체", "이혼", "재산분할", "양육권", "위자료", "상간자", "상속", "기타"];

const CAT_STYLE: Record<string, string> = {
  "이혼": "bg-burgundy-50 text-burgundy-600",
  "재산분할": "bg-blue-50 text-blue-700",
  "양육권": "bg-emerald-50 text-emerald-700",
  "위자료": "bg-orange-50 text-orange-700",
  "상간자": "bg-amber-50 text-amber-800",
  "상속": "bg-purple-50 text-purple-700",
  "기타": "bg-gray-100 text-[#555]",
};

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
}

export default function ConsultationBoardPage() {
  const [items, setItems] = useState<Consultation[]>([]);
  const [pagination, setPagination] = useState<Pagination>({ page: 1, total: 0, totalPages: 0 });
  const [category, setCategory] = useState("전체");
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async (page: number) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), limit: "15" });
      if (category !== "전체") params.set("category", category);
      if (search) params.set("q", search);
      const res = await fetch(`/api/consultations?${params}`);
      const json = await res.json();
      if (json.success) {
        setItems(json.data || []);
        setPagination(json.pagination || { page: 1, total: 0, totalPages: 0 });
      } else {
        setItems([]);
        setPagination({ page: 1, total: 0, totalPages: 0 });
      }
    } catch (e) {
      console.error("Fetch error:", e);
      setItems([]);
      setPagination({ page: 1, total: 0, totalPages: 0 });
    } finally {
      setLoading(false);
    }
  }, [category, search]);

  useEffect(() => { fetchData(1); }, [fetchData]);

  const handleSearch = () => setSearch(searchInput.trim());

  return (
    <div>
      {/* ─── Banner ─── */}
      <SubPageHero
        titleEn="LEGAL CONSULTATION"
        titleKo="법률상담"
        bannerImage="/images/office/banner-consultation.jpg"
        breadcrumbs={[{ label: "법률상담", href: "/consultation" }, { label: "법률상담 게시판" }]}
      />

      <ConsultationTabs />

      {/* ─── Main Content ─── */}
      <section className="bg-white py-14 md:py-20">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10">

          {/* ── Section Header (승소사례 패턴 통일) ── */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4 md:mb-5">
                <div className="w-8 md:w-10 h-[2px] bg-burgundy-500" />
                <p className="text-[15px] md:text-[15px] tracking-[0.3em] uppercase font-bold text-burgundy-500">
                  법률상담
                </p>
              </div>
              <h2
                className="font-sans text-[22px] md:text-[38px] lg:text-[44px] leading-[1.3] font-bold text-[#2C2028] mb-3 md:mb-5"
                style={{ wordBreak: "keep-all" }}
              >
                비밀이 보장되는<br />
                <span className="text-burgundy-500">1:1 법률상담</span>
              </h2>
              <p className="text-[15px] md:text-[18px] leading-[1.8] text-[#333333]" style={{ wordBreak: "keep-all" }}>
                전문 변호사가 검토 후 빠르게 답변드립니다.<br />
                작성하신 내용은 비밀이 보장됩니다.
              </p>
            </div>
            <Link
              href="/consultation/write"
              className="relative z-10 inline-flex items-center gap-2 px-6 md:px-7 py-3 md:py-3.5 bg-[#2C2028] text-white text-[15px] md:text-[15px] font-bold hover:bg-[#1a1218] transition-all duration-300 self-start md:self-auto"
            >
              <PenLine size={15} />
              상담 글쓰기
            </Link>
          </div>

          {/* ── Info Strip ── */}
          <div className="grid grid-cols-2 md:flex md:items-center gap-x-4 gap-y-2 md:gap-8 px-5 py-3.5 bg-[#F8F4EE] mb-6 md:mb-8 text-[15px] md:text-[15px] text-[#555]">
            <span className="flex items-center gap-1.5 whitespace-nowrap">
              <Lock size={13} className="text-[#C9A84C] flex-shrink-0" />
              비밀보장
            </span>
            <span className="flex items-center gap-1.5 whitespace-nowrap">
              <Clock size={13} className="text-[#C9A84C] flex-shrink-0" />
              24시간 내 답변
            </span>
            <span className="flex items-center gap-1.5 whitespace-nowrap">
              <Scale size={13} className="text-[#C9A84C] flex-shrink-0" />
              무료 법률상담
            </span>
            <span className="flex items-center gap-1.5 whitespace-nowrap font-semibold text-[#2C2028]">
              <ShieldCheck size={13} className="text-[#C9A84C] flex-shrink-0" />
              대표변호사 직접 검토
            </span>
          </div>

          {/* ── Search + Filter Row ── */}
          <div className="flex flex-col md:flex-row gap-4 mb-6 md:mb-8">
            {/* Search */}
            <form
              onSubmit={(e) => { e.preventDefault(); handleSearch(); }}
              className="relative flex-1 max-w-md"
            >
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="검색어를 입력하세요"
                className="w-full pl-4 pr-11 py-3 rounded-lg border border-gray-200 text-[15px] md:text-[15px] text-[#2C2028] placeholder:text-gray-400 focus:outline-none focus:border-burgundy-300 transition-all bg-[#FAFAFA]"
              />
              <button type="submit" className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-md flex items-center justify-center hover:bg-gray-100 transition-colors">
                <Search size={16} className="text-[#999]" />
              </button>
            </form>

            {/* Category Filter */}
            <div className="flex flex-nowrap gap-1.5 overflow-x-auto pb-1 -mx-5 px-5 md:mx-0 md:px-0 scrollbar-hide">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`flex-shrink-0 px-3.5 md:px-4 py-2 rounded-full text-[15px] md:text-[15px] font-semibold border whitespace-nowrap transition-all duration-200 min-h-[36px] md:min-h-[40px] ${
                    category === cat
                      ? "bg-[#9B2335] text-white border-[#9B2335]"
                      : "bg-white text-[#555] border-gray-200 hover:border-[#9B2335]/30 hover:text-[#9B2335]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* ── Results Info ── */}
          <div className="flex items-center justify-between mb-3">
            <p className="text-[14px] md:text-[16px] text-[#888]">
              총 <strong className="text-[#2C2028]">{pagination.total.toLocaleString()}</strong>건
            </p>
            {search && (
              <button onClick={() => { setSearch(""); setSearchInput(""); }} className="text-[14px] text-[#999] hover:text-[#9B2335] transition-colors">
                검색 초기화
              </button>
            )}
          </div>

          {/* ── Divider ── */}
          <div className="h-[2px] bg-[#2C2028] mb-0" />

          {/* ── Table ── */}
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-7 h-7 border-2 border-[#9B2335] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 rounded-full bg-[#F8F4EE] flex items-center justify-center mx-auto mb-5">
                <PenLine size={24} className="text-[#C9A84C]" />
              </div>
              <p className="text-[18px] font-bold text-[#2C2028] mb-2">등록된 상담이 없습니다.</p>
              <p className="text-[15px] text-[#888] mb-6">첫 번째 상담을 작성해보세요.</p>
              <Link href="/consultation/write" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#9B2335] text-white text-[15px] font-bold hover:bg-[#862030] transition-all">
                <PenLine size={14} /> 상담 글쓰기
              </Link>
            </div>
          ) : (
            <>
              {/* Table header — clean minimal */}
              <div className="hidden md:grid grid-cols-[60px_80px_1fr_90px_100px_60px] items-center px-4 py-3 border-b border-gray-200 text-[15px] font-semibold text-[#888] uppercase tracking-wider">
                <span className="text-center">No.</span>
                <span>분류</span>
                <span className="pl-2">제목</span>
                <span className="text-center">상태</span>
                <span className="text-center">날짜</span>
                <span className="text-center">조회</span>
              </div>

              {/* Items */}
              {items.map((item, i) => (
                <Link
                  key={item.id}
                  href={`/consultation/board/${item.id}`}
                  className="grid grid-cols-[auto_1fr_auto] md:grid-cols-[60px_80px_1fr_90px_100px_60px] items-center px-3 md:px-4 py-4 md:py-4.5 border-b border-gray-100 last:border-b-0 hover:bg-[#FAFAF8] transition-colors duration-150 group"
                >
                  {/* Number — desktop only */}
                  <span className="hidden md:block text-center text-[15px] text-[#bbb] tabular-nums">
                    {pagination.total - ((pagination.page - 1) * 15 + i)}
                  </span>

                  {/* Category */}
                  <span className="mr-2.5 md:mr-0">
                    <span className={`inline-block text-[14px] px-2.5 py-[3px] rounded font-bold leading-none ${CAT_STYLE[item.category] || CAT_STYLE["기타"]}`}>
                      {item.category}
                    </span>
                  </span>

                  {/* Title + mobile meta */}
                  <div className="min-w-0 md:pl-2">
                    <p className="text-[15px] md:text-[15px] font-medium text-[#2C2028] flex items-center gap-2 group-hover:text-[#9B2335] transition-colors leading-snug">
                      <Lock size={13} className="text-[#ddd] flex-shrink-0" />
                      <span className="truncate">{item.title}</span>
                      {item.has_reply > 0 && (
                        <span className="flex-shrink-0 inline-flex items-center gap-0.5 text-[14px] px-1.5 py-[2px] rounded bg-emerald-50 text-emerald-700 font-bold leading-none">
                          <CheckCircle2 size={9} /> 답변
                        </span>
                      )}
                    </p>
                    {/* Mobile meta */}
                    <p className="text-[14px] text-[#aaa] mt-1 md:hidden">
                      {item.name} · {formatDate(item.created_at)}
                      {item.status === "done" && <span className="text-emerald-600 ml-2">답변완료</span>}
                    </p>
                  </div>

                  {/* Status — desktop */}
                  <span className="hidden md:flex justify-center">
                    {item.status === "done" ? (
                      <span className="text-[14px] px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 font-bold">답변완료</span>
                    ) : (
                      <span className="text-[14px] px-2.5 py-1 rounded bg-gray-100 text-[#888] font-bold">대기</span>
                    )}
                  </span>

                  {/* Date — desktop */}
                  <span className="hidden md:block text-center text-[14px] text-[#aaa] tabular-nums">
                    {formatDate(item.created_at)}
                  </span>

                  {/* Views — desktop */}
                  <span className="hidden md:flex items-center justify-center gap-1 text-[15px] text-[#bbb]">
                    <Eye size={12} />
                    {item.views}
                  </span>

                  {/* Mobile arrow */}
                  <span className="md:hidden text-[#ccc] pl-2">
                    <ChevronRight size={16} />
                  </span>
                </Link>
              ))}
            </>
          )}

          {/* ── Pagination ── */}
          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-center gap-1 mt-10">
              <button
                onClick={() => fetchData(pagination.page - 1)}
                disabled={pagination.page === 1}
                className="w-9 h-9 md:w-10 md:h-10 rounded-md border border-gray-200 flex items-center justify-center text-[#999] hover:border-[#9B2335]/40 hover:text-[#9B2335] disabled:opacity-30 transition-all"
              >
                <ChevronLeft size={15} />
              </button>
              {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                const start = Math.max(1, Math.min(pagination.page - 2, pagination.totalPages - 4));
                const p = start + i;
                if (p > pagination.totalPages) return null;
                return (
                  <button
                    key={p}
                    onClick={() => fetchData(p)}
                    className={`w-9 h-9 md:w-10 md:h-10 rounded-md text-[14px] md:text-[16px] font-medium border transition-all ${
                      p === pagination.page
                        ? "bg-[#2C2028] border-[#2C2028] text-white"
                        : "bg-white border-gray-200 text-[#555] hover:border-[#9B2335]/40 hover:text-[#9B2335]"
                    }`}
                  >
                    {p}
                  </button>
                );
              })}
              <button
                onClick={() => fetchData(pagination.page + 1)}
                disabled={pagination.page === pagination.totalPages}
                className="w-9 h-9 md:w-10 md:h-10 rounded-md border border-gray-200 flex items-center justify-center text-[#999] hover:border-[#9B2335]/40 hover:text-[#9B2335] disabled:opacity-30 transition-all"
              >
                <ChevronRight size={15} />
              </button>
            </div>
          )}

          {/* ── Divider ── */}
          <div className="h-[1px] bg-gray-100 mt-12 md:mt-16" />

          {/* ── Bottom CTA ── */}
          <div className="pt-10 md:pt-14 pb-4">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
              <div>
                <p className="text-[14px] md:text-[16px] tracking-[0.25em] text-[#C9A84C] uppercase font-bold mb-2">
                  Direct Consultation
                </p>
                <p
                  className="text-[18px] md:text-[24px] font-bold text-[#2C2028] leading-[1.4] mb-1"
                  style={{ wordBreak: "keep-all" }}
                >
                  전화 상담도 가능합니다.
                </p>
                <p className="text-[14px] md:text-[16px] text-[#888]">
                  평일 09:00 – 18:00 · 토요일 09:00 – 13:00
                </p>
              </div>
              <a
                href={`tel:${firmData.main_phone}`}
                className="inline-flex items-center gap-2.5 px-6 md:px-8 py-3 md:py-3.5 border-2 border-[#2C2028] text-[#2C2028] text-[16px] md:text-[17px] font-bold hover:bg-[#2C2028] hover:text-white transition-all duration-300"
              >
                <Phone size={16} />
                {firmData.main_phone}
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
