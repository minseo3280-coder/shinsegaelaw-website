"use client";

import { Scale, Shield, Gavel, Landmark } from "lucide-react";
import ScrollReveal, { StaggerContainer } from "@/components/ScrollReveal";
import practiceData from "@/../../data/practice_areas.json";

const iconMap: Record<string, React.ElementType> = {
  gavel: Gavel,
  shield: Shield,
  "balance-scale": Scale,
  landmark: Landmark,
};

export default function PracticeAreas() {
  const areas = practiceData.practice_areas;

  return (
    <section id="practice" className="py-20 md:py-28 lg:py-36 bg-white">
      <div className="max-w-[1600px] mx-auto px-5 md:px-8 lg:px-10">
        {/* Header */}
        <ScrollReveal className="mb-16 md:mb-20">
          <p className="text-xs tracking-[0.3em] text-burgundy-500 font-semibold uppercase mb-4">
            Practice Areas
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-navy-900 mb-5 tracking-tight">
            전문 분야
          </h2>
          <div className="w-12 h-1 bg-gold-500 mb-6" />
          <p className="text-base md:text-lg text-[#444444] max-w-lg leading-relaxed">
            7개 전문팀이 전략적으로 움직입니다.
            <br />
            가족법 특화 20년, 이혼의 모든 것을 다룹니다.
          </p>
        </ScrollReveal>

        {/* Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8" interval={150}>
          {areas.map((area) => {
            const Icon = iconMap[area.icon] || Scale;
            return (
              <div
                key={area.id}
                className="group relative p-8 md:p-10 rounded-2xl border border-gray-100 bg-white hover:bg-burgundy-50/30 transition-colors duration-500 cursor-pointer overflow-hidden"
              >
                {/* Top border slide */}
                <div className="absolute top-0 left-0 h-[3px] w-0 bg-burgundy-500 group-hover:w-full transition-all duration-500" />

                <div className="w-14 h-14 rounded-xl bg-burgundy-100 p-4 flex items-center justify-center mb-7 group-hover:bg-burgundy-500 transition-colors duration-500">
                  <Icon className="w-6 h-6 text-burgundy-500 group-hover:text-white transition-colors duration-500" />
                </div>

                <h3 className="text-xl font-bold text-navy-900 mb-3 tracking-tight">
                  {area.name}
                </h3>

                <p className="text-sm text-[#444444] leading-relaxed mb-7 line-clamp-2">
                  {area.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {area.subcategories.slice(0, 5).map((sub) => (
                    <span
                      key={sub.name}
                      className="text-xs px-3 py-1 rounded-full bg-burgundy-50 text-burgundy-700 font-semibold"
                    >
                      {sub.name}
                    </span>
                  ))}
                </div>

                {/* Hover Arrow */}
                <div className="absolute top-8 right-8 md:top-10 md:right-10 w-9 h-9 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 bg-burgundy-500">
                  <svg
                    className="w-3.5 h-3.5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </div>
              </div>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
