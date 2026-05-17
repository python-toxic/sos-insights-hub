import type { Article } from "../types";

export const ARTICLES: Article[] = [
  {
    slug: "imo-regulations-2025",
    title: "IMO Regulations 2025: Key Updates for Shipowners",
    excerpt:
      "A practical overview of the latest IMO amendments taking effect in 2025 and what they mean for fleet operators, compliance officers, and recycling stakeholders.",
    category: "Regulations",
    publishedAt: "2025-09-12",
    readingTime: 7,
    coverImage:
      "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=1600&q=80",
    author: "SOS India Editorial",
    body: [
      { type: "p", text: lorem("The International Maritime Organization (IMO) has finalized several amendments scheduled to enter into force in 2025. These updates touch emissions, ballast water management, and end-of-life reporting obligations for shipowners operating across major trade routes.") },
      { type: "h2", text: "What is changing in 2025" },
      { type: "p", text: "The amendments primarily address three operational areas: greenhouse gas intensity reporting, mandatory data verification for the Carbon Intensity Indicator (CII), and aligned reporting between MARPOL Annex VI and the EU Monitoring, Reporting and Verification (MRV) framework." },
      { type: "ul", items: [
        "Tighter CII rating bands, with stricter penalties for vessels in D and E categories",
        "Expanded scope of mandatory IHM (Inventory of Hazardous Materials) verification at port state inspections",
        "Updated guidelines on alternative fuels — LNG, methanol, and ammonia bunkering documentation",
      ]},
      { type: "h2", text: "Operational implications" },
      { type: "p", text: "For most fleet operators, the 2025 cycle will require closer coordination between technical, commercial, and compliance teams. Vessels approaching end-of-life should also re-evaluate recycling plans against the Hong Kong Convention timeline." },
      { type: "quote", text: "Compliance in 2025 is less about box-ticking and more about embedding emissions thinking into commercial decisions." },
      { type: "p", text: "SOS India works with owners and managers to translate these regulatory changes into concrete checklists, documentation packages, and yard-side action items." },
    ],
  },
  {
    slug: "hong-kong-convention-compliance-checklist",
    title: "Hong Kong Convention: Ship Recycling Compliance Checklist",
    excerpt:
      "A step-by-step checklist for owners preparing vessels for recycling under the Hong Kong International Convention, now in force globally.",
    category: "Compliance",
    publishedAt: "2025-08-28",
    readingTime: 6,
    coverImage:
      "https://images.unsplash.com/photo-1577416412292-747c6607f055?auto=format&fit=crop&w=1600&q=80",
    author: "SOS India Compliance Desk",
    body: [
      { type: "p", text: "With the Hong Kong Convention (HKC) now in force, shipowners and recycling yards share a clearer, internationally harmonized framework for safe and environmentally sound recycling." },
      { type: "h2", text: "Pre-recycling checklist" },
      { type: "ul", items: [
        "Up-to-date Inventory of Hazardous Materials (IHM) Part I, II, and III",
        "Ship Recycling Plan (SRP) prepared by the selected yard",
        "Statement of Compliance or HKC-aligned yard certification",
        "Pre-cleaning of tanks, voids, and high-risk compartments",
        "Final voyage documentation and flag state notifications",
      ]},
      { type: "h2", text: "Yard selection" },
      { type: "p", text: "Yard selection remains the highest-leverage decision. Audited, certified yards with documented downstream waste management consistently outperform on both safety and reputational risk." },
      { type: "p", text: "Owners are encouraged to involve an independent consultant early in the cycle — typically 6 to 9 months before the planned delivery — to avoid last-minute documentation gaps." },
    ],
  },
  {
    slug: "solas-amendments-safety-standards",
    title: "Maritime Safety Standards: SOLAS Amendments You Should Know",
    excerpt:
      "Recent SOLAS amendments tighten requirements around fire safety, lifesaving appliances, and operational drills. Here is what crews and managers need to prepare.",
    category: "Safety",
    publishedAt: "2025-08-05",
    readingTime: 5,
    coverImage:
      "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?auto=format&fit=crop&w=1600&q=80",
    author: "Capt. R. Menon",
    body: [
      { type: "p", text: "SOLAS continues to evolve as the backbone of maritime safety. The latest amendments tighten requirements around fire detection systems, lifeboat release mechanisms, and onboard drill documentation." },
      { type: "h2", text: "Priorities for managers" },
      { type: "ul", items: [
        "Review fire detection coverage in machinery spaces",
        "Re-train crew on updated muster and abandon-ship procedures",
        "Refresh maintenance records for lifesaving appliances",
      ]},
      { type: "p", text: "Port state control campaigns are expected to focus on these areas through 2025–2026. Vessels with poor documentation typically face longer detentions than those with minor technical findings." },
    ],
  },
  {
    slug: "ihm-practical-guidelines",
    title: "Hazardous Material Inventory (IHM): Practical Guidelines",
    excerpt:
      "Beyond the regulation: how to build, maintain, and verify an IHM that actually holds up to inspection and serves the recycling yard.",
    category: "Compliance",
    publishedAt: "2025-07-22",
    readingTime: 8,
    coverImage:
      "https://images.unsplash.com/photo-1518544801976-3e188ea7c5b1?auto=format&fit=crop&w=1600&q=80",
    author: "SOS India Technical Team",
    body: [
      { type: "p", text: "An Inventory of Hazardous Materials (IHM) is only useful if it reflects the actual state of the vessel. Too many IHMs are treated as one-time deliverables rather than living documents." },
      { type: "h2", text: "Maintaining IHM Part I" },
      { type: "p", text: "Every change in equipment, paint system, or major spare must be reflected. Class-approved software helps, but disciplined onboard processes matter more." },
      { type: "h2", text: "Preparing for recycling" },
      { type: "ul", items: [
        "Sampling and visual checks closer to end-of-life",
        "Part II additions for operationally generated waste",
        "Part III closure entries before final delivery",
      ]},
      { type: "p", text: "A well-kept IHM dramatically reduces friction at the yard and helps owners negotiate from a position of clarity rather than uncertainty." },
    ],
  },
  {
    slug: "green-ship-recycling-south-asia",
    title: "Green Ship Recycling Practices in South Asia",
    excerpt:
      "South Asian recycling yards have undergone significant transformation. A look at how leading facilities are aligning with HKC and EU SRR standards.",
    category: "Sustainability",
    publishedAt: "2025-07-04",
    readingTime: 6,
    coverImage:
      "https://images.unsplash.com/photo-1473445730015-841f29a9490b?auto=format&fit=crop&w=1600&q=80",
    author: "SOS India Editorial",
    body: [
      { type: "p", text: "South Asia recycles the majority of the world's end-of-life tonnage. Over the last decade, leading yards have invested heavily in impermeable floors, controlled cutting zones, and downstream waste partnerships." },
      { type: "h2", text: "What good looks like" },
      { type: "ul", items: [
        "Documented downstream waste flows for asbestos, PCBs, and oily residues",
        "Trained workforce with verified PPE programs",
        "Independent third-party audits and continuous improvement plans",
      ]},
      { type: "p", text: "While perception sometimes lags behind reality, owners selecting verified yards can credibly demonstrate environmentally sound recycling to charterers, financiers, and regulators." },
    ],
  },
  {
    slug: "eu-srr-yard-approval",
    title: "EU Ship Recycling Regulation: Yard Approval Process",
    excerpt:
      "An overview of how recycling facilities get listed under the EU SRR, and what the process means for owners of EU-flagged ships.",
    category: "Regulations",
    publishedAt: "2025-06-18",
    readingTime: 7,
    coverImage:
      "https://images.unsplash.com/photo-1566254605648-9d3878e54183?auto=format&fit=crop&w=1600&q=80",
    author: "SOS India Regulatory Affairs",
    body: [
      { type: "p", text: "The EU Ship Recycling Regulation (SRR) maintains a list of approved facilities that may legally recycle EU-flagged ships. Inclusion on the list is a multi-stage process involving on-site audits and detailed documentation." },
      { type: "h2", text: "Key application elements" },
      { type: "ul", items: [
        "Facility plan and infrastructure description",
        "Health, safety, and emergency preparedness procedures",
        "Downstream waste management evidence",
        "Independent verification reports",
      ]},
      { type: "p", text: "For owners, choosing an EU-listed yard removes ambiguity around legal flagging strategies and simplifies compliance reporting to flag administrations." },
    ],
  },
  {
    slug: "port-state-control-detentions",
    title: "Port State Control Inspections: Avoiding Detentions",
    excerpt:
      "Detentions are expensive and reputationally costly. A practical guide to the most common deficiencies — and how to prevent them.",
    category: "Safety",
    publishedAt: "2025-05-30",
    readingTime: 5,
    coverImage:
      "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=1600&q=80",
    author: "Capt. R. Menon",
    body: [
      { type: "p", text: "Port State Control (PSC) inspections remain one of the most consistent sources of operational disruption. Detentions usually stem from a small number of recurring deficiencies." },
      { type: "h2", text: "Top recurring deficiencies" },
      { type: "ul", items: [
        "Fire safety: missing or expired equipment",
        "Lifesaving appliances: defective release mechanisms",
        "ISM-related documentation gaps",
        "MARPOL Annex I oil record book entries",
      ]},
      { type: "p", text: "Proactive self-inspections, aligned with the relevant MoU concentrated inspection campaigns, dramatically reduce the likelihood of detention." },
    ],
  },
  {
    slug: "marpol-annex-vi-sulphur-cap",
    title: "MARPOL Annex VI: Sulphur Cap Compliance in Practice",
    excerpt:
      "Compliance with the 0.50% global sulphur cap has matured, but enforcement is becoming more sophisticated. What that means for fuel strategy and reporting.",
    category: "Sustainability",
    publishedAt: "2025-05-10",
    readingTime: 6,
    coverImage:
      "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?auto=format&fit=crop&w=1600&q=80",
    author: "SOS India Editorial",
    body: [
      { type: "p", text: "The 0.50% sulphur cap is now a settled part of operational reality, but enforcement methods continue to evolve. Drone-based plume sniffing, remote sensors, and fuel sample analytics are increasingly common." },
      { type: "h2", text: "Practical implications" },
      { type: "ul", items: [
        "Robust bunker delivery note (BDN) management",
        "Disciplined fuel changeover procedures in ECAs",
        "Scrubber wash water reporting where applicable",
      ]},
      { type: "p", text: "Owners that treat fuel data as a first-class operational asset typically see fewer disputes and stronger commercial outcomes." },
    ],
  },
];
