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
import Reveal from "./Reveal";

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
      className="py-20 lg:py-28 bg-white"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Heading
          id="services-heading"
          title="Digital Services Built Around Your Goals"
          text="Choose the creative, marketing, and digital services that best fit your business needs."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => {
            const IconComponent = ICON_MAP[s.icon] || Sparkles;

            return (
              <Reveal key={s.id}>
                <article className="group flex h-full flex-col justify-between rounded-xl border border-line bg-white p-6 transition duration-200 hover:-translate-y-0.5 hover:border-brand hover:shadow-xs">
                  <div>
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-soft text-brand transition duration-200 group-hover:bg-brand group-hover:text-white">
                      <IconComponent size={22} aria-hidden="true" />
                    </div>

                    <h3 className="mt-5 text-lg font-semibold tracking-tight text-ink group-hover:text-brand transition duration-150">
                      {s.title}
                    </h3>

                    <p className="mt-2.5 text-sm leading-relaxed text-mute">
                      {s.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-line/60">
                    <button
                      type="button"
                      onClick={() => handleServiceSelect(s.title)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-brand hover:text-[#1d4a90] transition focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2"
                    >
                      Discuss this service
                      <ArrowUpRight
                        size={14}
                        className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
