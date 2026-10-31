import { useRef, useEffect } from "react";
import {
  Video,
  Clapperboard,
  Share2,
  Megaphone,
  Code2,
  Search,
  PenLine,
  Palette,
  Sparkles,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { services } from "../data/services";
import Heading from "./Heading";
import SpotlightCard from "./common/SpotlightCard";
import { gsap } from "../animations/gsapConfig";
import { isReducedMotion, EASING } from "../animations/animationPresets";

const ICON_MAP: Record<string, LucideIcon> = {
  Video,
  Clapperboard,
  Share2,
  Megaphone,
  Code2,
  Search,
  PenLine,
  Palette,
};

interface ServicesProps {
  pick: (serviceTitle: string) => void;
}

export default function Services({ pick }: ServicesProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  // Staggered ScrollTrigger entrance for service cards
  useEffect(() => {
    if (isReducedMotion() || !gridRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll(".service-card-wrapper");
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          {
            opacity: 0,
            y: 36,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: EASING.smooth,
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 82%",
              once: true,
            },
          }
        );
      }
    }, gridRef);

    return () => ctx.revert();
  }, []);

  const handleServiceSelect = (title: string) => {
    pick(title);
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative overflow-hidden bg-[#080B12] py-24 lg:py-32 border-b border-[rgba(148,163,184,0.1)]"
    >
      {/* Background ambient lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[900px] rounded-full bg-blue-600/8 blur-[160px]"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Heading
          id="services-heading"
          badge="CAPABILITIES &amp; EXPERTISE"
          title="Digital Services Built Around Your Goals"
          highlightWord="Built Around Your Goals"
          text="Choose the creative, marketing, and digital services that best fit your business needs."
        />

        <div
          ref={gridRef}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {services.map((s) => {
            const IconComponent = ICON_MAP[s.icon] || Sparkles;

            return (
              <div key={s.id} className="service-card-wrapper h-full">
                <SpotlightCard
                  className="h-full p-6 sm:p-7 flex flex-col justify-between"
                  spotlightColor="rgba(59, 130, 246, 0.22)"
                >
                  <div>
                    {/* Blue Icon Container */}
                    <div className="card-interactive-icon inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/25 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.15)] will-change-transform">
                      <IconComponent size={22} aria-hidden="true" />
                    </div>

                    {/* Service Title */}
                    <h3 className="mt-5 text-lg font-bold tracking-tight text-[#F8FAFC]">
                      {s.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-2.5 text-sm leading-relaxed text-[#94A3B8]">
                      {s.description}
                    </p>
                  </div>

                  {/* Discuss This Service CTA */}
                  <div className="mt-6 pt-4 border-t border-[rgba(148,163,184,0.1)]">
                    <button
                      type="button"
                      onClick={() => handleServiceSelect(s.title)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-blue-400 hover:text-blue-300 transition-colors focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2"
                    >
                      Discuss this service
                      <ArrowUpRight
                        size={15}
                        className="card-interactive-arrow will-change-transform"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </SpotlightCard>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
