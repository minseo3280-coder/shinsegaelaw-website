"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { ChevronDown } from "lucide-react";

const tabs = [
  { label: "승소사례", href: "/cases" },
  { label: "의뢰인 후기", href: "/reviews" },
];

interface CasesTabsProps {
  activeCategory?: string;
}

export default function CasesTabs({ activeCategory }: CasesTabsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isActive = (item: (typeof tabs)[number]) => {
    const [itemPath, itemQuery] = item.href.split("?");

    if (itemPath === "/reviews") {
      if (pathname !== "/reviews") return false;
      if (!itemQuery) {
        const currentTab = searchParams.get("tab");
        return !currentTab || currentTab === "0";
      }
      const params = new URLSearchParams(itemQuery);
      return searchParams.get("tab") === params.get("tab");
    }

    if (itemPath === "/cases") {
      if (!pathname.startsWith("/cases")) return false;
      if (pathname !== "/cases") return false;
      if (!itemQuery) {
        return !activeCategory || activeCategory === "전체";
      }
      const params = new URLSearchParams(itemQuery);
      return activeCategory === params.get("category");
    }

    return false;
  };

  const isTabHighlighted = (item: (typeof tabs)[number]) => {
    if (item.href === "/cases" && pathname.startsWith("/cases")) return true;
    if (item.href === "/reviews" && pathname.startsWith("/reviews")) return true;
    return isActive(item);
  };

  const activeIdx = tabs.findIndex((t) => isTabHighlighted(t));

  return (
    <div className="font-sans bg-white border-b border-gray-200 sticky top-[80px] z-20">
      <div className="max-w-[1600px] mx-auto px-5 md:px-8 lg:px-10">
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
          aria-label="승소사례 · 의뢰인 후기 탭"
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
                  className={`px-5 py-4 text-[17px] whitespace-nowrap transition-all duration-200 border-b-2 flex-shrink-0 ${
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
