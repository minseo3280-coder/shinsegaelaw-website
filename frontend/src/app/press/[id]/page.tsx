"use client";

import { useParams } from "next/navigation";
import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  ArrowLeft,
  Eye,
  User,
  Newspaper,
  Share2,
  Printer,
  Copy,
  Radio,
  ExternalLink,
  ArrowRight,
  Phone,
} from "lucide-react";
import pressData from "@/../../data/press.json";
import lawyersData from "@/../../data/lawyers.json";
import firmData from "@/../../data/firm_info.json";
import pressYoutubeIds from "@/../../data/press_youtube_ids.json";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/* ─── Types ─── */
interface PressArticle {
  k_id: number;
  title: string;
  date: string;
  source: string;
  lawyer: string;
  views: number;
  content: string;
  images: string[];
  localImages: string[];
}

const articles = (pressData as { articles: PressArticle[] }).articles;

/* ─── YouTube data for YTN radio articles (실제 매칭된 영상) ─── */
const ytIdMapping = (pressYoutubeIds as { mapping: Record<string, string> }).mapping;

/* ─── Content Type ─── */
const BROADCAST_SOURCES = ["YTN", "KBS", "SBS", "MBC", "JTBC", "MBN", "EBS", "TV리포트", "SBSbiz"];

function getContentTypeLabel(source: string): { label: string; enLabel: string; color: string; bgColor: string } {
  if (BROADCAST_SOURCES.some((s) => source?.includes(s))) {
    return { label: "방송출연", enLabel: "TV APPEARANCE", color: "text-burgundy-600", bgColor: "bg-burgundy-50" };
  }
  return { label: "언론보도", enLabel: "PRESS COVERAGE", color: "text-blue-700", bgColor: "bg-blue-50" };
}

/* ─── Helper: find lawyer ─── */
function findLawyer(name: string) {
  if (!name) return null;
  const lawyers = (lawyersData as { lawyers: { id: number; name: string; position: string; profile_image: string }[] }).lawyers;
  return lawyers.find((l) => name.includes(l.name)) || null;
}

/* ─── Helper: parse content into structured blocks ─── */
interface ContentBlock {
  type: "paragraph" | "quote" | "copyright" | "byline" | "source-meta";
  text: string;
}

function parseContent(content: string, lawyerName?: string): ContentBlock[] {
  if (!content) return [];

  const cleaned = content
    .replace(/&middot;/g, "·")
    .replace(/&hellip;/g, "…")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

  const lines = cleaned
    .split(/\r?\n/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0)
    .filter((p) => {
      // Remove YTN radio boilerplate lines (YouTube embed already shown)
      if (/조인섭\s*변호사의\s*상담소\s*다시듣기/.test(p)) return false;
      if (/^\[.*상담소.*다시듣기\]/.test(p)) return false;
      if (/^https?:\/\/radio\.ytn\.co\.kr/.test(p)) return false;
      // Remove standalone truncated URLs
      if (/^https?:\/\/\S+$/.test(p) && p.length < 80) return false;
      return true;
    });

  const blocks: ContentBlock[] = [];

  // Extract lawyer last name for quote detection
  const lawyerLastName = lawyerName ? lawyerName.replace(/\s*(대표|변호사|파트너|수석).*$/, "").trim() : "";
  const lawyerNames: string[] = [];
  if (lawyerLastName) lawyerNames.push(lawyerLastName);

  // Also detect other lawyers from shinsegaelaw mentioned in text
  const allLawyers = (lawyersData as { lawyers: { name: string }[] }).lawyers;

  lines.forEach((line, idx) => {
    // Copyright line
    if (line.startsWith("저작권자") || line.includes("무단전재 및 재배포 금지")) {
      blocks.push({ type: "copyright", text: line });
      return;
    }

    // Byline detection (기자 이름 + 매체명, 보통 첫 줄)
    if (idx < 2 && /^\[.*기자\]/.test(line)) {
      blocks.push({ type: "byline", text: line });
      return;
    }

    // Source metadata lines (원본 기사 날짜/매체/URL/기자/기사제목 중복)
    // Date-time pattern: "25. 8. 11. 오전 11:35" or "2025.08.11 11:35"
    if (/^\d{2,4}\.\s*\d{1,2}\.\s*\d{1,2}\.?\s*(오전|오후)?\s*\d{1,2}:\d{2}/.test(line)) {
      blocks.push({ type: "source-meta", text: line });
      return;
    }
    // "돈이 보이는 리얼타임 뉴스" style tagline
    if (/^돈이 보이는|^실시간 뉴스|^눈이 즐거운/.test(line) && line.length < 40) {
      blocks.push({ type: "source-meta", text: line });
      return;
    }
    // Source + reporter line: "머니투데이 | 류원혜 기자" or "머니투데이 류원혜 기자"
    if (/기자$/.test(line) && line.length < 50) {
      blocks.push({ type: "source-meta", text: line });
      return;
    }
    // URL with "기사주소 복사" or standalone article URL
    if (/기사주소|기사원문/.test(line) || (/^https?:\/\//.test(line) && /mtview|ainews|news1|fnnews/.test(line))) {
      blocks.push({ type: "source-meta", text: line });
      return;
    }
    // Duplicate of article title (exact or near-exact match in first 3 lines)
    if (idx < 5 && line.length > 15 && line.length < 120) {
      // Skip — this is handled below as a normal paragraph or will be caught by other checks
    }

    // Detect lawyer quote patterns:
    // - starts with name + "변호사는" / "대표는"
    // - starts with quoted text AND mentions lawyer/법무법인 신세계로
    // - contains "설명했다" / "강조했다" / "밝혔다" / "조언했다" at end
    const isLawyerQuote =
      // Direct quote from named lawyer (including with parenthetical org)
      allLawyers.some((l) => {
        const nameIdx = line.indexOf(l.name);
        return nameIdx >= 0 && nameIdx < 10 && /변호사|대표/.test(line.substring(0, 30));
      }) ||
      // Quote with attribution keywords at end
      (/설명했다|강조했다|밝혔다|조언했다|덧붙였다|말했다|전했다|조언했다|분석했다/.test(line) && /변호사|대표|신세계로/.test(line)) ||
      // Starts with quote mark + has attribution
      (line.startsWith('"') && /설명했다|강조했다|밝혔다|조언했다|덧붙였다|말했다|전했다/.test(line)) ||
      // "이에 대해" pattern
      (/변호사는\s*"/.test(line) && line.length > 40) ||
      (/변호사는\s*이에\s*대해/.test(line)) ||
      // "이어" pattern removed — too aggressive, only highlight when lawyer name is explicit
      false;

    if (isLawyerQuote) {
      blocks.push({ type: "quote", text: line });
    } else {
      blocks.push({ type: "paragraph", text: line });
    }
  });

  return blocks;
}

/* ─── Share Buttons ─── */
function ShareButtons({ title }: { title: string }) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert("URL이 복사되었습니다.");
    } catch {
      // fallback
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url: window.location.href });
      } catch {
        // cancelled
      }
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleCopy}
        className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-[#888888] hover:text-burgundy-500 hover:border-burgundy-300 transition-all duration-200"
        aria-label="URL 복사"
      >
        <Copy size={16} />
      </button>
      <button
        onClick={handleShare}
        className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-[#888888] hover:text-burgundy-500 hover:border-burgundy-300 transition-all duration-200"
        aria-label="공유"
      >
        <Share2 size={16} />
      </button>
      <button
        onClick={() => window.print()}
        className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-[#888888] hover:text-burgundy-500 hover:border-burgundy-300 transition-all duration-200"
        aria-label="인쇄"
      >
        <Printer size={16} />
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   Press Detail Page
   ═══════════════════════════════════════════════════ */
export default function PressDetailPage() {
  const params = useParams();
  const articleId = Number(params.id);
  const revealRef = useScrollReveal();

  const article = useMemo(() => articles.find((a) => a.k_id === articleId), [articleId]);

  const currentIndex = articles.findIndex((a) => a.k_id === articleId);
  const prevArticle = currentIndex > 0 ? articles[currentIndex - 1] : null;
  const nextArticle = currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null;

  const relatedArticles = useMemo(() => {
    if (!article) return [];
    return articles
      .filter((a) => a.k_id !== article.k_id && a.source === article.source)
      .slice(0, 3);
  }, [article]);

  if (!article) {
    return (
      <div className="max-w-[1600px] mx-auto px-5 md:px-8 lg:px-10 py-20 text-center">
        <Newspaper size={48} className="text-gray-200 mx-auto mb-4" />
        <p className="text-[20px] font-bold text-gray-900 mb-4">기사를 찾을 수 없습니다.</p>
        <Link href="/press" className="text-[16px] text-burgundy-500 hover:text-burgundy-700 transition-colors duration-200">
          ← 언론매체 목록으로 돌아가기
        </Link>
      </div>
    );
  }

  const contentBlocks = parseContent(article.content, article.lawyer);
  const isYtnRadio = article.source === "YTN 라디오";
  const isRadioShow = article.title?.includes("조담소");

  const typeConfig = getContentTypeLabel(article.source);
  const lawyer = findLawyer(article.lawyer);
  const hasImages = article.localImages && article.localImages.length > 0;
  // YTN 라디오: 실제 매칭된 YouTube 영상 ID + 썸네일
  const ytVideoId = ytIdMapping[String(article.k_id)] || null;
  const ytThumb = ytVideoId ? `https://img.youtube.com/vi/${ytVideoId}/hqdefault.jpg` : null;
  const heroImage = ytThumb || (hasImages ? article.localImages[0] : null);

  return (
    <div ref={revealRef} className="">
      {/* ══════════════ Banner ══════════════ */}
      <section className="relative h-[180px] md:h-[280px] bg-[#0f0f1a] overflow-hidden">
        <Image src="/images/office/banner-reviews.jpg" alt="언론보도" fill sizes="100vw" className="object-cover" priority />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-[1600px] mx-auto px-5 md:px-8 lg:px-10 h-full flex flex-col justify-end pb-8">
          <nav className="flex items-center gap-2 text-[15px] text-white/30 mb-3" aria-label="breadcrumb">
            <Link href="/" className="hover:text-white/50 transition-colors duration-200">홈</Link>
            <ChevronRight size={12} className="text-white/20" />
            <Link href="/news" className="hover:text-white/50 transition-colors duration-200">미디어</Link>
            <ChevronRight size={12} className="text-white/20" />
            <Link href="/press" className="hover:text-white/50 transition-colors duration-200">언론보도</Link>
            <ChevronRight size={12} className="text-white/20" />
            <span className="text-white/60 line-clamp-1 max-w-[200px]">
              {article.title.length > 20 ? article.title.slice(0, 20) + "…" : article.title}
            </span>
          </nav>
          <h1 className="font-sans text-3xl md:text-[34px] font-bold text-white tracking-tight">언론보도</h1>
          <div className="w-12 h-[2px] bg-gold-500/60 mt-3" />
        </div>
      </section>

      {/* ══════════════ Article Content ══════════════ */}
      <article className="bg-white">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10 py-8 md:py-16">

          {/* ── Header: Category + Date ── */}
          <div className="flex items-center justify-between mb-6" data-reveal>
            <div className="flex items-center gap-3">
              <span className={`text-[14px] md:text-[15px] font-bold tracking-[0.15em] uppercase ${typeConfig.color}`}>
                {typeConfig.enLabel}
              </span>
              {isRadioShow && (
                <span className="px-2.5 py-1 rounded-full bg-gold-50 text-gold-700 text-[13px] font-bold flex items-center gap-1">
                  <Radio size={12} />
                  조인섭 변호사의 상담소
                </span>
              )}
            </div>
            <span className="text-[15px] md:text-[16px] text-[#444444]">{article.date}</span>
          </div>

          {/* ── Title ── */}
          <h2 className="font-sans text-[30px] md:text-[38px] lg:text-[42px] font-bold text-[#2C2028] leading-[1.35] tracking-tight mb-6" data-reveal>
            {article.title}
          </h2>

          {/* ── Meta Row ── */}
          <div className="flex items-center justify-between pb-6 mb-10 border-b border-gray-200" data-reveal>
            <div className="flex items-center gap-4 text-[16px] text-[#333333]">
              <span className={`px-3 py-1 rounded-full text-[14px] font-semibold ${typeConfig.bgColor} ${typeConfig.color}`}>
                {article.source}
              </span>
              {article.lawyer && (
                <span className="flex items-center gap-1.5">
                  <User size={15} />
                  {article.lawyer}
                </span>
              )}
              {article.views != null && (
                <span className="flex items-center gap-1.5 hidden sm:flex">
                  <Eye size={15} />
                  {article.views.toLocaleString()}
                </span>
              )}
            </div>
            <ShareButtons title={article.title} />
          </div>

          {/* ── YTN 라디오: YouTube 영상 임베드 ── */}
          {isYtnRadio && ytVideoId && (
            <div className="mb-10" data-reveal>
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                <iframe
                  src={`https://www.youtube.com/embed/${ytVideoId}`}
                  title={article.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
              <p className="text-[15px] text-[#444444] text-center mt-3">
                YTN 라디오 FM 94.5 「조인섭 변호사의 상담소」
              </p>
            </div>
          )}

          {/* ── Hero Image (non-YTN or no YouTube) ── */}
          {(!isYtnRadio || !ytVideoId) && heroImage && (
            <div className="mb-10" data-reveal>
              <div className="w-full rounded-2xl overflow-hidden max-h-[280px] md:max-h-none">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={heroImage}
                  alt={article.title}
                  className="w-full h-full object-cover md:h-auto md:object-contain"
                  loading="eager"
                />
              </div>
            </div>
          )}
          {/* Additional images (non-YTN, 2nd+ images) */}
          {!isYtnRadio && hasImages && article.localImages.length > 1 && (
            <div className="mb-10 space-y-4" data-reveal>
              {article.localImages.slice(1).map((img, i) => (
                <div key={i} className="w-full rounded-2xl overflow-hidden max-h-[250px] md:max-h-none">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img}
                    alt={`${article.title} 이미지 ${i + 2}`}
                    className="w-full h-full object-cover md:h-auto md:object-contain"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          )}

          {/* ── Article Body ── */}
          <div className="mb-16" data-reveal>
            {/* 첫 문단 드롭캡 스타일 + 나머지 문단 */}
            {contentBlocks.map((block, i) => {
              if (block.type === "byline") {
                return (
                  <p key={i} className="text-[16px] text-[#444444] mb-8 pb-6 border-b border-gray-100 font-semibold">
                    {block.text}
                  </p>
                );
              }
              if (block.type === "source-meta") {
                // 원본 기사 메타정보 — 작고 연하게 표시
                return null;
              }
              if (block.type === "quote") {
                return (
                  <div
                    key={i}
                    className="my-8 md:my-10 pl-6 md:pl-8 border-l-[3px] border-burgundy-400 py-3 bg-gradient-to-r from-burgundy-50/40 to-transparent rounded-r-lg"
                  >
                    <p className="text-[16px] md:text-[20px] text-[#2C2028] leading-[1.95] font-semibold italic">
                      {block.text}
                    </p>
                  </div>
                );
              }
              if (block.type === "copyright") {
                return (
                  <p key={i} className="text-[15px] text-[#444444] mt-10 pt-6 border-t border-gray-100 italic">
                    {block.text}
                  </p>
                );
              }
              return (
                <p key={i} className="text-[16px] md:text-[20px] text-gray-900 font-semibold leading-[2.1] mb-6 break-keep">
                  {block.text}
                </p>
              );
            })}
          </div>

          {/* ── Lawyer Profile Card ── */}
          {lawyer && (
            <div className="bg-[#F8F4EE] rounded-2xl p-6 md:p-7 mb-10" data-reveal>
              <div className="flex items-center gap-4">
                <div className="w-[60px] h-[60px] rounded-full overflow-hidden flex-shrink-0 border-2 border-white shadow-md">
                  <Image
                    src={lawyer.profile_image}
                    alt={lawyer.name}
                    width={60}
                    height={60}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[18px] font-bold text-[#2C2028]">{lawyer.name}</p>
                  <p className="text-[16px] text-[#333333] mt-0.5">{lawyer.position} · 법무법인 신세계로</p>
                </div>
                <Link
                  href={`/about/lawyers/${lawyer.id}`}
                  className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full border border-gray-300 text-[15px] font-semibold text-[#333333] hover:border-burgundy-400 hover:text-burgundy-500 transition-all duration-200 flex-shrink-0"
                >
                  프로필 보기
                  <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          )}

          {/* ── Prev / Next Navigation ── */}
          <div className="border-t border-b border-gray-200 divide-y divide-gray-200 mb-12" data-reveal>
            {prevArticle && (
              <Link href={`/press/${prevArticle.k_id}`} className="group flex items-center gap-4 py-5 hover:bg-gray-50/50 transition-colors duration-200 -mx-2 px-2 rounded-lg">
                <span className="text-[15px] text-[#444444] flex-shrink-0 w-16">이전 기사</span>
                <p className="text-[16px] text-[#2C2028] font-semibold group-hover:text-burgundy-600 transition-colors duration-200 line-clamp-1 flex-1">
                  {prevArticle.title}
                </p>
                <span className="text-[14px] text-[#444444] flex-shrink-0 hidden md:block">{prevArticle.date}</span>
              </Link>
            )}
            {nextArticle && (
              <Link href={`/press/${nextArticle.k_id}`} className="group flex items-center gap-4 py-5 hover:bg-gray-50/50 transition-colors duration-200 -mx-2 px-2 rounded-lg">
                <span className="text-[15px] text-[#444444] flex-shrink-0 w-16">다음 기사</span>
                <p className="text-[16px] text-[#2C2028] font-semibold group-hover:text-burgundy-600 transition-colors duration-200 line-clamp-1 flex-1">
                  {nextArticle.title}
                </p>
                <span className="text-[14px] text-[#444444] flex-shrink-0 hidden md:block">{nextArticle.date}</span>
              </Link>
            )}
          </div>

          {/* ── Related Articles ── */}
          {relatedArticles.length > 0 && (
            <div className="mb-12" data-reveal>
              <h3 className="font-sans text-[15px] font-bold tracking-[0.15em] uppercase text-burgundy-500 mb-2">
                Related Articles
              </h3>
              <p className="text-[20px] md:text-[22px] font-bold text-[#2C2028] mb-6">
                {article.source} 관련 기사
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {relatedArticles.map((a) => (
                  <Link
                    key={a.k_id}
                    href={`/press/${a.k_id}`}
                    className="group block rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-400"
                  >
                    <div className="relative aspect-[16/10] bg-[#F8F4EE] overflow-hidden">
                      {a.localImages && a.localImages.length > 0 ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={a.localImages[0]}
                          alt={a.title}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Newspaper size={28} className="text-gray-300" />
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <p className="text-[13px] font-semibold text-burgundy-500 mb-1.5">{a.source} · {a.date}</p>
                      <p className="text-[16px] font-bold text-[#2C2028] line-clamp-2 leading-snug group-hover:text-burgundy-600 transition-colors duration-200">
                        {a.title}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* ── CTA Band ── */}
          <div className="bg-[#F8F4EE] rounded-2xl p-5 md:p-10 text-center mb-10" data-reveal>
            <p className="text-[14px] tracking-[0.3em] text-gold-500 uppercase font-bold mb-3">
              Free Consultation
            </p>
            <p className="text-[22px] md:text-[28px] font-bold text-[#2C2028] mb-2">
              법률 문제로 고민 중이신가요?
            </p>
            <p className="text-[16px] text-[#333333] font-semibold mb-6">
              전문 변호사가 무료로 상담해드립니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={`tel:${firmData.main_phone}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-burgundy-500 text-white text-[16px] font-bold hover:bg-burgundy-600 transition-all duration-300 shadow-lg shadow-burgundy-500/15"
                aria-label={`전화 상담 ${firmData.main_phone}`}
              >
                <Phone size={15} />
                {firmData.main_phone}
              </a>
              <Link
                href="/consultation"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border-2 border-[#2C2028] text-[#2C2028] text-[16px] font-bold hover:bg-[#2C2028] hover:text-white transition-all duration-300"
              >
                온라인 상담 신청
                <ExternalLink size={14} />
              </Link>
            </div>
          </div>

          {/* ── Back to list ── */}
          <div className="flex justify-center" data-reveal>
            <Link
              href="/press"
              className="inline-flex items-center gap-2 text-[16px] text-[#888888] hover:text-burgundy-500 transition-colors duration-200"
            >
              <ArrowLeft size={14} />
              목록으로 돌아가기
            </Link>
          </div>
        </div>
      </article>

    </div>
  );
}
