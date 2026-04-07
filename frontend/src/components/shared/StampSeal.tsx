"use client";

/**
 * StampSeal — 법무법인 신세계로 공식 승소 도장
 * 해림 스타일 참고: 이중원 + 장식선 + 세리프체
 * 메인 Cases 섹션 + 서브 cases/page.tsx 에서 공통 사용
 */

interface StampSealProps {
  /** "판결" → 승소, "합의" → 합의, "조정" → 조정, 또는 직접 result 텍스트 */
  resultType?: string;
  result?: string;
  /** 크기: sm(모바일 카드), md(일반), lg(하이라이트 카드) */
  size?: "sm" | "md" | "lg";
  className?: string;
}

function getLabel(resultType?: string, result?: string): string {
  if (result) {
    if (result.includes("조정")) return "조정";
    if (result.includes("합의")) return "합의";
    if (result.includes("기각")) return "승소";
    if (result.includes("인용")) return "승소";
  }
  if (resultType === "합의") return "합의";
  if (resultType === "조정") return "조정";
  return "승소";
}

const SIZES = {
  sm: "w-[44px] h-[44px] md:w-[54px] md:h-[54px]",
  md: "w-[56px] h-[56px] md:w-[66px] md:h-[66px]",
  lg: "w-[68px] h-[68px] md:w-[80px] md:h-[80px]",
};

export default function StampSeal({ resultType, result, size = "md", className = "" }: StampSealProps) {
  const label = getLabel(resultType, result);

  return (
    <div className={`${SIZES[size]} rotate-[-10deg] pointer-events-none select-none ${className}`}>
      <svg viewBox="0 0 120 120" className="w-full h-full" aria-hidden="true">
        {/* 외곽 원 (두꺼운 테두리) */}
        <circle cx="60" cy="60" r="55" fill="none" stroke="#9B2335" strokeWidth="4" opacity="0.7" />
        {/* 내부 원 (가는 테두리) */}
        <circle cx="60" cy="60" r="46" fill="none" stroke="#9B2335" strokeWidth="1.5" opacity="0.5" />

        {/* 상단 장식선 */}
        <line x1="25" y1="42" x2="95" y2="42" stroke="#9B2335" strokeWidth="1.2" opacity="0.5" />
        {/* 하단 장식선 */}
        <line x1="25" y1="78" x2="95" y2="78" stroke="#9B2335" strokeWidth="1.2" opacity="0.5" />

        {/* 메인 텍스트 (승소/합의/조정) */}
        <text
          x="60"
          y="67"
          textAnchor="middle"
          fontSize={label.length > 2 ? "24" : "32"}
          fontWeight="900"
          fill="#9B2335"
          fontFamily="'Gowun Batang', serif"
          opacity="0.8"
        >
          {label}
        </text>

        {/* 상단 작은 텍스트 */}
        <text
          x="60"
          y="37"
          textAnchor="middle"
          fontSize="9"
          fill="#9B2335"
          fontFamily="'Gowun Batang', serif"
          opacity="0.45"
          letterSpacing="2"
        >
          신세계로
        </text>

        {/* 하단 작은 텍스트 */}
        <text
          x="60"
          y="90"
          textAnchor="middle"
          fontSize="8"
          fill="#9B2335"
          fontFamily="'Gowun Batang', serif"
          opacity="0.4"
          letterSpacing="1"
        >
          법무법인
        </text>
      </svg>
    </div>
  );
}
