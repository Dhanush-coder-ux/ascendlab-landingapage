import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { BTN_PRIMARY, BTN_SECONDARY } from "../constants";

export default function Hero() {
  const reduce = useReducedMotion();
  const [imageError, setImageError] = useState(false);

  const anim = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.45, delay },
        };

  return (
    <section
      id="home"
      aria-label="Introduction"
      className="relative bg-pale border-b border-line/60 pt-10 pb-16 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* Left Column: Content */}
          <div className="lg:col-span-7 xl:col-span-7">
            <motion.div {...anim(0)}>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-soft px-3 py-1 text-xs font-semibold tracking-wider text-brand uppercase">
                <Sparkles size={13} className="text-brand" aria-hidden="true" />
                DIGITAL MARKETING &amp; CREATIVE SOLUTIONS
              </span>
            </motion.div>

            <motion.h1
              {...anim(0.08)}
              className="mt-5 text-4xl font-bold tracking-tight text-ink sm:text-5xl lg:text-[54px] lg:leading-[1.15]"
            >
              Build a Stronger Brand.{" "}
              <span className="text-brand">Grow Your Business.</span>
            </motion.h1>

            <motion.p
              {...anim(0.16)}
              className="mt-6 max-w-xl text-base leading-relaxed text-mute sm:text-lg"
            >
              From compelling content and thoughtful design to digital campaigns
              and web experiences, we help businesses build a stronger online
              presence.
            </motion.p>

            <motion.div
              {...anim(0.24)}
              className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:items-center"
            >
              <a
                href="#contact"
                className={`${BTN_PRIMARY} group gap-2`}
              >
                Let's Discuss Your Project
                <ArrowRight
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </a>
              <a
                href="#services"
                className={BTN_SECONDARY}
              >
                Explore Our Services
              </a>
            </motion.div>

            <motion.p
              {...anim(0.3)}
              className="mt-8 text-xs font-semibold tracking-wide text-mute/90 uppercase sm:text-sm"
            >
              Strategy <span className="text-brand font-bold">·</span> Creativity{" "}
              <span className="text-brand font-bold">·</span> Results
            </motion.p>
          </div>

          {/* Right Column: Creative Visual */}
          <motion.div
            {...anim(0.18)}
            className="lg:col-span-5 xl:col-span-5 order-last"
          >
            <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden rounded-xl border border-line bg-soft shadow-sm">
              {!imageError ? (
                <img
                  src="/hero.jpg"
                  alt="Ascend Lab creative team reviewing video production footage and marketing campaigns in studio"
                  width={1200}
                  height={800}
                  loading="eager"
                  fetchPriority="high"
                  className="h-full w-full object-cover transition duration-700 hover:scale-[1.02]"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center p-8 text-center bg-soft">
                  <div className="h-12 w-12 rounded-full bg-brand/10 flex items-center justify-center text-brand mb-3">
                    <Sparkles size={24} />
                  </div>
                  <p className="text-sm font-semibold text-ink">Ascend Lab Creative Production</p>
                  <p className="text-xs text-mute mt-1">Strategy · Creativity · Results</p>
                </div>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
