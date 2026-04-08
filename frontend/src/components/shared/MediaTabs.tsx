"use client";

import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";

const groups = [
  {
    label: "News",
    items: [
      { label: "신세계로 소식", href: "/news" },
      { label: "언론보도", href: "/press" },
    ],
  },
  {
    label: "Channel",
    items: [
      { label: "영상채널", href: "/media/channel" },
    ],
  },
  {
    label: "Column",
    items: [
      { label: "법률 칼럼", href: "/media/column" },
    ],
  },
];

// Flatten for mobile dropdown
const allItems = groups.flatMap((g) => g.items);

interface MediaTabsProps {
  activeTab: number;
}

export default function MediaTabs({ activeTab }: MediaTabsProps) {
  const router = useRouter();

  return (
    <div className="font-sans bg-white border-b border-gray-200 sticky top-[80px] z-20">
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10">
        {/* Mobile: dropdown */}
        <div className="md:hidden py-3">
          <div className="relative">
            <select
              value={activeTab}
              onChange={(e) => router.push(allItems[Number(e.target.value)].href)}
              className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 pr-10 text-[16px] font-bold text-burgundy-600 focus:outline-none focus:border-burgundy-300"
            >
              {allItems.map((item, i) => (
                <option key={i} value={i}>{item.label}</option>
              ))}
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-burgundy-500 pointer-events-none" />
          </div>
        </div>

        {/* Desktop: grouped horizontal tabs */}
        <div
          className="hidden md:flex items-stretch overflow-x-auto scrollbar-hide"
          role="tablist"
          aria-label="미디어 탭"
        >
          {groups.map((group, gi) => {
            const startIdx = groups
              .slice(0, gi)
              .reduce((sum, g) => sum + g.items.length, 0);
            const isGroupActive = group.items.some(
              (_, ii) => startIdx + ii === activeTab
            );

            return (
              <div key={group.label} className="flex items-stretch">
                {gi > 0 && (
                  <div className="flex items-center px-3">
                    <div className="w-px h-5 bg-gray-200" />
                  </div>
                )}

                <div className="flex items-center pr-1">
                  <span
                    className={`text-[14px] font-bold tracking-[0.08em] uppercase transition-colors duration-200 ${
                      isGroupActive ? "text-[#1A1A2E]" : "text-[#444444]"
                    }`}
                  >
                    {group.label}
                  </span>
                </div>

                {group.items.map((item, ii) => {
                  const idx = startIdx + ii;
                  const isActive = activeTab === idx;

                  return (
                    <button
                      key={item.label}
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => router.push(item.href)}
                      className={`px-4 py-4 text-[16px] whitespace-nowrap transition-all duration-200 border-b-2 flex-shrink-0 ${
                        isActive
                          ? "text-[#7B2D3B] font-bold border-[#7B2D3B]"
                          : "text-[#444444] font-semibold border-transparent hover:text-[#1A1A2E] cursor-pointer"
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
