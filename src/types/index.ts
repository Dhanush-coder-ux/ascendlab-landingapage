export type ServiceId = "video-shooting"|"video-editing"|"social-media"|"ads"|"web-app"|"seo"|"content"|"design";
export interface Service { id: ServiceId; title: string; description: string; icon: string }
export type PortfolioCategory = "Video Production"|"Social Media"|"Graphic Design"|"Web & App Development"|"Advertising";
export type PublishStatus = "published"|"draft";
export interface PortfolioItem { id: string; title: string; client: string; category: PortfolioCategory; cover: string; videoUrl?: string; description: string; link?: string; status?: PublishStatus }
export interface Testimonial { id: string; name: string; company: string; photo?: string; quote: string; project?: string; date?: string; status: PublishStatus }
export interface CustomerMedia { id: string; type: "image"|"video"; url: string; poster?: string; name?: string; company?: string; caption: string; related?: string; status: PublishStatus }
export interface FAQ { q: string; a: string }
