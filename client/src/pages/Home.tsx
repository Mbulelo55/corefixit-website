import { ArrowDownRight, ArrowRight, ArrowUpRight, ShieldCheck } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useState, type PointerEvent } from "react";
import { PageMeta } from "@/components/site/PageMeta";
import { Reveal } from "@/components/site/Reveal";
import { ServiceCard } from "@/components/site/ServiceCard";
import { services } from "@/data/site";

const HERO_IMAGE = "/manus-storage/async-images/sLfnP5sM89i2liFQU9s7J9/image-1.webp";

function HeroVisual() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const reduced = useReducedMotion();
  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (reduced || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    setTilt({ x: x * 4.5, y: y * -4.5 });
  }
  return (
    <div className="hero-visual" onPointerMove={onPointerMove} onPointerLeave={() => setTilt({ x: 0, y: 0 })}>
      <div className="hero-visual__scene" style={reduced ? undefined : { transform: `perspective(1200px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)` }}>
        <img className="hero-visual__art" src={HERO_IMAGE} alt="" fetchPriority="high" />
        <div className="hero-visual__shade" />
        <div className="orbit orbit--one" />
        <div className="orbit orbit--two" />
        <div className="orbit orbit--three" />
        <div className="hero-core"><span className="hero-core__dot" /><span className="hero-core__ring" /></div>
        <motion.div className="float-chip float-chip--top"><span className="signal-dot" /> Connection, reimagined</motion.div>
        <motion.div className="float-chip float-chip--bottom"><ShieldCheck size={16} aria-hidden="true" /><span>Built around your business</span></motion.div>
        <div className="visual-caption"><span>COREFIXIT / SYSTEMS IN MOTION</span><span>01—06</span></div>
      </div>
      <div className="hero-visual__edge" aria-hidden="true" />
    </div>
  );
}

export default function Home() {
  return (
    <>
      <PageMeta title="CoreFixIT | IT that moves your business forward" description="Practical IT support, cybersecurity, cloud, network and recovery services. Meet CoreFixIT and choose a clear next step." />
      <section className="hero" id="top">
        <div className="hero-grid" aria-hidden="true" />
        <div className="wrap hero__inner">
          <div className="hero-copy">
            <Reveal>
              <span className="eyebrow eyebrow--light"><span className="live-indicator" /> A clearer way forward with IT</span>
              <h1>Your next move<br />deserves <span className="title-accent">better IT.</span></h1>
              <p>Human-first support. Smarter systems. A technology partner who sees the whole picture—and makes your next step feel simpler.</p>
              <div className="hero-actions">
                <a className="button button--primary" href="/services">Explore our services <ArrowUpRight size={17} aria-hidden="true" /></a>
                <a className="hero-secondary" href="/contact">Talk to the team <ArrowDownRight size={16} aria-hidden="true" /></a>
              </div>
              <div className="hero-note"><span className="hero-note__rule" /> For ambitious teams and people who rely on technology</div>
            </Reveal>
          </div>
          <HeroVisual />
          <a className="hero-scroll" href="/about" aria-label="Learn about CoreFixIT"><span>MEET COREFIXIT</span><ArrowDownRight size={16} aria-hidden="true" /></a>
        </div>
        <div className="hero-index" aria-hidden="true">C / 01</div>
      </section>

      <section className="ticker" aria-label="Our technology approach"><div className="ticker__inner wrap"><span className="ticker__label">THE CORE FIX</span><span>Technology that fits</span><span className="ticker-dot">✳</span><span>Security with clarity</span><span className="ticker-dot">✳</span><span>Support built around people</span><span className="ticker-dot">✳</span><span>Room to move forward</span></div></section>

      <section className="services-section section-pad">
        <div className="wrap">
          <Reveal className="section-heading section-heading--split">
            <div><span className="eyebrow"><span className="eyebrow__line" /> A place to start</span><h2>IT that meets<br />you <span className="serif-italic">where you are.</span></h2></div>
            <div className="section-heading__aside"><p>One challenge or a bigger change—explore the services and find a useful next step.</p><a className="text-link" href="/services">See all six services <ArrowRight size={16} aria-hidden="true" /></a></div>
          </Reveal>
          <div className="service-grid home-service-preview">
            {services.slice(0, 3).map((service, index) => <ServiceCard key={service.slug} service={service} index={index} />)}
          </div>
          <div className="service-footnote"><span>01—03 / A FEW WAYS WE HELP</span><a href="/services">Browse the full services directory <ArrowUpRight size={14} aria-hidden="true" /></a></div>
        </div>
      </section>

      <section className="home-cta section-pad">
        <div className="wrap home-cta__inner">
          <Reveal><span className="eyebrow eyebrow--light"><span className="eyebrow__line" /> People first. Progress next.</span><h2>Want to know how<br />CoreFixIT works?</h2><p>Meet the approach, values, and practical four-step process behind the service.</p></Reveal>
          <Reveal className="home-cta__actions" delay={0.08}><a className="button button--outline-light" href="/about">About CoreFixIT <ArrowUpRight size={16} aria-hidden="true" /></a><a className="button button--primary" href="/contact">Start a conversation <ArrowUpRight size={16} aria-hidden="true" /></a></Reveal>
          <div className="home-cta__orbit" aria-hidden="true" />
        </div>
      </section>
    </>
  );
}
