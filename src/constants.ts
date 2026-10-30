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
  "inline-flex items-center justify-center rounded-md bg-brand px-6 py-3 text-sm font-semibold text-white shadow-xs transition duration-200 hover:bg-[#1d4a90] active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2";

export const BTN_SECONDARY =
  "inline-flex items-center justify-center rounded-md border border-line bg-white px-6 py-3 text-sm font-semibold text-ink shadow-xs transition duration-200 hover:border-brand hover:text-brand hover:bg-pale active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2";
