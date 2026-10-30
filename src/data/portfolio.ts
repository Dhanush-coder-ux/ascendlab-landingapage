import type { PortfolioItem } from "../types";

/**
 * Ascend Lab Portfolio Data
 * Projects are presented as sample agency showcase projects.
 * Add new entries, update status to "published" or "draft".
 */
export const portfolio: PortfolioItem[] = [
  {
    id: "brand-film",
    title: "Cinematic Brand Story & Visual Direction",
    client: "Ascend Production Studio (Showcase)",
    category: "Video Production",
    cover: "/portfolio/brand-film.jpg",
    description:
      "A showcase of high-end camera direction, lighting control, and narrative pacing designed to introduce brand stories with visual depth and emotional resonance.",
    status: "published",
  },
  {
    id: "social-growth",
    title: "Lifestyle Aesthetic & Social Content Suite",
    client: "Creative Studio Concept (Showcase)",
    category: "Social Media",
    cover: "/portfolio/social-growth.jpg",
    description:
      "Curated multi-format social content strategy, vertical video direction, and visual guidelines created for lifestyle and retail brands.",
    status: "published",
  },
  {
    id: "visual-identity",
    title: "AURA Minimalist Brand Identity System",
    client: "Design Exploration (Showcase)",
    category: "Graphic Design",
    cover: "/portfolio/visual-identity.jpg",
    description:
      "Comprehensive visual identity kit including logo architecture, typography hierarchy, blind-embossed stationery, and sustainable packaging design.",
    status: "published",
  },
  {
    id: "web-platform",
    title: "Modern SaaS & Responsive Web Experience",
    client: "Digital Product Concept (Showcase)",
    category: "Web & App Development",
    cover: "/portfolio/web-platform.jpg",
    description:
      "Responsive web application interface engineered with performance-focused architecture, intuitive navigation, and clean typography.",
    status: "published",
  },
  {
    id: "performance-ads",
    title: "Multi-Channel Digital Advertising Campaign",
    client: "Performance Marketing Lab (Showcase)",
    category: "Advertising",
    cover: "/portfolio/performance-ads.jpg",
    description:
      "Creative ad concepts, audience persona targeting strategies, and high-conversion visual creatives developed for Meta and Google Ads.",
    status: "published",
  },
  {
    id: "commercial-production",
    title: "Commercial Color Grading & Post-Production",
    client: "Post-Production Suite (Showcase)",
    category: "Video Production",
    cover: "/portfolio/commercial-production.jpg",
    description:
      "Advanced post-production color science, audio mixing, captioning, and multi-aspect ratio delivery for broadcast and digital channels.",
    status: "published",
  },
];
