"use client";

import Link from "next/link";
import { useState } from "react";
import { ScreenHero, Section } from "@/components/ui/ScreenHero";
import { Pill } from "@/components/ui/Pill";
import { COACHING_STANCE, REFUSING_ZONES, ROUTINES, type GradeBand } from "@/lib/mockData";

export default function PlaybookPage() {
  const [grade, setGrade] = useState<GradeBand>("G7");
  const [openZone, setOpenZone] = useState<number>(1);

  const stance = COACHING_STANCE[grade];

  return (
    <div>
      <ScreenHero
        tag="TRACK 04 · LEARN THE MOVE"
        title="Read the Playbook"
        subtitle="Learn the move before the moment tests it."
      />

      <Section label="PLAYBOOK INDEX">
        <div className="grid grid-cols-2 gap-3">
          {ROUTINES.slice(0, 4).map((r) => (
            <div
              key={r.id}
              className="card relative p-3"
              style={{
                borderTopColor:
                  r.category === "Belonging"
                    ? "var(--orange-pop)"
                    : r.category === "Growth"
                    ? "var(--amber)"
                    : "var(--teal-mid)",
              }}
            >
              <div
                aria-hidden
                className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full"
                style={{
                  background: `conic-gradient(var(--orange-pop) 0 ${Math.round(
                    r.progress * 100,
                  )}%, var(--teal-surface) 0)`,
                }}
              >
                <span
                  style={{
                    width: 14,
                    height: 14,
                    background: "#fff",
                    borderRadius: "50%",
                  }}
                />
              </div>
              <Pill
                tone={
                  r.category === "Belonging"
                    ? "orange"
                    : r.category === "Growth"
                    ? "amber"
                    : "teal"
                }
              >
                {r.category}
              </Pill>
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
                {r.grade} · {r.zones} zones
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section label="REFUSING ROUTINE · 10-ZONE ENTRY">
        <div className="card divide-y" style={{ borderTopColor: "var(--teal-mid)" }}>
          {REFUSING_ZONES.map((z) => {
            const open = openZone === z.num;
            return (
              <button
                key={z.num}
                type="button"
                onClick={() => setOpenZone(open ? -1 : z.num)}
                className="block w-full px-4 py-3 text-left transition-colors hover:bg-[var(--teal-mist)]"
                style={{ borderColor: "rgba(0,0,0,0.06)" }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="label-mono inline-flex h-6 w-6 shrink-0 items-center justify-center rounded"
                    style={{
                      background: open ? "var(--orange-pop)" : "var(--teal-surface)",
                      color: open ? "#fff" : "var(--teal-mid)",
                      fontSize: 10,
                    }}
                  >
                    {String(z.num).padStart(2, "0")}
                  </span>
                  <span
                    className="text-sm font-semibold flex-1"
                    style={{ color: "var(--teal-dark)" }}
                  >
                    {z.title}
                  </span>
                  <span className="label-mono" style={{ color: "var(--cool-muted)", fontSize: 11 }}>
                    {open ? "−" : "+"}
                  </span>
                </div>
                {open && (
                  <p className="mt-2 pl-9 text-sm" style={{ color: "var(--deep-ink)", lineHeight: 1.5 }}>
                    {z.body}
                  </p>
                )}
              </button>
            );
          })}
        </div>
      </Section>

      <Section label="GRADE-BAND RESPONSE GUIDANCE">
        <div className="flex gap-1 border-b" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
          {(Object.keys(COACHING_STANCE) as GradeBand[]).map((g) => {
            const on = g === grade;
            return (
              <button
                key={g}
                type="button"
                onClick={() => setGrade(g)}
                className="label-mono flex-1 py-2 text-center transition-colors"
                style={{
                  color: on ? "var(--orange-pop)" : "var(--cool-muted)",
                  borderBottom: `2px solid ${on ? "var(--orange-pop)" : "transparent"}`,
                  fontSize: 11,
                }}
              >
                {g}
              </button>
            );
          })}
        </div>

        <div
          className="mt-3 rounded-md p-3"
          style={{ background: "var(--teal-mist)", border: "1px solid rgba(26,95,122,0.18)" }}
        >
          <div className="label-mono" style={{ color: "var(--teal-mid)", fontSize: 10 }}>
            COACHING STANCE
          </div>
          <p className="mt-1 text-sm" style={{ color: "var(--deep-ink)", lineHeight: 1.45 }}>
            {stance.stance}
          </p>
        </div>

        <div
          className="mt-3 rounded-md p-3"
          style={{
            background: "#fff",
            borderLeft: "3px solid var(--orange-pop)",
            border: "1px solid rgba(0,0,0,0.06)",
            borderLeftWidth: 3,
          }}
        >
          <div className="label-mono" style={{ color: "var(--orange-pop)", fontSize: 10 }}>
            SAY THIS
          </div>
          <div
            className="mt-1 font-semibold"
            style={{ color: "var(--teal-dark)", fontSize: 14 }}
          >
            {stance.say}
          </div>
        </div>
        <div
          className="mt-2 rounded-md p-3"
          style={{
            background: "#fff",
            borderLeft: "3px solid var(--red-warn)",
            border: "1px solid rgba(0,0,0,0.06)",
            borderLeftWidth: 3,
          }}
        >
          <div className="label-mono" style={{ color: "var(--red-warn)", fontSize: 10 }}>
            DO NOT SAY
          </div>
          <div
            className="mt-1 font-mono text-sm"
            style={{
              color: "var(--red-warn)",
              textDecoration: "line-through",
              fontFamily: "var(--font-jetbrains), monospace",
            }}
          >
            {stance.dont}
          </div>
        </div>
      </Section>

      <Section>
        <div className="flex gap-2">
          <Link href="/practice" className="btn-primary" style={{ flex: 1, fontSize: 14 }}>
            Practice This
          </Link>
          <Link href="/live" className="btn-secondary" style={{ fontSize: 14 }}>
            Save to Live ★
          </Link>
        </div>
      </Section>
    </div>
  );
}
