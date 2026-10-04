/**
 * Centralized site copy for Nityam Singh.
 *
 * All personal information, social URLs, email, skills, experience
 * and CTA settings are defined here for single-source management.
 */

export const SITE_CONFIG = {
  name: "Nityam Singh",
  legalName: "Nityam Kumar",
  title: "HR Professional | AI & HR Tech Enthusiast",
  tagline: "Connecting People, Technology & Business through Modern HR.",
  email: "nityamkumarsingh31@gmail.com",
  phone: "+91 88828 45860",
  whatsappNumber: "918882845860",
  location: "India · GMT +5:30",
  profilePhoto: "/images/nityam-profile.jpg",
  // Optional Web3Forms Access Key for direct background email relay (free at web3forms.com)
  web3formsKey: "",
  social: {
    linkedin: "https://www.linkedin.com/in/nityam-rajput-9a6b36307/",
    twitter: "https://x.com/nityam__rajput",
    instagram: "https://www.instagram.com/nityam__rajput/",
    snapchat: "https://www.snapchat.com/add/thenityam12",
  },
  formSubject: "New Call Appointment Request – Nityam Kumar",
  confirmationMessage:
    "Thank you! Your appointment request has been sent successfully. I’ll get back to you soon.",
  copyright:
    "© 2026 Nityam Kumar. All Rights Reserved. HR | AI | Technology | People | Data.",
} as const


// --- Site header ----------------------------------------------------------
// components/site-header.tsx — primary + mobile nav.
export const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "HR + AI", href: "#hr-ai" },
  { label: "Contact", href: "#contact" },
] as const

// --- Practice strip -------------------------------------------------------
// components/practice-strip.tsx — the thin band of practice areas.
export const PRACTICE_AREAS = [
  { k: "01", v: "Talent Acquisition" },
  { k: "02", v: "HR Operations & HRIS" },
  { k: "03", v: "AI & HR Tech" },
  { k: "04", v: "People & Culture" },
  { k: "05", v: "Data & Analytics" },
] as const

// --- HR + AI Flow ---------------------------------------------------------
// components/hr-ai.tsx — visual flow: PEOPLE → DATA → AI → AUTOMATION → BETTER DECISIONS
export type HrAiStep = {
  step: string
  title: string
  subtitle: string
  description: string
  tag: string
}

export const HR_AI_FLOW: readonly HrAiStep[] = [
  {
    step: "01",
    title: "People",
    subtitle: "Talent & Culture",
    description:
      "Understanding human needs, workforce behavior, and organizational culture across the entire employee lifecycle.",
    tag: "Human Core",
  },
  {
    step: "02",
    title: "Data",
    subtitle: "Metrics & HRIS",
    description:
      "Capturing structured metrics, employee records, payroll benchmarks, retention signals, and engagement feedback.",
    tag: "Foundation",
  },
  {
    step: "03",
    title: "AI",
    subtitle: "Intelligence & Insights",
    description:
      "Synthesizing unstructured talent signals, discovering trends, evaluating patterns, and accelerating talent discovery.",
    tag: "Synthesis",
  },
  {
    step: "04",
    title: "Automation",
    subtitle: "Streamlined Workflows",
    description:
      "Eliminating repetitive operational friction, accelerating hiring pipelines, and ensuring statutory compliance.",
    tag: "Execution",
  },
  {
    step: "05",
    title: "Better Decisions",
    subtitle: "Business Impact",
    description:
      "Empowering organizational leadership with data-informed decisions, elevated retention, and impactful employee experiences.",
    tag: "Outcome",
  },
]

// --- Capabilities / Skills & HR Knowledge --------------------------------
// components/capabilities.tsx — the three practice cards.
export const CAPABILITIES = [
  {
    num: "— 01",
    title: "Talent Acquisition & Hiring",
    body: "Strategic recruitment delivery and workforce operations. Driving end-to-end talent sourcing, candidate engagement, and structured hiring pipelines.",
    items: [
      "Talent Acquisition",
      "Recruitment Delivery",
      "Volume & Project Hiring",
      "Employee Engagement",
      "Employee Lifecycle",
      "HR Operations",
    ],
  },
  {
    num: "— 02",
    title: "HR Knowledge & Compliance",
    body: "Strong grounding in statutory compliance, compensation frameworks, payroll operations, and foundational human resource policies.",
    items: [
      "Payroll Fundamentals",
      "Payroll & HRIS",
      "Employee & Employer PF",
      "ESIC Fundamentals",
      "HR Policies & Compliance",
      "Statutory Regulations",
    ],
  },
  {
    num: "— 03",
    title: "AI, Tech & HR Analytics",
    body: "Connecting people, data, and modern technology to streamline HR workflows, leverage automation, and build data-driven processes.",
    items: [
      "AI Intelligence",
      "No-Code App Development",
      "SQL & Excel",
      "Automation Workflows",
      "HR Tech Integration",
      "People Analytics",
    ],
  },
] as const

// --- Experience -----------------------------------------------------------
// components/experience.tsx — editable timeline placeholders.
export type ExperienceItem = {
  index: string
  company: string
  role: string
  duration: string
  responsibilities: readonly string[]
  achievements: readonly string[]
}

export const EXPERIENCES: readonly ExperienceItem[] = [
  {
    index: "01",
    company: "Genpact",
    role: "Human Resources",
    duration: "Current Role · Present",
    responsibilities: [
      "Supporting core HR operations, employee queries, and lifecycle workflows.",
      "Contributing to recruitment delivery, candidate assessment, and day-to-day HR activities.",
      "Facilitating seamless employee management and process coordination.",
    ],
    achievements: [
      "Ensuring consistent HR service delivery and positive employee touchpoints.",
    ],
  },
  {
    index: "02",
    company: "NetAmbit",
    role: "Human Resources Specialist",
    duration: "Oct 2025 – Dec 2025 · Noida",
    responsibilities: [
      "Managed employee database, attendance records, payroll inputs, and HR MIS reports.",
      "Processed and maintained statutory compliance including ESIC and EPF documentation.",
      "Coordinated interview loops, candidate pipelines, and performance management initiatives.",
    ],
    achievements: [
      "Administered Pan-India sales IDs and conducted audits of workforce activity reports.",
    ],
  },
  {
    index: "03",
    company: "MAS Callnet India Pvt. Ltd.",
    role: "Human Resources Specialist — Recruitment",
    duration: "Dec 2024 – Aug 2025 · Noida",
    responsibilities: [
      "Managed the full-cycle recruitment pipeline and fulfilled volume hiring requirements.",
      "Facilitated new-hire onboarding, induction programs, and employee attendance tracking.",
      "Handled exit formalities, notice periods, and full & final (F&F) settlement clearances.",
    ],
    achievements: [
      "Achieved prompt recruitment delivery while maintaining accurate documentation & relieving processes.",
    ],
  },
]

// --- Approach -------------------------------------------------------------
// components/approach.tsx — four core HR methodology steps.
export const APPROACH_STEPS = [
  {
    k: "— Step 01",
    t: "Understand people & business needs",
    d: "Align talent goals directly with business strategy before setting up processes or opening recruitment pipelines.",
  },
  {
    k: "— Step 02",
    t: "Design streamlined employee workflows",
    d: "Build clean, transparent touchpoints from first contact to onboarding, ensuring clarity and compliance.",
  },
  {
    k: "— Step 03",
    t: "Leverage AI, data & automation",
    d: "Apply intelligent tools and analytical models to remove administrative drag and surface actionable workforce insights.",
  },
  {
    k: "— Step 04",
    t: "Refine for continuous engagement",
    d: "Measure outcomes, listen to feedback, and iterate policies to foster enduring growth, retention, and trust.",
  },
] as const

// --- Stack ----------------------------------------------------------------
// components/stack.tsx — the editor-mockup panes. Each item is [name, tag].
export const STACK_PANES = [
  {
    title: "HRIS & Data",
    items: [
      ["HRIS Platforms", "operations"],
      ["MS Excel (Advanced)", "analysis"],
      ["SQL", "database"],
      ["Payroll Systems", "payroll"],
      ["Reporting Dashboards", "metrics"],
    ],
  },
  {
    title: "Talent Acquisition",
    items: [
      ["ATS Platforms", "pipeline"],
      ["LinkedIn Recruiter", "sourcing"],
      ["Job Boards / Portals", "hiring"],
      ["Candidate Scoring", "screening"],
      ["Interview Pipelines", "delivery"],
    ],
  },
  {
    title: "AI & Modern Tools",
    items: [
      ["AI Intelligence", "synthesis"],
      ["No-Code App Dev", "workflows"],
      ["Automation Engines", "integration"],
      ["Document Processing", "extraction"],
    ],
  },
  {
    title: "Compliance & Knowledge",
    items: [
      ["PF Fundamentals", "statutory"],
      ["ESIC Fundamentals", "compliance"],
      ["Payroll & Benefits", "governance"],
      ["Employee Lifecycle", "people operations"],
    ],
  },
] as const

// --- About ----------------------------------------------------------------
// components/contact.tsx (About band) — the meta definition list. [key, value].
export const ABOUT_META = [
  ["Name", "Nityam Singh"],
  ["Role", "HR Professional | AI & HR Tech"],
  ["Location", "India · GMT +5:30"],
  ["Expertise", "Talent Acquisition · HR Operations"],
  ["Tools", "AI Tools · No-Code · SQL & Excel"],
  ["Availability", "Appoint a Call · Open to Connect"],
] as const

// --- Site footer ----------------------------------------------------------
// components/site-footer.tsx — link columns. Each link is [label, href].
export const FOOTER_COLUMNS = [
  {
    title: "Navigation",
    links: [
      ["Home", "#hero"],
      ["About", "#about"],
      ["Skills", "#skills"],
      ["Experience", "#experience"],
      ["HR + AI", "#hr-ai"],
      ["Contact", "#contact"],
    ],
  },
  {
    title: "Direct Inquiries",
    links: [
      ["Email", `mailto:${SITE_CONFIG.email}`],
      ["Snapchat ↗", SITE_CONFIG.social.snapchat],
      ["LinkedIn ↗", SITE_CONFIG.social.linkedin],
      ["Instagram ↗", SITE_CONFIG.social.instagram],
    ],
  },
] as const


