"use client";

import Link from "next/link";
import firmData from "@/../../data/firm_info.json";

const OFFICE_PHONE = firmData.offices[0].phone;

export default function SidebarCTA() {
  return (
    <div className="rounded-[16px] overflow-hidden bg-[#0f0f1a] p-6 text-center relative">
      {/* 버건디 빛번짐 — 우상단 */}
      <div className="absolute top-[-40px] right-[-40px] w-[150px] h-[150px] bg-burgundy-500 opacity-[0.2] blur-[60px] rounded-full pointer-events-none" />
      {/* 골드 빛번짐 — 좌하단 */}
      <div className="absolute bottom-[-30px] left-[-30px] w-[100px] h-[100px] bg-gold-500 opacity-[0.08] blur-[40px] rounded-full pointer-events-none" />

      <div className="relative z-10">
        <p className="text-[15px] tracking-[0.2em] text-gold-500/50 uppercase mb-2">
          Consultation
        </p>
        <p className="text-[14px] font-bold text-white mb-[3px]">
          법률 상담
        </p>
        <p className="text-[15px] text-white/35 mb-4">
          비밀보장 · 24시간 내 회신
        </p>
        <a
          href={`tel:${OFFICE_PHONE}`}
          className="block text-[22px] font-black text-gold-400 hover:text-gold-300 transition-colors duration-200 mb-4"
          aria-label={`전화 상담 ${OFFICE_PHONE}`}
        >
          {OFFICE_PHONE}
        </a>
        <Link
          href="/consultation"
          className="block w-full py-[10px] rounded-full bg-gold-500 hover:bg-gold-400 text-[#0f0f1a] text-[14px] font-bold transition-all duration-300 text-center hover:shadow-[0_0_20px_rgba(201,168,76,0.15)]"
        >
          상담 신청하기
        </Link>
      </div>
    </div>
  );
}
