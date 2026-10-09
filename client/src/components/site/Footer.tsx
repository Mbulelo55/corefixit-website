import { ArrowUp, ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import { services } from "@/data/site";
import { Brand } from "./Brand";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top wrap">
        <div className="footer-brand-block">
          <Brand />
          <p>Better IT starts with better questions.<br />Let’s find the next clear step together.</p>
          <Link className="footer-talk" href="/contact">Start a conversation <ArrowUpRight size={15} aria-hidden="true" /></Link>
        </div>
        <div className="footer-column">
          <span className="footer-label">Explore</span>
          <Link href="/">Home</Link>
          <Link href="/about">About CoreFixIT</Link>
          <a href="/about#approach">How we work</a>
          <Link href="/faq">Frequently asked</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div className="footer-column">
          <span className="footer-label">Services</span>
          <Link href="/services">All services</Link>
          {services.map((service) => <Link key={service.slug} href={`/services/${service.slug}`}>{service.name}</Link>)}
        </div>
        <div className="footer-column">
          <span className="footer-label">Information</span>
          <Link href="/privacy">Privacy policy</Link>
          <Link href="/terms">Terms of use</Link>
          <Link href="/contact">Send an inquiry</Link>
        </div>
      </div>
      <div className="footer-bottom wrap">
        <span>© {new Date().getFullYear()} CoreFixIT. All rights reserved.</span>
        <span className="footer-note">Practical IT, considered from every angle.</span>
        <Link className="back-to-top" href="/" aria-label="Back to CoreFixIT home"><ArrowUp size={16} aria-hidden="true" /></Link>
      </div>
    </footer>
  );
}
