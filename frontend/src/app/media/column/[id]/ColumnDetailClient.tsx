"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ChevronRight,
  ChevronUp,
  ChevronDown,
  Share2,
  Printer,
  Copy,
  CheckSquare,
  Info,
  MessageCircle,
  List,
} from "lucide-react";
import { useState, useMemo } from "react";

interface ColumnArticle {
  k_id: number;
  title: string;
  date: string;
  lawyer?: string;
  content?: string;
  source?: string;
  views?: number;
  images?: string[];
}

interface Props {
  article: ColumnArticle;
  prevArticle: ColumnArticle | null;
  nextArticle: ColumnArticle | null;
  relatedArticles: ColumnArticle[];
  popularArticles?: ColumnArticle[];
}

/* ─── Content Parser ─── */
interface ContentBlock {
  type: "hero-image" | "intro" | "heading" | "paragraph" | "image" | "tags" | "summary" | "quote";
  text?: string;
  headingNum?: number;
  src?: string;
  items?: string[];
}

function parseContent(content: string, images: string[]): ContentBlock[] {
  const blocks: ContentBlock[] = [];
  const paragraphs = content
    .split("\n\n")
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  const isHeading = (p: string): boolean => {
    const t = p.trim();
    if (t.length < 4 || t.length > 50) return false;
    if (t.startsWith("#") || t.startsWith("YTN") || t.includes("칼럼입니다")) return false;
    if (t.endsWith(".") || t.endsWith("요") || t.endsWith("다") || t.endsWith("요.") || t.endsWith("다.")) return false;
    if (t.includes("\n")) return false;
    if (t.split(" ").length > 12) return false;
    return true;
  };

  const isTagLine = (p: string): boolean => p.startsWith("#") && p.includes(" #");
  const isYtnClosing = (p: string): boolean => {
    const t = p.trim();
    return (t.includes("YTN 라디오") || t.includes("조인섭변호사의 상담소") || t.includes("유튜브 링크")) && t.length < 80;
  };

  // Detect quote-like paragraphs (starts/ends with quotes)
  const isQuote = (p: string): boolean => {
    const t = p.trim();
    return (t.startsWith('"') && t.endsWith('"')) || (t.startsWith('"') && t.endsWith('"')) || (t.startsWith("'") && t.endsWith("'"));
  };

  const headingIndices: number[] = [];
  paragraphs.forEach((p, i) => {
    if (isHeading(p)) headingIndices.push(i);
  });

  const tagIdx = paragraphs.findIndex((p) => isTagLine(p));
  const ytnIdx = paragraphs.findIndex((p) => isYtnClosing(p));
  const closingIdx = tagIdx > 0 ? tagIdx : ytnIdx > 0 ? ytnIdx : -1;

  let summaryStartIdx = -1;
  if (closingIdx > 2) {
    const lastHIdx = headingIndices.length > 0 ? headingIndices[headingIndices.length - 1] : -1;
    for (let si = closingIdx - 1; si >= Math.max(0, closingIdx - 3); si--) {
      const sp = paragraphs[si];
      if (isHeading(sp) || sp.length < 30) break;
      if (si > lastHIdx + 1) {
        summaryStartIdx = si;
      }
    }
  }

  const imagePlacements = new Map<number, number>();
  if (images.length > 0) {
    for (let i = 1; i < images.length && i - 1 < headingIndices.length; i++) {
      imagePlacements.set(i, headingIndices[i - 1]);
    }
  }

  if (images.length > 0) {
    blocks.push({ type: "hero-image", src: images[0] });
  }

  // Collect all paragraphs before the first heading as one intro block
  const firstHeadingIdx = headingIndices.length > 0 ? headingIndices[0] : paragraphs.length;
  const introParagraphs: string[] = [];
  for (let i = 0; i < firstHeadingIdx; i++) {
    const p = paragraphs[i];
    if (!isTagLine(p) && !isYtnClosing(p) && p.length > 20) {
      introParagraphs.push(p);
    }
  }
  if (introParagraphs.length > 0) {
    blocks.push({ type: "intro", text: introParagraphs.join("\n\n") });
  }

  let headingCounter = 0;
  const usedImageIndices = new Set([0]);

  for (let pi = 0; pi < paragraphs.length; pi++) {
    const p = paragraphs[pi];

    // Skip paragraphs already consumed as intro
    if (pi < firstHeadingIdx) continue;

    for (const [imgIdx, beforeParaIdx] of imagePlacements.entries()) {
      if (beforeParaIdx === pi && !usedImageIndices.has(imgIdx)) {
        usedImageIndices.add(imgIdx);
        blocks.push({ type: "image", src: images[imgIdx] });
      }
    }

    if (isYtnClosing(p)) continue;

    if (isTagLine(p)) {
      blocks.push({
        type: "tags",
        items: p.split(/\s+/).filter((t) => t.startsWith("#")),
      });
      continue;
    }

    if (summaryStartIdx > 0 && pi === summaryStartIdx) {
      const summaryItems: string[] = [];
      for (let si = summaryStartIdx; si < closingIdx; si++) {
        const sp = paragraphs[si];
        if (!isYtnClosing(sp) && !isTagLine(sp) && sp.length > 20) {
          summaryItems.push(sp);
        }
      }
      if (summaryItems.length > 0) {
        blocks.push({ type: "summary", items: summaryItems });
      }
      pi = closingIdx - 1;
      continue;
    }
    if (summaryStartIdx > 0 && pi > summaryStartIdx && pi < closingIdx) continue;

    if (isHeading(p)) {
      headingCounter++;
      blocks.push({ type: "heading", text: p, headingNum: headingCounter });
      continue;
    }

    if (isQuote(p)) {
      blocks.push({ type: "quote", text: p });
      continue;
    }

    blocks.push({ type: "paragraph", text: p });
  }

  for (let i = 0; i < images.length; i++) {
    if (!usedImageIndices.has(i)) {
      blocks.push({ type: "image", src: images[i] });
    }
  }

  return blocks;
}

function extractCategory(article: ColumnArticle): string {
  const t = article.title || "";
  if (t.includes("이혼") || t.includes("재산분할") || t.includes("양육")) return "이혼/재산분할";
  if (t.includes("상간") || t.includes("위자료") || t.includes("외도")) return "이혼/위자료";
  if (t.includes("상속") || t.includes("유류분")) return "상속";
  if (t.includes("형사") || t.includes("명예훼손")) return "형사";
  return "가족법";
}

export default function ColumnDetailClient({
  article,
  prevArticle,
  nextArticle,
  relatedArticles: _relatedArticles,
}: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* fallback */ }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.content?.slice(0, 100),
          url: window.location.href,
        });
      } catch { /* cancelled */ }
    } else {
      handleCopyUrl();
    }
  };

  const handlePrint = () => window.print();

  const category = extractCategory(article);

  const contentBlocks = useMemo(
    () => article.content ? parseContent(article.content, article.images || []) : [],
    [article.content, article.images]
  );

  return (
    <div className="bg-white min-h-screen">
      {/* ─── Breadcrumb ─── */}
      <div className="border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-6 md:px-8 py-4">
          <nav className="flex items-center gap-2 text-[14px] text-[#888888]" aria-label="breadcrumb">
            <Link href="/" className="hover:text-[#333333] transition-colors">홈</Link>
            <ChevronRight size={12} />
            <Link href="/media/column" className="hover:text-[#333333] transition-colors">법률칼럼</Link>
            <ChevronRight size={12} />
            <span className="text-burgundy-600 font-semibold">{category}</span>
          </nav>
        </div>
      </div>

      {/* ─── Article ─── */}
      <div className="max-w-3xl mx-auto px-6 md:px-8 pt-8 md:pt-14 pb-14 md:pb-28">

        {/* Header */}
        <header className="mb-10 pb-8 border-b border-gray-200">
          <h1 className="font-sans text-[21px] md:text-[36px] font-extrabold text-gray-900 leading-[1.4] tracking-tight">
            {article.title}
          </h1>

          {/* Meta line + share buttons */}
          <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[15px] text-[#444444]">
              {article.lawyer && (
                <span className="font-semibold text-[#333333]">{article.lawyer}</span>
              )}
              {article.date && (
                <span className="flex items-center gap-1">
                  <span className="text-gray-300">📅</span> {article.date}
                </span>
              )}
              {article.views != null && article.views > 0 && (
                <span className="flex items-center gap-1">
                  <span className="text-gray-300">👁</span> 조회 {article.views.toLocaleString()}
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5 print:hidden">
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[14px] text-[#444444] hover:text-burgundy-600 hover:bg-gray-50 transition-all"
              >
                <Share2 size={13} />
                공유
              </button>
              <button
                onClick={handleCopyUrl}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[14px] text-[#444444] hover:text-burgundy-600 hover:bg-gray-50 transition-all"
              >
                <Copy size={13} />
                {copied ? "복사됨!" : "URL 복사"}
              </button>
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[14px] text-[#444444] hover:text-burgundy-600 hover:bg-gray-50 transition-all"
              >
                <Printer size={13} />
                인쇄
              </button>
            </div>
          </div>
        </header>

        {/* ─── Article Body ─── */}
        <article className="article-body">
          {contentBlocks.map((block, i) => {
            switch (block.type) {
              case "hero-image":
                return (
                  <div key={i} className="rounded-xl overflow-hidden mb-10">
                    <Image
                      src={block.src!}
                      alt={article.title}
                      width={900}
                      height={600}
                      className="w-full h-auto"
                      sizes="(max-width: 768px) 100vw, 700px"
                      priority
                    />
                  </div>
                );

              case "intro":
                return (
                  <div key={i} className="bg-[#FDF2F4] rounded-2xl p-4 md:p-8 mb-8 md:mb-10">
                    <div className="flex items-center gap-2.5 mb-4 md:mb-5">
                      <span className="w-8 md:w-9 h-8 md:h-9 rounded-full bg-burgundy-500 flex items-center justify-center flex-shrink-0">
                        <MessageCircle size={16} className="text-white" />
                      </span>
                      <h3 className="font-sans text-[16px] md:text-[18px] font-extrabold text-burgundy-700">사연 내용</h3>
                    </div>
                    <div className="border-l-[3px] border-burgundy-300 pl-5 space-y-4">
                      {block.text!.split("\n\n").map((para, pi) => (
                        <p key={pi} className="text-[15px] md:text-[18px] text-[#333333] leading-[1.9]">
                          {para}
                        </p>
                      ))}
                    </div>
                  </div>
                );

              case "heading":
                return (
                  <div key={i} className="flex items-baseline gap-3.5 mt-12 mb-5">
                    <span className="w-8 h-8 rounded-lg bg-burgundy-500 text-white text-[15px] font-bold flex items-center justify-center flex-shrink-0 translate-y-0.5">
                      {block.headingNum}
                    </span>
                    <h2 className="font-sans text-[17px] md:text-[24px] font-extrabold text-gray-900 tracking-tight leading-snug">
                      {block.text}
                    </h2>
                  </div>
                );

              case "image":
                return (
                  <div key={i} className="my-8 rounded-xl overflow-hidden">
                    <Image
                      src={block.src!}
                      alt={`${article.title} 이미지`}
                      width={800}
                      height={500}
                      className="w-full h-auto"
                      sizes="(max-width: 768px) 100vw, 700px"
                    />
                  </div>
                );

              case "quote":
                return (
                  <div key={i} className="bg-gray-50 border-l-[3px] border-gray-300 rounded-r-lg px-4 md:px-6 py-5 my-7">
                    <p className="text-[15px] md:text-[18px] text-[#333333] italic leading-[1.9]">
                      {block.text}
                    </p>
                  </div>
                );

              case "summary":
                return (
                  <div key={i} className="bg-[#FDF2F4] border-l-4 border-burgundy-500 rounded-r-2xl p-4 md:p-8 my-8 md:my-10">
                    <h4 className="font-sans flex items-center gap-2.5 text-[16px] md:text-[19px] font-extrabold text-burgundy-600 mb-4 md:mb-5">
                      <CheckSquare size={20} className="text-burgundy-500" />
                      핵심 정리
                    </h4>
                    <ul className="space-y-3">
                      {block.items?.map((item, si) => (
                        <li
                          key={si}
                          className="flex gap-3 text-[15px] md:text-[17px] text-[#333333] leading-[1.8]"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-burgundy-500 flex-shrink-0 mt-[11px]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );

              case "tags":
                return (
                  <div key={i} className="flex flex-wrap gap-2 mt-10 pt-6 border-t border-gray-100">
                    {block.items?.map((tag, ti) => (
                      <span
                        key={ti}
                        className="px-3 py-1.5 rounded-full bg-gray-100 text-[#444444] text-[15px] font-semibold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                );

              case "paragraph":
              default:
                return (
                  <p key={i} className="text-[15px] md:text-[18px] text-[#333333] leading-[1.9] mb-5 md:mb-6">
                    {block.text}
                  </p>
                );
            }
          })}

          {contentBlocks.length === 0 && article.content && (
            <div className="text-[15px] md:text-[18px] text-[#333333] leading-[1.9] whitespace-pre-wrap">
              {article.content}
            </div>
          )}
        </article>

        {/* Disclaimer */}
        <div className="mt-12 p-5 rounded-xl bg-gray-50 border border-gray-100 flex gap-3">
          <Info size={16} className="text-[#666666] flex-shrink-0 mt-0.5" />
          <p className="text-[16px] md:text-[17px] text-[#444444] leading-relaxed">
            <span className="font-semibold text-[#333333]">안내</span> | 본 칼럼은 법률 정보 제공을 목적으로 작성되었으며, 구체적인 법률 문제에 대한 자문은 반드시 전문 변호사와 상담하시기 바랍니다.
          </p>
        </div>

        {/* ─── Prev / Next — table style ─── */}
        <div className="mt-12 border-t border-b border-gray-200 divide-y divide-gray-200">
          {prevArticle && (
            <Link
              href={`/media/column/${prevArticle.k_id}`}
              className="group flex items-center gap-4 py-4 hover:bg-gray-50/60 transition-colors"
            >
              <span className="flex items-center gap-1.5 text-[15px] text-[#666666] w-[80px] flex-shrink-0">
                <ChevronUp size={14} />
                이전글
              </span>
              <span className="flex-1 text-[16px] md:text-[17px] font-semibold text-[#333333] group-hover:text-burgundy-600 transition-colors truncate">
                {prevArticle.title}
              </span>
              <span className="text-[15px] text-[#666666] flex-shrink-0 hidden md:block">
                {prevArticle.date}
              </span>
            </Link>
          )}
          {nextArticle && (
            <Link
              href={`/media/column/${nextArticle.k_id}`}
              className="group flex items-center gap-4 py-4 hover:bg-gray-50/60 transition-colors"
            >
              <span className="flex items-center gap-1.5 text-[15px] text-[#666666] w-[80px] flex-shrink-0">
                <ChevronDown size={14} />
                다음글
              </span>
              <span className="flex-1 text-[16px] md:text-[17px] font-semibold text-[#333333] group-hover:text-burgundy-600 transition-colors truncate">
                {nextArticle.title}
              </span>
              <span className="text-[15px] text-[#666666] flex-shrink-0 hidden md:block">
                {nextArticle.date}
              </span>
            </Link>
          )}
        </div>

        {/* Back to List */}
        <div className="flex justify-center mt-8">
          <Link
            href="/media/column"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-gray-300 text-[16px] font-semibold text-[#333333] hover:border-burgundy-300 hover:text-burgundy-600 transition-all"
          >
            <List size={16} />
            목록으로
          </Link>
        </div>

      </div>
    </div>
  );
}
