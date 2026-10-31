import Logo from "./Logo";
import { services } from "../data/services";
import { EMAIL, PHONE, NAV_LINKS, SITE_CONFIG } from "../constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#080B12] text-[#94A3B8] py-16 text-sm border-t border-[rgba(148,163,184,0.12)]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          
          {/* Brand Info */}
          <div className="lg:col-span-4">
            <Logo light />
            <p className="mt-4 text-xs sm:text-sm leading-relaxed text-[#94A3B8] max-w-sm">
              Build. Engage. Grow. Strategic video production, social media
              management, digital advertising, and bespoke web solutions designed
              for businesses that value meaningful results.
            </p>
            <p className="mt-4 text-xs font-semibold tracking-wider text-blue-400 uppercase">
              Strategy · Creativity · Results
            </p>
          </div>

          {/* Quick Navigation */}
          <nav aria-label="Footer Navigation" className="lg:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#F8FAFC]">
              Navigation
            </h3>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    className="text-xs sm:text-sm text-[#94A3B8] transition-colors duration-200 hover:text-blue-400"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services List */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#F8FAFC]">
              Creative Services
            </h3>
            <ul className="mt-4 space-y-2.5">
              {services.map((s) => (
                <li key={s.id}>
                  <a
                    href="#services"
                    className="text-xs sm:text-sm text-[#94A3B8] transition-colors duration-200 hover:text-blue-400"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#F8FAFC]">
              Get in Touch
            </h3>
            <div className="mt-4 space-y-3">
              <div>
                <p className="text-[11px] uppercase tracking-wider text-[#94A3B8]/60">
                  Email
                </p>
                <a
                  href={`mailto:${EMAIL}`}
                  className="text-xs sm:text-sm text-[#F8FAFC] transition-colors duration-200 hover:text-blue-400 hover:underline"
                >
                  {EMAIL}
                </a>
              </div>

              <div>
                <p className="text-[11px] uppercase tracking-wider text-[#94A3B8]/60">
                  Phone &amp; WhatsApp
                </p>
                <a
                  href={`tel:${SITE_CONFIG.phoneClean}`}
                  className="text-xs sm:text-sm text-[#F8FAFC] transition-colors duration-200 hover:text-blue-400 hover:underline"
                >
                  {PHONE}
                </a>
              </div>

              <div className="pt-2">
                <a
                  href="#contact"
                  className="inline-flex items-center rounded-lg border border-blue-500/30 bg-blue-500/10 px-3.5 py-1.5 text-xs font-semibold text-blue-400 transition-colors hover:bg-blue-500/20 hover:border-blue-500/50"
                >
                  Book Consultation →
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="mt-14 pt-8 border-t border-[rgba(148,163,184,0.1)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#94A3B8]/70">
          <p>© {currentYear} Ascend Lab. All rights reserved.</p>
          <p className="flex items-center gap-3">
            <span>Digital Marketing &amp; Creative Agency</span>
            <span>·</span>
            <span>Premium Dark Experience</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
