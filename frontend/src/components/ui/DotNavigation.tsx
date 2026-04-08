"use client";

import { useState, useEffect } from "react";

const sections = [
  { id: "hero", label: "홈" },
  { id: "trust", label: "신뢰" },
  { id: "ceo", label: "대표" },
  { id: "why", label: "차별점" },
  { id: "cases", label: "승소사례" },
  { id: "credentials", label: "자격" },
  { id: "lawyers", label: "변호사" },
  { id: "reviews", label: "후기" },
  { id: "contact", label: "상담" },
];

export default function DotNavigation() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { threshold: 0.3 }
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-3">
      {sections.map(({ id, label }) => (
        <button
          key={id}
          onClick={() =>
            document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
          }
          className="group relative flex items-center justify-end"
          aria-label={label}
        >
          <span className="absolute right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-[13px] text-muted-foreground whitespace-nowrap bg-background/80 backdrop-blur-sm px-2 py-1 rounded">
            {label}
          </span>
          <div
            className={`rounded-full transition-all duration-300 ${
              active === id
                ? "w-[5px] h-[5px] bg-[#7B2D3B]"
                : "w-[4px] h-[4px] bg-gray-400 hover:bg-foreground/20"
            }`}
          />
        </button>
      ))}
    </div>
  );
}
