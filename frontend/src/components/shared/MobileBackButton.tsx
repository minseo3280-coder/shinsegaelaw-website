"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export default function MobileBackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="md:hidden flex items-center gap-0.5 w-full px-5 py-2.5 text-[14px] text-[#555555] font-medium bg-white border-b border-gray-100 active:bg-gray-50 transition-colors"
      aria-label="이전 페이지로 돌아가기"
    >
      <ChevronLeft size={16} className="text-[#999999]" />
      뒤로가기
    </button>
  );
}
