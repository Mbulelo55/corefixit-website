import { ArrowRight, ArrowUpRight, AudioWaveform, Compass, Layers3, Sparkles, Target, Workflow } from "lucide-react";
import { PageMeta } from "@/components/site/PageMeta";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { processSteps, technologyNames } from "@/data/site";

export default function About() {
  return (
    <>
      <PageMeta title="About CoreFixIT | People-first IT" description="Meet CoreFixIT’s people-first approach, values, four-step service process and practical view of technology outcomes." />
      <PageHero eyebrow="ABOUT COREFIXIT" index="02" title={<>Technology should<br />create <span className="title-accent">momentum.</span></>} description="We bring the big picture and practical details together, so the systems behind your work make a little more sense." />

      <section className="about-section section-pad">
        <div className="wrap about-layout">
          <Reveal className="about-left">
            <span className="eyebrow eyebrow--light"><span className="eyebrow__line" /> The CoreFixIT point of view</span>
            <h2>We fix the friction<br />between people<br />and <span className="title-accent">technology.</span></h2>
            <p className="about-lead">Good IT starts by listening. CoreFixIT is built around understanding how people work, explaining choices clearly, and making change useful—not simply new.</p>
            <a className="button button--outline-light" href="/services">Explore our services <ArrowUpRight size={16} aria-hidden="true" /></a>
          </Reveal>
          <Reveal className="about-right" delay={0.1}>
            <span className="about-mark" aria-hidden="true"><Compass size={29} strokeWidth={1.3} /><span>CF / IT</span></span>
            <p className="about-statement">Good technology should create <span>momentum.</span><br />Not another thing to manage.</p>
            <div className="about-divider" />
            <div className="about-values">
              <div><span>01</span><strong>See the whole picture.</strong><p>People, platforms, and priorities belong in the same conversation.</p></div>
              <div><span>02</span><strong>Keep it human.</strong><p>Clear language, considered recommendations, and decisions you can own.</p></div>
              <div><span>03</span><strong>Make change useful.</strong><p>Choose the next step because it helps—not just because it is new.</p></div>
            </div>
          </Reveal>
        </div>
        <div className="about-backdrop" aria-hidden="true">CORE / FIX / IT</div>
      </section>

      <section className="process-section section-pad" id="approach">
        <div className="wrap">
          <Reveal className="section-heading section-heading--split">
            <div><span className="eyebrow"><span className="eyebrow__line" /> The way forward</span><h2>Four steps.<br /><span className="serif-italic">One clear view.</span></h2></div>
            <div className="section-heading__aside"><p>No mystery hand-offs. We map the work, move in sensible stages, and keep you in the loop.</p><span className="process-tag"><Workflow size={15} aria-hidden="true" /> A simple, connected process</span></div>
          </Reveal>
          <div className="process-rail">
            {processSteps.map((step, index) => (
              <Reveal className="process-step" key={step.number} delay={index * 0.08}>
                <span className="process-step__number">{step.number}<span className="process-step__arrow">{index < processSteps.length - 1 ? <ArrowRight size={15} aria-hidden="true" /> : <Sparkles size={14} aria-hidden="true" />}</span></span>
                <h3>{step.title}</h3><p>{step.description}</p>
              </Reveal>
            ))}
          </div>
          <div className="process-footer"><span>FROM THE FIRST QUESTION TO WHAT COMES NEXT</span><span className="process-footer__line" /></div>
        </div>
      </section>

      <section className="outcomes-section section-pad">
        <div className="wrap outcomes-layout">
          <Reveal className="outcomes-copy"><span className="eyebrow eyebrow--light"><span className="eyebrow__line" /> Better by design</span><h2>Useful IT is<br />felt in the<br /><span className="title-accent">workday.</span></h2><p>We do not borrow performance benchmarks. Agree what matters in your environment, then review it together—from clearer ownership to reliability and user experience.</p><a className="button button--primary" href="/contact">Discuss what matters <ArrowUpRight size={17} aria-hidden="true" /></a></Reveal>
          <Reveal className="outcomes-panel" delay={0.1}>
            <div className="outcome-card outcome-card--large"><div className="outcome-icon"><Layers3 size={20} aria-hidden="true" /></div><span className="outcome-kicker">THE WHOLE PICTURE</span><strong>360°</strong><p>A connected view of people, systems, and what you need next.</p></div>
            <div className="outcome-card outcome-card--small"><Target size={19} aria-hidden="true" /><span className="outcome-kicker">YOUR BUSINESS FIRST</span><p>Priorities built around your goals—not a one-size-fits-all checklist.</p></div>
            <div className="outcome-card outcome-card--wide"><AudioWaveform size={19} aria-hidden="true" /><div><span className="outcome-kicker">MEASURE WHAT MATTERS</span><p>Set service measures together; targets should fit your environment, not borrowed benchmarks.</p></div></div>
            <div className="outcome-orbit" aria-hidden="true" />
          </Reveal>
        </div>
      </section>

      <section className="proof-section section-pad">
        <div className="wrap proof-layout">
          <Reveal><span className="eyebrow"><span className="eyebrow__line" /> A flexible ecosystem</span><h2>Built for the tools<br />you <span className="serif-italic">already use.</span></h2><p className="proof-intro">Technology names shown are examples of platforms in the IT landscape—not a verified partnership or endorsement. The right fit depends on your environment.</p><div className="tech-list">{technologyNames.map((name, index) => <span className="tech-chip" key={name}><span>0{index + 1}</span>{name}</span>)}</div></Reveal>
          <Reveal className="story-card" delay={0.08}><span className="story-card__symbol">“</span><span className="eyebrow">CLIENT STORY / SLOT</span><blockquote>Add a real CoreFixIT client story here—with the client’s permission.</blockquote><div className="story-card__rule" /><span className="story-card__credit">Editable content placeholder <span>↗</span></span><p>Replace this prompt with an approved quotation and attribution before publishing. No testimonial or measured result has been invented.</p></Reveal>
        </div>
      </section>

      <section className="about-next section-pad"><div className="wrap about-next__inner"><Reveal><span className="eyebrow"><span className="eyebrow__line" /> Keep exploring</span><h2>Ready to make a<br /><span className="serif-italic">clearer next move?</span></h2></Reveal><Reveal className="about-next__actions" delay={0.08}><a className="button button--primary" href="/contact">Talk to CoreFixIT <ArrowUpRight size={16} aria-hidden="true" /></a><a className="text-link" href="/faq">Read the FAQ <ArrowRight size={15} aria-hidden="true" /></a></Reveal></div></section>
    </>
  );
}
