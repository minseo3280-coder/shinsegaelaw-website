"use client";

import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, X, ArrowRight, Scale, Users, FileText, Newspaper, MessageSquare } from "lucide-react";
import casesAll from "@/../../data/cases_all.json";
import lawyersData from "@/../../data/lawyers.json";
import reviewsData from "@/../../data/reviews.json";
import pressData from "@/../../data/press.json";
import newsData from "@/../../data/news.json";

/* ─── Types ─── */
interface SearchResult {
  type: "case" | "lawyer" | "review" | "press" | "news";
  id: string | number;
  title: string;
  sub: string;
  href: string;
  image?: string;
}

/* ─── Data prep ─── */
const allCases = (casesAll as { cases: { id: number; title: string; summary: string; result: string; category: string; lawyers: string[] }[] }).cases;
const allLawyers = (lawyersData as { lawyers: { id: number; name: string; position: string; specialty: string[]; profile_image: string }[] }).lawyers;
const allReviews = reviewsData.reviews as { id: number | string; title: string; content: string; case_type: string; lawyer: string }[];
const allPress = (pressData as { articles: { k_id: number; title: string; content: string; source: string; date: string }[] }).articles;
const allNews = newsData as { id: string; title: string; desc: string; category: string }[];

const POPULAR_TAGS = [
  "이혼", "재산분할", "양육권", "위자료", "상간", "상속",
  "가정폭력", "국제이혼", "조인섭", "유류분",
];

/* ─── Search logic ─── */
function searchAll(query: string): SearchResult[] {
  if (!query.trim()) return [];
  const q = query.trim().toLowerCase();
  const results: SearchResult[] = [];

  let count = 0;
  for (const c of allCases) {
    if (count >= 5) break;
    if (c.title?.toLowerCase().includes(q) || c.summary?.toLowerCase().includes(q) || c.result?.toLowerCase().includes(q) || c.category?.toLowerCase().includes(q)) {
      results.push({ type: "case", id: c.id, title: c.title, sub: c.category + (c.lawyers?.[0] ? ` · ${c.lawyers[0]} 변호사` : ""), href: `/cases/${c.id}` });
      count++;
    }
  }

  count = 0;
  for (const l of allLawyers) {
    if (count >= 3) break;
    if (l.name?.toLowerCase().includes(q) || l.position?.toLowerCase().includes(q) || l.specialty?.some((s) => s.toLowerCase().includes(q))) {
      results.push({ type: "lawyer", id: l.id, title: `${l.name} ${l.position}`, sub: l.specialty?.slice(0, 3).join(", ") || "", href: `/about/lawyers/${l.id}`, image: l.profile_image });
      count++;
    }
  }

  count = 0;
  for (const r of allReviews) {
    if (count >= 3) break;
    if (r.title?.toLowerCase().includes(q) || r.content?.toLowerCase().includes(q) || r.case_type?.toLowerCase().includes(q)) {
      results.push({ type: "review", id: r.id, title: r.title || r.case_type, sub: r.case_type + (r.lawyer ? ` · ${r.lawyer}` : ""), href: `/reviews/${r.id}` });
      count++;
    }
  }

  count = 0;
  for (const p of allPress) {
    if (count >= 3) break;
    if (p.title?.toLowerCase().includes(q) || p.content?.toLowerCase().includes(q)) {
      results.push({ type: "press", id: p.k_id, title: p.title, sub: `${p.source} · ${p.date}`, href: `/press/${p.k_id}` });
      count++;
    }
  }

  count = 0;
  for (const n of allNews) {
    if (count >= 2) break;
    if (n.title?.toLowerCase().includes(q) || n.desc?.toLowerCase().includes(q)) {
      results.push({ type: "news", id: n.id, title: n.title, sub: n.category || "소식", href: "/news" });
      count++;
    }
  }

  return results;
}

function getTypeIcon(type: string) {
  switch (type) {
    case "case": return <Scale size={14} className="text-[#9B2335]" />;
    case "lawyer": return <Users size={14} className="text-[#9B2335]" />;
    case "review": return <MessageSquare size={14} className="text-[#9B2335]" />;
    case "press": return <Newspaper size={14} className="text-[#9B2335]" />;
    case "news": return <FileText size={14} className="text-[#9B2335]" />;
    default: return null;
  }
}

function getTypeLabel(type: string) {
  switch (type) {
    case "case": return "승소사례";
    case "lawyer": return "변호사";
    case "review": return "후기";
    case "press": return "언론매체";
    case "news": return "소식";
    default: return "";
  }
}

function HighlightMatch({ text, query }: { text: string; query: string }) {
  if (!query.trim() || !text) return <>{text}</>;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts = text.split(new RegExp(`(${escaped})`, "gi"));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <span key={i} className="text-[#9B2335] font-semibold">{part}</span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

/* ═══════════════════════════════════════════════════
   SearchDropdown Component — Light Premium Style
   ═══════════════════════════════════════════════════ */
interface SearchDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchDropdown({ isOpen, onClose }: SearchDropdownProps) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 200);
    return () => clearTimeout(timer);
  }, [query]);

  const results = useMemo(() => searchAll(debouncedQuery), [debouncedQuery]);

  const grouped = useMemo(() => {
    const map: Record<string, SearchResult[]> = {};
    results.forEach((r) => {
      if (!map[r.type]) map[r.type] = [];
      map[r.type].push(r);
    });
    return map;
  }, [results]);

  // Close on click outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    if (isOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen, onClose]);

  // Close on ESC
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery("");
      setDebouncedQuery("");
    }
  }, [isOpen]);

  const handleTagClick = useCallback((tag: string) => {
    setQuery(tag);
    setDebouncedQuery(tag);
  }, []);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={panelRef}
      className="fixed left-3 right-3 top-[86px] sm:absolute sm:left-auto sm:right-0 sm:top-[56px] sm:w-[480px] max-h-[70vh] sm:max-h-[520px] overflow-hidden rounded-2xl bg-white border border-gray-200/80 shadow-[0_20px_60px_rgba(0,0,0,0.12),0_4px_20px_rgba(0,0,0,0.06)] z-[60]"
      style={{ animation: "searchSlideIn 0.25s ease-out" }}
    >
      {/* Search input */}
      <div className="p-4 border-b border-gray-100">
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="승소사례, 변호사, 법률정보 검색..."
            className="w-full bg-[#F8F4EE] border border-gray-200 rounded-xl pl-10 pr-10 py-3 text-[15px] text-[#2C2028] placeholder:text-gray-400 focus:border-[#9B2335]/30 focus:ring-2 focus:ring-[#9B2335]/10 focus:outline-none transition-all duration-200"
          />
          {query && (
            <button
              onClick={() => { setQuery(""); inputRef.current?.focus(); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-[#444444] transition-colors"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Content area */}
      <div className="max-h-[420px] overflow-y-auto">
        {/* No query → popular tags */}
        {!debouncedQuery.trim() && (
          <div className="p-4">
            <p className="text-[12px] tracking-[0.15em] text-[#444444] uppercase font-semibold mb-3">
              인기 검색어
            </p>
            <div className="flex flex-wrap gap-2">
              {POPULAR_TAGS.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className="px-3.5 py-1.5 rounded-full bg-[#F8F4EE] border border-gray-200 text-[13px] text-[#333333] hover:text-[#9B2335] hover:border-[#9B2335]/20 hover:bg-[#FDF2F4] transition-all duration-200"
                >
                  {tag}
                </button>
              ))}
            </div>
            <div className="mt-5 pt-4 border-t border-gray-100">
              <p className="text-[12px] tracking-[0.15em] text-[#444444] uppercase font-semibold mb-3">
                바로가기
              </p>
              <div className="space-y-0.5">
                {[
                  { label: "상담 신청", href: "/consultation" },
                  { label: "변호사 소개", href: "/about/lawyers" },
                  { label: "승소사례 전체보기", href: "/cases" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={handleClose}
                    className="flex items-center justify-between py-2.5 px-3 -mx-1 rounded-xl text-[14px] text-[#333333] hover:text-[#9B2335] hover:bg-[#F8F4EE] transition-all duration-200 group"
                  >
                    <span>{item.label}</span>
                    <ArrowRight size={12} className="text-gray-300 group-hover:text-[#9B2335] transition-colors" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Has query but no results */}
        {debouncedQuery.trim() && results.length === 0 && (
          <div className="p-8 text-center">
            <Search size={32} className="text-gray-200 mx-auto mb-3" />
            <p className="text-[15px] text-[#333333] mb-1">
              &ldquo;{debouncedQuery}&rdquo;에 대한 검색결과가 없습니다
            </p>
            <p className="text-[13px] text-[#444444]">
              다른 검색어로 시도해보세요
            </p>
          </div>
        )}

        {/* Results grouped by type */}
        {debouncedQuery.trim() && results.length > 0 && (
          <div className="py-2">
            {Object.entries(grouped).map(([type, items]) => (
              <div key={type}>
                <div className="flex items-center gap-2 px-4 py-2">
                  {getTypeIcon(type)}
                  <span className="text-[12px] tracking-[0.1em] text-[#444444] uppercase font-semibold">
                    {getTypeLabel(type)}
                  </span>
                  <span className="text-[12px] text-[#C9A84C] font-semibold ml-1">
                    {items.length}건
                  </span>
                </div>
                {items.map((item) => (
                  <Link
                    key={`${item.type}-${item.id}`}
                    href={item.href}
                    onClick={handleClose}
                    className="flex items-start gap-3 px-4 py-3 hover:bg-[#F8F4EE] transition-colors duration-150 group"
                  >
                    {item.type === "lawyer" && item.image ? (
                      <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 border border-gray-200">
                        <Image src={item.image} alt={item.title} width={36} height={36} className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-[#F8F4EE] flex items-center justify-center flex-shrink-0">
                        {getTypeIcon(item.type)}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] text-[#2C2028] font-semibold leading-snug line-clamp-1 group-hover:text-[#9B2335] transition-colors">
                        <HighlightMatch text={item.title} query={debouncedQuery} />
                      </p>
                      <p className="text-[12px] text-[#444444] mt-0.5 line-clamp-1">
                        <HighlightMatch text={item.sub} query={debouncedQuery} />
                      </p>
                    </div>
                    <ArrowRight size={12} className="text-gray-300 group-hover:text-[#9B2335] mt-1 flex-shrink-0 transition-colors" />
                  </Link>
                ))}
              </div>
            ))}
            <div className="px-4 py-3 border-t border-gray-100">
              <p className="text-center text-[13px] text-[#444444]">
                총 <span className="text-[#9B2335] font-semibold">{results.length}</span>건의 결과
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
