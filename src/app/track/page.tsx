"use client";

import Link from "next/link";
import { useState } from "react";
import { Section } from "@/components/ui/ScreenHero";
import { Pill } from "@/components/ui/Pill";
import { ROUTINES } from "@/lib/mockData";

export default function TrackPage() {
  const activeRoutine = ROUTINES.find((r) => r.active) ?? ROUTINES[0];
  const [selected, setSelected] = useState<string>(activeRoutine.id);

  const selectedRoutine = ROUTINES.find((r) => r.id === selected) ?? activeRoutine;

  return (
    <div>
      <section
        className="relative flex items-center gap-4 overflow-hidden px-5 py-5"
        style={{ background: "var(--teal-dark)", color: "#fff" }}
      >
        <div
          className="spin-vinyl relative shrink-0 rounded-full"
          aria-hidden
          style={{
            width: 96,
            height: 96,
            background:
              "repeating-radial-gradient(circle, #1A1A1A 0 1px, #2a2a2a 1px 3px), #1A1A1A",
            boxShadow: "0 4px 16px rgba(9,45,58,0.5)",
          }}
        >
          <span
            style={{
              position: "absolute",
              inset: "30%",
              borderRadius: "50%",
              background: "var(--teal-mid)",
            }}
          />
          <span
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: 10,
              height: 10,
              margin: "-5px 0 0 -5px",
              borderRadius: "50%",
              background: "var(--orange-pop)",
              zIndex: 2,
            }}
          />
        </div>
        <div className="min-w-0">
          <div className="label-mono" style={{ color: "var(--orange-pop)", fontSize: 10 }}>
            ● NOW PLAYING · TRACK {selectedRoutine.number}
          </div>
          <div
            className="h-display mt-1 truncate"
            style={{ fontSize: 22, color: "#fff", letterSpacing: "-0.02em" }}
          >
            {selectedRoutine.name}
          </div>
          <div className="text-sm" style={{ color: "rgba(255,255,255,0.72)" }}>
            {selectedRoutine.grade} · {selectedRoutine.zones}
          </div>
          <span
            className="label-mono mt-1 inline-block rounded px-2 py-0.5"
            style={{
              background: "rgba(255,107,0,0.18)",
              color: "var(--orange-pop)",
              fontSize: 9,
            }}
          >
            {selectedRoutine.active ? "● ACTIVE" : "● SELECTED"}
          </span>
        </div>
      </section>

      <Section label="TRACK LIBRARY">
        <div className="grid grid-cols-2 gap-3">
          {ROUTINES.map((r) => {
            const isSel = selected === r.id;
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => setSelected(r.id)}
                className="card relative overflow-hidden p-3 text-left transition-transform hover:-translate-y-0.5"
                style={{
                  borderTopColor: isSel ? "var(--orange-pop)" : "var(--teal-mid)",
                  outline: isSel ? "2px solid var(--orange-pop)" : "none",
                  outlineOffset: -1,
                }}
              >
                <div className="flex items-center justify-between">
                  <Pill tone="teal">{r.grade}</Pill>
                  <div className="flex gap-0.5">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        style={{
                          width: 5,
                          height: 5,
                          borderRadius: 1,
                          background: i < r.difficulty ? "var(--orange-pop)" : "var(--teal-surface)",
                        }}
                      />
                    ))}
                  </div>
                </div>
                <div
                  className="mt-2 text-sm font-semibold leading-tight"
                  style={{ color: "var(--teal-dark)" }}
                >
                  {r.name}
                </div>
                <div
                  className="mt-1 label-mono"
                  style={{ color: "var(--cool-muted)", fontSize: 9 }}
                >
                  {r.category} · {r.zones}
                </div>
                <span
                  className="label-mono absolute -bottom-2 right-1 select-none"
                  style={{ color: "var(--teal-mid)", opacity: 0.08, fontSize: 44 }}
                >
                  {r.number}
                </span>
              </button>
            );
          })}
        </div>
      </Section>

      <Section>
        <Link href="/playbook" className="btn-primary" style={{ width: "100%", display: "flex" }}>
          Load This Track →
        </Link>
      </Section>
    </div>
  );
}
