import type { Request, Response } from "express";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { handleContactRequest } from "./contact";

type MockResponse = Response & { statusCode: number; payload?: unknown };

function makeResponse() {
  const result = { statusCode: 200, payload: undefined as unknown };
  const response = {
    status(code: number) { result.statusCode = code; return response; },
    json(payload: unknown) { result.payload = payload; return response; },
  } as unknown as MockResponse;
  Object.assign(response, result);
  Object.defineProperty(response, "statusCode", { get: () => result.statusCode });
  Object.defineProperty(response, "payload", { get: () => result.payload });
  return response;
}

const validInquiry = {
  name: "Taylor Client",
  email: "taylor@example.org",
  company: "North Star Studio",
  service: "Cybersecurity",
  message: "We would like to review our endpoint and account security setup.",
  website: "",
};

describe("CoreFixIT contact handler", () => {
  beforeEach(() => {
    vi.stubEnv("RESEND_API_KEY", "test-server-key");
    vi.stubEnv("CONTACT_FROM_EMAIL", "CoreFixIT <website@mail.corefixit.co.za>");
  });
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("rejects malformed input without an upstream call", async () => {
    const fetchStub = vi.fn();
    vi.stubGlobal("fetch", fetchStub);
    const response = makeResponse();

    await handleContactRequest({ body: {}, ip: "invalid-test" } as Request, response);

    expect(response.statusCode).toBe(400);
    expect(fetchStub).not.toHaveBeenCalled();
  });

  it("sends a validated inquiry to the project owner and acknowledges acceptance", async () => {
    const fetchStub = vi.fn().mockResolvedValue(new Response(JSON.stringify({ id: "email-test-id" }), { status: 200 }));
    vi.stubGlobal("fetch", fetchStub);
    const response = makeResponse();

    await handleContactRequest({ body: validInquiry, ip: "accepted-test" } as Request, response);

    expect(fetchStub).toHaveBeenCalledOnce();
    const [url, options] = fetchStub.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("https://api.resend.com/emails");
    expect(options.method).toBe("POST");
    expect((options.headers as Record<string, string>).Authorization).toBe("Bearer test-server-key");
    const notice = JSON.parse(String(options.body)) as { from: string; to: string[]; reply_to: string; subject: string; text: string };
    expect(notice.from).toBe("CoreFixIT <website@mail.corefixit.co.za>");
    expect(notice.to).toEqual(["mbulelo.it.support@gmail.com"]);
    expect(notice.reply_to).toBe("taylor@example.org");
    expect(notice.subject).toContain("Cybersecurity");
    expect(notice.text).toContain("taylor@example.org");
    expect(response.statusCode).toBe(200);
    expect(response.payload).toMatchObject({ success: true });
  });

  it("does not notify the owner for a filled honeypot", async () => {
    const fetchStub = vi.fn();
    vi.stubGlobal("fetch", fetchStub);
    const response = makeResponse();

    await handleContactRequest({ body: { ...validInquiry, website: "bot-filled-this" }, ip: "bot-test" } as Request, response);

    expect(fetchStub).not.toHaveBeenCalled();
    expect(response.statusCode).toBe(422);
    expect(response.payload).toMatchObject({ success: false });
  });

  it("does not report success when the notification API returns an error", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify({ message: "rejected" }), { status: 403 })));
    const response = makeResponse();

    await handleContactRequest({ body: validInquiry, ip: "rejected-test" } as Request, response);

    expect(response.statusCode).toBe(502);
    expect(response.payload).toMatchObject({ success: false });
  });
});
