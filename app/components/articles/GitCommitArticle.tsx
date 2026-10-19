"use client";

import { useState, type ReactNode } from "react";

type CommitExample = {
  id: string;
  shortId: string;
  title: string;
  message: string;
  parent: string;
  files: string[];
  changes: string[];
  history: string;
};

const commits: CommitExample[] = [
  {
    id: "a17c0de",
    shortId: "a17c0de",
    title: "Initial project",
    message: "Create starter page and base styles",
    parent: "None — root commit",
    files: ["index.html", "style.css"],
    changes: [
      "Create the first page structure in index.html.",
      "Add the initial stylesheet in style.css.",
    ],
    history:
      "This is the starting point of the example history. There is no parent commit, so Git has no earlier snapshot to follow from this commit.",
  },
  {
    id: "b29f41a",
    shortId: "b29f41a",
    title: "Add navigation",
    message: "Add responsive site navigation",
    parent: "a17c0de — Initial project",
    files: ["index.html", "style.css"],
    changes: [
      "Add navigation markup to index.html.",
      "Update style.css with layout rules for the navigation.",
    ],
    history:
      "This commit points to its own project snapshot and names a17c0de as its parent. Following that parent takes you back to the initial project version.",
  },
  {
    id: "c38d5ef",
    shortId: "c38d5ef",
    title: "Improve styling",
    message: "Refine spacing and typography",
    parent: "b29f41a — Add navigation",
    files: ["index.html", "style.css"],
    changes: [
      "Adjust spacing and typography in style.css.",
      "Keep the page and navigation markup in index.html in the snapshot.",
    ],
    history:
      "This version links to b29f41a, which links to a17c0de. The parent chain gives Git a path through the project's recorded history.",
  },
];

export default function GitCommitArticle() {
  const [selectedCommitId, setSelectedCommitId] = useState(commits[1].id);
  const selectedCommit =
    commits.find((commit) => commit.id === selectedCommitId) ?? commits[0];

  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-8 text-current sm:px-6 sm:py-10 lg:py-14">
      <header className="mb-10 border-b border-current/15 pb-7 sm:mb-12 sm:pb-9">
        <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-current/65">
          <span>Developer Tools</span>
          <span aria-hidden="true">·</span>
          <span>4–5 min read</span>
          <span aria-hidden="true">·</span>
          <span>Git internals</span>
        </div>
        <h1 className="max-w-2xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-5xl">
          What Git Actually Saves When You Make a Commit
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-current/75 sm:text-xl">
          A commit is more than a save button. It records a project snapshot and
          connects that version to the history around it.
        </p>
      </header>

      <div className="space-y-10 sm:space-y-12">
        <section aria-labelledby="git-misconception">
          <SectionHeading id="git-misconception" number="01">
            The misconception
          </SectionHeading>
          <div className="space-y-4 text-base leading-7 text-current/80 sm:text-[1.0625rem] sm:leading-8">
            <p>
              You change a few lines of code, run <InlineCode>git add .</InlineCode>, and type{" "}
              <InlineCode>git commit</InlineCode>. But what did Git actually save?
            </p>
            <p>
              A commit does not upload your project or simply freeze whatever is
              open in your editor. It records a snapshot of the content you
              staged, plus metadata and a link to earlier history. Saving edits
              a file, staging selects what goes into the next commit, and
              committing records that staged version in the repository. An
              unstaged edit or a new file you have not added yet will not be
              included in that commit.
            </p>
          </div>
        </section>

        <section aria-labelledby="commit-contains">
          <SectionHeading id="commit-contains" number="02">
            What a commit contains
          </SectionHeading>
          <div className="space-y-4 text-base leading-7 text-current/80 sm:text-[1.0625rem] sm:leading-8">
            <p>
              A commit points to a top-level <InlineCode>tree</InlineCode> object, which describes the
              directory structure and references tracked-file objects. It also
              records parent commit ID(s), author and committer details, both
              timestamps, and a commit message.
            </p>
            <p>
              The <strong className="font-semibold text-current">author</strong> is credited with making the change; the{" "}
              <strong className="font-semibold text-current">committer</strong> created the commit. They can differ when someone applies
              another developer’s patch. These names, email addresses, and
              timestamps are metadata—not proof of real-world identity.
            </p>
            <p>
              The message describes the purpose of the change. Parent links
              connect history: a root commit has no parent, a usual commit has
              one, and a merge commit can have multiple parents.
            </p>
          </div>
          <div className="mt-5 overflow-hidden rounded-xl border border-current/15 bg-current/[0.035]">
            <div className="flex items-center justify-between gap-3 border-b border-current/10 px-4 py-3">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-current/60">
                Simplified commit shape
              </span>
              <span className="text-xs text-current/55">Illustrative</span>
            </div>
            <pre className="overflow-x-auto px-4 py-4 text-sm leading-6 text-current/80"><code>{`tree      <tree-object-id>
parent    <parent-commit-id>
author    <name, email, timestamp>
committer <name, email, timestamp>

Add responsive navigation`}</code></pre>
            <p className="border-t border-current/10 px-4 py-3 text-sm leading-6 text-current/65">
              A root commit has no <InlineCode>parent</InlineCode> line. Merge commits can contain more than one.
            </p>
          </div>
        </section>

        <section aria-labelledby="copy-everything">
          <SectionHeading id="copy-everything" number="03">
            Does Git copy everything?
          </SectionHeading>
          <div className="space-y-4 text-base leading-7 text-current/80 sm:text-[1.0625rem] sm:leading-8">
            <p>
              Git uses three main object types: <strong className="font-semibold text-current">blobs</strong> hold file contents; <strong className="font-semibold text-current">trees</strong>
              represent directories and reference files or subdirectories; and <strong className="font-semibold text-current">commits</strong>
              point to a tree and record its place in history.
            </p>
            <p>
              A blob holds file bytes, not its filename; the tree records each
              path and points to the relevant object. Identical content can
              therefore be referenced from more than one path or commit rather
              than requiring a separate copy each time. Changed content gets a
              different blob at the object-model level; the commit object does
              not simply store changed lines.
            </p>
            <p>
              Git can compress objects and combine them into <InlineCode>packfiles</InlineCode>, using delta
              compression to store related versions more efficiently. That is a
              storage optimization, not the conceptual commit model.
            </p>
            <p>
              The model stays snapshot-oriented even though <InlineCode>git diff</InlineCode> shows line-by-line
              changes. Git calculates a diff by comparing trees—often a commit
              with its parent. That diff is a view of the difference, not the
              commit object’s main payload.
            </p>
          </div>
        </section>

        <section aria-labelledby="commit-explorer">
          <SectionHeading id="commit-explorer" number="04">
            Interactive commit explorer
          </SectionHeading>
          <div className="space-y-4 text-base leading-7 text-current/80 sm:text-[1.0625rem] sm:leading-8">
            <p>
              Select a point in this fictional website history to inspect its
              message, parent, and snapshot files. Change notes are explanatory
              summaries, not diffs stored inside the commit object.
            </p>
          </div>

          <div className="mt-6 rounded-2xl border border-current/15 p-4 sm:p-6">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-current">Website history</p>
                <p className="mt-1 text-sm text-current/60">Three illustrative commits</p>
              </div>
              <span className="rounded-full border border-current/15 px-3 py-1 text-xs text-current/65">
                Not a live repository
              </span>
            </div>

            <div
              className="grid grid-cols-1 gap-2 sm:grid-cols-3"
              role="group"
              aria-label="Select a commit in the illustrative website history"
            >
              {commits.map((commit, index) => {
                const isSelected = selectedCommit.id === commit.id;
                return (
                  <button
                    key={commit.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setSelectedCommitId(commit.id)}
                    className={`group min-w-0 rounded-xl border p-3 text-left transition-colors duration-150 motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current ${
                      isSelected
                        ? "border-current/45 bg-current/[0.07]"
                        : "border-current/15 hover:border-current/30 hover:bg-current/[0.035]"
                    }`}
                  >
                    <span className="flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold uppercase tracking-[0.12em] text-current/55">
                        Commit {String.fromCharCode(65 + index)}
                      </span>
                      <span
                        aria-hidden="true"
                        className={`h-2 w-2 shrink-0 rounded-full border border-current/50 ${
                          isSelected ? "bg-current" : "bg-transparent"
                        }`}
                      />
                    </span>
                    <span className="mt-2 block break-words text-sm font-semibold leading-5 text-current">
                      {commit.title}
                    </span>
                    <span className="mt-2 block font-mono text-xs text-current/60">
                      {commit.shortId}
                    </span>
                  </button>
                );
              })}
            </div>

            <p className="sr-only" aria-live="polite" aria-atomic="true">
              Selected commit {String.fromCharCode(65 + commits.findIndex((commit) => commit.id === selectedCommit.id))}: {selectedCommit.title}.
            </p>
            <div className="mt-5 rounded-xl bg-current/[0.035] p-4 sm:p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-mono text-xs text-current/60">{selectedCommit.shortId}</p>
                  <h3 className="mt-1 text-xl font-semibold tracking-tight text-current sm:text-2xl">
                    {selectedCommit.title}
                  </h3>
                </div>
                <span className="rounded-md border border-current/15 px-2.5 py-1 text-xs text-current/65">
                  Commit {String.fromCharCode(65 + commits.findIndex((commit) => commit.id === selectedCommit.id))}
                </span>
              </div>

              <div className="mt-5 grid gap-4 border-t border-current/10 pt-4 sm:grid-cols-2 sm:gap-5">
                <div className="min-w-0">
                  <h4 className="text-xs font-semibold uppercase tracking-[0.12em] text-current/55">
                    Commit message
                  </h4>
                  <p className="mt-2 break-words text-sm leading-6 text-current/85">
                    {selectedCommit.message}
                  </p>
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-semibold uppercase tracking-[0.12em] text-current/55">
                    Parent commit
                  </h4>
                  <p className="mt-2 break-words text-sm leading-6 text-current/85">
                    {selectedCommit.parent}
                  </p>
                </div>
              </div>

              <div className="mt-5 border-t border-current/10 pt-4">
                <h4 className="text-xs font-semibold uppercase tracking-[0.12em] text-current/55">
                  Files in this snapshot
                </h4>
                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedCommit.files.map((file) => (
                    <span
                      key={file}
                      className="max-w-full break-all rounded-md border border-current/15 px-2.5 py-1 font-mono text-xs text-current/80"
                    >
                      {file}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5 border-t border-current/10 pt-4">
                <h4 className="text-xs font-semibold uppercase tracking-[0.12em] text-current/55">
                  Example changes
                </h4>
                <ul className="mt-2 space-y-2 text-sm leading-6 text-current/80">
                  {selectedCommit.changes.map((change) => (
                    <li key={change} className="flex gap-2">
                      <span aria-hidden="true" className="mt-0.5 text-current/50">↳</span>
                      <span>{change}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 border-t border-current/10 pt-4">
                <h4 className="text-xs font-semibold uppercase tracking-[0.12em] text-current/55">
                  How it connects
                </h4>
                <p className="mt-2 text-sm leading-6 text-current/80">
                  {selectedCommit.history}
                </p>
              </div>
            </div>
          </div>
          <p className="mt-3 text-xs leading-5 text-current/55">
            The IDs are invented for this demonstration. The files and change
            summaries illustrate the project’s evolution; they are not a live
            repository or literal commit-object contents.
          </p>
        </section>

        <section aria-labelledby="why-it-matters">
          <SectionHeading id="why-it-matters" number="05">
            Why this matters
          </SectionHeading>
          <div className="space-y-4 text-base leading-7 text-current/80 sm:text-[1.0625rem] sm:leading-8">
            <p>
              When a bug appears, comparing commits can help narrow down when
              behaviour changed. Clear messages and a readable sequence make
              code review easier, while earlier snapshots give you a known state
              to inspect or restore when a new approach causes trouble.
            </p>
            <p>
              A local commit is not a backup. If the machine or repository is
              lost, local history may go with it. Pushing to a remote creates
              another copy, subject to the remote’s availability and access
              controls.
            </p>
          </div>
        </section>

        <section aria-labelledby="key-takeaway" className="border-t border-current/15 pt-7 sm:pt-8">
          <SectionHeading id="key-takeaway" number="06">
            Key takeaway
          </SectionHeading>
          <p className="text-base leading-7 text-current/80 sm:text-[1.0625rem] sm:leading-8">
            A Git commit records a structured snapshot, metadata, and links to
            earlier commits. Git can reuse identical content and optimize object
            storage, while comparison tools calculate differences between
            versions. That structure makes history practical for inspecting,
            reviewing, and managing software changes.
          </p>
        </section>
      </div>
    </article>
  );
}

function SectionHeading({
  id,
  number,
  children,
}: {
  id: string;
  number: string;
  children: ReactNode;
}) {
  return (
    <div className="mb-4 flex items-start gap-3 sm:mb-5">
      <span className="pt-1 font-mono text-xs tracking-[0.12em] text-current/50">
        {number}
      </span>
      <h2 id={id} className="text-xl font-semibold tracking-tight text-current sm:text-2xl">
        {children}
      </h2>
    </div>
  );
}

function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded bg-current/[0.07] px-1.5 py-0.5 font-mono text-[0.88em] text-current">
      {children}
    </code>
  );
}
