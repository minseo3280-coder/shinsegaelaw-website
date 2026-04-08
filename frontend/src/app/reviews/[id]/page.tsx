"use client";

import { useParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Phone,
  ArrowLeft,
  ArrowDown,
  Info,
  X,
  Copy,
  MessageCircle,
  Printer,
  Check,
  Quote,
  Award,
  Star,
} from "lucide-react";
import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";
import ScrollReveal from "@/components/ScrollReveal";
import CasesTabs from "@/components/shared/CasesTabs";
import reviewsData from "@/../../data/reviews.json";
import lawyersData from "@/../../data/lawyers.json";

/* ─── Helpers ─── */
function findLawyerData(name: string) {
  const lawyers = (lawyersData as { lawyers?: unknown[] }).lawyers || lawyersData;
  return (
    lawyers as Array<{
      name: string;
      position: string;
      profile_image: string;
      specialty: string[];
    }>
  ).find((l) => name.includes(l.name));
}

function parseLawyers(lawyerStr: string): string[] {
  if (!lawyerStr) return [];
  return lawyerStr.split(",").map((s) => s.trim()).filter(Boolean);
}

function extractName(full: string): string {
  return full.replace(/(대표변호사|책임변호사|수석변호사|총괄변호사|변호사|수원|대전|서울)/g, "").trim();
}

/* ─── Image Lightbox ─── */
function Lightbox({
  images, index, onClose, onPrev, onNext,
}: {
  images: string[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center" onClick={onClose}>
      <button onClick={onClose} className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors z-50" aria-label="닫기">
        <X size={28} />
      </button>
      {images.length > 1 && (
        <>
          <button onClick={(e) => { e.stopPropagation(); onPrev(); }} className="absolute left-4 md:left-8 text-white/50 hover:text-white transition-colors z-50" aria-label="이전 이미지">
            <ChevronLeft size={36} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); onNext(); }} className="absolute right-4 md:right-8 text-white/50 hover:text-white transition-colors z-50" aria-label="다음 이미지">
            <ChevronRight size={36} />
          </button>
        </>
      )}
      <div className="relative max-w-[1400px] max-h-[85vh] w-full mx-4" onClick={(e) => e.stopPropagation()}>
        <Image src={images[index]} alt={`후기 이미지 ${index + 1}`} width={1200} height={800} className="w-full h-auto max-h-[85vh] object-contain" />
        {images.length > 1 && (
          <p className="text-center text-white/40 text-[16px] mt-3">{index + 1} / {images.length}</p>
        )}
      </div>
    </div>
  );
}

/* ─── Share Buttons ─── */
function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = window.location.href;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, []);

  const handleShare = useCallback(() => {
    if (navigator.share) {
      navigator.share({ title, url: window.location.href }).catch(() => {});
    }
  }, [title]);

  const handlePrint = useCallback(() => { window.print(); }, []);

  const btnClass = "flex items-center gap-1 px-3 py-2 text-[15px] text-[#666666] hover:text-[#9B2335] border border-gray-150 hover:border-[#9B2335]/20 rounded-md transition-all duration-200";

  return (
    <div className="flex items-center gap-1.5 print:hidden">
      <button onClick={handleCopy} className={btnClass} aria-label="URL 복사">
        {copied ? (<><Check size={14} className="text-emerald-500" /><span className="text-emerald-500">복사됨</span></>) : (<><Copy size={14} /><span className="hidden sm:inline">URL 복사</span></>)}
      </button>
      <button onClick={handleShare} className={btnClass} aria-label="공유">
        <MessageCircle size={14} /><span className="hidden sm:inline">공유</span>
      </button>
      <button onClick={handlePrint} className={btnClass} aria-label="인쇄">
        <Printer size={14} /><span className="hidden sm:inline">인쇄</span>
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   Main Component
   ═══════════════════════════════════════════════════════ */
export default function ReviewDetailPage() {
  const params = useParams();
  const reviewId = params.id as string;
  const reviews = reviewsData.reviews;

  const currentIndex = reviews.findIndex((r) => String(r.id) === reviewId);
  const fallbackIndex = currentIndex === -1 ? Number(reviewId) : currentIndex;
  const review = reviews[fallbackIndex] as (typeof reviews)[number] & {
    views?: number;
    reply?: string | null;
    replyAuthor?: string | null;
    images?: string[];
    content?: string;
  };

  const prevReview = fallbackIndex > 0 ? reviews[fallbackIndex - 1] : null;
  const nextReview = fallbackIndex < reviews.length - 1 ? reviews[fallbackIndex + 1] : null;

  const lawyerList = useMemo(
    () => (review ? parseLawyers(review.lawyer) : []),
    [review]
  );

  const hashTags = useMemo(() => {
    if (!review) return [];
    const tags: string[] = [];
    if (review.case_type) {
      review.case_type.split(",").forEach((t) => tags.push(t.trim()));
    }
    if (review.result) {
      review.result.split("·").forEach((t) => {
        const trimmed = t.trim();
        if (trimmed && !tags.includes(trimmed)) tags.push(trimmed);
      });
    }
    return tags;
  }, [review]);

  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const allImages = useMemo(() => {
    if (!review) return [];
    if (review.images && review.images.length > 0) return review.images;
    if (review.image) return [review.image];
    return [];
  }, [review]);

  if (!review) {
    return (
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10 py-20 text-center">
        <p className="text-[22px] font-bold text-gray-900 mb-4">후기를 찾을 수 없습니다.</p>
        <Link href="/reviews" className="text-[17px] text-[#9B2335] hover:text-[#7B2D3B]">
          ← 후기 목록으로 돌아가기
        </Link>
      </div>
    );
  }

  // Result stat cards
  const resultStatCards: { label: string; value: string; highlight?: boolean }[] = [];
  if (review.result) {
    const parts = review.result.split("·").map((s) => s.trim()).filter(Boolean);
    if (parts.length >= 2) {
      parts.forEach((part, i) => {
        resultStatCards.push({
          label: i === 0 ? "소송 결과" : "핵심 성과",
          value: part,
          highlight: i === 0,
        });
      });
    } else {
      resultStatCards.push({ label: "소송 결과", value: review.result, highlight: true });
    }
  }

  const leadLawyerName = lawyerList[0] ? extractName(lawyerList[0]) : "";
  const _leadLawyer = leadLawyerName ? findLawyerData(leadLawyerName) : null;

  return (
    <div className="">
      {/* ─── Banner ─── */}
      <section className="relative h-[180px] md:h-[280px] overflow-hidden print:hidden">
        <Image
          src="/images/office/banner-reviews.jpg"
          alt="의뢰인 후기"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f1a]/50 to-[#0f0f1a]/80" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10 h-full flex flex-col justify-end pb-9">
          <nav className="flex items-center gap-1.5 text-[16px] text-white/30 mb-3">
            <Link href="/" className="hover:text-white/50 transition-colors">홈</Link>
            <ChevronRight size={12} className="text-white/20" />
            <Link href="/reviews" className="hover:text-white/50 transition-colors">의뢰인후기</Link>
            <ChevronRight size={12} className="text-white/20" />
            <span className="text-white/50">{review.case_type}</span>
          </nav>
          <p className="text-[14px] tracking-[0.25em] text-[#C9A84C]/55 uppercase font-semibold mb-1.5">
            Client Review
          </p>
          <h1 className="font-sans text-[24px] md:text-[40px] font-bold text-white">의뢰인 후기</h1>
          <div className="w-12 h-[2px] bg-[#C9A84C]/45 mt-3.5 rounded-sm" />
        </div>
      </section>

      {/* ─── Tabs ─── */}
      <div className="print:hidden">
        <CasesTabs />
      </div>

      {/* ═══════════════════════════════════════════════════
          HERO — Cases-style with badge, share, stat cards
          ═══════════════════════════════════════════════════ */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="bg-white border-b border-gray-100"
      >
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10 pt-10 md:pt-14 pb-10 md:pb-12">
          {/* Back + Share */}
          <div className="flex items-center justify-between mb-8 print:hidden">
            <Link href="/reviews" className="inline-flex items-center gap-1.5 text-[16px] text-[#666666] hover:text-[#9B2335] transition-colors">
              <ArrowLeft size={16} />
              목록으로
            </Link>
            <ShareButtons title={review.title} />
          </div>

          {/* Badge */}
          <div className="flex items-center gap-3 mb-5">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#9B2335] text-white text-[14px] font-bold tracking-[0.06em] uppercase rounded">
              <Award size={13} />
              Verified Review
            </span>
            <span className="text-[15px] text-[#666666] font-semibold">{review.case_type}</span>
          </div>

          {/* Title */}
          <h2
            className="font-sans text-[22px] md:text-[42px] lg:text-[48px] font-extrabold leading-[1.35] tracking-[-0.02em] text-[#1A1A2E] mb-5"
            style={{ wordBreak: "keep-all" }}
          >
            {review.title}
          </h2>

          {/* Meta line */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[14px] md:text-[16px] text-[#666666] mb-6 md:mb-8">
            {review.date && <span className="text-[#444444] font-semibold">{review.date}</span>}
            {review.views != null && review.views > 0 && (
              <>
                <span className="text-gray-200">|</span>
                <span>조회 {review.views.toLocaleString()}</span>
              </>
            )}
            {lawyerList.length > 0 && (
              <>
                <span className="text-gray-200">|</span>
                <span>담당: {lawyerList.join(", ")}</span>
              </>
            )}
          </div>

          {/* Hash tags */}
          {hashTags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {hashTags.map((tag) => (
                <span
                  key={tag}
                  className="px-3.5 py-1.5 border border-gray-200 rounded-full text-[15px] text-[#333333] font-semibold bg-gray-50/50"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Result Stat Cards — refined border + text accent */}
          {resultStatCards.length > 0 && (
            <div className={`grid gap-3 ${resultStatCards.length >= 3 ? "grid-cols-2 sm:grid-cols-3" : resultStatCards.length === 2 ? "grid-cols-2" : "grid-cols-1 max-w-sm"}`}>
              {resultStatCards.map((card, i) => (
                <div
                  key={i}
                  className={`rounded-xl px-5 py-5 text-center transition-all ${
                    card.highlight
                      ? "bg-[#FDF2F4] border border-[#9B2335]/15"
                      : "bg-white border border-gray-200"
                  }`}
                >
                  <p className={`text-[14px] tracking-[0.04em] font-semibold mb-2 ${
                    card.highlight ? "text-[#9B2335]/60" : "text-gray-400"
                  }`}>
                    {card.label}
                  </p>
                  <p
                    className={`font-extrabold leading-tight ${
                      card.highlight
                        ? "text-[20px] md:text-[22px] text-[#9B2335]"
                        : "text-[17px] md:text-[19px] text-[#2C2028]"
                    }`}
                    style={{ fontFamily: "Pretendard, -apple-system, sans-serif" }}
                  >
                    {card.value}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.section>

      {/* ═══════════════════════════════════════════════════
          REVIEW CONTENT — Quote-style with decorative marks
          ═══════════════════════════════════════════════════ */}
      {review.content && review.content.length > 10 && (
        <ScrollReveal y={30}>
        <section className="bg-[#FAFAFA] border-b border-gray-100">
          <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10 py-14 md:py-20">
            <div className="flex items-center gap-2.5 mb-6 md:mb-8">
              <Quote size={20} className="text-[#9B2335]" />
              <h3 className="font-sans text-[18px] md:text-[24px] font-bold text-[#1A1A2E]">
                의뢰인이 <span className="text-[#9B2335]">전하는 이야기</span>
              </h3>
            </div>

            <div className="relative bg-white rounded-2xl p-5 md:p-12 shadow-[0_2px_16px_rgba(0,0,0,0.04)] border border-gray-100/80">
              {/* Decorative quotes — 제거됨 (글씨 가림 문제) */}

              <div className="relative z-10">
                <p
                  className="text-[15px] md:text-[18px] leading-[2.1] text-[#333333] whitespace-pre-line"
                  style={{ wordBreak: "keep-all" }}
                >
                  {review.content}
                </p>
              </div>

              {/* Author line */}
              <div className="relative z-10 mt-8 pt-6 border-t border-gray-100 flex items-center gap-4">
                <div className="w-1 h-10 bg-[#9B2335]/20 rounded-full" />
                <div>
                  <p className="text-[16px] font-bold text-[#2C2028]">{review.case_type} 사건 의뢰인</p>
                  <div className="flex items-center gap-0.5 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className="text-[#C9A84C] fill-[#C9A84C]" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        </ScrollReveal>
      )}

      {/* ═══════════════════════════════════════════════════
          IMAGES — Gallery with lightbox
          ═══════════════════════════════════════════════════ */}
      {allImages.length > 0 && (
        <ScrollReveal y={30}>
        <section className="bg-white border-b border-gray-100">
          <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10 py-14 md:py-20">
            <div className="flex items-center gap-2.5 mb-6">
              <CheckCircle2 size={20} className="text-[#9B2335]" />
              <h3 className="font-sans text-[18px] md:text-[24px] font-bold text-[#1A1A2E]">
                의뢰인의 <span className="text-[#9B2335]">감사 후기</span>
              </h3>
              {allImages.length > 1 && (
                <span className="text-[14px] text-gray-400 font-semibold ml-auto">
                  {allImages.length}장의 이미지
                </span>
              )}
            </div>

            {/* Images — thumbnail grid, click to lightbox for full size */}
            <div className={`grid gap-3 ${allImages.length === 1 ? "grid-cols-2 md:grid-cols-3" : allImages.length === 2 ? "grid-cols-2 md:grid-cols-3" : "grid-cols-3 md:grid-cols-4"}`}>
              {allImages.map((img, i) => (
                <div
                  key={i}
                  className="rounded-lg overflow-hidden bg-gray-50 cursor-pointer group relative aspect-square border border-gray-100"
                  onClick={() => setLightboxIdx(i)}
                >
                  <Image
                    src={img}
                    alt={`${review.case_type} 후기 ${i + 1}`}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
                    sizes="(max-width: 768px) 33vw, 250px"
                    priority={i === 0}
                  />
                  {/* Zoom icon overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center shadow-sm">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        </ScrollReveal>
      )}

      {/* ═══════════════════════════════════════════════════
          OFFICIAL REPLY — Premium section
          ═══════════════════════════════════════════════════ */}
      {review.reply && (
        <ScrollReveal delay={100}>
        <section className="bg-[#F8F4EE] border-b border-gray-200/50">
          <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10 py-14 md:py-20">
            <div className="flex items-center gap-2.5 mb-6 md:mb-8">
              <CheckCircle2 size={20} className="text-[#9B2335]" />
              <h3 className="font-sans text-[18px] md:text-[24px] font-bold text-[#1A1A2E]">
                신세계로의 <span className="text-[#9B2335]">공식 답변</span>
              </h3>
            </div>

            <div className="bg-white rounded-2xl p-5 md:p-10 shadow-[0_2px_16px_rgba(0,0,0,0.04)] border border-gray-100/80">
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-full bg-[#9B2335] flex items-center justify-center flex-shrink-0 overflow-hidden p-[8px] shadow-md">
                  <Image
                    src="/images/logo-on.png"
                    alt="법무법인 신세계로"
                    width={32}
                    height={32}
                    className="object-contain brightness-0 invert"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2.5 mb-4">
                    <p className="text-[18px] font-bold text-gray-900">
                      {review.replyAuthor || "법무법인 신세계로"}
                    </p>
                    <span className="px-3 py-1 bg-[#9B2335]/10 text-[#9B2335] text-[14px] font-bold rounded-md">
                      공식답변
                    </span>
                  </div>
                  <p
                    className="text-[15px] md:text-[18px] leading-[2] text-[#333333]"
                    style={{ wordBreak: "keep-all" }}
                  >
                    {review.reply}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        </ScrollReveal>
      )}

      {/* ═══════════════════════════════════════════════════
          ATTORNEY IN CHARGE — 가로 배치 (사진 왼쪽 + 정보 오른쪽)
          ═══════════════════════════════════════════════════ */}
      {lawyerList.length > 0 && (
        <ScrollReveal delay={100}>
        <section className="bg-[#F8F4EE] border-b border-[#e8e3d9]">
          <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10 py-14 md:py-20">
            <div className="flex items-center gap-2.5 mb-5 md:mb-7">
              <CheckCircle2 size={20} className="text-[#9B2335]" />
              <h3 className="font-sans text-[18px] md:text-[24px] font-bold text-[#1A1A2E]">
                사건 담당 <span className="text-[#9B2335]">변호사</span>
              </h3>
            </div>
            <div className="flex flex-col gap-4">
              {lawyerList.map((fullName) => {
                const name = extractName(fullName);
                const lawyer = findLawyerData(name);
                return (
                  <Link
                    key={fullName}
                    href={lawyer ? `/about/lawyers/${encodeURIComponent(lawyer.name)}` : "#"}
                    className="flex items-center gap-5 group bg-white rounded-xl p-5 md:p-6 border border-gray-100 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <div className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] rounded-full overflow-hidden border-3 border-white shadow-[0_2px_12px_rgba(0,0,0,0.08)] flex-shrink-0">
                      {lawyer?.profile_image ? (
                        <Image
                          src={lawyer.profile_image}
                          alt={name}
                          width={100}
                          height={100}
                          className="w-full h-full object-cover object-top"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[17px] md:text-[22px] font-bold text-[#2C2028] group-hover:text-burgundy-600 transition-colors">
                        {name}
                      </p>
                      <p className="text-[16px] text-[#333333] mt-0.5 font-semibold">
                        {lawyer?.position || "변호사"}
                      </p>
                      {lawyer?.specialty && lawyer.specialty.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-2.5">
                          {lawyer.specialty.slice(0, 3).map((s) => (
                            <span key={s} className="text-[14px] px-2.5 py-1 rounded-full bg-burgundy-50 text-burgundy-600 font-semibold">
                              {s}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <span className="text-[15px] text-burgundy-600 font-bold flex items-center gap-1 flex-shrink-0 group-hover:gap-2 transition-all">
                      프로필 <ChevronRight size={14} />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
        </ScrollReveal>
      )}

      {/* ═══════════════════════════════════════════════════
          BOTTOM — Disclaimer, CTA, Prev/Next
          ═══════════════════════════════════════════════════ */}
      <ScrollReveal y={30}>
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10 py-14 md:py-20">
        {/* Disclaimer */}
        <div className="flex items-start gap-2.5 py-4 mb-8 md:mb-10 border-t border-gray-100">
          <Info size={15} className="text-stone-300 flex-shrink-0 mt-[2px]" />
          <p className="text-[14px] md:text-[17px] leading-[1.7] text-stone-400">
            의뢰인의 개인정보 보호 및 이해를 돕기 위해 일부 표현이 편집 또는 재구성되었습니다.
          </p>
        </div>

        {/* Inline CTA */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-5 py-5 md:px-7 md:py-7 bg-[#F8F4EE] rounded-xl mb-10 md:mb-12 print:hidden">
          <div>
            <p className="text-[16px] md:text-[19px] font-bold text-[#2C2028] mb-1">
              비슷한 상황으로 고민 중이신가요?
            </p>
            <p className="text-[15px] md:text-[17px] text-[#333333]">
              전문 변호사가 무료로 상담해드립니다.
            </p>
          </div>
          <Link
            href="/consultation"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#9B2335] text-white text-[16px] font-bold rounded-xl hover:bg-[#7B2D3B] transition-colors whitespace-nowrap"
          >
            <Phone size={16} />
            무료 상담 신청
          </Link>
        </div>

        {/* Prev / Next */}
        <div className="border-t border-gray-200 print:hidden">
          {nextReview && (
            <Link
              href={`/reviews/${nextReview.id}`}
              className="flex items-center gap-4 py-5 border-b border-gray-100 hover:bg-gray-50/50 -mx-2 px-2 rounded transition-colors group"
            >
              <span className="text-[16px] text-gray-400 w-16 flex items-center gap-1.5 shrink-0">
                <ArrowDown size={13} /> 다음글
              </span>
              <span className="text-[17px] text-[#333333] group-hover:text-[#9B2335] line-clamp-1 transition-colors font-semibold">
                {nextReview.title || nextReview.case_type}
              </span>
            </Link>
          )}
          {prevReview && (
            <Link
              href={`/reviews/${prevReview.id}`}
              className="flex items-center gap-4 py-5 border-b border-gray-100 hover:bg-gray-50/50 -mx-2 px-2 rounded transition-colors group"
            >
              <span className="text-[16px] text-gray-400 w-16 flex items-center gap-1.5 shrink-0">
                <ArrowDown size={13} className="rotate-180" /> 이전글
              </span>
              <span className="text-[17px] text-[#333333] group-hover:text-[#9B2335] line-clamp-1 transition-colors font-semibold">
                {prevReview.title || prevReview.case_type}
              </span>
            </Link>
          )}
          <div className="flex justify-center pt-8">
            <Link
              href="/reviews"
              className="px-10 py-3 border border-gray-300 rounded-xl text-[17px] text-[#333333] font-semibold hover:border-[#9B2335]/30 hover:text-[#9B2335] transition-all"
            >
              목록
            </Link>
          </div>
        </div>
      </div>
      </ScrollReveal>

      {/* Lightbox */}
      {lightboxIdx !== null && allImages.length > 0 && (
        <Lightbox
          images={allImages}
          index={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
          onPrev={() => setLightboxIdx((prev) => prev !== null ? (prev - 1 + allImages.length) % allImages.length : 0)}
          onNext={() => setLightboxIdx((prev) => prev !== null ? (prev + 1) % allImages.length : 0)}
        />
      )}
    </div>
  );
}
