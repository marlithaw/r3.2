"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ScreenHero, Section } from "@/components/ui/ScreenHero";
import { Pill } from "@/components/ui/Pill";
import { LINER_PROMPTS } from "@/lib/mockData";

export default function NotesPage() {
  const [recording, setRecording] = useState(false);
  const [duration, setDuration] = useState(0);
  const [prompts, setPrompts] = useState(LINER_PROMPTS.map((p) => ({ ...p })));
  const [completion, setCompletion] = useState<"most" | "some" | "few">("some");
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (recording) {
      tickRef.current = setInterval(() => setDuration((d) => d + 1), 1000);
    } else if (tickRef.current) {
      clearInterval(tickRef.current);
      tickRef.current = null;
    }
    return () => {
      if (tickRef.current) clearInterval(tickRef.current);
    };
  }, [recording]);

  const mm = String(Math.floor(duration / 60)).padStart(2, "0");
  const ss = String(duration % 60).padStart(2, "0");

  return (
    <div>
      <ScreenHero
        tag="TRACK 07 · CAPTURE"
        title="Liner Notes"
        subtitle="Capture what happened before the moment disappears."
      />

      <Section>
        <div
          className="flex items-center gap-3 rounded-xl p-3"
          style={{ background: "var(--teal-dark)" }}
        >
          <button
            type="button"
            onClick={() => setRecording((r) => !r)}
            className="flex shrink-0 items-center justify-center rounded-full text-white"
            style={{
              width: 48,
              height: 48,
              background: recording ? "var(--red-warn)" : "var(--action-grad)",
              boxShadow: "0 6px 16px rgba(255,107,0,0.35)",
              fontSize: 20,
            }}
            aria-label={recording ? "Stop recording" : "Start recording"}
          >
            {recording ? "■" : "●"}
          </button>
          <div className="flex flex-1 items-center gap-1">
            {Array.from({ length: 24 }).map((_, i) => {
              const h = recording
                ? 30 + Math.abs(Math.sin((i + duration) * 0.6)) * 70
                : 30 + ((i * 17) % 60);
              return (
                <span
                  key={i}
                  className="rounded-sm"
                  style={{
                    width: 3,
                    height: `${h}%`,
                    minHeight: 6,
                    maxHeight: 28,
                    background: recording ? "var(--orange-pop)" : "rgba(255,255,255,0.45)",
                    transition: "height 200ms ease",
                  }}
                />
              );
            })}
          </div>
          <span
            className="label-mono shrink-0"
            style={{ color: "rgba(255,255,255,0.78)", fontSize: 11 }}
          >
            {mm}:{ss}
          </span>
        </div>
      </Section>

      <Section label="STRUCTURED PROMPTS">
        <div className="flex flex-col gap-2">
          {prompts.map((p, i) => (
            <label
              key={p.q}
              className="block rounded-md p-3"
              style={{
                background: "var(--teal-mist)",
                borderLeft: "2px solid var(--teal-mid)",
              }}
            >
              <span
                className="label-mono"
                style={{ color: "var(--teal-mid)", fontSize: 10 }}
              >
                {p.q}
              </span>
              <textarea
                value={p.a}
                onChange={(e) =>
                  setPrompts((prev) =>
                    prev.map((x, idx) => (idx === i ? { ...x, a: e.target.value } : x)),
                  )
                }
                rows={2}
                className="mt-1 w-full resize-none bg-transparent text-sm outline-none"
                style={{ color: "var(--deep-ink)", lineHeight: 1.45 }}
              />
            </label>
          ))}
        </div>
      </Section>

      <Section label="QUICK CAPTURE · TASK COMPLETION">
        <div className="card card-action p-3">
          <div className="flex flex-wrap gap-2">
            {(["most", "some", "few"] as const).map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => setCompletion(k)}
                className="transition-transform"
                style={{
                  transform: completion === k ? "scale(1.05)" : "scale(1)",
                }}
              >
                <Pill tone={completion === k ? "orange" : "teal"}>
                  {k.toUpperCase()}
                </Pill>
              </button>
            ))}
          </div>
          <p
            className="label-mono mt-3"
            style={{ color: "var(--cool-muted)", fontSize: 9 }}
          >
            TASK COMPLETION — RAW SIGNAL FOR THE FLOW DASHBOARD
          </p>
        </div>
      </Section>

      <Section>
        <div className="flex gap-2">
          <Link href="/remix" className="btn-primary" style={{ flex: 1, fontSize: 14 }}>
            Remix what didn&apos;t land →
          </Link>
          <Link href="/flow" className="btn-secondary" style={{ fontSize: 14 }}>
            See the Flow
          </Link>
        </div>
      </Section>
    </div>
  );
}
