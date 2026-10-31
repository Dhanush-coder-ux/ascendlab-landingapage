import { useState, useRef, useEffect } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { BTN_PRIMARY, BTN_SECONDARY } from "../constants";
import { gsap } from "../animations/gsapConfig";
import { isReducedMotion } from "../animations/animationPresets";

export default function Hero() {
  const [imageError, setImageError] = useState(false);

  const heroRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingLine1Ref = useRef<HTMLSpanElement>(null);
  const headingLine2Ref = useRef<HTMLSpanElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLParagraphElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const floatingBadgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isReducedMotion() || !heroRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.2 });

      // 1. Badge slides upward
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.6 }
      )
        // 2. Heading reveals line by line
        .fromTo(
          headingLine1Ref.current,
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.75 },
          "-=0.3"
        )
        .fromTo(
          headingLine2Ref.current,
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.75 },
          "-=0.55"
        )
        // 3. Description fades in
        .fromTo(
          descRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4"
        )
        // 4. CTA buttons stagger in
        .fromTo(
          buttonsRef.current?.children ? Array.from(buttonsRef.current.children) : [],
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
          "-=0.3"
        )
        .fromTo(
          metaRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.5 },
          "-=0.2"
        );

      // 5. Hero image reveals using clip-path
      if (imageWrapperRef.current) {
        gsap.fromTo(
          imageWrapperRef.current,
          {
            clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
            opacity: 0,
            scale: 0.97,
          },
          {
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
            opacity: 1,
            scale: 1,
            duration: 1.1,
            ease: "power3.inOut",
          }
        );

        // Controlled scroll-based parallax on desktop
        if (window.innerWidth >= 1024) {
          gsap.to(imageWrapperRef.current, {
            y: 40,
            ease: "none",
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 0.6,
            },
          });
        }
      }

      // Subtle floating element animation around hero image
      if (floatingBadgeRef.current) {
        gsap.to(floatingBadgeRef.current, {
          y: -10,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      aria-label="Introduction"
      className="relative overflow-hidden bg-[#080B12] pt-28 pb-20 sm:pt-36 sm:pb-28 lg:pt-40 lg:pb-32 border-b border-[rgba(148,163,184,0.1)]"
    >
      {/* Subtle Blue Radial Lighting in Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[550px] w-[800px] rounded-full bg-blue-600/12 blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 -right-40 h-[400px] w-[400px] rounded-full bg-blue-500/8 blur-[120px]"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* Left Column: Content */}
          <div className="lg:col-span-7 xl:col-span-7">
            
            {/* Badge */}
            <div ref={badgeRef}>
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1 text-xs font-semibold tracking-wider text-blue-400 uppercase shadow-[0_0_15px_rgba(59,130,246,0.15)]">
                <Sparkles size={13} className="text-blue-400" aria-hidden="true" />
                DIGITAL MARKETING &amp; CREATIVE SOLUTIONS
              </span>
            </div>

            {/* Heading with line-by-line reveal */}
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-[#F8FAFC] sm:text-5xl lg:text-[56px] lg:leading-[1.14]">
              <span className="block overflow-hidden pb-1">
                <span ref={headingLine1Ref} className="block will-change-transform">
                  Build a Stronger Brand.
                </span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span
                  ref={headingLine2Ref}
                  className="block bg-gradient-to-r from-blue-400 via-blue-500 to-sky-400 bg-clip-text text-transparent will-change-transform"
                >
                  Grow Your Business.
                </span>
              </span>
            </h1>

            {/* Description */}
            <p
              ref={descRef}
              className="mt-6 max-w-xl text-base leading-relaxed text-[#94A3B8] sm:text-lg"
            >
              From compelling content and thoughtful design to digital campaigns
              and web experiences, we help businesses build a stronger online
              presence.
            </p>

            {/* CTA Buttons */}
            <div
              ref={buttonsRef}
              className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:items-center"
            >
              <a
                href="#contact"
                className={`${BTN_PRIMARY} group gap-2.5`}
              >
                Let's Discuss Your Project
                <ArrowRight
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </a>
              <a
                href="#services"
                className={BTN_SECONDARY}
              >
                Explore Our Services
              </a>
            </div>

            {/* Supporting line */}
            <p
              ref={metaRef}
              className="mt-9 text-xs font-semibold tracking-wider text-[#94A3B8]/80 uppercase sm:text-sm"
            >
              Strategy <span className="text-blue-500 font-bold px-1">·</span> Creativity{" "}
              <span className="text-blue-500 font-bold px-1">·</span> Results
            </p>
          </div>

          {/* Right Column: Creative Visual */}
          <div className="lg:col-span-5 xl:col-span-5 order-last relative">
            
            {/* Glowing Backdrop Border */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-600/30 to-blue-400/20 opacity-50 blur-lg" />

            {/* Hero Image Container */}
            <div
              ref={imageWrapperRef}
              className="relative aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden rounded-xl border border-[rgba(148,163,184,0.2)] bg-[#111827] shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
            >
              {!imageError ? (
                <img
                  src="/hero.jpg"
                  alt="Ascend Lab creative team reviewing video production footage and marketing campaigns in studio"
                  width={1200}
                  height={800}
                  loading="eager"
                  fetchPriority="high"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center p-8 text-center bg-[#111827]">
                  <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 mb-3">
                    <Sparkles size={24} />
                  </div>
                  <p className="text-sm font-semibold text-[#F8FAFC]">Ascend Lab Creative Production</p>
                  <p className="text-xs text-[#94A3B8] mt-1">Strategy · Creativity · Results</p>
                </div>
              )}

              {/* Gradient Vignette overlay for dark mode integration */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080B12]/60 via-transparent to-transparent" />
            </div>

            {/* Subtle Floating Visual Element / Badge */}
            <div
              ref={floatingBadgeRef}
              className="hidden sm:flex absolute -bottom-5 -left-5 z-20 items-center gap-3 rounded-xl border border-[rgba(148,163,184,0.2)] bg-[#111827]/90 px-4 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.6)] backdrop-blur-md"
            >
              <div className="h-2.5 w-2.5 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
              <div>
                <p className="text-xs font-semibold text-[#F8FAFC]">Creative Production</p>
                <p className="text-[11px] text-[#94A3B8]">High Impact Growth</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
