"use client";

import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="맨 위로 이동"
      className={`fixed bottom-[76px] right-4 z-40 w-12 h-12 rounded-full bg-burgundy-500/80 backdrop-blur-sm hover:bg-burgundy-500 shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 lg:hidden ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <ChevronUp size={24} className="text-white" />
    </button>
  );
}
