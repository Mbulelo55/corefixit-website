import { Fingerprint, Mail, Phone, ShieldCheck } from "lucide-react";
import { ContactForm } from "@/components/site/ContactForm";
import { contactDetails } from "@/data/site";
import { PageHero } from "@/components/site/PageHero";
import { PageMeta } from "@/components/site/PageMeta";
import { Reveal } from "@/components/site/Reveal";

export default function Contact() {
  return (
    <>
      <PageMeta title="Contact CoreFixIT | Start a conversation" description="Send CoreFixIT a non-emergency consultation inquiry and understand what happens after the form is accepted." />
      <PageHero eyebrow="CONTACT COREFIXIT" index="05" title={<>Let’s find your<br /><span className="title-accent">way forward.</span></>} description="Tell us what you’re trying to do—or what’s getting in your way. Start with a little context and a real person can pick up the conversation." />
      <section className="contact-section section-pad">
        <div className="wrap contact-layout">
          <Reveal className="contact-intro">
            <span className="eyebrow eyebrow--light"><span className="eyebrow__line" /> Start a conversation</span>
            <h2>One clear<br /><span className="title-accent">next step.</span></h2>
            <p>Share the outcome you are looking for or the problem you are trying to solve. You do not need to know which service fits before you reach out.</p>
            <div className="contact-direct" aria-label="Direct contact details">
              <a className="contact-direct__item" href={`mailto:${contactDetails.email}`}>
                <Mail size={17} aria-hidden="true" />
                <span><span className="contact-direct__label">Email</span><strong className="contact-direct__value">{contactDetails.email}</strong></span>
              </a>
              <a className="contact-direct__item" href={`tel:${contactDetails.phone}`}>
                <Phone size={17} aria-hidden="true" />
                <span><span className="contact-direct__label">Phone</span><strong className="contact-direct__value">{contactDetails.phone}</strong></span>
              </a>
            </div>
            <div className="contact-expectation"><span className="contact-pulse" /><div><strong>What happens next</strong><p>Your inquiry routes to the CoreFixIT site operator for review and follow-up. This consultation form is not an emergency or incident-response channel.</p></div></div>
            <div className="contact-meta"><span><Fingerprint size={17} aria-hidden="true" /> People-first, always</span><span><ShieldCheck size={17} aria-hidden="true" /> Never send passwords here</span></div>
          </Reveal>
          <Reveal className="contact-card" delay={0.08}><div className="contact-card__head"><span className="eyebrow">YOUR MESSAGE</span><span className="contact-card__mark">CF<span>.</span></span></div><ContactForm /></Reveal>
        </div>
        <div className="contact-glow" aria-hidden="true" />
      </section>
    </>
  );
}
