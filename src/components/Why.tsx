import { CheckCircle2 } from "lucide-react";
import Heading from "./Heading";
import Reveal from "./Reveal";

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
  return (
    <section
      id="why"
      aria-labelledby="why-heading"
      className="bg-pale border-y border-line/60 py-20 lg:py-28"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Heading
          id="why-heading"
          title="A Thoughtful Approach to Digital Growth"
          text="What makes working with Ascend Lab different — practical strategy, clean creative execution, and reliable delivery."
        />

        <div className="mt-10 space-y-4">
          {REASONS.map((reason) => (
            <Reveal key={reason.title}>
              <div className="flex items-start gap-4 rounded-xl border border-line bg-white p-5 sm:p-6 shadow-2xs transition duration-150 hover:border-brand/40">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-soft text-brand">
                  <CheckCircle2 size={18} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-base font-semibold text-ink sm:text-lg">
                    {reason.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-mute">
                    {reason.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
