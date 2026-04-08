"use client";

import { useState } from "react";
import {
  Phone,
  MessageCircle,
  CheckCircle,
  ChevronDown,
  Lock,
  Check,
  Clock,
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import DocumentModal from "@/components/shared/DocumentModal";
import firmData from "@/../../data/firm_info.json";

const PROCESS_STEPS = [
  {
    num: "#01",
    title: "접수",
    desc: "가족법 전문 변호사가 직접 상담하며,\n상황에 맞춘 맞춤 절차를 안내합니다.",
    points: [
      "의뢰인 상황과 목표 파악",
      "협의·재판 절차 여부 상담",
      "서류 준비 및 초기 대응 가이드 제공",
    ],
  },
  {
    num: "#02",
    title: "쟁점분석",
    desc: "사건 핵심을 분석해\n유리한 전략의 기반을 마련합니다.",
    points: [
      "재산·자녀·책임 소재 등 주요 쟁점 파악",
      "법률상 유불리 분석",
      "증거 확보 계획 수립",
    ],
  },
  {
    num: "#03",
    title: "각 팀 배정",
    desc: "전문분야별 변호사·실무팀이\n사건을 분담 처리해 효율성을 높입니다.",
    points: [
      "각 분야별 전문가 배정",
      "전담 실무팀 지원 체계 가동",
      "신속·정확한 절차 진행",
    ],
  },
  {
    num: "#04",
    title: "전략회의",
    desc: "변호사와 전문팀이\n사건 진행 방향과 대응 시나리오를 구체화합니다.",
    points: [
      "재판 또는 협상 전략 수립",
      "상대방 대응 예측 및 방어 논리 준비",
      "단계별 진행 로드맵 설정",
    ],
  },
  {
    num: "#05",
    title: "대응",
    desc: "재판·조정·협상 등 모든 절차에\n변호사가 직접 참여합니다.",
    points: [
      "조정·재판 기일 직접 출석",
      "증거 제출 및 주장 입증",
      "유리한 판결·합의 도출",
    ],
  },
  {
    num: "#06",
    title: "마무리",
    desc: "사건 종료 이후까지\n후속 절차를 책임집니다.",
    points: [
      "판결 후 이행 절차 지원",
      "재산 이전·양육권 집행 관리",
      "심리·생활 안정까지 사후 케어",
    ],
  },
];

export default function ContactCTA() {
  const [submitted, setSubmitted] = useState(false);
  const [docModalOpen, setDocModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <>
      <section id="contact" className="relative overflow-hidden">

        {/* ═══ PART 1 — Storytelling + 6-Step Process ═══ */}
        <div className="bg-white py-12 md:py-24 lg:py-28">
          <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10">

            {/* Storytelling Headline */}
            <ScrollReveal>
              <div className="max-w-[700px] mb-8 md:mb-16">
                <p className="text-[14px] md:text-[16px] tracking-[0.3em] text-[#C9A84C] uppercase font-bold mb-3 md:mb-5">
                  Our Process
                </p>
                <h2
                  className="text-[22px] md:text-[38px] lg:text-[46px] font-bold text-[#2C2028] leading-[1.3] tracking-tight mb-4 md:mb-6"
                  style={{ wordBreak: "keep-all" }}
                >
                  이혼 사건,<br />
                  쟁점마다 <span className="text-burgundy-500">전략</span>이 다릅니다.
                </h2>
                <p
                  className="text-[14px] md:text-[17px] text-[#555] leading-[1.85] md:leading-[2]"
                  style={{ wordBreak: "keep-all" }}
                >
                  판례를 데이터화하여 사건별 유리한 패턴을 추출하고,<br />
                  증거자료를 논리 구조 속에 정밀하게 배열하며,<br className="hidden md:inline" />
                  준비서면과 답변서를 재판부가 받아들일 수밖에 없는 언어로 작성합니다.
                </p>
                <p
                  className="text-[14px] md:text-[17px] text-[#333] font-semibold leading-[1.85] md:leading-[2] mt-3 md:mt-4"
                  style={{ wordBreak: "keep-all" }}
                >
                  사건을 동정으로 다루지 않고,<br />
                  결과로 안심시키는 집단입니다.
                </p>
              </div>
            </ScrollReveal>

            {/* 6-Step Process — Mobile: 세로 타임라인 / Desktop: 3×2 그리드 */}

              {/* ── Mobile: Vertical Timeline (각 스텝 스크롤 등장) ── */}
              <div className="md:hidden">
                {PROCESS_STEPS.map((step, i) => (
                  <ScrollReveal key={step.num} delay={i * 100} y={30}>
                    <div className="flex gap-4">
                      {/* Left: Number + Vertical Line */}
                      <div className="flex flex-col items-center flex-shrink-0">
                        <div className="w-9 h-9 rounded-full bg-[#F8F4EE] border border-[#C9A84C]/20 flex items-center justify-center">
                          <span className="text-[14px] font-bold text-[#C9A84C]">
                            {step.num.replace("#", "")}
                          </span>
                        </div>
                        {i < PROCESS_STEPS.length - 1 && (
                          <div className="w-[1px] flex-1 bg-gradient-to-b from-[#C9A84C]/20 to-gray-100 my-1" />
                        )}
                      </div>

                      {/* Right: Content */}
                      <div className={`pb-6 ${i === PROCESS_STEPS.length - 1 ? "pb-0" : ""}`}>
                        <h3 className="text-[15px] font-bold text-[#2C2028] mb-1.5">
                          {step.title}
                        </h3>
                        <p
                          className="text-[15px] text-[#555] leading-[1.7] mb-2.5 whitespace-pre-line"
                          style={{ wordBreak: "keep-all" }}
                        >
                          {step.desc}
                        </p>
                        <ol className="space-y-1">
                          {step.points.map((point, j) => (
                            <li key={j} className="flex gap-1.5 text-[14px] text-[#444] leading-[1.55]">
                              <span className="text-[15px] font-bold text-[#2C2028] mt-[1px] flex-shrink-0">
                                {j + 1}.
                              </span>
                              <span style={{ wordBreak: "keep-all" }}>{point}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              {/* ── Desktop: 3-column Grid (스태거 등장) ── */}
              <div className="hidden md:grid grid-cols-3 gap-5">
                {PROCESS_STEPS.map((step, i) => (
                  <ScrollReveal key={step.num} delay={i * 100} y={40}>
                    <div
                      className="border border-gray-200 rounded-xl p-7 hover:border-[#C9A84C]/30 hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all duration-300 group flex flex-col items-center text-center h-full"
                    >
                      {/* Number */}
                      <span className="text-[14px] font-bold text-[#C9A84C]/60 tracking-tight mb-2">
                        {step.num}
                      </span>

                      {/* Title */}
                      <h3 className="text-[22px] font-bold text-[#2C2028] mb-4">
                        {step.title}
                      </h3>

                      {/* Description */}
                      <p
                        className="text-[15px] text-[#666] leading-[1.8] mb-5 whitespace-pre-line"
                        style={{ wordBreak: "keep-all" }}
                      >
                        {step.desc}
                      </p>

                      {/* Divider */}
                      <div className="w-full h-[1px] bg-gray-100 group-hover:bg-[#C9A84C]/20 transition-colors mb-5" />

                      {/* Sub-points */}
                      <ol className="space-y-2 text-left w-full">
                        {step.points.map((point, j) => (
                          <li key={j} className="flex gap-2.5 text-[14px] text-[#444] leading-[1.6]">
                            <span className="text-[14px] font-bold text-[#2C2028] mt-[1px] flex-shrink-0">
                              {j + 1}.
                            </span>
                            <span style={{ wordBreak: "keep-all" }}>{point}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
          </div>
        </div>

        {/* ═══ Gold Divider ═══ */}
        <div className="h-[2px] bg-gradient-to-r from-transparent via-[#C9A84C]/50 to-transparent" />

        {/* ═══ PART 2 — Form Section ═══ */}
        <div id="consultation-form" className="bg-[#F8F4EE] py-14 md:py-20 lg:py-24">
          <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10">

            <ScrollReveal>
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-16 items-start">

                {/* ── Left: Info Column ── */}
                <div>
                  <p className="text-[14px] md:text-[16px] tracking-[0.3em] text-[#C9A84C] uppercase font-bold mb-3 md:mb-4">
                    Confidential Consultation
                  </p>
                  <h3
                    className="text-[20px] md:text-[34px] lg:text-[40px] font-bold text-[#2C2028] leading-[1.3] tracking-tight mb-4 md:mb-6"
                    style={{ wordBreak: "keep-all" }}
                  >
                    당신의 이야기를<br />
                    <span className="text-burgundy-500">안전하게</span> 들려주세요.
                  </h3>

                  {/* Info card — CEO site tone */}
                  <div className="bg-white/60 border border-[#2C2028]/8 rounded-xl px-4 md:px-5 py-4 md:py-5 mb-6 md:mb-8">
                    <p
                      className="text-[14px] md:text-[16px] text-[#444] leading-[1.75] md:leading-[1.85] mb-3 md:mb-4"
                      style={{ wordBreak: "keep-all" }}
                    >
                      이혼은 인생에서 가장 치열한 전환점입니다.<br />
                      재산 분할의 비율, 자녀의 양육권 귀속, 위자료 청구의 범위.<br className="hidden md:inline" />
                      그 하나하나가 당신의 재정, 명예, 그리고 삶의 궤적을 근본적으로 바꿉니다.
                    </p>
                    <ul className="space-y-1.5">
                      <li className="flex items-start gap-2 text-[14px] text-[#666] leading-[1.6]">
                        <span className="text-[#999] mt-[2px]">–</span>
                        <span>작성하신 내용은 상담 진행에만 사용됩니다.</span>
                      </li>
                      <li className="flex items-start gap-2 text-[14px] text-[#666] leading-[1.6]">
                        <span className="text-[#999] mt-[2px]">–</span>
                        <span>개인정보처리방침에 의거하여 개인정보를 안전하게 보호합니다.</span>
                      </li>
                    </ul>
                  </div>

                  {/* Contact Card — 전화 + 카카오 + 뱃지 통합 */}
                  <div className="bg-white rounded-xl border border-gray-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.04)] overflow-hidden">
                    {/* 전화번호 영역 */}
                    <div className="px-5 md:px-6 py-5 md:py-6 border-b border-gray-100">
                      <p className="text-[14px] md:text-[16px] tracking-[0.2em] text-[#C9A84C] uppercase font-bold mb-2">
                        대표번호
                      </p>
                      <a href={`tel:${firmData.main_phone}`} className="inline-block">
                        <span className="block text-[26px] md:text-[34px] font-black text-[#2C2028] tracking-tight hover:text-burgundy-500 transition-colors">
                          {firmData.main_phone}
                        </span>
                      </a>
                      <p className="text-[15px] md:text-[16px] text-[#888] mt-1">
                        평일 09:00 – 18:00 · 주말/공휴일 상담접수 가능
                      </p>
                    </div>

                    {/* 버튼 영역 */}
                    <div className="grid grid-cols-2 divide-x divide-gray-100">
                      <a
                        href={`tel:${firmData.main_phone}`}
                        className="flex items-center justify-center gap-2 py-3.5 md:py-4 text-[14px] md:text-[15px] font-semibold text-[#2C2028] hover:bg-gray-50 transition-all duration-200"
                      >
                        <Phone size={15} className="text-[#9B2335]" />
                        전화 상담
                      </a>
                      <a
                        href="https://pf.kakao.com/_ExcxoAu/chat"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 py-3.5 md:py-4 text-[14px] md:text-[15px] font-semibold text-[#2C2028] hover:bg-gray-50 transition-all duration-200"
                      >
                        <MessageCircle size={15} className="text-[#FCC800]" />
                        카카오톡
                      </a>
                    </div>

                    {/* 뱃지 영역 */}
                    <div className="flex justify-center gap-5 md:gap-6 py-3 md:py-3.5 bg-[#F9F7F4] border-t border-gray-100">
                      {[
                        { icon: Lock, text: "비밀보장" },
                        { icon: Clock, text: "24시간 접수" },
                        { icon: Check, text: "1:1 전문상담" },
                      ].map((badge, i) => (
                        <div key={i} className="flex items-center gap-1.5">
                          <badge.icon className="w-3.5 h-3.5 text-[#C9A84C]" />
                          <span className="text-[14px] md:text-[15px] text-[#666] font-medium">{badge.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ── Right: Form Card ── */}
                <div className="bg-white rounded-xl md:rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.06)] border border-gray-100 p-5 md:p-8">
                  <p className="text-[15px] md:text-[16px] tracking-[0.15em] text-[#C9A84C] uppercase font-bold mb-1">
                    간편 상담 신청
                  </p>
                  <p className="text-[15px] md:text-[16px] text-[#999] mb-5 md:mb-6">
                    아래 양식을 작성해 주시면, 담당 변호사가 연락드리겠습니다.
                  </p>

                  {submitted ? (
                    <div className="text-center py-10">
                      <CheckCircle className="w-14 h-14 text-green-500 mx-auto mb-4" />
                      <p className="text-lg font-bold text-[#2C2028] mb-2">상담 신청 완료</p>
                      <p className="text-sm text-[#666]">빠른 시간 내에 연락드리겠습니다.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* 사무소 */}
                      <div>
                        <label className="block text-[14px] font-bold text-[#2C2028] mb-1.5">
                          사무소 <span className="text-burgundy-500">*</span>
                        </label>
                        <div className="relative">
                          <select
                            required
                            defaultValue=""
                            className="w-full appearance-none bg-[#F9F7F4] border border-gray-200 rounded-lg px-4 py-3 text-[15px] text-[#333333] focus:border-[#C9A84C]/50 focus:bg-white focus:outline-none transition-all"
                          >
                            <option value="" disabled className="text-gray-900">사무소를 선택해주세요</option>
                            {firmData.offices.map((office) => (
                              <option key={office.name} value={office.name} className="text-gray-900">
                                {office.name} ({office.address.split(",")[0]})
                              </option>
                            ))}
                          </select>
                          <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#999] pointer-events-none" />
                        </div>
                      </div>

                      {/* 분류 */}
                      <div>
                        <label className="block text-[14px] font-bold text-[#2C2028] mb-1.5">
                          상담유형 <span className="text-burgundy-500">*</span>
                        </label>
                        <div className="relative">
                          <select
                            required
                            defaultValue=""
                            className="w-full appearance-none bg-[#F9F7F4] border border-gray-200 rounded-lg px-4 py-3 text-[15px] text-[#333333] focus:border-[#C9A84C]/50 focus:bg-white focus:outline-none transition-all"
                          >
                            <option value="" disabled className="text-gray-900">선택하세요</option>
                            <option value="이혼소송" className="text-gray-900">이혼소송</option>
                            <option value="재산분할" className="text-gray-900">재산분할</option>
                            <option value="상간자소송" className="text-gray-900">상간자소송</option>
                            <option value="상속" className="text-gray-900">상속</option>
                            <option value="가사관련 형사소송" className="text-gray-900">가사관련 형사소송</option>
                            <option value="기타" className="text-gray-900">기타</option>
                          </select>
                          <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#999] pointer-events-none" />
                        </div>
                      </div>

                      {/* 이름 + 연락처 */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[14px] font-bold text-[#2C2028] mb-1.5">
                            이름 <span className="text-burgundy-500">*</span>
                          </label>
                          <input
                            type="text"
                            placeholder="이름을 입력해주세요."
                            required
                            className="w-full bg-[#F9F7F4] border border-gray-200 rounded-lg px-4 py-3 text-[15px] text-[#2C2028] placeholder:text-gray-400 focus:border-[#C9A84C]/50 focus:bg-white focus:outline-none transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-[14px] font-bold text-[#2C2028] mb-1.5">
                            연락처 <span className="text-burgundy-500">*</span>
                          </label>
                          <input
                            type="tel"
                            placeholder="010-0000-0000"
                            required
                            className="w-full bg-[#F9F7F4] border border-gray-200 rounded-lg px-4 py-3 text-[15px] text-[#2C2028] placeholder:text-gray-400 focus:border-[#C9A84C]/50 focus:bg-white focus:outline-none transition-all"
                          />
                        </div>
                      </div>

                      {/* 문의 내용 */}
                      <div>
                        <label className="block text-[14px] font-bold text-[#2C2028] mb-1.5">
                          문의 내용 <span className="text-[#999] font-normal text-[15px]">(선택)</span>
                        </label>
                        <textarea
                          placeholder="문의하실 내용을 간단하게 입력해주세요."
                          rows={4}
                          className="w-full bg-[#F9F7F4] border border-gray-200 rounded-lg px-4 py-3 text-[15px] text-[#2C2028] placeholder:text-gray-400 focus:border-[#C9A84C]/50 focus:bg-white focus:outline-none transition-all resize-none"
                        />
                      </div>

                      {/* Privacy + Submit */}
                      <div className="pt-2">
                        <div className="flex items-center gap-2 mb-4">
                          <input
                            type="checkbox"
                            id="privacy-agree-cta"
                            required
                            className="w-[14px] h-[14px] rounded-[3px] border border-gray-300 accent-[#C9A84C] flex-shrink-0"
                          />
                          <label htmlFor="privacy-agree-cta" className="text-[14px] text-[#555]">
                            개인정보 수집 및 이용에 동의합니다.
                          </label>
                        </div>
                        <button
                          type="submit"
                          className="w-full py-[14px] rounded-lg bg-[#2C2028] hover:bg-[#1a1218] text-white text-[16px] font-bold tracking-wide transition-all duration-300"
                        >
                          비밀 상담 신청하기
                        </button>
                        <p className="text-[14px] text-[#999] mt-3 text-center">
                          개인정보는 상담 목적으로만 사용됩니다.
                        </p>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <DocumentModal open={docModalOpen} onClose={() => setDocModalOpen(false)} />
    </>
  );
}
