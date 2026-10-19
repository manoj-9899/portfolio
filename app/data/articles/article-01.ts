import { Article } from "./types"

export const article01: Article = {
  slug: "an-ai-model-can-be-confident-and-still-be-wrong",
  number: "01",
  title: "An AI Model Can Be Confident and Still Be Wrong",
  summary:
    "A convincing answer is easy to mistake for a correct one. The difference is evidence.",
  category: "Artificial Intelligence",
  publishedAt: "October 2026",
  dateISO: "2026-10-19",
  readTime: "4–5 min read",
  status: "published",
  tags: ["Artificial Intelligence", "RAG", "AI Reliability", "Validation"],
  tableOfContents: [
    { id: "confidence-illusion", title: "1. The Confidence Illusion", level: 2 },
    { id: "why-wrong", title: "2. Why AI Gets Things Wrong", level: 2 },
    { id: "improve-reliability", title: "3. How Developers Can Improve Reliability", level: 2 },
    { id: "interactive-example", title: "4. Interactive Example: Can You Trust This Answer?", level: 2 },
    { id: "takeaway", title: "5. The Takeaway", level: 2 },
  ],
}
