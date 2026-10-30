import { useEffect, useState, type FormEvent } from "react";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { services } from "../data/services";
import { sendEnquiry, type EnquiryPayload, emailConfigured } from "../lib/emailjs";
import { validate } from "../lib/validation";
import { EMAIL, BTN_PRIMARY } from "../constants";

const initialPayload: EnquiryPayload = {
  name: "",
  email: "",
  phone: "",
  company: "",
  service: "",
  budget: "",
  message: "",
};

const inputClass =
  "w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm text-ink transition placeholder:text-mute/60 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20";

interface FieldProps {
  id: string;
  label: string;
  req?: boolean;
  children: React.ReactNode;
  err?: string;
}

function FormField({ id, label, req, children, err }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink">
        {label}
        {req && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
      {err && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-xs font-medium text-red-600">
          {err}
        </p>
      )}
    </div>
  );
}

export default function ContactForm({ service }: { service: string }) {
  const [form, setForm] = useState<EnquiryPayload>(initialPayload);
  const [errors, setErrors] = useState<ReturnType<typeof validate>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    if (service) {
      setForm((prev) => ({ ...prev, service }));
    }
  }, [service]);

  const handleChange =
    (key: keyof EnquiryPayload) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
      if (errors[key]) {
        setErrors((prev) => ({ ...prev, [key]: undefined }));
      }
    };

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === "sending") return;

    const validationErrors = validate(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    try {
      await sendEnquiry(form);
      setStatus("success");
      setForm(initialPayload);
    } catch (err) {
      setStatus("error");
      if (!emailConfigured) {
        setErrorMessage(
          `Email service is currently being configured. Please contact us directly at ${EMAIL}.`
        );
      } else {
        setErrorMessage(
          err instanceof Error
            ? err.message
            : `Failed to send enquiry. Please email us directly at ${EMAIL}.`
        );
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-4 sm:grid-cols-2">
      <FormField id="contact-name" label="Full Name" req err={errors.name}>
        <input
          id="contact-name"
          type="text"
          className={`${inputClass} ${errors.name ? "border-red-400 focus:border-red-500 focus:ring-red-200" : ""}`}
          placeholder="e.g. Sarah Jenkins"
          value={form.name}
          onChange={handleChange("name")}
          autoComplete="name"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
        />
      </FormField>

      <FormField id="contact-email" label="Business Email" req err={errors.email}>
        <input
          id="contact-email"
          type="email"
          className={`${inputClass} ${errors.email ? "border-red-400 focus:border-red-500 focus:ring-red-200" : ""}`}
          placeholder="name@company.com"
          value={form.email}
          onChange={handleChange("email")}
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
        />
      </FormField>

      <FormField id="contact-phone" label="Phone Number">
        <input
          id="contact-phone"
          type="tel"
          className={inputClass}
          placeholder="+91 98765 43210"
          value={form.phone}
          onChange={handleChange("phone")}
          autoComplete="tel"
        />
      </FormField>

      <FormField id="contact-company" label="Brand or Company">
        <input
          id="contact-company"
          type="text"
          className={inputClass}
          placeholder="e.g. Apex Health"
          value={form.company}
          onChange={handleChange("company")}
          autoComplete="organization"
        />
      </FormField>

      <FormField id="contact-service" label="Service Required">
        <select
          id="contact-service"
          className={inputClass}
          value={form.service}
          onChange={handleChange("service")}
        >
          <option value="">Select a service (optional)</option>
          {services.map((s) => (
            <option key={s.id} value={s.title}>
              {s.title}
            </option>
          ))}
        </select>
      </FormField>

      <FormField id="contact-budget" label="Project Budget Range">
        <select
          id="contact-budget"
          className={inputClass}
          value={form.budget}
          onChange={handleChange("budget")}
        >
          <option value="">Select budget range (optional)</option>
          <option value="Under ₹25,000">Under ₹25,000</option>
          <option value="₹25,000 - ₹50,000">₹25,000 - ₹50,000</option>
          <option value="₹50,000 - ₹1,00,000">₹50,000 - ₹1,00,000</option>
          <option value="₹1,00,000+">₹1,00,000+</option>
        </select>
      </FormField>

      <div className="sm:col-span-2">
        <FormField id="contact-message" label="Project Goals & Message" req err={errors.message}>
          <textarea
            id="contact-message"
            rows={4}
            className={`${inputClass} ${errors.message ? "border-red-400 focus:border-red-500 focus:ring-red-200" : ""}`}
            placeholder="Tell us a little about your brand, what you need help with, and your target timeline..."
            value={form.message}
            onChange={handleChange("message")}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "contact-message-error" : undefined}
          />
        </FormField>
      </div>

      <div className="sm:col-span-2 mt-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className={`${BTN_PRIMARY} w-full sm:w-auto inline-flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed`}
        >
          {status === "sending" ? (
            <>
              <Loader2 size={16} className="animate-spin" aria-hidden="true" />
              Sending Enquiry...
            </>
          ) : (
            "Send Enquiry"
          )}
        </button>

        {/* Live Feedback Messages */}
        <div aria-live="polite" className="mt-4">
          {status === "success" && (
            <div className="flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-800">
              <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-green-600" aria-hidden="true" />
              <div>
                <p className="font-semibold">Thank you for reaching out.</p>
                <p className="mt-0.5 text-xs text-green-700">
                  Your enquiry has been received. Our team will review your project details and get in touch shortly.
                </p>
              </div>
            </div>
          )}

          {status === "error" && (
            <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
              <AlertCircle size={18} className="mt-0.5 shrink-0 text-red-600" aria-hidden="true" />
              <div>
                <p className="font-semibold">Unable to send message via form.</p>
                <p className="mt-0.5 text-xs text-red-700">
                  {errorMessage || (
                    <>
                      Please try again or email us directly at{" "}
                      <a href={`mailto:${EMAIL}`} className="underline font-semibold">
                        {EMAIL}
                      </a>.
                    </>
                  )}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
