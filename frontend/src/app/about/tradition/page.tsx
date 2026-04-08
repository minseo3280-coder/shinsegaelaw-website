"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import SubPageHero from "@/components/shared/SubPageHero";
import traditionData from "@/../../data/tradition.json";
import AboutTabs from "@/components/shared/AboutTabs";
import { useScrollReveal } from "@/hooks/useScrollReveal";

function useCountUp(target: number, duration: number = 1500) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const startTime = performance.now();
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
    const animate = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      setCount(Math.round(easeOut(progress) * target));
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDone(true);
      }
    };
    requestAnimationFrame(animate);
  }, [started, target, duration]);

  return { count, ref, done };
}

export default function TraditionPage() {
  const revealRef = useScrollReveal();
  const { count, ref: counterRef, done: countDone } = useCountUp(
    traditionData.stat.number,
    1500
  );

  const {
    headline,
    turning,
    intro,
    generations,
    stat,
    article,
    quote,
    distinction,
    closing,
  } = traditionData;

  return (
    <div ref={revealRef}>
      <SubPageHero
        titleEn="TRADITION"
        titleKo="52년 법조전통"
        bannerImage="/images/office/banner-about.jpg"
        breadcrumbs={[
          { label: "신세계로", href: "/about/greeting" },
          { label: "52년 법조전통" },
        ]}
      />

      <AboutTabs activeTab={1} />

      {/* ━━━ Section 1: 도입 + 스토리 ━━━ */}
      <section className="bg-white" data-reveal>
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 pt-14 md:pt-20 pb-10 md:pb-14">
          <p className="text-[13px] md:text-[15px] tracking-[0.3em] uppercase font-bold text-[#C9A84C] mb-4 md:mb-6">
            Tradition
          </p>
          <h2
            className="text-[24px] md:text-[38px] lg:text-[44px] font-bold text-[#2C2028] leading-[1.4] md:leading-[1.5] tracking-tight mb-8 md:mb-12"
            style={{ wordBreak: "keep-all" }}
          >
            {headline.line1}
            <br />
            <span className="text-burgundy-500">{headline.highlight}</span>
          </h2>

          <div className="space-y-5 md:space-y-7">
            <p className="text-[16px] md:text-[19px] text-[#333] leading-[1.9] md:leading-[2]" style={{ wordBreak: "keep-all" }}>
              {headline.line3}
              {" "}{headline.line4}
            </p>
            <p className="text-[16px] md:text-[19px] text-[#333] leading-[1.9] md:leading-[2]" style={{ wordBreak: "keep-all" }}>
              사법시험 시절에는{" "}
              <span className="text-burgundy-500 font-bold">{turning.highlightNumber}대</span>에 걸친{" "}
              <span className="font-bold">{turning.highlightWord}</span>이 극히 드물었습니다.
              <br />
              로스쿨 제도 이후 법조가족이 늘었지만, 사법시험으로 2대를 이은 전통은 다릅니다.
            </p>

            {/* 핵심 메시지 */}
            <blockquote className="border-l-[3px] border-burgundy-500 pl-5 md:pl-7 py-1">
              <p className="text-[15px] md:text-[17px] text-burgundy-500/60 font-semibold tracking-wide mb-1">
                {intro.org}
              </p>
              <p className="text-[18px] md:text-[22px] text-[#2C2028] font-bold leading-[1.7] md:leading-[1.8]" style={{ wordBreak: "keep-all" }}>
                {intro.text}
                <br />
                <span className="text-burgundy-500">{intro.emphasis}</span>
              </p>
            </blockquote>
          </div>
        </div>
      </section>

      {/* ━━━ Section 2: 세대 카드 + 카운트업 ━━━ */}
      <section className="bg-[#F8F4EE]" data-reveal>
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 py-14 md:py-16">
          {/* 세대 카드 */}
          <div className="grid grid-cols-2 gap-3 md:gap-6 mb-8 md:mb-12">
            {generations.map((gen) => (
              <div key={gen.id} className="bg-white overflow-hidden border border-gray-100">
                {/* 사진 */}
                <div className="relative w-full aspect-[3/4] overflow-hidden bg-[#E8E0D8]">
                  {gen.image ? (
                    <Image
                      src={gen.image}
                      alt={gen.name}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 50vw, 500px"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <p className="text-[16px] text-[#444]">{gen.name}</p>
                    </div>
                  )}
                </div>
                {/* 정보 */}
                <div className="p-4 md:p-8 text-center">
                  <p className="text-[14px] md:text-[15px] text-burgundy-500/60 font-semibold tracking-wide mb-1">
                    {gen.generation}
                  </p>
                  <p className="text-[18px] md:text-[26px] font-bold text-[#2C2028] tracking-tight mb-1 md:mb-2">
                    {gen.name}
                  </p>
                  <div className="flex items-baseline justify-center gap-[2px] mb-3 md:mb-4">
                    <span className="text-[28px] md:text-[42px] font-bold text-[#2C2028] tracking-tight">
                      {gen.startYear}
                    </span>
                    <span className="text-[14px] md:text-[16px] font-bold text-burgundy-500">~</span>
                  </div>
                  <div className="text-[14px] md:text-[16px] text-[#333] leading-[1.9]">
                    {gen.career.map((item: string, i: number) => (
                      <p key={i} className="m-0">· {item}</p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 52년 카운트업 */}
          <div
            className="bg-white border border-gray-100 py-8 md:py-10 text-center"
            ref={counterRef}
            aria-live="polite"
          >
            <p className="text-[15px] md:text-[17px] text-[#777] mb-1">{stat.prefix}</p>
            <div className={`flex items-baseline justify-center gap-1 ${countDone ? "count-pulse" : ""}`}>
              <span
                className="text-[48px] md:text-[80px] font-bold text-burgundy-500 tracking-tight"
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                {count}
              </span>
              <span className="text-[20px] md:text-[30px] font-bold text-burgundy-500/60">{stat.unit}</span>
            </div>
            <p className="text-[15px] md:text-[18px] text-[#777] mt-1">{stat.suffix}</p>
          </div>
        </div>
      </section>

      {/* ━━━ Section 3: 인용 배너 (사진 배경) ━━━ */}
      <section
        className="relative h-[220px] md:h-[360px] overflow-hidden"
        data-reveal
      >
        <Image
          src="/images/office/banner-about.jpg"
          alt="신세계로 사무실"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 flex items-center justify-center h-full px-5 md:px-10">
          <div className="text-center max-w-[1000px]">
            <p
              className="text-[15px] md:text-[24px] lg:text-[28px] text-white font-semibold leading-[1.8] md:leading-[1.85]"
              style={{ wordBreak: "keep-all" }}
            >
              {quote.main}
            </p>
            <p className="text-[14px] md:text-[17px] text-white/60 leading-[1.8] mt-3 md:mt-5">
              {quote.sub}
            </p>
          </div>
        </div>
      </section>

      {/* ━━━ Section 4: 본문 ━━━ */}
      <section className="bg-white" data-reveal>
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 py-14 md:py-16">
          <div className="space-y-5">
            <p className="text-[16px] md:text-[19px] text-[#333] leading-[1.9] md:leading-[2]" style={{ wordBreak: "keep-all" }}>
              {distinction.main}
            </p>
            <p className="text-[16px] md:text-[19px] text-[#333] leading-[1.9] md:leading-[2]" style={{ wordBreak: "keep-all" }}>
              {distinction.sub}
            </p>
          </div>
        </div>
      </section>

      {/* ━━━ Section 5: 관련 기사 ━━━ */}
      <section className="bg-[#F8F4EE]" data-reveal>
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 py-14 md:py-16">
          <p className="text-[13px] md:text-[15px] tracking-[0.3em] uppercase font-bold text-[#C9A84C] mb-4 md:mb-6">
            Related Article
          </p>
          <a
            href={article.url || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white border border-gray-100 p-5 md:p-8 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-all duration-300 group"
          >
            <p className="text-[15px] md:text-[16px] text-burgundy-500 font-semibold mb-2">
              {article.source} · {article.category}
            </p>
            <p className="text-[19px] md:text-[26px] font-bold text-[#2C2028] leading-[1.4] mb-3 group-hover:text-burgundy-500 transition-colors duration-200 tracking-tight">
              {article.title}
            </p>
            <p className="text-[15px] md:text-[18px] text-[#333] leading-[1.8] mb-4 line-clamp-3" style={{ wordBreak: "keep-all" }}>
              {article.desc}
            </p>
            <span className="text-[15px] md:text-[17px] text-burgundy-500 font-semibold inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-300">
              자세히 보기 <ExternalLink size={15} />
            </span>
          </a>
        </div>
      </section>

      {/* ━━━ Section 6: 클로징 ━━━ */}
      <section className="bg-[#1A1A2E] text-center" data-reveal>
        <div className="max-w-[900px] mx-auto px-5 md:px-8 py-20 md:py-28">
          <p className="text-[14px] md:text-[17px] text-white/50 mb-4 md:mb-6">{closing.sub}</p>
          <p
            className="font-serif text-[24px] md:text-[40px] lg:text-[46px] font-bold text-white leading-[1.5]"
            style={{ wordBreak: "keep-all" }}
          >
            2대에 걸쳐 합격한 법조 전통,
            <br />
            그 무게가 <span className="text-[#C9A84C]">다릅니다.</span>
          </p>
          <div className="pt-8 md:pt-12 mt-8 md:mt-12 border-t border-white/10">
            <p className="text-[13px] md:text-[15px] tracking-[0.2em] text-white/40 uppercase">
              Since 1970 — Shinsegaero
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
