"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import teamsData from "@/../../data/teams.json";

const teams = teamsData.teams.map((team, idx) => ({
  number: String(idx + 1).padStart(2, "0"),
  name: team.name,
  leader: team.leader,
  slug: team.slug,
  tagline: team.tagline,
}));

export default function TeamsSection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section id="teams" className="py-20 md:py-28 lg:py-36 bg-white">
      <div className="max-w-[1600px] mx-auto px-5 md:px-8 lg:px-10">
        <ScrollReveal>
          {/* Section header */}
          <div className="mb-14 md:mb-20">
            <p className="text-[12px] tracking-[0.25em] text-[#9B2335]/50 font-semibold uppercase mb-4">
              Expert Teams
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] text-[#2C2028] leading-[1.3] font-semibold">
              7개 전문팀이<br className="hidden md:block" />
              전략적으로 움직입니다
            </h2>
          </div>
        </ScrollReveal>

        {/* Team list — accordion style */}
        <div className="border-t border-gray-200">
          {teams.map((team, idx) => (
            <ScrollReveal key={team.slug} delay={idx * 0.06}>
              <Link
                href={`/about/teams/${team.slug}`}
                className="group block border-b border-gray-100 transition-colors duration-200 hover:bg-[#faf9f7]"
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                <div className="flex items-center py-5 md:py-6">
                  {/* Number */}
                  <span
                    className={`text-[14px] md:text-[16px] font-semibold tabular-nums w-[48px] shrink-0 transition-colors duration-200 ${
                      hoveredIdx === idx
                        ? "text-[#9B2335]"
                        : "text-[#9B2335]/40"
                    }`}
                  >
                    {team.number}
                  </span>

                  {/* Team name */}
                  <span
                    className={`text-[16px] md:text-[18px] font-semibold flex-1 transition-colors duration-200 ${
                      hoveredIdx === idx
                        ? "text-[#2C2028]"
                        : "text-[#2C2028]/70"
                    }`}
                  >
                    {team.name}
                  </span>

                  {/* Tagline — visible on hover (desktop) */}
                  <span className="hidden lg:block text-[13px] text-[#444444] mr-6 max-w-[300px] truncate opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {team.tagline}
                  </span>

                  {/* Leader name */}
                  <span className="text-[13px] md:text-[14px] text-[#444444] mr-4 shrink-0">
                    {team.leader}
                  </span>

                  {/* Arrow */}
                  <ChevronRight
                    size={16}
                    className="text-[#1A1A2E]/15 group-hover:text-[#9B2335]/50 group-hover:translate-x-0.5 transition-all duration-200 shrink-0"
                  />
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom link */}
        <ScrollReveal delay={0.5}>
          <div className="mt-10 text-center">
            <Link
              href="/about/lawyers"
              className="inline-flex items-center gap-2 text-[14px] text-[#9B2335]/70 hover:text-[#9B2335] font-semibold transition-colors duration-200"
            >
              전체 구성원 보기
              <ChevronRight size={15} />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
