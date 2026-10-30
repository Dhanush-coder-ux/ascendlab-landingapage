import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import { NAV_LINKS, BTN_PRIMARY } from "../constants";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 16);

      // Determine active section based on scroll position
      const scrollPos = window.scrollY + 120;
      for (let i = NAV_LINKS.length - 1; i >= 0; i--) {
        const section = document.getElementById(NAV_LINKS[i].id);
        if (section) {
          const top = section.offsetTop;
          if (scrollPos >= top) {
            setActiveSection(NAV_LINKS[i].id);
            break;
          }
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        scrolled || open
          ? "border-b border-line bg-white/95 backdrop-blur shadow-xs"
          : "border-b border-transparent bg-white/80 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex h-16 sm:h-20 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />

        {/* Desktop Navigation Links */}
        <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-8">
          <ul className="flex items-center gap-7">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <li key={link.id}>
                  <a
                    href={link.href}
                    className={`relative text-sm font-medium transition duration-150 py-1 ${
                      isActive
                        ? "text-brand font-semibold"
                        : "text-mute hover:text-ink"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand rounded-full"
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="#contact"
            className={`${BTN_PRIMARY} text-sm py-2.5 px-5`}
          >
            Let's Talk
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          className="rounded-md p-2 text-ink hover:bg-soft focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2 lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {open && (
        <div
          id="mobile-navigation"
          className="border-b border-line bg-white px-4 pb-6 pt-2 shadow-md lg:hidden"
        >
          <ul className="space-y-1">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <li key={link.id}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`block rounded-md px-3 py-2.5 text-base font-medium transition ${
                      isActive
                        ? "bg-soft text-brand font-semibold"
                        : "text-ink hover:bg-pale hover:text-brand"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="mt-4 pt-4 border-t border-line">
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className={`${BTN_PRIMARY} w-full text-center`}
            >
              Let's Talk
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
