import { useEffect, useState, useRef } from "react";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import { NAV_LINKS, BTN_PRIMARY } from "../constants";
import { gsap } from "../animations/gsapConfig";
import { isReducedMotion } from "../animations/animationPresets";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");

  const headerRef = useRef<HTMLElement>(null);
  const linksRef = useRef<HTMLUListElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // GSAP Initial Page Load Entrance
  useEffect(() => {
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        headerRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9 }
      )
        .fromTo(
          linksRef.current?.children ? Array.from(linksRef.current.children) : [],
          { opacity: 0, y: -12 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.07, ease: "power2.out" },
          "-=0.4"
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.5)" },
          "-=0.3"
        );
    });

    return () => ctx.revert();
  }, []);

  // Track active section and scroll state
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const scrollPos = window.scrollY + 140;
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

  // Animate mobile menu when opened / closed
  useEffect(() => {
    if (!mobileMenuRef.current) return;

    if (open) {
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0, y: -16 },
        { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" }
      );
      const items = mobileMenuRef.current.querySelectorAll(".mobile-nav-item");
      gsap.fromTo(
        items,
        { opacity: 0, x: -10 },
        { opacity: 1, x: 0, duration: 0.25, stagger: 0.05, ease: "power2.out" }
      );
    }
  }, [open]);

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
      ref={headerRef}
      className={`fixed top-0 inset-x-0 z-50 w-full transition-all duration-300 ${
        scrolled || open
          ? "border-b border-[rgba(148,163,184,0.12)] bg-[#080B12]/85 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.6)]"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-18 sm:h-20 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Left: Brand Logo */}
        <div className="flex-shrink-0">
          <Logo />
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav aria-label="Main Navigation" className="hidden lg:flex items-center">
          <ul ref={linksRef} className="flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <li key={link.id} className="relative">
                  <a
                    href={link.href}
                    className={`group relative text-sm font-medium transition-colors duration-200 py-1.5 px-1 ${
                      isActive ? "text-[#F8FAFC] font-semibold" : "text-[#94A3B8] hover:text-[#F8FAFC]"
                    }`}
                  >
                    {link.label}

                    {/* Active Underline Pill with Glow */}
                    {isActive ? (
                      <span
                        aria-hidden="true"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 to-blue-400 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.7)]"
                      />
                    ) : (
                      /* Hover Animated Underline */
                      <span
                        aria-hidden="true"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-500/50 scale-x-0 rounded-full transition-transform duration-200 origin-left group-hover:scale-x-100"
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right: Desktop CTA Button */}
        <div ref={ctaRef} className="hidden lg:flex items-center gap-4">
          <a
            href="#contact"
            className={`${BTN_PRIMARY} text-sm py-2.5 px-5`}
          >
            Let's Talk
          </a>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          type="button"
          className="rounded-lg p-2 text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#111827] border border-[rgba(148,163,184,0.15)] focus-visible:outline-2 focus-visible:outline-blue-500 lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Animated Dropdown Menu */}
      {open && (
        <div
          ref={mobileMenuRef}
          id="mobile-navigation"
          className="border-b border-[rgba(148,163,184,0.15)] bg-[#080B12]/95 backdrop-blur-xl px-5 pb-6 pt-3 shadow-2xl lg:hidden"
        >
          <ul className="space-y-1">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <li key={link.id} className="mobile-nav-item">
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`block rounded-lg px-3.5 py-2.5 text-base font-medium transition-all ${
                      isActive
                        ? "bg-blue-600/15 border border-blue-500/30 text-blue-400 font-semibold"
                        : "text-[#94A3B8] hover:bg-[#111827] hover:text-[#F8FAFC]"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="mt-5 pt-4 border-t border-[rgba(148,163,184,0.12)]">
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className={`${BTN_PRIMARY} w-full text-center py-3`}
            >
              Let's Talk
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
