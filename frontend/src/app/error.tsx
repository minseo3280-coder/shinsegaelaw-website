"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
      <p className="text-[13px] tracking-[0.2em] text-burgundy-500/40 uppercase mb-3">
        Error
      </p>
      <h2 className="text-[20px] font-bold text-gray-900 mb-2">
        문제가 발생했습니다
      </h2>
      <p className="text-[14px] text-[#444444] mb-8">
        잠시 후 다시 시도해주세요.
      </p>
      <button
        onClick={reset}
        className="px-6 py-3 rounded-full bg-burgundy-500 hover:bg-burgundy-600 text-white text-[14px] font-semibold transition-all duration-300"
      >
        다시 시도
      </button>
    </div>
  );
}
