"use client";

import { useState } from "react";
import {
  CheckCircle,
  ClipboardCheck,
  SearchCheck,
  UserCheck,
  Zap,
  ShieldCheck,
  Clock,
  Scale,
  Lock,
  MessageSquare,
  X,
  ChevronDown,
  ArrowRight,
  Phone,
} from "lucide-react";
import SubPageHero from "@/components/shared/SubPageHero";
import ConsultationTabs from "@/components/shared/ConsultationTabs";
import ScrollReveal from "@/components/ScrollReveal";
import firmData from "@/../../data/firm_info.json";
import privacyRaw from "@/../../data/competitor_crawl_pages.json";

const STEPS = [
  {
    num: "01",
    title: "상담신청",
    desc: "홈페이지를 통해 24시간 언제든 편리하게 상담 신청이 가능합니다.",
    icon: ClipboardCheck,
  },
  {
    num: "02",
    title: "사건검토",
    desc: "신청 후 24시간 이내에 전문 변호사가 사건 내용을 심도 있게 검토합니다.",
    icon: SearchCheck,
  },
  {
    num: "03",
    title: "담당배정",
    desc: "사건의 특성에 가장 적합한 책임 전담 변호사를 선임하여 배정합니다.",
    icon: UserCheck,
  },
  {
    num: "04",
    title: "처리/해결",
    desc: "의뢰인의 문제를 신속하고 정확하게 해결하며 최선의 방안을 제시합니다.",
    icon: Zap,
  },
];

const OFFICES = ["서울 주사무소", "수원 분사무소", "대전 분사무소"];
const CATEGORIES = [
  "이혼소송",
  "재산분할",
  "양육권/친권",
  "위자료 청구",
  "상간자소송",
  "상속/유류분",
  "가사관련 형사",
  "기타",
];

/* eslint-disable @typescript-eslint/no-explicit-any */
const privacyPolicy = (privacyRaw as any).privacy_policy;

export default function ConsultationPage() {
  const [submitted, setSubmitted] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ region: "", category: "", name: "", phone: "", content: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/consultations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category: form.category || "기타",
          region: form.region || "",
          name: form.name,
          phone: form.phone,
          password: "0000",
          title: `[온라인상담] ${form.category || "기타"} - ${form.name}`,
          content: form.content,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 4000);
      }
    } catch {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      {/* ─── Banner ─── */}
      <SubPageHero
        titleKo="온라인 상담"
        breadcrumbs={[
          { label: "법률상담", href: "/consultation" },
          { label: "온라인 상담" },
        ]}
        bannerImage="/images/office/banner-consultation.jpg"
      />

      <ConsultationTabs />

      {/* ═══ SECTION 1 — Intro + Process ═══ */}
      <section className="bg-white py-14 md:py-20">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10">

          {/* Intro */}
          <ScrollReveal y={40}>
          <div className="mb-10 md:mb-16">
            <p className="text-[14px] md:text-[15px] tracking-[0.3em] text-[#C9A84C] uppercase font-bold mb-2 md:mb-3">
              Free Legal Consultation
            </p>
            <h2
              className="text-[22px] md:text-[38px] lg:text-[44px] font-bold text-[#2C2028] leading-[1.3] tracking-tight mb-3 md:mb-5"
              style={{ wordBreak: "keep-all" }}
            >
              혼자 고민하지 마세요,<br />
              <span className="text-[#9B2335]">신세계로</span>가 길을 열어드립니다.
            </h2>
            <p
              className="text-[15px] md:text-[17px] text-[#555] leading-[1.85] md:leading-[2]"
              style={{ wordBreak: "keep-all" }}
            >
              이혼·재산분할·양육권 문제는 정확한 법률 판단과 전략적 대응이 결과를 바꿉니다.<br />
              52년 법조 전통과 22인의 전문가가 의뢰인의 새로운 시작을 함께합니다.
            </p>
          </div>
          </ScrollReveal>

          {/* 4 Step Process — 가로 라인 연결형 */}
          <ScrollReveal delay={100} y={40}>
          <div className="mb-10 md:mb-16">
            <p className="text-[14px] md:text-[16px] tracking-[0.25em] text-[#C9A84C] uppercase font-bold mb-6 md:mb-8">
              상담 진행 절차
            </p>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-0">
              {STEPS.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.num}
                    className={`relative p-4 md:p-6 ${
                      i < STEPS.length - 1 ? "border-r border-gray-200" : ""
                    } ${i < 2 ? "border-b lg:border-b-0 border-gray-200" : ""}`}
                  >
                    <div className="flex items-center gap-2 mb-3 md:mb-4">
                      <span className="text-[22px] md:text-[28px] font-black text-[#2C2028]/10 leading-none">
                        {step.num}
                      </span>
                      <Icon size={16} className="text-[#9B2335] md:!w-[18px] md:!h-[18px]" />
                    </div>
                    <h4 className="text-[16px] md:text-[19px] font-bold text-[#2C2028] mb-1.5 md:mb-2">
                      {step.title}
                    </h4>
                    <p className="text-[15px] md:text-[16px] text-[#888] leading-[1.7]">
                      {step.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          </ScrollReveal>

          {/* Board Link */}
          <ScrollReveal delay={200} y={40}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-5 py-4 bg-[#F8F4EE]">
            <div className="flex items-center gap-2.5">
              <MessageSquare size={16} className="text-[#C9A84C]" />
              <p className="text-[14px] md:text-[16px] text-[#555]">
                비밀이 보장되는 <strong className="text-[#2C2028]">1:1 법률상담 게시판</strong>을 이용해보세요.
              </p>
            </div>
            <a
              href="/consultation/board"
              className="inline-flex items-center gap-1.5 text-[14px] font-bold text-[#9B2335] hover:gap-2.5 transition-all duration-300"
            >
              게시판 바로가기 <ArrowRight size={13} />
            </a>
          </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ SECTION 2 — Form ═══ */}
      <section className="bg-[#F8F4EE] py-14 md:py-20">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10">

          <ScrollReveal delay={100} y={40}>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-5 lg:gap-14 items-start">

            {/* ── Left: Info ── */}
            <div>
              <p className="text-[14px] md:text-[15px] tracking-[0.3em] text-[#C9A84C] uppercase font-bold mb-2 md:mb-3">
                Online Consultation
              </p>
              <h3
                className="text-[20px] md:text-[32px] lg:text-[36px] font-bold text-[#2C2028] leading-[1.3] tracking-tight mb-4 md:mb-6"
                style={{ wordBreak: "keep-all" }}
              >
                방문 전 사전 상담으로<br />
                더 <span className="text-[#9B2335]">정확한 전략</span>을 세웁니다.
              </h3>

              <p
                className="text-[14px] md:text-[15px] text-[#555] leading-[1.85] md:leading-[2] mb-6 md:mb-8"
                style={{ wordBreak: "keep-all" }}
              >
                사건과 관련된 기본 내용을 작성해 주시면,<br />
                더 정확하고 신속한 상담이 가능합니다.<br />
                작성하신 내용은 상담 진행에만 사용됩니다.
              </p>

              {/* Trust info */}
              <div className="space-y-3 mb-8">
                {[
                  { icon: ShieldCheck, text: "변호사 비밀유지의무에 따라 보호" },
                  { icon: Clock, text: "접수 후 24시간 내 검토" },
                  { icon: Scale, text: "전문 변호사 직접 상담" },
                  { icon: Lock, text: "개인정보보호법 준수" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3">
                    <item.icon size={15} className="text-[#C9A84C] flex-shrink-0" />
                    <span className="text-[14px] md:text-[16px] text-[#555]">{item.text}</span>
                  </div>
                ))}
              </div>

              {/* Phone CTA */}
              <div className="hidden lg:block">
                <p className="text-[14px] tracking-[0.2em] text-[#C9A84C] uppercase font-bold mb-2">
                  전화 상담
                </p>
                <a href={`tel:${firmData.main_phone}`} className="inline-block">
                  <span className="text-[24px] font-black text-[#2C2028] tracking-tight hover:text-[#9B2335] transition-colors">
                    {firmData.main_phone}
                  </span>
                </a>
                <p className="text-[15px] text-[#aaa] mt-1">
                  평일 09:00 – 18:00
                </p>
              </div>
            </div>

            {/* ── Right: Form Card ── */}
            <div className="bg-white border border-gray-200/80 shadow-[0_2px_16px_rgba(0,0,0,0.04)]">

              {submitted ? (
                <div className="text-center py-16 px-8">
                  <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle size={28} className="text-emerald-600" />
                  </div>
                  <h3 className="text-[20px] md:text-[24px] font-bold text-[#2C2028] mb-2">상담 신청이 완료되었습니다</h3>
                  <p className="text-[15px] text-[#888] mb-6">
                    담당 변호사가 검토 후 연락드리겠습니다.
                  </p>
                  <a
                    href="/consultation/board"
                    className="inline-flex items-center gap-2 text-[15px] font-semibold text-[#9B2335] hover:gap-3 transition-all"
                  >
                    법률상담 게시판 바로가기 <ArrowRight size={14} />
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {/* Form header */}
                  <div className="px-5 md:px-7 py-4 md:py-5 border-b border-gray-100 bg-[#FAFAF8]">
                    <p className="text-[15px] md:text-[15px] tracking-[0.15em] text-[#C9A84C] uppercase font-bold mb-0.5">
                      온라인 상담 신청
                    </p>
                    <p className="text-[15px] text-[#aaa]">
                      아래 양식을 작성해 주시면 담당 변호사가 연락드립니다.
                    </p>
                  </div>

                  <div className="px-5 md:px-7 py-6 md:py-7 space-y-5">
                    {/* 사무소 / 상담 분류 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[14px] font-bold text-[#2C2028] mb-1.5">
                          사무소 <span className="text-[#9B2335]">*</span>
                        </label>
                        <div className="relative">
                          <select
                            required
                            value={form.region}
                            onChange={(e) => setForm(f => ({ ...f, region: e.target.value }))}
                            className="w-full appearance-none bg-[#FAFAFA] border border-gray-200 px-4 py-3 text-[15px] text-[#333] focus:border-[#9B2335]/40 focus:outline-none transition-all"
                          >
                            <option value="">사무소를 선택해주세요</option>
                            {OFFICES.map((r) => (
                              <option key={r} value={r}>{r}</option>
                            ))}
                          </select>
                          <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#999] pointer-events-none" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[14px] font-bold text-[#2C2028] mb-1.5">
                          상담 분류 <span className="text-[#9B2335]">*</span>
                        </label>
                        <div className="relative">
                          <select
                            required
                            value={form.category}
                            onChange={(e) => setForm(f => ({ ...f, category: e.target.value }))}
                            className="w-full appearance-none bg-[#FAFAFA] border border-gray-200 px-4 py-3 text-[15px] text-[#333] focus:border-[#9B2335]/40 focus:outline-none transition-all"
                          >
                            <option value="">분류를 선택하세요</option>
                            {CATEGORIES.map((c) => (
                              <option key={c} value={c}>{c}</option>
                            ))}
                          </select>
                          <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#999] pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    {/* 이름 / 연락처 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[14px] font-bold text-[#2C2028] mb-1.5">
                          이름 <span className="text-[#9B2335]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
                          placeholder="성함을 입력해주세요"
                          className="w-full bg-[#FAFAFA] border border-gray-200 px-4 py-3 text-[15px] text-[#2C2028] placeholder:text-gray-400 focus:border-[#9B2335]/40 focus:outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-[14px] font-bold text-[#2C2028] mb-1.5">
                          연락처 <span className="text-[#9B2335]">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={form.phone}
                          onChange={(e) => setForm(f => ({ ...f, phone: e.target.value }))}
                          placeholder="010-0000-0000"
                          className="w-full bg-[#FAFAFA] border border-gray-200 px-4 py-3 text-[15px] text-[#2C2028] placeholder:text-gray-400 focus:border-[#9B2335]/40 focus:outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* 문의 내용 */}
                    <div>
                      <label className="block text-[14px] font-bold text-[#2C2028] mb-1.5">
                        문의 내용 <span className="text-[#9B2335]">*</span>
                      </label>
                      <textarea
                        required
                        rows={6}
                        value={form.content}
                        onChange={(e) => setForm(f => ({ ...f, content: e.target.value }))}
                        placeholder="문의하실 내용을 간단하게 입력하세요.&#10;상세히 적어주실수록 정확한 검토가 가능합니다."
                        className="w-full bg-[#FAFAFA] border border-gray-200 px-4 py-3 text-[15px] text-[#2C2028] leading-[1.8] placeholder:text-gray-400 resize-none focus:border-[#9B2335]/40 focus:outline-none transition-all"
                      />
                    </div>

                    {/* 동의 */}
                    <div className="flex items-start gap-2.5 pt-1">
                      <input
                        type="checkbox"
                        id="privacy-agree"
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                        required
                        className="mt-0.5 w-[14px] h-[14px] accent-[#9B2335]"
                      />
                      <label htmlFor="privacy-agree" className="text-[14px] text-[#555] leading-[1.6]">
                        개인정보 수집 및 이용에 동의합니다.{" "}
                        <button type="button" onClick={() => setShowPrivacy(true)} className="text-[#9B2335] font-semibold hover:underline">
                          [자세히보기]
                        </button>
                      </label>
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-[14px] bg-[#2C2028] hover:bg-[#1a1218] disabled:opacity-50 text-white font-bold text-[16px] tracking-wide transition-all duration-300"
                    >
                      {submitting ? "접수 중..." : "비밀 상담 신청하기"}
                    </button>
                    <p className="text-[14px] text-[#aaa] text-center">
                      개인정보는 상담 목적으로만 사용됩니다.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
          </ScrollReveal>

          {/* Mobile phone CTA */}
          <ScrollReveal delay={200} y={40}>
          <div className="lg:hidden mt-8 flex items-center justify-between px-5 py-4 bg-white border border-gray-200/80">
            <div>
              <p className="text-[14px] tracking-[0.15em] text-[#C9A84C] uppercase font-bold mb-0.5">전화 상담</p>
              <p className="text-[15px] text-[#aaa]">평일 09:00 – 18:00</p>
            </div>
            <a
              href={`tel:${firmData.main_phone}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#2C2028] text-[15px] font-bold text-[#2C2028] hover:bg-[#2C2028] hover:text-white transition-all"
            >
              <Phone size={14} />
              {firmData.main_phone}
            </a>
          </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Privacy Policy Modal ─── */}
      {showPrivacy && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowPrivacy(false)} />
          <div className="relative bg-white shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col overflow-hidden z-10">
            {/* Header */}
            <div className="flex items-center justify-between px-6 md:px-8 py-4 border-b border-gray-200">
              <h3 className="text-[18px] font-bold text-[#2C2028]">개인정보처리방침</h3>
              <button onClick={() => setShowPrivacy(false)} className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 transition-colors">
                <X size={18} className="text-[#555]" />
              </button>
            </div>
            {/* Body */}
            <div className="flex-1 overflow-y-auto px-6 md:px-8 py-6">
              <p className="text-[15px] text-[#333] leading-[1.8] mb-6">
                {privacyPolicy.intro}
              </p>
              {privacyPolicy.sections.map((section: any, i: number) => (
                <div key={i} className="mb-6">
                  <h4 className="text-[15px] font-bold text-[#2C2028] mb-2 flex items-start gap-2">
                    <span className="text-[#9B2335] font-bold">{i + 1}.</span>
                    {section.title}
                  </h4>
                  <p className="text-[14px] text-[#555] leading-[1.8] mb-2">{section.content}</p>
                  {section.exceptions && (
                    <ul className="list-disc pl-5 space-y-1 mb-2">
                      {section.exceptions.map((ex: string, j: number) => (
                        <li key={j} className="text-[14px] text-[#555] leading-[1.7]">{ex}</li>
                      ))}
                    </ul>
                  )}
                  {section.collected_items && (
                    <ul className="list-disc pl-5 space-y-1 mb-2">
                      {section.collected_items.map((item: string, j: number) => (
                        <li key={j} className="text-[14px] text-[#555] leading-[1.7]">{item}</li>
                      ))}
                    </ul>
                  )}
                  {section.cookie_purposes && (
                    <p className="text-[14px] text-[#555] leading-[1.8] mb-1">{section.cookie_purposes}</p>
                  )}
                  {section.cookie_opt_out && (
                    <p className="text-[14px] text-[#555] leading-[1.8] mb-1">{section.cookie_opt_out}</p>
                  )}
                  {section.complaint_channels && (
                    <ul className="space-y-1 mt-2">
                      {section.complaint_channels.map((ch: any, j: number) => (
                        <li key={j} className="text-[14px] text-[#555]">
                          · {ch.name} ({ch.url} / {ch.phone})
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
            {/* Footer */}
            <div className="px-6 md:px-8 py-4 border-t border-gray-200">
              <button
                onClick={() => { setShowPrivacy(false); setAgreed(true); }}
                className="w-full py-3.5 bg-[#2C2028] hover:bg-[#1a1218] text-white font-bold text-[15px] transition-all"
              >
                확인 및 동의
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
