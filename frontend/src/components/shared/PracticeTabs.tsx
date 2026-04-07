"use client";

import { usePathname, useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";

const groups = [
  {
    id: "divorce",
    label: "이혼소송",
    labelEn: "Divorce",
    prefix: "/practice/divorce",
    items: [
      { label: "이혼준비 가이드", href: "/practice/divorce" },
      { label: "협의이혼", href: "/practice/divorce/mutual" },
      { label: "재판이혼", href: "/practice/divorce/litigation" },
      { label: "위자료", href: "/practice/divorce/alimony" },
      { label: "재산분할", href: "/practice/divorce/property" },
      { label: "자녀문제(양육권)", href: "/practice/divorce/custody" },
      { label: "부정행위(외도)", href: "/practice/divorce/infidelity" },
      { label: "가정폭력", href: "/practice/divorce/domestic-violence" },
      { label: "가족관계(친자)", href: "/practice/divorce/family-relations" },
      { label: "국제이혼", href: "/practice/divorce/international" },
    ],
  },
  {
    id: "adultery",
    label: "상간자소송",
    labelEn: "Adultery",
    prefix: "/practice/adultery",
    items: [
      { label: "상간자 위자료 청구", href: "/practice/adultery" },
      { label: "소송 절차·주의점", href: "/practice/adultery/process" },
      { label: "소송 시효", href: "/practice/adultery/statute" },
    ],
  },
  {
    id: "criminal",
    label: "가사관련 형사소송",
    labelEn: "Criminal",
    prefix: "/practice/criminal",
    items: [
      { label: "형사소송 안내", href: "/practice/criminal" },
    ],
  },
];

export default function PracticeTabs() {
  const pathname = usePathname();
  const router = useRouter();
  const activeGroup = groups.find((g) => pathname.startsWith(g.prefix)) || groups[0];
  const activeItemIdx = activeGroup.items.findIndex((item) => pathname === item.href);

  const handleGroupClick = (group: (typeof groups)[number]) => {
    if (!pathname.startsWith(group.prefix)) {
      router.push(group.items[0].href);
    }
  };

  return (
    <div className="font-sans sticky top-[80px] z-20">
      {/* ── Mobile: 2-row dropdown ── */}
      <div className="md:hidden bg-white border-b border-gray-200">
        <div className="px-5 py-3 space-y-2">
          {/* Group selector */}
          <div className="relative">
            <select
              value={activeGroup.id}
              onChange={(e) => {
                const g = groups.find((g) => g.id === e.target.value);
                if (g) router.push(g.items[0].href);
              }}
              className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 pr-10 text-[16px] font-bold text-[#1A1A2E] focus:outline-none focus:border-burgundy-300"
            >
              {groups.map((g) => (
                <option key={g.id} value={g.id}>{g.labelEn} {g.label}</option>
              ))}
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#444444] pointer-events-none" />
          </div>
          {/* Sub-item selector */}
          {activeGroup.items.length > 1 && (
            <div className="relative">
              <select
                value={activeItemIdx >= 0 ? activeItemIdx : 0}
                onChange={(e) => {
                  router.push(activeGroup.items[Number(e.target.value)].href);
                }}
                className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 pr-10 text-[16px] font-bold text-burgundy-600 focus:outline-none focus:border-burgundy-300"
              >
                {activeGroup.items.map((item, i) => (
                  <option key={i} value={i}>{item.label}</option>
                ))}
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-burgundy-500 pointer-events-none" />
            </div>
          )}
        </div>
      </div>

      {/* ── Desktop: 2-row tabs ── */}
      {/* Row 1: Group tabs */}
      <div className="hidden md:block bg-white border-b border-gray-100">
        <div className="max-w-[1600px] mx-auto px-5 md:px-8 lg:px-10">
          <div className="flex items-stretch" role="tablist" aria-label="업무분야 그룹">
            {groups.map((group) => {
              const isActive = activeGroup.id === group.id;
              return (
                <button
                  key={group.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleGroupClick(group)}
                  className={`relative flex items-center gap-2 px-6 py-4 whitespace-nowrap transition-all duration-200 flex-shrink-0 ${
                    isActive
                      ? "text-[#1A1A2E] font-bold"
                      : "text-[#444444] font-semibold hover:text-[#1A1A2E] cursor-pointer"
                  }`}
                >
                  <span
                    className={`text-[14px] tracking-[0.12em] uppercase transition-colors duration-200 ${
                      isActive ? "text-[#666]" : "text-[#888]"
                    }`}
                  >
                    {group.labelEn}
                  </span>
                  <span className="text-[17px]">{group.label}</span>
                  {isActive && (
                    <div
                      className="absolute bottom-0 left-5 right-5 h-[2px]"
                      style={{ background: "linear-gradient(to right, #D4AF37, #C9A84C)" }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Row 2: Sub-item tabs */}
      {activeGroup.items.length > 1 && (
        <div className="hidden md:block bg-white border-b border-gray-200">
          <div className="max-w-[1600px] mx-auto px-5 md:px-8 lg:px-10">
            <div
              className="flex items-stretch overflow-x-auto scrollbar-hide"
              role="tablist"
              aria-label={`${activeGroup.label} 세부 탭`}
            >
              {activeGroup.items.map((item) => {
                const isItemActive = pathname === item.href;
                return (
                  <button
                    key={item.href}
                    role="tab"
                    aria-selected={isItemActive}
                    onClick={() => router.push(item.href)}
                    className={`px-5 py-4 text-[17px] whitespace-nowrap transition-all duration-200 border-b-2 flex-shrink-0 ${
                      isItemActive
                        ? "text-[#7B2D3B] font-bold border-[#7B2D3B]"
                        : "text-[#444444] font-semibold border-transparent hover:text-[#1A1A2E] cursor-pointer"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
