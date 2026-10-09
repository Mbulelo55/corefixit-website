import { ArrowLeft, ArrowRight, ArrowUpRight, Check, CircleHelp } from "lucide-react";
import { Link, useRoute } from "wouter";
import { PageMeta } from "@/components/site/PageMeta";
import { Reveal } from "@/components/site/Reveal";
import { ServiceCard } from "@/components/site/ServiceCard";
import { services } from "@/data/site";

export default function ServiceDetail() {
  const [, params] = useRoute("/services/:slug");
  const service = services.find((item) => item.slug === params?.slug);
  if (!service) {
    return <><PageMeta title="Service not found | CoreFixIT" description="The requested CoreFixIT service could not be found. Browse the full list of IT services." noindex /><section className="not-found section-pad"><div className="wrap"><span className="eyebrow">SERVICE / NOT FOUND</span><h1>That service has moved.</h1><p>Browse the complete CoreFixIT service list to find a useful next step.</p><Link className="button button--primary" href="/services">All services <ArrowUpRight size={16} aria-hidden="true" /></Link></div></section></>;
  }
  const Icon = service.icon;
  return (
    <>
      <PageMeta title={`${service.name} | CoreFixIT IT services`} description={service.detail} />
      <section className={`detail-hero detail-hero--${service.color}`}>
        <div className="wrap detail-hero__inner">
          <div className="detail-crumb"><Link href="/">Home</Link><span>/</span><Link href="/services">Services</Link><span>/</span><span>{service.name}</span></div>
          <Reveal className="detail-hero__copy">
            <Link className="back-link" href="/services"><ArrowLeft size={15} aria-hidden="true" /> All services</Link>
            <span className="eyebrow"><span className="eyebrow__line" /> {service.number} / {service.eyebrow}</span>
            <h1>{service.name}<span>.</span></h1>
            <p>{service.detail}</p>
            <div className="detail-actions"><Link className="button button--primary" href="/contact">Talk about this service <ArrowUpRight size={17} aria-hidden="true" /></Link><span>Start with the challenge you are trying to solve.</span></div>
          </Reveal>
          <div className="detail-hero__visual"><span className="detail-icon"><Icon size={34} strokeWidth={1.45} aria-hidden="true" /></span><span className="detail-number">CF / {service.number}</span><span className="detail-sphere" aria-hidden="true" /></div>
        </div>
      </section>
      <section className="detail-body section-pad">
        <div className="wrap detail-body__grid">
          <Reveal><span className="eyebrow"><span className="eyebrow__line" /> Built around real needs</span><h2>Who it can<br /><span className="serif-italic">help.</span></h2><p className="detail-body__intro">Every environment is different. This service can be a good starting point if your team recognizes one of these challenges.</p></Reveal>
          <Reveal className="detail-list" delay={0.06}><ul>{service.bestFor.map((need) => <li key={need}><CircleHelp size={18} aria-hidden="true" />{need}</li>)}</ul></Reveal>
        </div>
      </section>
      <section className="detail-benefits section-pad"><div className="wrap"><Reveal className="detail-benefits__head"><span className="eyebrow eyebrow--light"><span className="eyebrow__line" /> What good looks like</span><h2>Designed to make<br />the day <span className="title-accent">work better.</span></h2></Reveal><div className="benefit-grid">{service.benefits.map((benefit, index) => <Reveal className="benefit-item" key={benefit} delay={index * 0.06}><span>0{index + 1}</span><p>{benefit}</p><Check size={17} aria-hidden="true" /></Reveal>)}</div></div></section>
      <section className="detail-approach section-pad"><div className="wrap"><Reveal className="section-heading"><span className="eyebrow"><span className="eyebrow__line" /> From first question to handover</span><h2>How we take<br /><span className="serif-italic">it forward.</span></h2></Reveal><ol className="detail-steps">{service.approach.map((step, index) => <li key={step}><span>0{index + 1}</span><p>{step}</p><ArrowRight size={17} aria-hidden="true" /></li>)}</ol></div></section>
      <section className="detail-related section-pad"><div className="wrap"><Reveal className="detail-related__head"><div><span className="eyebrow"><span className="eyebrow__line" /> More ways to make progress</span><h2>Connected by design.</h2></div><Link className="text-link" href="/services">See all services <ArrowUpRight size={16} aria-hidden="true" /></Link></Reveal><div className="service-grid service-grid--compact">{services.filter((item) => item.slug !== service.slug).slice(0, 3).map((item, index) => <ServiceCard key={item.slug} service={item} index={index} />)}</div><div className="detail-final-cta"><p>Not sure which direction fits? Bring us the question.</p><Link className="button button--primary" href="/contact">Talk with CoreFixIT <ArrowUpRight size={16} aria-hidden="true" /></Link></div></div></section>
    </>
  );
}
