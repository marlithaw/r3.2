"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LIVE_CALLOUTS } from "@/lib/mockData";

export default function LivePage() {
  const [elapsed, setElapsed] = useState(0);
  const [captured, setCaptured] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const mm = String(Math.floor(elapsed / 60)).padStart(2, "0");
  const ss = String(elapsed % 60).padStart(2, "0");

  return (
    <div
      className="relative min-h-[calc(100dvh-140px)] px-4 py-4"
      style={{
        background: "linear-gradient(160deg,#092D3A,#0C3645)",
        color: "#fff",
      }}
    >
      <div className="mx-auto max-w-3xl">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className="live-dot inline-block h-2.5 w-2.5 rounded-full"
              style={{ background: "var(--orange-pop)" }}
            />
            <span className="label-mono" style={{ color: "var(--orange-pop)", fontSize: 11 }}>
              ● LIVE
            </span>
          </div>
          <span
            className="label-mono"
            style={{ color: "rgba(255,255,255,0.7)", fontSize: 10 }}
          >
            Track 06 · 4th period · {mm}:{ss}
          </span>
        </div>

        <div className="glass-deep relative p-4">
          <Link
            href="/notes"
            className="absolute -top-2 right-3 inline-flex flex-col items-center justify-center rounded-full text-center"
            style={{
              width: 56,
              height: 56,
              background: "var(--action-grad)",
              color: "#fff",
              boxShadow: "0 6px 14px rgba(255,107,0,0.35)",
              fontFamily: "var(--font-jetbrains), monospace",
              fontWeight: 700,
              fontSize: 9,
              letterSpacing: "0.06em",
              lineHeight: 1.1,
              padding: 4,
              textTransform: "uppercase",
            }}
          >
            START<br />INSTR
          </Link>

          <span
            className="label-mono inline-block rounded px-2 py-1"
            style={{
              background: "rgba(255,107,0,0.18)",
              color: "var(--orange-pop)",
              fontSize: 10,
            }}
          >
            REFUSING ROUTINE
          </span>

          <div className="mt-3 flex flex-col divide-y" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
            {LIVE_CALLOUTS.map((z) => {
              const color =
                z.zone === "say"
                  ? "var(--orange-pop)"
                  : z.zone === "dont"
                  ? "var(--red-warn)"
                  : z.zone === "next"
                  ? "var(--teal-bright)"
                  : "var(--amber)";
              const isSay = z.zone === "say";
              const isDont = z.zone === "dont";
              return (
                <div key={z.zone} className="py-3">
                  <div className="label-mono" style={{ color, fontSize: 10 }}>
                    {z.label}
                  </div>
                  <div
                    className="mt-1"
                    style={{
                      borderLeft: `3px solid ${color}`,
                      paddingLeft: 10,
                      fontFamily: isDont
                        ? "var(--font-jetbrains), monospace"
                        : "var(--font-inter-tight), system-ui, sans-serif",
                      fontSize: isSay ? 16 : isDont ? 12 : 13,
                      fontWeight: isSay ? 600 : 400,
                      color: isDont ? "rgba(184,66,61,0.95)" : "rgba(255,255,255,0.92)",
                      textDecoration: isDont ? "line-through" : "none",
                      lineHeight: 1.35,
                      fontStyle: z.zone === "ret" ? "italic" : "normal",
                    }}
                  >
                    {z.body}
                  </div>
                </div>
              );
            })}

            <div className="py-3">
              <button
                type="button"
                onClick={() => setCaptured(true)}
                className="btn-ghost"
                style={{ fontSize: 12, padding: "8px 14px" }}
              >
                {captured ? "Captured ✓ — Send to Liner Notes" : "Capture This ✎"}
              </button>
              {captured && (
                <Link
                  href="/notes"
                  className="btn-primary ml-2"
                  style={{ fontSize: 12, padding: "8px 14px" }}
                >
                  Go to Liner Notes →
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          {[
            { label: "TIME-TO-LEARN", v: "3:12", c: "var(--orange-pop)" },
            { label: "REDIRECTS",     v: "2",    c: "var(--amber)" },
            { label: "ON-TASK",       v: "84%",  c: "var(--green-check)" },
          ].map((m) => (
            <div key={m.label} className="glass-panel p-3">
              <div className="label-mono" style={{ color: "rgba(255,255,255,0.7)", fontSize: 9 }}>
                {m.label}
              </div>
              <div className="metric mt-1" style={{ fontSize: 22, color: m.c }}>
                {m.v}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
