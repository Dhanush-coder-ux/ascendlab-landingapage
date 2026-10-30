import { ArrowRight } from "lucide-react";
import { BTN_PRIMARY } from "../constants";
import Reveal from "./Reveal";

export default function CTA() {
  return (
    <section
      aria-label="Call to action"
      className="relative bg-white py-20 lg:py-24 border-t border-line/60"
    >
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <Reveal>
          <span className="text-xs font-semibold tracking-wider text-brand uppercase">
            LET'S COLLABORATE
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Ready to Take the Next Step?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-mute sm:text-lg">
            Let's talk about your commercial goals and find the right digital
            solution for your business.
          </p>
          <div className="mt-8 flex justify-center">
            <a
              href="#contact"
              className={`${BTN_PRIMARY} inline-flex items-center gap-2`}
            >
              Contact Ascend Lab
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
