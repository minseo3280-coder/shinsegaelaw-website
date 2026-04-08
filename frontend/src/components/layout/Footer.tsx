"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import firmData from "@/../../data/firm_info.json";

export default function Footer() {
  const [activeOffice, setActiveOffice] = useState(0);
  const office = firmData.offices[activeOffice];

  return (
    <footer className="bg-[#111118]">
      {/* Gold accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#C9A84C]/30 to-transparent" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* ─── Mobile: 컴팩트 레이아웃 ─── */}
        <div className="lg:hidden py-10">
          {/* 대표번호 + 소셜 */}
          <div className="text-center mb-8">
            <Image
              src="/images/logo-on.png"
              alt="법무법인 신세계로"
              width={160}
              height={48}
              className="h-[32px] w-auto opacity-60 mx-auto mb-5"
            />
            <p className="text-[14px] tracking-[0.15em] text-white/35 uppercase mb-1">
              Contact Us
            </p>
            <a
              href={`tel:${firmData.main_phone}`}
              className="text-[28px] font-bold text-[#C9A84C] tracking-wider hover:text-[#D4AF37] transition-colors"
              aria-label={`대표번호 ${firmData.main_phone}`}
            >
              {firmData.main_phone}
            </a>

            {/* Social icons */}
            <div className="flex items-center justify-center gap-2 mt-5">
              <a
                href="https://pf.kakao.com/_ExcxoAu/chat"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-md border border-white/10 flex items-center justify-center hover:border-white/25 hover:bg-white/[0.04] transition-all"
                aria-label="카카오톡"
              >
                <svg className="w-[16px] h-[16px] text-white/45" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3c-5.523 0-10 3.584-10 8.007 0 2.86 1.89 5.37 4.73 6.788-.162.6-.586 2.17-.672 2.51-.107.424.156.418.328.304.135-.09 2.148-1.46 3.024-2.052.536.078 1.085.12 1.646.12h-.056c5.523 0 10-3.584 10-8.007-.027-4.087-4.504-7.67-10-7.67z" /></svg>
              </a>
              <a
                href="https://blog.naver.com/mnjhappylife"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-md border border-white/10 flex items-center justify-center hover:border-white/25 hover:bg-white/[0.04] transition-all"
                aria-label="네이버 블로그"
              >
                <span className="text-[15px] font-bold text-white/45 leading-none">blog</span>
              </a>
              <a
                href="https://www.youtube.com/@divorce_story"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-md border border-white/10 flex items-center justify-center hover:border-white/25 hover:bg-white/[0.04] transition-all"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 text-white/45" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
              </a>
              <a
                href="https://www.instagram.com/insup_cho"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-md border border-white/10 flex items-center justify-center hover:border-white/25 hover:bg-white/[0.04] transition-all"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 text-white/45" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" /></svg>
              </a>
              <Link
                href="/about/location"
                className="w-10 h-10 rounded-md border border-white/10 flex items-center justify-center hover:border-white/25 hover:bg-white/[0.04] transition-all"
                aria-label="오시는 길"
              >
                <svg className="w-4 h-4 text-white/45" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z" /></svg>
              </Link>
            </div>
          </div>

          {/* 사무소 정보 — 컴팩트 */}
          <div className="border-t border-white/[0.06] pt-6 mb-6">
            <div className="flex gap-1 mb-3 justify-center">
              {firmData.offices.map((o, i) => (
                <button
                  key={o.name}
                  onClick={() => setActiveOffice(i)}
                  className={`px-3 py-1.5 text-[15px] rounded-sm transition-all duration-200 ${
                    activeOffice === i
                      ? "bg-white/10 text-white font-semibold"
                      : "text-white/40 hover:text-white/60"
                  }`}
                >
                  {o.name.replace("본사", "").replace("지사", "")}
                </button>
              ))}
            </div>
            <div className="text-center space-y-1 text-[15px] text-white/40 leading-relaxed">
              <p className="text-white/55">{office.address}</p>
              <p>
                TEL.{" "}
                <a href={`tel:${office.phone}`} className="hover:text-white transition-colors">
                  {office.phone}
                </a>
                {" "}/ FAX. {office.fax}
              </p>
            </div>
          </div>

          {/* 법적 정보 */}
          <div className="border-t border-white/[0.06] pt-5 text-center space-y-1 text-[14px] text-white/30">
            <p>
              <span className="text-white/45">대표변호사</span> 조인섭 · <span className="text-white/45">광고책임변호사</span> {firmData.ad_responsible}
            </p>
            <p>사업자등록번호: {(office as { business_number?: string }).business_number}</p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <Link href="/privacy" className="text-white/40 hover:text-white transition-colors">
                개인정보처리방침
              </Link>
              <span className="text-white/15">|</span>
              <Link href="/terms" className="text-white/40 hover:text-white transition-colors">
                이용약관
              </Link>
            </div>
          </div>
        </div>

        {/* ─── Desktop: 3-column layout ─── */}
        <div className="hidden lg:grid py-16 grid-cols-[220px_1fr_220px] gap-12">
          {/* Left: 법인명 + 법적 링크 + 대표/광고변호사 */}
          <div>
            <Image
              src="/images/logo-on.png"
              alt="법무법인 신세계로"
              width={160}
              height={48}
              className="h-[36px] w-auto opacity-60 mb-6"
            />
            <div className="space-y-1.5 mb-6">
              <Link
                href="/privacy"
                className="block text-[14px] text-white/50 hover:text-white transition-colors"
              >
                개인정보처리방침
              </Link>
              <Link
                href="/terms"
                className="block text-[14px] text-white/50 hover:text-white transition-colors"
              >
                이용약관
              </Link>
            </div>
            <div className="space-y-1 text-[14px] text-white/35">
              <p>
                <span className="text-white/50">대표변호사</span> 조인섭
              </p>
              <p>
                <span className="text-white/50">광고책임변호사</span>{" "}
                {firmData.ad_responsible}
              </p>
            </div>
          </div>

          {/* Center: Our Story + 사무소 탭 */}
          <div className="grid grid-cols-2 gap-10">
            {/* Our Story */}
            <div>
              <h6 className="text-[14px] tracking-[0.15em] text-[#C9A84C]/60 uppercase font-semibold mb-4">
                Our Story
              </h6>
              <nav className="space-y-2">
                {[
                  { label: "신세계로", href: "/about/greeting" },
                  { label: "변호사팀", href: "/about/lawyers" },
                  { label: "업무분야", href: "/practice/divorce" },
                  { label: "해결사례", href: "/cases" },
                  { label: "소식/자료", href: "/news" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block text-[14px] text-white/50 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* 사무소 탭 */}
            <div>
              <h6 className="text-[14px] tracking-[0.15em] text-[#C9A84C]/60 uppercase font-semibold mb-4">
                Offices
              </h6>
              <div className="flex gap-1 mb-4">
                {firmData.offices.map((o, i) => (
                  <button
                    key={o.name}
                    onClick={() => setActiveOffice(i)}
                    className={`px-3 py-1.5 text-[14px] rounded-sm transition-all duration-200 ${
                      activeOffice === i
                        ? "bg-white/10 text-white font-semibold"
                        : "text-white/40 hover:text-white/60"
                    }`}
                  >
                    {o.name.replace("본사", "").replace("지사", "")}
                  </button>
                ))}
              </div>
              <div className="space-y-1.5 text-[14px] text-white/40 leading-relaxed">
                <p className="text-white/60">{office.address}</p>
                <p>
                  TEL.{" "}
                  <a
                    href={`tel:${office.phone}`}
                    className="hover:text-white transition-colors"
                  >
                    {office.phone}
                  </a>
                </p>
                <p>FAX. {office.fax}</p>
                {(office as { business_number?: string }).business_number && (
                  <p className="text-white/30">
                    사업자등록번호: {(office as { business_number?: string }).business_number}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Right: 대표번호 + 소셜 아이콘 */}
          <div className="flex flex-col items-end">
            <p className="text-[15px] tracking-[0.15em] text-white/35 uppercase mb-1.5">
              Contact Us
            </p>
            <a
              href={`tel:${firmData.main_phone}`}
              className="text-[32px] font-bold text-[#C9A84C] tracking-wider hover:text-[#D4AF37] transition-colors mb-6"
              aria-label={`대표번호 ${firmData.main_phone}`}
            >
              {firmData.main_phone}
            </a>

            {/* Social icons */}
            <div className="flex items-center gap-2">
              <a
                href="https://pf.kakao.com/_ExcxoAu/chat"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-md border border-white/10 flex items-center justify-center hover:border-white/25 hover:bg-white/[0.04] transition-all"
                aria-label="카카오톡"
              >
                <svg className="w-[18px] h-[18px] text-white/45" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3c-5.523 0-10 3.584-10 8.007 0 2.86 1.89 5.37 4.73 6.788-.162.6-.586 2.17-.672 2.51-.107.424.156.418.328.304.135-.09 2.148-1.46 3.024-2.052.536.078 1.085.12 1.646.12h-.056c5.523 0 10-3.584 10-8.007-.027-4.087-4.504-7.67-10-7.67z" /></svg>
              </a>
              <a
                href="https://blog.naver.com/mnjhappylife"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-md border border-white/10 flex items-center justify-center hover:border-white/25 hover:bg-white/[0.04] transition-all"
                aria-label="네이버 블로그"
              >
                <span className="text-[14px] font-bold text-white/45 leading-none">blog</span>
              </a>
              <a
                href="https://www.youtube.com/@divorce_story"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-md border border-white/10 flex items-center justify-center hover:border-white/25 hover:bg-white/[0.04] transition-all"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 text-white/45" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
              </a>
              <a
                href="https://www.instagram.com/insup_cho"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-md border border-white/10 flex items-center justify-center hover:border-white/25 hover:bg-white/[0.04] transition-all"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 text-white/45" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" /></svg>
              </a>
              <Link
                href="/about/location"
                className="w-11 h-11 rounded-md border border-white/10 flex items-center justify-center hover:border-white/25 hover:bg-white/[0.04] transition-all"
                aria-label="오시는 길"
              >
                <svg className="w-4 h-4 text-white/45" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z" /></svg>
              </Link>
            </div>
          </div>
        </div>

        {/* ─── Bottom bar ─── */}
        <div className="py-5 md:py-6 border-t border-white/[0.06] text-center">
          <p className="text-[14px] md:text-[15px] text-white/20">
            © {new Date().getFullYear()} {firmData.firm_name}. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
