# CoreFixIT — implementation and design plan

## Product scope and architecture

Deliver a complete, responsive, multi-page CoreFixIT marketing website for business and individual clients. **Do not make the site a single long page.** Give Home, About, Services, FAQ, and Contact their own direct routes and route-based navigation, with separate service details and legal pages. “4D” is realized as dimensional depth, restrained motion, and interaction—not a claim of literal extra spatial dimensions.

Build on the initialized React 19, TypeScript, Vite, and Wouter starter, reusing Framer Motion, lucide-react, Express, Zod, and a server-side Resend email integration for the user's self-hosted project copy. The database remains disabled. A validated site inquiry is emailed to `mbulelo.it.support@gmail.com` from a verified sender address configured in `CONTACT_FROM_EMAIL`; the submitter's address is used as Reply-To. The Resend API key stays in the server environment as `RESEND_API_KEY`, never in browser code. The website does not create a business-owned CRM record or claim permanent inquiry storage. Report success only after Resend accepts the email. Use clear failure/retry states when it does not.

Render the complete public page body before sending the initial response. Development uses Vite SSR middleware; the production build compiles an SSR entry alongside the browser bundle. Express supplies per-route titles and descriptions, correct 404s for unknown routes, and `noindex` on missing content. Hydrate the same route and provider tree in the browser. Omit canonical and `og:url` declarations until an intended real public origin is configured; never derive them from a proxy/internal request host.

### Distinct page and route set

- `/` — concise landing page with the animated 3D hero, clear value proposition, a small services preview, key differentiators, and links deeper into the site. It must not contain the entire website as one scrolling page.
- `/about` — CoreFixIT's purpose, values, four-step engagement process, performance-measurement principles, technology examples, and clearly labeled editable client-story placeholder.
- `/services` — searchable-at-a-glance directory of all six IT service offers, each linking to its own detail route.
- `/services/:slug` — reusable direct-link detail page for one of six services, including common client needs, benefits, delivery approach, related offers, and a consultation action.
- `/faq` — standalone FAQ page with keyboard-operable native disclosures and a Contact action.
- `/contact` — dedicated inquiry and consultation page with response expectations, privacy-friendly form validation, pending/accepted/error states, and a non-emergency notice.
- `/privacy` and `/terms` — readable editable starter information pages that visibly remain drafts; no unsupported legal entity, jurisdiction, contact, retention, warranty, or response-time specifics are invented.
- Keep `client/public/manus-routes.json` source-synchronized with these eight page patterns; exclude APIs, assets, system endpoints, and 404-only paths.

### Page content and behavior

The service catalogue includes managed IT/support; cybersecurity; cloud/workplace tools; network/connectivity; backup/recovery; and IT strategy/projects. The Services page and related-service cards link to the matching detail pages. Each service page is written for its service and shows common needs, expected benefits, an assess → plan → implement → support pathway, and a clear next step. The About page owns the fuller company story, values, process, agreed-metric approach, editable client-story slot, and technology examples; the Home page remains a focused introduction with a short preview rather than duplicating those long-form pages. FAQ and consultation content live on their own routes rather than existing only as home-page sections.

The Contact page displays the supplied direct email `mbulelo.it.support@gmail.com` and phone `0659823401` as clickable `mailto:` and `tel:` links. Its form collects a name, work email, optional company, service selection, and message. Browser and server validation enforce required fields, valid email, and length limits. Visible field errors, pending state, announced success/error status, an opt-out from diagnostic capture for the form and `/api/contact` body, a honeypot that never reports success, and server rate limiting protect the inquiry flow. The backend sends the inquiry via Resend using server-only credentials. Do not log message contents or represent a sent inquiry as a customer confirmation email. The form is explicitly not an urgent support channel.

Use route links for site navigation, with only purposeful secondary anchors within long About or legal pages. Responsive navigation closes after selection. Use semantic headings and landmarks, skip navigation, labeled controls, focus-visible styling, keyboard-operable FAQ disclosures, descriptive actions, and accessible form announcements. Provide scroll reveals and subtle pointer depth as enhancements, with restrained CSS or Framer Motion transitions and reduced-motion support. Do not use scroll-jacking or autoplay audio.

### Truthful trust content

Present service benefits without invented performance results, and describe service outcomes as metrics to agree and review together (for example, support quality, reliability, security posture, and user experience). Technology names are editable examples in the broader IT landscape—not verified partner logos or endorsements. No client quotations, identity, certifications, client counts, response SLA, or measured outcome facts were supplied; use an obvious editable client-story slot. The user supplied `mbulelo.it.support@gmail.com` and `0659823401` for the Contact page; confirm the intended business identity and contact details before publication.

## Design direction

- **Design movement:** Neo-futurist technology editorial: confident Swiss-style typography and asymmetry grounded in a cinematic, dimensional digital environment.
- **Core principles:** Clear before clever; kinetic but calm; human and credible; depth with restraint.
- **Color philosophy:** Near-black ink and deep blue establish technical focus, warm off-white makes long-form content friendly, and a bright ownable cyan signals CoreFixIT energy and the interaction layer. Lavender is a restrained secondary glow, never a competing brand color. Maintain accessible contrast.
- **Layout paradigm:** A route-based editorial story with a focused homepage, expanded editorial About and Services pages, a clearly organized FAQ, and a high-clarity Contact conversion page. Use asymmetric splits, alternating dark/light fields, and a service-card constellation; do not force the entire site into one central single-page grid. Mobile collapses to a clear page flow with no horizontal overflow.
- **Signature elements:** A custom CoreFixIT connected-core mark with angular strokes meeting at a cyan node; fine orbital/connection-line motifs; and small cyan section indices/hairline dividers.
- **Interaction philosophy:** Persistent navigation moves among real pages; service cards open distinct detail pages; FAQs disclose with native keyboard-operable details; the Contact page clearly explains where an inquiry goes. Hover is progressive enhancement; focus gets equally visible treatment.
- **Animation:** Slow low-amplitude orbital drift in the home hero; staggered page and section reveals; desktop-only pointer tilt clamped to a few degrees; short card/button transitions. Respect reduced-motion and touch input. Avoid heavy WebGL to keep mobile rendering reliable.
- **Typography system:** Space Grotesk for headlines and DM Sans for UI/body copy, with system fallbacks. Use bold geometric headings, restrained tracked labels, readable body size, and spacious legal text.
- **Brand essence:** “IT that moves your business forward, with proactive services and a human point of contact.” Personality: capable, clear, future-facing.
- **Brand voice:** Assured, plain-spoken, practical—never scare-led or unsupported. “Your next move deserves better IT.” “Less friction in your stack. More room to grow.”
- **Wordmark & logo:** Compact custom-weight CoreFix wordmark with `IT` in cyan, paired with a bespoke connected-angle/core-node mark and matching favicon.
- **Signature brand color:** Core cyan `#56E6DF` against midnight `#071019`.

## Project structure and responsibilities

- `client/src/App.tsx` — Wouter route registry, route-level code splitting, and error/provider shell.
- `client/src/Providers.tsx` — shared query/tRPC providers for the server-rendered and browser route tree.
- `client/src/main.tsx` — browser hydration and preserved embedded-Preview login compatibility.
- `client/src/entry-server.tsx` — route-aware public-page metadata, server rendering, and 404 classification for every page.
- `client/src/pages/` — separate Home, About, Services directory, FAQ, Contact, service details, legal pages, and not-found views.
- `client/src/components/site/` — custom brand, responsive route navigation/footer, accessible inquiry form, FAQ disclosures, metadata, reveal and service-card components.
- `client/src/data/site.ts` — editable service, FAQ, process, technology-example, and site copy.
- `client/src/index.css` — responsive design tokens, page layouts, motion, reduced-motion, and focus states.
- `client/index.html` and `client/public/` — shared head template, favicon, and complete route manifest.
- `server/_core/index.ts` and `server/_core/vite.ts` — API registration, development Vite SSR, production public-asset serving, and server-rendered route fallback.
- `server/contact.ts` — validated inquiry, honeypot/rate limit, and secure owner notification; `server/contact.test.ts` mocks all upstream messaging in automated tests.
- `package.json` — client, SSR, and server production build pipeline.
- `app.config.ts` — uploaded HTTPS brand-mark URL literal for platform project metadata.
- `plan.md` and `TODO.md` — architecture/design and complete acceptance outcomes.

## Material constraints

Use the existing public-site stack without login or database. Serve an exact JSON route manifest and distinguish non-existent pages with HTTP 404. For self-hosted inquiry delivery, configure a Resend API key and a sender address on a verified domain; the recipient is `mbulelo.it.support@gmail.com`. Do not expose secrets, log inquiry text, fabricate business claims, or display an unverified partner relationship. The favicon and platform logo use the same public SVG asset; `app.config.ts` contains the actual uploaded HTTPS asset URL. The home hero uses the exact generated managed-storage URL unchanged. Preserve the current publication setting; do not enable auto-publish or explicitly publish as part of this build. Configure absolute canonical and social URL metadata only after the intended public origin is supplied.
