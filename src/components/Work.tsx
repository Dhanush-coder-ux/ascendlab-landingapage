import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Play, Film } from "lucide-react";
import { portfolio } from "../data/portfolio";
import type { PortfolioItem } from "../types";
import { CATEGORIES } from "../constants";
import Heading from "./Heading";
import Reveal from "./Reveal";

export default function Work() {
  const [cat, setCat] = useState<string>("All Work");
  const [sel, setSel] = useState<PortfolioItem | null>(null);

  const items = portfolio.filter(
    (p) => p.status !== "draft" && (cat === "All Work" || p.category === cat)
  );

  useEffect(() => {
    if (!sel) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSel(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [sel]);

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="py-20 lg:py-28 bg-white"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Heading
          id="work-heading"
          title="Selected Work & Creative Projects"
          text="A selection of creative work across content production, branding, digital marketing, and web development."
        />

        {/* Category Filters */}
        <div
          className="mb-10 flex flex-wrap justify-center gap-2"
          role="group"
          aria-label="Filter portfolio projects by category"
        >
          {CATEGORIES.map((c) => {
            const isSelected = cat === c;
            return (
              <button
                key={c}
                type="button"
                aria-pressed={isSelected}
                onClick={() => setCat(c)}
                className={`rounded-full border px-4 py-1.5 text-xs font-semibold tracking-wide transition duration-150 focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2 ${
                  isSelected
                    ? "border-brand bg-brand text-white shadow-xs"
                    : "border-line bg-white text-mute hover:border-brand/60 hover:text-ink"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        {items.length === 0 ? (
          <div className="mx-auto max-w-md rounded-xl border border-line bg-pale p-8 text-center">
            <p className="text-sm font-medium text-mute">
              No projects in this category currently published.
            </p>
            <button
              type="button"
              onClick={() => setCat("All Work")}
              className="mt-4 text-xs font-semibold uppercase tracking-wider text-brand hover:underline"
            >
              View all work
            </button>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((p) => (
              <Reveal key={p.id}>
                <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white transition duration-200 hover:-translate-y-1 hover:border-brand/60 hover:shadow-sm">
                  {/* Image Container with Consistent Aspect Ratio */}
                  <button
                    type="button"
                    onClick={() => setSel(p)}
                    className="relative aspect-[4/3] w-full overflow-hidden bg-soft text-left focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2"
                    aria-label={`View project details for ${p.title}`}
                  >
                    <img
                      src={p.cover}
                      alt={`${p.title} - ${p.category} showcase`}
                      width={800}
                      height={600}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                    <div className="absolute inset-0 bg-ink/10 opacity-0 transition-opacity duration-200 group-hover:opacity-100 flex items-center justify-center">
                      <span className="rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-ink shadow-sm">
                        View Project
                      </span>
                    </div>
                  </button>

                  {/* Content */}
                  <div className="flex flex-1 flex-col justify-between p-5">
                    <div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold uppercase tracking-wider text-brand">
                          {p.category}
                        </span>
                        <span className="text-[11px] text-mute">
                          {p.client}
                        </span>
                      </div>

                      <h3 className="mt-2 text-base font-semibold text-ink group-hover:text-brand transition duration-150">
                        <button
                          type="button"
                          onClick={() => setSel(p)}
                          className="text-left hover:underline focus-visible:outline-none"
                        >
                          {p.title}
                        </button>
                      </h3>

                      <p className="mt-2 text-xs leading-relaxed text-mute line-clamp-2">
                        {p.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-line/60">
                      <button
                        type="button"
                        onClick={() => setSel(p)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand hover:text-[#1d4a90] transition"
                      >
                        Project details
                        <span aria-hidden="true">→</span>
                      </button>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        )}

        {/* Project Detail Modal Dialog */}
        <AnimatePresence>
          {sel && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-ink/65 p-4 backdrop-blur-xs"
              onClick={() => setSel(null)}
            >
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-project-title"
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: 10 }}
                transition={{ duration: 0.25 }}
                onClick={(e) => e.stopPropagation()}
                className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-6 shadow-2xl sm:p-8"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-xs font-semibold tracking-wider text-brand uppercase">
                      {sel.category}
                    </span>
                    <h3
                      id="modal-project-title"
                      className="mt-1 text-2xl font-bold tracking-tight text-ink sm:text-3xl"
                    >
                      {sel.title}
                    </h3>
                    <p className="mt-1 text-xs text-mute font-medium">
                      {sel.client}
                    </p>
                  </div>
                  <button
                    type="button"
                    autoFocus
                    aria-label="Close dialog"
                    onClick={() => setSel(null)}
                    className="rounded-lg p-1.5 text-mute hover:bg-soft hover:text-ink focus-visible:outline-2 focus-visible:outline-brand"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Media Preview */}
                <div className="mt-6 aspect-[16/10] w-full overflow-hidden rounded-lg border border-line bg-soft">
                  {sel.videoUrl ? (
                    <video
                      src={sel.videoUrl}
                      poster={sel.cover}
                      controls
                      playsInline
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <img
                      src={sel.cover}
                      alt={sel.title}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>

                {/* Narrative */}
                <div className="mt-6">
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-ink">
                    Overview &amp; Creative Execution
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-mute">
                    {sel.description}
                  </p>
                </div>

                {/* Footer Actions */}
                <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-4">
                  <a
                    href="#contact"
                    onClick={() => setSel(null)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-brand hover:underline"
                  >
                    Discuss a similar project →
                  </a>
                  {sel.link && (
                    <a
                      href={sel.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-mute hover:text-ink"
                    >
                      External case study
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
