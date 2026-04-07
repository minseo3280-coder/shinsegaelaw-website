"use client";

import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import firmData from "@/../../data/firm_info.json";

export default function StickyConsultationBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 hidden md:block transition-all duration-300 ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-full pointer-events-none"
      }`}
    >
      <div className="bg-[#1A1A2E] border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-[10px] flex items-center justify-between gap-3">
          {/* Left — Phone number */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <a
              href={`tel:${firmData.main_phone}`}
              className="text-[14px] font-bold text-gold-400 hover:text-gold-300 transition-colors duration-200 whitespace-nowrap"
            >
              {firmData.main_phone}
            </a>
            <div className="w-[1px] h-[16px] bg-white/[0.08]" />
          </div>

          {/* Center + Right — Form */}
          <form
            onSubmit={(e) => e.preventDefault()}
            role="search"
            aria-label="간편 상담 신청"
            className="flex items-center gap-3 flex-1"
          >
            {/* Center — Inline form fields */}
            <div className="flex items-center gap-[6px] flex-1 min-w-0">
              {/* Case type select */}
              <div className="relative min-w-[100px]">
                <select
                  aria-label="사건영역"
                  defaultValue=""
                  className="bg-white/[0.08] border border-white/[0.10] rounded-[6px] px-[10px] py-[6px] text-[11px] text-white/70 focus:border-gold-500/50 focus:outline-none transition-all duration-200 w-full appearance-none pr-6"
                >
                  <option value="" disabled className="text-gray-900">사건영역</option>
                  <option value="이혼소송" className="text-gray-900">이혼소송</option>
                  <option value="재산분할" className="text-gray-900">재산분할</option>
                  <option value="상간자소송" className="text-gray-900">상간자소송</option>
                  <option value="상속" className="text-gray-900">상속</option>
                  <option value="형사소송" className="text-gray-900">형사소송</option>
                  <option value="기타" className="text-gray-900">기타</option>
                </select>
                <ChevronDown size={10} className="absolute right-2 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
              </div>

              {/* Name input */}
              <input
                type="text"
                placeholder="성함(관계)"
                aria-label="성함"
                className="bg-white/[0.08] border border-white/[0.10] rounded-[6px] px-[10px] py-[6px] text-[11px] text-white placeholder:text-white/40 focus:border-gold-500/50 focus:outline-none transition-all duration-200 flex-1 min-w-[70px]"
              />

              {/* Phone input (010 + number) */}
              <div className="flex items-center flex-1 min-w-[120px]">
                <span className="bg-white/[0.08] border border-white/[0.10] rounded-l-[6px] px-[8px] py-[6px] text-[11px] text-white/50 whitespace-nowrap border-r-0">
                  010
                </span>
                <input
                  type="tel"
                  placeholder="연락처"
                  aria-label="연락처"
                  className="bg-white/[0.08] border border-white/[0.10] rounded-r-[6px] px-[10px] py-[6px] text-[11px] text-white placeholder:text-white/40 focus:border-gold-500/50 focus:outline-none transition-all duration-200 flex-1 min-w-[60px]"
                />
              </div>
            </div>

            {/* Right — Privacy + Submit */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="flex items-center gap-[4px]">
                <input
                  type="checkbox"
                  id="sticky-privacy"
                  aria-label="개인정보 수집 동의"
                  className="w-[12px] h-[12px] rounded-[2px] border border-white/15 accent-gold-500"
                />
                <label htmlFor="sticky-privacy" className="text-[10px] text-white/45 whitespace-nowrap cursor-pointer">
                  개인정보 동의
                </label>
              </div>

              <button
                type="submit"
                aria-label="상담 신청"
                className="px-[18px] py-[6px] rounded-[6px] bg-gold-500 hover:bg-gold-400 text-[#1A1A2E] text-[12px] font-semibold transition-all duration-300 whitespace-nowrap hover:shadow-[0_0_20px_rgba(201,168,76,0.15)]"
              >
                상담신청
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
