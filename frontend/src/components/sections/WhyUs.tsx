"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import ScrollReveal from "@/components/ScrollReveal";
import whyusData from "@/../../data/whyus.json";

export default function WhyUs() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const panels = whyusData.panels;

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", containScroll: false },
    [Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })]
  );

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <section id="whyus" className="py-12 md:py-28 lg:py-36 bg-[#faf9f7]">
      <div className="max-w-[1600px] mx-auto px-5 md:px-8 lg:px-10">
        {/* Header */}
        <ScrollReveal className="mb-8 md:mb-16">
          <p className="text-[13px] md:text-[14px] tracking-[0.3em] text-burgundy-500 font-semibold uppercase mb-3 md:mb-4">
            Why Shinsegae Law
          </p>
          <h2 className="text-[24px] md:text-[44px] lg:text-[54px] font-bold text-foreground tracking-tight">
            신세계로를 선택하는 이유
          </h2>
          <div className="w-10 md:w-12 h-[2px] bg-gold-500 mt-3 md:mt-4" />
        </ScrollReveal>

        {/* Carousel — Image-dominant overlay cards */}
        <ScrollReveal>
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-5">
              {panels.map((panel) => (
                <div
                  key={panel.number}
                  className="flex-[0_0_85%] md:flex-[0_0_48%] lg:flex-[0_0_48%] min-w-0"
                >
                  <div className="group relative rounded-[12px] overflow-hidden shadow-sm h-full cursor-pointer">
                    {/* Full-bleed image */}
                    <div className="relative aspect-[3/4] md:aspect-[4/5] min-h-0">
                      <Image
                        src={panel.image}
                        alt={panel.title}
                        fill
                        sizes="(max-width: 768px) 85vw, 48vw"
                        className="parallax-img object-cover transition-transform duration-700 group-hover:scale-105"
                      />

                      {/* Dark gradient overlay — stronger at bottom */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/5 transition-opacity duration-500 group-hover:from-black/85 group-hover:via-black/40" />

                      {/* Gold number top-left */}
                      <div className="absolute top-4 left-4 md:top-8 md:left-8">
                        <span className="text-[42px] md:text-[72px] font-bold text-gold-400/30 leading-none select-none">
                          {panel.number}
                        </span>
                        <p className="text-[12px] md:text-[14px] tracking-[0.2em] text-gold-400/70 font-semibold mt-[-4px]">
                          {panel.label}
                        </p>
                      </div>

                      {/* Text overlay at bottom */}
                      <div className="absolute inset-x-0 bottom-0 p-4 md:p-8 lg:p-10">
                        <h3 className="text-[20px] md:text-[28px] font-bold text-white leading-snug mb-2 md:mb-3 drop-shadow-lg">
                          {panel.title}
                        </h3>
                        <div className="w-8 md:w-10 h-[2px] bg-gold-500 mb-3 md:mb-4 transition-all duration-500 group-hover:w-16" />
                        <p className="text-[14px] md:text-[17px] text-white/80 leading-relaxed line-clamp-2 md:line-clamp-none transition-all duration-500 group-hover:text-white/95">
                          {panel.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation: Arrows + Dots */}
          <div className="flex items-center justify-center gap-4 mt-6 md:mt-8">
            <button
              onClick={scrollPrev}
              className="w-[44px] h-[44px] md:w-[36px] md:h-[36px] rounded-full border border-gray-300 hover:border-gold-400 hover:bg-gold-400/[0.06] transition-all duration-300 flex items-center justify-center group/arrow"
              aria-label="이전"
            >
              <ChevronLeft size={16} className="text-gray-400 group-hover/arrow:text-gold-500 transition-colors" />
            </button>

            <div className="flex items-center gap-[6px]">
              {panels.map((_, i) => (
                <button
                  key={i}
                  onClick={() => emblaApi?.scrollTo(i)}
                  className={`h-[6px] rounded-full transition-all duration-300 ${
                    i === selectedIndex
                      ? "w-[20px] bg-gold-500"
                      : "w-[6px] bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`패널 ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={scrollNext}
              className="w-[44px] h-[44px] md:w-[36px] md:h-[36px] rounded-full border border-gray-300 hover:border-gold-400 hover:bg-gold-400/[0.06] transition-all duration-300 flex items-center justify-center group/arrow"
              aria-label="다음"
            >
              <ChevronRight size={16} className="text-gray-400 group-hover/arrow:text-gold-500 transition-colors" />
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
