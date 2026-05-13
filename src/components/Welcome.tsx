"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Phase = "door" | "breathing" | "reveal" | "ready";

const TIMINGS = {
  breath: 6000,    // breathing animation (matches CSS)
  reveal: 3200,    // ribbon draws + script writes + brand locks in
};

export function Welcome() {
  const [phase, setPhase] = useState<Phase>("door");

  useEffect(() => {
    if (phase === "breathing") {
      const t1 = setTimeout(() => setPhase("reveal"), TIMINGS.breath);
      return () => clearTimeout(t1);
    }
    if (phase === "reveal") {
      const t2 = setTimeout(() => setPhase("ready"), TIMINGS.reveal);
      return () => clearTimeout(t2);
    }
  }, [phase]);

  function begin() {
    setPhase("breathing");
  }

  function skip() {
    setPhase("ready");
  }

  return (
    <div
      className="fixed inset-0 isolate overflow-hidden"
      style={{ background: "#06222B" }}
      aria-label="R³.A.P. Welcome"
    >
      <Backdrop phase={phase} />
      <FogBank phase={phase} />

      {/* Subtle film grain / vignette so the bg never reads flat */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 35%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 75%, rgba(0,0,0,0.85) 100%)",
        }}
      />

      <Skip phase={phase} onClick={skip} />

      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6">
        {phase === "door" && <DoorPhase onBegin={begin} />}
        {phase === "breathing" && <BreathingPhase />}
        {phase === "reveal" && <RevealPhase />}
        {phase === "ready" && <ReadyPhase />}
      </div>
    </div>
  );
}

/* ============================================================
   Backdrop — studio image with fog that clears on breathing
   ============================================================ */

function Backdrop({ phase }: { phase: Phase }) {
  // Photo darkness/blur is its own track. Fog handled by <FogBank /> on top.
  const isCleared = phase === "reveal" || phase === "ready";
  const isClearing = phase === "breathing";

  let filter = "blur(14px) brightness(0.35) saturate(0.75)";
  let transform = "scale(1.06)";
  if (isClearing) {
    filter = "blur(4px) brightness(0.65) saturate(0.9)";
    transform = "scale(1.02)";
  }
  if (isCleared) {
    filter = "blur(0px) brightness(0.85) saturate(1)";
    transform = "scale(1)";
  }

  return (
    <div
      aria-hidden
      className="absolute inset-0 bg-cover bg-center"
      style={{
        backgroundImage: "url('/welcome-bg.png')",
        filter,
        transform,
        transition: "filter 5500ms cubic-bezier(0.4, 0, 0.2, 1), transform 5500ms cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    />
  );
}

/* ============================================================
   FogBank — real volumetric fog. Drifts at rest, lifts on breath.
   ============================================================ */

function FogBank({ phase }: { phase: Phase }) {
  const lifting = phase === "breathing";
  const gone = phase === "reveal" || phase === "ready";

  if (gone) return null;

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${lifting ? "fog-lifting" : ""}`}
    >
      <div className="fog-layer fog-1" />
      <div className="fog-layer fog-2" />
      <div className="fog-layer fog-3" />

      {/* Dust motes — only visible while lifting */}
      {lifting && <Motes />}
    </div>
  );
}

function Motes() {
  // Deterministic positions so SSR matches and we don't hydrate-mismatch.
  const motes = [
    { left: "12%", top: "85%", mx: "-12px", delay: 200, size: 2 },
    { left: "22%", top: "78%", mx: "8px",   delay: 400, size: 1.5 },
    { left: "31%", top: "92%", mx: "-6px",  delay: 0,   size: 2 },
    { left: "44%", top: "82%", mx: "14px",  delay: 600, size: 2.5 },
    { left: "53%", top: "88%", mx: "-10px", delay: 300, size: 1.5 },
    { left: "62%", top: "76%", mx: "6px",   delay: 800, size: 2 },
    { left: "71%", top: "90%", mx: "-14px", delay: 150, size: 2 },
    { left: "82%", top: "84%", mx: "10px",  delay: 500, size: 1.5 },
    { left: "88%", top: "94%", mx: "-8px",  delay: 700, size: 2.5 },
    { left: "18%", top: "70%", mx: "4px",   delay: 1000, size: 1.5 },
    { left: "48%", top: "72%", mx: "-4px",  delay: 1100, size: 2 },
    { left: "76%", top: "68%", mx: "12px",  delay: 900, size: 1.5 },
  ];
  return (
    <>
      {motes.map((m, i) => (
        <span
          key={i}
          className="mote"
          style={{
            left: m.left,
            top: m.top,
            width: m.size,
            height: m.size,
            animationDelay: `${m.delay}ms`,
            ["--mx" as string]: m.mx,
          } as React.CSSProperties}
        />
      ))}
    </>
  );
}

/* ============================================================
   Phase 0 — The Door
   ============================================================ */

function DoorPhase({ onBegin }: { onBegin: () => void }) {
  return (
    <div className="reveal-up flex max-w-md flex-col items-center text-center">
      <div className="label-mono" style={{ color: "var(--teal-soft)" }}>
        AH-HA COACHING · TEACHER&apos;S EDITION
      </div>

      <div className="mt-8 brand-marker" style={{ color: "#FFB347", fontSize: 72, letterSpacing: "0.04em" }}>
        R³.A.P.
      </div>
      <div
        className="mt-1 font-display"
        style={{ color: "var(--cream)", fontSize: 16, fontWeight: 500, letterSpacing: "0.01em" }}
      >
        R³ Agency Practice
      </div>

      <p
        className="mt-10 max-w-xs text-balance"
        style={{ color: "var(--teal-soft)", fontSize: 16, lineHeight: 1.6 }}
      >
        Before the room. Before the moment. Before you react —
        <span className="script ml-1" style={{ color: "var(--cream)", fontSize: 22 }}>
          breathe.
        </span>
      </p>

      <button
        type="button"
        onClick={onBegin}
        className="btn-pad btn-pad-primary mt-10"
        style={{ minWidth: 240 }}
      >
        Step Through the Door
      </button>

      <div
        className="label-mono mt-6"
        style={{ color: "rgba(255,255,255,0.5)", fontSize: 9 }}
      >
        SIX-SECOND ORIENTATION
      </div>
    </div>
  );
}

/* ============================================================
   Phase 1 — Breathing
   ============================================================ */

function BreathingPhase() {
  const [cue, setCue] = useState<"in" | "hold" | "out">("in");

  useEffect(() => {
    const t1 = setTimeout(() => setCue("hold"), 2700);
    const t2 = setTimeout(() => setCue("out"), 3300);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative" style={{ width: 280, height: 280 }}>
        {/* outer guide ring */}
        <div
          className="absolute inset-0 rounded-full"
          style={{ border: "1px solid rgba(255,179,71,0.2)" }}
        />
        {/* breath circle */}
        <div
          className="breath-circle absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(255,179,71,0.35) 0%, rgba(255,152,0,0.18) 40%, rgba(255,152,0,0) 75%)",
            border: "1.5px solid rgba(255,179,71,0.6)",
            boxShadow:
              "0 0 80px rgba(255,152,0,0.25), inset 0 0 60px rgba(255,179,71,0.18)",
          }}
        />
        {/* center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="label-mono" style={{ color: "var(--teal-soft)", fontSize: 10 }}>
            BREATHE WITH THE LIGHT
          </div>
          <div
            className="script mt-3"
            style={{ color: "var(--cream)", fontSize: 36, lineHeight: 1, transition: "opacity 200ms" }}
            key={cue}
          >
            {cue === "in" && "breathe in…"}
            {cue === "hold" && "hold."}
            {cue === "out" && "let it go."}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   Phase 2 — Reveal: cassette ribbon writes "Welcome to the…"
              then "R³ Agency Practice" locks in
   ============================================================ */

function RevealPhase() {
  const [showScript, setShowScript] = useState(false);
  const [showLock, setShowLock] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowScript(true), 1100);
    const t2 = setTimeout(() => setShowLock(true), 2100);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div className="flex max-w-md flex-col items-center text-center">
      <Cassette />

      <div style={{ minHeight: 50 }} className="mt-6">
        {showScript && (
          <div
            className="script reveal-up"
            style={{ color: "var(--cream)", fontSize: 38, lineHeight: 1 }}
          >
            Welcome to the…
          </div>
        )}
      </div>

      <div style={{ minHeight: 90 }} className="mt-2">
        {showLock && (
          <div className="lock-in">
            <h1
              className="h-display"
              style={{ fontSize: 42, color: "var(--fg-on-dark)", textWrap: "balance" as const }}
            >
              R³ Agency Practice
            </h1>
            <div
              className="brand-marker mt-2"
              style={{ color: "#FFB347", fontSize: 28, letterSpacing: "0.04em" }}
            >
              R³.A.P.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* The cassette: SVG with two reels + a magnetic ribbon path that draws */
function Cassette() {
  return (
    <svg
      viewBox="0 0 320 200"
      width={300}
      height={188}
      aria-hidden
      style={{ filter: "drop-shadow(0 18px 28px rgba(0,0,0,0.55))" }}
    >
      <defs>
        <linearGradient id="caseGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2A2F33" />
          <stop offset="100%" stopColor="#101315" />
        </linearGradient>
        <linearGradient id="labelGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFB347" />
          <stop offset="100%" stopColor="#E47900" />
        </linearGradient>
        <radialGradient id="reelGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#3A3F44" />
          <stop offset="100%" stopColor="#0E1112" />
        </radialGradient>
      </defs>

      {/* body */}
      <rect
        x="20"
        y="30"
        width="280"
        height="130"
        rx="10"
        fill="url(#caseGrad)"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="1"
      />
      {/* label */}
      <rect x="40" y="46" width="240" height="40" rx="3" fill="url(#labelGrad)" opacity="0.9" />
      <text
        x="160"
        y="71"
        textAnchor="middle"
        fontFamily="var(--font-space-mono), monospace"
        fontSize="13"
        fontWeight="700"
        letterSpacing="0.18em"
        fill="#1A1410"
      >
        R³.A.P. — SIDE A
      </text>

      {/* reel windows */}
      <circle cx="100" cy="125" r="26" fill="url(#reelGrad)" stroke="rgba(255,255,255,0.05)" />
      <circle cx="220" cy="125" r="26" fill="url(#reelGrad)" stroke="rgba(255,255,255,0.05)" />

      {/* spinning teeth */}
      <g className="reel-spin" style={{ transformOrigin: "100px 125px" }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <rect
            key={i}
            x="98"
            y="105"
            width="4"
            height="10"
            fill="#FFB347"
            opacity="0.85"
            transform={`rotate(${i * 60} 100 125)`}
          />
        ))}
        <circle cx="100" cy="125" r="6" fill="#1A1410" />
      </g>
      <g className="reel-spin" style={{ transformOrigin: "220px 125px", animationDuration: "5s" }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <rect
            key={i}
            x="218"
            y="105"
            width="4"
            height="10"
            fill="#FFB347"
            opacity="0.85"
            transform={`rotate(${i * 60} 220 125)`}
          />
        ))}
        <circle cx="220" cy="125" r="6" fill="#1A1410" />
      </g>

      {/* ribbon — pulls out of the right reel and snakes down/across */}
      <path
        className="ribbon-path"
        d="M 220 151
           C 245 175, 215 190, 180 188
           C 145 186, 110 175, 80 192"
        fill="none"
        stroke="#FFB347"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.95"
      />
    </svg>
  );
}

/* ============================================================
   Phase 3 — Ready
   ============================================================ */

function ReadyPhase() {
  return (
    <div className="reveal-up flex max-w-md flex-col items-center text-center">
      <div className="label-mono" style={{ color: "var(--teal-soft)" }}>
        TEACHER&apos;S EDITION
      </div>

      <h1 className="h-display mt-4" style={{ fontSize: 44 }}>
        R³ Agency Practice
      </h1>
      <div
        className="brand-marker mt-2"
        style={{ color: "#FFB347", fontSize: 32, letterSpacing: "0.04em" }}
      >
        R³.A.P.
      </div>

      <p
        className="mt-6 max-w-xs"
        style={{ color: "var(--teal-soft)", fontSize: 15, lineHeight: 1.6 }}
      >
        The studio is open. Ten tracks. One rhythm.
        <span className="script ml-1" style={{ color: "var(--cream)", fontSize: 20 }}>
          let&apos;s R.A.P. about it.
        </span>
      </p>

      <Link href="/studio" className="btn-pad btn-pad-primary mt-8" style={{ minWidth: 240 }}>
        Enter the Studio →
      </Link>
    </div>
  );
}

function Skip({ phase, onClick }: { phase: Phase; onClick: () => void }) {
  if (phase === "ready") return null;
  return (
    <button
      type="button"
      onClick={onClick}
      className="label-mono absolute right-5 top-5 z-20 rounded-full px-3 py-1.5 transition-colors"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.12)",
        color: "rgba(255,255,255,0.55)",
        fontSize: 9,
        letterSpacing: "0.18em",
      }}
    >
      SKIP →
    </button>
  );
}
