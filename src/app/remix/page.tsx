"use client";

import Link from "next/link";
import { useState } from "react";
import { ScreenHero, Section } from "@/components/ui/ScreenHero";
import { REMIX_LINES, ROUTINE_STEPS, type RemixMode } from "@/lib/mockData";

const MODES: { id: RemixMode; letter: string; label: string }[] = [
  { id: "rewrite", letter: "A", label: "Rewrite" },
  { id: "routine", letter: "B", label: "Routine" },
  { id: "track",   letter: "C", label: "Track" },
  { id: "runback", letter: "D", label: "↺ Back" },
];

export default function RemixPage() {
  const [mode, setMode] = useState<RemixMode>("rewrite");

  return (
    <div>
      <ScreenHero
        tag="TRACK 08 · REMIX"
        title="Remix"
        subtitle="Replace the old pattern with a stronger track."
      />

      <Section>
        <div
          className="grid grid-cols-4 gap-1 rounded-lg p-1"
          style={{ background: "var(--teal-mist)" }}
        >
          {MODES.map((m) => {
            const on = mode === m.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => setMode(m.id)}
                className="label-mono rounded-md py-2 text-center transition-colors"
                style={{
                  background: on ? "#fff" : "transparent",
                  color: on ? "var(--teal-dark)" : "var(--cool-muted)",
                  boxShadow: on ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
                  fontSize: 10,
                }}
              >
                <span className="block" style={{ color: "var(--orange-pop)", fontSize: 9 }}>
                  {m.letter}
                </span>
                {m.label}
              </button>
            );
          })}
        </div>
      </Section>

      {mode === "rewrite" && <RewriteMode />}
      {mode === "routine" && <RoutineMode />}
      {mode === "track" && <TrackMode />}
      {mode === "runback" && <RunbackMode />}

      <Section>
        <div className="flex gap-2">
          <Link href="/live" className="btn-primary" style={{ flex: 1, fontSize: 14 }}>
            Save to Live ★
          </Link>
          <Link href="/practice" className="btn-secondary" style={{ fontSize: 14 }}>
            ↺ Run Back
          </Link>
        </div>
      </Section>
    </div>
  );
}

function RewriteMode() {
  const [inputs, setInputs] = useState({
    happened: "I told Marcus three times to sit. By the third time I was loud.",
    said: '"Why do you always do this? Just sit down."',
    tone: "Flat. Firm. Short.",
    followup: "Catch him at the door at the end of class.",
  });

  return (
    <>
      <Section label="REWRITE THE MOVE · INPUTS">
        <div className="flex flex-col gap-2">
          {(
            [
              { k: "happened",  label: "What happened" },
              { k: "said",      label: "What I said" },
              { k: "tone",      label: "Tone I want" },
              { k: "followup",  label: "Follow-up plan" },
            ] as const
          ).map(({ k, label }) => (
            <label
              key={k}
              className="card block p-3"
              style={{ borderTopColor: "var(--teal-mid)" }}
            >
              <span className="label-mono" style={{ color: "var(--teal-mid)", fontSize: 10 }}>
                {label}
              </span>
              <textarea
                value={inputs[k]}
                onChange={(e) => setInputs((p) => ({ ...p, [k]: e.target.value }))}
                rows={2}
                className="mt-1 w-full resize-none bg-transparent text-sm outline-none"
                style={{ color: "var(--deep-ink)", lineHeight: 1.4 }}
              />
            </label>
          ))}
        </div>
      </Section>

      <Section>
        <div
          className="rounded-xl p-4"
          style={{ background: "var(--teal-deepest)", color: "#fff" }}
        >
          <div className="label-mono" style={{ color: "var(--amber)", fontSize: 10 }}>
            ★ STRONGER TRACK
          </div>
          <RemixLine variant="strong" label={REMIX_LINES.best.label} text={REMIX_LINES.best.text} />
          <RemixLine variant="short" label={REMIX_LINES.shorter.label} text={REMIX_LINES.shorter.text} />
          <RemixLine variant="bad" label={REMIX_LINES.bad.label} text={REMIX_LINES.bad.text} />
          <RemixLine variant="warm" label={REMIX_LINES.followup.label} text={REMIX_LINES.followup.text} />
        </div>
      </Section>
    </>
  );
}

function RemixLine({
  variant,
  label,
  text,
}: {
  variant: "strong" | "short" | "bad" | "warm";
  label: string;
  text: string;
}) {
  const styles = {
    strong: { bg: "rgba(255,107,0,0.15)",   bd: "var(--orange-pop)",  fg: "var(--orange-pop)", italic: false, strike: false },
    short:  { bg: "rgba(255,255,255,0.05)", bd: "var(--teal-bright)", fg: "var(--teal-bright)", italic: false, strike: false },
    bad:    { bg: "rgba(184,66,61,0.18)",   bd: "var(--red-warn)",    fg: "var(--red-warn)",   italic: false, strike: true  },
    warm:   { bg: "rgba(50,117,140,0.18)",  bd: "var(--amber)",       fg: "var(--amber)",      italic: true,  strike: false },
  }[variant];
  return (
    <div
      className="mt-2 rounded-md p-3"
      style={{ background: styles.bg, borderLeft: `3px solid ${styles.bd}` }}
    >
      <div className="label-mono" style={{ color: styles.fg, fontSize: 10 }}>
        {label}
      </div>
      <div
        className="mt-1"
        style={{
          fontFamily: variant === "bad"
            ? "var(--font-space-mono), monospace"
            : "var(--font-inter), system-ui, sans-serif",
          fontWeight: variant === "warm" ? 500 : 600,
          fontStyle: styles.italic ? "italic" : "normal",
          textDecoration: styles.strike ? "line-through" : "none",
          fontSize: 14,
          lineHeight: 1.35,
          color: "#fff",
        }}
      >
        {text}
      </div>
    </div>
  );
}

function RoutineMode() {
  return (
    <>
      <Section label="ENTRY ROUTINE · V2">
        <div className="card p-4">
          <div className="label-mono" style={{ color: "var(--orange-pop)", fontSize: 10 }}>
            ★ STUDENT STEPS
          </div>
          <ol className="mt-2 flex flex-col">
            {ROUTINE_STEPS.map((step, i) => (
              <li
                key={i}
                className="flex gap-3 py-2"
                style={{ borderTop: i === 0 ? "none" : "1px solid rgba(0,0,0,0.06)" }}
              >
                <span
                  className="label-mono shrink-0"
                  style={{ color: "var(--amber)", width: 24, fontSize: 12 }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm" style={{ color: "var(--deep-ink)", lineHeight: 1.5 }}>
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section label="TEACHER SCRIPT">
        <div
          className="rounded-md bg-white p-3"
          style={{
            border: "1px solid rgba(0,0,0,0.06)",
            borderLeft: "3px solid var(--orange-pop)",
          }}
        >
          <div className="label-mono" style={{ color: "var(--orange-pop)", fontSize: 10 }}>
            SAY THIS
          </div>
          <div
            className="mt-1 font-semibold"
            style={{ color: "var(--teal-dark)", fontSize: 14 }}
          >
            &quot;Your seat is posted. Pencils out. Do Now started.&quot;
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="card p-3">
            <div className="label-mono" style={{ color: "var(--cool-muted)", fontSize: 9 }}>
              VISUAL CUE
            </div>
            <div
              className="mt-1 font-semibold"
              style={{ color: "var(--teal-dark)", fontSize: 13 }}
            >
              Seat map on door
            </div>
          </div>
          <div className="card card-action p-3">
            <div className="label-mono" style={{ color: "var(--cool-muted)", fontSize: 9 }}>
              PRACTICE MOMENT
            </div>
            <div
              className="mt-1 font-semibold"
              style={{ color: "var(--teal-dark)", fontSize: 13 }}
            >
              Mon · 7th period
            </div>
          </div>
        </div>

        <div
          className="mt-3 rounded-md p-3 text-sm"
          style={{
            background: "var(--teal-mist)",
            borderLeft: "2px solid var(--teal-mid)",
            color: "var(--deep-ink)",
            lineHeight: 1.45,
          }}
        >
          <div className="label-mono" style={{ color: "var(--teal-mid)", fontSize: 10 }}>
            LINER NOTE PROMPT
          </div>
          <p className="mt-1">Did the routine hold under stress? Where did it break?</p>
        </div>
      </Section>
    </>
  );
}

function TrackMode() {
  return (
    <Section label="PUT IT ON A TRACK">
      <div
        className="rounded-xl p-4"
        style={{ background: "var(--teal-deepest)", color: "#fff" }}
      >
        <div className="label-mono" style={{ color: "var(--amber)", fontSize: 10 }}>
          ★ MIX
        </div>
        <p className="mt-2 text-sm" style={{ color: "rgba(255,255,255,0.85)", lineHeight: 1.5 }}>
          Choose a tempo and a backbone. The Mix becomes a 30-second internal recording you can replay before 4th period.
        </p>
        <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
          {[
            { label: "TEMPO",   value: "Flat · Low" },
            { label: "TEXTURE", value: "Mono · Clean" },
            { label: "HOOK",    value: '"Your seat is posted."' },
            { label: "BRIDGE",  value: "Eyes back to the room." },
          ].map((m) => (
            <div
              key={m.label}
              className="rounded-md p-3"
              style={{
                background: "rgba(26,95,122,0.30)",
                border: "1px solid rgba(50,117,140,0.40)",
              }}
            >
              <div className="label-mono" style={{ color: "rgba(255,255,255,0.7)", fontSize: 9 }}>
                {m.label}
              </div>
              <div className="mt-1 font-semibold" style={{ fontSize: 13 }}>
                {m.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function RunbackMode() {
  return (
    <Section label="↺ RUN THAT BACK">
      <div className="card p-4">
        <p className="text-sm" style={{ color: "var(--deep-ink)", lineHeight: 1.5 }}>
          The same scenario, no penalty. Two reps minimum. The goal isn&apos;t a perfect score — it&apos;s a tighter rhythm.
        </p>
        <div className="mt-3 flex gap-2">
          <Link href="/practice" className="btn-primary" style={{ fontSize: 14 }}>
            Re-enter Practice →
          </Link>
        </div>
      </div>
    </Section>
  );
}
