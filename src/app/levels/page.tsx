"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { ScreenHero, Section } from "@/components/ui/ScreenHero";
import { DEFAULT_LEVELS, LEVEL_LABELS, type LevelKey, type Levels } from "@/lib/mockData";

const ORDER: LevelKey[] = ["grade", "routine", "student", "teacher", "urgency"];

function recommendation(levels: Levels): { headline: string; routine: string; href: string } {
  const max = ORDER.reduce<{ key: LevelKey; v: number }>(
    (acc, k) => (levels[k] > acc.v ? { key: k, v: levels[k] } : acc),
    { key: "urgency", v: -1 },
  );
  switch (max.key) {
    case "urgency":
      return { headline: "Your next move is", routine: "Practice Station → Refusing Routine", href: "/practice" };
    case "student":
      return { headline: "Your next move is", routine: "Read the Playbook → Entry Routine",   href: "/playbook" };
    case "teacher":
      return { headline: "Your next move is", routine: "Clear the Fog (you first)",            href: "/fog" };
    case "routine":
      return { headline: "Your next move is", routine: "Load the Track → Entry Routine",      href: "/track" };
    case "grade":
      return { headline: "Your next move is", routine: "Read the Playbook → G7 Stance",       href: "/playbook" };
  }
}

export default function LevelsPage() {
  const [levels, setLevels] = useState<Levels>(DEFAULT_LEVELS);
  const rec = useMemo(() => recommendation(levels), [levels]);

  return (
    <div>
      <ScreenHero
        tag="TRACK 02 · DIAGNOSTIC"
        title="Check Your Levels"
        subtitle="What does your classroom need right now?"
        center
      >
        <div className="mt-4 flex items-end justify-center gap-2" style={{ height: 60 }}>
          {[40, 65, 95, 55, 80].map((h, i) => (
            <div
              key={i}
              className="eq-bar rounded-sm"
              style={{
                width: 10,
                height: `${h}%`,
                background: "var(--orange-pop)",
                animationDelay: `${i * 0.12}s`,
              }}
            />
          ))}
        </div>
      </ScreenHero>

      <Section label="MIX THE LEVELS">
        <div className="card p-4">
          {ORDER.map((k) => (
            <div key={k} className="grid items-center gap-3 py-2" style={{ gridTemplateColumns: "96px 1fr 36px" }}>
              <span className="label-mono" style={{ color: "var(--cool-muted)", fontSize: 10 }}>
                {LEVEL_LABELS[k]}
              </span>
              <input
                type="range"
                min={0}
                max={100}
                value={levels[k]}
                onChange={(e) => setLevels((prev) => ({ ...prev, [k]: Number(e.target.value) }))}
                aria-label={LEVEL_LABELS[k]}
                style={{
                  WebkitAppearance: "none",
                  appearance: "none",
                  height: 6,
                  borderRadius: 3,
                  background: `linear-gradient(90deg, var(--orange-pop) 0%, var(--amber) ${levels[k]}%, var(--teal-surface) ${levels[k]}%)`,
                  outline: "none",
                  cursor: "pointer",
                }}
              />
              <span className="label-mono text-right" style={{ color: "var(--amber)", fontSize: 11 }}>
                {levels[k]}
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Section label="RECOMMENDATION">
        <div className="card card-action relative overflow-hidden p-4">
          <div className="label-mono" style={{ color: "var(--orange-pop)", fontSize: 10 }}>
            BASED ON YOUR LEVELS
          </div>
          <div
            className="mt-1 text-base font-semibold"
            style={{ color: "var(--teal-dark)", lineHeight: 1.35 }}
          >
            {rec.headline}{" "}
            <span style={{ color: "var(--orange-pop)" }}>{rec.routine}</span>.
          </div>
          <span
            className="label-mono absolute -bottom-3 right-2 select-none"
            style={{ color: "var(--teal-mid)", opacity: 0.06, fontSize: 58 }}
          >
            05
          </span>
        </div>
      </Section>

      <Section>
        <div className="flex gap-2">
          <Link href={rec.href} className="btn-primary" style={{ flex: 1, fontSize: 14 }}>
            Go There Now
          </Link>
          <Link href="/track" className="btn-secondary" style={{ fontSize: 14 }}>
            Override
          </Link>
        </div>
      </Section>
    </div>
  );
}
