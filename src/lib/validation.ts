import type { EnquiryPayload } from "./emailjs";
export function validate(v: EnquiryPayload) {
  const e: Partial<Record<keyof EnquiryPayload, string>> = {};
  if (!v.name.trim()) e.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = "Please enter a valid email.";
  if (v.message.trim().length < 10) e.message = "Please tell us a little more (10+ characters).";
  return e
}
