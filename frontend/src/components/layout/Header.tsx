"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Search, X, Phone, ChevronDown } from "lucide-react";
import SearchDropdown from "@/components/shared/SearchDropdown";
import firmData from "@/../../data/firm_info.json";

// ─── 5 Tabs + CTA ───
const menuTabs = [
  { id: "about" as const, label: "신세계로", href: "/about/greeting" },
  { id: "practice" as const, label: "업무분야", href: "/practice/divorce" },
  { id: "cases" as const, label: "해결사례", href: "/cases" },
  { id: "lawyers" as const, label: "구성원", href: "/about/lawyers" },
  { id: "media" as const, label: "소식/자료", href: "/news" },
  { id: "consult" as const, label: "법률상담", href: "/consultation/board" },
];

type TabId = (typeof menuTabs)[number]["id"];

// ─── Mega menu data (simplified) ───
const megaMenuData: Record<TabId, { label: string; href: string }[]> = {
  about: [
    { label: "인사말", href: "/about/greeting" },
    { label: "52년 법조전통", href: "/about/tradition" },
    { label: "신세계로 시스템", href: "/about/system" },
    { label: "오시는 길", href: "/about/location" },
  ],
  practice: [
    { label: "이혼소송", href: "/practice/divorce" },
    { label: "상간자소송", href: "/practice/adultery" },
    { label: "형사소송", href: "/practice/criminal" },
  ],
  cases: [
    { label: "승소사례", href: "/cases" },
    { label: "의뢰인 후기", href: "/reviews" },
  ],
  lawyers: [
    { label: "변호사 소개", href: "/about/lawyers" },
    { label: "전문팀 소개", href: "/about/teams/divorce-general" },
  ],
  media: [
    { label: "신세계로 소식", href: "/news" },
    { label: "언론보도", href: "/press" },
    { label: "영상채널", href: "/media/channel" },
    { label: "법률 칼럼", href: "/media/column" },
  ],
  consult: [
    { label: "법률상담 게시판", href: "/consultation/board" },
    { label: "온라인 상담신청", href: "/consultation" },
  ],
};

// ─── Mobile accordion ───
const mobileMenuData = [
  { id: "about" as TabId, label: "신세계로", links: megaMenuData.about },
  { id: "practice" as TabId, label: "업무분야", links: megaMenuData.practice },
  { id: "cases" as TabId, label: "해결사례", links: megaMenuData.cases },
  { id: "lawyers" as TabId, label: "구성원", links: megaMenuData.lawyers },
  { id: "media" as TabId, label: "소식/자료", links: megaMenuData.media },
  { id: "consult" as TabId, label: "법률상담", links: megaMenuData.consult },
];

// ─── Shared link renderer ───
function MenuLink({
  href,
  label,
  pathname,
  onClose,
}: {
  href: string;
  label: string;
  pathname: string;
  onClose: () => void;
}) {
  const isActive = pathname === href || pathname === href.split("?")[0];
  return (
    <li>
      <Link
        href={href}
        className={`block px-3 py-[7px] text-[16px] leading-relaxed rounded-md transition-all duration-150 ${
          isActive
            ? "text-[#9B2335] font-semibold bg-burgundy-50/50"
            : "text-[#1A1A2E]/70 hover:text-[#9B2335] hover:bg-gray-100/70"
        }`}
        onClick={onClose}
      >
        {label}
      </Link>
    </li>
  );
}

// ─── Header Component ───
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredTab, setHoveredTab] = useState<TabId | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<TabId | null>(null);
  const pathname = usePathname();
  // White header always (YK style)
  const isTransparent = false;
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [navRect, setNavRect] = useState({ left: 0, width: 0 });
  const navRef = useRef<HTMLElement>(null);
  const headerBarRef = useRef<HTMLDivElement>(null);

  // Measure nav position for mega menu alignment (viewport-relative)
  useEffect(() => {
    const measure = () => {
      if (navRef.current) {
        const navR = navRef.current.getBoundingClientRect();
        setNavRect({
          left: navR.left,
          width: navR.width,
        });
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowSearch(false);
        setMenuOpen(false);
        setHoveredTab(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMenuOpen(false);
    setHoveredTab(null);
  }, [pathname]);

  const openMenu = useCallback((tabId: TabId) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setMenuOpen(true);
    setHoveredTab(tabId);
  }, []);

  const scheduleClose = useCallback(() => {
    closeTimerRef.current = setTimeout(() => {
      setMenuOpen(false);
      setHoveredTab(null);
    }, 200);
  }, []);

  const cancelClose = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const closeAll = useCallback(() => {
    setMenuOpen(false);
    setHoveredTab(null);
  }, []);

  const isTabActive = (tabId: TabId) => {
    switch (tabId) {
      case "about":
        return (
          pathname.startsWith("/about") &&
          !pathname.startsWith("/about/lawyers") &&
          !pathname.startsWith("/about/teams")
        );
      case "practice":
        return pathname.startsWith("/practice");
      case "cases":
        return pathname.startsWith("/cases") || pathname.startsWith("/reviews");
      case "lawyers":
        return (
          pathname.startsWith("/about/lawyers") ||
          pathname.startsWith("/about/teams")
        );
      case "media":
        return (
          pathname === "/news" ||
          pathname.startsWith("/press") ||
          pathname.startsWith("/media")
        );
      case "consult":
        return pathname.startsWith("/consultation");
      default:
        return false;
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          menuOpen
            ? "bg-[#F7F7F7]"
            : isTransparent
            ? "bg-transparent"
            : scrolled
            ? "bg-white border-b border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
            : "bg-white border-b border-gray-100"
        }`}
        style={menuOpen ? { borderBottom: "none" } : undefined}
      >
        {/* ─── Top bar (80px) ─── */}
        <div
          ref={headerBarRef}
          className="max-w-[1600px] mx-auto px-6 lg:px-10 flex items-center h-[80px]"
        >
          {/* Logo */}
          <Link href="/" className="shrink-0 mr-10">
            <Image
              src={isTransparent ? "/images/logo.png" : "/images/logo-on.png"}
              alt="법무법인 신세계로"
              width={180}
              height={52}
              priority
              className="h-[36px] md:h-[40px] w-auto transition-all duration-300"
              style={
                isTransparent
                  ? undefined
                  : { filter: "brightness(0) saturate(100%) invert(18%) sepia(60%) saturate(3000%) hue-rotate(335deg) brightness(85%) contrast(100%)" }
              }
            />
          </Link>

          {/* 5 Tabs */}
          <nav
            ref={navRef}
            className="hidden lg:flex items-center flex-1 h-full"
            role="navigation"
            aria-label="메인 메뉴"
          >
            {menuTabs.map((tab) => {
              const active = isTabActive(tab.id);
              const hovered = hoveredTab === tab.id;
              return (
                <div
                  key={tab.id}
                  className={`relative flex-1 flex justify-center h-full transition-colors duration-200 ${
                    menuOpen && hovered ? "bg-white" : ""
                  }`}
                  onMouseEnter={() => openMenu(tab.id)}
                  onMouseLeave={scheduleClose}
                >
                  <Link
                    href={tab.href}
                    className={`relative flex items-center text-[18px] tracking-[0.02em] transition-colors duration-200 whitespace-nowrap ${
                      hovered
                        ? "text-[#9B2335] font-semibold"
                        : active
                        ? isTransparent ? "text-white font-semibold" : "text-[#9B2335] font-semibold"
                        : isTransparent
                        ? "text-white/80 font-semibold hover:text-white"
                        : "text-[#1A1A2E]/85 font-semibold hover:text-[#1A1A2E]"
                    }`}
                  >
                    {tab.label}
                    {/* Underline slide-in indicator */}
                    <span
                      className={`absolute bottom-[18px] left-0 h-[2px] transition-all duration-300 ease-out ${
                        isTransparent ? "bg-white" : "bg-[#9B2335]"
                      } ${
                        hovered || active ? "w-full" : "w-0"
                      }`}
                    />
                  </Link>
                </div>
              );
            })}
          </nav>

          {/* Right utils: Search + CTA */}
          <div className="flex items-center gap-2 lg:gap-3 shrink-0 ml-auto lg:ml-6">
            <div className="relative">
              <button
                onClick={() => {
                  setShowSearch((p) => !p);
                  setMenuOpen(false);
                  setMobileOpen(false);
                }}
                className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 ${
                  showSearch
                    ? "bg-gray-100 text-[#1A1A2E]"
                    : isTransparent
                    ? "text-white/50 hover:text-white/80"
                    : "text-[#1A1A2E]/30 hover:text-[#1A1A2E]/60 hover:bg-gray-50"
                }`}
                aria-label="검색"
              >
                {showSearch ? <X size={18} /> : <Search size={18} />}
              </button>
              <SearchDropdown
                isOpen={showSearch}
                onClose={() => setShowSearch(false)}
              />
            </div>
            <button
              className={`lg:hidden w-11 h-11 flex items-center justify-center ${
                isTransparent ? "text-white/70" : "text-[#1A1A2E]/50"
              }`}
              onClick={() => setMobileOpen(true)}
              aria-label="메뉴 열기"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* ─── Mega Menu ─── */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="absolute top-full left-0 right-0 z-50 hidden lg:block"
              style={{ marginTop: 0 }}
              onMouseEnter={cancelClose}
              onMouseLeave={scheduleClose}
            >
              <div className="bg-[#F7F7F7] border-b border-gray-200/60 shadow-[0_16px_48px_-12px_rgba(0,0,0,0.06)]">
                {/* Columns container — exact same position & width as nav */}
                <div
                  className="flex"
                  style={{
                    marginLeft: navRect.left,
                    width: navRect.width || "auto",
                  }}
                >
                  {menuTabs.map((tab) => {
                    const isHovered = hoveredTab === tab.id;
                    return (
                      <div
                        key={tab.id}
                        className={`flex-1 px-5 pt-6 pb-8 transition-colors duration-200 ${
                          isHovered ? "bg-white" : ""
                        }`}
                        onMouseEnter={() => openMenu(tab.id)}
                      >
                        <ul className="space-y-0.5">
                          {megaMenuData[tab.id].map((item) => (
                            <MenuLink
                              key={item.href}
                              href={item.href}
                              label={item.label}
                              pathname={pathname}
                              onClose={closeAll}
                            />
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ─── Mobile Menu ─── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-white lg:hidden"
          >
            <div className="flex items-center justify-between h-[80px] px-6 border-b border-gray-100">
              <Link href="/" onClick={() => setMobileOpen(false)}>
                <Image
                  src="/images/logo.png"
                  alt="법무법인 신세계로"
                  width={140}
                  height={40}
                  className="h-[32px] w-auto"
                />
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="w-11 h-11 flex items-center justify-center text-[#1A1A2E]/50"
                aria-label="메뉴 닫기"
              >
                <X size={22} />
              </button>
            </div>

            <div className="overflow-y-auto h-[calc(100vh-80px)] pb-40">
              <div className="py-2">
                {mobileMenuData.map((tab) => (
                  <div key={tab.id} className="border-b border-gray-50">
                    <button
                      className={`w-full flex items-center justify-between px-6 py-4 text-left transition-colors ${
                        mobileExpanded === tab.id
                          ? "text-[#9B2335] font-semibold"
                          : "text-[#1A1A2E] font-semibold"
                      }`}
                      onClick={() =>
                        setMobileExpanded(
                          mobileExpanded === tab.id ? null : tab.id
                        )
                      }
                    >
                      <span className="text-[18px]">{tab.label}</span>
                      <ChevronDown
                        size={16}
                        className={`text-[#1A1A2E]/40 transition-transform duration-200 ${
                          mobileExpanded === tab.id ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {mobileExpanded === tab.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-5">
                            {tab.links.map((link) => (
                              <Link
                                key={link.href}
                                href={link.href}
                                className={`block py-2.5 pl-3 text-[16px] transition-colors ${
                                  pathname === link.href
                                    ? "text-[#9B2335] font-semibold"
                                    : "text-[#1A1A2E]/60 active:text-[#9B2335]"
                                }`}
                                onClick={() => setMobileOpen(false)}
                              >
                                {link.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}

              </div>

              <div className="px-6 mt-6 space-y-3">
                <a
                  href={`tel:${firmData.main_phone}`}
                  className="flex items-center justify-center gap-2.5 py-3.5 border border-gray-200 rounded-xl text-[17px] text-[#1A1A2E]/75 font-semibold"
                  aria-label={`대표번호 ${firmData.main_phone}`}
                >
                  <Phone size={16} />
                  {firmData.main_phone}
                </a>
                <Link
                  href="/consultation"
                  className="flex items-center justify-center py-3.5 border-2 border-[#9B2335] text-[#9B2335] rounded-xl text-[17px] font-semibold"
                  onClick={() => setMobileOpen(false)}
                >
                  무료 상담 신청
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
