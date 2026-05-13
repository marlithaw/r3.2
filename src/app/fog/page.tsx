"use client";

import { useState } from "react";
import Link from "next/link";
import { ScreenHero, Section } from "@/components/ui/ScreenHero";
import {
  FOG_SOURCES,
  ORIENTATION_PROMPTS,
  type FogSource,
  type Pulse,
} from "@/lib/mockData";

export default function FogPage() {
  const [sources, setSources] = useState<Set<FogSource>>(
    new Set(["Exhaustion", "Outside Stress"]),
  );
  const [pulse, setPulse] = useState<Pulse | null>("tight");

  const toggle = (s: FogSource) =>
    setSources((prev) => {
      const next = new Set(prev);
      if (next.has(s)) next.delete(s);
      else next.add(s);
      return next;
    });

  return (
    <div>
      <ScreenHero
        tag="TRACK 01 · ORIENTATION"
        title="Clear the Fog"
        subtitle="Orient before you react. Name what's actually in the room."
      />

      <Section label="ORIENTATION SCAN">
        <div
          className="rounded-xl p-4"
          style={{ background: "var(--teal-mist)", border: "1px solid rgba(0,0,0,0.06)" }}
        >
          <ul className="flex flex-col gap-2">
            {ORIENTATION_PROMPTS.map((p) => (
              <li
                key={p}
                className="rounded px-3 py-2 text-sm"
                style={{
                  background: "var(--teal-surface)",
                  color: "var(--teal-dark)",
                  fontWeight: 500,
                }}
              >
                {p}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section>
        <div
          className="rounded-xl p-4"
          style={{ background: "var(--teal-dark)", color: "#fff" }}
        >
          <div
            className="label-mono mb-3"
            style={{ color: "var(--amber)", fontSize: 10 }}
          >
            FOG SOURCE · MULTI-SELECT
          </div>
          <div className="flex flex-wrap gap-2">
            {FOG_SOURCES.map((s) => {
              const on = sources.has(s);
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => toggle(s)}
                  className="label-mono rounded transition-colors"
                  style={{
                    padding: "6px 10px",
                    fontSize: 10,
                    background: on ? "rgba(255,107,0,0.18)" : "rgba(255,255,255,0.05)",
                    border: `1px solid ${on ? "var(--orange-pop)" : "rgba(255,255,255,0.18)"}`,
                    color: on ? "var(--orange-pop)" : "rgba(255,255,255,0.78)",
                  }}
                >
                  {s}
                </button>
              );
            })}
          </div>
        </div>
      </Section>

      <Section label="MORNING PULSE">
        <div className="grid grid-cols-3 gap-2">
          {(
            [
              { id: "calm",  label: "CALM",  bg: "var(--teal-mid)",   fg: "#fff" },
              { id: "tight", label: "TIGHT", bg: "var(--amber)",      fg: "#1A1A1A" },
              { id: "over",  label: "OVER",  bg: "var(--orange-pop)", fg: "#fff" },
            ] as const
          ).map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setPulse(p.id)}
              className="label-mono rounded-lg py-4 transition-transform"
              style={{
                background: p.bg,
                color: p.fg,
                fontSize: 12,
                transform: pulse === p.id ? "scale(1.03)" : "scale(1)",
                boxShadow:
                  pulse === p.id ? "0 8px 16px rgba(0,0,0,0.15)" : "var(--elev-1)",
                outline:
                  pulse === p.id ? "2px solid rgba(255,255,255,0.6)" : "none",
                outlineOffset: -3,
              }}
            >
              {p.label}
            </button>
          ))}
        </div>
        {pulse && (
          <div
            className="mt-3 rounded-md p-3 text-sm"
            style={{ background: "var(--teal-mist)", color: "var(--teal-dark)" }}
          >
            <span className="label-mono mr-2" style={{ color: "var(--teal-mid)" }}>
              READING
            </span>
            {pulse === "calm" && "You can hold the line without raising the volume."}
            {pulse === "tight" && "Shorten sentences. Slow down. The room reads your tempo."}
            {pulse === "over" && "Hand off if you can. If you can't, name it for yourself before you speak."}
          </div>
        )}
      </Section>

      <Section>
        <Link
          href="/levels"
          className="btn-primary w-full"
          style={{ width: "100%", display: "flex" }}
        >
          I&apos;m Oriented · Check Levels →
        </Link>
      </Section>
    </div>
  );
}
