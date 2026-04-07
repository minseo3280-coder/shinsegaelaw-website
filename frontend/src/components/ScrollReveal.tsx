"use client";

import { useEffect, useRef, useState, Children, isValidElement } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

/**
 * SSR-safe scroll reveal.
 * - Server: content visible (no opacity:0)
 * - Client mount + in viewport: stays visible, no flash
 * - Client mount + below fold: hidden, animates on scroll
 */
export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  y = 80,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"server" | "visible" | "hidden">("server");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const inViewport = rect.top < window.innerHeight + 50 && rect.bottom > 0;

    if (inViewport) {
      setState("visible");
      return;
    }

    setState("hidden");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("visible");
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const ease = "cubic-bezier(0.165,0.84,0.44,1)";
  const style: React.CSSProperties =
    state === "hidden"
      ? {
          opacity: 0,
          transform: `translateY(${y}px)`,
          transition: `opacity 0.7s ${ease} ${delay}ms, transform 0.7s ${ease} ${delay}ms`,
        }
      : state === "visible"
      ? {
          opacity: 1,
          transform: "translateY(0)",
          transition: `opacity 0.7s ${ease} ${delay}ms, transform 0.7s ${ease} ${delay}ms`,
        }
      : {};

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  interval?: number;
  y?: number;
}

/**
 * Stagger container: wraps each child in ScrollReveal with incremental delay.
 */
export function StaggerContainer({
  children,
  className = "",
  interval = 120,
  y = 80,
}: StaggerContainerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"server" | "visible" | "hidden">("server");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const inViewport = rect.top < window.innerHeight + 50 && rect.bottom > 0;

    if (inViewport) {
      setState("visible");
      return;
    }

    setState("hidden");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("visible");
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const ease = "cubic-bezier(0.165,0.84,0.44,1)";

  return (
    <div ref={ref} className={className}>
      {Children.map(children, (child, i) => {
        if (!isValidElement(child)) return child;
        const delay = i * interval;
        const childStyle: React.CSSProperties =
          state === "hidden"
            ? {
                opacity: 0,
                transform: `translateY(${y}px)`,
                transition: `opacity 0.7s ${ease} ${delay}ms, transform 0.7s ${ease} ${delay}ms`,
              }
            : state === "visible"
            ? {
                opacity: 1,
                transform: "translateY(0)",
                transition: `opacity 0.7s ${ease} ${delay}ms, transform 0.7s ${ease} ${delay}ms`,
              }
            : {};

        return (
          <div style={childStyle}>
            {child}
          </div>
        );
      })}
    </div>
  );
}
