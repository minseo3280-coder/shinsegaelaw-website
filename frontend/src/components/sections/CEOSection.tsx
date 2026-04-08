"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, GraduationCap, Radio, Medal } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import lawyersData from "@/../../data/lawyers.json";

const ceo = lawyersData.lawyers.find((l) => l.is_representative);

const credentials = [
  { icon: Medal, text: "조두순 사건 승소 · 여성가족부 장관상 표창" },
  { icon: Award, text: "가족법 박사학위 취득" },
  { icon: GraduationCap, text: "이화여대 로스쿨 겸임교수" },
  { icon: Radio, text: "YTN 라디오 「조인섭 변호사의 상담소」 진행" },
];

function ClipRevealImage({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sentinelRef} className="relative">
      <div className={`${className} ${revealed ? "clip-reveal-visible" : ""}`}
        style={!revealed ? { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" } : undefined}>
        {children}
      </div>
    </div>
  );
}

export default function CEOSection() {
  if (!ceo) return null;

  return (
    <section className="py-12 md:py-28 lg:py-36 bg-white" id="ceo">
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left — CEO Photo (모바일: 컴팩트, 데스크톱: 풀 사이즈) */}
          {/* Mobile CEO photo */}
          <div className="relative lg:hidden">
            <div className="flex items-start gap-4">
              <div className="relative w-[100px] h-[130px] rounded-lg overflow-hidden flex-shrink-0 bg-[#E8E0D8]">
                <Image
                  src={ceo.profile_image}
                  alt={`${ceo.name} ${ceo.position}`}
                  fill
                  className="object-cover object-top"
                  sizes="100px"
                />
              </div>
              <div className="pt-1">
                <p className="text-[14px] tracking-[0.2em] text-burgundy-500/60 font-bold uppercase mb-1">가족법전문 제1호 변호사</p>
                <p className="text-[22px] font-bold text-[#2C2028] tracking-tight leading-tight">{ceo.name}</p>
                <p className="text-[14px] text-[#666666] mt-1">{ceo.position}</p>
              </div>
            </div>
          </div>

          {/* Desktop CEO Photo */}
          <div className="relative hidden lg:block">
            <ClipRevealImage className="relative aspect-[3/4] max-w-[520px] mx-auto lg:mx-0 rounded-2xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.12)]">
              <Image
                src={ceo.profile_image}
                alt={`${ceo.name} ${ceo.position}`}
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 480px"
                priority
              />
              {/* Subtle gradient overlay at bottom */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-[16px] text-white/60 font-semibold tracking-wider mb-1">대표 변호사</p>
                <p className="text-[24px] md:text-[36px] font-bold text-white tracking-tight">{ceo.name}</p>
              </div>
            </ClipRevealImage>
          </div>

          {/* Right — Content */}
          <ScrollReveal delay={200}>
            <div>
              {/* Label — hidden on mobile (shown in mobile photo block above) */}
              <p className="hidden lg:block text-[15px] tracking-[0.3em] text-burgundy-500/70 font-bold uppercase mb-6">
                가족법전문 제1호 변호사
              </p>

              {/* Main headline */}
              <h2
                className="text-[24px] md:text-[48px] lg:text-[56px] font-bold text-[#2C2028] leading-[1.3] tracking-tight mb-4 md:mb-8"
                style={{ wordBreak: "keep-all" }}
              >
                이혼은 <span className="text-burgundy-600">절차</span>가 아니라<br />
                <span className="text-burgundy-600">전쟁</span>입니다.
              </h2>

              {/* Sub copy — first block */}
              <p
                className="text-[15px] md:text-[19px] text-[#333333] leading-[1.85] md:leading-[1.9] mb-4"
                style={{ wordBreak: "keep-all" }}
              >
                법은 감정의 언어를 이해하지 않습니다.<br />
                법은 차갑게 정리된 사실, 정밀하게 배열된 증거,<br className="hidden md:block" />
                그리고 논리로 직조된 문서를 통해서만 움직입니다.
              </p>

              {/* Sub copy — second block (from CEO's original) */}
              <p
                className="hidden md:block text-[18px] text-[#333333] leading-[1.9] mb-10"
                style={{ wordBreak: "keep-all" }}
              >
                재판부는 기록으로 사건을 기억하고,<br />
                상대방은 그 기록을 무기로 전략을 세웁니다.<br />
                초반의 단 한 걸음이, 최종 판결까지 그림자를 드리웁니다.
              </p>

              {/* Credentials */}
              <div className="space-y-2.5 md:space-y-4 mb-5 md:mb-10">
                {credentials.map((cred) => (
                  <div key={cred.text} className="flex items-center gap-3 md:gap-4">
                    <div className="w-9 h-9 md:w-11 md:h-11 rounded-full bg-burgundy-50 flex items-center justify-center flex-shrink-0">
                      <cred.icon size={16} className="text-burgundy-500 md:!w-5 md:!h-5" />
                    </div>
                    <p className="text-[15px] md:text-[18px] text-[#333333] font-semibold leading-snug">{cred.text}</p>
                  </div>
                ))}
              </div>

              {/* Emotional Quote + CTA */}
              <div className="border-l-[3px] border-burgundy-500 pl-4 md:pl-6 my-6 md:my-10">
                <blockquote className="text-[16px] md:text-[26px] font-medium text-[#2C2028] leading-[1.75] md:leading-[1.8] mb-4 md:mb-6">
                  &ldquo;소장의 한 문단,<br />준비서면의 한 줄,<br />
                  답변서의 작은 누락이<br />
                  <strong className="text-burgundy-500 font-semibold not-italic">당신의 재산, 자녀, 미래를 좌우합니다.</strong>&rdquo;
                </blockquote>

                <Link
                  href={`/about/lawyers/${ceo.id}`}
                  className="inline-flex items-center gap-2 md:gap-3 text-[15px] md:text-[22px] text-burgundy-600 font-semibold tracking-wide hover:text-burgundy-700 transition-colors duration-300 group"
                >
                  조인섭 변호사 자세히보기
                  <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform duration-300 md:!w-5 md:!h-5" />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
