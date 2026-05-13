"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ScreenHero, Section } from "@/components/ui/ScreenHero";
import { Pill } from "@/components/ui/Pill";
import {
  PRACTICE_CHOICES,
  PRACTICE_SCORE_AFTER_BAD,
  PRACTICE_SCORE_AFTER_BEST,
} from "@/lib/mockData";

export default function PracticePage() {
  const [choice, setChoice] = useState<number | null>(null);
  const [verdict, setVerdict] = useState<null | "yes" | "partially" | "no">(null);

  const result = choice == null ? null : PRACTICE_CHOICES[choice];

  const score = useMemo(() => {
    if (!result) return null;
    return result.verdict === "best" ? PRACTICE_SCORE_AFTER_BEST : PRACTICE_SCORE_AFTER_BAD;
  }, [result]);

  function runItBack() {
    setChoice(null);
    setVerdict(null);
  }

  return (
    <div>
      <ScreenHero
        tag="TRACK 05 · REPS"
        title="Practice Station"
        subtitle="Run the moment before it runs you."
      />

      <Section label="SCENARIO">
        <div
          className="card p-3"
          style={{ borderTopColor: "var(--orange-pop)" }}
        >
          <div className="flex items-center justify-between">
            <Pill tone="orange">REFUSING ROUTINE</Pill>
            <span
              className="label-mono"
              style={{ color: "var(--teal-mid)", fontSize: 10 }}
            >
              ~3 MIN
            </span>
          </div>
          <div
            className="mt-2 text-sm font-semibold"
            style={{ color: "var(--teal-dark)" }}
          >
            7th period · seat refusal during entry
          </div>
          <div className="mt-2 flex items-center gap-2">
            <div className="flex gap-0.5">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: 1,
                    background: i < 2 ? "var(--orange-pop)" : "var(--teal-surface)",
                  }}
                />
              ))}
            </div>
            <span
              className="label-mono"
              style={{ color: "var(--cool-muted)", fontSize: 9 }}
            >
              Difficulty 2 / 3
            </span>
          </div>
        </div>
      </Section>

      <Section>
        <div
          className="rounded-xl p-4"
          style={{
            background: "linear-gradient(160deg,#092D3A,#0C3645)",
            color: "#fff",
          }}
        >
          <div
            className="label-mono"
            style={{ color: "var(--amber)", fontSize: 10 }}
          >
            STEP 4 OF 6 · R³AP RESPONSE
          </div>
          <div
            className="mt-1 font-semibold"
            style={{ fontSize: 16, lineHeight: 1.3 }}
          >
            Choose the next line.
          </div>

          <div className="mt-3 flex flex-col gap-2">
            {PRACTICE_CHOICES.map((c, i) => {
              const on = choice === i;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => setChoice(i)}
                  className="rounded-md border px-3 py-2 text-left text-sm transition-colors"
                  style={{
                    background: on
                      ? c.verdict === "best"
                        ? "rgba(255,107,0,0.15)"
                        : "rgba(184,66,61,0.15)"
                      : "rgba(255,255,255,0.06)",
                    borderColor: on
                      ? c.verdict === "best"
                        ? "var(--orange-pop)"
                        : "var(--red-warn)"
                      : "rgba(255,255,255,0.18)",
                    color: "#fff",
                  }}
                >
                  {c.text}
                </button>
              );
            })}
          </div>

          {result && (
            <div className="mt-3 flex gap-2 text-xs">
              <Pill tone="ghost">TONE · FLAT</Pill>
              <Pill tone="ghost">VOLUME · LOW</Pill>
            </div>
          )}

          {result && (
            <div
              className="mt-3 rounded-md p-3 text-sm"
              style={{
                background:
                  result.verdict === "best"
                    ? "rgba(45,122,79,0.16)"
                    : "rgba(184,66,61,0.16)",
                borderLeft: `3px solid ${
                  result.verdict === "best" ? "var(--green-check)" : "var(--red-warn)"
                }`,
                color: "rgba(255,255,255,0.92)",
                lineHeight: 1.45,
              }}
            >
              <div
                className="label-mono"
                style={{
                  color: result.verdict === "best" ? "var(--green-check)" : "var(--red-warn)",
                  fontSize: 10,
                }}
              >
                {result.verdict === "best" ? "COACHING CHECK · ON BEAT" : "COACHING CHECK · OFF BEAT"}
              </div>
              <p className="mt-1">{result.feedback}</p>
            </div>
          )}
        </div>
      </Section>

      {result && (
        <Section label="DID THIS PROTECT INSTRUCTION?">
          <div className="flex gap-2">
            {(
              [
                { id: "yes",       tone: "green" as const,  label: "YES" },
                { id: "partially", tone: "amber" as const,  label: "PARTIALLY" },
                { id: "no",        tone: "red" as const,    label: "NO" },
              ] as const
            ).map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => setVerdict(v.id)}
                className="rounded-full px-4 py-2 transition-transform"
                style={{
                  transform: verdict === v.id ? "scale(1.04)" : "scale(1)",
                  outline:
                    verdict === v.id ? "2px solid currentColor" : "none",
                  outlineOffset: -1,
                }}
              >
                <Pill tone={v.tone}>{v.label}</Pill>
              </button>
            ))}
          </div>

          {score && (
            <div className="mt-3 grid grid-cols-2 gap-2">
              {score.map((m) => (
                <div
                  key={m.label}
                  className="card p-3"
                  style={{
                    borderTopColor:
                      m.tone === "good" ? "var(--green-check)" : "var(--red-warn)",
                  }}
                >
                  <div className="label-mono" style={{ color: "var(--cool-muted)", fontSize: 9 }}>
                    {m.label}
                  </div>
                  <div
                    className="metric mt-1"
                    style={{
                      fontSize: 20,
                      color: m.tone === "good" ? "var(--green-check)" : "var(--red-warn)",
                    }}
                  >
                    {m.value}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Section>
      )}

      <Section>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={runItBack}
            className="label-mono rounded-full bg-white px-4 py-2"
            style={{
              border: "1.5px solid var(--teal-mid)",
              color: "var(--teal-mid)",
              fontSize: 11,
            }}
          >
            ↺ Run That Back
          </button>
          {result?.verdict === "best" && (
            <Link href="/live" className="btn-primary" style={{ fontSize: 14 }}>
              Take it Live →
            </Link>
          )}
          {result && result.verdict !== "best" && (
            <Link href="/remix" className="btn-secondary" style={{ fontSize: 14 }}>
              Remix this Move →
            </Link>
          )}
        </div>
      </Section>
    </div>
  );
}
