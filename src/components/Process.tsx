import { useRef, useEffect } from "react";
import Heading from "./Heading";
import { gsap } from "../animations/gsapConfig";
import { isReducedMotion, EASING } from "../animations/animationPresets";

const STEPS = [
  {
    num: "01",
    title: "Discover",
    desc: "We analyze your business model, target audience, competitive landscape, and digital growth objectives.",
  },
  {
    num: "02",
    title: "Plan",
    desc: "We outline a clear creative and marketing roadmap with tailored content formats, visual guidelines, and channel strategy.",
  },
  {
    num: "03",
    title: "Create",
    desc: "Our production team executes the video shoots, designs, ad creatives, copy, or web development with precision.",
  },
  {
    num: "04",
    title: "Improve",
    desc: "We monitor performance metrics, analyze audience feedback, and continuously refine creative assets for sustained ROI.",
  },
] as const;

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isReducedMotion() || !gridRef.current) return;

    const ctx = gsap.context(() => {
      const grid = gridRef.current;
      if (!grid) return;

      const cards = grid.querySelectorAll(".workflow-card");
      if (cards && cards.length > 0) {
        // Stagger entrance
        gsap.fromTo(
          cards,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: EASING.smooth,
            scrollTrigger: {
              trigger: grid,
              start: "top 80%",
              once: true,
            },
          }
        );

        // Animate progress indicators on scroll
        const indicators = grid.querySelectorAll(".workflow-progress-bar");
        indicators.forEach((bar) => {
          gsap.fromTo(
            bar,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 0.9,
              ease: "power2.out",
              transformOrigin: "left center",
              scrollTrigger: {
                trigger: bar,
                start: "top 85%",
                once: true,
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      aria-labelledby="process-heading"
      className="relative overflow-hidden bg-[#080B12] py-24 lg:py-32 border-b border-[rgba(148,163,184,0.1)]"
    >
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Heading
          id="process-heading"
          badge="WORKFLOW &amp; DELIVERY"
          title="From First Conversation to Final Delivery"
          highlightWord="Final Delivery"
          text="A transparent, collaborative workflow designed to move ideas efficiently from initial strategy to measurable commercial results."
        />

        <div
          ref={gridRef}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {STEPS.map((step, idx) => (
            <div
              key={step.num}
              className="workflow-card group relative flex h-full flex-col justify-between rounded-xl border border-[rgba(148,163,184,0.15)] bg-[#111827] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-[0_15px_30px_rgba(0,0,0,0.7),0_0_20px_rgba(59,130,246,0.12)]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 to-sky-400 bg-clip-text text-transparent">
                    {step.num}
                  </span>
                  <span className="rounded-full bg-blue-500/10 border border-blue-500/20 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-blue-400">
                    Phase {idx + 1}
                  </span>
                </div>

                <h3 className="mt-5 text-xl font-bold tracking-tight text-[#F8FAFC]">
                  {step.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-[#94A3B8]">
                  {step.desc}
                </p>
              </div>

              {/* Progress Indicator */}
              <div className="mt-8 pt-4 border-t border-[rgba(148,163,184,0.1)]">
                <div className="h-1 w-full bg-[#151D2D] rounded-full overflow-hidden">
                  <div className="workflow-progress-bar h-full bg-gradient-to-r from-blue-600 to-sky-400 w-full will-change-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
