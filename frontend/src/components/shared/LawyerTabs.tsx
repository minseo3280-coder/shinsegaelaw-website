"use client";

import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";

const tabs = [
  { label: "변호사 소개", href: "/about/lawyers" },
  { label: "이혼소송총괄팀", href: "/about/teams/divorce-general" },
  { label: "재산분할팀", href: "/about/teams/property" },
  { label: "위자료팀", href: "/about/teams/alimony" },
  { label: "친권·양육권팀", href: "/about/teams/custody" },
  { label: "가족관계(친자)팀", href: "/about/teams/family-relations" },
  { label: "형사사건팀", href: "/about/teams/criminal" },
  { label: "신청사건팀", href: "/about/teams/applications" },
];

interface LawyerTabsProps {
  activeTab: number;
}

export default function LawyerTabs({ activeTab }: LawyerTabsProps) {
  const router = useRouter();

  return (
    <div className="font-sans bg-white border-b border-gray-200 sticky top-[80px] z-20">
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
          className="hidden md:flex gap-0 overflow-x-auto scrollbar-hide"
          role="tablist"
          aria-label="변호사 탭"
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
