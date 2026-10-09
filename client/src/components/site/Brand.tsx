import { Link } from "wouter";

export function CoreFixMark({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19 7H10.5C8.57 7 7 8.57 7 10.5v9" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" />
      <path d="M29 7h8.5c1.93 0 3.5 1.57 3.5 3.5v9" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" />
      <path d="M7 28v9.5c0 1.93 1.57 3.5 3.5 3.5H19" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" />
      <path d="M41 28v9.5c0 1.93-1.57 3.5-3.5 3.5H29" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" />
      <path d="m18.5 24 4 4 8-9" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="24" cy="24" r="3" fill="#56E6DF" />
    </svg>
  );
}

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className={`brand${compact ? " brand--compact" : ""}`} aria-label="CoreFixIT home">
      <span className="brand__icon-wrap"><CoreFixMark className="brand__icon" /></span>
      {!compact && <span className="brand__word">CoreFix<span>IT</span></span>}
    </Link>
  );
}
