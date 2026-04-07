"use client";

import { useEffect } from "react";

export default function HydrationReady() {
  useEffect(() => {
    // JS가 로드되고 hydration이 완료되면 body에 .hydrated 추가
    // 이 시점부터 Framer Motion이 opacity/transform을 제어할 수 있음
    document.body.classList.add("hydrated");
  }, []);

  return null;
}
