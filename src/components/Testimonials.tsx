import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, MessageSquare, ArrowRight } from "lucide-react";
import { testimonials } from "../data/testimonials";
import { customerMedia } from "../data/customerMedia";
import type { CustomerMedia } from "../types";
import { BTN_PRIMARY } from "../constants";
import Heading from "./Heading";
import Reveal from "./Reveal";

export default function Testimonials() {
  const publishedTestimonials = testimonials.filter(
    (x) => x.status === "published"
  );
  const publishedMedia = customerMedia.filter((x) => x.status === "published");
  const [selectedMedia, setSelectedMedia] = useState<CustomerMedia | null>(null);

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
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="bg-pale border-y border-line/60 py-20 lg:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Heading
          id="testimonials-heading"
          title="Built Through Collaboration"
          text="Every project begins with a conversation. We value the relationships and ideas that make meaningful work possible."
        />

        {/* When testimonials exist */}
        {publishedTestimonials.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {publishedTestimonials.map((t) => (
              <Reveal key={t.id}>
                <figure className="flex h-full flex-col justify-between rounded-xl border border-line bg-white p-7 shadow-xs">
                  <blockquote className="text-sm sm:text-base leading-relaxed text-ink italic">
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 pt-4 border-t border-line/60">
                    {t.photo && (
                      <img
                        src={t.photo}
                        alt={t.name}
                        width={40}
                        height={40}
                        className="h-10 w-10 rounded-full object-cover border border-line"
                      />
                    )}
                    <div>
                      <p className="text-sm font-semibold text-ink">{t.name}</p>
                      <p className="text-xs text-mute">{t.company}</p>
                    </div>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        )}

        {/* Professional collaboration card when no public reviews are yet published */}
        {publishedTestimonials.length === 0 && (
          <Reveal>
            <div className="mx-auto max-w-2xl rounded-2xl border border-line bg-white p-8 sm:p-10 text-center shadow-xs">
              <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-soft text-brand mb-4">
                <MessageSquare size={22} aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
                Partner with Ascend Lab
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-mute sm:text-base">
                We believe exceptional digital outcomes are built on mutual trust,
                clear goals, and ongoing communication. We are currently documenting
                case studies and client reviews for our portfolio.
              </p>
              <div className="mt-6">
                <a
                  href="#contact"
                  className={`${BTN_PRIMARY} inline-flex items-center gap-2`}
                >
                  Start a Project Conversation
                  <ArrowRight size={16} aria-hidden="true" />
                </a>
              </div>
            </div>
          </Reveal>
        )}

        {/* Customer Media Showcase (Only shows when published items exist) */}
        {publishedMedia.length > 0 && (
          <div className="mt-14">
            <h3 className="text-center text-xs font-semibold uppercase tracking-wider text-mute mb-6">
              Client Project Highlights
            </h3>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {publishedMedia.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setSelectedMedia(m)}
                  className="group relative aspect-square w-full overflow-hidden rounded-xl border border-line bg-soft focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2"
                  aria-label={`View media: ${m.caption}`}
                >
                  <img
                    src={m.poster ?? m.url}
                    alt={m.caption}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                  {m.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center bg-ink/20 transition group-hover:bg-ink/30">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-brand shadow-sm">
                        <Play size={18} fill="currentColor" />
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 via-ink/40 to-transparent p-3 text-left">
                    <p className="text-xs font-medium text-white line-clamp-1">
                      {m.caption}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Lightbox / Video Modal */}
        <AnimatePresence>
          {selectedMedia && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-ink/75 p-4 backdrop-blur-xs"
              onClick={() => setSelectedMedia(null)}
            >
              <div
                role="dialog"
                aria-modal="true"
                aria-label={selectedMedia.caption}
                onClick={(e) => e.stopPropagation()}
                className="max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-xl bg-white p-5 shadow-2xl"
              >
                <div className="flex items-center justify-between pb-3 border-b border-line">
                  <h4 className="text-sm font-semibold text-ink line-clamp-1">
                    {selectedMedia.caption}
                  </h4>
                  <button
                    type="button"
                    autoFocus
                    aria-label="Close media dialog"
                    onClick={() => setSelectedMedia(null)}
                    className="rounded-lg p-1 text-mute hover:bg-soft hover:text-ink"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="mt-4 flex items-center justify-center bg-black/5 rounded-lg overflow-hidden">
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

                {selectedMedia.company && (
                  <p className="mt-3 text-xs text-mute">
                    Client: {selectedMedia.company}
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
