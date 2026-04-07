"use client";

import { Scale, Users, Trophy, Briefcase } from "lucide-react";
import { useCountUp } from "@/lib/hooks";
import ScrollReveal from "@/components/ScrollReveal";

const stats = [
  { icon: Scale, value: 52, suffix: "년", label: "법조 전통" },
  { icon: Users, value: 22, suffix: "인", label: "전문 변호사" },
  { icon: Trophy, value: 1053, suffix: "건", label: "누적 승소사례" },
  { icon: Briefcase, value: 7, suffix: "개", label: "전문팀 운영" },
];

function StatItem({ icon: Icon, value, suffix, label, delay }: (typeof stats)[number] & { delay: number }) {
  const { count, ref } = useCountUp(value, 2000);
  return (
    <ScrollReveal delay={delay} y={40}>
      <div className="text-center">
        {/* Icon */}
        <div className="flex justify-center mb-2 md:mb-3">
          <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-burgundy-50 flex items-center justify-center">
            <Icon size={20} strokeWidth={1.3} className="text-burgundy-500 md:!w-[26px] md:!h-[26px]" />
          </div>
        </div>

        {/* Number */}
        <p
          ref={ref as React.RefObject<HTMLParagraphElement>}
          className="text-[32px] md:text-[44px] lg:text-[52px] font-bold text-[#2C2028] leading-none tracking-tight mb-1.5 md:mb-2"
        >
          {count.toLocaleString()}
          <span className="text-[16px] md:text-[19px] font-semibold text-burgundy-500 ml-0.5">{suffix}</span>
        </p>

        {/* Label */}
        <p className="text-[13px] md:text-[15px] text-[#666666] tracking-wide font-semibold">{label}</p>
      </div>
    </ScrollReveal>
  );
}

export default function TrustIndicators() {
  return (
    <section id="trust" className="relative z-20 bg-white py-10 md:py-20 lg:py-24 border-b border-gray-100">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-6">
          {stats.map((stat, i) => (
            <div key={stat.label} className="relative">
              <StatItem {...stat} delay={i * 150} />
              {i < stats.length - 1 && (
                <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-16 bg-gray-200" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
