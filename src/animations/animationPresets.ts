import { gsap } from "./gsapConfig";

export const isReducedMotion = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

export const EASING = {
  smooth: "power3.out",
  expressive: "expo.out",
  subtle: "power2.out",
  elastic: "elastic.out(1, 0.75)",
} as const;

/**
 * Split text helper for line/word reveal animation without external SplitText plugin
 */
export const wrapWords = (text: string, className = "inline-block overflow-hidden"): string => {
  return text
    .split(" ")
    .map((word) => `<span class="${className}"><span class="inline-block transform-gpu will-change-transform">${word}</span></span>`)
    .join(" ");
};

/**
 * Standard staggered reveal for cards or list items
 */
export const staggerReveal = (
  elements: gsap.DOMTarget,
  trigger: gsap.DOMTarget,
  options: {
    stagger?: number;
    yOffset?: number;
    duration?: number;
    start?: string;
  } = {}
) => {
  if (isReducedMotion()) {
    gsap.set(elements, { opacity: 1, y: 0 });
    return;
  }

  const {
    stagger = 0.1,
    yOffset = 30,
    duration = 0.75,
    start = "top 85%",
  } = options;

  gsap.fromTo(
    elements,
    {
      opacity: 0,
      y: yOffset,
    },
    {
      opacity: 1,
      y: 0,
      duration,
      stagger,
      ease: EASING.smooth,
      scrollTrigger: {
        trigger,
        start,
        once: true,
      },
    }
  );
};

