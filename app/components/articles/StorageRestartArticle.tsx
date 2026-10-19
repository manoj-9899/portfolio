'use client';

import React, { useState } from 'react';

// ==========================================
// Types
// ==========================================
interface SimulatedRecord {
  id: string;
  name: string;
  timestamp: string;
}

interface StorageState {
  memory: SimulatedRecord[];
  localStorage: SimulatedRecord[];
  indexedDB: SimulatedRecord[];
}

type OriginPort = '5173' | '5174';

interface ChecklistItem {
  id: string;
  question: string;
  detail: string;
}

// ==========================================
// Sub-Component: Storage Playground Demo
// ==========================================
export const StorageRestartDemo: React.FC = () => {
  const [port, setPort] = useState<OriginPort>('5173');
  const [recordCounter, setRecordCounter] = useState<number>(1);
  const [lastAction, setLastAction] = useState<string>(
    'Ready. Add a sample encrypted package to test persistence across lifecycle events.'
  );

  const [storageByPort, setStorageByPort] = useState<Record<OriginPort, StorageState>>({
    '5173': {
      memory: [{ id: 'pkg-01', name: 'auth_bundle_v1.enc', timestamp: '10:14:02' }],
      localStorage: [{ id: 'pkg-01', name: 'auth_bundle_v1.enc', timestamp: '10:14:02' }],
      indexedDB: [{ id: 'pkg-01', name: 'auth_bundle_v1.enc', timestamp: '10:14:02' }],
    },
    '5174': {
      memory: [],
      localStorage: [],
      indexedDB: [],
    },
  });

  const currentStorage = storageByPort[port];

  const getFormattedTime = () => {
    const now = new Date();
    return now.toTimeString().split(' ')[0];
  };

  const handleAddRecord = () => {
    const nextNum = recordCounter + 1;
    const newRecord: SimulatedRecord = {
      id: `pkg-0${nextNum}`,
      name: `doc_payload_v${nextNum}.enc`,
      timestamp: getFormattedTime(),
    };

    setStorageByPort((prev) => ({
      ...prev,
      [port]: {
        memory: [...prev[port].memory, newRecord],
        localStorage: [...prev[port].localStorage, newRecord],
        indexedDB: [...prev[port].indexedDB, newRecord],
      },
    }));
    setRecordCounter(nextNum);
    setLastAction(`Wrote "${newRecord.name}" to Memory, localStorage, and IndexedDB on localhost:${port}.`);
  };

  const handleSimulateReload = () => {
    setStorageByPort((prev) => ({
      ...prev,
      [port]: {
        ...prev[port],
        memory: [], // Ephemeral RAM state cleared
      },
    }));
    setLastAction(
      `Simulated Page Reload on localhost:${port}. In-memory state cleared; disk storage remained intact.`
    );
  };

  const handleRestartSameOrigin = () => {
    setStorageByPort((prev) => ({
      ...prev,
      [port]: {
        ...prev[port],
        memory: [],
      },
    }));
    setLastAction(
      `Simulated App Restart on same origin (localhost:${port}). Memory reset; IndexedDB and localStorage persisted.`
    );
  };

  const handleRestartNewPort = () => {
    const nextPort: OriginPort = port === '5173' ? '5174' : '5173';
    setStorageByPort((prev) => ({
      ...prev,
      [nextPort]: {
        ...prev[nextPort],
        memory: [],
      },
    }));
    setPort(nextPort);
    setLastAction(
      `Simulated Server Restart with port switch (localhost:${port} → localhost:${nextPort}). Browser treats this as a separate origin with an empty storage partition.`
    );
  };

  const handleReset = () => {
    const initialRecord: SimulatedRecord = {
      id: 'pkg-01',
      name: 'auth_bundle_v1.enc',
      timestamp: '10:14:02',
    };
    setPort('5173');
    setRecordCounter(1);
    setStorageByPort({
      '5173': {
        memory: [initialRecord],
        localStorage: [initialRecord],
        indexedDB: [initialRecord],
      },
      '5174': {
        memory: [],
        localStorage: [],
        indexedDB: [],
      },
    });
    setLastAction('Simulation reset to initial state on localhost:5173.');
  };

  const buckets = [
    {
      key: 'memory' as const,
      title: 'In-Memory State',
      subtitle: 'React useState / RAM',
      badge: 'Volatile',
      data: currentStorage.memory,
      emptyNote: 'Cleared on reload or restart',
    },
    {
      key: 'localStorage' as const,
      title: 'localStorage',
      subtitle: 'Synchronous Key-Value',
      badge: 'Origin-Scoped',
      data: currentStorage.localStorage,
      emptyNote: `No keys for :${port}`,
    },
    {
      key: 'indexedDB' as const,
      title: 'IndexedDB',
      subtitle: 'Async Object Store',
      badge: 'Origin-Scoped',
      data: currentStorage.indexedDB,
      emptyNote: `No records in DB for :${port}`,
    },
  ];

  return (
    <section
      aria-labelledby="playground-heading"
      className="my-8 rounded-xl border border-slate-200 bg-slate-50/70 p-5 sm:p-6"
    >
      <div className="flex flex-col justify-between gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-center">
        <div>
          <h3 id="playground-heading" className="text-base font-semibold text-slate-900">
            Interactive Storage Simulator
          </h3>
          <p className="text-xs text-slate-600">
            Self-contained sandbox — does not read or touch your actual browser storage.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 self-start rounded border border-slate-300 bg-white px-2.5 py-1 font-mono text-xs text-slate-800 sm:self-auto">
          <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
          <span>Origin: http://localhost:{port}</span>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Simulation controls">
        <button
          type="button"
          onClick={handleAddRecord}
          className="rounded bg-slate-900 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
        >
          + Add Sample Record
        </button>
        <button
          type="button"
          onClick={handleSimulateReload}
          className="rounded border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
        >
          Simulate Page Reload
        </button>
        <button
          type="button"
          onClick={handleRestartSameOrigin}
          className="rounded border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
        >
          Reopen App (Same Port)
        </button>
        <button
          type="button"
          onClick={handleRestartNewPort}
          className="rounded border border-amber-300 bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-900 transition hover:bg-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
        >
          Restart Server (Switch Port :{port === '5173' ? '5174' : '5173'})
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="ml-auto rounded px-2.5 py-1.5 text-xs font-medium text-slate-500 underline-offset-2 hover:text-slate-800 hover:underline focus:outline-none focus:ring-2 focus:ring-slate-500"
        >
          Reset Demo
        </button>
      </div>

      <div
        role="status"
        aria-live="polite"
        className="mt-4 rounded border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-700"
      >
        <span className="font-semibold text-slate-900">Event Log: </span>
        {lastAction}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        {buckets.map((bucket) => (
          <div
            key={bucket.key}
            className="flex flex-col justify-between rounded-lg border border-slate-200 bg-white p-3.5"
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900">
                  {bucket.title}
                </h4>
                <span className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[10px] text-slate-600">
                  {bucket.badge}
                </span>
              </div>
              <p className="mt-0.5 text-[11px] text-slate-500">{bucket.subtitle}</p>

              <div className="mt-3 min-h-[104px] space-y-1.5">
                {bucket.data.length === 0 ? (
                  <div className="flex h-[104px] items-center justify-center rounded border border-dashed border-slate-200 p-2 text-center text-xs text-slate-400">
                    {bucket.emptyNote}
                  </div>
                ) : (
                  bucket.data.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between rounded border border-slate-100 bg-slate-50 px-2.5 py-1.5 font-mono text-xs text-slate-800"
                    >
                      <span className="truncate">{item.name}</span>
                      <span className="ml-2 shrink-0 text-[10px] text-slate-400">
                        {item.timestamp}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="mt-3 border-t border-slate-100 pt-2 text-right font-mono text-[11px] text-slate-500">
              Records: {bucket.data.length}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-3 text-[11px] leading-relaxed text-slate-500">
        Note: Real browser persistence depends on your hydration implementation, the exact origin
        (<code className="font-mono text-slate-700">protocol + host + port</code>), and browser
        eviction policies.
      </p>
    </section>
  );
};

// ==========================================
// Sub-Component: Storage Debug Checklist
// ==========================================
const CHECKLIST_ITEMS: ChecklistItem[] = [
  {
    id: 'origin-port',
    question: 'Is the application running on the exact same origin and port?',
    detail:
      'Compare protocol, hostname, and port (e.g., localhost:5173 vs localhost:5174 or 127.0.0.1). Any change creates a completely isolated IndexedDB partition.',
  },
  {
    id: 'db-store-exists',
    question: 'Does the expected IndexedDB database and object store exist?',
    detail:
      'Open DevTools → Application → Storage → IndexedDB. Verify the database name, version number, and object store schema match your code.',
  },
  {
    id: 'record-present',
    question: 'Is the expected record physically present in the object store?',
    detail:
      'Click the refresh icon in the IndexedDB panel after writing data to verify the record was written to disk.',
  },
  {
    id: 'tx-complete',
    question: 'Did the write transaction complete without aborting?',
    detail:
      'Ensure you await transaction.oncomplete (or its promise wrapper) before triggering a page reload or unmounting.',
  },
  {
    id: 'ui-hydration',
    question: 'Is the UI hydrating from IndexedDB on mount, or reading only from memory?',
    detail:
      'Verify that an initialization effect queries IndexedDB and loads existing records into React state when the component mounts.',
  },
  {
    id: 'cleanup-logic',
    question: 'Is any initialization logic clearing existing data?',
    detail:
      'Search your codebase for deleteDatabase(), objectStore.clear(), or dev-server boot routines that may reset state on startup.',
  },
];

export const StorageDebugChecklist: React.FC = () => {
  const [checkedIds, setCheckedIds] = useState<Record<string, boolean>>({});

  const toggleItem = (id: string) => {
    setCheckedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const resetChecklist = () => {
    setCheckedIds({});
  };

  const completedCount = Object.values(checkedIds).filter(Boolean).length;

  return (
    <div className="my-6 rounded-xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-200 pb-3.5">
        <div>
          <h3 className="text-base font-semibold text-slate-900">
            Persistence Diagnostic Checklist
          </h3>
          <p className="text-xs text-slate-500">
            Step through these checks sequentially before refactoring your storage layer.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="rounded bg-slate-100 px-2.5 py-1 font-mono text-xs font-medium text-slate-700">
            {completedCount} / {CHECKLIST_ITEMS.length} verified
          </span>
          {completedCount > 0 && (
            <button
              type="button"
              onClick={resetChecklist}
              className="rounded px-1 text-xs font-medium text-slate-500 underline-offset-2 hover:text-slate-800 hover:underline focus:outline-none focus:ring-2 focus:ring-slate-500"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      <ul className="mt-3 divide-y divide-slate-100">
        {CHECKLIST_ITEMS.map((item) => {
          const isChecked = !!checkedIds[item.id];
          return (
            <li key={item.id} className="py-3 first:pt-1 last:pb-1">
              <label
                htmlFor={item.id}
                className="group flex cursor-pointer items-start gap-3.5 select-none"
              >
                <input
                  id={item.id}
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleItem(item.id)}
                  className="mt-1 h-4 w-4 shrink-0 rounded border-slate-300 text-slate-900 focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
                />
                <div className="text-sm">
                  <span
                    className={`font-medium transition ${
                      isChecked
                        ? 'text-slate-400 line-through'
                        : 'text-slate-900 group-hover:text-slate-700'
                    }`}
                  >
                    {item.question}
                  </span>
                  <p
                    className={`mt-1 text-xs leading-relaxed ${
                      isChecked ? 'text-slate-400' : 'text-slate-600'
                    }`}
                  >
                    {item.detail}
                  </p>
                </div>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

// ==========================================
// Main Article Content (renders inside [slug]/page.tsx)
// ==========================================
export const StorageRestartContent: React.FC = () => {
  return (
    <div className="space-y-12 text-base leading-relaxed text-slate-700">
      {/* 1. The Problem */}
      <section id="section-problem" aria-labelledby="section-problem-heading" className="space-y-4">
        <h2
          id="section-problem-heading"
          className="text-2xl font-medium tracking-tight text-slate-900 sm:text-3xl"
        >
          1. The Problem
        </h2>
        <p>
          During a recent build for project <strong className="font-semibold text-slate-900">SIH 26237</strong>,
          everything appeared to function smoothly in the browser. Users could upload documents,
          generate encrypted packages, and track their workflow progress across the application.
        </p>
        <p>
          Then I stopped the local development server and ran it again. When the application reopened,
          the workspace was empty: uploaded documents, encrypted packages, and progress records were
          gone. When an application loses data across restarts, the immediate assumption is often
          that storage failed—but the real issue usually lives in the seam between browser origins,
          storage layers, and startup hydration.
        </p>
      </section>

      {/* 2. Where Does Web App Data Live? */}
      <section id="section-storage-layers" aria-labelledby="section-storage-layers-heading" className="space-y-4">
        <h2
          id="section-storage-layers-heading"
          className="text-2xl font-medium tracking-tight text-slate-900 sm:text-3xl"
        >
          2. Where Does Web App Data Live?
        </h2>
        <p>
          Client-side web applications typically handle data across three distinct storage tiers:
        </p>

        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-600">
              <tr>
                <th className="px-4 py-3 font-semibold">Storage Layer</th>
                <th className="px-4 py-3 font-semibold">Best For</th>
                <th className="px-4 py-3 font-semibold">Survives Reload / Restart?</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white text-xs sm:text-sm">
              <tr>
                <td className="px-4 py-3 font-mono font-medium text-slate-900">
                  In-Memory (React State)
                </td>
                <td className="px-4 py-3 text-slate-600">
                  Active UI interactions, temporary forms
                </td>
                <td className="px-4 py-3 font-medium text-rose-700">
                  No — wiped on refresh or restart
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono font-medium text-slate-900">localStorage</td>
                <td className="px-4 py-3 text-slate-600">
                  Small synchronous strings, tokens, themes
                </td>
                <td className="px-4 py-3 font-medium text-emerald-700">
                  Yes — scoped to exact origin
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono font-medium text-slate-900">IndexedDB</td>
                <td className="px-4 py-3 text-slate-600">
                  Structured records, binary blobs, encrypted files
                </td>
                <td className="px-4 py-3 font-medium text-emerald-700">
                  Yes — scoped to exact origin
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          Both <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-sm text-slate-800">localStorage</code> and{' '}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-sm text-slate-800">IndexedDB</code> are strictly bound to
          the browser&apos;s <strong>Same-Origin Policy</strong>: the tuple of scheme, host, and port
          (such as <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-sm text-slate-800">http://localhost:5173</code>).
          If Vite or Next.js starts on port <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-sm text-slate-800">:5174</code> instead,
          the browser treats it as an entirely separate domain with an empty storage sandbox.
        </p>
      </section>

      {/* 3. Try It Yourself */}
      <section id="section-try-it" aria-labelledby="section-try-it-heading" className="space-y-4">
        <h2
          id="section-try-it-heading"
          className="text-2xl font-medium tracking-tight text-slate-900 sm:text-3xl"
        >
          3. Try It Yourself
        </h2>
        <p>
          Use this interactive sandbox to see how records behave across page reloads, same-origin
          restarts, and port shifts.
        </p>

        <StorageRestartDemo />
      </section>

      {/* 4. How I Investigated It */}
      <section id="section-investigation" aria-labelledby="section-investigation-heading" className="space-y-4">
        <h2
          id="section-investigation-heading"
          className="text-2xl font-medium tracking-tight text-slate-900 sm:text-3xl"
        >
          4. How I Investigated It
        </h2>
        <p>
          When diagnosing the disappearance of packages in <strong>SIH 26237</strong>, the goal
          was to separate verified facts observed in DevTools from unproven hypotheses.
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
              Verified Facts
            </h3>
            <ul className="mt-3 list-disc space-y-2 pl-4 text-sm text-slate-700">
              <li>The application was set up to write persistent data into IndexedDB.</li>
              <li>
                An IndexedDB database instance was present and visible in DevTools during the session.
              </li>
              <li>
                A package record was observed directly inside the object store immediately after encryption.
              </li>
            </ul>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-amber-800">
              Open Hypotheses
            </h3>
            <ul className="mt-3 list-disc space-y-2 pl-4 text-sm text-slate-700">
              <li>
                <strong>Port shift:</strong> It was not conclusively verified whether the dev server
                rebound to the exact same port after restarting.
              </li>
              <li>
                <strong>Missing hydration:</strong> The UI might have initialized state to empty arrays
                without executing an initial load query from IndexedDB.
              </li>
              <li>
                <strong>Transaction lifecycle:</strong> Write operations may not have completed their
                commit cycle prior to shutdown.
              </li>
            </ul>
          </div>
        </div>

        <aside className="rounded-xl border-l-4 border-slate-900 bg-slate-50 p-4 text-sm text-slate-700">
          <strong className="font-semibold text-slate-900">Current status:</strong> Because the
          exact port and startup hydration stack were not recorded prior to the restart, the root cause
          remains an open investigation rather than a confirmed bug fix.
        </aside>
      </section>

      {/* 5. A Practical Debugging Checklist */}
      <section id="section-checklist" aria-labelledby="section-checklist-heading" className="space-y-4">
        <h2
          id="section-checklist-heading"
          className="text-2xl font-medium tracking-tight text-slate-900 sm:text-3xl"
        >
          5. A Practical Debugging Checklist
        </h2>
        <p>
          When data fails to persist across restarts, use this interactive checklist to diagnose
          the issue systematically:
        </p>

        <StorageDebugChecklist />
      </section>

      {/* 6. The Takeaway */}
      <section id="section-takeaway" aria-labelledby="section-takeaway-heading" className="space-y-4 border-t border-slate-200 pt-8">
        <h2
          id="section-takeaway-heading"
          className="text-2xl font-medium tracking-tight text-slate-900 sm:text-3xl"
        >
          6. The Takeaway
        </h2>
        <p>
          When data vanishes after a restart, do not assume the database broke. First verify where
          the browser is looking (the origin and port), confirm what is physically committed to disk,
          and inspect how your React state populates on initial mount. Systematic debugging across the
          full persistence lifecycle saves hours of speculative refactoring.
        </p>
      </section>
    </div>
  );
};

// ==========================================
// Standalone Full Article Component (Optional)
// ==========================================
export const StorageRestartArticle: React.FC = () => {
  return (
    <article className="mx-auto max-w-3xl px-4 py-10 text-slate-800 antialiased sm:px-6 lg:py-14">
      <header className="border-b border-slate-200 pb-8">
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500">
          <span>Engineering Notebook</span>
          <span aria-hidden="true">·</span>
          <span>4 min read</span>
          <span aria-hidden="true">·</span>
          <div className="flex flex-wrap gap-1.5">
            {['React', 'TypeScript', 'IndexedDB', 'Debugging'].map((tag) => (
              <span
                key={tag}
                className="rounded bg-slate-100 px-2 py-0.5 font-mono text-[11px] text-slate-700"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Why Does My App Forget Everything When I Restart It?
        </h1>
        <p className="mt-3 text-lg leading-relaxed text-slate-600">
          A practical look at browser storage, persistence, and debugging.
        </p>
      </header>

      <div className="mt-8">
        <StorageRestartContent />
      </div>
    </article>
  );
};

export default StorageRestartArticle;
