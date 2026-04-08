"use client";

import { useState, useEffect } from "react";
import { Phone, MessageCircle, FileText, MapPin, ChevronUp } from "lucide-react";
import firmData from "@/../../data/firm_info.json";

export default function FloatingCTA() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handler = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      {/* ═══ MOBILE: Bottom Fixed Bar ═══ */}
      <div
        className="fixed bottom-0 left-0 right-0 z-40 lg:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      >
        <div className="h-[1.5px] bg-gradient-to-r from-[#C9A84C]/60 via-[#C9A84C] to-[#C9A84C]/60" />
        <div className="flex items-stretch bg-white shadow-[0_-8px_30px_rgba(0,0,0,0.10)]">
          {/* 전화상담 */}
          <a
            href={`tel:${firmData.main_phone}`}
            className="flex-1 flex flex-col items-center justify-center min-h-[56px] py-2.5 bg-[#9B2335] active:bg-[#7B2D3B] transition-colors"
            aria-label={`전화 상담 ${firmData.main_phone}`}
          >
            <Phone size={19} className="text-white" strokeWidth={1.8} />
            <span className="text-[14px] font-semibold text-white mt-1 leading-none">전화상담</span>
            <span className="text-[14px] text-white/70 mt-0.5 leading-none tracking-tight">{firmData.main_phone}</span>
          </a>
          {/* 카카오톡 */}
          <a
            href="https://pf.kakao.com/_ExcxoAu/chat"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex flex-col items-center justify-center min-h-[56px] py-2.5 bg-white active:bg-stone-50 transition-colors border-l border-gray-100"
            aria-label="카카오톡 상담"
          >
            <MessageCircle size={19} className="text-[#3A1D1D]" strokeWidth={1.8} />
            <span className="text-[14px] font-semibold text-[#222] mt-1 leading-none">카카오톡</span>
            <span className="text-[14px] text-[#777] mt-0.5 leading-none">실시간 상담</span>
          </a>
          {/* 상담신청 */}
          <a
            href="/consultation"
            className="flex-1 flex flex-col items-center justify-center min-h-[56px] py-2.5 bg-white active:bg-stone-50 transition-colors border-l border-gray-100"
            aria-label="온라인 상담 신청"
          >
            <FileText size={19} className="text-[#9B2335]" strokeWidth={1.8} />
            <span className="text-[14px] font-semibold text-[#222] mt-1 leading-none">상담신청</span>
            <span className="text-[14px] text-[#777] mt-0.5 leading-none">24시간 접수</span>
          </a>
          {/* 오시는 길 */}
          <a
            href="/about/location"
            className="flex-1 flex flex-col items-center justify-center min-h-[56px] py-2.5 bg-white active:bg-stone-50 transition-colors border-l border-gray-100"
            aria-label="오시는 길"
          >
            <MapPin size={19} className="text-[#555]" strokeWidth={1.8} />
            <span className="text-[14px] font-semibold text-[#222] mt-1 leading-none">오시는 길</span>
            <span className="text-[14px] text-[#777] mt-0.5 leading-none">사무소 안내</span>
          </a>
        </div>
      </div>

      {/* ═══ DESKTOP: Vertical Quick Menu Sidebar ═══ */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 hidden lg:block">
        <div className="flex flex-col w-[92px] rounded-l-lg overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.10)] border border-r-0 border-gray-200/60">

          {/* ── 전화상담 (Primary — 버건디 강조) ── */}
          <a
            href={`tel:${firmData.main_phone}`}
            className="group flex flex-col items-center px-3 pt-5 pb-4 bg-[#9B2335] hover:bg-[#862030] transition-all duration-200"
            aria-label={`전화 상담 ${firmData.main_phone}`}
          >
            <Phone size={20} className="text-white" strokeWidth={1.8} />
            <span className="text-[12px] font-semibold text-white mt-2 leading-none">
              전화상담
            </span>
            <span className="text-[12px] text-white/65 mt-1 leading-none tracking-tight text-center">
              {firmData.main_phone}
            </span>
          </a>

          {/* ── 카카오톡 ── */}
          <a
            href="https://pf.kakao.com/_ExcxoAu/chat"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center px-3 py-5 bg-white border-b border-gray-100 hover:bg-gray-50 transition-all duration-200"
            aria-label="카카오톡 상담"
          >
            <MessageCircle size={20} className="text-[#3A1D1D]" strokeWidth={1.8} />
            <span className="text-[12px] font-semibold text-[#333] mt-2 leading-none">
              카카오톡
            </span>
            <span className="text-[12px] text-[#999] mt-1 leading-none text-center">
              실시간 상담
            </span>
          </a>

          {/* ── 상담신청 ── */}
          <a
            href="/consultation"
            className="group flex flex-col items-center px-3 py-5 bg-white border-b border-gray-100 hover:bg-gray-50 transition-all duration-200"
            aria-label="온라인 상담 신청"
          >
            <FileText size={20} className="text-[#9B2335]" strokeWidth={1.8} />
            <span className="text-[12px] font-semibold text-[#333] mt-2 leading-none">
              상담신청
            </span>
            <span className="text-[12px] text-[#999] mt-1 leading-none text-center">
              24시간 접수
            </span>
          </a>

          {/* ── 오시는 길 ── */}
          <a
            href="/about/location"
            className="group flex flex-col items-center px-3 py-5 bg-white hover:bg-gray-50 transition-all duration-200"
            aria-label="오시는 길"
          >
            <MapPin size={20} className="text-[#555]" strokeWidth={1.8} />
            <span className="text-[12px] font-semibold text-[#333] mt-2 leading-none">
              오시는 길
            </span>
            <span className="text-[12px] text-[#999] mt-1 leading-none text-center">
              사무소 안내
            </span>
          </a>

          {/* ── Scroll to Top ── */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className={`flex items-center justify-center py-2.5 bg-[#F5F5F5] hover:bg-gray-200 border-t border-gray-100 transition-all duration-300 ${
              showScrollTop ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            aria-label="맨 위로 이동"
          >
            <ChevronUp size={16} className="text-[#999]" />
          </button>
        </div>
      </div>
    </>
  );
}
