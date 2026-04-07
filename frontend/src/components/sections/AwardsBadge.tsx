"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Award } from "lucide-react";
import awardsData from "@/../../data/awards.json";

export default function AwardsBadge() {
  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 3000, stopOnInteraction: false })]
  );

  return (
    <section className="py-10 md:py-14 bg-[#faf9f7] border-b border-[#e8e6e0]" id="awards">
      <div className="max-w-[1600px] mx-auto px-5 md:px-8 lg:px-10">
        {/* Section label */}
        <p className="text-center text-[13px] tracking-[0.3em] text-[#C9A84C] font-semibold uppercase mb-6 md:mb-8">
          Awards & Recognition
        </p>

        {/* Carousel with edge fade */}
        <div className="relative">
          {/* Left fade */}
          <div className="absolute left-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-r from-[#faf9f7] to-transparent z-10 pointer-events-none" />
          {/* Right fade */}
          <div className="absolute right-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-l from-[#faf9f7] to-transparent z-10 pointer-events-none" />

          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-3 md:gap-4">
              {awardsData.awards.map((award) => (
                <div key={award.id} className="flex-[0_0_auto]">
                  <div className="group inline-flex items-center gap-2.5 px-5 md:px-6 py-3 md:py-3.5 rounded-full bg-[#7B2D3B]/[0.08] border border-[#7B2D3B]/[0.12] hover:bg-[#7B2D3B]/[0.15] hover:border-[#7B2D3B]/[0.22] hover:scale-[1.02] transition-all duration-300 whitespace-nowrap cursor-default">
                    <Award
                      size={14}
                      className="text-[#C9A84C]/50 group-hover:text-[#C9A84C]/70 transition-colors shrink-0"
                    />
                    <span className="text-[15px] md:text-[16px] text-[#7B2D3B] font-semibold">
                      {award.title}
                    </span>
                    {award.year && (
                      <span className="text-[13px] text-[#7B2D3B]/40 font-semibold">
                        {award.year}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
