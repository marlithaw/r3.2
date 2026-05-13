"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { TRACKS, type TrackDef } from "@/lib/tracks";
import { useEffect, useRef } from "react";

const CHROMELESS = new Set<string>(["/", "/studio"]);

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "/";
  const chromeless = CHROMELESS.has(pathname);
  const active = TRACKS.find((t) => pathname === t.href);

  if (chromeless) return <>{children}</>;

  return (
    <div className="flex min-h-dvh flex-col" style={{ background: "#06222B" }}>
      <StudioHeader active={active} />
      <main className="flex-1 pb-[112px]" style={{ color: "var(--fg-on-dark)" }}>
        {children}
      </main>
      <TrackTapeDeck active={active} />
    </div>
  );
}

function StudioHeader({ active }: { active?: TrackDef }) {
  return (
    <header
      className="sticky top-0 z-30"
      style={{
        background: "rgba(9,45,58,0.85)",
        backdropFilter: "blur(20px) saturate(140%)",
        WebkitBackdropFilter: "blur(20px) saturate(140%)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-3">
        <Link href="/studio" className="flex items-baseline gap-3">
          <span
            className="brand-marker"
            style={{ color: "#FFB347", fontSize: 22, letterSpacing: "0.04em" }}
          >
            R³.A.P.
          </span>
          <span
            className="label-mono"
            style={{ color: "var(--teal-soft)", fontSize: 9 }}
          >
            TEACHER&apos;S EDITION
          </span>
        </Link>

        <div className="flex items-center gap-2">
          {active && (
            <span
              className="font-mono"
              style={{
                color: "#FFB347",
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: "-0.01em",
              }}
            >
              {active.number}
            </span>
          )}
          <span
            className="label-mono"
            style={{ color: "var(--teal-soft)", fontSize: 9 }}
          >
            {active ? active.name.toUpperCase() : "STUDIO"}
          </span>
        </div>
      </div>
    </header>
  );
}

function TrackTapeDeck({ active }: { active?: TrackDef }) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const activeRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    if (activeRef.current && scrollerRef.current) {
      const el = activeRef.current;
      const parent = scrollerRef.current;
      const targetLeft = el.offsetLeft - parent.clientWidth / 2 + el.clientWidth / 2;
      parent.scrollTo({ left: targetLeft, behavior: "smooth" });
    }
  }, [active?.id]);

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-30"
      style={{
        background: "rgba(6,22,28,0.92)",
        backdropFilter: "blur(20px) saturate(140%)",
        WebkitBackdropFilter: "blur(20px) saturate(140%)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
      aria-label="Track navigation"
    >
      <div
        ref={scrollerRef}
        className="no-scrollbar mx-auto flex max-w-3xl gap-1.5 overflow-x-auto px-3 py-3"
      >
        <Link
          href="/studio"
          className="flex min-w-[56px] shrink-0 flex-col items-center justify-center rounded-lg px-2 py-2 transition-colors"
          style={{
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "var(--teal-soft)",
          }}
          aria-label="Studio dashboard"
        >
          <span
            className="font-mono"
            style={{ fontSize: 13, fontWeight: 700, color: "var(--teal-soft)" }}
            aria-hidden
          >
            ☰
          </span>
          <span
            className="label-mono mt-1"
            style={{ fontSize: 8, color: "var(--teal-soft)" }}
          >
            ALL
          </span>
        </Link>

        {TRACKS.map((t) => {
          const isActive = active?.id === t.id;
          return (
            <Link
              key={t.id}
              href={t.href}
              ref={isActive ? activeRef : undefined}
              className="flex min-w-[64px] shrink-0 flex-col items-center justify-center rounded-lg px-2 py-2 transition-all"
              style={{
                background: isActive
                  ? "linear-gradient(180deg, rgba(255,179,71,0.18), rgba(255,152,0,0.05))"
                  : "rgba(255,255,255,0.02)",
                border: isActive
                  ? "1px solid rgba(255,179,71,0.55)"
                  : "1px solid rgba(255,255,255,0.06)",
                boxShadow: isActive
                  ? "0 0 16px rgba(255,152,0,0.25), inset 0 1px 0 rgba(255,179,71,0.2)"
                  : "none",
              }}
            >
              <span
                className="font-mono"
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  color: isActive ? "#FFB347" : "var(--cream)",
                }}
              >
                {t.number}
              </span>
              <span
                className="label-mono mt-1 max-w-[64px] truncate"
                style={{
                  fontSize: 8,
                  color: isActive ? "var(--amber)" : "var(--teal-soft)",
                  opacity: isActive ? 1 : 0.7,
                }}
              >
                {labelFor(t.id)}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

function labelFor(id: TrackDef["id"]): string {
  switch (id) {
    case "fog":      return "FOG";
    case "levels":   return "LEVELS";
    case "track":    return "TRACK";
    case "playbook": return "PLAY";
    case "practice": return "REPS";
    case "live":     return "LIVE";
    case "notes":    return "NOTES";
    case "remix":    return "REMIX";
    case "cypher":   return "CYPHER";
    case "flow":     return "FLOW";
  }
}
