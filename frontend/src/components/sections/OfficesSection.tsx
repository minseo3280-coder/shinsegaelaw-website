"use client";

import Link from "next/link";
import { MapPin, Phone, ChevronRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import firmData from "@/../../data/firm_info.json";

export default function OfficesSection() {
  return (
    <section id="offices" className="hidden lg:block relative bg-[#F8F4EE] py-24 md:py-32 lg:py-40 overflow-hidden">
      {/* Subtle decorative elements */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#9B2335]/10 to-transparent" />
      <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-[#9B2335]/[0.02] blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-[#C9A84C]/[0.03] blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-16 md:mb-20">
            <p className="text-[14px] md:text-[15px] tracking-[0.3em] text-[#9B2335]/50 font-bold uppercase mb-5">
              Our Offices
            </p>
            <h2
              className="text-[26px] md:text-[56px] lg:text-[68px] font-bold text-[#2C2028] leading-[1.2] tracking-tight mb-5"
              style={{ wordBreak: "keep-all" }}
            >
              전국 <span className="text-[#9B2335]">3개</span> 사무소,<br />
              어디서든 동일한 전문 서비스.
            </h2>
            <div className="w-12 h-[2px] bg-[#C9A84C] mx-auto mb-5" />
            <p className="text-[15px] md:text-[17px] text-[#444444] max-w-md mx-auto leading-relaxed">
              서울·대전·수원, 가까운 사무소에서<br className="md:hidden" />
              동일한 전문팀이 함께합니다.
            </p>
          </div>
        </ScrollReveal>

        {/* Office Cards */}
        <ScrollReveal delay={150}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 lg:gap-7">
            {firmData.offices.map((office, i) => (
              <Link
                key={office.name}
                href="/about/location"
                aria-label={`${office.name} 오시는 길`}
                className="group relative bg-white rounded-2xl border border-gray-200/60 hover:border-[#9B2335]/15 hover:shadow-[0_8px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 transition-all duration-500 overflow-hidden"
              >
                {/* Top accent line */}
                <div className={`h-[3px] transition-all duration-500 ${
                  i === 0
                    ? "bg-gradient-to-r from-[#9B2335] to-[#C9A84C]"
                    : "bg-gradient-to-r from-gray-200 to-gray-100 group-hover:from-[#9B2335]/60 group-hover:to-[#C9A84C]/40"
                }`} />

                <div className="p-8 md:p-9 lg:p-10">
                  {/* Badge */}
                  {i === 0 ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#9B2335]/[0.07] text-[#9B2335] text-[15px] font-bold tracking-[0.12em] uppercase mb-5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#9B2335]" />
                      Headquarters
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-[#444444] text-[15px] font-bold tracking-[0.12em] uppercase mb-5">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                      Branch
                    </span>
                  )}

                  {/* Office name */}
                  <h3 className="text-[22px] md:text-[24px] font-bold text-[#2C2028] mb-6 tracking-tight">
                    {office.name}
                  </h3>

                  {/* Phone */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      i === 0 ? "bg-[#9B2335]/[0.07]" : "bg-[#F8F4EE]"
                    }`}>
                      <Phone size={18} className={i === 0 ? "text-[#9B2335]" : "text-[#444444]"} />
                    </div>
                    <p className={`text-[24px] md:text-[26px] lg:text-[28px] font-bold tracking-tight transition-colors duration-300 ${
                      i === 0
                        ? "text-[#9B2335] group-hover:text-[#852030]"
                        : "text-[#2C2028] group-hover:text-[#9B2335]"
                    }`}>
                      {office.phone}
                    </p>
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#F8F4EE] flex items-center justify-center flex-shrink-0">
                      <MapPin size={18} className="text-[#444444]" />
                    </div>
                    <p className="text-[14px] md:text-[15px] text-[#444444] leading-[1.7] pt-2.5">
                      {office.address}
                    </p>
                  </div>

                  {/* View more link */}
                  <div className="mt-7 pt-5 border-t border-gray-100">
                    <span className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#9B2335]/60 group-hover:text-[#9B2335] transition-colors duration-300">
                      오시는 길 보기
                      <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-300" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </ScrollReveal>

        {/* Bottom representative number */}
        <ScrollReveal delay={300}>
          <div className="text-center mt-14 md:mt-18">
            <p className="text-[15px] text-[#444444] mb-2">대표전화</p>
            <a
              href={`tel:${firmData.main_phone}`}
              aria-label={`대표전화 ${firmData.main_phone}`}
              className="text-[28px] md:text-[34px] font-bold text-[#2C2028] tracking-tight hover:text-[#9B2335] transition-colors duration-300"
            >
              {firmData.main_phone}
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
