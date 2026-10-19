import { Article } from "./types"

export const article03: Article = {
  slug: "encryption-protects-a-document-what-helps-trace-a-leak",
  number: "03",
  title: "Encryption Protects a Document. What Helps Trace a Leak?",
  summary:
    "Protecting a document and investigating how it was leaked are different security problems. A defensible approach combines controls that protect data with evidence that can be checked later.",
  category: "Security Engineering",
  publishedAt: "October 2026",
  dateISO: "2026-10-17",
  readTime: "4–5 min read",
  status: "published",
  tags: [
    "Confidentiality",
    "Integrity",
    "Forensic evidence",
    "Post-quantum cryptography",
  ],
  relatedProjects: [
    {
      title: "Post-Quantum Document Security Enclave",
      description:
        "Client-side document encryption and verifiable protection built for SIH.",
      href: "https://github.com/manoj-9899/sih",
      isExternal: true,
    },
  ],
}
