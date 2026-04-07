"use client";

import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";

const tabs = [
  { label: "인사말", href: "/about/greeting?tab=0" },
  { label: "52년 법조전통", href: "/about/tradition" },
  { label: "신세계로 시스템", href: "/about/system" },
  { label: "오시는 길", href: "/about/location" },
];

interface AboutTabsProps {
  activeTab: number;
}

export default function AboutTabs({ activeTab }: AboutTabsProps) {
  const router = useRouter();

  return (
    <div className="bg-white border-b border-gray-200 sticky top-[80px] z-20 font-sans">
      <div className="max-w-[1600px] mx-auto px-5 md:px-8 lg:px-10">
        {/* Mobile: dropdown */}
        <div className="md:hidden py-3">
          <div className="relative">
            <select
              value={activeTab}
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
          className="hidden md:flex gap-0"
          role="tablist"
          aria-label="신세계로 소개 탭"
        >
          {tabs.map((tab, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={activeTab === i}
              onClick={() => router.push(tab.href)}
              className={`px-5 py-4 text-[17px] whitespace-nowrap transition-all duration-200 border-b-2 flex-shrink-0 ${
                activeTab === i
                  ? "text-burgundy-600 font-bold border-burgundy-500"
                  : "text-[#444444] font-semibold border-transparent hover:text-[#1A1A2E] cursor-pointer"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
