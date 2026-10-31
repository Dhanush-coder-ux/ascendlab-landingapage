import { useEffect, useState, useRef } from "react";
import { X, ExternalLink, ArrowRight } from "lucide-react";
import { portfolio } from "../data/portfolio";
import type { PortfolioItem } from "../types";
import { CATEGORIES } from "../constants";
import Heading from "./Heading";
import { gsap } from "../animations/gsapConfig";
import { isReducedMotion, EASING } from "../animations/animationPresets";

export default function Work() {
  const [cat, setCat] = useState<string>("All Work");
  const [sel, setSel] = useState<PortfolioItem | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const items = portfolio.filter(
    (p) => p.status !== "draft" && (cat === "All Work" || p.category === cat)
  );

  // GSAP Stagger Animation on Mount & when Filter Changes
  useEffect(() => {
    if (isReducedMotion() || !gridRef.current) return;

    const cards = gridRef.current.querySelectorAll(".portfolio-card-item");
    if (cards.length > 0) {
      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 30,
          scale: 0.98,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.55,
          stagger: 0.08,
          ease: EASING.smooth,
        }
      );
    }
  }, [cat]);

  // Modal Dialog Open Animation
  useEffect(() => {
    if (!sel || !modalRef.current || isReducedMotion()) return;

    gsap.fromTo(
      modalRef.current,
      { opacity: 0, scale: 0.95, y: 15 },
      { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: "power3.out" }
    );
  }, [sel]);

  // Keyboard accessibility: Escape closes modal
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
      className="relative overflow-hidden bg-[#080B12] py-24 lg:py-32 border-b border-[rgba(148,163,184,0.1)]"
    >
      {/* Background ambient lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 -right-40 h-[600px] w-[600px] rounded-full bg-blue-600/8 blur-[160px]"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Heading
          id="work-heading"
          badge="PORTFOLIO &amp; ARCHIVE"
          title="Selected Work &amp; Creative Projects"
          highlightWord="Creative Projects"
          text="A selection of creative work across content production, branding, digital marketing, and web development."
        />

        {/* Category Filters */}
        <div
          className="mb-12 flex flex-wrap justify-center gap-2.5"
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
                className={`rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition-all duration-200 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 ${
                  isSelected
                    ? "bg-blue-600 text-white shadow-[0_0_20px_rgba(59,130,246,0.35)] border border-blue-400"
                    : "border border-[rgba(148,163,184,0.15)] bg-[#111827] text-[#94A3B8] hover:border-blue-500/40 hover:text-[#F8FAFC]"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        {items.length === 0 ? (
          <div className="mx-auto max-w-md rounded-2xl border border-[rgba(148,163,184,0.15)] bg-[#111827] p-8 text-center">
            <p className="text-sm font-medium text-[#94A3B8]">
              No projects in this category currently published.
            </p>
            <button
              type="button"
              onClick={() => setCat("All Work")}
              className="mt-4 text-xs font-semibold uppercase tracking-wider text-blue-400 hover:text-blue-300"
            >
              View all work
            </button>
          </div>
        ) : (
          <div
            ref={gridRef}
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {items.map((p) => (
              <article
                key={p.id}
                className="portfolio-card-item group flex h-full flex-col overflow-hidden rounded-xl border border-[rgba(148,163,184,0.15)] bg-[#111827] transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-500/40 hover:shadow-[0_20px_35px_-10px_rgba(0,0,0,0.8),0_0_20px_rgba(59,130,246,0.15)]"
              >
                {/* Image Container with Consistent Aspect Ratio */}
                <button
                  type="button"
                  onClick={() => setSel(p)}
                  className="relative aspect-[4/3] w-full overflow-hidden bg-[#0D1220] text-left focus-visible:outline-2 focus-visible:outline-blue-500"
                  aria-label={`View project details for ${p.title}`}
                >
                  <img
                    src={p.cover}
                    alt={`${p.title} - ${p.category} showcase`}
                    width={800}
                    height={600}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />

                  {/* Dark hover gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080B12]/80 via-[#080B12]/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end p-5">
                    <span className="rounded-lg bg-blue-600/90 px-3 py-1.5 text-xs font-semibold text-white shadow-md backdrop-blur-xs">
                      View Project Details
                    </span>
                  </div>
                </button>

                {/* Content */}
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold uppercase tracking-wider text-blue-400">
                        {p.category}
                      </span>
                      <span className="text-[11px] text-[#94A3B8]/75">
                        {p.client}
                      </span>
                    </div>

                    <h3 className="mt-3 text-lg font-bold tracking-tight text-[#F8FAFC] group-hover:text-blue-400 transition-colors">
                      <button
                        type="button"
                        onClick={() => setSel(p)}
                        className="text-left hover:underline focus-visible:outline-none"
                      >
                        {p.title}
                      </button>
                    </h3>

                    <p className="mt-2 text-xs leading-relaxed text-[#94A3B8] line-clamp-2">
                      {p.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-[rgba(148,163,184,0.1)]">
                    <button
                      type="button"
                      onClick={() => setSel(p)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Project details
                      <ArrowRight
                        size={14}
                        className="transition-transform duration-200 group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Modal Dialog for Project Details */}
        {sel && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
            onClick={() => setSel(null)}
          >
            <div
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-project-title"
              onClick={(e) => e.stopPropagation()}
              className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-[rgba(148,163,184,0.2)] bg-[#111827] p-6 shadow-2xl sm:p-8"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-xs font-semibold tracking-wider text-blue-400 uppercase">
                    {sel.category}
                  </span>
                  <h3
                    id="modal-project-title"
                    className="mt-1 text-2xl font-bold tracking-tight text-[#F8FAFC] sm:text-3xl"
                  >
                    {sel.title}
                  </h3>
                  <p className="mt-1 text-xs text-[#94A3B8] font-medium">
                    {sel.client}
                  </p>
                </div>
                <button
                  type="button"
                  autoFocus
                  aria-label="Close dialog"
                  onClick={() => setSel(null)}
                  className="rounded-lg p-2 text-[#94A3B8] hover:bg-[#151D2D] hover:text-[#F8FAFC] focus-visible:outline-2 focus-visible:outline-blue-500"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Media Preview */}
              <div className="mt-6 aspect-[16/10] w-full overflow-hidden rounded-xl border border-[rgba(148,163,184,0.15)] bg-[#0D1220]">
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
                <h4 className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                  Overview &amp; Creative Execution
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-[#94A3B8]">
                  {sel.description}
                </p>
              </div>

              {/* Footer Actions */}
              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[rgba(148,163,184,0.12)] pt-5">
                <a
                  href="#contact"
                  onClick={() => setSel(null)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-blue-400 hover:text-blue-300"
                >
                  Discuss a similar project →
                </a>
                {sel.link && (
                  <a
                    href={sel.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-[#94A3B8] hover:text-[#F8FAFC]"
                  >
                    External case study
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
