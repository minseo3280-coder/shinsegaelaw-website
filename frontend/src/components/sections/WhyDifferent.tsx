"use client";

import ScrollReveal from "@/components/ScrollReveal";

const features = [
  {
    num: "01",
    title: "데이터 기반 전략",
    desc: "1,053건의 승소 데이터를 분석하여 사건별 최적의 전략을 설계합니다.",
  },
  {
    num: "02",
    title: "7개 전문팀 체제",
    desc: "이혼\u00B7재산분할\u00B7위자료\u00B7양육권\u00B7상간\u00B7형사\u00B7상속, 분야별 전문가가 협업합니다.",
  },
  {
    num: "03",
    title: "끝까지 함께",
    desc: "초반 상담부터 최종 판결까지, 대표변호사가 직접 사건을 총괄합니다.",
  },
];

export default function WhyDifferent() {
  return (
    <section id="why" className="bg-white py-12 md:py-28 lg:py-36">
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 text-center">
        {/* English label */}
        <ScrollReveal>
          <p
            className="text-[14px] md:text-[16px] tracking-[0.35em] uppercase font-bold text-burgundy-500/70 mb-3 md:mb-6"
          >
            WHY SHINSEGAERO
          </p>
        </ScrollReveal>

        {/* Main headline */}
        <ScrollReveal delay={100}>
          <h2
            className="text-[22px] md:text-[48px] lg:text-[56px] font-bold text-[#2C2028] leading-[1.35] md:leading-[1.25]"
            style={{ wordBreak: "keep-all" }}
          >
            우리는 단순히 법정에서
            <br />
            목소리를 대신하는 사람이 아닙니다.
          </h2>
        </ScrollReveal>

        {/* Gold divider */}
        <ScrollReveal delay={200}>
          <div className="w-12 md:w-16 h-[2px] bg-burgundy-500/30 mx-auto mt-5 md:mt-8 mb-6 md:mb-10" />
        </ScrollReveal>

        {/* Body paragraph */}
        <ScrollReveal delay={300}>
          <div
            className="text-[14px] md:text-[19px] text-[#333333] leading-[1.85] md:leading-[2] max-w-[720px] mx-auto"
            style={{ wordBreak: "keep-all" }}
          >
            <p>
              &lsquo;이혼전문&rsquo;이라는 호칭은 누구나 사용할 수 있습니다.
              <br />
              대한변호사협회 기준, 월 1건 정도의 사건만 다루어도
              <br />
              &lsquo;전문&rsquo; 변호사를 표방할 수 있습니다.
            </p>
            <p className="mt-5 md:mt-8">
              그러나 신세계로는 다릅니다.
              <br />
              52년간 오직 가족법 한 분야에만 집중하며,
              <br />
              판례를 데이터화하여 사건별 유리한 패턴을 추출하고,
              <br />
              판결이 도출되는 전 과정을 지휘하는 전략 설계자입니다.
            </p>
          </div>
        </ScrollReveal>

        {/* Three feature items */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-10 md:mt-16">
          {features.map((item, i) => (
            <ScrollReveal key={item.num} delay={400 + i * 120}>
              <div className="flex md:block items-start gap-4 md:text-center text-left">
                <span className="block text-[28px] md:text-[48px] font-bold leading-none text-burgundy-500 opacity-20 flex-shrink-0 md:mx-auto">
                  {item.num}
                </span>
                <div>
                  <h3
                    className="text-[16px] md:text-[22px] font-bold text-[#2C2028] md:mt-4 mb-1 md:mb-3"
                    style={{ wordBreak: "keep-all" }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-[14px] md:text-[16px] text-[#333333] leading-[1.7] md:leading-[1.8]"
                    style={{ wordBreak: "keep-all" }}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
