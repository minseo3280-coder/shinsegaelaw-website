"use client";

import { useRef, useState, useEffect } from "react";
import { Phone, ArrowDown } from "lucide-react";
import firmData from "@/../../data/firm_info.json";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasVideo, setHasVideo] = useState(true);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.addEventListener("error", () => setHasVideo(false));
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-[70vh] md:min-h-screen flex items-center overflow-hidden"
    >
      {/* ─── Background Video ─── */}
      {hasVideo && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster="/images/office/slide-bg-main.jpg"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
      )}

      {/* Fallback */}
      {!hasVideo && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/office/slide-03.jpg')" }}
        />
      )}

      {/* ─── Overlay — 좌측 더 진하게 (텍스트 가독성) ─── */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/35 z-[1]" />

      {/* ─── Content — 좌정렬, 에디토리얼 레이아웃 ─── */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-5 md:px-10 lg:px-16 py-16 md:py-20">
        <div className="max-w-[720px]">

          {/* Label */}
          <p
            className={`text-[15px] md:text-[16px] tracking-[0.15em] md:tracking-[0.35em] text-white/50 uppercase font-semibold mb-4 md:mb-7 transition-all duration-1000 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            SINCE 1970 · FAMILY LAW SPECIALISTS
          </p>

          {/* Main headline */}
          <h1
            className={`text-[26px] md:text-[44px] lg:text-[58px] font-bold text-white leading-[1.3] md:leading-[1.25] tracking-tight mb-6 md:mb-10 transition-all duration-1000 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{
              wordBreak: "keep-all",
              transitionDelay: "500ms",
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            대한 변호사협회가 인정한<br />
            <span className="text-[#C9A84C]">가족법전문 1호</span><br />
            법무법인 신세계로
          </h1>

          {/* Body copy — CEO 사이트 톤 */}
          <p
            className={`text-[15px] md:text-[19px] text-white/60 leading-[1.85] md:leading-[1.95] mb-8 md:mb-12 transition-all duration-1000 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{
              wordBreak: "keep-all",
              transitionDelay: "800ms",
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            법은 감정의 언어를 이해하지 않습니다.<br />
            차갑게 정리된 사실, 정밀하게 배열된 증거,<br className="hidden md:inline" />
            그리고 논리로 직조된 문서를 통해서만 움직입니다.<br />
            그 무대 위에서 승부를 가르는 것은 오직 전략입니다.
          </p>

          {/* CTA buttons — 모바일 세로, 데스크톱 가로 */}
          <div
            className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5 transition-all duration-1000 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "1100ms" }}
          >
            <button
              onClick={() => {
                const el = document.getElementById("consultation-form");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3.5 md:py-4 bg-[#C9A84C] text-[#1A1A2E] text-[14px] md:text-[16px] font-bold tracking-wide hover:bg-[#D4AF37] hover:shadow-[0_8px_30px_rgba(201,168,76,0.3)] transition-all duration-300 cursor-pointer"
            >
              무료 사건 분석 신청
              <ArrowDown size={15} strokeWidth={2.5} />
            </button>
            <a
              href={`tel:${firmData.main_phone}`}
              className="inline-flex items-center justify-center gap-2 px-5 md:px-8 py-3.5 md:py-4 border border-white/25 text-white text-[14px] md:text-[16px] font-semibold tracking-wide hover:bg-white/10 hover:border-white/40 transition-all duration-300"
              aria-label={`전문가 상담 전화 ${firmData.main_phone}`}
            >
              <Phone className="w-4 h-4" />
              {firmData.main_phone}
            </a>
          </div>
        </div>
      </div>

      {/* ─── Scroll Indicator ─── */}
      <div
        className={`absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-10 transition-all duration-1000 hidden md:block ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: "1500ms" }}
      >
        <div className="flex flex-col items-center gap-3">
          <span className="text-[15px] tracking-[0.3em] text-white/30 uppercase">
            Scroll
          </span>
          <div className="w-[1px] h-8 bg-white/20 relative overflow-hidden">
            <div className="w-full h-full bg-white/60 animate-[scrollLine_1.5s_ease-in-out_infinite]" />
          </div>
        </div>
      </div>
    </section>
  );
}
