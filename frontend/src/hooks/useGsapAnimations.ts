"use client";

import { useEffect } from "react";

export function useGsapAnimations() {
  useEffect(() => {
    const initGsap = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      // 1. Section titles fade-up
      (gsap.utils.toArray(".gsap-title") as HTMLElement[]).forEach((el) => {
        gsap.from(el, {
          y: 60, opacity: 0, duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      // 2. Card grids staggered
      (gsap.utils.toArray(".gsap-grid") as HTMLElement[]).forEach((grid) => {
        gsap.from(Array.from(grid.children), {
          y: 40, opacity: 0, duration: 0.8,
          stagger: 0.12, ease: "power2.out",
          scrollTrigger: { trigger: grid, start: "top 80%" },
        });
      });

      // 3. Image parallax
      (gsap.utils.toArray(".parallax-img") as HTMLElement[]).forEach((img) => {
        gsap.to(img, {
          yPercent: -15,
          ease: "none",
          scrollTrigger: {
            trigger: img.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    };

    initGsap();
  }, []);
}
