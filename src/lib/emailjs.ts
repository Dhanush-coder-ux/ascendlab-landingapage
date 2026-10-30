import emailjs from "@emailjs/browser";
export interface EnquiryPayload { name: string; email: string; phone: string; company: string; service: string; budget: string; message: string }
const env = import.meta.env;
export const emailConfigured = Boolean(env.VITE_EMAILJS_SERVICE_ID && env.VITE_EMAILJS_TEMPLATE_ID && env.VITE_EMAILJS_PUBLIC_KEY);
export async function sendEnquiry(p: EnquiryPayload) {
  if (!emailConfigured) throw new Error("Email is not configured yet.");
  await emailjs.send(env.VITE_EMAILJS_SERVICE_ID, env.VITE_EMAILJS_TEMPLATE_ID, { ...p }, { publicKey: env.VITE_EMAILJS_PUBLIC_KEY });
}
