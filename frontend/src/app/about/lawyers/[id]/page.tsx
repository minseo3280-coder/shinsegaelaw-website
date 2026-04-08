"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Phone, ArrowRight, GraduationCap, Briefcase, CheckCircle2, Scale, Star } from "lucide-react";
import lawyersData from "@/../../data/lawyers.json";
import casesAllData from "@/../../data/cases_all.json";
import reviewsData from "@/../../data/reviews.json";
import firmData from "@/../../data/firm_info.json";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function LawyerDetailPage() {
  const params = useParams();
  const revealRef = useScrollReveal();
  const lawyerId = decodeURIComponent(params.id as string);

  const lawyer = lawyersData.lawyers.find(
    (l) => String(l.id) === lawyerId || l.name === lawyerId
  ) as (typeof lawyersData.lawyers)[number] & {
    intro?: string[];
    highlightQuote?: string;
    education?: ({ year?: string; text?: string } | string)[];
    label?: string;
    featured?: boolean;
    name_en?: string;
  };

  const [showAllCareer, setShowAllCareer] = useState(false);

  const matchedCases = useMemo(() => {
    if (!lawyer) return [];
    return (casesAllData.cases || []).filter(
      (c: { title?: string; summary?: string; lawyers?: string[] }) =>
        c.title?.includes(lawyer.name) ||
        c.summary?.includes(lawyer.name) ||
        c.lawyers?.includes(lawyer.name)
    );
  }, [lawyer]);

  const matchedReviews = useMemo(() => {
    if (!lawyer) return [];
    return reviewsData.reviews.filter((r) => r.lawyer?.includes(lawyer.name));
  }, [lawyer]);

  const otherLawyers = useMemo(() => {
    if (!lawyer) return [];
    return lawyersData.lawyers.filter((l) => l.name !== lawyer.name).slice(0, 6);
  }, [lawyer]);

  if (!lawyer) {
    return (
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10 py-20 text-center">
        <p className="text-[18px] font-bold text-gray-900 mb-4">변호사를 찾을 수 없습니다.</p>
        <Link href="/about/lawyers" className="text-[15px] text-[#9B2335]">&larr; 변호사 목록으로</Link>
      </div>
    );
  }

  const paragraphs = Array.isArray(lawyer.intro) ? lawyer.intro : lawyer.intro ? [lawyer.intro] : [];
  const careerItems = (lawyer.career || []) as (string | { year?: string; text?: string })[];
  const educationItems = (lawyer.education || []) as (string | { year?: string; text?: string })[];
  const displayCareer = showAllCareer ? careerItems : careerItems.slice(0, 6);

  const positionLabel =
    lawyer.label === "REPRESENTATIVE"
      ? "대표변호사"
      : lawyer.label === "FOUNDER"
      ? "창립 대표변호사"
      : lawyer.position;

  return (
    <div ref={revealRef}>
      {/* ═══ HERO — 사진 + 정보 ═══ */}
      <section className="bg-white pt-[90px] md:pt-[110px] pb-0 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-[420px_1fr] lg:grid-cols-[480px_1fr] gap-5 md:gap-14 items-start">
            {/* 사진 — 모바일에서 크기 제한 */}
            <div className="relative max-h-[360px] md:max-h-none aspect-[3/4] overflow-hidden bg-[#ECEAE6]">
              {lawyer.profile_image ? (
                <Image
                  src={lawyer.profile_image}
                  alt={`${lawyer.name} ${lawyer.position}`}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 480px"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-[64px] text-[#C9A84C]/30">{lawyer.name.charAt(0)}</span>
                </div>
              )}
            </div>

            {/* 정보 */}
            <div className="pt-0 md:pt-4">
              <h1 className="text-[26px] md:text-[52px] lg:text-[60px] font-extrabold text-[#1A1A1A] leading-[1.1] tracking-tight font-sans">
                {lawyer.name}
                <span className="text-[14px] md:text-[24px] font-semibold text-[#333333] ml-2 md:ml-3 align-baseline">
                  {positionLabel}
                </span>
              </h1>

              {lawyer.name_en && (
                <p className="text-[14px] md:text-[16px] text-[#444444] tracking-[0.08em] mt-1.5 md:mt-2">
                  {lawyer.name_en}
                </p>
              )}

              <div className="w-10 md:w-12 h-[2px] bg-[#9B2335] mt-4 md:mt-6 mb-4 md:mb-6" />

              {/* Quote */}
              {lawyer.highlightQuote && (
                <div className="bg-[#F8F4EE] border-l-[3px] border-[#9B2335] px-4 md:px-6 py-3.5 md:py-5 mb-5 md:mb-8">
                  <p
                    className="text-[15px] md:text-[19px] text-[#2C2028] font-semibold leading-[1.8] italic"
                    style={{ wordBreak: "keep-all" }}
                  >
                    &ldquo;{lawyer.highlightQuote}&rdquo;
                  </p>
                </div>
              )}

              {/* 전문분야 */}
              {lawyer.specialty && lawyer.specialty.length > 0 && (
                <div className="mb-5 md:mb-7">
                  <div className="flex items-center gap-2 mb-2.5 md:mb-4">
                    <CheckCircle2 size={16} className="text-[#9B2335]" />
                    <span className="text-[15px] md:text-[18px] font-bold text-[#1A1A1A]">전문분야</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 md:gap-2 ml-[24px] md:ml-[28px]">
                    {lawyer.specialty.map((s: string) => (
                      <span
                        key={s}
                        className="px-3 md:px-4 py-1 md:py-1.5 text-[15px] md:text-[16px] text-[#2C2028] font-semibold border border-[#B5AFA8] rounded-full"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* 소개글 */}
              {paragraphs.length > 0 && (
                <div className="mt-0 md:mt-2">
                  <div className="flex items-center gap-2 mb-2.5 md:mb-4">
                    <CheckCircle2 size={16} className="text-[#9B2335]" />
                    <span className="text-[15px] md:text-[18px] font-bold text-[#1A1A1A]">변호사 소개</span>
                  </div>
                  <div className="ml-[24px] md:ml-[28px]">
                    {paragraphs.slice(0, 2).map((p, i) => (
                      <p
                        key={i}
                        className="text-[15px] md:text-[18px] text-[#333333] leading-[1.8] mb-2.5 last:mb-0"
                        style={{ wordBreak: "keep-all" }}
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 구분선 */}
      <div className="bg-white">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10">
          <div className="h-[1px] bg-[#E8E4DE] mt-8 md:mt-14" />
        </div>
      </div>

      {/* 소개글 나머지 */}
      {paragraphs.length > 2 && (
        <section className="bg-white py-8 md:py-14" data-reveal>
          <div className="max-w-[900px] mx-auto px-5 md:px-8 lg:px-10">
            {paragraphs.slice(2).map((p, i) => (
              <p
                key={i}
                className="text-[15px] md:text-[19px] leading-[1.9] text-[#333333] mb-3 last:mb-0"
                style={{ wordBreak: "keep-all" }}
              >
                {p}
              </p>
            ))}
          </div>
        </section>
      )}

      {/* ═══ 학력 + 경력 ═══ */}
      <section className="bg-[#F0EDE8] py-14 md:py-20" data-reveal>
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            {/* 학력 카드 */}
            <div className="bg-white rounded-xl md:rounded-2xl p-5 md:p-10">
              <div className="flex items-center gap-2.5 md:gap-3 mb-4 md:mb-7">
                <GraduationCap size={18} className="text-[#2C2028]" />
                <h3 className="text-[16px] md:text-[24px] font-bold text-[#2C2028] font-sans">학력사항</h3>
              </div>
              <div className="space-y-2 md:space-y-3.5">
                {educationItems.length > 0 ? (
                  educationItems.map((item, i) => (
                    <p
                      key={i}
                      className="text-[14px] md:text-[18px] text-[#333333] leading-[1.7] pl-4 md:pl-5 relative before:content-['◆'] before:absolute before:left-0 before:top-[7px] md:before:top-[11px] before:text-[5px] md:before:text-[7px] before:text-burgundy-400"
                    >
                      {typeof item === "string" ? item : item.text || ""}
                    </p>
                  ))
                ) : (
                  <p className="text-[15px] md:text-[17px] text-[#333333]">학력 정보가 준비 중입니다.</p>
                )}
              </div>
            </div>

            {/* 경력 카드 */}
            <div className="bg-white rounded-xl md:rounded-2xl p-5 md:p-10">
              <div className="flex items-center gap-2.5 md:gap-3 mb-4 md:mb-7">
                <Briefcase size={18} className="text-[#2C2028]" />
                <h3 className="text-[16px] md:text-[24px] font-bold text-[#2C2028] font-sans">경력사항</h3>
              </div>
              <div className="space-y-2 md:space-y-3.5">
                {displayCareer.map((item, i) => (
                  <p
                    key={i}
                    className="text-[14px] md:text-[18px] text-[#333333] leading-[1.7] pl-4 md:pl-5 relative before:content-['◆'] before:absolute before:left-0 before:top-[7px] md:before:top-[11px] before:text-[5px] md:before:text-[7px] before:text-burgundy-400"
                  >
                    {typeof item === "string" ? item : item.text || ""}
                  </p>
                ))}
              </div>
              {careerItems.length > 6 && (
                <button
                  onClick={() => setShowAllCareer(!showAllCareer)}
                  className="mt-5 md:mt-8 text-[14px] md:text-[16px] text-[#9B2335] font-semibold flex items-center gap-1.5 hover:gap-2.5 transition-all"
                >
                  {showAllCareer ? "접기" : `전체 경력 보기 (${careerItems.length}건)`}
                  <ArrowRight size={14} />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 승소사례 ═══ */}
      {matchedCases.length > 0 && (
        <section className="bg-white py-14 md:py-20" data-reveal>
          <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10">
            <div className="flex items-center justify-between mb-6 md:mb-10">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#9B2335]/10 flex items-center justify-center">
                  <Scale size={15} className="text-[#9B2335]" />
                </div>
                <h3 className="text-[18px] md:text-[30px] font-bold text-[#1A1A1A] font-sans">승소사례</h3>
              </div>
              <span className="text-[22px] md:text-[36px] font-extrabold text-[#9B2335]">
                {matchedCases.length}<span className="text-[15px] md:text-[18px] font-semibold text-[#333333] ml-1">건</span>
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
              {matchedCases.slice(0, 4).map((c, i) => {
                const amountMatch = (c.result || "").match(/(\d[\d,]*)\s*(만원|억|원)/);
                const amount = amountMatch ? amountMatch[0] : null;
                return (
                  <Link
                    key={i}
                    href={`/cases/${c.id || i}`}
                    className="group relative flex flex-col bg-white rounded-xl border border-[#E8E4DE] overflow-hidden hover:shadow-[0_8px_30px_rgba(155,35,53,0.08)] hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="h-[3px] bg-[#9B2335] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                    <div className="flex flex-col flex-1 p-4 md:p-7">
                      <span className="inline-block self-start px-2.5 py-0.5 text-[14px] md:text-[16px] font-bold text-[#9B2335] bg-[#9B2335]/8 rounded-full mb-2.5 md:mb-4">
                        {c.category}
                      </span>
                      <p className="text-[15px] md:text-[19px] font-bold text-[#1A1A1A] group-hover:text-[#9B2335] transition-colors leading-[1.5] mb-3 md:mb-4 line-clamp-2 flex-1" style={{ wordBreak: "keep-all" }}>
                        {c.title}
                      </p>
                      <div className="pt-3 md:pt-4 border-t border-[#F0EDE8] mt-auto">
                        {amount ? (
                          <p className="text-[18px] md:text-[24px] font-extrabold text-[#9B2335]">
                            {amount}
                            <span className="text-[15px] md:text-[18px] font-semibold text-[#333333] ml-1.5">획득</span>
                          </p>
                        ) : c.result ? (
                          <p className="text-[15px] md:text-[17px] font-bold text-[#9B2335] leading-relaxed">{c.result}</p>
                        ) : (
                          <p className="text-[15px] text-[#333333]">승소</p>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {matchedCases.length > 4 && (
              <div className="text-center mt-6 md:mt-10">
                <Link
                  href="/cases"
                  className="inline-flex items-center gap-2 px-5 md:px-7 py-2.5 md:py-3 border border-[#B5AFA8] text-[14px] md:text-[16px] text-[#2C2028] font-semibold rounded-full hover:border-[#9B2335] hover:text-[#9B2335] transition-all"
                >
                  승소사례 {matchedCases.length}건 전체보기
                  <ArrowRight size={14} />
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ═══ 의뢰인 후기 ═══ */}
      {matchedReviews.length > 0 && (
        <section className="bg-[#F8F4EE] py-14 md:py-20" data-reveal>
          <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10">
            <div className="flex items-center justify-between mb-6 md:mb-10">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#C9A84C]/10 flex items-center justify-center">
                  <Star size={15} className="text-[#C9A84C]" />
                </div>
                <h3 className="text-[18px] md:text-[30px] font-bold text-[#1A1A1A] font-sans">의뢰인 후기</h3>
              </div>
              <span className="text-[22px] md:text-[36px] font-extrabold text-[#C9A84C]">
                {matchedReviews.length}<span className="text-[15px] md:text-[18px] font-semibold text-[#333333] ml-1">건</span>
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
              {matchedReviews.slice(0, 6).map((r, i) => (
                <Link
                  key={i}
                  href={`/reviews/${r.id}`}
                  className="group block bg-white rounded-xl overflow-hidden hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="p-4 md:p-6">
                    {r.result && (
                      <div className="inline-block px-2.5 py-0.5 text-[15px] md:text-[16px] font-bold text-[#9B2335] bg-[#9B2335]/8 rounded-full mb-3 md:mb-4">
                        {r.result}
                      </div>
                    )}
                    <p className="text-[15px] md:text-[19px] text-[#2C2028] font-semibold leading-[1.7] mb-3 md:mb-5 line-clamp-3" style={{ wordBreak: "keep-all" }}>
                      {r.title}
                    </p>
                    <div className="flex items-center justify-between pt-3 md:pt-4 border-t border-[#F0EDE8]">
                      <span className="text-[15px] md:text-[16px] text-[#333333]">{r.case_type}</span>
                      <span className="text-[14px] md:text-[15px] text-[#444444]">{r.date}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {matchedReviews.length > 6 && (
              <div className="text-center mt-6 md:mt-10">
                <Link
                  href="/reviews"
                  className="inline-flex items-center gap-2 px-5 md:px-7 py-2.5 md:py-3 border border-[#B5AFA8] text-[14px] md:text-[16px] text-[#2C2028] font-semibold rounded-full hover:border-[#9B2335] hover:text-[#9B2335] transition-all bg-white"
                >
                  후기 {matchedReviews.length}건 전체보기
                  <ArrowRight size={14} />
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ═══ 다른 변호사 ═══ */}
      <section className="bg-white py-14 md:py-20 border-t border-[#E8E4DE]" data-reveal>
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10">
          <h2 className="text-[14px] md:text-[15px] text-[#C9A84C] font-bold tracking-[0.2em] uppercase mb-2 md:mb-3 text-center">
            OUR TEAM
          </h2>
          <h3 className="text-[20px] md:text-[32px] font-bold text-[#2C2028] mb-6 md:mb-10 text-center font-sans">
            함께하는 변호사
          </h3>
          <div className="grid grid-cols-4 md:grid-cols-6 gap-2.5 md:gap-6">
            {otherLawyers.map((l) => (
              <Link key={l.name} href={`/about/lawyers/${l.name}`} className="group text-center">
                <div className="relative aspect-square md:aspect-[3/4] rounded-lg md:rounded-xl overflow-hidden bg-[#F0EDE8] mb-1.5 md:mb-3">
                  {l.profile_image ? (
                    <Image
                      src={l.profile_image}
                      alt={l.name}
                      fill
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 25vw, 16vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-[24px] text-[#C9A84C]/30">{l.name.charAt(0)}</span>
                    </div>
                  )}
                </div>
                <p className="text-[15px] md:text-[18px] font-bold text-[#2C2028] group-hover:text-[#9B2335] transition-colors">{l.name}</p>
                <p className="text-[15px] md:text-[15px] text-[#333333]">{l.position}</p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-6 md:mt-10">
            <Link href="/about/lawyers" className="px-6 md:px-8 py-2.5 md:py-3 border border-[#B5AFA8] text-[14px] md:text-[16px] text-[#2C2028] font-semibold rounded-xl hover:border-[#9B2335]/30 hover:text-[#9B2335] transition-all">
              전체 변호사 보기
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="bg-[#F8F4EE] py-14 md:py-20" data-reveal>
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10 text-center">
          <p className="text-[15px] md:text-[18px] text-[#333333] mb-4 md:mb-5">
            {lawyer.name} 변호사에게 상담을 원하시나요?
          </p>
          <a
            href={`tel:${firmData.offices[0].phone}`}
            className="inline-flex items-center gap-2 md:gap-3 text-[22px] md:text-[44px] font-extrabold text-[#2C2028] hover:text-[#9B2335] transition-colors"
            aria-label={`전화 상담 ${firmData.offices[0].phone}`}
          >
            <Phone size={22} className="text-[#9B2335]" />
            {firmData.offices[0].phone}
          </a>
          <div className="flex flex-row items-center justify-center gap-2.5 md:gap-4 mt-6 md:mt-8">
            <Link href="/consultation" className="flex-1 sm:flex-none text-center px-5 md:px-8 py-3 md:py-3.5 bg-[#2C2028] text-white text-[14px] md:text-[16px] font-bold rounded-xl hover:bg-[#1a1218] transition-colors">
              무료 상담 신청
            </Link>
            <a
              href="https://pf.kakao.com/_ExcxoAu/chat"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none text-center px-5 md:px-8 py-3 md:py-3.5 border border-[#B5AFA8] text-[14px] md:text-[16px] text-[#2C2028] font-bold rounded-xl hover:border-[#9B2335]/30 hover:text-[#9B2335] transition-all"
            >
              카카오톡 상담
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
