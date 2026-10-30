import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { faqs } from "../data/faqs";
import Heading from "./Heading";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const reduce = useReducedMotion();

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="py-20 lg:py-28 bg-white"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Heading
          id="faq-heading"
          title="Frequently Asked Questions"
          text="Answers to common questions about our agency workflow, services, and how we collaborate on new projects."
        />

        <div className="divide-y divide-line rounded-xl border border-line bg-white shadow-xs">
          {faqs.map((f, i) => {
            const isOpen = openIndex === i;
            const headingId = `faq-title-${i}`;
            const panelId = `faq-panel-${i}`;

            return (
              <div key={f.q} className="transition-colors duration-150">
                <h3 className="text-base font-medium">
                  <button
                    type="button"
                    id={headingId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(i)}
                    className="flex w-full items-center justify-between p-5 sm:p-6 text-left font-semibold text-ink transition hover:text-brand focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2"
                  >
                    <span className="pr-4">{f.q}</span>
                    <ChevronDown
                      size={20}
                      aria-hidden="true"
                      className={`shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-brand" : "text-mute"
                      }`}
                    />
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={headingId}
                      initial={reduce ? undefined : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduce ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-6 pb-6 pt-1 text-sm leading-relaxed text-mute">
                        <p>{f.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
