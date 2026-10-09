import type { Request, Response } from "express";
import { z } from "zod";

const serviceOptions = [
  "Managed IT & support",
  "Cybersecurity",
  "Cloud & workplace",
  "Network & connectivity",
  "Backup & recovery",
  "IT strategy & projects",
  "Not sure yet",
] as const;

const inquirySchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  company: z.string().trim().max(120).optional().default(""),
  service: z.enum(serviceOptions),
  message: z.string().trim().min(20).max(2500),
  website: z.string().max(200).optional().default(""),
});

type AttemptWindow = { start: number; count: number };
const rateWindows = new Map<string, AttemptWindow>();
const WINDOW_MS = 15 * 60_000;
const MAX_ATTEMPTS = 8;

function allowAttempt(key: string, now = Date.now()) {
  let current = rateWindows.get(key);
  if (!current || now - current.start >= WINDOW_MS) {
    current = { start: now, count: 0 };
    rateWindows.set(key, current);
  }
  current.count += 1;
  if (rateWindows.size > 2_000) {
    for (const [entry, window] of rateWindows) {
      if (now - window.start >= WINDOW_MS) rateWindows.delete(entry);
    }
    if (rateWindows.size > 2_000) rateWindows.delete(rateWindows.keys().next().value as string);
  }
  return current.count <= MAX_ATTEMPTS;
}

export async function handleContactRequest(req: Request, res: Response) {
  const parsed = inquirySchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ success: false, message: "Please check your details and try again. A name, valid email, service choice, and message are required." });
  }

  const inquiry = parsed.data;
  // Quietly reject bot submissions. A success confirmation is reserved for an
  // owner notification the upstream service actually accepts.
  if (inquiry.website.trim()) return res.status(422).json({ success: false, message: "We couldn't process that inquiry. Please review the form and try again." });

  if (!allowAttempt(req.ip || "unknown")) {
    return res.status(429).json({ success: false, message: "Too many attempts from this connection. Please wait a little before trying again." });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !from) {
    return res.status(503).json({ success: false, message: "The inquiry service is not available right now. Your message was not confirmed; please try again later." });
  }

  const title = `New CoreFixIT inquiry · ${inquiry.service}`;
  const content = [
    `Name: ${inquiry.name}`,
    `Email: ${inquiry.email}`,
    inquiry.company ? `Company: ${inquiry.company}` : undefined,
    `Service: ${inquiry.service}`,
    "",
    "Message:",
    inquiry.message,
  ].filter((line): line is string => line !== undefined).join("\n");

  if (title.length > 1200 || content.length > 20_000) {
    return res.status(400).json({ success: false, message: "This inquiry is too long to send. Please shorten the message and try again." });
  }

  try {
    const notification = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: ["mbulelo.it.support@gmail.com"],
        reply_to: inquiry.email,
        subject: title,
        text: content,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    const bodyText = await notification.text();
    let body: { id?: unknown; message?: unknown } | null = null;
    try { body = bodyText ? JSON.parse(bodyText) as { id?: unknown; message?: unknown } : null; } catch { body = null; }

    if (!notification.ok || typeof body?.id !== "string" || !body.id) {
      // Do not log or echo submitted personal information.
      console.warn("CoreFixIT inquiry email was not accepted", { status: notification.status });
      return res.status(502).json({ success: false, message: "We couldn't deliver the inquiry just now. Your message was not confirmed; please retry shortly." });
    }
    return res.status(200).json({ success: true, message: "Thanks — your inquiry has been sent to the CoreFixIT team." });
  } catch {
    return res.status(502).json({ success: false, message: "We couldn't deliver the inquiry just now. Your message was not confirmed; please retry shortly." });
  }
}
