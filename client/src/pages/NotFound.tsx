import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import { PageMeta } from "@/components/site/PageMeta";
import { SiteLayout } from "@/components/site/SiteLayout";

export default function NotFound() {
  return <SiteLayout><PageMeta title="Page not found | CoreFixIT" description="The page you requested could not be found. Return to CoreFixIT and explore its IT services." noindex /><section className="not-found section-pad"><div className="wrap"><span className="eyebrow"><span className="eyebrow__line" /> ROUTE / NOT FOUND</span><h1>This page lost<br />its connection.</h1><p>The link may have moved. Let’s get you back to a useful starting point.</p><div className="not-found__actions"><Link className="button button--primary" href="/"><ArrowLeft size={16} aria-hidden="true" /> CoreFixIT home</Link><Link className="text-link" href="/services">Explore services <ArrowUpRight size={16} aria-hidden="true" /></Link></div></div></section></SiteLayout>;
}
