"use client";

import { useRouter, usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";

const tabs = [
  { label: "법률상담 게시판", href: "/consultation/board" },
  { label: "온라인 상담신청", href: "/consultation" },
];

export default function ConsultationTabs() {
  const router = useRouter();
  const pathname = usePathname();

  const isTabHighlighted = (tab: (typeof tabs)[number]) => {
    if (tab.href === "/consultation/board") {
      return pathname.startsWith("/consultation/board") || pathname.startsWith("/consultation/write");
    }
    if (tab.href === "/consultation") {
      return pathname === "/consultation";
    }
    return false;
  };

  const activeIdx = tabs.findIndex((t) => isTabHighlighted(t));

  return (
    <div className="font-sans bg-white border-b border-gray-200 sticky top-[80px] z-20">
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10">
        {/* Mobile: dropdown */}
        <div className="md:hidden py-3">
          <div className="relative">
            <select
              value={activeIdx >= 0 ? activeIdx : 0}
              onChange={(e) => router.push(tabs[Number(e.target.value)].href)}
              className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 pr-10 text-[16px] font-bold text-burgundy-600 focus:outline-none focus:border-burgundy-300"
            >
              {tabs.map((tab, i) => (
                <option key={i} value={i}>{tab.label}</option>
              ))}
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-burgundy-500 pointer-events-none" />
          </div>
        </div>

        {/* Desktop: horizontal tabs */}
        <div
          className="hidden md:flex items-stretch overflow-x-auto scrollbar-hide"
          role="tablist"
          aria-label="법률상담 탭"
        >
          {tabs.map((tab, i) => {
            const active = isTabHighlighted(tab);

            return (
              <div key={tab.href} className="flex items-stretch">
                {i > 0 && (
                  <div className="flex items-center px-3">
                    <div className="w-px h-5 bg-gray-200" />
                  </div>
                )}
                <button
                  role="tab"
                  aria-selected={active}
                  onClick={() => router.push(tab.href)}
                  className={`px-5 py-4 text-[16px] whitespace-nowrap transition-all duration-200 border-b-2 flex-shrink-0 ${
                    active
                      ? "text-[#7B2D3B] font-bold border-[#7B2D3B]"
                      : "text-[#444444] font-semibold border-transparent hover:text-[#1A1A2E] cursor-pointer"
                  }`}
                >
                  {tab.label}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
