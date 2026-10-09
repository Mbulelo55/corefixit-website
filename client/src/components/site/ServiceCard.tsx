import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "wouter";
import type { Service } from "@/data/site";

export function ServiceCard({ service, index = 0 }: { service: Service; index?: number }) {
  const Icon = service.icon;
  const reducedMotion = useReducedMotion();
  return (
    <motion.article
      className={`service-card service-card--${service.color}`}
      initial={reducedMotion ? false : { opacity: 0, y: 18 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.58, delay: (index % 3) * 0.075, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reducedMotion ? undefined : { y: -5 }}
    >
      <div className="service-card__top">
        <span className="service-card__number">{service.number} / 06</span>
        <span className="service-card__icon"><Icon size={22} strokeWidth={1.7} aria-hidden="true" /></span>
      </div>
      <span className="service-card__eyebrow">{service.eyebrow}</span>
      <h3>{service.name}</h3>
      <p>{service.summary}</p>
      <Link className="text-link service-card__link" href={`/services/${service.slug}`}>
        Explore service <ArrowUpRight size={16} aria-hidden="true" />
      </Link>
    </motion.article>
  );
}
