"use client";

import { useState } from "react";
import { Check, ArrowRight, ArrowLeft, CheckCircle, Phone } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import firmData from "@/../../data/firm_info.json";

const STEPS = [
  {
    question: "어떤 부분이 궁금하신가요?",
    options: [
      "이혼소송",
      "외도/상간",
      "조정/협의이혼",
      "양육비/양육권",
      "재산분할",
      "기타",
    ],
  },
  {
    question: "현재 상황을 알려주세요.",
    options: [
      "이혼을 고려 중입니다",
      "이혼을 결정했습니다",
      "소장을 받았습니다",
      "조정/심판 진행 중입니다",
      "상대방이 이혼을 요구합니다",
      "기타 상황",
    ],
  },
  {
    question: "자녀가 있으신가요?",
    options: [
      "미성년 자녀가 있습니다",
      "성년 자녀만 있습니다",
      "자녀가 없습니다",
    ],
  },
  {
    question: "재산분할이 필요하신가요?",
    options: [
      "부동산이 있습니다",
      "금융 재산이 있습니다",
      "부동산 + 금융 재산 모두",
      "재산분할은 필요 없습니다",
    ],
  },
];

const TOTAL_STEPS = STEPS.length + 1; // +1 for contact info

export default function CaseWizard() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(STEPS.length).fill(""));
  const [contactInfo, setContactInfo] = useState({ name: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (option: string) => {
    const newAnswers = [...answers];
    newAnswers[step] = option;
    setAnswers(newAnswers);
  };

  const canProceed = step < STEPS.length ? answers[step] !== "" : (contactInfo.name !== "" && contactInfo.phone !== "");

  const handleNext = () => {
    if (!canProceed) return;
    if (step < TOTAL_STEPS - 1) {
      setStep(step + 1);
    } else {
      setSubmitted(true);
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const progress = ((step + 1) / TOTAL_STEPS) * 100;

  return (
    <section id="wizard" className="py-12 md:py-28 lg:py-36 bg-[#EFEBE5]">
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 items-center">

          {/* Left — Headline */}
          <ScrollReveal>
            <div>
              <h2
                className="text-[24px] md:text-[44px] lg:text-[52px] font-black text-[#2C2028] leading-[1.3] md:leading-[1.25] tracking-tight mb-4 md:mb-6"
                style={{ wordBreak: "keep-all" }}
              >
                감정은 잠시<br />
                내려놓으십시오.<br />
                <span className="text-burgundy-500">전략</span>이 답합니다.
              </h2>

              <div className="w-8 md:w-10 h-[2px] bg-[#2C2028]/20 mb-4 md:mb-6" />

              <p
                className="text-[14px] md:text-[18px] font-bold text-[#2C2028] leading-[1.6] md:leading-[1.7] mb-1.5 md:mb-2"
                style={{ wordBreak: "keep-all" }}
              >
                딱 1분이면 <span className="text-burgundy-500">사건의 핵심 쟁점</span>을 파악할 수 있습니다.
              </p>

              <p
                className="text-[14px] md:text-[15px] text-[#6B5E64] leading-[1.7] md:leading-[1.8]"
                style={{ wordBreak: "keep-all" }}
              >
                간단한 질문에 답하시면,<br />
                52년 경험의 가족법 전문 변호사가 맞춤 분석을 제공합니다.
              </p>
            </div>
          </ScrollReveal>

          {/* Right — Wizard Card */}
          <ScrollReveal delay={150}>
            <div className="bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.08)] overflow-hidden">
              {/* Header */}
              <div className="px-6 pt-6 pb-4">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[14px] md:text-[15px] text-burgundy-500 font-bold">
                    간단한 질문에 답변 해주세요.
                  </p>
                  <span className="text-[15px] text-[#999] font-semibold">
                    <span className="text-burgundy-500">{step + 1}</span> / {TOTAL_STEPS}
                  </span>
                </div>
                {/* Progress bar */}
                <div className="w-full h-[4px] bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-burgundy-500 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Body */}
              <div className="px-6 pb-6">
                {submitted ? (
                  /* Completion state */
                  <div className="text-center py-10">
                    <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-500" />
                    </div>
                    <p className="text-[18px] font-bold text-[#2C2028] mb-2">
                      신청이 완료되었습니다
                    </p>
                    <p className="text-[14px] text-[#666] mb-6">
                      전문 변호사가 빠른 시간 내 연락드리겠습니다.
                    </p>
                    <a
                      href={`tel:${firmData.main_phone}`}
                      className="inline-flex items-center gap-2 text-[15px] text-burgundy-500 font-semibold hover:text-burgundy-600 transition-colors"
                    >
                      <Phone size={14} />
                      바로 전화 상담: {firmData.main_phone}
                    </a>
                  </div>
                ) : step < STEPS.length ? (
                  /* Question steps */
                  <div>
                    <p className="text-[16px] md:text-[18px] font-bold text-[#2C2028] mb-5">
                      Q{step + 1}. {STEPS[step].question}
                    </p>

                    <div className="space-y-2.5">
                      {STEPS[step].options.map((option) => {
                        const isSelected = answers[step] === option;
                        return (
                          <button
                            key={option}
                            onClick={() => handleSelect(option)}
                            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-lg border text-left transition-all duration-200 ${
                              isSelected
                                ? "border-burgundy-500 bg-burgundy-50/50"
                                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                            }`}
                          >
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                              isSelected
                                ? "border-burgundy-500 bg-burgundy-500"
                                : "border-gray-300"
                            }`}>
                              {isSelected && <Check size={12} className="text-white" />}
                            </div>
                            <span className={`text-[14px] md:text-[15px] ${
                              isSelected ? "text-[#2C2028] font-semibold" : "text-[#555]"
                            }`}>
                              {option}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  /* Contact info step */
                  <div>
                    <p className="text-[16px] md:text-[18px] font-bold text-[#2C2028] mb-2">
                      마지막으로, 연락처를 남겨주세요.
                    </p>
                    <p className="text-[15px] text-[#999] mb-5">
                      맞춤 분석 결과를 전달해 드립니다.
                    </p>

                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="성함"
                        value={contactInfo.name}
                        onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-lg border border-gray-200 text-[15px] text-[#2C2028] placeholder:text-gray-400 focus:border-burgundy-300 focus:outline-none transition-all"
                      />
                      <input
                        type="tel"
                        placeholder="연락처 (010-0000-0000)"
                        value={contactInfo.phone}
                        onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-lg border border-gray-200 text-[15px] text-[#2C2028] placeholder:text-gray-400 focus:border-burgundy-300 focus:outline-none transition-all"
                      />
                    </div>

                    <div className="flex items-center gap-2 mt-4">
                      <input type="checkbox" id="wizard-privacy" required className="w-3.5 h-3.5 accent-burgundy-500" />
                      <label htmlFor="wizard-privacy" className="text-[14px] text-[#999]">
                        개인정보 수집 및 이용에 동의합니다.
                      </label>
                    </div>
                  </div>
                )}

                {/* Navigation buttons */}
                {!submitted && (
                  <div className="flex items-center justify-between mt-6 gap-3">
                    {step > 0 ? (
                      <button
                        onClick={handleBack}
                        className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-[14px] text-[#999] hover:text-[#666] hover:bg-gray-50 transition-all"
                      >
                        <ArrowLeft size={14} />
                        이전
                      </button>
                    ) : (
                      <div />
                    )}

                    <button
                      onClick={handleNext}
                      disabled={!canProceed}
                      className={`flex-1 max-w-[200px] flex items-center justify-center gap-2 py-3 rounded-lg text-[15px] font-bold transition-all duration-300 ${
                        canProceed
                          ? "bg-burgundy-500 text-white hover:bg-burgundy-600 shadow-sm"
                          : "bg-gray-100 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      {step === TOTAL_STEPS - 1 ? (
                        <>무료 분석 신청</>
                      ) : (
                        <>다음 <ArrowRight size={14} /></>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
