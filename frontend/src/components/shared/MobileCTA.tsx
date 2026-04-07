"use client";

import Link from "next/link";
import firmData from "@/../../data/firm_info.json";

const OFFICE_PHONE = firmData.offices[0].phone;

export default function MobileCTA() {
  return (
    <div className="lg:hidden">
      <div className="max-w-[1600px] mx-auto px-5 md:px-8 lg:px-10 py-8">
        <div className="rounded-2xl overflow-hidden bg-[#0f0f1a] p-6 text-center relative">
          <div className="absolute top-[-40px] right-[-40px] w-[150px] h-[150px] bg-burgundy-500 opacity-[0.2] blur-[60px] rounded-full pointer-events-none" />
          <div className="absolute bottom-[-30px] left-[-30px] w-[100px] h-[100px] bg-gold-500 opacity-[0.08] blur-[40px] rounded-full pointer-events-none" />
          <div className="relative z-10">
            <p className="text-[12px] tracking-[0.2em] text-gold-500/50 uppercase mb-1.5">
              Consultation
            </p>
            <p className="text-[17px] font-bold text-white mb-[2px]">
              법률 상담
            </p>
            <p className="text-[13px] text-white/35 mb-4">
              비밀보장 · 24시간 내 회신
            </p>
            <a
              href={`tel:${OFFICE_PHONE}`}
              className="block text-[24px] font-black text-gold-400 hover:text-gold-300 transition-colors duration-200 mb-4"
              aria-label={`전화 상담 ${OFFICE_PHONE}`}
            >
              {OFFICE_PHONE}
            </a>
            <div className="flex gap-3 justify-center">
              <a
                href={`tel:${OFFICE_PHONE}`}
                className="flex-1 py-3 rounded-full border border-white/15 text-white/70 text-[15px] text-center hover:bg-white/5 transition-all duration-200"
              >
                전화 상담
              </a>
              <Link
                href="/consultation"
                className="flex-1 py-3 rounded-full bg-gold-500 hover:bg-gold-400 text-[#0f0f1a] text-[15px] font-bold text-center transition-all duration-300"
              >
                상담 신청하기
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
