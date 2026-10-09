import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type PageHeroProps = {
  eyebrow: string;
  index: string;
  title: ReactNode;
  description: string;
  children?: ReactNode;
};

export function PageHero({ eyebrow, index, title, description, children }: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="page-hero__grid" aria-hidden="true" />
      <div className="wrap page-hero__inner">
        <Reveal className="page-hero__copy">
          <span className="eyebrow eyebrow--light"><span className="live-indicator" /> {eyebrow}</span>
          <h1>{title}</h1>
          <p>{description}</p>
          {children && <div className="page-hero__actions">{children}</div>}
        </Reveal>
        <span className="page-hero__index" aria-hidden="true">CF / {index}</span>
        <span className="page-hero__orbit page-hero__orbit--one" aria-hidden="true" />
        <span className="page-hero__orbit page-hero__orbit--two" aria-hidden="true" />
      </div>
    </section>
  );
}
