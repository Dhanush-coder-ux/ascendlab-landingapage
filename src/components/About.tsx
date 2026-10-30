import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import Reveal from "./Reveal";

const PRINCIPLES = [
  {
    title: "Strategy First",
    desc: "Every project begins with understanding your commercial goals, market positioning, and target audience before executing creative work.",
  },
  {
    title: "Creativity with Purpose",
    desc: "Every video cut, design asset, and digital campaign serves a clear objective — engaging real people and building brand recall.",
  },
  {
    title: "Growth Through Collaboration",
    desc: "We work directly with founders and marketing teams as transparent creative partners to continually test, improve, and scale digital outcomes.",
  },
] as const;

export default function About() {
  const [imageError, setImageError] = useState(false);

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="bg-pale border-y border-line/60 py-20 lg:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-12">
          
          {/* Left Column: Authentic Agency Imagery */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-line bg-soft shadow-xs">
              {!imageError ? (
                <img
                  src="/about.jpg"
                  alt="Ascend Lab creative team collaborating on brand strategy and visual campaigns around studio table"
                  width={1200}
                  height={800}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 hover:scale-[1.02]"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center p-6 text-center text-mute bg-soft">
                  <p className="text-sm font-medium">Ascend Lab Creative Strategy Team</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Narrative & Principles */}
          <div className="lg:col-span-6">
            <Reveal>
              <span className="text-xs font-semibold tracking-wider text-brand uppercase">
                ABOUT ASCEND LAB
              </span>
              <h2
                id="about-heading"
                className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl"
              >
                Creative Thinking. Clear Strategy.{" "}
                <span className="text-brand">Meaningful Growth.</span>
              </h2>
              <p className="mt-5 text-base leading-relaxed text-mute">
                At Ascend Lab, we bring strategy, creativity, and technology
                together to help businesses strengthen their digital presence. From
                initial concept to final campaign delivery, our focus is on
                creating work that communicates clearly, connects with audiences,
                and supports real business goals.
              </p>

              <div className="mt-8 space-y-5">
                {PRINCIPLES.map((item) => (
                  <div key={item.title} className="flex items-start gap-3.5">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-soft text-brand">
                      <CheckCircle2 size={16} aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-ink">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-mute">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}
