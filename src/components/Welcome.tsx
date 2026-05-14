"use client";

import Link from "next/link";
import { useState } from "react";

type Phase = "door" | "lifting" | "ready";

/* Beat timings — the DMX cadence */
const T = {
  archetype1: 600,
  archetype2: 1300,
  archetype3: 2000,
  archetype4: 2700,
  tagline:    3500,
  ready:      4400,
};

const ARCHETYPES = ["SNAKE", "CAT", "RAT", "DOG"] as const;

export function Welcome() {
  const [phase, setPhase] = useState<Phase>("door");
  const [revealed, setRevealed] = useState(0);
  const [showTagline, setShowTagline] = useState(false);

  function liftFog() {
    if (phase !== "door") return;
    setPhase("lifting");
    const timers: number[] = [];
    timers.push(window.setTimeout(() => setRevealed(1), T.archetype1));
    timers.push(window.setTimeout(() => setRevealed(2), T.archetype2));
    timers.push(window.setTimeout(() => setRevealed(3), T.archetype3));
    timers.push(window.setTimeout(() => setRevealed(4), T.archetype4));
    timers.push(window.setTimeout(() => setShowTagline(true), T.tagline));
    timers.push(window.setTimeout(() => setPhase("ready"), T.ready));
  }

  return (
    <div
      className="fixed inset-0 isolate overflow-hidden"
      style={{ background: "#06222B" }}
      aria-label="R³.A.P. Welcome"
    >
      <Backdrop phase={phase} />
      <FogBank phase={phase} />
      <Vignette />

      <div className="relative z-10 flex h-full w-full items-center justify-center px-6">
        {phase === "door" ? (
          <DoorScene onLift={liftFog} />
        ) : (
          <RevealScene revealed={revealed} showTagline={showTagline} phase={phase} />
        )}
      </div>
    </div>
  );
}

/* ============================================================
   Backdrop — studio photo behind the fog. Stays mostly hidden,
   brightens slightly as the fog lifts.
   ============================================================ */

function Backdrop({ phase }: { phase: Phase }) {
  const lifted = phase !== "door";
  return (
    <div
      aria-hidden
      className="absolute inset-0 bg-cover bg-center"
      style={{
        backgroundImage: "url('/welcome-bg.png')",
        filter: lifted
          ? "blur(2px) brightness(0.7) saturate(0.95)"
          : "blur(14px) brightness(0.25) saturate(0.7)",
        transform: lifted ? "scale(1.01)" : "scale(1.06)",
        transition: "filter 4500ms cubic-bezier(0.4,0,0.2,1), transform 4500ms cubic-bezier(0.4,0,0.2,1)",
      }}
    />
  );
}

function Vignette() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        background:
          "radial-gradient(120% 80% at 50% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 75%, rgba(0,0,0,0.92) 100%)",
      }}
    />
  );
}

/* ============================================================
   FogBank — heavy fog on the Door. Lifts physically on the Click.
   ============================================================ */

function FogBank({ phase }: { phase: Phase }) {
  if (phase === "ready") return null;
  const lifting = phase === "lifting";
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${lifting ? "fog-lifting" : ""}`}
    >
      <div className="fog-layer fog-1" />
      <div className="fog-layer fog-2" />
      <div className="fog-layer fog-3" />
      {lifting && <Motes />}
    </div>
  );
}

function Motes() {
  const motes = [
    { left: "10%", top: "85%", mx: "-12px", delay: 0,    size: 2 },
    { left: "22%", top: "78%", mx: "8px",   delay: 200,  size: 1.5 },
    { left: "32%", top: "92%", mx: "-6px",  delay: 350,  size: 2 },
    { left: "44%", top: "82%", mx: "14px",  delay: 100,  size: 2.5 },
    { left: "53%", top: "88%", mx: "-10px", delay: 500,  size: 1.5 },
    { left: "62%", top: "76%", mx: "6px",   delay: 700,  size: 2 },
    { left: "71%", top: "90%", mx: "-14px", delay: 250,  size: 2 },
    { left: "82%", top: "84%", mx: "10px",  delay: 600,  size: 1.5 },
    { left: "88%", top: "94%", mx: "-8px",  delay: 800,  size: 2.5 },
    { left: "18%", top: "70%", mx: "4px",   delay: 1000, size: 1.5 },
    { left: "48%", top: "72%", mx: "-4px",  delay: 1100, size: 2 },
    { left: "76%", top: "68%", mx: "12px",  delay: 900,  size: 1.5 },
  ];
  return (
    <>
      {motes.map((m, i) => (
        <span
          key={i}
          className="mote"
          style={
            {
              left: m.left,
              top: m.top,
              width: m.size,
              height: m.size,
              animationDelay: `${m.delay}ms`,
              "--mx": m.mx,
            } as React.CSSProperties
          }
        />
      ))}
    </>
  );
}

/* ============================================================
   Door — fog everywhere. A halo cuts a pocket around the
   button + brand so they read as the only clear thing.
   ============================================================ */

function DoorScene({ onLift }: { onLift: () => void }) {
  return (
    <div className="reveal-up flex flex-col items-center text-center">
      <div className="relative flex flex-col items-center">
        {/* clearing halo behind the CTA + brand */}
        <div
          aria-hidden
          className="absolute"
          style={{
            inset: "-100px -120px",
            background:
              "radial-gradient(circle at 50% 50%, rgba(255,179,71,0.22) 0%, rgba(255,179,71,0.10) 30%, rgba(6,34,43,0) 70%)",
            filter: "blur(24px)",
            zIndex: 0,
          }}
        />

        <div className="relative z-10 flex flex-col items-center" style={{ paddingTop: 8 }}>
          <div className="label-mono mb-6" style={{ color: "var(--teal-soft)", fontSize: 10 }}>
            TEACHER&apos;S EDITION
          </div>

          <button
            type="button"
            onClick={onLift}
            className="btn-pad btn-pad-primary"
            style={{ minWidth: 280, fontSize: 16, padding: "16px 28px" }}
          >
            Ready to Lift the Fog
          </button>

          <div className="mt-10 brand-marker" style={{ color: "#FFB347", fontSize: 64, letterSpacing: "0.04em", lineHeight: 1 }}>
            R³.A.P.
          </div>
          <div
            className="mt-2 font-display"
            style={{ color: "var(--cream)", fontSize: 17, fontWeight: 500, letterSpacing: "0.01em" }}
          >
            R³ Agency Practice
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   Reveal — DMX-cadence punch-in of SNAKE / CAT / RAT / DOG,
   then "Let's R.A.P. about it." + studio CTA.
   ============================================================ */

function RevealScene({
  revealed,
  showTagline,
  phase,
}: {
  revealed: number;
  showTagline: boolean;
  phase: Phase;
}) {
  return (
    <div className="flex w-full max-w-md flex-col items-center text-center">
      <div className="label-mono" style={{ color: "var(--teal-soft)", fontSize: 10 }}>
        WHO&apos;S IN THE ROOM
      </div>

      <h1
        className="brand-marker mt-3"
        style={{ color: "#FFB347", fontSize: 52, letterSpacing: "0.04em", lineHeight: 1 }}
      >
        R³.A.P.
      </h1>
      <div
        className="mt-1 font-display"
        style={{ color: "var(--cream)", fontSize: 15, fontWeight: 500, letterSpacing: "0.01em" }}
      >
        R³ Agency Practice
      </div>

      <div className="mt-10 flex flex-col items-start gap-2" style={{ minHeight: 240 }}>
        {ARCHETYPES.map((word, i) => (
          <ArchetypeRow
            key={word}
            word={word}
            index={i}
            isOpen={revealed > i}
          />
        ))}
      </div>

      <div className="mt-8 flex flex-col items-center" style={{ minHeight: 110 }}>
        {showTagline && (
          <div className="reveal-up flex flex-col items-center">
            <div
              className="script"
              style={{ color: "var(--cream)", fontSize: 32, lineHeight: 1.1 }}
            >
              Let&apos;s R.A.P. about it.
            </div>

            {phase === "ready" && (
              <Link
                href="/studio"
                className="btn-pad btn-pad-primary reveal-up mt-6"
                style={{ minWidth: 240 }}
              >
                Enter the Studio →
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function ArchetypeRow({
  word,
  index,
  isOpen,
}: {
  word: string;
  index: number;
  isOpen: boolean;
}) {
  // Reserve the row's vertical space so the layout doesn't jump as each lands.
  return (
    <div className="flex items-baseline gap-4" style={{ minHeight: 56, opacity: isOpen ? 1 : 0 }}>
      {isOpen && (
        <>
          <span
            className="font-mono beat-drop"
            style={{
              color: "rgba(255,179,71,0.55)",
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.02em",
              animationDelay: "60ms",
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            className="brand-marker beat-drop"
            style={{
              color: "var(--fg-on-dark)",
              fontSize: 44,
              letterSpacing: "0.02em",
              lineHeight: 1,
            }}
          >
            {word}.
          </span>
        </>
      )}
    </div>
  );
}
