"use client";

import { useState } from "react";
import { ChevronDown, Phone, ArrowRight } from "lucide-react";
import Link from "next/link";
import faqData from "@/../../data/faq.json";
import firmData from "@/../../data/firm_info.json";
import ScrollReveal from "@/components/ScrollReveal";

type FaqCategory = "전체" | "비용절차" | "이혼재산" | "상담기타";

const categories: { key: FaqCategory; label: string }[] = [
  { key: "전체", label: "전체" },
  { key: "비용절차", label: "비용·절차" },
  { key: "이혼재산", label: "이혼·재산" },
  { key: "상담기타", label: "상담·기타" },
];

const sortedFaqs = [...faqData.faqs].sort(
  (a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0)
);

function FAQItem({
  faq,
  index,
}: {
  faq: (typeof faqData.faqs)[number];
  index: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className={`border-b border-gray-200/80 transition-colors duration-300 ${
        isOpen ? "bg-[#7B2D3B]/[0.02]" : ""
      }`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-4 py-6 px-1 text-left group"
        aria-expanded={isOpen}
      >
        {/* Number */}
        <span className="text-[15px] text-[#C9A84C]/30 font-semibold tabular-nums shrink-0 w-6">
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Question + badges */}
        <span className="flex-1 flex items-center gap-2 min-w-0">
          <span
            className={`text-[15px] font-semibold pr-2 transition-colors duration-200 ${
              isOpen
                ? "text-[#7B2D3B]"
                : "text-foreground group-hover:text-[#7B2D3B]"
            }`}
          >
            {faq.question}
          </span>
          {faq.popular && (
            <span className="shrink-0 px-2 py-0.5 rounded-full bg-[#C9A84C]/10 text-[15px] text-[#C9A84C] font-semibold">
              인기
            </span>
          )}
        </span>

        {/* Chevron */}
        <ChevronDown
          size={20}
          className={`shrink-0 transition-all duration-300 ${
            isOpen
              ? "rotate-180 text-[#C9A84C]"
              : "text-gray-300 group-hover:text-[#C9A84C]/60"
          }`}
        />
      </button>

      {/* Answer with CSS grid animation (no max-h hack) */}
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="pb-6 pl-11 pr-12">
            <p className="text-[14px] text-[#333333] leading-[1.8]">
              {faq.answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FAQSection() {
  const [activeCategory, setActiveCategory] = useState<FaqCategory>("전체");

  const filtered =
    activeCategory === "전체"
      ? sortedFaqs
      : sortedFaqs.filter(
          (f) => (f as { category?: string }).category === activeCategory
        );

  return (
    <section className="py-20 md:py-28 lg:py-36 bg-[#faf9f7]" id="faq">
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-10">
        {/* Section header */}
        <ScrollReveal>
          <div className="text-center mb-12 md:mb-16">
            <p className="text-[15px] tracking-[0.3em] text-[#C9A84C] font-semibold uppercase mb-4">
              FAQ
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-5">
              자주 묻는 질문
            </h2>
            <div className="w-12 h-[2px] bg-[#C9A84C] mx-auto" />
          </div>
        </ScrollReveal>

        {/* 2-column layout: Categories + Accordion */}
        <div className="md:grid md:grid-cols-[220px_1fr] md:gap-12">
          {/* Left: Category filter (desktop) */}
          <ScrollReveal className="hidden md:block">
            <div className="sticky top-32">
              <p className="text-[15px] tracking-[0.15em] text-gray-400 uppercase font-semibold mb-4">
                카테고리
              </p>
              <div className="space-y-1">
                {categories.map((cat) => {
                  const count =
                    cat.key === "전체"
                      ? faqData.faqs.length
                      : faqData.faqs.filter(
                          (f) =>
                            (f as { category?: string }).category === cat.key
                        ).length;
                  return (
                    <button
                      key={cat.key}
                      onClick={() => setActiveCategory(cat.key)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-[8px] text-[14px] font-semibold transition-all duration-200 ${
                        activeCategory === cat.key
                          ? "bg-[#7B2D3B]/[0.06] text-[#7B2D3B] border-l-[3px] border-[#7B2D3B]"
                          : "text-[#444444] hover:bg-gray-100/60 hover:text-[#333333] border-l-[3px] border-transparent"
                      }`}
                    >
                      {cat.label}
                      <span
                        className={`text-[14px] ${
                          activeCategory === cat.key
                            ? "text-[#7B2D3B]/50"
                            : "text-gray-300"
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Sidebar CTA */}
              <div className="mt-8 p-5 rounded-[10px] bg-[#1A1A2E] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#7B2D3B]/20 to-transparent pointer-events-none" />
                <div className="relative">
                  <p className="text-[14px] text-white/50 mb-2">
                    더 궁금한 점이 있으시면
                  </p>
                  <a
                    href={`tel:${firmData.main_phone}`}
                    className="flex items-center gap-2 text-[16px] text-[#C9A84C] font-bold mb-3"
                    aria-label={`대표번호 ${firmData.main_phone}`}
                  >
                    <Phone size={14} />
                    {firmData.main_phone}
                  </a>
                  <Link
                    href="/consultation"
                    className="flex items-center gap-1.5 text-[14px] text-white/50 hover:text-white/70 transition-colors"
                  >
                    상담 신청
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Mobile: Category chips */}
          <ScrollReveal className="md:hidden mb-6">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`shrink-0 px-4 py-2 rounded-full text-[15px] font-semibold transition-all duration-200 ${
                    activeCategory === cat.key
                      ? "bg-[#7B2D3B] text-white"
                      : "bg-gray-100 text-[#444444] hover:bg-gray-200"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Right: Accordion */}
          <ScrollReveal delay={100}>
            <div>
              {filtered.map((faq, i) => (
                <FAQItem key={faq.id} faq={faq} index={i} />
              ))}

              {filtered.length === 0 && (
                <p className="text-center text-gray-400 py-12 text-[14px]">
                  해당 카테고리에 질문이 없습니다.
                </p>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqData.faqs.map((f) => ({
              "@type": "Question",
              name: f.question,
              acceptedAnswer: { "@type": "Answer", text: f.answer },
            })),
          }),
        }}
      />
    </section>
  );
}
