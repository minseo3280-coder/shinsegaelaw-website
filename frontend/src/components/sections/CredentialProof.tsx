"use client";

import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";

const TIMELINE_ITEMS = [
  {
    year: "2017",
    title: "대한변호사협회 등록 제1호 가족법 전문변호사",
    description:
      "대한민국에서 가장 먼저 가족법 전문변호사로 공식 등록되었습니다.",
  },
  {
    year: "2018",
    title: "이화여자대학교 법학전문대학원 겸임교수",
    description:
      "가족법 분야의 학문적 깊이를 겸비한 실무 전문가입니다.",
  },
  {
    year: "2012",
    title: "여성가족부 장관 표창 수상",
    description:
      "조두순 사건 등 사회적 약자 보호에 기여한 공로를 인정받았습니다.",
  },
  {
    year: "2002",
    title: "YTN 라디오 「조인섭 변호사의 상담소」",
    description:
      "20년 이상 고정 진행하며 국민 법률 상담의 대명사가 되었습니다.",
  },
  {
    year: "1970",
    title: "법무법인 신세계로 설립",
    description:
      "52년간 오직 가족법 한 길만 걸어온 대한민국 대표 가사전문 로펌입니다.",
  },
];

const CERT_IMAGES = [
  { src: "/images/ihon-site/certificates/certificate_10.webp", alt: "조인섭 가족법 전문변호사 등록증서" },
  { src: "/images/ihon-site/certificates/certificate_11.webp", alt: "조인섭 상속 전문변호사 등록증서" },
  { src: "/images/ihon-site/certificates/certificate_13.webp", alt: "여성가족부 장관 표창장" },
];

export default function CredentialProof() {
  return (
    <section id="credentials" className="bg-[#F8F4EE] py-12 md:py-28 lg:py-36 px-5 md:px-8 lg:px-10">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-8 md:mb-20">
            <p className="text-[14px] md:text-[16px] font-bold tracking-[0.35em] uppercase text-burgundy-500/70 mb-3 md:mb-6">
              Credentials
            </p>
            <h2
              className="text-[22px] md:text-[48px] lg:text-[56px] font-bold leading-[1.35] text-[#2C2028] mb-4 md:mb-5"
              style={{ wordBreak: "keep-all" }}
            >
              중요한 선택 앞에서,<br />
              <span className="text-burgundy-600">진짜 전문가</span>를 만나십시오.
            </h2>
            <div className="w-12 md:w-16 h-[2px] bg-burgundy-500/30 mx-auto mb-3 md:mb-5" />
            <p
              className="text-[14px] md:text-[19px] leading-[1.8] md:leading-[1.9] text-[#333333]"
              style={{ wordBreak: "keep-all" }}
            >
              이름이 아닌 실적, 수식어가 아닌 성과로<br />
              검증된 전문가와 함께해야 합니다.
            </p>
          </div>
        </ScrollReveal>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Left: Certification images */}
          <ScrollReveal delay={100}>
            <div className="grid grid-cols-2 gap-4">
              {CERT_IMAGES.map((cert, i) => (
                <div
                  key={i}
                  className={`relative rounded-xl overflow-hidden bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-shadow duration-500 ${
                    i === 2 ? "col-span-2" : ""
                  }`}
                >
                  <div className={`relative ${i === 2 ? "aspect-[2/1]" : "aspect-[3/4]"}`}>
                    <Image
                      src={cert.src}
                      alt={cert.alt}
                      fill
                      className="object-contain p-3"
                      sizes="(max-width: 1024px) 45vw, 280px"
                    />
                  </div>
                </div>
              ))}
            </div>
            {/* 인증 변호사 수 */}
            <p className="text-center text-[14px] text-[#666] mt-5">
              전문분야 등록 변호사 <span className="text-burgundy-600 font-bold">6명</span> · 인증서 <span className="text-burgundy-600 font-bold">11건</span> 보유
            </p>
          </ScrollReveal>

          {/* Right: Timeline */}
          <ScrollReveal delay={200}>
            <div className="relative border-l-2 border-burgundy-200 pl-6 md:pl-8 ml-2">
              {TIMELINE_ITEMS.map((item, i) => (
                <div
                  key={i}
                  className={`relative ${
                    i < TIMELINE_ITEMS.length - 1 ? "mb-6 md:mb-10" : ""
                  }`}
                >
                  {/* Dot on border line */}
                  <div
                    className="absolute w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-burgundy-500"
                    style={{ left: "calc(-1.5rem - 6px)", top: "6px" }}
                  />

                  {/* Year badge */}
                  <span className="inline-block text-[14px] md:text-[15px] font-bold text-burgundy-500 bg-burgundy-50 px-2.5 md:px-3 py-0.5 md:py-1 rounded-full mb-2 md:mb-3">
                    {item.year}
                  </span>

                  {/* Title */}
                  <h3
                    className="text-[15px] md:text-[22px] font-bold text-[#2C2028] mb-1.5 md:mb-2 leading-snug"
                    style={{ wordBreak: "keep-all" }}
                  >
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="text-[15px] md:text-[16px] leading-[1.7] md:leading-[1.8] text-[#333333]"
                    style={{ wordBreak: "keep-all" }}
                  >
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
