"use client";

import { useState, type ReactNode } from "react";

type AnswerId = "unsupported" | "evidence";

type AnswerOption = {
  id: AnswerId;
  label: string;
  title: string;
  answer: string;
  explanation: string;
};

const answerOptions: AnswerOption[] = [
  {
    id: "unsupported",
    label: "Answer A",
    title: "Unsupported answer",
    answer: "You can return the product within 30 days for a full refund.",
    explanation:
      "The answer gives a specific deadline and refund promise, but no policy was supplied. It might happen to be correct, yet the available information does not support it. A reliable assistant should not present this guess as a fact.",
  },
  {
    id: "evidence",
    label: "Answer B",
    title: "Evidence-based answer",
    answer:
      "I can't determine the return period because no return policy was provided. Please share the policy so I can answer accurately.",
    explanation:
      "This answer matches what is actually known: the policy is missing. It acknowledges the gap and asks for the evidence needed to answer. It is less specific, but more trustworthy in this situation.",
  },
];

export default function AIConfidenceArticle() {
  const [selectedAnswer, setSelectedAnswer] = useState<AnswerId>("evidence");
  const activeOption = answerOptions.find((option) => option.id === selectedAnswer)!;

  return (
    <article className="mx-auto w-full max-w-3xl px-5 py-8 text-inherit sm:px-8 sm:py-12">
      <header className="mb-10 border-b border-current/15 pb-7 sm:mb-12 sm:pb-9">
        <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-medium uppercase tracking-[0.14em] text-current/60">
          <span>Artificial Intelligence</span>
          <span aria-hidden="true" className="text-current/35">/</span>
          <span>4–5 min read</span>
        </div>
        <h1 className="max-w-2xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-5xl">
          An AI Model Can Be Confident and Still Be Wrong
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-current/75 sm:text-lg sm:leading-8">
          A convincing answer is easy to mistake for a correct one. The difference is evidence.
        </p>
      </header>

      <div className="space-y-10 sm:space-y-12">
        <section aria-labelledby="confidence-illusion">
          <SectionHeading id="confidence-illusion" number="01">
            The Confidence Illusion
          </SectionHeading>
          <div className="space-y-4 text-[15px] leading-7 text-current/80 sm:text-base sm:leading-8">
            <p>
              Imagine asking an AI assistant whether a library is open on Sunday. It replies, “Yes—9 a.m. to 5 p.m.” The answer sounds specific and professional. But if the assistant never checked the library’s hours, those details may simply be a guess. The real hours might be different, or the library may be closed.
            </p>
            <p>
              That is the confidence illusion: language models can produce smooth, decisive sentences without verifying the facts behind them. Fluency tells you something about how well an answer is written, not whether it is true. For developers, that difference matters whenever someone may act on the answer.
            </p>
          </div>
        </section>

        <section aria-labelledby="why-wrong">
          <SectionHeading id="why-wrong" number="02">
            Why AI Gets Things Wrong
          </SectionHeading>
          <div className="space-y-4 text-[15px] leading-7 text-current/80 sm:text-base sm:leading-8">
            <p>
              A language model generates text from patterns learned during training and from the context it receives. It does not automatically check every statement against the current world. A few common gaps can lead it astray:
            </p>
            <p>
              <strong className="font-semibold text-current">Missing or outdated information.</strong> A model may not know about a recent product change, a new rule, or today’s opening hours. Without an up-to-date source, it can answer from information that is incomplete or old.
            </p>
            <p>
              <strong className="font-semibold text-current">An unclear question.</strong> “Will this work?” gives little context. The model may assume a programming language, operating system, or goal that the person never specified. The result can sound reasonable while solving the wrong problem.
            </p>
            <p>
              <strong className="font-semibold text-current">A plausible answer without evidence.</strong> When details are missing, a model may generate something that fits familiar patterns instead of admitting the gap. An invented or unsupported response of this kind is often called an <em>AI hallucination</em>. The term does not mean the model intends to deceive; it describes an output that is not grounded in the facts available to it.
            </p>
          </div>
        </section>

        <section aria-labelledby="improve-reliability">
          <SectionHeading id="improve-reliability" number="03">
            How Developers Can Improve Reliability
          </SectionHeading>
          <div className="space-y-5 text-[15px] leading-7 text-current/80 sm:text-base sm:leading-8">
            <div>
              <h3 className="mb-1 font-semibold text-current">1. Give it relevant sources with RAG</h3>
              <p>
                <em>Retrieval-Augmented Generation (RAG)</em> searches a trusted collection—such as product documentation or a company help center—and provides useful passages alongside the question. Instead of guessing a return window, an assistant can refer to the retrieved policy. Retrieval helps only when the source is relevant and current, and the model can still misread or ignore it.
              </p>
            </div>
            <div>
              <h3 className="mb-1 font-semibold text-current">2. Validate what comes back</h3>
              <p>
                Treat model output as input that may need checking. Validate required fields, data types, ranges, and formats before using a response. For example, a booking system can reject a date that is invalid or unavailable rather than passing it straight to the next step. Format validation catches format problems; it does not prove every factual claim is true.
              </p>
            </div>
            <div>
              <h3 className="mb-1 font-semibold text-current">3. Verify facts with tools</h3>
              <p>
                When possible, use a suitable API, database, or calculation tool for facts it can reliably provide. A store assistant could query the current order system for an order status instead of inventing one. The application should check the tool’s result and handle errors, missing records, and stale data. A tool is useful evidence, not an automatic guarantee of correctness.
              </p>
            </div>
            <p>
              These approaches address different failure modes, and they can work together. None makes an AI system perfectly accurate, so important decisions still need appropriate safeguards and human review.
            </p>
          </div>
        </section>

        <section aria-labelledby="interactive-example">
          <SectionHeading id="interactive-example" number="04">
            Interactive Example: Can You Trust This Answer?
          </SectionHeading>
          <p className="mb-5 text-[15px] leading-7 text-current/80 sm:text-base sm:leading-8">
            Imagine a customer asks an assistant about a product’s return policy, but the policy has not been provided. Select an answer to see what the available evidence supports.
          </p>

          <div className="rounded-xl border border-current/15 p-4 sm:p-6">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-current/60">
                Illustrative example · Not a live model test
              </p>
              <span className="rounded-full border border-current/15 px-2.5 py-1 text-xs text-current/65">
                No policy supplied
              </span>
            </div>
            <h3 id="return-policy-question" className="text-base font-semibold leading-6 sm:text-lg">
              “What is the return policy for this product?”
            </h3>

            <div
              aria-label="Choose an answer to evaluate"
              role="group"
              className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2"
            >
              {answerOptions.map((option) => {
                const isSelected = selectedAnswer === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    aria-pressed={isSelected}
                    aria-describedby="return-policy-question"
                    onClick={() => setSelectedAnswer(option.id)}
                    className={`group rounded-lg border p-4 text-left outline-none transition-colors duration-150 hover:bg-current/[0.04] focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2 focus-visible:ring-offset-transparent motion-reduce:transition-none ${
                      isSelected
                        ? "border-current/45 bg-current/[0.06]"
                        : "border-current/15"
                    }`}
                  >
                    <span className="mb-3 flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold uppercase tracking-[0.1em] text-current/60">
                        {option.label}
                      </span>
                      <span className="text-xs text-current/55">
                        {isSelected ? "Selected" : "Select answer"}
                      </span>
                    </span>
                    <span className="mb-2 block text-sm font-semibold text-current">
                      {option.title}
                    </span>
                    <span className="block text-sm leading-6 text-current/80">
                      {option.answer}
                    </span>
                  </button>
                );
              })}
            </div>

            <div
              className="mt-5 border-t border-current/15 pt-4 sm:pt-5"
              aria-live="polite"
              aria-atomic="true"
            >
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-current/60">
                Why this answer?
              </p>
              <h4 className="mb-2 text-sm font-semibold text-current">
                {activeOption.title}
              </h4>
              <p className="text-sm leading-6 text-current/75 sm:text-[15px]">
                {activeOption.explanation}
              </p>
            </div>
          </div>
          <p className="mt-4 text-sm leading-6 text-current/65">
            The key question is not just “Does this sound right?” but “What information supports it?” An answer may be correct by coincidence and still be unreliable when it is presented without evidence.
          </p>
        </section>

        <section aria-labelledby="takeaway">
          <SectionHeading id="takeaway" number="05">
            The Takeaway
          </SectionHeading>
          <div className="space-y-4 text-[15px] leading-7 text-current/80 sm:text-base sm:leading-8">
            <p>
              Reliable AI development is not just about generating good answers. It is also about checking evidence, acknowledging uncertainty, and handling missing information responsibly. Sometimes the best response is a clarifying question—not a confident guess.
            </p>
            <p>
              When building practical AI-powered applications, design the system around what it can verify, what it must validate, and when it should say “I don’t know.” That mindset turns a clever demo into a more dependable tool.
            </p>
          </div>
        </section>
      </div>

      <footer className="mt-10 border-t border-current/15 pt-5 sm:mt-12">
        <p className="text-xs leading-5 text-current/55">
          AI reliability · Retrieval · Validation · Evidence-aware design
        </p>
      </footer>
    </article>
  );
}

type SectionHeadingProps = {
  id: string;
  number: string;
  children: ReactNode;
};

function SectionHeading({ id, number, children }: SectionHeadingProps) {
  return (
    <div className="mb-5 flex items-start gap-3 sm:mb-6 sm:gap-4">
      <span
        aria-hidden="true"
        className="pt-1 text-xs font-medium tabular-nums tracking-[0.12em] text-current/45"
      >
        {number}
      </span>
      <h2 id={id} className="text-xl font-semibold leading-snug tracking-tight sm:text-2xl">
        {children}
      </h2>
    </div>
  );
}
