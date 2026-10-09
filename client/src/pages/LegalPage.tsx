import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { PageMeta } from "@/components/site/PageMeta";
import { Reveal } from "@/components/site/Reveal";

type LegalKind = "privacy" | "terms";

export default function LegalPage({ kind }: { kind: LegalKind }) {
  const isPrivacy = kind === "privacy";
  const title = isPrivacy ? "Privacy, considered." : "Clear terms matter.";
  const metaTitle = isPrivacy ? "Privacy policy draft | CoreFixIT" : "Terms of use draft | CoreFixIT";
  const metaDescription = isPrivacy ? "Review the CoreFixIT privacy-policy starter draft and its contact form data practices." : "Review the CoreFixIT terms-of-use starter draft. Organization-specific terms remain to be confirmed.";

  return (
    <><PageMeta title={metaTitle} description={metaDescription} /><section className="legal-page section-pad">
      <div className="wrap legal-wrap">
        <Link className="back-link" href="/"><ArrowLeft size={15} aria-hidden="true" /> CoreFixIT home</Link>
        <Reveal className="legal-heading"><span className="eyebrow"><span className="eyebrow__line" /> INFORMATION / {isPrivacy ? "01" : "02"}</span><h1>{title}</h1><p>Starter draft · organization-specific details need review before publication.</p></Reveal>
        <div className="legal-draft"><strong>Editorial note: review before launch.</strong><p>This page is a website-content starter, not legal advice. CoreFixIT should confirm the correct legal entity, jurisdiction, contact method, operational practices, and applicable terms before relying on or publishing this copy.</p></div>
        {isPrivacy ? <div className="legal-content">
          <h2>Information submitted through this site</h2>
          <p>The consultation form asks for a name, email address, optional company, service area, and inquiry message. Please do not submit passwords, payment details, health information, or other sensitive credentials.</p>
          <h2>How an inquiry is routed</h2>
          <p>When the form is accepted, the inquiry is sent to the configured CoreFixIT site operator through this project's notification workflow so a team member can review it and respond. This starter does not write inquiries to a business-owned CRM or application database. The organization must confirm how the notification service handles access, records, and retention and update this notice accordingly.</p>
          <h2>Purpose and follow-up</h2>
          <p>The information supplied is intended to let CoreFixIT understand the request and follow up using the contact details provided. Do not treat a successful form submission as an emergency-reporting channel or a guarantee of a particular response time.</p>
          <h2>Service providers, retention, and rights</h2>
          <p>The final notice must identify the organization operating this website, relevant service providers, retention periods, applicable privacy rights, jurisdiction, and the contact responsible for privacy requests. These operational details were not supplied for this preview, so they must be verified and added before publication.</p>
          <h2>Questions</h2><p>Use the consultation form for a non-sensitive question while a verified privacy contact is being added by the site owner.</p>
        </div> : <div className="legal-content">
          <h2>Using this site</h2><p>This site provides general information about the IT services CoreFixIT may offer. Confirm the organization’s legal identity and final scope before using this starter as binding terms.</p>
          <h2>Service engagements</h2><p>Service scope, fees, schedules, responsibilities, security requirements, and acceptance criteria should be set out in a separate written agreement approved by the parties. A consultation inquiry alone does not create a service agreement or guarantee availability.</p>
          <h2>Information and availability</h2><p>Website descriptions are general, may change, and are not a substitute for a review of a specific business or technical environment. The public inquiry form is not an incident-response or emergency channel.</p>
          <h2>Intellectual property and third-party names</h2><p>Site text and design should be used only as permitted by the organization operating the site. References to third-party technology are descriptive; no partnership, endorsement, or affiliation is represented unless confirmed separately.</p>
          <h2>Governing terms and contact</h2><p>CoreFixIT must add the correct legal entity, applicable jurisdiction, liability provisions, dispute process, effective date, and verified contact information before publication. Those details were not provided for this preview.</p>
        </div>}
        <div className="legal-end"><Link className="text-link" href="/"><ArrowLeft size={15} aria-hidden="true" /> Return to CoreFixIT</Link><span>Draft for CoreFixIT owner review</span></div>
      </div>
    </section></>
  );
}
