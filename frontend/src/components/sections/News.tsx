"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import newsData from "@/../../data/news.json";

export default function News() {
  const sortedNews = [...newsData].sort(
    (a, b) => (Number(b.year) || 0) - (Number(a.year) || 0)
  );
  const featured = sortedNews[0];
  const restNews = sortedNews.slice(1, 4);

  if (sortedNews.length === 0) {
    return (
      <section id="media" className="relative bg-[#faf9f7] py-20 md:py-28">
        <div className="max-w-[1600px] mx-auto px-5 md:px-8 lg:px-10 text-center py-16">
          <p className="text-[17px] text-gray-400">소식이 없습니다.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="media" className="relative bg-[#faf9f7] py-20 md:py-28">
      {/* Top border */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(123,45,59,0.08), transparent)",
        }}
      />

      <div className="max-w-[1600px] mx-auto px-5 md:px-8 lg:px-10">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-10 md:mb-14">
          <p className="text-[14px] tracking-[0.3em] text-burgundy-500 uppercase mb-2">
            News & Media
          </p>
          <h2 className="text-[34px] md:text-[44px] font-extrabold text-gray-900 tracking-tight">
            미디어
          </h2>
          <div className="w-16 h-[3px] bg-gold-500 mx-auto mt-4" />
        </ScrollReveal>

        <ScrollReveal delay={150}>
          {/* Featured card */}
          <Link
            href="/news"
            className="block rounded-[12px] overflow-hidden bg-white border border-gray-200 hover:border-burgundy-500/20 hover:shadow-lg transition-all duration-300 group mb-6"
            aria-label={`${featured.title} 보기`}
          >
            <div className="grid grid-cols-1 md:grid-cols-[55%_45%] min-h-[280px] md:min-h-[300px]">
              {/* Image */}
              <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[280px] overflow-hidden">
                {(featured.image || featured.images?.[0]) ? (
                  <Image
                    src={featured.image || featured.images?.[0] || ""}
                    alt={featured.title}
                    fill
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 55vw"
                  />
                ) : (
                  <div className="w-full h-full min-h-[200px] bg-[#e8e5df]" />
                )}
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-burgundy-500 text-white text-[11px] font-bold">
                  최신
                </div>
              </div>

              {/* Text */}
              <div className="p-6 md:p-8 flex flex-col justify-center border-l-0 md:border-l-[3px] border-t-[3px] md:border-t-0 border-gold-500/40">
                <p className="text-[15px] text-burgundy-500/70 font-semibold mb-2">
                  {featured.year}
                  {featured.category && ` · ${featured.category}`}
                </p>
                <p className="text-[20px] md:text-[22px] font-bold text-gray-900 leading-[1.4] line-clamp-2 mb-3 group-hover:text-burgundy-500 transition-colors duration-200">
                  {// eslint-disable-next-line @typescript-eslint/no-explicit-any
                  (featured as any).mainTitle || featured.title}
                </p>
                <p className="text-[16px] text-[#333333] leading-[1.7] line-clamp-3 mb-4">
                  {// eslint-disable-next-line @typescript-eslint/no-explicit-any
                  (featured as any).mainDesc || featured.desc}
                </p>
                <div className="w-6 h-[1px] bg-gold-500/25" />
              </div>
            </div>
          </Link>

          {/* List */}
          {restNews.length > 0 && (
            <div className="flex flex-col gap-0">
              {restNews.map((item, i) => (
                <Link
                  key={item.id}
                  href="/news"
                  aria-label={`${item.title} 보기`}
                  className={`flex gap-4 md:gap-5 items-center py-4 md:py-5 px-3 -mx-3 group hover:bg-burgundy-50/40 rounded-[8px] transition-all duration-200 ${
                    i < restNews.length - 1
                      ? "border-b border-gray-200"
                      : ""
                  }`}
                >
                  {/* Thumbnail */}
                  <div className="relative w-[100px] md:w-[120px] aspect-[16/10] rounded-[8px] overflow-hidden flex-shrink-0 border border-gray-200">
                    {(item.image || item.images?.[0]) ? (
                      <Image
                        src={item.image || item.images?.[0] || ""}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-[1.05] transition-transform duration-500"
                        sizes="120px"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#e8e5df]" />
                    )}
                    <div className="absolute top-1 left-1 px-2 py-[2px] rounded-full bg-burgundy-500 text-white text-[9px] font-bold">
                      {item.year}
                    </div>
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <p className="text-[16px] md:text-[17px] font-bold text-gray-900 leading-[1.4] line-clamp-1 group-hover:text-burgundy-500 transition-colors duration-200 mb-1">
                      {// eslint-disable-next-line @typescript-eslint/no-explicit-any
                      (item as any).mainTitle || item.title}
                    </p>
                    <p className="text-[15px] text-gray-400 leading-[1.5] line-clamp-1">
                      {// eslint-disable-next-line @typescript-eslint/no-explicit-any
                      (item as any).mainDesc || item.desc}
                    </p>
                  </div>

                  {/* Arrow */}
                  <ArrowRight
                    size={16}
                    className="text-gray-300 group-hover:text-gold-500 group-hover:translate-x-0.5 transition-all duration-200 flex-shrink-0"
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </div>
          )}

          {/* View all */}
          <div className="flex justify-center mt-8">
            <Link
              href="/news"
              className="text-[16px] text-burgundy-500 font-semibold hover:text-burgundy-700 transition-colors duration-200 flex items-center gap-2"
            >
              소식 전체보기
              <ArrowRight size={16} />
            </Link>
          </div>
        </ScrollReveal>
      </div>

      {/* Bottom border */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[1px]"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(201,168,76,0.1), transparent)",
        }}
      />
    </section>
  );
}
