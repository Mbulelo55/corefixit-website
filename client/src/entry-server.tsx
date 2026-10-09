import { renderToPipeableStream } from "react-dom/server";
import { Writable } from "node:stream";
import { Router } from "wouter";
import { AppProviders } from "./Providers";
import App from "./App";
import { services } from "./data/site";

export type PageMetadata = { title: string; description: string; status: number; noindex?: boolean };

const notFoundPage: PageMetadata = {
  title: "Page not found | CoreFixIT",
  description: "The page you requested could not be found. Return to CoreFixIT and explore IT support, cybersecurity, cloud, network and recovery services.",
  status: 404,
  noindex: true,
};

const serviceNotFoundPage: PageMetadata = {
  title: "Service not found | CoreFixIT",
  description: "The requested CoreFixIT service could not be found. Browse the full list of IT services.",
  status: 404,
  noindex: true,
};

const routeMetadata: Record<string, PageMetadata> = {
  "/about": {
    title: "About CoreFixIT | People-first IT",
    description: "Meet CoreFixIT’s people-first approach, values, four-step service process and practical view of technology outcomes.",
    status: 200,
  },
  "/services": {
    title: "IT Services | CoreFixIT",
    description: "Explore six CoreFixIT IT service areas: managed support, cybersecurity, cloud, connectivity, backup and strategy.",
    status: 200,
  },
  "/faq": {
    title: "FAQ | CoreFixIT",
    description: "Answers about CoreFixIT’s services, consultations, scope, and the purpose of the public inquiry form.",
    status: 200,
  },
  "/contact": {
    title: "Contact CoreFixIT | Start a conversation",
    description: "Send CoreFixIT a non-emergency consultation inquiry and understand what happens after the form is accepted.",
    status: 200,
  },
};

export function getPageMetadata(url: string): PageMetadata {
  let pathname: string;
  try {
    pathname = decodeURIComponent(new URL(url, "http://corefixit.invalid").pathname).replace(/\/+$/, "") || "/";
  } catch {
    return notFoundPage;
  }

  if (pathname === "/") {
    return {
      title: "CoreFixIT | IT that moves your business forward",
      description: "Practical IT support, cybersecurity, cloud, network and recovery services. Meet CoreFixIT and choose a clear next step.",
      status: 200,
    };
  }
  if (routeMetadata[pathname]) return routeMetadata[pathname];
  if (pathname === "/privacy") {
    return { title: "Privacy policy draft | CoreFixIT", description: "Review the CoreFixIT privacy-policy starter draft and its contact form data practices before publication.", status: 200 };
  }
  if (pathname === "/terms") {
    return { title: "Terms of use draft | CoreFixIT", description: "Review the CoreFixIT terms-of-use starter draft. Organization-specific terms remain to be confirmed before publication.", status: 200 };
  }

  const serviceMatch = pathname.match(/^\/services\/([^/]+)$/);
  if (serviceMatch) {
    const service = services.find((item) => item.slug === serviceMatch[1]);
    if (!service) return serviceNotFoundPage;
    return {
      title: `${service.name} | CoreFixIT IT services`,
      description: service.detail,
      status: 200,
    };
  }
  return notFoundPage;
}

function renderMarkup(pathname: string) {
  return new Promise<string>((resolve, reject) => {
    let markup = "";
    let didSettle = false;
    let stream: ReturnType<typeof renderToPipeableStream>;
    const finish = (error?: unknown) => {
      if (didSettle) return;
      didSettle = true;
      if (error) reject(error);
      else resolve(markup);
    };

    stream = renderToPipeableStream(
      <Router ssrPath={pathname}><AppProviders><App /></AppProviders></Router>,
      {
        onAllReady() {
          const sink = new Writable({
            write(chunk, _encoding, callback) {
              markup += chunk.toString();
              callback();
            },
          });
          sink.on("error", finish);
          sink.on("finish", () => finish());
          stream.pipe(sink);
        },
        onShellError(error) { finish(error); },
        onError(error) { console.error("CoreFixIT server rendering error", error instanceof Error ? error.message : "unknown rendering failure"); },
      }
    );
  });
}

export async function renderPage(url: string) {
  const meta = getPageMetadata(url);
  const pathname = (() => {
    try { return decodeURIComponent(new URL(url, "http://corefixit.invalid").pathname).replace(/\/+$/, "") || "/"; }
    catch { return "/__not-found__"; }
  })();
  const markup = await renderMarkup(pathname);
  return { markup, meta };
}
