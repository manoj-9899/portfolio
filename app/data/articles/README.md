# Articles System & Future Workflow

This directory and the paired `app/components/articles/` directory manage all articles for the developer portfolio.

## Architecture Overview

```text
app/
├── components/articles/
│   ├── index.ts                     # Component registry mapping slugs to React components
│   ├── AIConfidenceArticle.tsx      # Article 01 custom TSX component
│   ├── GitCommitArticle.tsx         # Article 02 custom TSX component
│   └── LeakInvestigationArticle.tsx # Article 03 custom TSX component
└── data/articles/
    ├── types.ts                     # Shared TypeScript interfaces (Article, etc.)
    ├── article-01.ts                # Metadata for Article 01
    ├── article-02.ts                # Metadata for Article 02
    ├── article-03.ts                # Metadata for Article 03
    ├── index.ts                     # Central registry exporting ARTICLES & query helpers
    └── README.md                    # This reference guide
```

## How to Add a Future Article (4 Simple Steps)

### Step 1: Create the Component
Save your `.tsx` article component in `app/components/articles/`:
```text
app/components/articles/MyNewArticle.tsx
```
Include `"use client";` at the top if it uses interactive state (`useState`, `useEffect`, event handlers). Export it as default or named:
```tsx
"use client";

export default function MyNewArticle() {
  return (
    <article className="mx-auto w-full max-w-3xl px-5 py-8">
      {/* Article content */}
    </article>
  );
}
```

### Step 2: Register the Component
In `app/components/articles/index.ts`, import your component and add it to `ARTICLE_COMPONENTS`:
```typescript
import MyNewArticle from "./MyNewArticle"

export const ARTICLE_COMPONENTS: Record<string, ComponentType> = {
  // ... existing components
  "my-new-article-slug": MyNewArticle,
}
```

### Step 3: Create the Metadata File
In `app/data/articles/`, create `article-04.ts`:
```typescript
import { Article } from "./types"

export const article04: Article = {
  slug: "my-new-article-slug",
  number: "04",
  title: "My New Article Title",
  summary: "A concise 1-2 sentence description shown in cards and search previews.",
  category: "Distributed Systems",
  publishedAt: "November 2026",
  dateISO: "2026-11-01",
  readTime: "5 min read",
  status: "published", // "published" | "draft"
  tags: ["Distributed Systems", "Cloud"],
}
```

### Step 4: Add to the Registry
In `app/data/articles/index.ts`, import `article04` and append it to `ARTICLES`:
```typescript
import { article04 } from "./article-04"

export const ARTICLES: Article[] = [
  article01,
  article02,
  article03,
  article04,
]
```

### What happens automatically:
* The full article listing at `/articles` displays the new entry.
* The route `/articles/my-new-article-slug` is automatically statically pre-rendered.
* Metadata, canonical tags, OpenGraph cards, and `/sitemap.xml` are generated.
* Drafts (`status: "draft"`) are excluded from public listings and sitemaps until marked `"published"`.
