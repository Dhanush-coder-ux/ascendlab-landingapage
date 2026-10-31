export const SITE_CONFIG = {
  name: "Ascend Lab",
  tagline: "Build. Engage. Grow.",
  description:
    "Ascend Lab helps businesses grow through video production, social media management, digital advertising, SEO, content writing, graphic design, and web development.",
  canonicalUrl: import.meta.env.VITE_SITE_URL || "https://ascendlab.in",
  email: "ascendlabsince2026@gmail.com",
  phone: "+91 9566564462",
  phoneClean: "+919566564462",
} as const;

export const EMAIL = SITE_CONFIG.email;
export const PHONE = SITE_CONFIG.phone;

export const NAV_LINKS = [
  { label: "Home", href: "#home", id: "home" },
  { label: "Services", href: "#services", id: "services" },
  { label: "Our Work", href: "#work", id: "work" },
  { label: "Testimonials", href: "#testimonials", id: "testimonials" },
  { label: "About", href: "#about", id: "about" },
  { label: "Contact", href: "#contact", id: "contact" },
] as const;

export const CATEGORIES = [
  "All Work",
  "Video Production",
  "Social Media",
  "Graphic Design",
  "Web & App Development",
  "Advertising",
] as const;

export const BTN_PRIMARY =
  "inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all duration-200 hover:bg-blue-500 hover:shadow-blue-500/35 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-blue-400 focus-visible:outline-offset-2";

export const BTN_SECONDARY =
  "inline-flex items-center justify-center rounded-lg border border-slate-700/60 bg-slate-900/60 backdrop-blur-xs px-6 py-3 text-sm font-semibold text-slate-200 shadow-sm transition-all duration-200 hover:border-blue-500/50 hover:bg-slate-800/80 hover:text-white active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-blue-400 focus-visible:outline-offset-2";
