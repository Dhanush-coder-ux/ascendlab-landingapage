import { Mail, Phone, MessageSquare, Clock } from "lucide-react";
import ContactForm from "./ContactForm";
import { EMAIL, PHONE, SITE_CONFIG } from "../constants";

interface ContactProps {
  service: string;
}

export default function Contact({ service }: ContactProps) {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="bg-pale border-t border-line/60 py-20 lg:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-12 items-start">
          
          {/* Left Column: Direct Contact & Information */}
          <div className="lg:col-span-5">
            <span className="text-xs font-semibold tracking-wider text-brand uppercase">
              START A CONVERSATION
            </span>
            <h2
              id="contact-heading"
              className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl"
            >
              Let's Build Something That{" "}
              <span className="text-brand">Moves Your Business Forward.</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-mute">
              Tell us a little about your brand, current challenges, and what you
              are looking to achieve. We will review your enquiry and get back
              with actionable next steps.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3.5 rounded-xl border border-line bg-white p-4 shadow-2xs">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-soft text-brand">
                  <Mail size={18} aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-mute">
                    Email Enquiries
                  </p>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="mt-0.5 text-sm font-semibold text-ink hover:text-brand hover:underline transition"
                  >
                    {EMAIL}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5 rounded-xl border border-line bg-white p-4 shadow-2xs">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-soft text-brand">
                  <Phone size={18} aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-mute">
                    Phone &amp; WhatsApp
                  </p>
                  <a
                    href={`tel:${SITE_CONFIG.phoneClean}`}
                    className="mt-0.5 text-sm font-semibold text-ink hover:text-brand hover:underline transition"
                  >
                    {PHONE}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5 rounded-xl border border-line bg-white p-4 shadow-2xs">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-soft text-brand">
                  <Clock size={18} aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-mute">
                    Response Time
                  </p>
                  <p className="mt-0.5 text-sm text-ink">
                    Typically within 24 business hours
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Enquiry Form Card */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-line bg-white p-6 sm:p-8 shadow-xs">
              <h3 className="text-lg font-semibold text-ink mb-1">
                Project Enquiry Form
              </h3>
              <p className="text-xs text-mute mb-6">
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
