import { useRef, useEffect } from "react";
import { gsap } from "../../animations/gsapConfig";
import { isReducedMotion, EASING } from "../../animations/animationPresets";

interface SectionHeadingProps {
  id?: string;
  badge?: string;
  title: string;
  highlightWord?: string;
  text?: string;
  align?: "center" | "left";
  className?: string;
}

export default function SectionHeading({
  id,
  badge,
  title,
  highlightWord,
  text,
  align = "center",
  className = "",
}: SectionHeadingProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || isReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current?.children || [],
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: EASING.smooth,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const renderTitle = () => {
    if (!highlightWord) return title;
    const parts = title.split(highlightWord);
    return (
      <>
        {parts[0]}
        <span className="bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent">
          {highlightWord}
        </span>
        {parts[1]}
      </>
    );
  };

  return (
    <div
      ref={containerRef}
      className={`mb-12 sm:mb-16 ${
        align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl text-left"
      } ${className}`}
    >
      {badge && (
        <div className="mb-3">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/25 bg-blue-500/10 px-3 py-1 text-xs font-semibold tracking-wider text-blue-400 uppercase">
            {badge}
          </span>
        </div>
      )}

      <h2
        id={id}
        className="text-3xl font-bold tracking-tight text-[#F8FAFC] sm:text-4xl lg:text-[42px] lg:leading-[1.18]"
      >
        {renderTitle()}
      </h2>

      {text && (
        <p className="mt-4 text-base leading-relaxed text-[#94A3B8] sm:text-lg">
          {text}
        </p>
      )}
    </div>
  );
}

