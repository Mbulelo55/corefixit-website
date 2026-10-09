# CoreFixIT — project outcomes

> A native Webdev ToDo action was not available in this project tool surface; this project-local checklist preserves the full acceptance criteria.

## [x] Outcome 1 — Build a branded CoreFixIT multi-page website and service-discovery experience
- Deliver a fully functional 3D or 4D IT website with motion for the company CoreFixIT, offering multiple IT services to companies and clients.
- Do not make the full website into one page; it should be multiple pages. Provide separate Home (`/`), About (`/about`), Services directory (`/services`), FAQ (`/faq`), and Contact (`/contact`) pages, as well as distinct service-detail pages and separate Privacy and Terms pages.
- Include an immersive homepage hero with CoreFixIT branding, a concise value proposition, animated 3D/4D technology visuals, and prominent calls to action, while keeping long-form About, Services, FAQ, and Contact content on their own pages.
- Include a Services page with a clear overview of the company’s key offerings through visually distinct service cards; cards must link to the corresponding individual service pages.
- Include dedicated service detail pages explaining benefits, common client needs, delivery approach, and next steps.
- Include an About CoreFixIT page communicating the company’s expertise, values, client focus, forward-looking positioning, and assessment-to-ongoing-support process.

## [x] Outcome 2 — Complete credible trust, information, and foundational pages
- Include trust-building content including key benefits, performance metrics, client testimonials, and supported technologies or partner logos.
- Keep trust content truthful: no invented measured results, real-client identities or quotations, certifications, partner status, or response SLA. Use clearly identified editable placeholders for facts not supplied. Display the user-provided Contact email `mbulelo.it.support@gmail.com` and phone `0659823401` without inventing other business-contact details.
- Include FAQ, privacy policy, and terms foundational pages/states. FAQ must have its own `/faq` page. Clearly identify any legal copy as an editable draft requiring CoreFixIT-specific review.

## [x] Outcome 3 — Deliver an accessible, page-based consultation experience
- Include a dedicated `/contact` page with a conversion-focused inquiry and consultation experience, direct email `mbulelo.it.support@gmail.com`, direct phone `0659823401`, and clear response expectations, using only available/configured CoreFixIT contact details rather than invented contact coordinates or an unverified SLA.
- Provide working required-field and email validation, pending/loading state, accessible success feedback, and clear error/retry feedback.
- Deliver accepted prospective-client inquiries to `mbulelo.it.support@gmail.com` through the configured server-side Resend email workflow using a verified sender domain; use the submitting visitor's email as Reply-To; show success only after the email provider accepts the message; never expose the API key in browser code or source control.
- Include responsive navigation and footer links that route to the distinct pages, services, legal information, and calls to action.
- Make essential navigation and disclosure controls operable with keyboard, label form fields, provide visible focus, and support screen-reader announcements.

## [x] Outcome 4 — Implement responsive motion and polish across the pages
- Provide a motion-rich responsive experience with scroll-based transitions, depth effects, hover interactions, reduced-motion support, and strong mobile performance.
- Provide polished page navigation and UI states, including FAQ disclosures, privacy policy, terms, form validation, submission feedback, loading states, and accessible keyboard navigation.
