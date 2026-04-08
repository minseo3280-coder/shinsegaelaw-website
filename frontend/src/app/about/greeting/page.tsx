"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import SubPageHero from "@/components/shared/SubPageHero";
import greetingData from "@/../../data/greeting.json";
import AboutTabs from "@/components/shared/AboutTabs";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/* ── CountUp hook ── */
function useCountUp(target: number, duration: number = 1800) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
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
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [started, target, duration]);

  return { count, ref };
}

function StatItem({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { count, ref } = useCountUp(value);
  return (
    <div className="text-center" ref={ref}>
      <p className="text-[28px] md:text-[48px] font-bold text-[#9B2335] leading-none tracking-tight" style={{ fontVariantNumeric: "tabular-nums" }}>
        {count.toLocaleString()}
        <span className="text-[14px] md:text-[20px] font-semibold text-[#2C2028] ml-0.5">{suffix}</span>
      </p>
      <p className="text-[13px] md:text-[15px] text-[#888888] mt-1.5 md:mt-2 tracking-wide">{label}</p>
    </div>
  );
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

  const { representatives, signatory } = greetingData;

  return (
    <div ref={revealRef}>
      <SubPageHero
        titleEn="GREETINGS"
        titleKo="인사말"
        bannerImage="/images/office/banner-about.jpg"
        breadcrumbs={[
          { label: "신세계로", href: "/about/greeting" },
          { label: "인사말" },
        ]}
      />
      <AboutTabs activeTab={activeTab} />

      <div role="tabpanel">
        {activeTab === 0 && (
          <>
            {/* ══════════════════════════════════════════
                Section 1: Headline — 좌측 정렬 대형 헤더
            ══════════════════════════════════════════ */}
            <section className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10 pt-14 md:pt-20" data-reveal>
              <p className="text-[13px] md:text-[15px] tracking-[0.3em] text-[#C9A84C] uppercase font-bold mb-3">
                About Shinsegaero
              </p>
              <h2
                className="text-[22px] md:text-[44px] lg:text-[50px] font-bold text-[#2C2028] leading-[1.35] tracking-tight"
                style={{ wordBreak: "keep-all" }}
              >
                이혼은 실패가 아닙니다.<br />
                삶의 존엄을 지키기 위한<br className="md:hidden" /> <span className="text-[#9B2335]">&lsquo;존엄한 선택&rsquo;</span>입니다.
              </h2>
              <p
                className="text-[15px] md:text-[21px] text-[#333333] leading-[1.9] mt-3 md:mt-5 max-w-[900px]"
                style={{ wordBreak: "keep-all" }}
              >
                &lsquo;이혼 전문가&rsquo;조차 없던 시절, 신세계로는 가족법을 독립된 법률 분야로 바라보고<br className="hidden md:block" />
                오직 가족법에만 집중해왔습니다. 그것이 52년 전통의 시작이었습니다.
              </p>
            </section>


            {/* ══════════════════════════════════════════
                Section 2: Stats Band
            ══════════════════════════════════════════ */}
            <div className="py-10 md:py-10 mt-12 md:mt-14" data-reveal>
              <div className="max-w-[600px] md:max-w-[900px] mx-auto px-5">
                <div className="grid grid-cols-3 gap-6 md:gap-8 text-center">
                  <StatItem value={52} suffix="년" label="법조 전통" />
                  <StatItem value={22} suffix="인" label="전문 변호사" />
                  <StatItem value={1053} suffix="건+" label="누적 승소사례" />
                </div>
              </div>
            </div>


            {/* ══════════════════════════════════════════
                Section 3: 대표변호사 프로필
            ══════════════════════════════════════════ */}
            <section className="bg-white py-14 md:py-20" data-reveal>
              <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10">
                <p className="text-[13px] md:text-[15px] tracking-[0.3em] text-[#C9A84C] uppercase font-bold mb-3">
                  Representative
                </p>
                <h3
                  className="text-[20px] md:text-[38px] font-bold text-[#2C2028] leading-[1.35] tracking-tight mb-3 md:mb-4"
                  style={{ wordBreak: "keep-all" }}
                >
                  신세계로를 이끄는 <span className="text-[#9B2335]">리더십</span>
                </h3>
                <p className="text-[15px] md:text-[21px] text-[#333333] leading-[1.9] max-w-[800px] mb-10 md:mb-14">
                  대한변협 가족법 전문 제1호 변호사가 직접 이끄는 법무법인 신세계로.<br />
                  52년 법조 전통 위에 전문성과 신뢰를 쌓아왔습니다.
                </p>

                {/* 대표 프로필 카드 */}
                <div className="flex flex-col md:flex-row gap-6 md:gap-10">
                  {/* 사진 */}
                  <div className="relative w-full md:w-[380px] flex-shrink-0 overflow-hidden bg-[#F0EBE4]">
                    <Image
                      src="/images/about/rep-joinsub.jpg"
                      alt="조인섭 대표변호사"
                      width={380}
                      height={480}
                      className="w-full h-auto object-cover"
                      priority
                    />
                    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 via-black/20 to-transparent p-5 md:p-6">
                      <span className="inline-block px-2.5 py-1 bg-[#9B2335] text-white text-[11px] md:text-[13px] tracking-[0.15em] font-bold uppercase mb-2">
                        대표변호사
                      </span>
                      <h4 className="text-[22px] md:text-[32px] font-extrabold text-white leading-tight">
                        {representatives[1].name}
                        <span className="text-[14px] md:text-[18px] font-bold text-white/70 ml-2">변호사</span>
                      </h4>
                    </div>
                  </div>

                  {/* 텍스트 */}
                  <div className="flex-1 min-w-0 flex flex-col md:justify-between gap-6 md:gap-0">
                    {/* 상단: 소개 */}
                    <div>
                      <p className="text-[14px] md:text-[14px] text-[#999999] tracking-wide mb-1">
                        {representatives[1].role}
                      </p>
                      <p
                        className="text-[15px] md:text-[18px] text-[#333333] leading-[1.9] mt-4 md:mt-5"
                        style={{ wordBreak: "keep-all" }}
                      >
                        가족법이라는 분야가 제대로 인정받지 못하던 시절부터, 신세계로는 이혼을 &lsquo;존엄한 선택&rsquo;으로 바라보며 오직 가족법에 집중해왔습니다.
                        왜 존중받지 못해야 합니까? 오히려 이혼이야말로 한 사람의 인생과 가정의 명운을 걸고, 인권과 존엄을 바로 세우기 위한 &lsquo;법&rsquo;을 실현할 수 있는 가장 치열한 분야였습니다.
                      </p>
                    </div>

                    {/* 중단: 배지 + 인용 */}
                    <div>
                      <div className="flex flex-wrap gap-2">
                        {["사법시험 43회", "가족법 박사", "전문 제1호", "로스쿨 겸임교수"].map((tag, i) => (
                          <span key={i} className="inline-block px-3 py-1.5 bg-[#F8F4EE] text-[12px] md:text-[13px] text-[#555555] font-medium tracking-wide">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="mt-5 md:mt-6 pl-5 border-l-[2px] border-[#C9A84C]">
                        <p className="text-[14px] md:text-[16px] text-[#555555] leading-[1.85] italic" style={{ wordBreak: "keep-all" }}>
                          &ldquo;법원의 기록은 결코 거짓을 말하지 않습니다.
                          오직 결과로만 증명해온 52년, 그것이 신세계로입니다.&rdquo;
                        </p>
                      </div>
                    </div>

                    {/* 하단: 프로필 링크 */}
                    <Link
                      href="/about/lawyers/cho-inseop"
                      className="inline-flex items-center gap-1.5 text-[14px] md:text-[16px] text-[#9B2335] font-semibold hover:gap-2.5 transition-all duration-300"
                    >
                      프로필 보기 <ArrowUpRight size={15} />
                    </Link>
                  </div>
                </div>
              </div>
            </section>


            {/* ══════════════════════════════════════════
                Section 4: Quote Band — "왜 하필 이혼 전문인가?"
            ══════════════════════════════════════════ */}
            <div className="bg-[#F8F4EE] py-14 md:py-16" data-reveal>
              <div className="max-w-[560px] md:max-w-[900px] mx-auto px-8 md:px-10 text-center">
                <p
                  className="text-[15px] md:text-[24px] text-[#2C2028] font-bold leading-[1.9] md:leading-[1.8]"
                  style={{ wordBreak: "keep-all" }}
                >
                  &ldquo;왜 하필 이혼 전문인가?&rdquo; &ldquo;변호사가 무슨 이혼을 전문으로 해?&rdquo;<br />
                  — 쉬운 길은 아니었습니다. 하지만 신세계로는 흔들리지 않았습니다.
                </p>
              </div>
            </div>


            {/* ══════════════════════════════════════════
                Section 5: 스토리 — 1열 넓은 여백
            ══════════════════════════════════════════ */}
            <section className="bg-white py-14 md:py-20" data-reveal>
              <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10">
                <p className="text-[13px] md:text-[15px] tracking-[0.3em] text-[#C9A84C] uppercase font-bold mb-3">
                  Our Story
                </p>
                <h3
                  className="text-[20px] md:text-[38px] font-bold text-[#2C2028] leading-[1.35] tracking-tight mb-8 md:mb-12"
                  style={{ wordBreak: "keep-all" }}
                >
                  대한민국 <span className="text-[#9B2335]">이혼 역사</span>를 써 내려온 길
                </h3>

                {/* 2열 — 도입 + 풀쿼트 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 mb-10 md:mb-14">
                  <div className="space-y-6">
                    <p className="text-[15px] md:text-[18px] text-[#333333] leading-[2]" style={{ wordBreak: "keep-all" }}>
                      &#39;이혼&#39;이라는 단어를 입에 담기조차 어려워했던 시절이 있었습니다.<br />
                      당시에 이혼은 개인의 실패이자 가족의 치부였으니까요.<br />
                      그래서인지 제대로 된 &#39;이혼 전문가&#39;조차 없었습니다.
                    </p>
                    <p className="text-[15px] md:text-[18px] text-[#333333] leading-[2]" style={{ wordBreak: "keep-all" }}>
                      그러나 신세계로의 생각은 달랐습니다.<br />
                      그래서 신세계로는 가족법을 &#39;연구하고 정립해야 할 독립된 법률 분야&#39;로 바라보고, 오직 가족법에 집중하기 시작했습니다.
                    </p>
                  </div>
                  {/* 우측: Pull Quote */}
                  <div className="flex items-center">
                    <div className="pl-6 md:pl-8 border-l-[3px] border-[#9B2335]">
                      <p
                        className="font-serif text-[17px] md:text-[22px] text-[#2C2028] leading-[1.7] font-medium"
                        style={{ wordBreak: "keep-all" }}
                      >
                        이혼이야말로 한 사람의 인생과 가정의 명운을 걸고, 인권과 존엄을 바로 세우기 위한 &#39;법&#39;을 실현할 수 있는 가장 치열한 분야였습니다.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 3-Column 포인트 카드 — 화면 꽉 채움 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-10 md:mb-14">
                  <div className="bg-[#F8F4EE] p-5 md:p-7 rounded-sm">
                    <p className="text-[11px] md:text-[13px] tracking-[0.2em] text-[#C9A84C] uppercase font-bold mb-3">Dedication</p>
                    <p className="text-[14px] md:text-[16px] text-[#333333] leading-[1.85]" style={{ wordBreak: "keep-all" }}>
                      이혼의 현실을 철저히 연구했고, 이혼이 필요한 사람들에게 합법적이고 당당한 길을 열어주었습니다.
                    </p>
                  </div>
                  <div className="bg-[#F8F4EE] p-5 md:p-7 rounded-sm">
                    <p className="text-[11px] md:text-[13px] tracking-[0.2em] text-[#C9A84C] uppercase font-bold mb-3">Proof</p>
                    <p className="text-[14px] md:text-[16px] text-[#333333] leading-[1.85]" style={{ wordBreak: "keep-all" }}>
                      그렇게 신세계로는 증명했습니다.<br />
                      이혼이 부끄러운 일이 아니라, 삶의 존엄을 지키기 위한 용기 있는 선택이라는 것을.
                    </p>
                  </div>
                  <div className="bg-[#F8F4EE] p-5 md:p-7 rounded-sm">
                    <p className="text-[11px] md:text-[13px] tracking-[0.2em] text-[#C9A84C] uppercase font-bold mb-3">Legacy</p>
                    <p className="text-[14px] md:text-[16px] text-[#333333] leading-[1.85]" style={{ wordBreak: "keep-all" }}>
                      &#39;전문변호사&#39;라는 제도조차 생기기 전에, 신세계로는 이미 판례를 만들어내며 가족법의 흐름을 주도했습니다.
                    </p>
                  </div>
                </div>

                {/* 클로징 강조 문구 */}
                <div className="pt-8 md:pt-10">
                  <p
                    className="text-[18px] md:text-[28px] font-bold text-[#2C2028] leading-[1.6]"
                    style={{ wordBreak: "keep-all" }}
                  >
                    23년, 대한민국 이혼과 가족법의 모든 주요한 변화는
                    <br className="hidden md:block" />
                    <span className="text-[#9B2335]">신세계로의 문턱을 거쳐</span> 세상으로 나갔습니다.
                  </p>
                </div>
              </div>
            </section>


            {/* ══════════════════════════════════════════
                Section 6: 핵심 성과 3열 카드
            ══════════════════════════════════════════ */}
            <section className="bg-[#F8F4EE] py-14 md:py-20" data-reveal>
              <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10">
                <p className="text-[13px] md:text-[15px] tracking-[0.3em] text-[#C9A84C] uppercase font-bold mb-3">
                  Achievements
                </p>
                <h3
                  className="text-[20px] md:text-[38px] font-bold text-[#2C2028] leading-[1.35] tracking-tight mb-8 md:mb-12"
                  style={{ wordBreak: "keep-all" }}
                >
                  <span className="text-[#9B2335]">기록</span>으로 증명하는 전문성
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                  {[
                    {
                      year: "2016",
                      title: "가족법 전문 제1호 변호사",
                      desc: "대한변호사협회 전문변호사 제도 강화 후, 엄격한 심사를 거쳐 제1호 가족법 전문변호사로 등록",
                    },
                    {
                      year: "2012",
                      title: "조두순 사건 국가배상 승소",
                      desc: "법의 정의를 실현한 대표 사건으로, 사회적으로 큰 반향을 일으킨 역사적 판례",
                    },
                    {
                      year: "2012",
                      title: "여성가족부 장관 표창",
                      desc: "가정폭력 피해자 보호와 권리 옹호에 기여한 공로로 여성가족부 장관 표창 수상",
                    },
                  ].map((item, i) => (
                    <div key={i} className="bg-white border-l-[3px] border-l-[#9B2335] border border-gray-200 p-6 md:p-7 rounded-sm shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all duration-300">
                      <p className="text-[20px] md:text-[24px] font-bold text-[#C9A84C] mb-3 font-serif">{item.year}</p>
                      <p className="text-[16px] md:text-[18px] font-bold text-[#2C2028] mb-3 leading-snug">{item.title}</p>
                      <p className="text-[13px] md:text-[15px] text-[#555555] leading-[1.8]" style={{ wordBreak: "keep-all" }}>{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>


            {/* ══════════════════════════════════════════
                Section 7: 클로징 + 서명
            ══════════════════════════════════════════ */}
            <section className="bg-[#1A1A2E] py-20 md:py-28" data-reveal>
              <div className="max-w-[800px] mx-auto px-5 text-center">
                {/* 버건디 악센트 라인 */}

                <p
                  className="font-serif text-[26px] md:text-[42px] font-bold text-white leading-[1.5] mb-6 md:mb-8"
                  style={{ wordBreak: "keep-all" }}
                >
                  &ldquo;대한민국의 이혼 역사는<br />
                  곧 <span className="text-[#C9A84C]">신세계로</span>의 역사입니다.&rdquo;
                </p>
                <p className="text-[14px] md:text-[17px] text-white/60 leading-[1.9] mb-10 md:mb-14" style={{ wordBreak: "keep-all" }}>
                  당신이 새로운 삶을 시작할 때,<br />
                  가장 먼저 신뢰할 수 있는 이름.<br />
                  그것이 바로 <span className="font-semibold text-white/90">법무법인 신세계로</span>입니다.
                </p>

                <div className="pt-8 md:pt-10 border-t border-white/10">
                  <p className="text-[11px] md:text-[13px] tracking-[0.25em] text-white/40 uppercase mb-5">
                    Managing Partner
                  </p>
                  <p className="text-[38px] md:text-[48px] text-white" style={{ fontFamily: "'Nanum Pen Script', cursive" }}>
                    {signatory.name}
                  </p>
                </div>
              </div>
            </section>
          </>
        )}

        {activeTab === 1 && (
          <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10 py-16 text-center">
            <p className="text-[17px] text-[#333] mb-4">52년 법조전통 페이지로 이동합니다.</p>
            <Link href="/about/tradition" className="inline-flex items-center gap-2 text-[16px] text-burgundy-500 font-semibold hover:text-burgundy-700 transition-colors duration-200">
              52년 법조전통 보러가기 <ArrowRight size={16} />
            </Link>
          </div>
        )}
        {activeTab === 2 && (
          <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10 py-16 text-center">
            <p className="text-[17px] text-[#333] mb-4">신세계로 시스템 페이지로 이동합니다.</p>
            <Link href="/about/system" className="inline-flex items-center gap-2 text-[16px] text-burgundy-500 font-semibold hover:text-burgundy-700 transition-colors duration-200">
              신세계로 시스템 보러가기 <ArrowRight size={16} />
            </Link>
          </div>
        )}
        {activeTab === 3 && (
          <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10 py-16 text-center">
            <p className="text-[17px] text-[#333] mb-4">오시는길 페이지로 이동합니다.</p>
            <Link href="/about/location" className="inline-flex items-center gap-2 text-[16px] text-burgundy-500 font-semibold hover:text-burgundy-700 transition-colors duration-200">
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
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10 py-20 text-center">
          <p className="text-[#444]">로딩 중...</p>
        </div>
      }
    >
      <GreetingContent />
    </Suspense>
  );
}
