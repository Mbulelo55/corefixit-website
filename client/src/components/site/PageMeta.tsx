import { useEffect } from "react";

type PageMetaProps = { title: string; description: string; noindex?: boolean };

function upsertMeta(selector: string, attribute: "name" | "property", key: string, content: string) {
  let element = document.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.append(element);
  }
  element.content = content;
}

export function PageMeta({ title, description, noindex = false }: PageMetaProps) {
  useEffect(() => {
    document.title = title;
    upsertMeta('meta[name="description"]', "name", "description", description);
    upsertMeta('meta[property="og:title"]', "property", "og:title", title);
    upsertMeta('meta[property="og:description"]', "property", "og:description", description);
    upsertMeta('meta[name="twitter:title"]', "name", "twitter:title", title);
    upsertMeta('meta[name="twitter:description"]', "name", "twitter:description", description);
    if (noindex) upsertMeta('meta[name="robots"]', "name", "robots", "noindex,follow");
    else document.querySelector('meta[name="robots"]')?.remove();
  }, [title, description, noindex]);
  return null;
}
