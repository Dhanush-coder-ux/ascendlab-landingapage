import Logo from "./Logo";
import { services } from "../data/services";
import { EMAIL, PHONE, NAV_LINKS, SITE_CONFIG } from "../constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white/80 py-16 text-sm border-t border-white/10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          
          {/* Brand Info */}
          <div className="lg:col-span-4">
            <Logo light />
            <p className="mt-4 text-xs sm:text-sm leading-relaxed text-white/70 max-w-sm">
              Build. Engage. Grow. Strategic video production, social media
              management, digital advertising, and bespoke web solutions designed
              for businesses that value meaningful results.
            </p>
            <p className="mt-4 text-xs text-white/50">
              Strategy · Creativity · Results
            </p>
          </div>

          {/* Quick Navigation */}
          <nav aria-label="Footer Navigation" className="lg:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
              Navigation
            </h3>
            <ul className="mt-4 space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    className="text-xs sm:text-sm text-white/70 transition hover:text-white hover:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services List */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
              Creative Services
            </h3>
            <ul className="mt-4 space-y-2">
              {services.map((s) => (
                <li key={s.id}>
                  <a
                    href="#services"
                    className="text-xs sm:text-sm text-white/70 transition hover:text-white hover:underline"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
              Get in Touch
            </h3>
            <div className="mt-4 space-y-3">
              <div>
                <p className="text-[11px] uppercase tracking-wider text-white/50">
                  Email
                </p>
                <a
                  href={`mailto:${EMAIL}`}
                  className="text-xs sm:text-sm text-white/80 transition hover:text-white hover:underline"
                >
                  {EMAIL}
                </a>
              </div>

              <div>
                <p className="text-[11px] uppercase tracking-wider text-white/50">
                  Phone &amp; WhatsApp
                </p>
                <a
                  href={`tel:${SITE_CONFIG.phoneClean}`}
                  className="text-xs sm:text-sm text-white/80 transition hover:text-white hover:underline"
                >
                  {PHONE}
                </a>
              </div>

              <div className="pt-2">
                <a
                  href="#contact"
                  className="inline-flex items-center rounded-md border border-white/20 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-white/10 hover:border-white/40"
                >
                  Book Consultation →
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>© {currentYear} Ascend Lab. All rights reserved.</p>
          <p className="flex items-center gap-4">
            <span>Digital Marketing &amp; Creative Agency</span>
            <span>·</span>
            <span>Based in India</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
