import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Brand } from "./Brand";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();
  const closeMenu = () => setOpen(false);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Brand />
        <nav id="main-nav" aria-label="Main navigation" className={`main-nav${open ? " main-nav--open" : ""}`}>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} aria-current={location === item.href ? "page" : undefined} onClick={closeMenu}>{item.label}</Link>
          ))}
          <Link className="main-nav__mobile-cta" href="/contact" onClick={closeMenu}>
            Talk to CoreFixIT <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </nav>
        <Link className="button button--small header-cta" href="/contact">
          Plan your next move <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
        <button
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          aria-controls="main-nav"
          className="menu-toggle"
          onClick={() => setOpen((value) => !value)}
          type="button"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  );
}
