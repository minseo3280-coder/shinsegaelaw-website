"use client";

import { useEffect, useRef, useState } from "react";
import { Phone, ClipboardList, Scale, CheckCircle } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const steps = [
  {
    icon: Phone,
    number: "01",
    title: "상담 신청",
    description: "전화, 카카오톡, 온라인\n폼으로 간편 접수",
  },
  {
    icon: ClipboardList,
    number: "02",
    title: "사건 접수",
    description: "담당 전문 변호사\n배정 및 사건 분석",
  },
  {
    icon: Scale,
    number: "03",
    title: "전략 수립",
    description: "맞춤 법률 전략 설계\n및 방향 협의",
  },
  {
    icon: CheckCircle,
    number: "04",
    title: "소송 진행",
    description: "최종 판결까지\n끝까지 함께합니다",
  },
];

export default function ConsultationProcess() {
  const stepsRef = useRef<HTMLDivElement>(null);
  const [activated, setActivated] = useState(false);

  useEffect(() => {
    const el = stepsRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActivated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 md:py-28 lg:py-36 bg-stone-50">
      <div className="max-w-[1600px] mx-auto px-5 md:px-8 lg:px-10">
        {/* Header */}
        <ScrollReveal className="text-center mb-16 md:mb-20">
          <p className="text-xs tracking-[0.3em] text-burgundy-500 font-semibold uppercase mb-4">
            Process
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-navy-900 mb-5 tracking-tight">
            상담 절차 안내
          </h2>
          <div className="w-12 h-1 bg-gold-500 mx-auto mb-6" />
          <p className="text-base md:text-lg text-[#444444] max-w-lg mx-auto leading-relaxed">
            초기 상담부터 최종 판결까지, 4단계로 체계적으로 진행합니다.
          </p>
        </ScrollReveal>

        {/* Steps */}
        <div ref={stepsRef} className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6 relative">
          {/* Connecting Line (desktop) */}
          <div className="hidden md:block absolute top-14 left-[12%] right-[12%] h-[2px] bg-gold-400" />

          {steps.map((step, i) => (
            <div key={step.number} className="relative text-center">
              {/* Circle */}
              <div
                className={`relative z-10 w-28 h-28 rounded-full bg-white border-2 border-burgundy-400 flex flex-col items-center justify-center mx-auto mb-6 shadow-sm ${
                  activated ? "animate-[pulse_0.8s_ease-in-out_1]" : ""
                }`}
                style={activated ? { animationDelay: `${i * 300}ms`, animationFillMode: "both" } : undefined}
              >
                <step.icon className="w-7 h-7 text-burgundy-500 mb-1" />
                <span className="text-[10px] tracking-wider text-gold-600 font-semibold">
                  STEP {step.number}
                </span>
              </div>

              <h4 className="text-lg font-bold text-navy-900 mb-3">
                {step.title}
              </h4>
              <p className="text-sm text-[#444444] leading-relaxed whitespace-pre-line">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
