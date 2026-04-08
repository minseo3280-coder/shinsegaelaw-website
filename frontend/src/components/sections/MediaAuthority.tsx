"use client";

import Link from "next/link";
import { ArrowRight, Tv, Radio, Youtube } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import youtubeData from "@/../../data/youtube.json";

const featuredVideoId = youtubeData.featured_video?.id || "4C5BehULHVQ";

const mediaStats = [
  {
    icon: Tv,
    label: "방송 출연",
    value: "KBS · SBS · MBC · JTBC · YTN",
  },
  {
    icon: Radio,
    label: "YTN 라디오",
    value: "「조인섭 변호사의 상담소」 고정 진행",
  },
  {
    icon: Youtube,
    label: "YouTube",
    value: "2개 채널 · 451편 + 553 Shorts",
  },
];

export default function MediaAuthority() {
  return (
    <section id="media" className="hidden lg:block relative overflow-hidden bg-[#F8F4EE] py-24 md:py-36 lg:py-44">
      <div className="relative z-10 max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-16 items-center">
          {/* Left — YouTube embed */}
          <ScrollReveal>
            <div className="rounded-2xl overflow-hidden bg-black aspect-video relative shadow-[0_20px_60px_-10px_rgba(0,0,0,0.15)]">
              <iframe
                src={`https://www.youtube.com/embed/${featuredVideoId}?rel=0`}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                title="YTN 라디오 조인섭변호사의 상담소"
              />
            </div>
          </ScrollReveal>

          {/* Right — Stats & CTA */}
          <ScrollReveal delay={150}>
            <div>
              {/* Label */}
              <p className="text-[14px] md:text-[15px] tracking-[0.35em] text-gold-500 font-bold uppercase mb-6">
                Media &amp; Press
              </p>

              {/* Headline */}
              <h2
                className="text-[26px] md:text-[56px] lg:text-[68px] font-bold text-[#2C2028] leading-[1.2] tracking-tight mb-10"
                style={{ wordBreak: "keep-all" }}
              >
                <span className="text-gold-500">1,010건</span>의 언론보도,<br />
                <span className="text-gold-500">451편</span>의 영상이<br className="hidden md:inline" />
                증명합니다.
              </h2>

              {/* Stats list */}
              <div className="space-y-5 mb-10">
                {mediaStats.map((stat) => (
                  <div key={stat.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center flex-shrink-0 border border-gray-200 shadow-sm">
                      <stat.icon size={18} className="text-gold-500" />
                    </div>
                    <div>
                      <p className="text-[15px] text-[#8A7E84] font-semibold tracking-wide mb-1">
                        {stat.label}
                      </p>
                      <p className="text-[16px] md:text-[17px] text-[#333333] leading-[1.5]">
                        {stat.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <Link
                href="/media/channel"
                className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 rounded-full bg-burgundy-500 hover:bg-burgundy-600 text-white text-[14px] md:text-[16px] font-bold transition-all duration-300 hover:shadow-[0_8px_30px_rgba(155,35,53,0.25)] hover:-translate-y-0.5"
              >
                영상 채널 바로가기
                <ArrowRight size={16} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
