import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { PageMeta } from "@/components/site/PageMeta";
import { Reveal } from "@/components/site/Reveal";
import { ServiceCard } from "@/components/site/ServiceCard";
import { services } from "@/data/site";

export default function Services() {
  return (
    <>
      <PageMeta title="IT Services | CoreFixIT" description="Explore six CoreFixIT IT service areas: managed support, cybersecurity, cloud, connectivity, backup and strategy." />
      <PageHero eyebrow="COREFIXIT SERVICES" index="03" title={<>The right support<br />for what comes <span className="title-accent">next.</span></>} description="Start with the challenge in front of you. Browse the service areas, then open a page for needs, benefits, and a practical way forward." />
      <section className="services-section section-pad">
        <div className="wrap">
          <Reveal className="section-heading section-heading--split">
            <div><span className="eyebrow"><span className="eyebrow__line" /> Six connected service areas</span><h2>Choose a place<br />to <span className="serif-italic">begin.</span></h2></div>
            <div className="section-heading__aside"><p>Every organization is different. Explore a service page for the challenges it may address and the steps to discuss next.</p><a className="text-link" href="/contact">Not sure where to start? <ArrowUpRight size={16} aria-hidden="true" /></a></div>
          </Reveal>
          <div className="service-grid services-directory">
            {services.map((service, index) => <ServiceCard key={service.slug} service={service} index={index} />)}
          </div>
          <div className="service-footnote"><span>01—06 / SERVICE DIRECTORY</span><span>Open any service for its dedicated details.</span></div>
        </div>
      </section>
    </>
  );
}
