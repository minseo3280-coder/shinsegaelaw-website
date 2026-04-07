"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Scale, Shield, Heart } from "lucide-react";
import SubPageHero from "@/components/shared/SubPageHero";
import greetingData from "@/../../data/greeting.json";
import AboutTabs from "@/components/shared/AboutTabs";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/* 문장 끝(. ?) 뒤에 줄바꿈 삽입 */
function addLineBreaks(text: string) {
  // ". " 또는 "? " 뒤에서 줄바꿈 (문장 끝이 아닌 마지막 문장은 제외)
  const segments = text.split(/(?<=[.?])\s+/);
  return segments.map((seg, i) => (
    <span key={i}>
      {seg}
      {i < segments.length - 1 && <br />}
    </span>
  ));
}

function highlightText(text: string, phrases: string[]) {
  const parts = text.split(new RegExp(`('${phrases.join("|")}')`, "g"));
  return parts.map((part, i) => {
    const isHighlight = phrases.some((p) => part === `'${p}'`);
    return isHighlight ? (
      <span key={i} className="text-burgundy-500 font-semibold">
        {part}
      </span>
    ) : (
      <span key={i}>{addLineBreaks(part)}</span>
    );
  });
}

function GreetingContent() {
  const searchParams = useSearchParams();
  const initialTab = Number(searchParams.get("tab")) || 0;
  const [activeTab, setActiveTab] = useState(initialTab);
  const revealRef = useScrollReveal();

  useEffect(() => {
    const tab = Number(searchParams.get("tab")) || 0;
    if (tab >= 0 && tab <= 4) setActiveTab(tab);
  }, [searchParams]);

  const {
    representatives,
    openingParagraph,
    message,
    messageContinued,
    signatory,
    highlightPhrases,
  } = greetingData;

  return (
    <div ref={revealRef} className="">
      {/* Banner */}
      <SubPageHero
        titleEn="GREETINGS"
        titleKo="인사말"
        bannerImage="/images/office/banner-about.jpg"
        breadcrumbs={[{ label: "신세계로", href: "/about/greeting" }, { label: "인사말" }]}
      />

      {/* Tabs */}
      <AboutTabs activeTab={activeTab} />

      {/* Tab content */}
      <div role="tabpanel">
        {/* Tab 0: 인사말 */}
        {activeTab === 0 && (
          <>
            {/* GREETINGS + Title */}
            <section
              className="max-w-[1400px] mx-auto px-5 md:px-10 pt-10 md:pt-20"
              data-reveal
            >
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <div className="w-8 md:w-10 h-[2px] bg-burgundy-500" />
                <p className="text-[13px] md:text-[14px] tracking-[0.3em] uppercase font-bold text-burgundy-500">
                  Greetings
                </p>
              </div>
              <h2
                className="font-sans text-[22px] md:text-[42px] lg:text-[48px] leading-[1.3] font-bold text-[#2C2028] mb-4 md:mb-6"
                style={{ wordBreak: "keep-all" as const }}
              >
                <span className="text-burgundy-500">법무법인 신세계로</span> 홈페이지를<br className="hidden md:block" /> 찾아주셔서 감사드립니다.
              </h2>
            </section>

            {/* Representatives — Desktop: full grid / Mobile: accordion */}
            <section
              className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10 py-6 md:py-12"
              data-reveal
            >
              {/* Desktop — 기존 그리드 유지 */}
              <div className="hidden md:grid grid-cols-2 gap-14 max-w-[1000px] mx-auto">
                {representatives.map((rep, idx) => {
                  const philosophies = [
                    "52년 법조 전통의 무게를 아는 사람",
                    "이혼은 존엄한 선택이라 믿는 사람"
                  ];
                  return (
                    <div key={rep.id} className="group">
                      <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden bg-[#F0EBE4] shadow-[0_8px_30px_rgba(0,0,0,0.08)] mb-5">
                        {rep.image ? (
                          <Image
                            src={rep.image}
                            alt={`${rep.name} ${rep.title}`}
                            fill
                            className="object-cover object-top group-hover:scale-[1.02] transition-transform duration-500"
                            sizes="380px"
                          />
                        ) : (
                          <div className="w-full h-full bg-[#f0eeea] flex items-center justify-center">
                            <p className="text-[14px] text-[#444444]">{rep.name}</p>
                          </div>
                        )}
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent pt-16 pb-5 px-5">
                          <p className="text-[16px] text-white/70 font-semibold italic">&ldquo;{philosophies[idx]}&rdquo;</p>
                        </div>
                      </div>
                      <p className="text-[13px] text-burgundy-500/60 font-semibold tracking-wide mb-1">{rep.role}</p>
                      <p className="text-[25px] font-bold text-gray-900 mb-3 tracking-tight">
                        {rep.name} <span className="text-[19px] font-semibold text-[#333333]">{rep.title}</span>
                      </p>
                      <div className="text-[16px] text-[#333333] font-semibold leading-[2]">
                        {rep.career.map((item: string, ci: number) => (
                          <p key={ci} className="m-0">· {item}</p>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Mobile — 직접 표시 */}
              <div className="md:hidden divide-y divide-gray-200">
                {representatives.map((rep) => {
                  const barCreds = rep.career.filter((item: string) =>
                    item.includes("사시") || item.includes("사법연수원")
                  );
                  const otherCareer = rep.career.filter((item: string) =>
                    !item.includes("사시") && !item.includes("사법연수원")
                  );
                  return (
                    <div key={rep.id} className="py-6 first:pt-0">
                      {/* Photo + Name */}
                      <div className="flex items-center gap-3.5 mb-3">
                        <div className="relative w-16 h-16 overflow-hidden bg-[#F0EBE4] flex-shrink-0">
                          {rep.image ? (
                            <Image src={rep.image} alt={rep.name} fill className="object-cover object-top" sizes="64px" />
                          ) : (
                            <div className="w-full h-full bg-[#f0eeea] flex items-center justify-center">
                              <p className="text-[12px] text-[#444444]">{rep.name}</p>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[12px] text-[#999999] font-medium tracking-wide mb-0.5">{rep.role}</p>
                          <p className="text-[17px] font-bold text-[#2C2028] tracking-tight mb-1.5">
                            {rep.name} <span className="text-[14px] font-semibold text-[#555555]">{rep.title}</span>
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {barCreds.map((cred: string, ci: number) => (
                              <span key={ci} className="text-[12px] text-[#9B2335] font-semibold bg-burgundy-50 px-2 py-[2px]">
                                {cred}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      {/* Career — full width, all items */}
                      <div className="text-[14px] text-[#333333] leading-[2]">
                        {otherCareer.map((item: string, ci: number) => (
                          <p key={ci} className="m-0">· {item}</p>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Core Values — Desktop: 3 Cards / Mobile: accordion */}
            <section className="bg-[#F8F4EE] py-8 md:py-16" data-reveal>
              <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10">
                {/* Desktop */}
                <div className="hidden md:grid grid-cols-3 gap-6">
                  {[
                    { icon: Scale, title: "전문성", desc: "52년 법조 전통과 가족법 전문 1호의 깊이로, 이혼의 모든 쟁점을 꿰뚫습니다." },
                    { icon: Shield, title: "신뢰", desc: "1,053건 승소사례가 증명합니다. 기록으로 말하고, 결과로 보여드립니다." },
                    { icon: Heart, title: "존엄", desc: "이혼은 실패가 아닌 존엄한 선택입니다. 새로운 시작을 위해 끝까지 함께합니다." },
                  ].map((item) => (
                    <div key={item.title} className="bg-white rounded-xl p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-500">
                      <div className="w-12 h-12 rounded-full bg-burgundy-50 flex items-center justify-center mb-5">
                        <item.icon size={22} className="text-burgundy-500" />
                      </div>
                      <h3 className="text-[30px] font-bold text-gray-900 mb-3 tracking-tight font-sans">{item.title}</h3>
                      <p className="text-[18px] text-[#2C2028] font-semibold leading-[1.8]">{item.desc}</p>
                    </div>
                  ))}
                </div>
                {/* Mobile — direct list */}
                <div className="md:hidden space-y-4">
                  {[
                    { icon: Scale, title: "전문성", desc: "52년 법조 전통과 가족법 전문 1호의 깊이로, 이혼의 모든 쟁점을 꿰뚫습니다." },
                    { icon: Shield, title: "신뢰", desc: "1,053건 승소사례가 증명합니다. 기록으로 말하고, 결과로 보여드립니다." },
                    { icon: Heart, title: "존엄", desc: "이혼은 실패가 아닌 존엄한 선택입니다. 새로운 시작을 위해 끝까지 함께합니다." },
                  ].map((item) => (
                    <div key={item.title} className="flex items-start gap-3">
                      <div className="w-9 h-9 bg-burgundy-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <item.icon size={16} className="text-burgundy-500" />
                      </div>
                      <div>
                        <p className="text-[15px] font-bold text-[#2C2028] mb-0.5">{item.title}</p>
                        <p className="text-[14px] text-[#333333] leading-[1.7]">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Opening paragraph — large */}
            <section
              className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10 pt-8 md:pt-14"
              data-reveal
            >
              <p className="text-[17px] md:text-[32px] font-semibold text-gray-900 leading-[1.8] mb-4 md:mb-6 tracking-tight max-w-[1300px] mx-auto" style={{ wordBreak: "keep-all" as const }}>
                {openingParagraph.split('. ').map((sentence: string, i: number, arr: string[]) => (
                  <span key={i}>
                    {sentence}{i < arr.length - 1 ? '.' : ''}
                    {i < arr.length - 1 && <br />}
                  </span>
                ))}
              </p>
            </section>

            {/* Message body — before quote */}
            <section
              className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10 pb-8 md:pb-10"
              data-reveal
            >
              <div className="max-w-[1300px] mx-auto">
                {message.map((paragraph: string, i: number) => (
                  <p
                    key={i}
                    className="text-[16px] md:text-[21px] text-[#2C2028] font-semibold leading-[2.0] mb-7 last:mb-0"
                  >
                    {highlightText(paragraph, highlightPhrases)}
                  </p>
                ))}
              </div>
            </section>

            {/* Stats band — visual anchor */}
            <div className="border-t border-b border-gray-200 py-8 md:py-10" data-reveal>
              <div className="max-w-[600px] md:max-w-[900px] mx-auto px-5">
                <div className="grid grid-cols-3 text-center">
                  {[
                    { number: "52", suffix: "년", label: "법조 전통" },
                    { number: "19", suffix: "인", label: "전문변호사" },
                    { number: "1,053", suffix: "건+", label: "승소사례" },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <p className="text-[28px] md:text-[48px] font-bold text-[#9B2335] leading-none tracking-tight">
                        {stat.number}
                        <span className="text-[15px] md:text-[20px] font-semibold text-[#2C2028] ml-0.5">{stat.suffix}</span>
                      </p>
                      <p className="text-[12px] md:text-[15px] text-[#888888] mt-1.5 md:mt-2 tracking-wide">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quote */}
            <div className="bg-[#F8F4EE] py-10 md:py-14" data-reveal>
              <div className="max-w-[560px] md:max-w-[900px] mx-auto px-8 md:px-10 text-center">
                <div className="w-8 h-[1px] bg-[#C9A84C] mx-auto mb-5 md:mb-7" />
                <p className="text-[15px] md:text-[24px] text-[#2C2028] leading-[2] md:leading-[1.8]" style={{ wordBreak: "keep-all" as const }}>
                  우리가 진짜로 원하는 건 단지 &apos;이기는 것&apos;이 아닙니다.
                  <br />
                  우리는 이혼을 겪는 모든 사람에게 새 삶의 기준을 제시하는 것입니다.
                </p>
                <div className="w-8 h-[1px] bg-[#C9A84C] mx-auto mt-5 md:mt-7" />
              </div>
            </div>

            {/* Message continued — Part 1 */}
            <section
              className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10 pt-8 md:pt-10"
              data-reveal
            >
              <div className="max-w-[1300px] mx-auto">
                <p className="text-[16px] md:text-[21px] text-[#2C2028] font-semibold leading-[2.0]">
                  {addLineBreaks(messageContinued[0])}
                </p>
              </div>
            </section>

            {/* Key statement — centered callout */}
            <div className="bg-[#F8F4EE] py-8 md:py-12 my-6 md:my-8 text-center" data-reveal>
              <div className="max-w-[560px] md:max-w-[800px] mx-auto px-8">
                <div className="w-6 h-[1px] bg-[#C9A84C] mx-auto mb-4 md:mb-6" />
                <p
                  className="text-[16px] md:text-[24px] text-[#2C2028] font-bold leading-[1.9]"
                  style={{ wordBreak: "keep-all" as const }}
                >
                  {messageContinued[1]}
                </p>
                <div className="w-6 h-[1px] bg-[#C9A84C] mx-auto mt-4 md:mt-6" />
              </div>
            </div>

            {/* Message continued — Part 2 with stat accent */}
            <section
              className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10 pb-6 md:pb-8"
              data-reveal
            >
              <div className="max-w-[1300px] mx-auto">
                {messageContinued.slice(2).map((paragraph: string, i: number) => (
                  <p
                    key={i}
                    className="text-[16px] md:text-[21px] text-[#2C2028] font-semibold leading-[2.0] mb-7 last:mb-0"
                  >
                    {addLineBreaks(paragraph)}
                  </p>
                ))}
              </div>
            </section>

            {/* Emotional full-width banner */}
            <section className="relative h-[180px] md:h-[340px] overflow-hidden" data-reveal>
              <Image
                src="/images/office/banner-about.jpg"
                alt="신세계로 사무실"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/55" />
              <div className="relative z-10 flex items-center justify-center h-full px-6">
                <blockquote className="text-center">
                  <p className="text-[13px] md:text-[16px] tracking-[0.35em] text-white/40 uppercase font-semibold mb-3 md:mb-5">Our Promise</p>
                  <p className="text-[18px] md:text-[40px] lg:text-[48px] font-light text-white leading-[1.6] tracking-tight" style={{ wordBreak: "keep-all" as const }}>
                    &ldquo;대한민국의 이혼 역사는<br />
                    <strong className="font-bold text-gold-400">신세계로의 역사</strong>입니다.&rdquo;
                  </p>
                </blockquote>
              </div>
            </section>

            {/* Closing + Signature — cream background */}
            <section
              className="bg-[#F8F4EE] py-8 md:py-24 text-center"
              data-reveal
            >
              <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10">
                <div className="w-[1px] h-8 md:h-10 bg-burgundy-500/20 mx-auto mb-6 md:mb-10" />
                <p
                  className="text-[20px] md:text-[42px] lg:text-[48px] font-bold text-gray-900 leading-[1.55] mb-8 md:mb-12 tracking-tight"
                  style={{ wordBreak: "keep-all" as const }}
                >
                  당신이 새로운 삶을 시작할 때,
                  <br />
                  가장 먼저 신뢰할 수 있는 이름,
                  <br />
                  그것이 바로{" "}
                  <span className="text-burgundy-500">신세계로</span>
                  입니다.
                </p>
                <div className="w-16 h-[1px] bg-burgundy-500/20 mx-auto mb-8" />
                <div className="inline-flex flex-col items-center">
                  <p className="text-[17px] text-burgundy-500/70 font-semibold tracking-wide mb-2">{signatory.org}</p>
                  <div className="flex items-baseline gap-3">
                    <span className="text-[17px] font-semibold text-[#333333]">
                      {signatory.title}
                    </span>
                    {signatory.signatureImage ? (
                      <div className="relative w-[110px] h-[44px]">
                        <Image
                          src={signatory.signatureImage}
                          alt={`${signatory.name} 서명`}
                          fill
                          className="object-contain"
                          sizes="110px"
                        />
                      </div>
                    ) : (
                      <span
                        className="text-[38px] text-gray-900"
                        style={{ fontFamily: "'Nanum Pen Script', cursive" }}
                      >
                        {signatory.name}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {/* Tab 1: 52년 법조전통 → 별도 페이지 이동 */}
        {activeTab === 1 && (
          <div className="max-w-[1600px] mx-auto px-5 md:px-8 lg:px-10 py-16 text-center">
            <p className="text-[17px] text-[#333333] mb-4">
              52년 법조전통 페이지로 이동합니다.
            </p>
            <Link
              href="/about/tradition"
              className="inline-flex items-center gap-2 text-[16px] text-burgundy-500 font-semibold hover:text-burgundy-700 transition-colors duration-200"
            >
              52년 법조전통 보러가기 <ArrowRight size={16} />
            </Link>
          </div>
        )}

        {/* Tab 2: 신세계로 시스템 → 별도 페이지 이동 */}
        {activeTab === 2 && (
          <div className="max-w-[1600px] mx-auto px-5 md:px-8 lg:px-10 py-16 text-center">
            <p className="text-[17px] text-[#333333] mb-4">
              신세계로 시스템 페이지로 이동합니다.
            </p>
            <Link
              href="/about/system"
              className="inline-flex items-center gap-2 text-[16px] text-burgundy-500 font-semibold hover:text-burgundy-700 transition-colors duration-200"
            >
              신세계로 시스템 보러가기 <ArrowRight size={16} />
            </Link>
          </div>
        )}

        {/* Tab 3: 오시는길 → 별도 페이지 이동 */}
        {activeTab === 3 && (
          <div className="max-w-[1600px] mx-auto px-5 md:px-8 lg:px-10 py-16 text-center">
            <p className="text-[17px] text-[#333333] mb-4">
              오시는길 페이지로 이동합니다.
            </p>
            <Link
              href="/about/location"
              className="inline-flex items-center gap-2 text-[16px] text-burgundy-500 font-semibold hover:text-burgundy-700 transition-colors duration-200"
            >
              오시는길 보러가기 <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>

    </div>
  );
}

export default function GreetingPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-[1600px] mx-auto px-5 md:px-8 lg:px-10 py-20 text-center">
          <p className="text-[#444444]">로딩 중...</p>
        </div>
      }
    >
      <GreetingContent />
    </Suspense>
  );
}
