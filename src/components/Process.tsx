import Heading from "./Heading";
import Reveal from "./Reveal";

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
  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="py-20 lg:py-28 bg-white"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Heading
          id="process-heading"
          title="From First Conversation to Final Delivery"
          text="A transparent, collaborative workflow designed to move ideas efficiently from initial strategy to measurable commercial results."
        />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, idx) => (
            <Reveal key={step.num}>
              <div className="relative flex h-full flex-col justify-between rounded-xl border border-line bg-white p-6 transition duration-200 hover:border-brand/60">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold tracking-tight text-brand">
                      {step.num}
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-mute">
                      Phase {idx + 1}
                    </span>
                  </div>

                  <h3 className="mt-4 text-lg font-semibold tracking-tight text-ink">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-mute">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-6 h-1 w-10 bg-soft rounded-full overflow-hidden">
                  <div className="h-full bg-brand/60 w-full" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
