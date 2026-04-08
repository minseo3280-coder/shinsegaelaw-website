"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Send, CheckCircle2, Shield, Clock, Lock, ChevronDown } from "lucide-react";
import SubPageHero from "@/components/shared/SubPageHero";
import ConsultationTabs from "@/components/shared/ConsultationTabs";

const CATEGORIES = ["이혼", "재산분할", "양육권", "위자료", "상간자", "상속", "기타"];
const OFFICES = ["서울 주사무소", "수원 분사무소", "대전 분사무소"];

export default function ConsultationWritePage() {
  const router = useRouter();
  const [form, setForm] = useState({
    category: "이혼",
    region: "서울 주사무소",
    name: "",
    phone: "",
    email: "",
    password: "",
    title: "",
    content: "",
  });
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.password || !form.title || !form.content) {
      setError("필수 항목을 모두 입력해주세요.");
      return;
    }
    if (!/^\d{4}$/.test(form.password)) {
      setError("비밀번호는 숫자 4자리로 입력해주세요.");
      return;
    }
    if (!agreed) {
      setError("개인정보 수집·이용에 동의해주세요.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/consultations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (json.success) {
        setSuccess(true);
        setTimeout(() => router.push("/consultation/board"), 2500);
      } else {
        setError(json.error || "오류가 발생했습니다.");
      }
    } catch {
      setError("서버 연결에 실패했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div>
        <SubPageHero
          titleEn="CONSULTATION"
          titleKo="상담 접수 완료"
          bannerImage="/images/office/banner-consultation.jpg"
          breadcrumbs={[{ label: "법률상담", href: "/consultation/board" }, { label: "접수 완료" }]}
        />
        <div className="max-w-[500px] mx-auto px-6 py-20 md:py-28 text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={32} className="text-emerald-600" />
          </div>
          <h2 className="text-[24px] md:text-[28px] font-bold text-[#2C2028] mb-3">상담이 접수되었습니다</h2>
          <p className="text-[16px] text-[#555] mb-1">전문 변호사가 검토 후 빠르게 답변드리겠습니다.</p>
          <p className="text-[14px] text-[#aaa]">게시판으로 이동합니다...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <SubPageHero
        titleEn="WRITE CONSULTATION"
        titleKo="상담 글쓰기"
        bannerImage="/images/office/banner-consultation.jpg"
        breadcrumbs={[{ label: "법률상담", href: "/consultation/board" }, { label: "글쓰기" }]}
      />

      <ConsultationTabs />

      {/* ─── Main ─── */}
      <section className="bg-white py-14 md:py-20">
        <div className="max-w-[720px] mx-auto px-5 md:px-8">
          {/* Back */}
          <Link href="/consultation/board" className="inline-flex items-center gap-1.5 text-[14px] text-[#999] hover:text-[#9B2335] transition-colors mb-8 md:mb-10">
            <ArrowLeft size={14} /> 목록으로
          </Link>

          {/* Header */}
          <div className="mb-8 md:mb-10">
            <p className="text-[14px] md:text-[16px] tracking-[0.25em] text-[#C9A84C] uppercase font-bold mb-2">
              New Consultation
            </p>
            <h2
              className="text-[22px] md:text-[32px] font-bold text-[#2C2028] leading-[1.3] mb-2"
              style={{ wordBreak: "keep-all" }}
            >
              법률상담 작성하기
            </h2>
            <p className="text-[15px] md:text-[15px] text-[#888] leading-[1.7]">
              상담 내용을 작성하시면 전문 변호사가 검토 후 답변드립니다.
            </p>
          </div>

          {/* Trust badges */}
          <div className="flex items-center gap-4 md:gap-6 px-5 py-3.5 bg-[#F8F4EE] mb-8 md:mb-10 text-[15px] md:text-[15px] text-[#555]">
            <span className="flex items-center gap-1.5 whitespace-nowrap">
              <Shield size={13} className="text-[#C9A84C]" />
              비밀보장
            </span>
            <span className="w-[3px] h-[3px] rounded-full bg-gray-300 flex-shrink-0" />
            <span className="flex items-center gap-1.5 whitespace-nowrap">
              <Clock size={13} className="text-[#C9A84C]" />
              24시간 내 답변
            </span>
            <span className="w-[3px] h-[3px] rounded-full bg-gray-300 flex-shrink-0" />
            <span className="flex items-center gap-1.5 whitespace-nowrap">
              <Lock size={13} className="text-[#C9A84C]" />
              암호화 보호
            </span>
          </div>

          {/* ── Form ── */}
          <form onSubmit={handleSubmit}>
            {/* Category */}
            <div className="mb-7">
              <label className="block text-[15px] font-bold text-[#2C2028] mb-3">
                상담 분류 <span className="text-[#9B2335]">*</span>
              </label>
              <div className="flex flex-wrap gap-1.5">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => handleChange("category", cat)}
                    className={`px-4 py-2 text-[14px] font-semibold border transition-all duration-200 ${
                      form.category === cat
                        ? "bg-[#2C2028] text-white border-[#2C2028]"
                        : "bg-white text-[#555] border-gray-200 hover:border-[#2C2028]/30 hover:text-[#2C2028]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Office */}
            <div className="mb-7">
              <label className="block text-[15px] font-bold text-[#2C2028] mb-2">사무소</label>
              <div className="relative w-full md:w-[200px]">
                <select
                  value={form.region}
                  onChange={(e) => handleChange("region", e.target.value)}
                  className="w-full appearance-none px-4 py-3 border border-gray-200 text-[15px] text-[#2C2028] focus:outline-none focus:border-[#9B2335]/40 transition-all bg-[#FAFAFA]"
                >
                  {OFFICES.map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
                <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#999] pointer-events-none" />
              </div>
            </div>

            {/* Divider */}
            <div className="h-[1px] bg-gray-200 mb-7" />

            {/* Name + Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-7">
              <div>
                <label className="block text-[15px] font-bold text-[#2C2028] mb-2">이름 <span className="text-[#9B2335]">*</span></label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="홍길동"
                  className="w-full px-4 py-3 border border-gray-200 text-[15px] text-[#2C2028] placeholder:text-[#ccc] focus:outline-none focus:border-[#9B2335]/40 transition-all bg-[#FAFAFA]"
                />
              </div>
              <div>
                <label className="block text-[15px] font-bold text-[#2C2028] mb-2">연락처 <span className="text-[#9B2335]">*</span></label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder="010-0000-0000"
                  className="w-full px-4 py-3 border border-gray-200 text-[15px] text-[#2C2028] placeholder:text-[#ccc] focus:outline-none focus:border-[#9B2335]/40 transition-all bg-[#FAFAFA]"
                />
              </div>
            </div>

            {/* Email + Password */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-7">
              <div>
                <label className="block text-[15px] font-bold text-[#2C2028] mb-2">이메일 <span className="text-[15px] text-[#bbb] font-normal">선택</span></label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="email@example.com"
                  className="w-full px-4 py-3 border border-gray-200 text-[15px] text-[#2C2028] placeholder:text-[#ccc] focus:outline-none focus:border-[#9B2335]/40 transition-all bg-[#FAFAFA]"
                />
              </div>
              <div>
                <label className="block text-[15px] font-bold text-[#2C2028] mb-2">비밀번호 <span className="text-[#9B2335]">*</span></label>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  placeholder="숫자 4자리"
                  maxLength={4}
                  className="w-full px-4 py-3 border border-gray-200 text-[15px] text-[#2C2028] placeholder:text-[#ccc] focus:outline-none focus:border-[#9B2335]/40 transition-all bg-[#FAFAFA]"
                />
                <p className="text-[14px] text-[#aaa] mt-1.5">답변 확인 시 필요합니다.</p>
              </div>
            </div>

            {/* Divider */}
            <div className="h-[1px] bg-gray-200 mb-7" />

            {/* Title */}
            <div className="mb-7">
              <label className="block text-[15px] font-bold text-[#2C2028] mb-2">제목 <span className="text-[#9B2335]">*</span></label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder="상담 제목을 입력해주세요"
                className="w-full px-4 py-3 border border-gray-200 text-[15px] text-[#2C2028] placeholder:text-[#ccc] focus:outline-none focus:border-[#9B2335]/40 transition-all bg-[#FAFAFA]"
              />
            </div>

            {/* Content */}
            <div className="mb-7">
              <label className="block text-[15px] font-bold text-[#2C2028] mb-2">상담 내용 <span className="text-[#9B2335]">*</span></label>
              <textarea
                value={form.content}
                onChange={(e) => handleChange("content", e.target.value)}
                placeholder={"상담받고 싶은 내용을 자세히 작성해주세요.\n구체적일수록 정확한 답변을 드릴 수 있습니다."}
                rows={8}
                className="w-full px-4 py-4 border border-gray-200 text-[15px] text-[#2C2028] leading-[1.9] placeholder:text-[#ccc] focus:outline-none focus:border-[#9B2335]/40 transition-all resize-none bg-[#FAFAFA]"
              />
            </div>

            {/* Privacy */}
            <label className="flex items-start gap-3 cursor-pointer mb-7">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-[#9B2335]"
              />
              <span className="text-[14px] text-[#555] leading-[1.7]">
                개인정보 수집·이용에 동의합니다.
                <span className="block text-[15px] text-[#aaa] mt-0.5">수집된 정보는 상담 목적으로만 사용됩니다.</span>
              </span>
            </label>

            {/* Error */}
            {error && (
              <p className="text-[14px] text-red-600 font-medium bg-red-50 px-4 py-3 mb-6">{error}</p>
            )}

            {/* Buttons */}
            <div className="flex gap-3 pt-2">
              <Link
                href="/consultation/board"
                className="px-6 py-3 border border-gray-300 text-[15px] font-medium text-[#555] hover:border-[#2C2028] hover:text-[#2C2028] transition-all"
              >
                취소
              </Link>
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-[#2C2028] text-white text-[16px] font-bold hover:bg-[#1a1218] disabled:opacity-50 transition-all duration-300"
              >
                {submitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send size={15} />
                    상담 접수하기
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </section>

    </div>
  );
}
