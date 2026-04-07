"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SubPageHero from "@/components/shared/SubPageHero";
import teamsData from "@/../../data/teams.json";
import lawyersData from "@/../../data/lawyers.json";
import AboutTabs from "@/components/shared/AboutTabs";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/* ── CountUp hook ── */
function useCountUp(target: number, duration: number = 1800) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const startTime = performance.now();
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
    const animate = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      setCount(Math.round(easeOut(progress) * target));
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDone(true);
      }
    };
    requestAnimationFrame(animate);
  }, [started, target, duration]);

  return { count, ref, done };
}

/* ── Data ── */
const teams = teamsData.teams;
const system = teamsData.system;
const lawyers = lawyersData.lawyers;

/* Team leader photo lookup */
function getLeaderPhoto(leaderId: number): string {
  const lawyer = lawyers.find((l: { id: number; profile_image?: string }) => l.id === leaderId);
  return lawyer?.profile_image || "";
}

/* ── Stat Item ── */
function StatItem({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { count, ref } = useCountUp(value);
  return (
    <div className="text-center" ref={ref}>
      <p className="text-[28px] md:text-[48px] font-bold text-[#9B2335] leading-none tracking-tight" style={{ fontVariantNumeric: "tabular-nums" }}>
        {count.toLocaleString()}
        <span className="text-[14px] md:text-[20px] font-semibold text-[#2C2028] ml-0.5">{suffix}</span>
      </p>
      <p className="text-[11px] md:text-[14px] text-[#888888] mt-1.5 md:mt-2 tracking-wide">{label}</p>
    </div>
  );
}

/* ── Certifications ── */
const certifiedLawyers = [
  { name: "조인섭", specialty: "가족법 · 상속", position: "대표변호사", profileImage: "/images/attorneys/lawyer_profile_01.webp" },
  { name: "김미루", specialty: "이혼", position: "서울총괄 변호사", profileImage: "/images/attorneys/lawyer_profile_04.webp" },
  { name: "류현주", specialty: "가사법 · 상속", position: "대전총괄 변호사", profileImage: "/images/attorneys/lawyer_profile_05.webp" },
  { name: "신진희", specialty: "가사법", position: "수원총괄 변호사", profileImage: "/images/attorneys/lawyer_profile_09.webp" },
  { name: "박경내", specialty: "이혼", position: "변호사", profileImage: "/images/attorneys/lawyer_profile_06.webp" },
  { name: "이명인", specialty: "이혼", position: "변호사", profileImage: "/images/attorneys/lawyer_profile_12.webp" },
  { name: "조윤용", specialty: "가사법 · 상속", position: "변호사", profileImage: "/images/attorneys/lawyer_profile_20.webp" },
  { name: "정두리", specialty: "이혼", position: "변호사", profileImage: "/images/attorneys/lawyer_profile_19.webp" },
];

export default function SystemPage() {
  const revealRef = useScrollReveal();

  return (
    <div ref={revealRef}>
      {/* ── Banner ── */}
      <SubPageHero
        titleEn="SYSTEM"
        titleKo="신세계로 시스템"
        bannerImage="/images/office/banner-about.jpg"
        breadcrumbs={[{ label: "신세계로", href: "/about/greeting" }, { label: "신세계로 시스템" }]}
      />

      {/* ── Tabs ── */}
      <AboutTabs activeTab={2} />


      {/* ══════════════════════════════════════════
          Section 1: Headline
      ══════════════════════════════════════════ */}
      <section className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10 pt-10 md:pt-20" data-reveal>
        <div className="w-8 md:w-10 h-[2px] bg-[#9B2335] mb-4 md:mb-5" />
        <p className="text-[11px] md:text-[12px] tracking-[0.3em] text-[#C9A84C] uppercase font-bold mb-3">
          Our System
        </p>
        <h2
          className="text-[22px] md:text-[44px] lg:text-[50px] font-bold text-[#2C2028] leading-[1.35] tracking-tight"
          style={{ wordBreak: "keep-all" as const }}
        >
          뛰어난 개인이 아닌,<br />
          <span className="text-[#9B2335]">완벽한 시스템</span>이 승리합니다.
        </h2>
        <p className="text-[15px] md:text-[21px] text-[#333333] leading-[1.9] mt-3 md:mt-5 max-w-[900px]" style={{ wordBreak: "keep-all" as const }}>
          신세계로는 대표변호사부터 전문직원까지 하나의 팀으로 움직입니다.<br />
          52년간 쌓아온 시스템이 1,053건의 승소를 만들었습니다.
        </p>
      </section>


      {/* ══════════════════════════════════════════
          Section 2: Stats Band
      ══════════════════════════════════════════ */}
      <div className="border-t border-b border-gray-200 py-8 md:py-10 mt-10 md:mt-14" data-reveal>
        <div className="max-w-[600px] md:max-w-[900px] mx-auto px-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
            <StatItem value={52} suffix="년" label="법조 전통" />
            <StatItem value={22} suffix="인" label="전문 변호사" />
            <StatItem value={1053} suffix="건+" label="누적 승소사례" />
            <StatItem value={7} suffix="개" label="전문팀 운영" />
          </div>
        </div>
      </div>


      {/* ══════════════════════════════════════════
          Section 3: 경험과 신뢰의 리더십
      ══════════════════════════════════════════ */}
      <section className="bg-white py-8 md:py-20" data-reveal>
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10">
          <div className="w-8 md:w-10 h-[2px] bg-[#9B2335] mb-4 md:mb-5" />
          <p className="text-[11px] md:text-[12px] tracking-[0.3em] text-[#C9A84C] uppercase font-bold mb-3">
            Leadership
          </p>
          <h3
            className="text-[20px] md:text-[38px] font-bold text-[#2C2028] leading-[1.35] tracking-tight mb-3 md:mb-4"
            style={{ wordBreak: "keep-all" as const }}
          >
            신세계로를 이끈 <span className="text-[#9B2335]">경험과 신뢰</span>의 리더십
          </h3>
          <p className="text-[15px] md:text-[21px] text-[#333333] leading-[1.9] max-w-[800px] mb-10 md:mb-14">
            2대에 걸쳐 사법시험을 합격한 법조 가문.<br />
            시간만큼 깊어진 이해와 전문성은 의뢰인에게 최선의 결과를 가져다 드립니다.
          </p>

          {/* Two leaders */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* 조인섭 */}
            <div className="flex gap-4 md:gap-6">
              <div className="relative w-[100px] md:w-[140px] h-[130px] md:h-[180px] flex-shrink-0 bg-[#F0EBE4] overflow-hidden">
                <Image
                  src="/images/attorneys/lawyer_profile_01.webp"
                  alt="조인섭 대표변호사"
                  fill
                  className="object-cover object-top"
                  sizes="140px"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] md:text-[12px] text-[#999999] tracking-wide mb-1">법무법인 신세계로 2대 (현) 대표</p>
                <p className="text-[18px] md:text-[24px] font-bold text-[#2C2028] tracking-tight mb-3">
                  조인섭 <span className="text-[14px] md:text-[16px] font-semibold text-[#555555]">대표변호사</span>
                </p>
                <div className="space-y-1">
                  {[
                    "사법시험 43회 합격",
                    "사법연수원 33기 수료",
                    "가족법 박사학위 취득",
                    "대한변협 가족법 전문 제1호",
                    "이화여대 로스쿨 겸임교수",
                  ].map((item, i) => (
                    <p key={i} className="text-[13px] md:text-[15px] text-[#333333] leading-[1.8]">
                      {i < 2 ? (
                        <span className="text-[#9B2335] font-semibold">{item}</span>
                      ) : (
                        <>· {item}</>
                      )}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* 조용국 */}
            <div className="flex gap-4 md:gap-6">
              <div className="relative w-[100px] md:w-[140px] h-[130px] md:h-[180px] flex-shrink-0 bg-[#F0EBE4] overflow-hidden">
                <Image
                  src="/images/attorneys/lawyer_profile_02.webp"
                  alt="조용국 변호사"
                  fill
                  className="object-cover object-top"
                  sizes="140px"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] md:text-[12px] text-[#999999] tracking-wide mb-1">법무법인 신세계로 1대 대표</p>
                <p className="text-[18px] md:text-[24px] font-bold text-[#2C2028] tracking-tight mb-3">
                  조용국 <span className="text-[14px] md:text-[16px] font-semibold text-[#555555]">변호사</span>
                </p>
                <div className="space-y-1">
                  {[
                    "사법시험 12회 합격 (1970)",
                    "사법연수원 2기 수료 (1972)",
                    "서울중앙지검 특수 1,2,3부장",
                    "부산동부지청장",
                    "의정부지청장",
                  ].map((item, i) => (
                    <p key={i} className="text-[13px] md:text-[15px] text-[#333333] leading-[1.8]">
                      {i < 2 ? (
                        <span className="text-[#9B2335] font-semibold">{item}</span>
                      ) : (
                        <>· {item}</>
                      )}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════
          Section 4: Quote Band
      ══════════════════════════════════════════ */}
      <div className="bg-[#F8F4EE] py-10 md:py-14" data-reveal>
        <div className="max-w-[560px] md:max-w-[900px] mx-auto px-8 md:px-10 text-center">
          <div className="w-8 h-[1px] bg-[#C9A84C] mx-auto mb-5 md:mb-7" />
          <p
            className="text-[15px] md:text-[24px] text-[#2C2028] font-bold leading-[2] md:leading-[1.8]"
            style={{ wordBreak: "keep-all" as const }}
          >
            이혼소송을 사건이 아닌 &lsquo;쟁점&rsquo;으로 나눕니다.<br />
            분업화된 조직과 전략 총괄자가<br className="md:hidden" />
            시스템으로 승리를 설계합니다.
          </p>
          <div className="w-8 h-[1px] bg-[#C9A84C] mx-auto mt-5 md:mt-7" />
        </div>
      </div>


      {/* ══════════════════════════════════════════
          Section 5: 이혼상속 집중 시스템 — 운영 구조
      ══════════════════════════════════════════ */}
      <section className="bg-white py-8 md:py-20" data-reveal>
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10">
          <div className="w-8 md:w-10 h-[2px] bg-[#9B2335] mb-4 md:mb-5" />
          <p className="text-[11px] md:text-[12px] tracking-[0.3em] text-[#C9A84C] uppercase font-bold mb-3">
            Operations
          </p>
          <h3
            className="text-[20px] md:text-[38px] font-bold text-[#2C2028] leading-[1.35] tracking-tight mb-2"
            style={{ wordBreak: "keep-all" as const }}
          >
            이혼상속 <span className="text-[#9B2335]">집중 시스템</span>
          </h3>
          <p className="text-[15px] md:text-[21px] text-[#333333] leading-[1.9] max-w-[800px] mb-8 md:mb-12">
            의뢰인별 맞춤팀 구성과 대표변호사를 필두로 담당변호사, 실장, 담당직원이 한 팀이 되어 사건진행을 신속·정확하게 알려드립니다.
          </p>

          {/* Org structure */}
          <div className="bg-[#F8F4EE] py-8 md:py-10 px-5 md:px-10 mb-10 md:mb-14">
            <p className="text-[11px] md:text-[12px] tracking-[0.2em] text-[#999999] uppercase font-bold mb-5 text-center">
              Organizational Structure
            </p>
            <div className="flex flex-col items-center">
              {/* Center */}
              <div className="border-2 border-[#9B2335] bg-white px-6 py-3 text-center">
                <span className="text-[9px] text-[#9B2335]/50 tracking-[0.1em] block">CENTER</span>
                <span className="text-[15px] md:text-[17px] font-bold text-[#9B2335]">대표변호사</span>
              </div>
              <div className="w-[1px] h-4 bg-gray-300" />
              {/* Branches */}
              <div className="grid grid-cols-3 gap-2 md:gap-4 w-full max-w-[400px]">
                {[
                  { role: "LEGAL", title: "전문변호사" },
                  { role: "MANAGEMENT", title: "전문실장" },
                  { role: "SUPPORT", title: "전문직원" },
                ].map((n) => (
                  <div key={n.role} className="py-2.5 px-2 md:px-5 border border-gray-200 bg-white text-center">
                    <div className="text-[8px] md:text-[9px] text-[#999999] tracking-[0.05em]">{n.role}</div>
                    <div className="text-[13px] md:text-[15px] text-[#2C2028] font-semibold mt-0.5">{n.title}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 4 Step process */}
          <p className="text-[15px] md:text-[18px] font-bold text-[#2C2028] mb-5">
            대표변호사 + 전문변호사 + 전문실장 + 전문직원의 조합으로 최상의 결과를 도출합니다
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {["초기 상담", "전략 수립", "소송 진행", "결과 도출"].map((title, i) => {
              const descs = [
                "대표변호사 직접\n사건 상담 및 분석",
                "맞춤 팀 구성과\n소송 전략 설계",
                "전문변호사 배정\n실시간 진행 보고",
                "체계적 변론과\n최상의 결과 확보",
              ];
              return (
                <div key={i} className="relative border border-gray-200 bg-white px-4 py-5 md:py-6 text-center">
                  <p className="text-[12px] font-bold text-[#9B2335] mb-2">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="text-[15px] md:text-[16px] font-semibold text-[#2C2028] mb-1">{title}</p>
                  <p className="text-[12px] md:text-[13px] text-[#555555] leading-[1.7] whitespace-pre-line">{descs[i]}</p>
                  {i < 3 && (
                    <div className="hidden md:block absolute right-[-8px] top-1/2 -translate-y-1/2 text-[10px] text-gray-300 z-10">→</div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Aftercare */}
          <div className="border-t border-gray-200 mt-10 md:mt-14 pt-6 md:pt-8">
            <p className="text-[15px] md:text-[18px] font-bold text-[#2C2028] mb-2">사건 종료 후에도 함께합니다</p>
            <p className="text-[15px] md:text-[18px] text-[#333333] leading-[1.9]">
              의뢰인의 만족이 곧 신세계로의 만족입니다.
              <span className="text-[#9B2335] font-semibold"> 사건종료 3개월 후</span> 의뢰인의 상황을 살펴드리며 끝까지 함께하는 법무법인 신세계로입니다.
            </p>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════
          Section 6: 6-Step Operations Flow
      ══════════════════════════════════════════ */}
      <section className="bg-[#F8F4EE] py-8 md:py-20" data-reveal>
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10">
          <div className="w-8 md:w-10 h-[2px] bg-[#9B2335] mb-4 md:mb-5" />
          <p className="text-[11px] md:text-[12px] tracking-[0.3em] text-[#C9A84C] uppercase font-bold mb-3">
            Workflow
          </p>
          <h3
            className="text-[20px] md:text-[38px] font-bold text-[#2C2028] leading-[1.35] tracking-tight mb-3"
            style={{ wordBreak: "keep-all" as const }}
          >
            사건 <span className="text-[#9B2335]">처리 프로세스</span>
          </h3>
          <p className="text-[15px] md:text-[21px] text-[#333333] leading-[1.9] max-w-[800px] mb-8 md:mb-12">
            접수부터 마무리까지, 체계적인 프로세스로 사건을 관리합니다.
          </p>

          {/* Desktop: horizontal flow */}
          <div className="hidden md:flex items-stretch justify-between gap-0">
            {system.flow.map((step, i) => (
              <div key={i} className="flex items-center flex-1">
                <div className={`flex-1 py-5 px-4 text-center border bg-white ${
                  i === system.flow.length - 1
                    ? "border-[#9B2335] text-[#9B2335]"
                    : "border-gray-200 text-[#2C2028]"
                }`}>
                  <p className="text-[11px] text-[#999999] tracking-wide mb-1">{String(i + 1).padStart(2, "0")}</p>
                  <p className="text-[16px] font-semibold">{step}</p>
                </div>
                {i < system.flow.length - 1 && (
                  <span className="w-5 text-center text-[11px] text-gray-300 flex-shrink-0">→</span>
                )}
              </div>
            ))}
          </div>

          {/* Mobile: 2-col compact grid */}
          <div className="grid md:hidden grid-cols-3 gap-2">
            {system.flow.map((step, i) => (
              <div key={i} className={`py-3 px-2 text-center border ${
                i === system.flow.length - 1
                  ? "border-[#9B2335] text-[#9B2335] bg-white"
                  : "border-gray-200 text-[#2C2028] bg-white"
              }`}>
                <p className="text-[9px] text-[#999999] tracking-wide mb-0.5">{String(i + 1).padStart(2, "0")}</p>
                <p className="text-[13px] font-semibold">{step}</p>
              </div>
            ))}
          </div>

          {/* Operations details */}
          <div className="mt-10 md:mt-14">
            <p className="text-[15px] md:text-[18px] font-bold text-[#2C2028] mb-5">팀 운영방안</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {system.operations.map((op, i) => (
                <div key={i} className="flex items-start gap-3 bg-white py-4 px-5 border border-gray-200">
                  <span className="text-[12px] font-bold text-[#9B2335] mt-0.5 flex-shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[14px] md:text-[16px] text-[#333333] leading-[1.9]">{op}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════
          Section 7: 7개 전문팀
      ══════════════════════════════════════════ */}
      <section className="bg-white py-8 md:py-20" data-reveal>
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10">
          <div className="w-8 md:w-10 h-[2px] bg-[#9B2335] mb-4 md:mb-5" />
          <p className="text-[11px] md:text-[12px] tracking-[0.3em] text-[#C9A84C] uppercase font-bold mb-3">
            Specialized Teams
          </p>
          <h3
            className="text-[20px] md:text-[38px] font-bold text-[#2C2028] leading-[1.35] tracking-tight mb-2"
            style={{ wordBreak: "keep-all" as const }}
          >
            신세계로는 <span className="text-[#9B2335]">7개의 전문팀</span>이 전략적으로 움직입니다.
          </h3>
          <p className="text-[15px] md:text-[21px] text-[#333333] leading-[1.9] max-w-[800px] mb-10 md:mb-14">
            이혼소송, 하나로는 부족합니다.<br />
            쟁점별 전담팀이 있는 시스템 로펌, 신세계로.
          </p>

          {/* Teams grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {teams.map((team, i) => {
              const leaderPhoto = getLeaderPhoto(team.leaderId);
              return (
                <Link
                  key={team.slug}
                  href={`/about/teams/${team.slug}`}
                  className={`block border border-gray-200 bg-white p-5 md:p-6 hover:border-[#9B2335]/30 transition-colors duration-300 ${
                    i === teams.length - 1 && teams.length % 2 !== 0 ? "md:col-span-2 md:max-w-[50%]" : ""
                  }`}
                  data-reveal
                >
                  <div className="flex items-start gap-4">
                    {/* Leader photo */}
                    {leaderPhoto && (
                      <div className="relative w-14 h-14 md:w-16 md:h-16 flex-shrink-0 bg-[#F0EBE4] overflow-hidden">
                        <Image
                          src={leaderPhoto}
                          alt={`${team.leader} 변호사`}
                          fill
                          className="object-cover object-top"
                          sizes="64px"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[11px] font-bold text-[#9B2335]">{String(i + 1).padStart(2, "0")}</span>
                        <p className="text-[17px] md:text-[19px] font-bold text-[#2C2028]">{team.name}</p>
                      </div>
                      <p className="text-[12px] md:text-[13px] text-[#888888] mb-2">팀장 {team.leader} 변호사</p>
                      <p className="text-[14px] md:text-[15px] text-[#333333] leading-[1.7] line-clamp-2">{team.tagline}</p>
                    </div>
                  </div>

                  {/* Specialties */}
                  <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-gray-100">
                    {team.specialties.slice(0, 3).map((s, si) => (
                      <span key={si} className="text-[11px] md:text-[12px] py-[2px] px-2 bg-[#F8F4EE] text-[#555555]">
                        {s.length > 14 ? s.slice(0, 14) + "…" : s}
                      </span>
                    ))}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════
          Section 8: Quote Band 2
      ══════════════════════════════════════════ */}
      <div className="bg-[#F8F4EE] py-10 md:py-14" data-reveal>
        <div className="max-w-[560px] md:max-w-[900px] mx-auto px-8 md:px-10 text-center">
          <div className="w-8 h-[1px] bg-[#C9A84C] mx-auto mb-5 md:mb-7" />
          <p
            className="text-[15px] md:text-[24px] text-[#2C2028] font-bold leading-[2] md:leading-[1.8]"
            style={{ wordBreak: "keep-all" as const }}
          >
            22년의 깊이에서 나오는 차별성,<br />
            그것은 쉽게 따라올 수 없는 전문성입니다.
          </p>
          <div className="w-8 h-[1px] bg-[#C9A84C] mx-auto mt-5 md:mt-7" />
        </div>
      </div>


      {/* ══════════════════════════════════════════
          Section 9: 전문분야 인증 변호사
      ══════════════════════════════════════════ */}
      <section className="bg-white py-8 md:py-20" data-reveal>
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10">
          <div className="w-8 md:w-10 h-[2px] bg-[#9B2335] mb-4 md:mb-5" />
          <p className="text-[11px] md:text-[12px] tracking-[0.3em] text-[#C9A84C] uppercase font-bold mb-3">
            Certified Attorneys
          </p>
          <h3
            className="text-[20px] md:text-[38px] font-bold text-[#2C2028] leading-[1.35] tracking-tight mb-2"
            style={{ wordBreak: "keep-all" as const }}
          >
            한 분야만 20년 이상, <span className="text-[#9B2335]">깊이</span>가 다릅니다.
          </h3>
          <p className="text-[15px] md:text-[21px] text-[#333333] leading-[1.9] max-w-[800px] mb-8 md:mb-12">
            대한변호사협회에 전문분야 등록을 마친 변호사진입니다.<br />
            이혼·가사·상속 분야에서 검증된 전문성을 보유하고 있습니다.
          </p>

          {/* Certified lawyers grid */}
          <div className="grid grid-cols-3 md:grid-cols-4 gap-3 md:gap-5">
            {certifiedLawyers.map((lawyer, i) => (
              <div key={i} className="border border-gray-200 bg-white p-3 md:p-5" data-reveal>
                <div className="relative w-full aspect-square md:aspect-[3/4] bg-[#F0EBE4] overflow-hidden mb-2 md:mb-3">
                  <Image
                    src={lawyer.profileImage}
                    alt={`${lawyer.name} 변호사`}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
                <p className="text-[15px] md:text-[17px] font-bold text-[#2C2028]">{lawyer.name}</p>
                <p className="text-[12px] md:text-[13px] text-[#888888] mt-0.5">{lawyer.position}</p>
                <p className="text-[12px] md:text-[13px] text-[#9B2335] font-semibold mt-1.5">
                  {lawyer.specialty} 전문
                </p>
              </div>
            ))}
          </div>

          {/* Certificate gallery hint */}
          <div className="mt-8 md:mt-10 pt-6 border-t border-gray-200">
            <p className="text-[13px] md:text-[15px] text-[#333333] font-semibold mb-1">전문분야 등록증서</p>
            <p className="text-[12px] md:text-[14px] text-[#888888] leading-[1.7] mb-4">
              대한변호사협회 전문분야 등록 — 이혼, 가사법, 상속, 가족법
            </p>
            <div className="flex gap-3 md:gap-4">
              {["/images/ihon-site/certificates/certificate_10.webp", "/images/ihon-site/certificates/certificate_01.webp", "/images/ihon-site/certificates/certificate_03.webp"].map((src, i) => (
                <div key={i} className="relative w-[70px] md:w-[90px] aspect-[3/4] bg-[#F0EBE4] overflow-hidden border border-gray-100">
                  <Image
                    src={src}
                    alt="전문분야 등록증서"
                    fill
                    className="object-cover"
                    sizes="90px"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════
          Section 10: 언론이 인정한 전문성
      ══════════════════════════════════════════ */}
      <section className="bg-[#F8F4EE] py-8 md:py-20" data-reveal>
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10">
          <div className="w-8 md:w-10 h-[2px] bg-[#9B2335] mb-4 md:mb-5" />
          <p className="text-[11px] md:text-[12px] tracking-[0.3em] text-[#C9A84C] uppercase font-bold mb-3">
            Media Recognition
          </p>
          <h3
            className="text-[20px] md:text-[38px] font-bold text-[#2C2028] leading-[1.35] tracking-tight mb-3"
            style={{ wordBreak: "keep-all" as const }}
          >
            신세계로의 전문성, <span className="text-[#9B2335]">언론이 먼저</span> 인정했습니다.
          </h3>
          <p className="text-[15px] md:text-[21px] text-[#333333] leading-[1.9] max-w-[800px] mb-8 md:mb-10">
            KBS, MBC, SBS, JTBC 출연에 이어,<br />
            YTN 라디오 &quot;조인섭 변호사의 상담소&quot; 진행 등<br />
            전문분야에 대해 본인 이름을 걸고 프로그램을 진행하는 변호사입니다.
          </p>

          {/* Media logos */}
          <div className="flex items-center gap-4 md:gap-8 flex-wrap mb-8 md:mb-10">
            {["kbs", "sbs", "mbc", "jtbc", "ytn_radio"].map((name) => (
              <Image
                key={name}
                src={`/images/system/${name}.png`}
                alt={name.toUpperCase()}
                width={68}
                height={24}
                className="h-4 md:h-6 w-auto opacity-40 grayscale"
              />
            ))}
          </div>

          {/* Recognition items */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {[
              {
                year: "2016",
                title: "대한변협 가족법 전문 제1호",
                desc: "대한변호사협회 전문변호사 제도 강화 후, 엄격한 심사를 거쳐 제1호 가족법 전문변호사로 등록되었습니다.",
              },
              {
                year: "2012",
                title: "조두순 사건 국가배상 승소",
                desc: "법의 정의를 실현한 대표 사건으로, 사회적으로 큰 반향을 일으켰습니다.",
              },
              {
                year: "2012",
                title: "여성가족부 장관 표창",
                desc: "가정폭력 피해자 보호와 권리 옹호에 기여한 공로로 여성가족부 장관 표창을 수상하였습니다.",
              },
            ].map((item, i) => (
              <div key={i} className="bg-white border border-gray-200 p-5 md:p-6">
                <p className="text-[12px] font-bold text-[#C9A84C] mb-2">{item.year}</p>
                <p className="text-[15px] md:text-[17px] font-bold text-[#2C2028] mb-2">{item.title}</p>
                <p className="text-[13px] md:text-[14px] text-[#555555] leading-[1.8]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════
          Section 11: CTA
      ══════════════════════════════════════════ */}
      <section className="bg-white py-8 md:py-20" data-reveal>
        <div className="max-w-[600px] mx-auto px-5 text-center">
          <div className="w-8 h-[1px] bg-[#C9A84C] mx-auto mb-6" />
          <p
            className="text-[18px] md:text-[28px] font-bold text-[#2C2028] leading-[1.6] mb-4"
            style={{ wordBreak: "keep-all" as const }}
          >
            이혼은 다시 행복할 권리입니다.
          </p>
          <p className="text-[14px] md:text-[16px] text-[#888888] leading-[1.8] mb-8">
            오직 의뢰인을 위해 최선을 다합니다.<br />
            대한변협등록 가족법전문변호사 조인섭 변호사가 당신의 권리를 위해 함께 합니다.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/consultation/board"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-[#2C2028] text-white text-[15px] font-bold hover:bg-[#1a1218] transition-colors"
            >
              무료 상담 신청
            </Link>
            <a
              href="tel:1555-5961"
              className="inline-flex items-center justify-center px-8 py-3.5 border border-gray-300 text-[15px] font-semibold text-[#2C2028] hover:border-[#2C2028] transition-colors"
              aria-label="대표번호 1555-5961로 전화하기"
            >
              1555-5961
            </a>
          </div>
          <div className="w-8 h-[1px] bg-[#C9A84C] mx-auto mt-8" />
        </div>
      </section>

    </div>
  );
}
