"use client";

import { useId, useRef, useState } from "react";
import type { KeyboardEvent, ReactNode } from "react";

type Stage = {
  number: string;
  name: string;
  eyebrow: string;
  summary: string;
  details: string[];
  artifacts: string[];
};

const stages: Stage[] = [
  {
    number: "01",
    name: "Protect",
    eyebrow: "Confidentiality + key establishment",
    summary:
      "Encrypt the document with authenticated encryption, and establish the encryption key through a separate, appropriate key-management process.",
    details: [
      "AES-256-GCM encrypts content and authenticates it, including any associated metadata supplied to the operation.",
      "ML-KEM-768 can help two parties establish a shared secret; it does not encrypt the document by itself.",
    ],
    artifacts: ["Ciphertext + authentication tag", "Key-establishment output", "Authenticated metadata"],
  },
  {
    number: "02",
    name: "Distribute",
    eyebrow: "Recipient context + accountable events",
    summary:
      "Connect a protected package to a verified recipient and a specific distribution event, without treating a recipient label as proof of identity.",
    details: [
      "Record the package identifier, recipient context, time, and relevant integrity metadata using controls appropriate to the threat model.",
      "A digital signature can protect signed data against undetected modification and help authenticate its signer when identity and keys are properly managed.",
    ],
    artifacts: ["Recipient / package association", "Signed metadata, where used", "Protected distribution record"],
  },
  {
    number: "03",
    name: "Investigate",
    eyebrow: "Corroboration + evidence handling",
    summary:
      "Compare a recovered copy with trusted references, examine any watermark, and correlate the findings with well-protected records.",
    details: [
      "A watermark match may suggest which distribution is associated with a copy, but it can be degraded, removed, transferred, or misinterpreted.",
      "Hash and signature checks answer specific integrity questions. The strength of a conclusion depends on evidence provenance and independent corroboration.",
    ],
    artifacts: ["Recovered copy + handling notes", "Hash / signature verification results", "Correlated audit events"],
  },
];

const mechanisms = [
  {
    name: "AES-256-GCM",
    role: "Authenticated encryption",
    description:
      "Encrypts data and detects tampering with the ciphertext or authenticated associated data. It does not stop an authorized recipient from copying plaintext.",
  },
  {
    name: "SHA-256",
    role: "Cryptographic hash",
    description:
      "Produces a digest for comparison with a trusted reference. A hash by itself neither identifies the author nor proves when a file existed.",
  },
  {
    name: "Digital signatures",
    role: "Integrity + signer authentication",
    description:
      "A valid signature links signed data to a signing key. Reliable identity claims also depend on key ownership, validation, and context.",
  },
  {
    name: "Forensic watermarking",
    role: "Copy / distribution signal",
    description:
      "Embeds identifying information that may associate a recovered copy with a recipient or distribution event, depending on its design and resilience.",
  },
  {
    name: "Audit trails",
    role: "Event records",
    description:
      "Capture relevant actions and timestamps for later correlation. Their value depends on access controls, integrity protection, retention, and provenance.",
  },
];

export default function LeakInvestigationArticle() {
  const [activeStage, setActiveStage] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const instanceId = useId();
  const selectedStage = stages[activeStage];

  const onTabKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const currentIndex = tabRefs.current.findIndex((button) => button === event.target);
    if (currentIndex < 0) return;

    let nextIndex = currentIndex;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextIndex = (currentIndex + 1) % stages.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextIndex = (currentIndex - 1 + stages.length) % stages.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = stages.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    setActiveStage(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-8 text-current sm:px-6 sm:py-10 lg:py-14">
      <header className="mb-10 border-b border-current/15 pb-7 sm:mb-12 sm:pb-9">
        <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-medium uppercase tracking-[0.14em] text-current/60">
          <span>Security Engineering</span>
          <span aria-hidden="true" className="text-current/35">/</span>
          <span>Applied Cryptography</span>
          <span aria-hidden="true" className="text-current/35">/</span>
          <span>4–5 min read</span>
        </div>
        <h1 className="max-w-2xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-5xl">
          Encryption Protects a Document. What Helps Trace a Leak?
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-current/75 sm:text-lg sm:leading-8">
          Protecting a document and investigating how it was leaked are different security problems. A defensible approach combines controls that protect data with evidence that can be checked later.
        </p>
        <div className="mt-6 flex flex-wrap gap-2" aria-label="Article topics">
          {[
            "Confidentiality",
            "Integrity",
            "Forensic evidence",
            "Post-quantum cryptography",
          ].map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-current/15 px-2.5 py-1 text-xs text-current/70"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      <div className="space-y-10 sm:space-y-12">
        <section aria-labelledby={`${instanceId}-gap`}>
          <SectionHeading id={`${instanceId}-gap`} number="01">
            The gap encryption leaves
          </SectionHeading>
          <div className="space-y-4 text-base leading-7 text-current/80 sm:text-[1.0625rem] sm:leading-8">
            <p>
              Encryption protects data while it is stored or transferred in encrypted form. With sound algorithms and key management, it makes a document unreadable without the required key. But an authorized recipient can still save the decrypted file, take a screenshot, photograph the screen, or forward the plaintext.
            </p>
            <p>
              Imagine a contractor receives an encrypted report, opens it for review, then emails the readable file outside the organization. Encryption protected the package, but it cannot by itself identify who redistributed the plaintext. Confidentiality controls access; leak investigation asks what evidence connects a recovered copy to a particular distribution or event.
            </p>
          </div>
        </section>

        <section aria-labelledby={`${instanceId}-mechanisms`}>
          <SectionHeading id={`${instanceId}-mechanisms`} number="02">
            Different mechanisms, different jobs
          </SectionHeading>
          <p className="mb-4 text-base leading-7 text-current/80 sm:text-[1.0625rem] sm:leading-8">
            These mechanisms complement one another, but they are not interchangeable. Each answers a different security question.
          </p>
          <div className="overflow-hidden rounded-xl border border-current/15">
            <table className="w-full table-fixed border-collapse text-left text-sm">
              <thead className="border-b border-current/15 bg-current/[0.04] text-xs uppercase tracking-wider text-current/60">
                <tr>
                  <th scope="col" className="w-[34%] px-3 py-3 font-semibold sm:px-5">Mechanism</th>
                  <th scope="col" className="px-3 py-3 font-semibold sm:px-5">What it contributes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-current/10">
                {mechanisms.map((mechanism) => (
                  <tr key={mechanism.name} className="transition-colors hover:bg-current/[0.02]">
                    <th scope="row" className="break-words px-3 py-4 align-top font-semibold text-current sm:px-5">
                      {mechanism.name}
                      <span className="mt-1 block text-xs font-normal leading-5 text-current/60">{mechanism.role}</span>
                    </th>
                    <td className="break-words px-3 py-4 align-top leading-6 text-current/75 sm:px-5">{mechanism.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-5 text-base leading-7 text-current/80 sm:text-[1.0625rem] sm:leading-8">
            The post-quantum algorithms have distinct roles too. <strong className="font-semibold text-current">ML-KEM-768</strong> is a key-encapsulation mechanism: it helps establish a shared secret that can then be used by symmetric encryption. <strong className="font-semibold text-current">ML-DSA-65</strong> is a digital signature algorithm: it signs and verifies data. It does not encrypt the document, and ML-KEM does not provide a digital signature.
          </p>
        </section>

        <section aria-labelledby={`${instanceId}-workflow`}>
          <SectionHeading id={`${instanceId}-workflow`} number="03">
            From distribution to investigation
          </SectionHeading>
          <p className="text-base leading-7 text-current/80 sm:text-[1.0625rem] sm:leading-8">
            Use this three-stage reference workflow to see how protection, distribution, and investigation fit together. It illustrates a design pattern, not a claim that every control is implemented in a particular project.
          </p>

          <div className="mt-6 rounded-2xl border border-current/15 p-4 sm:p-6">
            <div
              role="tablist"
              aria-label="Document security workflow stages"
              onKeyDown={onTabKeyDown}
              className="grid grid-cols-3 gap-2"
            >
              {stages.map((stage, index) => {
                const isActive = activeStage === index;
                return (
                  <button
                    key={stage.number}
                    ref={(element) => {
                      tabRefs.current[index] = element;
                    }}
                    id={`${instanceId}-tab-${index}`}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`${instanceId}-panel`}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActiveStage(index)}
                    className={`min-w-0 rounded-xl border p-3 text-left transition-colors duration-150 motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current ${
                      isActive
                        ? "border-current/45 bg-current/[0.07]"
                        : "border-current/15 hover:border-current/30 hover:bg-current/[0.035]"
                    }`}
                  >
                    <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-current/55">{stage.number}</span>
                    <span className="mt-1 block text-xs font-semibold text-current sm:text-base">{stage.name}</span>
                  </button>
                );
              })}
            </div>

            <div
              id={`${instanceId}-panel`}
              role="tabpanel"
              aria-labelledby={`${instanceId}-tab-${activeStage}`}
              tabIndex={0}
              className="mt-5 rounded-xl bg-current/[0.035] p-4 sm:p-5"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-current/60">{selectedStage.eyebrow}</p>
              <h3 className="mt-1 text-xl font-semibold tracking-tight text-current sm:text-2xl">
                {selectedStage.number} / {selectedStage.name}
              </h3>
              <p className="mt-3 text-sm leading-6 text-current/80">{selectedStage.summary}</p>
              <ul className="mt-4 space-y-2 text-sm leading-6 text-current/75">
                {selectedStage.details.map((detail) => (
                  <li key={detail} className="flex gap-2">
                    <span aria-hidden="true" className="mt-0.5 text-current/50">↳</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 border-t border-current/10 pt-4">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-current/55">Potential evidence / artifacts</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedStage.artifacts.map((artifact) => (
                    <span key={artifact} className="max-w-full break-all rounded-md border border-current/15 px-2.5 py-1 text-xs text-current/80">
                      {artifact}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <p className="mt-3 text-xs leading-5 text-current/55">
              Use the tabs or your keyboard arrow keys to move between stages. On touchscreens, tap a stage to change the panel.
            </p>
          </div>

          <div className="mt-6 space-y-4 text-base leading-7 text-current/80 sm:text-[1.0625rem] sm:leading-8">
            <p>
              <strong className="font-semibold text-current">Protect:</strong> use authenticated encryption and establish or wrap the encryption key securely. <strong className="font-semibold text-current">Distribute:</strong> bind the package to a recipient after appropriate identity checks, protect metadata, and record the event. <strong className="font-semibold text-current">Investigate:</strong> preserve the recovered copy, examine any watermark, compare hashes with trusted references, verify signatures, and correlate relevant audit records.
            </p>
            <p>
              These are architectural steps, not proof that a specific product performs them. Key handling, identity assurance, evidence preservation, and operational controls determine whether the workflow holds up under scrutiny.
            </p>
          </div>
        </section>

        <section aria-labelledby={`${instanceId}-evidence`}>
          <SectionHeading id={`${instanceId}-evidence`} number="04">
            What the evidence can—and cannot—prove
          </SectionHeading>
          <div className="space-y-4 text-base leading-7 text-current/80 sm:text-[1.0625rem] sm:leading-8">
            <p>
              A watermark may survive ordinary transformations, but its resilience depends on the technique and attacker: it can be damaged, removed, copied, or misattributed. A match is an investigative signal, not proof that a named person leaked the file. A recipient device or account may have been compromised, shared, or used by someone else.
            </p>
            <p>
              A SHA-256 digest is meaningful for integrity checking only when compared with a trusted reference. A valid digital signature supports claims about the signed data and signing key; it does not prove every event surrounding that data. Likewise, an audit record is only as trustworthy as its provenance, access controls, time source, retention, and resistance to alteration.
            </p>
            <p>
              The strongest investigation correlates independent evidence: the recovered file, watermark analysis, verified signatures or hashes, distribution records, and system logs. Investigators should document uncertainty and preserve the original evidence. More signals can improve confidence, but only when their assumptions and possible common failure points are understood.
            </p>
          </div>
        </section>

        <section aria-labelledby={`${instanceId}-takeaway`}>
          <SectionHeading id={`${instanceId}-takeaway`} number="05">
            Key takeaway
          </SectionHeading>
          <p className="text-base leading-7 text-current/80 sm:text-[1.0625rem] sm:leading-8">
            Robust document security layers confidentiality, integrity verification, recipient-aware distribution, and carefully evaluated forensic evidence. No single mechanism guarantees prevention or attribution; together, well-operated controls can make unauthorized disclosure harder and later investigation more informed. These questions shape my work on a post-quantum document-security project, where protection and traceable evidence are separate design concerns.
          </p>
        </section>
      </div>

      <footer className="mt-10 border-t border-current/15 pt-5 sm:mt-12">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-current/60">Standards to explore</p>
        <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-current/75">
          <li><a className="underline decoration-current/30 underline-offset-4 hover:text-current focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current" href="https://csrc.nist.gov/pubs/sp/800/38/d/final" target="_blank" rel="noreferrer">NIST SP 800-38D · GCM</a></li>
          <li><a className="underline decoration-current/30 underline-offset-4 hover:text-current focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current" href="https://csrc.nist.gov/pubs/fips/180-4/upd1/final" target="_blank" rel="noreferrer">FIPS 180-4 · SHA-256</a></li>
          <li><a className="underline decoration-current/30 underline-offset-4 hover:text-current focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current" href="https://csrc.nist.gov/pubs/fips/203/final" target="_blank" rel="noreferrer">FIPS 203 · ML-KEM</a></li>
          <li><a className="underline decoration-current/30 underline-offset-4 hover:text-current focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current" href="https://csrc.nist.gov/pubs/fips/204/final" target="_blank" rel="noreferrer">FIPS 204 · ML-DSA</a></li>
        </ul>
      </footer>
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
