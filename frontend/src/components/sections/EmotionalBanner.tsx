"use client";

import ScrollReveal from "@/components/ScrollReveal";

export default function EmotionalBanner() {
  return (
    <section className="relative h-[45vh] md:h-[50vh] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('/images/office/slide-bg-main.jpg')" }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Content */}
      <ScrollReveal className="relative z-10 text-center px-5 md:px-8 lg:px-10 max-w-[1400px] mx-auto">
        <p className="text-[15px] tracking-[0.35em] text-white/40 uppercase font-semibold mb-8">
          Since 1970
        </p>
        <blockquote
          className="text-[28px] md:text-[44px] lg:text-[54px] font-light text-white leading-[1.6] tracking-tight"
          style={{ wordBreak: "keep-all" }}
        >
          &ldquo;이혼은 인생에서<br />
          가장 치열한 <strong className="font-bold text-gold-400">전환점</strong>입니다.&rdquo;
        </blockquote>
        <p className="mt-8 text-[17px] text-white/45 font-semibold tracking-wide">
          — 조인섭 대표변호사
        </p>
      </ScrollReveal>
    </section>
  );
}
