import { ArrowRight, CheckCircle2, LoaderCircle, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { services } from "@/data/site";

type FormField = "name" | "email" | "company" | "service" | "message";
type Feedback = { kind: "success" | "error"; message: string } | null;

function validateField(field: FormField, value: string) {
  const clean = value.trim();
  if (field === "name" && clean.length < 2) return "Please add your name (at least 2 characters).";
  if (field === "name" && clean.length > 120) return "Please keep your name under 120 characters.";
  if (field === "email" && clean.length > 254) return "Please keep your email under 255 characters.";
  if (field === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean)) return "Enter a valid email address so we can follow up.";
  if (field === "company" && clean.length > 120) return "Please keep your company name under 120 characters.";
  if (field === "service" && !clean) return "Choose a service, or select “Not sure yet”.";
  if (field === "message" && clean.length < 20) return "A little more context helps us send your note to the right person (20 characters minimum).";
  if (field === "message" && clean.length > 2500) return "Please keep your message under 2,500 characters.";
  return "";
}

export function ContactForm() {
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [errors, setErrors] = useState<Partial<Record<FormField, string>>>({});

  function checkField(field: FormField, value: string) {
    const message = validateField(field, value);
    setErrors((current) => ({ ...current, [field]: message }));
    return message;
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFeedback(null);
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = Object.fromEntries(data.entries());
    const nextErrors: Partial<Record<FormField, string>> = {};
    (['name', 'email', 'company', 'service', 'message'] as const).forEach((field) => {
      const error = validateField(field, String(payload[field] ?? ""));
      if (error) nextErrors[field] = error;
    });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setFeedback({ kind: "error", message: "Please check the highlighted fields before sending." });
      document.getElementById(Object.keys(nextErrors)[0])?.focus();
      return;
    }

    setBusy(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { success?: boolean; message?: string };
      if (!response.ok || !result.success) throw new Error(result.message || "We couldn't send that inquiry just now. Please try again shortly.");
      form.reset();
      setErrors({});
      setFeedback({ kind: "success", message: result.message || "Thanks — your inquiry has been sent to the CoreFixIT team." });
    } catch (error) {
      setFeedback({ kind: "error", message: error instanceof Error ? error.message : "We couldn't send that inquiry just now. Please try again shortly." });
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="contact-form manus-no-record" onSubmit={submit} noValidate aria-busy={busy}>
      <div className="form-row">
        <div className="field-group">
          <label htmlFor="name">Your name <span aria-hidden="true">*</span></label>
          <input id="name" name="name" autoComplete="name" required maxLength={120} placeholder="What should we call you?" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} onBlur={(event) => checkField("name", event.currentTarget.value)} />
          {errors.name && <span className="field-error" id="name-error">{errors.name}</span>}
        </div>
        <div className="field-group">
          <label htmlFor="email">Work email <span aria-hidden="true">*</span></label>
          <input id="email" name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@company.com" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} onBlur={(event) => checkField("email", event.currentTarget.value)} />
          {errors.email && <span className="field-error" id="email-error">{errors.email}</span>}
        </div>
      </div>
      <div className="form-row">
        <div className="field-group">
          <label htmlFor="company">Company <span className="label-optional">Optional</span></label>
          <input id="company" name="company" autoComplete="organization" maxLength={120} aria-invalid={Boolean(errors.company)} aria-describedby={errors.company ? "company-error" : undefined} onBlur={(event) => checkField("company", event.currentTarget.value)} placeholder="Your organization" />
          {errors.company && <span className="field-error" id="company-error">{errors.company}</span>}
        </div>
        <div className="field-group">
          <label htmlFor="service">What are you thinking about? <span aria-hidden="true">*</span></label>
          <select id="service" name="service" required defaultValue="" aria-invalid={Boolean(errors.service)} aria-describedby={errors.service ? "service-error" : undefined} onBlur={(event) => checkField("service", event.currentTarget.value)}>
            <option value="" disabled>Select an area</option>
            {services.map((service) => <option key={service.slug} value={service.name}>{service.name}</option>)}
            <option value="Not sure yet">Not sure yet</option>
          </select>
          {errors.service && <span className="field-error" id="service-error">{errors.service}</span>}
        </div>
      </div>
      <div className="field-group">
        <label htmlFor="message">A little context <span aria-hidden="true">*</span></label>
        <textarea id="message" name="message" rows={4} required minLength={20} maxLength={2500} placeholder="What feels stuck, or what would you like technology to make possible?" aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "message-error" : "message-hint"} onBlur={(event) => checkField("message", event.currentTarget.value)} />
        {errors.message ? <span className="field-error" id="message-error">{errors.message}</span> : <span className="field-hint" id="message-hint">20–2,500 characters · please don’t include passwords or sensitive credentials.</span>}
      </div>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="form-bottom">
        <button className="button button--submit" type="submit" disabled={busy}>
          {busy ? <>Sending inquiry <LoaderCircle size={17} className="spin" aria-hidden="true" /></> : <>Send an inquiry <Send size={16} aria-hidden="true" /> </>}
        </button>
        <span className="form-expectation"><CheckCircle2 size={15} aria-hidden="true" /> Routed to CoreFixIT for a human follow-up</span>
      </div>
      {feedback && (
        <div className={`form-feedback form-feedback--${feedback.kind}`} role={feedback.kind === "error" ? "alert" : "status"} aria-live="polite">
          {feedback.kind === "success" && <CheckCircle2 size={19} aria-hidden="true" />}
          <p>{feedback.message}</p>
          {feedback.kind === "success" && <ArrowRight size={17} aria-hidden="true" />}
        </div>
      )}
      <p className="form-privacy">By sending this inquiry, you agree that its details may be shared with the CoreFixIT site operator so they can respond. See the <a href="/privacy">privacy draft</a>.</p>
    </form>
  );
}
