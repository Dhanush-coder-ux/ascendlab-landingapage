import { useState, useEffect, useRef } from "react";
import { X, Play, MessageSquare, ArrowRight } from "lucide-react";
import { testimonials } from "../data/testimonials";
import { customerMedia } from "../data/customerMedia";
import type { CustomerMedia } from "../types";
import { BTN_PRIMARY } from "../constants";
import Heading from "./Heading";
import { gsap } from "../animations/gsapConfig";
import { isReducedMotion, EASING } from "../animations/animationPresets";

export default function Testimonials() {
  const publishedTestimonials = testimonials.filter(
    (x) => x.status === "published"
  );
  const publishedMedia = customerMedia.filter((x) => x.status === "published");
  const [selectedMedia, setSelectedMedia] = useState<CustomerMedia | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isReducedMotion() || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Card fade and scale into view
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, scale: 0.94, y: 25 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.8,
            ease: EASING.smooth,
            scrollTrigger: {
              trigger: cardRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }

      // Icon subtle floating animation
      if (iconRef.current) {
        gsap.to(iconRef.current, {
          y: -7,
          duration: 2.6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!selectedMedia) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedMedia(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedMedia]);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="relative overflow-hidden bg-[#0D1220] py-24 lg:py-32 border-b border-[rgba(148,163,184,0.1)]"
    >
      {/* Background ambient lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[700px] rounded-full bg-blue-600/10 blur-[150px]"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Heading
          id="testimonials-heading"
          badge="CLIENT RELATIONS"
          title="Built Through Collaboration"
          highlightWord="Collaboration"
          text="Every project begins with a conversation. We value the relationships and ideas that make meaningful work possible."
        />

        {/* Published Reviews if any exist */}
        {publishedTestimonials.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
            {publishedTestimonials.map((t) => (
              <figure
                key={t.id}
                className="flex h-full flex-col justify-between rounded-xl border border-[rgba(148,163,184,0.15)] bg-[#111827] p-7 shadow-lg"
              >
                <blockquote className="text-sm sm:text-base leading-relaxed text-[#F8FAFC] italic">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 pt-4 border-t border-[rgba(148,163,184,0.1)]">
                  {t.photo && (
                    <img
                      src={t.photo}
                      alt={t.name}
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-full object-cover border border-blue-500/30"
                    />
                  )}
                  <div>
                    <p className="text-sm font-semibold text-[#F8FAFC]">{t.name}</p>
                    <p className="text-xs text-[#94A3B8]">{t.company}</p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        )}

        {/* Premium Centered Collaboration Card */}
        {publishedTestimonials.length === 0 && (
          <div
            ref={cardRef}
            className="relative mx-auto max-w-2xl overflow-hidden rounded-2xl border border-[rgba(148,163,184,0.18)] bg-gradient-to-b from-[#151D2D] to-[#111827] p-8 sm:p-12 text-center shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
          >
            {/* Subtle top glow line */}
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-60" />

            {/* Blue Icon with floating animation */}
            <div
              ref={iconRef}
              className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 border border-blue-500/30 text-blue-400 mb-5 shadow-[0_0_20px_rgba(59,130,246,0.25)] will-change-transform"
            >
              <MessageSquare size={26} aria-hidden="true" />
            </div>

            <h3 className="text-2xl font-bold tracking-tight text-[#F8FAFC] sm:text-3xl">
              Partner with Ascend Lab
            </h3>

            <p className="mt-4 text-sm leading-relaxed text-[#94A3B8] sm:text-base max-w-lg mx-auto">
              We believe exceptional digital outcomes are built on mutual trust,
              clear goals, and ongoing communication. We are currently documenting
              case studies and client reviews for our portfolio.
            </p>

            <div className="mt-8 flex justify-center">
              <a
                href="#contact"
                className={`${BTN_PRIMARY} inline-flex items-center gap-2 group shadow-[0_0_25px_rgba(59,130,246,0.3)]`}
              >
                Start a Project Conversation
                <ArrowRight
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>
        )}

        {/* Customer Media Showcase if published */}
        {publishedMedia.length > 0 && (
          <div className="mt-14">
            <h3 className="text-center text-xs font-semibold uppercase tracking-wider text-[#94A3B8] mb-6">
              Client Project Highlights
            </h3>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {publishedMedia.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setSelectedMedia(m)}
                  className="group relative aspect-square w-full overflow-hidden rounded-xl border border-[rgba(148,163,184,0.15)] bg-[#111827] focus-visible:outline-2 focus-visible:outline-blue-500"
                  aria-label={`View media: ${m.caption}`}
                >
                  <img
                    src={m.poster ?? m.url}
                    alt={m.caption}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {m.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white shadow-md">
                        <Play size={18} fill="currentColor" />
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 text-left">
                    <p className="text-xs font-medium text-white line-clamp-1">
                      {m.caption}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Media Lightbox */}
        {selectedMedia && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
            onClick={() => setSelectedMedia(null)}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-label={selectedMedia.caption}
              onClick={(e) => e.stopPropagation()}
              className="max-w-3xl w-full rounded-2xl border border-[rgba(148,163,184,0.2)] bg-[#111827] p-5 shadow-2xl"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[rgba(148,163,184,0.1)]">
                <h4 className="text-sm font-semibold text-[#F8FAFC] line-clamp-1">
                  {selectedMedia.caption}
                </h4>
                <button
                  type="button"
                  autoFocus
                  aria-label="Close media dialog"
                  onClick={() => setSelectedMedia(null)}
                  className="rounded-lg p-1.5 text-[#94A3B8] hover:bg-[#151D2D] hover:text-[#F8FAFC]"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="mt-4 flex items-center justify-center bg-black/40 rounded-xl overflow-hidden">
                {selectedMedia.type === "video" ? (
                  <video
                    src={selectedMedia.url}
                    poster={selectedMedia.poster}
                    controls
                    autoPlay
                    playsInline
                    className="max-h-[70vh] w-full rounded"
                  />
                ) : (
                  <img
                    src={selectedMedia.url}
                    alt={selectedMedia.caption}
                    className="max-h-[70vh] w-auto object-contain rounded"
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
