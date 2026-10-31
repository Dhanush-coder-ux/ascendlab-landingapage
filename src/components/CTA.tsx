import { useRef, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { BTN_PRIMARY } from "../constants";
import { gsap } from "../animations/gsapConfig";
import { isReducedMotion, EASING } from "../animations/animationPresets";

export default function CTA() {
  const ctaContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isReducedMotion() || !ctaContainerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ctaContainerRef.current,
        { opacity: 0, scale: 0.95, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          ease: EASING.smooth,
          scrollTrigger: {
            trigger: ctaContainerRef.current,
            start: "top 82%",
            once: true,
          },
        }
      );
    }, ctaContainerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      aria-label="Call to action"
      className="relative overflow-hidden bg-[#0D1220] py-24 lg:py-28 border-b border-[rgba(148,163,184,0.1)]"
    >
      {/* Background radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[600px] rounded-full bg-blue-600/12 blur-[140px]"
      />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <div
          ref={ctaContainerRef}
          className="relative overflow-hidden rounded-3xl border border-[rgba(148,163,184,0.18)] bg-gradient-to-b from-[#151D2D] to-[#111827] px-6 py-12 sm:px-12 sm:py-16 shadow-[0_20px_60px_rgba(0,0,0,0.7)]"
        >
          {/* Subtle top glow line */}
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-70" />

          <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/25 bg-blue-500/10 px-3.5 py-1 text-xs font-semibold tracking-wider text-blue-400 uppercase">
            LET'S COLLABORATE
          </span>

          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-[#F8FAFC] sm:text-4xl lg:text-5xl">
            Ready to Take the Next Step?
          </h2>

          <p className="mt-4 text-base leading-relaxed text-[#94A3B8] sm:text-lg max-w-xl mx-auto">
            Let's talk about your commercial goals and find the right digital
            solution for your business.
          </p>

          <div className="mt-8 flex justify-center">
            <a
              href="#contact"
              className={`${BTN_PRIMARY} inline-flex items-center gap-2.5 group text-base py-3.5 px-7 shadow-[0_0_25px_rgba(59,130,246,0.35)]`}
            >
              Contact Ascend Lab
              <ArrowRight
                size={18}
                className="transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
