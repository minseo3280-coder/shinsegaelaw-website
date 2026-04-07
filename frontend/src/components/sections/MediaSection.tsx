"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import youtubeData from "@/../../data/youtube.json";
import newsData from "@/../../data/news.json";

const featuredVideoId = youtubeData.featured_video?.id || "4C5BehULHVQ";
const recentNews = newsData.slice(0, 4);

export default function MediaSection() {
  return (
    <section id="media" className="py-12 md:py-28 bg-[#F8F4EE]">
      <div className="max-w-[1600px] mx-auto px-5 md:px-8 lg:px-10">
        {/* Section header */}
        <ScrollReveal>
          <p className="text-[11px] md:text-[13px] text-gold-500 tracking-[0.3em] uppercase mb-2">News &amp; Media</p>
          <h2 className="text-[22px] md:text-[40px] font-bold text-gray-900 mb-2 md:mb-3">언론 &amp; 미디어</h2>
          <div className="w-10 md:w-12 h-[2px] bg-gradient-to-r from-gold-400 to-gold-500 mb-6 md:mb-8" />
        </ScrollReveal>

        <ScrollReveal delay={150}>
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-5">
            {/* YouTube embed */}
            <div className="rounded-2xl overflow-hidden bg-black aspect-video relative">
              <iframe
                src={`https://www.youtube.com/embed/${featuredVideoId}?rel=0`}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                title="YTN 라디오 조인섭변호사의 상담소"
              />
            </div>

            {/* News list */}
            <div className="flex flex-col gap-3">
              {recentNews.map((item) => (
                <Link
                  key={item.id}
                  href="/news"
                  className="flex gap-4 p-4 rounded-xl border border-gray-200 hover:border-burgundy-500/20 hover:shadow-sm transition-all group"
                >
                  <div className="flex-1">
                    <p className="text-[12px] text-burgundy-500 font-semibold mb-1">{item.category || "언론보도"}</p>
                    <p className="text-[14px] md:text-[16px] font-semibold text-gray-900 line-clamp-2 group-hover:text-burgundy-600 transition-colors">{item.title}</p>
                    <p className="text-[12px] md:text-[13px] text-[#333333] mt-1.5 md:mt-2">{item.year || item.date}</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-[#444444] flex-shrink-0 mt-1" />
                </Link>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
