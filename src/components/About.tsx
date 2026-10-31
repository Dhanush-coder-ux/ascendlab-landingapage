import { useState, useRef, useEffect } from "react";
import { CheckCircle2 } from "lucide-react";
import { gsap } from "../animations/gsapConfig";
import { isReducedMotion, EASING } from "../animations/animationPresets";

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

  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);
  const headingWordsRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isReducedMotion() || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Image clip-path reveal
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
            duration: 1,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 78%",
              once: true,
            },
          }
        );

        // Subtle desktop parallax
        if (window.innerWidth >= 1024) {
          gsap.to(imageWrapperRef.current, {
            y: 35,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          });
        }
      }

      // 2. Heading reveals word by word
      const words = headingWordsRef.current?.querySelectorAll(".word-reveal");
      if (words && words.length > 0) {
        gsap.fromTo(
          words,
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: EASING.smooth,
            scrollTrigger: {
              trigger: textContentRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }

      // 3. Description fades upward
      if (descRef.current) {
        gsap.fromTo(
          descRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: EASING.smooth,
            scrollTrigger: {
              trigger: textContentRef.current,
              start: "top 75%",
              once: true,
            },
          }
        );
      }

      // 4. Principles feature list staggers in
      const featureItems = featuresRef.current?.querySelectorAll(".principle-item");
      if (featureItems && featureItems.length > 0) {
        gsap.fromTo(
          featureItems,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.12,
            ease: EASING.smooth,
            scrollTrigger: {
              trigger: featuresRef.current,
              start: "top 82%",
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-labelledby="about-heading"
      className="relative overflow-hidden bg-[#0D1220] py-24 lg:py-32 border-b border-[rgba(148,163,184,0.1)]"
    >
      {/* Background radial accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-32 h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[150px]"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
          
          {/* Left Column: Team/Creative Studio Imagery */}
          <div className="lg:col-span-6 relative">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-500/20 to-sky-500/10 opacity-60 blur-lg" />
            
            <div
              ref={imageWrapperRef}
              className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-[rgba(148,163,184,0.2)] bg-[#111827] shadow-[0_20px_50px_rgba(0,0,0,0.7)]"
            >
              {!imageError ? (
                <img
                  src="/about.jpg"
                  alt="Ascend Lab creative team collaborating on brand strategy and visual campaigns around studio table"
                  width={1200}
                  height={800}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center p-6 text-center text-[#94A3B8] bg-[#111827]">
                  <p className="text-sm font-medium">Ascend Lab Creative Strategy Team</p>
                </div>
              )}

              {/* Gradient Vignette overlay for seamless dark integration */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0D1220]/50 via-transparent to-transparent" />
            </div>
          </div>

          {/* Right Column: Narrative & Principles */}
          <div ref={textContentRef} className="lg:col-span-6">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/25 bg-blue-500/10 px-3 py-1 text-xs font-semibold tracking-wider text-blue-400 uppercase">
              ABOUT ASCEND LAB
            </span>

            {/* Heading reveals word by word */}
            <h2
              ref={headingWordsRef}
              id="about-heading"
              className="mt-4 text-3xl font-extrabold tracking-tight text-[#F8FAFC] sm:text-4xl lg:text-[44px] lg:leading-[1.18]"
            >
              <span className="word-reveal inline-block mr-2">Creative</span>
              <span className="word-reveal inline-block mr-2">Thinking.</span>
              <span className="word-reveal inline-block mr-2">Clear</span>
              <span className="word-reveal inline-block mr-2">Strategy.</span>
              <span className="word-reveal inline-block bg-gradient-to-r from-blue-400 to-sky-400 bg-clip-text text-transparent">
                Meaningful Growth.
              </span>
            </h2>

            {/* Description */}
            <p
              ref={descRef}
              className="mt-6 text-base leading-relaxed text-[#94A3B8] sm:text-lg"
            >
              At Ascend Lab, we bring strategy, creativity, and technology
              together to help businesses strengthen their digital presence. From
              initial concept to final campaign delivery, our focus is on
              creating work that communicates clearly, connects with audiences,
              and supports real business goals.
            </p>

            {/* 3 Principles */}
            <div ref={featuresRef} className="mt-8 space-y-4">
              {PRINCIPLES.map((item) => (
                <div
                  key={item.title}
                  className="principle-item flex items-start gap-3.5 rounded-xl border border-[rgba(148,163,184,0.12)] bg-[#111827]/70 p-4 transition-colors duration-200 hover:border-blue-500/30"
                >
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 border border-blue-500/25 text-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.15)]">
                    <CheckCircle2 size={16} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-[#F8FAFC]">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-[#94A3B8]">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
