import { ArrowDownRight } from "lucide-react";
import { faqs } from "@/data/site";
import { Reveal } from "./Reveal";

export function FAQ() {
  return (
    <section className="faq-section section-pad" id="faq">
      <div className="wrap faq-layout">
        <Reveal className="faq-intro">
          <span className="eyebrow"><span className="eyebrow__line" /> The useful answers</span>
          <h2>A few things<br />worth knowing.</h2>
          <p>Not sure where to start? No jargon required. Tell us what feels stuck, and we’ll work out the right conversation.</p>
          <a className="text-link" href="/contact">Ask us directly <ArrowDownRight size={16} aria-hidden="true" /></a>
        </Reveal>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <Reveal key={faq.question} delay={index * 0.04}>
              <details className="faq-item">
                <summary><span className="faq-item__count">0{index + 1}</span><span>{faq.question}</span><span className="faq-item__plus" aria-hidden="true">+</span></summary>
                <p>{faq.answer}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
