"use client";

import { useParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ChevronRight,
  ChevronLeft,
  ArrowLeft,
  Check,
  Phone,
  X,
  Copy,
  MessageCircle,
  Printer,
  ImageOff,
  Info,
  Scale,
  CheckCircle2,
  Clock,
  Eye,
  Award,
} from "lucide-react";
import CasesTabs from "@/components/shared/CasesTabs";
import ScrollReveal from "@/components/ScrollReveal";
import { EASE } from "@/lib/motion";
import casesAll from "@/../../data/cases_all.json";
import lawyersData from "@/../../data/lawyers.json";

/* ─── Types ─── */
interface CaseItem {
  id: number;
  k_id: number;
  category: string;
  categories: string[];
  title: string;
  summary: string;
  content: string;
  result: string;
  result_type: string;
  lawyers: string[];
  winDate: string;
  regDate: string;
  views: number;
  hasImages: boolean;
  imageCount: number;
  images: string[];
}

/* ─── Helpers ─── */
function extractAmount(result: string): { amount: string; unit: string } | null {
  if (!result) return null;
  const m = result.match(/(\d[\d,.]*)\s*(억|만)\s*(원|만원)?/);
  if (!m) return null;
  return { amount: m[1], unit: m[2] === "억" ? "억원" : "만원" };
}

function extractResultItems(result: string): string[] {
  if (!result) return [];
  return result
    .split(/[|\n]/)
    .map((s) => s.replace(/^[-·•\s]+/, "").trim())
    .filter((s) => s.length > 2 && s.length < 100);
}

function parseContentSections(content: string) {
  const sections: { type: string; title: string; text: string }[] = [];
  if (!content) return sections;

  const sectionMap: Record<string, string> = {
    "담당변호사 재판 후기": "review",
    "담당변호사 승소 후기": "review",
    간략내용: "summary",
    "사건 개요": "summary",
    "신세계로에서는": "strategy",
    "신세계로의 전략": "strategy",
    "신세계로의 법률 전략": "strategy",
    "신세계로의 필승 전략": "strategy",
    결과: "result",
  };

  const regex = /【([^】]+)】\s*\n?([\s\S]*?)(?=【|$)/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const title = match[1].trim();
    // 모든 줄바꿈 → 공백 (한 문단으로 자연스럽게 이어붙임)
    const text = match[2].trim().replace(/\n+/g, " ").replace(/  +/g, " ");
    if (text.length > 5) {
      const type = sectionMap[title] || "body";
      sections.push({ type, title, text });
    }
  }

  if (sections.length === 0 && content.length > 20) {
    const cleaned = content.replace(/\n+/g, " ").replace(/  +/g, " ").trim();
    sections.push({ type: "body", title: "", text: cleaned });
  }

  return sections;
}

/** 전략 섹션 텍스트에서 번호 매긴 항목 추출 */
function parseStrategyItems(text: string): { title: string; desc: string }[] {
  const items: { title: string; desc: string }[] = [];
  const lines = text.split("\n").filter((l) => l.trim());
  let current: { title: string; desc: string } | null = null;

  for (const line of lines) {
    const m = line.match(/^(\d{1,2})[.)]\s*(.+)/);
    if (m) {
      if (current) items.push(current);
      current = { title: m[2].trim(), desc: "" };
    } else if (current) {
      current.desc += (current.desc ? "\n" : "") + line.trim();
    } else {
      if (items.length === 0 && !current) {
        current = { title: "", desc: line.trim() };
      }
    }
  }
  if (current) items.push(current);
  return items;
}

function findLawyerData(name: string) {
  const lawyers = lawyersData.lawyers || lawyersData;
  return (
    lawyers as Array<{
      name: string;
      position: string;
      profile_image: string;
      specialty: string[];
    }>
  ).find((l) => l.name === name);
}

/** 제목에서 금액 부분을 하이라이트 처리 */
function highlightAmount(title: string) {
  const m = title.match(/([\d,.]+(억\s*)?[\d,.]*만?\s*원)/);
  if (!m) return <>{title}</>;
  const idx = title.indexOf(m[0]);
  return (
    <>
      {title.slice(0, idx)}
      <span className="text-[#9B2335]">{m[0]}</span>
      {title.slice(idx + m[0].length)}
    </>
  );
}

/* ─── Fallback Image ─── */
function ImageFallback({ className }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center justify-center bg-gray-100 text-gray-400 ${className || ""}`}>
      <ImageOff size={28} className="mb-1.5 text-gray-300" />
      <span className="text-[14px]">이미지를 불러올 수 없습니다</span>
    </div>
  );
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
  const [imgError, setImgError] = useState(false);

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

  useEffect(() => { setImgError(false); }, [index]);

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
        {imgError ? (
          <ImageFallback className="w-full h-[60vh] rounded-lg" />
        ) : (
          <Image src={images[index]} alt={`판결문 ${index + 1}`} width={900} height={1200} className="w-full h-auto max-h-[85vh] object-contain" onError={() => setImgError(true)} />
        )}
        {images.length > 1 && (
          <p className="text-center text-white/40 text-[16px] mt-3">{index + 1} / {images.length}</p>
        )}
      </div>
    </div>
  );
}

/* ─── Share Buttons ─── */
function ShareButtons({ caseItem }: { caseItem: CaseItem }) {
  const [copied, setCopied] = useState(false);
  const shareUrl = `https://shinsegaelaw.kr/cases/${caseItem.id}`;

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = shareUrl;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [shareUrl]);

  const handleKakao = useCallback(() => {
    if (navigator.share) {
      navigator.share({ title: caseItem.title, url: shareUrl }).catch(() => {});
    } else {
      window.open(`https://story.kakao.com/share?url=${encodeURIComponent(shareUrl)}`, "_blank", "width=480,height=600");
    }
  }, [caseItem.title, shareUrl]);

  const handlePrint = useCallback(() => { window.print(); }, []);

  const btnClass = "flex items-center gap-1 px-3 py-2 text-[15px] text-[#333333] hover:text-[#9B2335] border border-gray-200 hover:border-[#9B2335]/20 rounded-md transition-all duration-200";

  return (
    <div className="flex items-center gap-1.5 print:hidden">
      <button onClick={handleCopy} className={btnClass} aria-label="URL 복사">
        {copied ? (<><Check size={14} className="text-emerald-500" /><span className="text-emerald-500">복사됨</span></>) : (<><Copy size={14} /><span className="hidden sm:inline">URL 복사</span></>)}
      </button>
      <button onClick={handleKakao} className={btnClass} aria-label="공유">
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
function CaseDetailContent() {
  const params = useParams();
  const id = Number(params.id);
  const allCases = casesAll.cases as CaseItem[];
  const caseItem = allCases.find((c) => c.id === id);

  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [_mainImgError, setMainImgError] = useState(false);
  const [_thumbErrors, setThumbErrors] = useState<Record<number, boolean>>({});


  const sections = useMemo(() => (caseItem ? parseContentSections(caseItem.content) : []), [caseItem]);

  const amountInfo = caseItem ? extractAmount(caseItem.result) : null;
  const resultItems = caseItem ? extractResultItems(caseItem.result) : [];

  if (!caseItem) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-[20px] font-bold text-gray-900 mb-2">사례를 찾을 수 없습니다.</p>
          <Link href="/cases" className="text-[16px] text-[#9B2335] hover:text-[#7B2D3B]">승소사례 목록으로 돌아가기</Link>
        </div>
      </div>
    );
  }

  const reviewSection = (() => {
    const s = sections.find((s) => s.type === "review");
    if (!s) return null;
    // Hide truncated reviews (doesn't end with sentence-ending character)
    const trimmed = s.text.replace(/\s+$/g, "");
    if (trimmed.length > 0 && !/[.다요!?\n됨]$/.test(trimmed)) return null;
    // Hide reviews with script/HTML artifacts
    if (/\$\(|function|addClass|removeClass|click\(/.test(s.text)) return null;
    return s;
  })();
  const summarySection = sections.find((s) => s.type === "summary");
  const strategySection = sections.find((s) => s.type === "strategy");
  const otherSections = sections.filter((s) => s.type !== "review" && s.type !== "result" && s.type !== "summary" && s.type !== "strategy");
  const strategyItems = strategySection ? parseStrategyItems(strategySection.text) : [];

  // Result stat cards
  const resultStatCards: { label: string; value: string; highlight?: boolean }[] = [];
  resultStatCards.push({ label: "판결 결과", value: caseItem.result_type === "조정" ? "조정 성립" : caseItem.result_type === "합의" ? "합의 성립" : "승소 판결" });
  if (amountInfo) {
    resultStatCards.push({ label: "재산분할금액", value: `${amountInfo.amount}${amountInfo.unit}`, highlight: true });
  }
  const extraItems = resultItems.filter((item) => !item.match(/\d[\d,.]*\s*(억|만)\s*원/) && item.length < 30);
  extraItems.slice(0, amountInfo ? 2 : 3).forEach((item) => {
    resultStatCards.push({
      label: item.includes("양육") ? "친권/양육권" : item.includes("위자") ? "위자료" : item.includes("기여") ? "기여도 인정" : "핵심 성과",
      value: item,
    });
  });

  const leadLawyerName = caseItem.lawyers[0];
  const leadLawyer = leadLawyerName ? findLawyerData(leadLawyerName) : null;

  const winYear = caseItem.winDate?.split(".")[0] || "";
  const winMonth = caseItem.winDate?.split(".")[1] || "";
  const caseLabel = winYear && winMonth ? `${winYear}-${winMonth.padStart(2, "0")}` : "";

  const issuePills = caseItem.categories.slice(0, 4);

  return (
    <div className="">
      {/* ─── Banner ─── */}
      <section className="relative h-[180px] md:h-[280px] overflow-hidden print:hidden">
        <Image src="/images/office/banner-cases.jpg" alt="승소사례" fill sizes="100vw" className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f1a]/50 to-[#0f0f1a]/80" />
        <div className="relative z-10 max-w-[1600px] mx-auto px-5 md:px-8 lg:px-10 h-full flex flex-col justify-end pb-9">
          <nav className="flex items-center gap-1.5 text-[15px] text-white/30 mb-3">
            <Link href="/" className="hover:text-white/50 transition-colors">홈</Link>
            <ChevronRight size={12} className="text-white/20" />
            <Link href="/cases" className="hover:text-white/50 transition-colors">승소사례</Link>
            <ChevronRight size={12} className="text-white/20" />
            <span className="text-white/50">{caseItem.category}</span>
          </nav>
          <p className="text-[14px] tracking-[0.25em] text-[#C9A84C]/55 uppercase font-semibold mb-1.5">Winning Cases</p>
          <h1 className="font-sans text-[30px] md:text-[34px] font-bold text-white">{caseItem.category} 승소사례</h1>
          <div className="w-10 h-[2px] bg-[#C9A84C]/45 mt-3.5 rounded-sm" />
        </div>
      </section>

      {/* ─── Tabs ─── */}
      <div className="print:hidden"><CasesTabs /></div>

      {/* ═══════════════════════════════════════════════════
          HERO SECTION — Design 2 style
          ═══════════════════════════════════════════════════ */}
      <ScrollReveal y={30}>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="bg-white border-b border-gray-100 print:border-0"
      >
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10 pt-10 md:pt-14 pb-10 md:pb-12">
          {/* Back + Share */}
          <div className="flex items-center justify-between mb-8 print:hidden">
            <Link href="/cases" className="inline-flex items-center gap-1.5 text-[16px] text-[#333333] hover:text-[#9B2335] transition-colors">
              <ArrowLeft size={16} />
              목록으로
            </Link>
            <ShareButtons caseItem={caseItem} />
          </div>

          {/* BEST CASE STUDY label */}
          <div className="flex items-center gap-3 mb-5">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#9B2335] text-white text-[14px] font-bold tracking-[0.06em] uppercase rounded">
              <Award size={13} />
              BEST CASE STUDY
            </span>
          </div>

          {/* Title — with amount highlighted in burgundy */}
          <h2
            className="font-sans text-[22px] md:text-[42px] lg:text-[50px] font-extrabold leading-[1.35] tracking-[-0.025em] text-[#1A1A2E] mb-4 md:mb-5"
            style={{ wordBreak: "keep-all" }}
          >
            {highlightAmount(caseItem.title)}
          </h2>

          {/* Meta line */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[14px] md:text-[16px] text-[#333333] mb-6 md:mb-8">
            <span className="text-[#333333] font-semibold">Case {caseLabel || `No. ${caseItem.k_id || caseItem.id}`}</span>
            <span className="text-gray-300">|</span>
            <span>분야: {caseItem.categories.join(", ")}</span>
            {caseItem.views > 0 && (
              <>
                <span className="text-gray-300">|</span>
                <span className="flex items-center gap-1"><Eye size={14} className="text-[#444444]" />조회수: {caseItem.views.toLocaleString()}</span>
              </>
            )}
            {caseItem.winDate && (
              <>
                <span className="text-gray-300">|</span>
                <span>{caseItem.winDate}</span>
              </>
            )}
          </div>

          {/* ─── Result Stat Cards ─── */}
          {resultStatCards.length > 0 && (
            <div className={`grid gap-2.5 md:gap-3 ${resultStatCards.length >= 4 ? "grid-cols-2 md:grid-cols-4" : resultStatCards.length === 3 ? "grid-cols-1 sm:grid-cols-3" : resultStatCards.length === 2 ? "grid-cols-2" : "grid-cols-1 max-w-xs"}`}>
              {resultStatCards.map((card, i) => (
                <div
                  key={i}
                  className={`rounded-xl px-3 py-4 md:px-5 md:py-5 text-center transition-all ${
                    card.highlight
                      ? "bg-[#FDF2F4] border border-[#9B2335]/15"
                      : "bg-white border border-gray-200"
                  }`}
                >
                  <p className={`text-[12px] md:text-[14px] tracking-[0.04em] font-semibold mb-1.5 md:mb-2 ${
                    card.highlight ? "text-[#9B2335]/60" : "text-gray-400"
                  }`}>
                    {card.label}
                  </p>
                  <p
                    className={`font-extrabold leading-tight ${
                      card.highlight
                        ? "text-[20px] md:text-[28px] text-[#9B2335]"
                        : "text-[16px] md:text-[22px] text-[#2C2028]"
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
      </ScrollReveal>

      {/* ═══════════════════════════════════════════════════
          MOBILE: 사건 정보 (담당변호사 후기 바로 위)
          ═══════════════════════════════════════════════════ */}
      <div className="lg:hidden print:hidden">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 py-6 border-b border-gray-100">
          <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
            <h3 className="font-sans text-[16px] font-bold text-gray-900 mb-3 pb-2.5 border-b border-gray-200">사건 정보</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-[13px] font-semibold text-[#555] mb-0.5">사건 유형</p>
                <p className="text-[15px] font-semibold text-[#2C2028]">{caseItem.category}</p>
              </div>
              {amountInfo && (
                <div>
                  <p className="text-[13px] font-semibold text-[#555] mb-0.5">확보 금액</p>
                  <p className="text-[15px] font-bold text-[#9B2335]">{amountInfo.amount}{amountInfo.unit}</p>
                </div>
              )}
              <div>
                <p className="text-[13px] font-semibold text-[#555] mb-0.5">담당 변호사</p>
                <p className="text-[15px] font-semibold text-[#2C2028]">{caseItem.lawyers.join(", ")}</p>
              </div>
              <div>
                <p className="text-[13px] font-semibold text-[#555] mb-0.5">승소 날짜</p>
                <p className="text-[15px] font-semibold text-[#2C2028]">{caseItem.winDate}</p>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-200 flex flex-wrap gap-1.5">
              {issuePills.map((pill) => (
                <span key={pill} className="px-2 py-0.5 text-[13px] font-semibold text-[#333] bg-white rounded-md border border-gray-100">{pill}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════
          ATTORNEY REVIEW — 카드형 가로 배치 (사진 + 후기)
          ═══════════════════════════════════════════════════ */}
      {reviewSection && (
        <ScrollReveal delay={100} y={40}>
        <section className="bg-[#F8F4EE] border-b border-[#e8e3d9] print:bg-white">
          <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10 py-10 md:py-14">
            <div className="flex items-center gap-2.5 mb-7">
              <CheckCircle2 size={20} className="text-[#9B2335]" />
              <h3 className="font-sans text-[22px] md:text-[24px] font-bold text-[#1A1A2E]">
                담당변호사 <span className="text-[#9B2335]">승소 후기</span>
              </h3>
            </div>

            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-[0_2px_16px_rgba(0,0,0,0.04)] border border-gray-100/80">
              <div className="flex gap-6 md:gap-8">
                {/* 변호사 프로필 */}
                {leadLawyer?.profile_image && (
                  <div className="flex-shrink-0 hidden sm:block">
                    <div className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] rounded-full overflow-hidden border-3 border-white shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
                      <Image src={leadLawyer.profile_image} alt={leadLawyerName} width={100} height={100} className="w-full h-full object-cover object-top" />
                    </div>
                    <p className="text-[16px] font-bold text-[#2C2028] text-center mt-3">{leadLawyerName}</p>
                    <p className="text-[14px] text-[#444444] text-center">{leadLawyer.position}</p>
                  </div>
                )}

                {/* 후기 본문 */}
                <div className="flex-1 min-w-0">
                  <div className="border-l-[3px] border-[#9B2335]/20 pl-5 md:pl-6">
                    <p
                      className="text-[15px] md:text-[18px] leading-[1.9] md:leading-[2] text-[#333333] whitespace-pre-line"
                      style={{ wordBreak: "keep-all" }}
                    >
                      {reviewSection.text}
                    </p>
                  </div>

                  {/* 변호사 정보 (모바일에서는 여기서 표시) */}
                  <div className="mt-5 pt-4 border-t border-gray-100 flex items-center gap-3">
                    {leadLawyer?.profile_image && (
                      <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm sm:hidden">
                        <Image src={leadLawyer.profile_image} alt={leadLawyerName} width={40} height={40} className="w-full h-full object-cover object-top" />
                      </div>
                    )}
                    <div>
                      <p className="text-[15px] text-[#444444]">
                        {caseItem.lawyers.map((n, i) => {
                          const l = findLawyerData(n);
                          return <span key={n}>{i > 0 && " · "}{l?.position || ""} {n}</span>;
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        </ScrollReveal>
      )}

      {/* ═══════════════════════════════════════════════════
          BODY — Design 3 style (sidebar + main)
          ═══════════════════════════════════════════════════ */}
      <ScrollReveal delay={100} y={40}>
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10 py-10 md:py-14 print:px-0 print:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10 lg:gap-14 print:block">

          {/* ─── LEFT SIDEBAR: 사건 정보 ─── */}
          <aside className="hidden lg:block print:hidden">
            <div className="sticky top-[96px]">
              <h3 className="font-sans text-[20px] font-bold text-gray-900 mb-6 pb-4 border-b-2 border-[#9B2335]">사건 정보</h3>
              <div className="space-y-5">
                <div>
                  <p className="text-[15px] font-semibold text-[#333333] tracking-[0.02em] mb-1.5">관할 법원</p>
                  <p className="text-[16px] font-semibold text-[#2C2028]">
                    {caseItem.content.match(/서울[가-힣]*법원|[가-힣]+지방법원|[가-힣]+고등법원/)?.[0] || "서울가정법원"}
                  </p>
                </div>
                <div>
                  <p className="text-[15px] font-semibold text-[#333333] tracking-[0.02em] mb-2">주요 쟁점</p>
                  <div className="flex flex-wrap gap-1.5">
                    {issuePills.map((pill) => (
                      <span key={pill} className="inline-block px-2.5 py-1 text-[15px] font-semibold text-[#333333] bg-gray-100 rounded-md">{pill}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[15px] font-semibold text-[#333333] tracking-[0.02em] mb-2">담당 변호사</p>
                  {caseItem.lawyers.map((name: string) => {
                    const lawyer = findLawyerData(name);
                    return (
                      <Link key={name} href={lawyer ? `/about/lawyers/${encodeURIComponent(name)}` : "#"} className="flex items-center gap-2.5 py-2 hover:pl-1 transition-all">
                        <div className="w-9 h-9 rounded-full bg-gray-100 overflow-hidden flex-shrink-0">
                          {lawyer?.profile_image && (
                            <Image src={lawyer.profile_image} alt={name} width={36} height={36} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                          )}
                        </div>
                        <div>
                          <p className="text-[16px] font-semibold text-gray-900">{name}</p>
                          <p className="text-[14px] text-[#333333]">{lawyer?.position || "변호사"}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
                {caseItem.winDate && (
                  <div>
                    <p className="text-[15px] font-semibold text-[#333333] tracking-[0.02em] mb-1.5">승소 날짜</p>
                    <p className="text-[16px] font-semibold text-[#2C2028] flex items-center gap-1.5">
                      <Clock size={15} className="text-[#444444]" />{caseItem.winDate}
                    </p>
                  </div>
                )}
              </div>

            </div>
          </aside>

          {/* ─── RIGHT: Main Content ─── */}
          <article>
            {/* 사건 개요 */}
            {summarySection && (
              <div className="mb-12">
                <h3 className="font-sans text-[24px] md:text-[26px] font-bold text-gray-900 mb-5 flex items-center gap-2">
                  <span className="w-1 h-6 bg-[#9B2335] rounded-sm" />사건 개요
                </h3>
                <div className="text-[15px] md:text-[18px] leading-[1.9] md:leading-[2] text-[#2C2028] font-semibold whitespace-pre-line" style={{ wordBreak: "keep-all" }}>
                  {summarySection.text}
                </div>
              </div>
            )}

            {/* Images — 썸네일 그리드, 클릭 시 라이트박스 원본 보기 */}
            {caseItem.hasImages && caseItem.images.length > 0 && (
              <div className="mb-12">
                <h3 className="font-sans text-[18px] md:text-[20px] font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 bg-[#9B2335] rounded-sm" />판결문 원본
                  <span className="text-[13px] text-gray-400 font-semibold ml-1">{caseItem.images.length}장</span>
                </h3>
                <div className={`grid gap-2.5 ${caseItem.images.length === 1 ? "grid-cols-2" : caseItem.images.length === 2 ? "grid-cols-2" : "grid-cols-3 md:grid-cols-4"}`}>
                  {caseItem.images.map((img: string, i: number) => (
                    <div
                      key={i}
                      className="rounded-lg overflow-hidden bg-gray-50 cursor-pointer group relative aspect-square border border-gray-100"
                      onClick={() => setLightboxIdx(i)}
                    >
                      <Image
                        src={img}
                        alt={`판결문 ${i + 1}`}
                        width={300}
                        height={300}
                        className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
                        sizes="(max-width: 768px) 33vw, 200px"
                        onError={() => i === 0 ? setMainImgError(true) : setThumbErrors((prev) => ({ ...prev, [i]: true }))}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-sm">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 신세계로의 법률 전략 — Numbered Cards (Design 3) */}
            {strategySection && (
              <div className="mb-12">
                <h3 className="font-sans text-[24px] md:text-[26px] font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Scale size={22} className="text-[#9B2335]" />신세계로의 법률 전략
                </h3>
                {strategyItems.length > 1 ? (
                  <div className="space-y-4">
                    {strategyItems.map((item, i) => (
                      <div key={i} className="bg-white border border-gray-100 rounded-xl p-4 md:p-6 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-all duration-300">
                        <div className="flex items-start gap-3 md:gap-4">
                          <span className="flex-shrink-0 w-9 h-9 rounded-full bg-[#9B2335] text-white flex items-center justify-center text-[15px] font-bold">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <div className="flex-1">
                            {item.title && <h4 className="font-sans text-[19px] font-bold text-gray-900 mb-2 leading-snug">{item.title}</h4>}
                            <p className="text-[14px] md:text-[17px] leading-[1.8] md:leading-[1.85] text-[#333333] font-semibold whitespace-pre-line" style={{ wordBreak: "keep-all" }}>{item.desc || item.title}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-[15px] md:text-[18px] leading-[1.9] md:leading-[2] text-[#2C2028] font-semibold whitespace-pre-line" style={{ wordBreak: "keep-all" }}>
                    {strategySection.text}
                  </div>
                )}
              </div>
            )}

            {/* Other Body Sections */}
            {otherSections.map((section, i) => (
              <div key={i} className="mb-10">
                {section.title && (
                  <h3 className="font-sans text-[22px] font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="w-1 h-5 bg-[#9B2335] rounded-sm" />{section.title}
                  </h3>
                )}
                <div className="text-[15px] md:text-[18px] leading-[1.9] md:leading-[2] text-[#2C2028] font-semibold whitespace-pre-line" style={{ wordBreak: "keep-all" }}>{section.text}</div>
              </div>
            ))}

            {/* Disclaimer */}
            <div className="flex items-start gap-2.5 py-5 mt-4 mb-10 border-t border-gray-100">
              <Info size={15} className="text-stone-300 flex-shrink-0 mt-[2px]" />
              <p className="text-[17px] leading-[1.7] text-stone-400">
                본 사례는 의뢰인의 개인정보 보호를 위해 일부 내용이 수정되었으며, 개별 사건의 결과는 사안에 따라 달라질 수 있습니다.
              </p>
            </div>

            {/* Inline CTA */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-5 py-5 md:px-7 md:py-6 bg-[#F8F4EE] rounded-xl mb-12 print:hidden">
              <p className="text-[17px] text-[#333333]">
                <strong className="text-[#2C2028]">유사한 사건으로 고민 중이신가요?</strong>{" "}신세계로가 도와드립니다.
              </p>
              <Link href="/consultation" className="inline-flex items-center gap-1.5 px-7 py-3.5 bg-[#9B2335] text-white text-[16px] font-semibold rounded-lg hover:bg-[#7B2D3B] transition-colors whitespace-nowrap">
                <Phone size={15} />무료 상담 신청
              </Link>
            </div>


            {/* Mobile Sidebar Info — 담당변호사 후기 위에 위치 (별도 섹션으로 이동됨) */}
          </article>
        </div>
      </div>
      </ScrollReveal>

      {/* Mobile CTA */}

      {/* Lightbox */}
      {lightboxIdx !== null && caseItem.images.length > 0 && (
        <Lightbox
          images={caseItem.images}
          index={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
          onPrev={() => setLightboxIdx((prev) => prev !== null ? (prev - 1 + caseItem.images.length) % caseItem.images.length : 0)}
          onNext={() => setLightboxIdx((prev) => prev !== null ? (prev + 1) % caseItem.images.length : 0)}
        />
      )}
    </div>
  );
}

export default function CaseDetailClient() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-2 border-[#9B2335] border-t-transparent rounded-full animate-spin" /></div>}>
      <CaseDetailContent />
    </Suspense>
  );
}
