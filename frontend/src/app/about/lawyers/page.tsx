"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Phone } from "lucide-react";
import SubPageHero from "@/components/shared/SubPageHero";
import lawyersData from "@/../../data/lawyers.json";
import firmData from "@/../../data/firm_info.json";
import LawyerTabs from "@/components/shared/LawyerTabs";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function LawyersListPage() {
  const revealRef = useScrollReveal();
  const featured = lawyersData.lawyers.filter((l) => l.featured);
  const leaders = lawyersData.lawyers.filter(
    (l) => !l.featured && (l.role.includes("총괄") || l.role.includes("팀장"))
  );
  const members = lawyersData.lawyers.filter(
    (l) => !l.featured && !l.role.includes("총괄") && !l.role.includes("팀장")
  );

  return (
    <div ref={revealRef} className="">
      {/* ─── Banner ─── */}
      <SubPageHero
        titleEn="OUR ATTORNEYS"
        titleKo="변호사 소개"
        bannerImage="/images/office/banner-about.jpg"
        breadcrumbs={[{ label: "구성원", href: "/about/lawyers" }, { label: "변호사소개" }]}
      />

      {/* ─── Tabs ─── */}
      <LawyerTabs activeTab={0} />

      {/* ═══════════════════════════════════════════════════
          SECTION 1 — 대표변호사 (풀와이드 프리미엄 영역)
          ═══════════════════════════════════════════════════ */}
      <section className="bg-white py-10 md:py-20" data-reveal>
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10">
          {/* Section header */}
          <div className="mb-8 md:mb-12">
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <div className="w-8 md:w-10 h-[2px] bg-burgundy-500" />
              <p className="text-[13px] md:text-[14px] tracking-[0.3em] uppercase font-bold text-burgundy-500">
                Representative
              </p>
            </div>
            <h2 className="font-sans text-[22px] md:text-[42px] lg:text-[48px] leading-[1.3] font-bold text-[#2C2028]">
              대표 변호사
            </h2>
          </div>

          {/* Featured cards — 더 크고 존재감 있게 */}
          <div className="grid grid-cols-2 md:grid-cols-2 gap-3 md:gap-8">
            {featured.map((lawyer) => (
              <Link
                key={lawyer.name}
                href={`/about/lawyers/${lawyer.name}`}
                className="group block"
              >
                <div className="relative overflow-hidden rounded-2xl bg-[#F5F3F0]">
                  {/* Photo — 대표는 크게 */}
                  <div className="relative aspect-[3/4] max-h-[280px] md:max-h-none overflow-hidden">
                    {lawyer.profile_image ? (
                      <Image
                        src={lawyer.profile_image}
                        alt={`${lawyer.name} ${lawyer.position}`}
                        fill
                        className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <span className="text-[48px] text-gray-300 font-bold">{lawyer.name.charAt(0)}</span>
                      </div>
                    )}
                    {/* Gradient overlay at bottom */}
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
                    {/* Name overlay on photo */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
                      {lawyer.label && (
                        <span className="inline-block px-2 py-0.5 md:px-3 md:py-1 bg-[#9B2335] text-white text-[9px] md:text-[10px] tracking-[0.15em] font-bold uppercase rounded mb-2 md:mb-3">
                          {lawyer.label === "REPRESENTATIVE" ? "대표변호사" : "창립 대표변호사"}
                        </span>
                      )}
                      <h3 className="text-[18px] md:text-[38px] font-extrabold text-white leading-tight font-sans">
                        {lawyer.name}
                        <span className="text-[13px] md:text-[20px] font-bold text-white/70 ml-1.5 md:ml-2">변호사</span>
                      </h3>
                    </div>
                  </div>

                  {/* Info below photo — 모바일에서 숨김 */}
                  <div className="hidden md:block p-8 bg-white">
                    <p className="text-[17px] text-[#9B2335] font-bold mb-4">
                      {lawyer.specialty ? lawyer.specialty.join(" / ") : lawyer.description} 전문
                    </p>
                    <div className="w-10 h-[2px] bg-[#C9A84C]/50 mb-5" />
                    <div className="space-y-2.5">
                      {lawyer.career &&
                        lawyer.career.slice(0, 4).map((item: string | { text?: string }, i: number) => (
                          <p key={i} className="text-[16px] text-[#3A3238] leading-[1.7] flex items-start gap-2.5">
                            <span className="text-[#C9A84C] mt-[3px] flex-shrink-0 text-[10px]">◆</span>
                            <span>{typeof item === "string" ? item : item.text || ""}</span>
                          </p>
                        ))}
                    </div>
                    <div className="flex items-center gap-2 mt-6 text-[16px] text-[#9B2335] font-semibold group-hover:gap-3 transition-all duration-300">
                      프로필 보기
                      <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                    </div>
                  </div>
                  {/* Mobile: compact info */}
                  <div className="md:hidden px-3 py-2.5 bg-white">
                    <p className="text-[13px] text-[#9B2335] font-bold leading-tight">
                      {lawyer.specialty ? lawyer.specialty.slice(0, 2).join(" / ") : lawyer.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 2 — 총괄/팀장 변호사
          ═══════════════════════════════════════════════════ */}
      <section className="bg-[#F8F6F3] py-10 md:py-20">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10">
          <div className="text-center mb-8 md:mb-12" data-reveal>
            <p className="text-[12px] tracking-[0.3em] text-[#C9A84C] uppercase font-bold mb-2 md:mb-3">
              Team Leaders
            </p>
            <h2 className="text-[22px] md:text-[32px] font-extrabold text-[#1A1A2E] leading-tight font-sans">
              총괄 · 팀장 변호사
            </h2>
            <p className="text-[16px] md:text-[18px] text-[#333333] mt-2 md:mt-3">
              각 분야를 이끄는 리더 {leaders.length}인
            </p>
          </div>

          {/* 모바일: 2열 컴팩트 그리드 / 데스크탑: 기존 가로형 카드 */}
          {/* Mobile 2-col grid */}
          <div className="grid grid-cols-2 gap-3 md:hidden">
            {leaders.map((lawyer) => (
              <Link
                key={lawyer.name}
                href={`/about/lawyers/${lawyer.name}`}
                data-reveal
                className="group block text-center"
              >
                <div className="relative aspect-[3/4] max-h-[220px] rounded-xl overflow-hidden bg-[#EDEDEB] mb-2">
                  {lawyer.profile_image ? (
                    <Image
                      src={lawyer.profile_image}
                      alt={`${lawyer.name} ${lawyer.position}`}
                      fill
                      className="object-cover object-top"
                      sizes="45vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-[28px] text-gray-300 font-bold">{lawyer.name.charAt(0)}</span>
                    </div>
                  )}
                  <span className="absolute top-2 left-2 text-[9px] font-bold text-[#C9A84C] bg-black/60 px-2 py-0.5 rounded">{lawyer.role.includes("총괄") ? "총괄" : "팀장"}</span>
                </div>
                <p className="text-[15px] font-bold text-[#1A1A2E]">{lawyer.name}</p>
                <p className="text-[12px] text-[#333333]">{lawyer.position}</p>
              </Link>
            ))}
          </div>

          {/* Desktop horizontal cards */}
          <div className="hidden md:grid grid-cols-2 gap-6">
            {leaders.map((lawyer) => (
              <Link
                key={lawyer.name}
                href={`/about/lawyers/${lawyer.name}`}
                data-reveal
                className="flex bg-white rounded-2xl overflow-hidden group hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-400"
              >
                <div className="relative w-[40%] bg-[#EDEDEB] flex-shrink-0 overflow-hidden">
                  <div className="relative aspect-[3/4]">
                    {lawyer.profile_image ? (
                      <Image
                        src={lawyer.profile_image}
                        alt={`${lawyer.name} ${lawyer.position}`}
                        fill
                        className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
                        sizes="22vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-[32px] text-gray-300 font-bold">{lawyer.name.charAt(0)}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex-1 p-7 flex flex-col min-h-0">
                  <h3 className="text-[26px] font-extrabold text-[#1A1A2E] mb-0.5 leading-tight font-sans">
                    {lawyer.name}
                    <span className="text-[17px] font-bold text-[#333333] ml-1.5">변호사</span>
                  </h3>
                  <p className="text-[13px] text-[#333333] mt-0.5 mb-1">{lawyer.role}</p>
                  <p className="text-[16px] text-[#9B2335] font-semibold mt-1 mb-4">
                    {lawyer.specialty ? lawyer.specialty.join(" / ") : lawyer.description} 전문
                  </p>
                  <div className="w-8 h-[2px] bg-[#C9A84C]/40 mb-4" />
                  <div className="flex-1 space-y-1.5">
                    {lawyer.career &&
                      lawyer.career.slice(0, 4).map((item: string | { text?: string }, i: number) => (
                        <p key={i} className="text-[16px] text-[#3A3238] leading-[1.7] flex items-start gap-2">
                          <span className="text-[#C9A84C] mt-[2px] flex-shrink-0 text-[9px]">◆</span>
                          <span className="line-clamp-1">{typeof item === "string" ? item : item.text || ""}</span>
                        </p>
                      ))}
                  </div>
                  <div className="flex justify-end mt-4">
                    <span className="text-[13px] text-[#333333] group-hover:text-[#9B2335] flex items-center gap-1 transition-colors duration-300">
                      <ArrowUpRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 3 — 전문 변호사
          ═══════════════════════════════════════════════════ */}
      <section className="bg-white py-10 md:py-20">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10">
          <div className="text-center mb-8 md:mb-12" data-reveal>
            <p className="text-[12px] tracking-[0.3em] text-[#C9A84C] uppercase font-bold mb-2 md:mb-3">
              Professional Lawyers
            </p>
            <h2 className="text-[22px] md:text-[32px] font-extrabold text-[#1A1A2E] leading-tight font-sans">
              전문 변호사
            </h2>
            <p className="text-[16px] md:text-[18px] text-[#333333] mt-2 md:mt-3">
              이혼·상속 전문 변호사 {members.length}인
            </p>
          </div>

          {/* Mobile 2-col grid */}
          <div className="grid grid-cols-2 gap-3 md:hidden">
            {members.map((lawyer) => (
              <Link
                key={lawyer.name}
                href={`/about/lawyers/${lawyer.name}`}
                data-reveal
                className="group block text-center"
              >
                <div className="relative aspect-[3/4] max-h-[220px] rounded-xl overflow-hidden bg-[#EDEDEB] mb-2">
                  {lawyer.profile_image ? (
                    <Image
                      src={lawyer.profile_image}
                      alt={`${lawyer.name} ${lawyer.position}`}
                      fill
                      className="object-cover object-top"
                      sizes="45vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-[28px] text-gray-300 font-bold">{lawyer.name.charAt(0)}</span>
                    </div>
                  )}
                </div>
                <p className="text-[15px] font-bold text-[#1A1A2E]">{lawyer.name}</p>
                <p className="text-[12px] text-[#333333]">{lawyer.position}</p>
              </Link>
            ))}
          </div>

          {/* Desktop horizontal cards */}
          <div className="hidden md:grid grid-cols-2 gap-6">
            {members.map((lawyer) => (
              <Link
                key={lawyer.name}
                href={`/about/lawyers/${lawyer.name}`}
                data-reveal
                className="flex bg-[#F8F6F3] rounded-2xl overflow-hidden group hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-400"
              >
                <div className="relative w-[40%] bg-[#EDEDEB] flex-shrink-0 overflow-hidden">
                  <div className="relative aspect-[3/4]">
                    {lawyer.profile_image ? (
                      <Image
                        src={lawyer.profile_image}
                        alt={`${lawyer.name} ${lawyer.position}`}
                        fill
                        className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
                        sizes="22vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-[32px] text-gray-300 font-bold">{lawyer.name.charAt(0)}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex-1 p-7 flex flex-col min-h-0">
                  <h3 className="text-[26px] font-extrabold text-[#1A1A2E] mb-0.5 leading-tight font-sans">
                    {lawyer.name}
                    <span className="text-[17px] font-bold text-[#333333] ml-1.5">변호사</span>
                  </h3>
                  <p className="text-[16px] text-[#9B2335] font-semibold mt-1.5 mb-4">
                    {lawyer.specialty ? lawyer.specialty.join(" / ") : lawyer.description} 전문
                  </p>
                  <div className="w-8 h-[2px] bg-[#C9A84C]/40 mb-4" />
                  <div className="flex-1 space-y-1.5">
                    {lawyer.career &&
                      lawyer.career.slice(0, 4).map((item: string | { text?: string }, i: number) => (
                        <p key={i} className="text-[16px] text-[#3A3238] leading-[1.7] flex items-start gap-2">
                          <span className="text-[#C9A84C] mt-[2px] flex-shrink-0 text-[9px]">◆</span>
                          <span className="line-clamp-1">{typeof item === "string" ? item : item.text || ""}</span>
                        </p>
                      ))}
                  </div>
                  <div className="flex justify-end mt-4">
                    <span className="text-[13px] text-[#333333] group-hover:text-[#9B2335] flex items-center gap-1 transition-colors duration-300">
                      <ArrowUpRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          BOTTOM CTA
          ═══════════════════════════════════════════════════ */}
      <section className="bg-white py-10 md:py-16">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10 text-center" data-reveal>
          <p className="text-[16px] md:text-[18px] text-[#333333] mb-3 md:mb-4">
            상담이 필요하시면 언제든 연락 주세요.
          </p>
          <a
            href={`tel:${firmData.offices[0].phone}`}
            className="inline-flex items-center gap-2 text-[28px] md:text-[34px] font-extrabold text-[#1A1A2E] hover:text-[#9B2335] transition-colors"
            aria-label={`전화 상담 ${firmData.offices[0].phone}`}
          >
            <Phone size={24} className="text-[#9B2335]" />
            {firmData.offices[0].phone}
          </a>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-6">
            <Link
              href="/consultation"
              className="w-full sm:w-auto text-center px-8 py-3 bg-[#9B2335] text-white text-[15px] font-bold rounded-xl hover:bg-[#7B2D3B] transition-colors"
            >
              무료 상담 신청
            </Link>
            <a
              href="https://pf.kakao.com/_ExcxoAu/chat"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto text-center px-8 py-3 border border-gray-300 text-[15px] text-[#2C2028] font-bold rounded-xl hover:border-[#9B2335]/30 hover:text-[#9B2335] transition-all"
            >
              카카오톡 상담
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
