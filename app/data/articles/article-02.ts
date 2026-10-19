import { Article } from "./types"

export const article02: Article = {
  slug: "what-git-actually-saves-when-you-make-a-commit",
  number: "02",
  title: "What Git Actually Saves When You Make a Commit",
  summary:
    "A commit is more than a save button. It records a project snapshot and connects that version to the history around it.",
  category: "Developer Tools",
  publishedAt: "October 2026",
  dateISO: "2026-10-18",
  readTime: "4–5 min read",
  status: "published",
  tags: ["Git", "Developer Tools", "Version Control", "Git Internals"],
  tableOfContents: [
    { id: "git-misconception", title: "1. The Misconception", level: 2 },
    { id: "commit-contains", title: "2. What a Commit Contains", level: 2 },
    { id: "copy-everything", title: "3. Does Git Copy Everything?", level: 2 },
    { id: "commit-explorer", title: "4. Interactive Commit Explorer", level: 2 },
    { id: "why-it-matters", title: "5. Why This Matters", level: 2 },
    { id: "key-takeaway", title: "6. Key Takeaway", level: 2 },
  ],
}
