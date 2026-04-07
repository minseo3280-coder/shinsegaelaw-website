"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  ArrowRight,
  CheckCircle2,
  Briefcase,
  GraduationCap,
} from "lucide-react";
import SubPageHero from "@/components/shared/SubPageHero";
import teamsData from "@/../../data/teams.json";
import lawyersData from "@/../../data/lawyers.json";
import firmData from "@/../../data/firm_info.json";
import LawyerTabs from "@/components/shared/LawyerTabs";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface TeamCase {
  title: string;
  desc?: string;
  result: string;
  caseNo?: string;
  details?: string[];
}

interface ProcessStep {
  name: string;
  desc: string;
}

interface TeamCta {
  headline: string;
  description: string;
}

interface Team {
  slug: string;
  name: string;
  leaderId: number;
  leader: string;
  leaderPosition: string;
  tagline: string;
  shortDesc: string;
  quote?: string;
  description: string[];
  specialties: string[];
  process?: (string | ProcessStep)[];
  leaderCredentials: string[];
  cases: TeamCase[];
  cta?: TeamCta;
}

const SLUG_TO_TAB: Record<string, number> = {
  "divorce-general": 1,
  property: 2,
  alimony: 3,
  custody: 4,
  "family-relations": 5,
  criminal: 6,
  applications: 7,
};

const SLUG_TO_LABEL: Record<string, string> = {
  "divorce-general": "CENTRAL STRATEGY TEAM",
  property: "PROPERTY DIVISION TEAM",
  alimony: "ALIMONY TEAM",
  custody: "CHILD CUSTODY TEAM",
  "family-relations": "FAMILY RELATIONS TEAM",
  criminal: "CRIMINAL DEFENSE TEAM",
  applications: "COURT APPLICATIONS TEAM",
};

const SLUG_TO_HEADLINE: Record<string, [string, string, string, string]> = {
  "divorce-general": ["전략의 차이가", "판결의 차이", "를 만듭니다.", ""],
  property: ["숨겨진 재산도", "끝까지", " 추적합니다.", ""],
  alimony: ["정확한 산정이", "정당한 권리", "를 지킵니다.", ""],
  custody: ["아이의 행복이", "최우선", "입니다.", ""],
  "family-relations": ["가족의 진실을", "법으로", " 밝혀냅니다.", ""],
  criminal: ["형사 리스크를", "전략적으로", " 차단합니다.", ""],
  applications: ["신속한 신청이", "권리를", " 보전합니다.", ""],
};

export default function TeamDetailClient({ slug }: { slug: string }) {
  const revealRef = useScrollReveal();

  const team = (teamsData.teams as Team[]).find((t) => t.slug === slug);
  const tabIndex = SLUG_TO_TAB[slug] ?? 1;

  const leader = lawyersData.lawyers.find(
    (l) => l.id === team?.leaderId
  ) as (typeof lawyersData.lawyers)[number] & {
    label?: string;
    nameEn?: string;
    name_en?: string;
    education?: ({ year?: string; text?: string } | string)[];
  };

  if (!team) {
    return (
      <div className="max-w-[1600px] mx-auto px-5 md:px-8 lg:px-10 py-20 text-center">
        <p className="text-[18px] font-bold text-gray-900 mb-4">팀 정보를 찾을 수 없습니다.</p>
        <Link href="/about/lawyers" className="text-[15px] text-[#9B2335]">&larr; 변호사 목록으로</Link>
      </div>
    );
  }

  const allTeams = teamsData.teams as Team[];
  const otherTeams = allTeams.filter((t) => t.slug !== slug);
  const engLabel = SLUG_TO_LABEL[slug] || "SPECIALIZED TEAM";
  const [headline1, hl2burgundy, hl2after] = SLUG_TO_HEADLINE[slug] || [team.name, "최선의 결과", "를 만듭니다.", ""];
  const educationItems = (leader?.education || []) as (string | { year?: string; text?: string })[];

  return (
    <div ref={revealRef} className="">
      <SubPageHero
        titleEn={engLabel}
        titleKo={team.name}
        bannerImage="/images/office/banner-about.jpg"
        breadcrumbs={[{ label: "구성원", href: "/about/lawyers" }, { label: "전문팀", href: "/about/teams/divorce-general" }, { label: team.name }]}
      />

      <LawyerTabs activeTab={tabIndex} />

      {/* 1. HERO HEADLINE */}
      <section className="bg-white py-8 md:py-28" data-reveal>
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10">
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <div className="w-10 h-[2px] bg-burgundy-500" />
            <p className="text-[12px] md:text-[14px] tracking-[0.3em] uppercase font-bold text-burgundy-500">
              {engLabel}
            </p>
          </div>
          <h2 className="font-sans text-[22px] md:text-[42px] lg:text-[48px] leading-[1.3] font-bold text-[#2C2028] mb-4 md:mb-6">
            {headline1}
            <br />
            <span className="text-burgundy-500">{hl2burgundy}</span>{hl2after}
          </h2>
          <div className="max-w-[680px]">
            <p className="text-[16px] md:text-[19px] text-[#333333] leading-[1.9] mb-2" style={{ wordBreak: "keep-all" }}>
              {team.description[0]}
            </p>
            {team.description[1] && (
              <p className="text-[16px] md:text-[18px] text-[#333333] leading-[1.9]" style={{ wordBreak: "keep-all" }}>
                {team.description[1]}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* 2. TEAM LEADER */}
      {leader && (
        <section className="bg-[#F8F4EE] py-8 md:py-24" data-reveal>
          <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10">
            <div className="grid grid-cols-1 md:grid-cols-[360px_1fr] lg:grid-cols-[420px_1fr] gap-8 md:gap-14">
              <div className="relative aspect-[3/4] max-h-[320px] md:max-h-none rounded-2xl overflow-hidden bg-[#ECEAE6]">
                {leader.profile_image ? (
                  <Image
                    src={leader.profile_image}
                    alt={`${leader.name} ${team.leaderPosition}`}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 420px"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-[64px] text-[#C9A84C]/20">{leader.name.charAt(0)}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-col justify-center">
                <p className="text-[13px] md:text-[14px] text-[#9B2335] font-bold tracking-[0.15em] uppercase mb-2 md:mb-3">
                  {team.name.replace("팀", "")} 팀장 / 파트너 변호사
                </p>

                <h3 className="text-[24px] md:text-[46px] font-bold text-[#1A1A1A] leading-[1.1] mb-1 font-sans">
                  {leader.name}
                  {(leader.name_en || leader.nameEn) && (
                    <span className="text-[15px] md:text-[19px] font-medium text-[#333333] ml-2 md:ml-3">
                      {leader.name_en || leader.nameEn}
                    </span>
                  )}
                </h3>

                {leader.specialty && (
                  <div className="flex flex-wrap gap-1.5 md:gap-2 mt-3 md:mt-4 mb-4 md:mb-6">
                    {leader.specialty.map((s: string, i: number) => (
                      <span
                        key={i}
                        className="px-3 md:px-4 py-1 md:py-1.5 text-[14px] md:text-[15px] text-[#9B2335] border border-[#9B2335]/20 rounded-full font-semibold"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}

                <p
                  className="text-[15px] md:text-[17px] text-[#9B2335] leading-[1.9] mb-6 md:mb-8 italic"
                  style={{ wordBreak: "keep-all" }}
                >
                  &ldquo;{team.quote || team.tagline}&rdquo;
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-6 md:mb-8">
                  {educationItems.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-2 md:mb-3">
                        <GraduationCap size={16} className="text-[#2C2028]" />
                        <span className="text-[16px] md:text-[17px] font-bold text-[#1A1A1A]">학력 및 자격</span>
                      </div>
                      <div className="space-y-1.5 md:space-y-2">
                        {educationItems.slice(0, 3).map((item, i) => (
                          <p key={i} className="text-[15px] md:text-[16px] text-[#333333] leading-[1.7]">
                            {typeof item === "string" ? item : item.text || ""}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                  <div>
                    <div className="flex items-center gap-2 mb-2 md:mb-3">
                      <Briefcase size={16} className="text-[#2C2028]" />
                      <span className="text-[16px] md:text-[17px] font-bold text-[#1A1A1A]">주요 경력</span>
                    </div>
                    <div className="space-y-1.5 md:space-y-2">
                      {team.leaderCredentials.map((cred, i) => (
                        <p key={i} className="text-[15px] md:text-[16px] text-[#333333] leading-[1.7]">
                          {cred}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 md:gap-3">
                  <Link
                    href="/consultation"
                    className="px-5 md:px-7 py-2.5 md:py-3 bg-[#9B2335] text-white text-[14px] md:text-[15px] font-bold rounded-lg hover:bg-[#7B2D3B] transition-colors"
                  >
                    1:1 상담 예약
                  </Link>
                  <Link
                    href={`/about/lawyers/${leader.name}`}
                    className="px-5 md:px-7 py-2.5 md:py-3 border border-[#D5CFC8] text-[#2C2028] text-[14px] md:text-[15px] font-bold rounded-lg hover:border-[#9B2335]/30 hover:text-[#9B2335] transition-all"
                  >
                    프로필 보기
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. QUOTE BAND */}
      <section className="bg-[#FAFAF8] py-8 md:py-24" data-reveal>
        <div className="max-w-[900px] mx-auto px-5 md:px-8 lg:px-10 text-center">
          <div className="text-[40px] md:text-[56px] text-[#9B2335]/15 leading-none mb-3 md:mb-4">&ldquo;</div>
          <p
            className="text-[17px] md:text-[24px] text-[#2C2028] leading-[1.9] mb-4 md:mb-6"
            style={{ wordBreak: "keep-all" }}
          >
            {team.quote
              ? `"${team.quote}"`
              : `"${team.name}의 존재 이유는 단 하나입니다. 의뢰인이 가장 불안한 순간, 가장 체계적인 전략으로 함께하는 것입니다."`}
          </p>
          <p className="text-[15px] md:text-[17px] text-[#333333] leading-[1.8] max-w-[600px] mx-auto" style={{ wordBreak: "keep-all" }}>
            {team.shortDesc}
          </p>
        </div>
      </section>

      {/* 4. CORE EXPERTISE */}
      <section className="bg-white py-8 md:py-24" data-reveal>
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10">
          <p className="text-[12px] md:text-[13px] text-[#9B2335] font-bold tracking-[0.2em] uppercase text-center mb-2 md:mb-3">
            OUR CORE EXPERTISE
          </p>
          <h2 className="text-[22px] md:text-[36px] font-bold text-[#1A1A1A] text-center mb-8 md:mb-12 font-sans">
            {team.name.replace("팀", "")}의 {team.specialties.length}대 전문 역량
          </h2>

          <div className={`grid grid-cols-2 md:grid-cols-3 ${team.specialties.length >= 5 ? "lg:grid-cols-5" : team.specialties.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"} gap-3 md:gap-4`}>
            {team.specialties.map((spec, i) => (
              <div
                key={i}
                data-step={i}
                className="bg-[#FAFAF8] rounded-xl p-4 md:p-6 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 group border border-[#F0EDE8]"
              >
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg border border-[#E8E4DE] flex items-center justify-center mb-3 md:mb-5 mx-auto group-hover:border-[#9B2335]/30 group-hover:bg-[#9B2335]/5 transition-all">
                  <span className="text-[13px] md:text-[15px] font-bold text-[#9B2335]">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h4 className="text-[14px] md:text-[18px] font-bold text-[#1A1A1A] leading-[1.5] text-center font-sans" style={{ wordBreak: "keep-all" }}>
                  {spec}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PROCESS */}
      {team.process && team.process.length > 0 && (
        <section className="bg-[#F8F4EE] py-8 md:py-24" data-reveal>
          <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10">
            <p className="text-[12px] md:text-[13px] text-[#9B2335] font-bold tracking-[0.2em] uppercase text-center mb-2 md:mb-3">
              STRATEGIC SYSTEM
            </p>
            <h2 className="text-[22px] md:text-[36px] font-bold text-[#1A1A1A] text-center mb-8 md:mb-12 font-sans">
              {team.name.replace("팀", "")}만의 {team.process.length}단계 밀착 시스템
            </h2>

            <div className={`grid grid-cols-2 md:grid-cols-3 ${team.process.length >= 5 ? "lg:grid-cols-5" : team.process.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"} gap-4 md:gap-5`}>
              {team.process.map((step, i) => {
                const stepName = typeof step === "string" ? step : step.name;
                const stepDesc = typeof step === "string" ? "" : step.desc;
                return (
                  <div key={i} data-step={i} className="text-center">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-[#9B2335]/20 flex items-center justify-center mx-auto mb-3 md:mb-5 relative">
                      <span className="text-[14px] md:text-[18px] font-bold text-[#9B2335]">{String(i + 1).padStart(2, "0")}</span>
                      {i < (team.process?.length || 0) - 1 && (
                        <div className="hidden lg:block absolute left-full top-1/2 w-[calc(100%-4px)] h-[1px] bg-[#D5CFC8] -translate-y-1/2" style={{ width: "calc(100% - 16px)", marginLeft: "8px" }} />
                      )}
                    </div>
                    <h4 className="text-[15px] md:text-[18px] font-bold text-[#1A1A1A] mb-1 md:mb-2 font-sans" style={{ wordBreak: "keep-all" }}>
                      {stepName}
                    </h4>
                    {stepDesc && (
                      <p className="text-[15px] md:text-[17px] text-[#333333] leading-[1.6]" style={{ wordBreak: "keep-all" }}>
                        {stepDesc}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 6. CASE STUDY */}
      {team.cases.length > 0 && (
        <section className="bg-white py-8 md:py-24" data-reveal>
          <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10">
            <div className="flex items-center justify-between mb-8 md:mb-12">
              <div>
                <p className="text-[12px] md:text-[13px] text-[#9B2335] font-bold tracking-[0.2em] uppercase mb-1 md:mb-2">
                  CASE STUDY
                </p>
                <h2 className="text-[22px] md:text-[36px] font-bold text-[#1A1A1A] font-sans">
                  {team.name.replace("팀", "")}이 만든 결정적 차이
                </h2>
              </div>
              <Link
                href="/cases"
                className="hidden md:inline-flex items-center gap-1.5 text-[15px] text-[#9B2335] font-semibold hover:gap-2.5 transition-all"
              >
                전체 성공사례 보기 <ArrowRight size={15} />
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              {team.cases.slice(0, 4).map((c, i) => (
                <div
                  key={i}
                  data-step={i}
                  className="bg-[#FAFAF8] rounded-2xl overflow-hidden border border-[#E8E4DE] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-300"
                >
                  <div className="p-5 md:p-7 border-b border-[#E8E4DE]">
                    <span className="inline-block px-3 py-1 text-[12px] md:text-[12px] font-bold text-[#9B2335] bg-[#9B2335]/8 rounded-full mb-3 md:mb-4">
                      CASE {String(i + 1).padStart(2, "0")}. {c.title.includes("재산") ? "재산분할" : c.title.includes("양육") || c.title.includes("친권") ? "양육권" : c.title.includes("위자료") || c.title.includes("상간") ? "위자료" : team.name.replace("팀", "")}
                    </span>
                    <h4 className="text-[16px] md:text-[20px] font-bold text-[#1A1A1A] leading-[1.5] mb-3 md:mb-4 font-sans" style={{ wordBreak: "keep-all" }}>
                      {c.title}
                    </h4>

                    {c.desc && (
                      <div className="mb-3">
                        <p className="text-[12px] md:text-[12px] font-bold text-[#333333] tracking-[0.1em] uppercase mb-1">ISSUE</p>
                        <p className="text-[15px] md:text-[17px] text-[#333333] leading-[1.7]" style={{ wordBreak: "keep-all" }}>{c.desc}</p>
                      </div>
                    )}

                    <div className="bg-white rounded-xl px-4 md:px-5 py-3 md:py-4 border border-[#E8E4DE] mt-3 md:mt-4">
                      <p className="text-[12px] md:text-[12px] font-bold text-[#333333] tracking-[0.1em] uppercase mb-1">RESULT</p>
                      <p className="text-[18px] md:text-[22px] font-extrabold text-[#9B2335]">
                        {c.result}
                      </p>
                    </div>
                  </div>

                  {c.details && c.details.length > 0 && (
                    <div className="p-5 md:p-7">
                      <div className="space-y-3 md:space-y-4">
                        {c.details.slice(0, 3).map((detail, j) => (
                          <div key={j} className="flex items-start gap-2 md:gap-3">
                            <span className="text-[12px] md:text-[12px] font-bold text-[#9B2335] tracking-[0.05em] uppercase mt-0.5 flex-shrink-0 w-[70px] md:w-[80px]">
                              STRATEGY {String(j + 1).padStart(2, "0")}
                            </span>
                            <p className="text-[15px] md:text-[17px] text-[#2C2028] font-semibold leading-[1.7] flex-1" style={{ wordBreak: "keep-all" }}>
                              {detail}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="text-center mt-8 md:hidden">
              <Link
                href="/cases"
                className="inline-flex items-center gap-1.5 text-[15px] text-[#9B2335] font-semibold"
              >
                전체 성공사례 보기 <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* 7. CLIENT TESTIMONIAL */}
      <section className="bg-[#F8F4EE] py-8 md:py-24" data-reveal>
        <div className="max-w-[900px] mx-auto px-5 md:px-8 lg:px-10 text-center">
          <div className="text-[40px] md:text-[56px] text-[#C9A84C]/25 leading-none mb-3 md:mb-4">&ldquo;</div>
          <p
            className="text-[16px] md:text-[21px] text-[#2C2028] leading-[2] mb-6 md:mb-8"
            style={{ wordBreak: "keep-all" }}
          >
            &ldquo;{team.quote || `${team.name}의 체계적인 전략 덕분에 어려운 상황에서도 최선의 결과를 얻을 수 있었습니다.`}&rdquo;
          </p>
          <div className="flex items-center justify-center gap-3 md:gap-4">
            <div className="w-8 md:w-10 h-[1px] bg-[#D5CFC8]" />
            <p className="text-[12px] md:text-[14px] text-[#333333] tracking-[0.1em] uppercase font-semibold">
              CLIENT, {team.name.replace("팀", "")} CASE WINNER
            </p>
            <div className="w-8 md:w-10 h-[1px] bg-[#D5CFC8]" />
          </div>
        </div>
      </section>

      {/* 8. OTHER TEAMS */}
      <section className="bg-white py-8 md:py-24" data-reveal>
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10">
          <p className="text-[12px] md:text-[13px] text-[#9B2335] font-bold tracking-[0.2em] uppercase text-center mb-2">
            OTHER TEAMS
          </p>
          <h2 className="text-[22px] md:text-[36px] font-bold text-[#1A1A1A] mb-8 md:mb-10 text-center font-sans">
            다른 전문팀
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {otherTeams.map((t, i) => {
              const otherLeader = lawyersData.lawyers.find(
                (l) => l.id === t.leaderId
              );
              return (
                <Link
                  key={t.slug}
                  href={`/about/teams/${t.slug}`}
                  data-step={i}
                  className="group bg-[#FAFAF8] rounded-xl p-5 md:p-6 border border-[#F0EDE8] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-3 md:mb-4">
                    {otherLeader?.profile_image ? (
                      <div className="relative w-[40px] h-[40px] md:w-[44px] md:h-[44px] rounded-full overflow-hidden flex-shrink-0">
                        <Image
                          src={otherLeader.profile_image}
                          alt={t.leader}
                          fill
                          className="object-cover object-top"
                          sizes="44px"
                        />
                      </div>
                    ) : (
                      <div className="w-[40px] h-[40px] md:w-[44px] md:h-[44px] rounded-full bg-[#ECEAE6] flex items-center justify-center flex-shrink-0">
                        <span className="text-[14px] md:text-[16px] text-[#C9A84C]/40 font-bold">{t.leader.charAt(0)}</span>
                      </div>
                    )}
                    <div>
                      <p className="text-[16px] md:text-[17px] font-bold text-[#1A1A1A] group-hover:text-[#9B2335] transition-colors">
                        {t.name}
                      </p>
                      <p className="text-[13px] text-[#333333]">{t.leader} 팀장</p>
                    </div>
                  </div>
                  <p className="text-[15px] md:text-[16px] text-[#333333] leading-[1.7] line-clamp-2 mb-3 md:mb-4" style={{ wordBreak: "keep-all" }}>
                    {t.shortDesc}
                  </p>
                  <span className="text-[14px] text-[#9B2335] font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    자세히 보기 <ArrowRight size={14} />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 9. CTA */}
      <section className="bg-[#F8F4EE] py-8 md:py-24" data-reveal>
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10">
          <div className="bg-white rounded-2xl p-6 md:p-14 text-center shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
            <h2 className="text-[22px] md:text-[34px] font-bold text-[#1A1A1A] leading-[1.4] mb-3 md:mb-4 font-sans" style={{ wordBreak: "keep-all" }}>
              {team.cta?.headline || `${team.name}에게 지금 상황을 말씀해 주세요.`}
            </h2>
            <p className="text-[16px] md:text-[18px] text-[#333333] mb-6 md:mb-8 max-w-[500px] mx-auto">
              {team.cta?.description || team.shortDesc}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-5 md:mb-6">
              <Link
                href="/consultation"
                className="w-full sm:w-auto text-center px-6 md:px-8 py-3 md:py-3.5 bg-[#9B2335] text-white text-[15px] md:text-[16px] font-bold rounded-xl hover:bg-[#7B2D3B] transition-colors"
              >
                무료 사건 분석 요청
              </Link>
              <a
                href={`tel:${firmData.offices[0].phone}`}
                className="w-full sm:w-auto text-center inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-3.5 border border-[#D5CFC8] text-[#2C2028] text-[15px] md:text-[16px] font-bold rounded-xl hover:border-[#9B2335]/30 hover:text-[#9B2335] transition-all"
                aria-label={`전화 상담 ${firmData.offices[0].phone}`}
              >
                <Phone size={16} />
                {firmData.offices[0].phone}
              </a>
            </div>
            <div className="flex items-center justify-center gap-4 md:gap-6 text-[13px] md:text-[14px] text-[#333333]">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-[#C9A84C]" />
                비밀 보장
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-[#C9A84C]" />
                24시간 접수
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-[#C9A84C]" />
                무료 초기 상담
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
