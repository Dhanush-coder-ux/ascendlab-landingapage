import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { faqs } from "../data/faqs";
import Heading from "./Heading";
import { gsap } from "../animations/gsapConfig";
import { isReducedMotion, EASING } from "../animations/animationPresets";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const accordionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isReducedMotion() || !accordionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        accordionRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: EASING.smooth,
          scrollTrigger: {
            trigger: accordionRef.current,
            start: "top 82%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      ref={sectionRef}
      id="faq"
      aria-labelledby="faq-heading"
      className="relative overflow-hidden bg-[#080B12] py-24 lg:py-32 border-b border-[rgba(148,163,184,0.1)]"
    >
      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Heading
          id="faq-heading"
          badge="QUESTIONS &amp; ANSWERS"
          title="Frequently Asked Questions"
          highlightWord="Asked Questions"
          text="Answers to common questions about our agency workflow, services, and how we collaborate on new projects."
        />

        <div
          ref={accordionRef}
          className="divide-y divide-[rgba(148,163,184,0.12)] rounded-2xl border border-[rgba(148,163,184,0.15)] bg-[#111827] shadow-[0_15px_35px_rgba(0,0,0,0.6)]"
        >
          {faqs.map((f, i) => {
            const isOpen = openIndex === i;
            const headingId = `faq-title-${i}`;
            const panelId = `faq-panel-${i}`;

            return (
              <div key={f.q} className="transition-colors duration-200">
                <h3 className="text-base font-medium">
                  <button
                    type="button"
                    id={headingId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(i)}
                    className="flex w-full items-center justify-between p-6 text-left font-semibold text-[#F8FAFC] transition-colors hover:text-blue-400 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2"
                  >
                    <span className="pr-4">{f.q}</span>
                    <ChevronDown
                      size={20}
                      aria-hidden="true"
                      className={`shrink-0 text-blue-400 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </h3>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={headingId}
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-6 pt-1 text-sm leading-relaxed text-[#94A3B8]">
                      <p>{f.a}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
