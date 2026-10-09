import { ArrowUpRight } from "lucide-react";
import { FAQ } from "@/components/site/FAQ";
import { PageHero } from "@/components/site/PageHero";
import { PageMeta } from "@/components/site/PageMeta";

export default function FAQPage() {
  return (
    <>
      <PageMeta title="FAQ | CoreFixIT" description="Answers about CoreFixIT's services, consultations, scope, and the purpose of the public inquiry form." />
      <PageHero eyebrow="FREQUENTLY ASKED QUESTIONS" index="04" title={<>Good questions<br />make a <span className="title-accent">good start.</span></>} description="A few useful answers about services, consultations, and the next steps. No jargon required." />
      <FAQ />
      <section className="faq-next section-pad"><div className="wrap faq-next__inner"><div><span className="eyebrow"><span className="eyebrow__line" /> Still wondering?</span><h2>Tell us what’s on<br />your <span className="serif-italic">mind.</span></h2></div><a className="button button--primary" href="/contact">Go to Contact <ArrowUpRight size={16} aria-hidden="true" /></a></div></section>
    </>
  );
}
