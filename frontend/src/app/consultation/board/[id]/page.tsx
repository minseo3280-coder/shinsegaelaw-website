"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Lock, CheckCircle2, Clock, User, Scale, Shield, Eye } from "lucide-react";
import SubPageHero from "@/components/shared/SubPageHero";

interface Reply {
  id: number;
  lawyer_name: string;
  reply_body: string;
  created_at: string;
}

interface ConsultationDetail {
  id: number;
  category: string;
  region: string;
  name: string;
  phone: string;
  email: string;
  title: string;
  content: string;
  status: string;
  views: number;
  created_at: string;
  replies: Reply[];
}

const CAT_STYLE: Record<string, string> = {
  "이혼": "bg-burgundy-50 text-burgundy-600",
  "재산분할": "bg-blue-50 text-blue-700",
  "양육권": "bg-emerald-50 text-emerald-700",
  "위자료": "bg-orange-50 text-orange-700",
  "상간자": "bg-amber-50 text-amber-800",
  "상속": "bg-purple-50 text-purple-700",
  "기타": "bg-gray-100 text-[#555]",
};

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
}

export default function ConsultationDetailPage() {
  const { id } = useParams();
  const [password, setPassword] = useState("");
  const [data, setData] = useState<ConsultationDetail | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) { setError("비밀번호를 입력해주세요."); return; }
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/consultations/${id}/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const json = await res.json();
      if (json.success) { setData(json.data); setVerified(true); }
      else setError(json.error || "비밀번호가 일치하지 않습니다.");
    } catch {
      setError("서버 연결에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <SubPageHero
        titleEn="CONSULTATION"
        titleKo={verified && data ? data.title : "상담 확인"}
        bannerImage="/images/office/banner-consultation.jpg"
        breadcrumbs={[{ label: "법률상담", href: "/consultation/board" }, { label: "상세보기" }]}
      />

      {!verified ? (
        /* ══════════ Password Gate ══════════ */
        <section className="bg-white py-14 md:py-20">
          <div className="max-w-[400px] mx-auto px-6">
            {/* Icon */}
            <div className="flex justify-center mb-8">
              <div className="w-16 h-16 rounded-full bg-[#F8F4EE] flex items-center justify-center">
                <Lock size={24} className="text-[#C9A84C]" />
              </div>
            </div>

            {/* Title */}
            <div className="text-center mb-8">
              <p className="text-[14px] md:text-[16px] tracking-[0.3em] text-[#C9A84C] uppercase font-bold mb-2">
                Verification Required
              </p>
              <h2 className="text-[22px] md:text-[26px] font-bold text-[#2C2028] mb-2">비밀번호 확인</h2>
              <p className="text-[15px] text-[#888] leading-[1.7]">
                작성 시 설정한 비밀번호 4자리를 입력해주세요.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleVerify} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(""); }}
                  placeholder="● ● ● ●"
                  maxLength={4}
                  className="w-full px-5 py-4 border border-gray-200 text-[18px] text-center tracking-[0.5em] focus:outline-none focus:border-[#9B2335]/40 transition-all bg-[#FAFAFA]"
                  autoFocus
                />
                {error && <p className="text-[14px] text-red-600 font-medium mt-2">{error}</p>}
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-[#2C2028] text-white text-[16px] font-bold hover:bg-[#1a1218] disabled:opacity-50 transition-all duration-300"
              >
                {loading ? "확인 중..." : "확인하기"}
              </button>
            </form>

            {/* Trust */}
            <div className="flex items-center justify-center gap-5 mt-8 text-[15px] text-[#aaa]">
              <span className="flex items-center gap-1.5"><Shield size={12} className="text-[#C9A84C]" /> 비밀보장</span>
              <span className="flex items-center gap-1.5"><Lock size={12} className="text-[#C9A84C]" /> 암호화 보호</span>
            </div>

            {/* Back link */}
            <div className="flex justify-center mt-10">
              <Link href="/consultation/board" className="text-[14px] text-[#999] hover:text-[#9B2335] transition-colors">
                ← 목록으로 돌아가기
              </Link>
            </div>
          </div>
        </section>
      ) : data ? (
        /* ══════════ Consultation Detail ══════════ */
        <section className="bg-white py-10 md:py-16">
          <div className="max-w-[800px] mx-auto px-5 md:px-8">
            {/* Back */}
            <Link href="/consultation/board" className="inline-flex items-center gap-1.5 text-[14px] text-[#999] hover:text-[#9B2335] transition-colors mb-8 md:mb-10">
              <ArrowLeft size={14} /> 목록으로
            </Link>

            {/* ── Header ── */}
            <div className="mb-8 md:mb-10">
              {/* Status + Category */}
              <div className="flex items-center gap-2 mb-4">
                <span className={`text-[14px] px-2.5 py-[3px] rounded font-bold ${CAT_STYLE[data.category] || CAT_STYLE["기타"]}`}>
                  {data.category}
                </span>
                {data.status === "done" ? (
                  <span className="flex items-center gap-1 text-[14px] px-2.5 py-[3px] rounded bg-emerald-50 text-emerald-700 font-bold">
                    <CheckCircle2 size={10} /> 답변완료
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-[14px] px-2.5 py-[3px] rounded bg-gray-100 text-[#888] font-bold">
                    <Clock size={10} /> 대기
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-[22px] md:text-[28px] font-bold text-[#2C2028] leading-[1.4] mb-5">{data.title}</h1>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[14px] text-[#aaa] pb-5 border-b border-gray-200">
                <span className="flex items-center gap-1.5"><User size={13} /> {data.name}</span>
                <span>{formatDate(data.created_at)}</span>
                <span className="flex items-center gap-1"><Eye size={12} /> {data.views}</span>
              </div>
            </div>

            {/* ── Content ── */}
            <div className="mb-10 md:mb-14">
              <p className="text-[16px] md:text-[17px] text-[#333] leading-[2] whitespace-pre-wrap">{data.content}</p>
            </div>

            {/* ── Divider ── */}
            <div className="h-[2px] bg-[#F8F4EE] mb-8 md:mb-10" />

            {/* ── Replies ── */}
            <div className="mb-10 md:mb-14">
              <div className="flex items-center gap-2.5 mb-6">
                <p className="text-[14px] md:text-[16px] tracking-[0.25em] text-[#C9A84C] uppercase font-bold">
                  변호사 답변
                </p>
                {data.replies.length > 0 && (
                  <span className="text-[14px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold">
                    {data.replies.length}건
                  </span>
                )}
              </div>

              {data.replies.length > 0 ? (
                <div className="space-y-5">
                  {data.replies.map((reply) => (
                    <div
                      key={reply.id}
                      className="border-l-[3px] border-[#9B2335] bg-[#FAFAF8] p-5 md:p-7"
                    >
                      {/* Lawyer info */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-9 h-9 rounded-full bg-[#9B2335] flex items-center justify-center">
                          <Scale size={15} className="text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-[16px] md:text-[17px] font-bold text-[#2C2028]">{reply.lawyer_name}</p>
                          <p className="text-[15px] text-[#aaa]">{formatDate(reply.created_at)}</p>
                        </div>
                        <span className="px-2.5 py-1 bg-[#9B2335]/10 text-[#9B2335] text-[14px] font-bold rounded">
                          공식답변
                        </span>
                      </div>

                      {/* Reply content */}
                      <p className="text-[16px] md:text-[17px] text-[#333] leading-[2] whitespace-pre-wrap">{reply.reply_body}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-14 bg-[#F8F4EE]">
                  <Clock size={32} className="text-[#C9A84C]/40 mx-auto mb-3" />
                  <p className="text-[16px] font-bold text-[#2C2028] mb-1">답변 대기 중입니다</p>
                  <p className="text-[15px] text-[#888]">전문 변호사가 검토 후 답변드리겠습니다.</p>
                </div>
              )}
            </div>

            {/* ── Bottom Nav ── */}
            <div className="flex justify-center pt-4 pb-8">
              <Link
                href="/consultation/board"
                className="px-8 py-3 border border-gray-300 text-[15px] font-medium text-[#555] hover:border-[#2C2028] hover:text-[#2C2028] transition-all"
              >
                목록으로
              </Link>
            </div>
          </div>
        </section>
      ) : null}

    </div>
  );
}
