import { useRef, useEffect } from "react";
import { Mail, Phone, Clock } from "lucide-react";
import ContactForm from "./ContactForm";
import { EMAIL, PHONE, SITE_CONFIG } from "../constants";
import { gsap } from "../animations/gsapConfig";
import { isReducedMotion, EASING } from "../animations/animationPresets";

interface ContactProps {
  service: string;
}

export default function Contact({ service }: ContactProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isReducedMotion() || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Info cards stagger in
      const cards = infoRef.current?.querySelectorAll(".contact-info-card");
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, x: -25 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: EASING.smooth,
            scrollTrigger: {
              trigger: infoRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }

      // Form card slides up
      if (formCardRef.current) {
        gsap.fromTo(
          formCardRef.current,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: EASING.smooth,
            scrollTrigger: {
              trigger: formCardRef.current,
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
      id="contact"
      aria-labelledby="contact-heading"
      className="relative overflow-hidden bg-[#080B12] py-24 lg:py-32 border-b border-[rgba(148,163,184,0.1)]"
    >
      {/* Background subtle radial lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 left-10 h-[600px] w-[600px] rounded-full bg-blue-600/10 blur-[170px]"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14 items-start">
          
          {/* Left Column: Direct Contact & Information */}
          <div ref={infoRef} className="lg:col-span-5">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/25 bg-blue-500/10 px-3 py-1 text-xs font-semibold tracking-wider text-blue-400 uppercase">
              START A CONVERSATION
            </span>

            <h2
              id="contact-heading"
              className="mt-4 text-3xl font-extrabold tracking-tight text-[#F8FAFC] sm:text-4xl lg:text-[42px] lg:leading-[1.18]"
            >
              Let's Build Something That{" "}
              <span className="bg-gradient-to-r from-blue-400 to-sky-400 bg-clip-text text-transparent">
                Moves Your Business Forward.
              </span>
            </h2>

            <p className="mt-5 text-base leading-relaxed text-[#94A3B8]">
              Tell us a little about your brand, current challenges, and what you
              are looking to achieve. We will review your enquiry and get back
              with actionable next steps.
            </p>

            <div className="mt-9 space-y-4">
              {/* Email Card */}
              <div className="contact-info-card flex items-start gap-4 rounded-xl border border-[rgba(148,163,184,0.15)] bg-[#111827] p-5 shadow-md transition-all duration-200 hover:border-blue-500/40">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/25 text-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.15)]">
                  <Mail size={19} aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">
                    Email Enquiries
                  </p>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="mt-1 block text-sm font-semibold text-[#F8FAFC] hover:text-blue-400 hover:underline transition-colors"
                  >
                    {EMAIL}
                  </a>
                </div>
              </div>

              {/* Phone Card */}
              <div className="contact-info-card flex items-start gap-4 rounded-xl border border-[rgba(148,163,184,0.15)] bg-[#111827] p-5 shadow-md transition-all duration-200 hover:border-blue-500/40">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/25 text-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.15)]">
                  <Phone size={19} aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">
                    Phone &amp; WhatsApp
                  </p>
                  <a
                    href={`tel:${SITE_CONFIG.phoneClean}`}
                    className="mt-1 block text-sm font-semibold text-[#F8FAFC] hover:text-blue-400 hover:underline transition-colors"
                  >
                    {PHONE}
                  </a>
                </div>
              </div>

              {/* Response Time Card */}
              <div className="contact-info-card flex items-start gap-4 rounded-xl border border-[rgba(148,163,184,0.15)] bg-[#111827] p-5 shadow-md transition-all duration-200 hover:border-blue-500/40">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/25 text-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.15)]">
                  <Clock size={19} aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">
                    Response Time
                  </p>
                  <p className="mt-1 text-sm font-medium text-[#F8FAFC]">
                    Typically within 24 business hours
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Dark Enquiry Form Card */}
          <div ref={formCardRef} className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-2xl border border-[rgba(148,163,184,0.18)] bg-[#111827] p-7 sm:p-9 shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
              {/* Subtle top glow line */}
              <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-60" />

              <h3 className="text-xl font-bold tracking-tight text-[#F8FAFC] mb-1">
                Project Enquiry Form
              </h3>
              <p className="text-xs text-[#94A3B8] mb-7">
                Fill in the details below. All project inquiries are confidential.
              </p>
              <ContactForm service={service} />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
