import { useRef, useEffect } from "react";
import { CheckCircle2 } from "lucide-react";
import Heading from "./Heading";
import { gsap } from "../animations/gsapConfig";
import { isReducedMotion, EASING } from "../animations/animationPresets";

const REASONS = [
  {
    title: "Tailored to Your Commercial Goals",
    desc: "We do not push one-size-fits-all packages. Every campaign and asset is scoped around your actual business targets.",
  },
  {
    title: "Consistent Brand Identity & Clear Communication",
    desc: "From social media posts to video production, we ensure your visual language and messaging remain cohesive across all touchpoints.",
  },
  {
    title: "Audience-Centric Creative Content",
    desc: "We research customer psychology and platform nuances to produce content that stops the scroll and drives genuine engagement.",
  },
  {
    title: "Engineered for Usability & Conversions",
    desc: "Our websites, landing pages, and digital funnels are fast, intuitive, and built to turn qualified visitors into enquiries.",
  },
  {
    title: "Transparent & Collaborative Partnership",
    desc: "You have direct access to our creative strategists with honest communication, realistic timelines, and no confusing jargon.",
  },
] as const;

export default function Why() {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isReducedMotion() || !listRef.current) return;

    const ctx = gsap.context(() => {
      const items = listRef.current?.querySelectorAll(".why-feature-card");
      if (items && items.length > 0) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 26 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.1,
            ease: EASING.smooth,
            scrollTrigger: {
              trigger: listRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="why"
      aria-labelledby="why-heading"
      className="relative overflow-hidden bg-[#0D1220] py-24 lg:py-32 border-b border-[rgba(148,163,184,0.1)]"
    >
      {/* Background subtle radial lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-10 h-[500px] w-[500px] rounded-full bg-blue-600/8 blur-[150px]"
      />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Heading
          id="why-heading"
          badge="THE ASCEND ADVANTAGE"
          title="A Thoughtful Approach to Digital Growth"
          highlightWord="Digital Growth"
          text="What makes working with Ascend Lab different — practical strategy, clean creative execution, and reliable delivery."
        />

        <div ref={listRef} className="mt-12 space-y-4">
          {REASONS.map((reason) => (
            <div
              key={reason.title}
              className="why-feature-card group flex items-start gap-4 rounded-xl border border-[rgba(148,163,184,0.15)] bg-[#111827] p-6 transition-all duration-300 hover:border-blue-500/40 hover:bg-[#151D2D] hover:shadow-[0_10px_25px_rgba(0,0,0,0.5),0_0_15px_rgba(59,130,246,0.1)]"
            >
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/25 text-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.15)] transition-transform duration-200 group-hover:scale-105">
                <CheckCircle2 size={18} aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-base font-bold text-[#F8FAFC] sm:text-lg group-hover:text-blue-400 transition-colors">
                  {reason.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-[#94A3B8]">
                  {reason.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
