"use client";

import { useEffect, useRef } from "react";

export function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const reveals = ref.current.querySelectorAll("[data-reveal]");
    const steps = ref.current.querySelectorAll("[data-step]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.02, rootMargin: "0px 0px -40px 0px" }
    );

    reveals.forEach((child) => observer.observe(child));
    steps.forEach((child) => observer.observe(child));
    return () => observer.disconnect();
  }, []);

  return ref;
}
