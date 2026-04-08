"use client";

import ScrollReveal from "@/components/ScrollReveal";

export default function StorySection() {
  return (
    <section className="relative py-28 md:py-36 lg:py-44 bg-[#0f0f1a] overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-burgundy-500 opacity-[0.04] blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10 text-center">
        {/* Main emotional copy */}
        <ScrollReveal>
          <p className="text-[15px] tracking-[0.3em] text-gold-500/30 uppercase font-semibold mb-10">
            Our Philosophy
          </p>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <h2
            className="text-[28px] md:text-[40px] lg:text-[48px] font-bold text-white leading-[1.6] md:leading-[1.7] tracking-tight mb-10"
            style={{ wordBreak: "keep-all" }}
          >
            이혼은 <span className="text-gold-400">절차</span>가 아니라{" "}
            <span className="text-gold-400">전쟁</span>입니다.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={400}>
          <div className="w-16 h-[1px] bg-gold-500/20 mx-auto mb-10" />
        </ScrollReveal>

        <ScrollReveal delay={500}>
          <p
            className="text-[18px] md:text-[21px] lg:text-[23px] text-white/40 leading-[2] md:leading-[2.2] mb-8"
            style={{ wordBreak: "keep-all" }}
          >
            법은 감정의 언어를 이해하지 않습니다.<br className="hidden md:block" />
            법은 차갑게 정리된 사실, 정밀하게 배열된 증거,<br className="hidden md:block" />
            그리고 논리로 직조된 문서를 통해서만 움직입니다.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={600}>
          <p
            className="text-[18px] md:text-[21px] lg:text-[23px] text-white/40 leading-[2] md:leading-[2.2] mb-8"
            style={{ wordBreak: "keep-all" }}
          >
            재산 분할의 비율, 자녀의 양육권 귀속, 위자료 청구의 범위 —<br className="hidden md:block" />
            그 하나하나가 당신의 재정, 명예,<br className="hidden md:block" />
            그리고 <span className="text-white/70 font-semibold">삶의 궤적</span>을 근본적으로 바꿉니다.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={700}>
          <p
            className="text-[18px] md:text-[21px] lg:text-[23px] text-white/40 leading-[2] md:leading-[2.2]"
            style={{ wordBreak: "keep-all" }}
          >
            그 무대 위에서 승부를 가르는 것은<br className="hidden md:block" />
            오직 <span className="text-gold-400 font-bold">전략</span>입니다.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
