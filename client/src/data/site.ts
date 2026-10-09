import { Cloud, Headset, Network, RotateCcw, ShieldCheck, Workflow } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type Service = {
  slug: string;
  number: string;
  name: string;
  eyebrow: string;
  summary: string;
  detail: string;
  icon: LucideIcon;
  bestFor: string[];
  benefits: string[];
  approach: string[];
  color: string;
};

export const services: Service[] = [
  {
    slug: "managed-it",
    number: "01",
    name: "Managed IT & support",
    eyebrow: "A calmer day-to-day",
    summary: "Keep people moving with responsive help, proactive upkeep, and clearer ownership of your technology.",
    detail: "A practical support layer for the systems people rely on every day. We start with how your team works, then shape support and maintenance around the needs you identify together.",
    icon: Headset,
    bestFor: ["Teams that want a reliable place to start when IT gets in the way", "Growing organizations that need more predictable ownership", "Leaders looking for a clearer picture of their technology"],
    benefits: ["A consistent route for requests and priorities", "Proactive maintenance conversations", "Plain-language updates and next steps"],
    approach: ["Understand your team, devices, and support needs", "Agree a service scope and escalation path", "Set up access, documentation, and baseline support", "Review what is working and tune the relationship"],
    color: "cyan",
  },
  {
    slug: "cybersecurity",
    number: "02",
    name: "Cybersecurity",
    eyebrow: "Protection by design",
    summary: "Build safer habits and stronger controls around the people, devices, and information you depend on.",
    detail: "Security works best as a joined-up practice, not a panic button. CoreFixIT can help assess risk, prioritize sensible controls, strengthen endpoint and account protection, and plan what happens next.",
    icon: ShieldCheck,
    bestFor: ["Businesses reviewing their security foundations", "Teams working across cloud services and many devices", "Organizations that want a practical improvement roadmap"],
    benefits: ["A prioritized view of exposure and improvements", "Stronger identity, endpoint, and access practices", "A response approach proportionate to your needs"],
    approach: ["Map accounts, devices, data, and likely risks", "Prioritize controls around your environment", "Implement improvements in agreed stages", "Revisit priorities as the business changes"],
    color: "violet",
  },
  {
    slug: "cloud-workplace",
    number: "03",
    name: "Cloud & workplace",
    eyebrow: "Work from anywhere",
    summary: "Make cloud tools, identity, and collaboration feel like one considered workplace.",
    detail: "From workspace planning to careful migrations and account configuration, bring cloud services closer to the way your people actually collaborate.",
    icon: Cloud,
    bestFor: ["Teams modernizing collaboration and productivity tools", "Businesses planning a cloud move or consolidation", "Organizations that need a cleaner joiner and leaver workflow"],
    benefits: ["A right-sized cloud roadmap", "More deliberate access and workspace structure", "Practical change support for the people using it"],
    approach: ["Understand your current platforms and workflows", "Design a migration or improvement plan", "Implement with clear checkpoints", "Review adoption, access, and operating needs"],
    color: "blue",
  },
  {
    slug: "network-connectivity",
    number: "04",
    name: "Network & connectivity",
    eyebrow: "A stronger foundation",
    summary: "Plan, troubleshoot, and improve the connections behind productive work.",
    detail: "We help make sense of the network behind your workplace—from coverage and access to the day-to-day experience of being reliably connected.",
    icon: Network,
    bestFor: ["Offices dealing with inconsistent connectivity", "Businesses reviewing network or Wi-Fi coverage", "Teams connecting cloud tools, locations, and users"],
    benefits: ["A clearer view of network priorities", "Design aligned to your sites and working patterns", "Documented changes and practical handover"],
    approach: ["Assess sites, equipment, and user needs", "Plan changes and dependencies", "Implement and validate the agreed work", "Document the environment for ongoing support"],
    color: "mint",
  },
  {
    slug: "backup-recovery",
    number: "05",
    name: "Backup & recovery",
    eyebrow: "Ready for the unexpected",
    summary: "Understand what needs protecting and make recovery part of the plan—not an afterthought.",
    detail: "A useful recovery plan connects important data, realistic restoration needs, and clear responsibilities. We help teams assess backup coverage and agree on next steps.",
    icon: RotateCcw,
    bestFor: ["Businesses reviewing backup coverage", "Teams with critical files or cloud workloads", "Leaders that want recovery expectations discussed upfront"],
    benefits: ["A prioritized view of what matters most", "Clearer restoration responsibilities", "A path toward testing and continuous improvement"],
    approach: ["Identify key systems, data, and dependencies", "Agree priorities and recovery objectives", "Configure or improve the agreed protection", "Review documentation and test plans"],
    color: "amber",
  },
  {
    slug: "it-strategy-projects",
    number: "06",
    name: "IT strategy & projects",
    eyebrow: "Make the next move count",
    summary: "Turn a technology wish-list into a sequenced, business-aware plan your team can act on.",
    detail: "Whether you are planning a refresh, untangling a challenge, or evaluating a new direction, we bring the technical and practical questions together before work begins.",
    icon: Workflow,
    bestFor: ["Businesses planning an IT project or refresh", "Leaders weighing technology options", "Teams that need priorities translated into concrete steps"],
    benefits: ["Priorities linked to business needs", "Dependencies and trade-offs made visible", "A staged plan with clear decision points"],
    approach: ["Set the business outcome and constraints", "Explore options and dependencies", "Build a sequence, scope, and ownership plan", "Deliver, hand over, and review the result"],
    color: "coral",
  },
];

export const contactDetails = {
  email: "mbulelo.it.support@gmail.com",
  phone: "0659823401",
};

export const processSteps = [
  { number: "01", title: "Assess", description: "Start with your people, priorities, and the technology you already have." },
  { number: "02", title: "Plan", description: "Turn what we learn into a right-sized, practical route forward." },
  { number: "03", title: "Implement", description: "Make the agreed changes with clear ownership and useful checkpoints." },
  { number: "04", title: "Support", description: "Stay close, review what is changing, and keep improving together." },
];

export const faqs = [
  { question: "What kind of organizations does CoreFixIT work with?", answer: "CoreFixIT is positioned to help organizations and individual clients looking for practical IT guidance. The right service depends on your environment, priorities, and the kind of support you need." },
  { question: "Can I ask about just one service?", answer: "Yes. You can select a service in the consultation form, or choose “Not sure yet” and describe what is getting in the way. The first conversation is about understanding the need, not prescribing a fixed package." },
  { question: "How does the consultation request work?", answer: "Send the form with your contact details and a little context. It routes an inquiry notification to the CoreFixIT site operator. A team member can then follow up using the details you provided. No response-time commitment is implied on this preview site." },
  { question: "Is the contact form for an urgent incident?", answer: "The public form is for consultations and non-emergency inquiries, not an incident hotline. For an active outage or security emergency, use the support or emergency channel already agreed with your provider." },
  { question: "How are costs and scope decided?", answer: "Scope should reflect the environment, priorities, and level of support involved. Share the outcome you are looking for and CoreFixIT can discuss an appropriate next step before work is agreed." },
];

export const technologyNames = ["Microsoft 365", "Azure", "Google Workspace", "AWS", "Cisco", "Ubiquiti"];
