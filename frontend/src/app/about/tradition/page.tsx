"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import SubPageHero from "@/components/shared/SubPageHero";
import traditionData from "@/../../data/tradition.json";
import AboutTabs from "@/components/shared/AboutTabs";
import { useScrollReveal } from "@/hooks/useScrollReveal";

function addLineBreaks(text: string) {
  const segments = text.split(/(?<=[.?])\s+/);
  return segments.map((seg: string, i: number) => (
    <span key={i}>
      {seg}
      {i < segments.length - 1 && <br />}
    </span>
  ));
}

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
    <div ref={revealRef} className="">
      {/* Banner */}
      <SubPageHero
        titleEn="TRADITION"
        titleKo="52년 법조전통"
        bannerImage="/images/office/banner-about.jpg"
        breadcrumbs={[{ label: "신세계로", href: "/about/greeting" }, { label: "52년 법조전통" }]}
      />

      {/* Tabs */}
      <AboutTabs activeTab={1} />

      {/* Headline — 4 lines */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 pt-8 md:pt-20" data-reveal>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-[2px] bg-burgundy-500" />
          <p className="text-[14px] tracking-[0.3em] uppercase font-bold text-burgundy-500">
            Tradition
          </p>
        </div>
        <h2
          className="text-[20px] md:text-[42px] lg:text-[48px] font-bold text-[#2C2028] leading-[1.3] tracking-tight max-w-[780px] font-sans"
          style={{ wordBreak: "keep-all" as const }}
        >
          {headline.line1}
          <br />
          <span className="text-burgundy-500">{headline.highlight}</span>
          <br />
          {headline.line3}
          <br />
          {headline.line4}
        </h2>
      </section>

      {/* Divider */}
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10 py-8 md:py-10">
        <div className="w-full h-[1px] bg-gray-200" />
      </div>

      {/* Turning point */}
      <section className="text-center max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10" data-reveal>
        <p className="text-[20px] md:text-[46px] font-bold text-gray-900 mb-4 md:mb-6 tracking-tight">
          {turning.title}
        </p>
        <div className="max-w-[1300px] mx-auto">
          <p className="text-[15px] md:text-[21px] text-gray-900 leading-[1.8] mb-2">
            사법시험 시절에는{" "}
            <span className="text-burgundy-500 font-bold text-[24px] md:text-[32px]">
              {turning.highlightNumber}
            </span>
            대에 걸친
            <span className="font-bold"> {turning.highlightWord}</span>이 극히
            드물었습니다.
          </p>
          <p className="text-[15px] md:text-[21px] text-[#333333]">{addLineBreaks(turning.sub)}</p>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10 py-8 md:py-10">
        <div className="w-full h-[1px] bg-gray-200" />
      </div>

      {/* Intro */}
      <section className="text-center max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10 pb-4" data-reveal>
        <p className="text-[14px] md:text-[18px] text-burgundy-500/60 font-semibold tracking-wide mb-2">{intro.org}</p>
        <p className="text-[15px] md:text-[21px] text-gray-900 leading-[1.8]" style={{ wordBreak: "keep-all" as const }}>
          {addLineBreaks(intro.text)}
        </p>
        <p className="text-[16px] md:text-[22px] text-gray-900 mt-2 font-semibold">
          <span className="text-burgundy-500 font-bold">{intro.emphasis}</span>
        </p>
      </section>

      {/* Generation cards */}
      <section className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10 py-8 md:py-10" data-reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 max-w-[1300px] mx-auto">
          {generations.map((gen) => (
            <div key={gen.id} className="group rounded-xl overflow-hidden bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-500">
              {/* 모바일: 가로형 컴팩트 / 데스크톱: 세로형 풀사이즈 */}
              {/* Desktop - 세로 카드 */}
              <div className="hidden md:block">
                <div className="relative w-full aspect-[3/4] overflow-hidden bg-[#F0EBE4]">
                  {gen.image ? (
                    <Image src={gen.image} alt={gen.name} fill className="object-cover object-top group-hover:scale-[1.02] transition-transform duration-500" sizes="50vw" />
                  ) : (
                    <div className="w-full h-full bg-[#f0eeea] flex items-center justify-center">
                      <p className="text-[16px] text-[#444444]">{gen.name}</p>
                    </div>
                  )}
                </div>
                <div className="p-6 text-center">
                  <p className="text-[13px] text-burgundy-500/60 font-semibold tracking-wide mb-1">{gen.generation}</p>
                  <p className="text-[28px] font-bold text-gray-900 mb-2 tracking-tight">{gen.name}</p>
                  <div className="flex items-baseline justify-center gap-[2px] mb-4">
                    <span className="text-[48px] font-bold text-gray-900 tracking-tight">{gen.startYear}</span>
                    <span className="text-[16px] font-bold text-burgundy-500">~</span>
                  </div>
                  <div className="text-[15px] text-[#333333] leading-[2]">
                    {gen.career.map((item: string, i: number) => (
                      <p key={i} className="m-0">{item}</p>
                    ))}
                  </div>
                </div>
              </div>
              {/* Mobile - 가로형 컴팩트 카드 */}
              <div className="flex md:hidden">
                <div className="relative w-[140px] min-h-[200px] flex-shrink-0 overflow-hidden bg-[#F0EBE4]">
                  {gen.image ? (
                    <Image src={gen.image} alt={gen.name} fill className="object-cover object-top" sizes="140px" />
                  ) : (
                    <div className="w-full h-full bg-[#f0eeea] flex items-center justify-center">
                      <p className="text-[15px] text-[#444444]">{gen.name}</p>
                    </div>
                  )}
                </div>
                <div className="flex-1 p-4 flex flex-col justify-center">
                  <p className="text-[12px] text-burgundy-500/60 font-semibold tracking-wide mb-1">{gen.generation}</p>
                  <p className="text-[20px] font-bold text-gray-900 tracking-tight mb-1">{gen.name}</p>
                  <div className="flex items-baseline gap-[2px] mb-3">
                    <span className="text-[32px] font-bold text-gray-900 tracking-tight">{gen.startYear}</span>
                    <span className="text-[14px] font-bold text-burgundy-500">~</span>
                  </div>
                  <div className="text-[14px] text-[#333333] font-medium leading-[1.8]">
                    {gen.career.map((item: string, i: number) => (
                      <p key={i} className="m-0">{item}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 52 year count up */}
      <section className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10" data-reveal>
        <div
          className="bg-[#F8F4EE] rounded-xl py-10 md:py-14 text-center"
          ref={counterRef}
          aria-live="polite"
        >
          <p className="text-[13px] text-[#444444] mb-1">{stat.prefix}</p>
          <div className={`flex items-baseline justify-center gap-1 ${countDone ? "count-pulse" : ""}`}>
            <span className="text-[52px] md:text-[88px] font-bold text-burgundy-500 tracking-tight" style={{ fontVariantNumeric: "tabular-nums" }}>
              {count}
            </span>
            <span className="text-[20px] md:text-[30px] font-bold text-burgundy-500/60">{stat.unit}</span>
          </div>
          <p className="text-[16px] text-[#444444] mt-1">{stat.suffix}</p>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10 py-8">
        <div className="w-full h-[1px] bg-gray-200" />
      </div>

      {/* Article */}
      <section className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10 pb-6" data-reveal>
        <p className="text-[17px] md:text-[22px] font-bold text-gray-900 mb-5">관련 기사</p>
        <a
          href={article.url || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-xl overflow-hidden bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-500 group"
        >
          <div className="p-5 md:p-8">
            <p className="text-[13px] text-burgundy-500 font-semibold mb-3">
              {article.source} · {article.category}
            </p>
            <p className="text-[18px] md:text-[28px] font-bold text-gray-900 leading-[1.4] mb-3 group-hover:text-burgundy-500 transition-colors duration-200 tracking-tight">
              {article.title}
            </p>
            <p className="text-[15px] md:text-[18px] text-[#333333] leading-[1.9] mb-5">
              {addLineBreaks(article.desc)}
            </p>
            <span className="text-[15px] md:text-[17px] text-burgundy-500 font-semibold inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-300">
              자세히 보기 <ExternalLink size={13} />
            </span>
          </div>
        </a>
      </section>

      {/* Quote — cream band, 2 paragraphs */}
      <div className="bg-[#F8F4EE] py-8 md:py-12 mt-5" data-reveal>
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10">
          <div className="border-l-[3px] border-l-burgundy-500 pl-5 md:pl-7 max-w-[1300px] mx-auto">
            <p className="text-[16px] md:text-[23px] font-semibold text-gray-900 leading-[1.9]" style={{ wordBreak: "keep-all" as const }}>
              {addLineBreaks(quote.main)}
            </p>
            <p className="text-[15px] md:text-[18px] text-[#333333] leading-[1.9] mt-4">
              {addLineBreaks(quote.sub)}
            </p>
          </div>
        </div>
      </div>

      {/* Distinction */}
      <section className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10 py-8 md:py-10" data-reveal>
        <div className="max-w-[1300px] mx-auto">
          <p className="text-[15px] md:text-[18px] text-[#333333] leading-[2.1] mb-5">
            {addLineBreaks(distinction.main)}
          </p>
          <p className="text-[15px] md:text-[18px] text-[#333333] leading-[2.1]">
            {addLineBreaks(distinction.sub)}
          </p>
        </div>
      </section>

      {/* Closing */}
      <section className="text-center py-10 md:py-20 max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10" data-reveal>
        <div className="w-[1px] h-8 bg-burgundy-500/20 mx-auto mb-6" />
        <p className="text-[15px] md:text-[18px] text-[#333333] mb-2">{closing.sub}</p>
        <p
          className="text-[20px] md:text-[38px] lg:text-[42px] font-bold text-burgundy-500 leading-[1.5]"
          style={{ wordBreak: "keep-all" as const }}
        >
          {closing.main}
        </p>
        <div className="w-[1px] h-8 bg-burgundy-500/20 mx-auto mt-6" />
      </section>

    </div>
  );
}
