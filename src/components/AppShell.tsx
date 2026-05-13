"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { TRACKS, type TrackDef } from "@/lib/tracks";
import { useEffect, useRef } from "react";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "/";
  const active = TRACKS.find((t) => pathname.startsWith(t.href));
  const onLanding = pathname === "/";

  return (
    <div className="flex min-h-dvh flex-col">
      <StudioHeader active={active} onLanding={onLanding} />
      <main className="flex-1 pb-[88px]">{children}</main>
      <TrackTapeDeck active={active} />
    </div>
  );
}

function StudioHeader({ active, onLanding }: { active?: TrackDef; onLanding: boolean }) {
  return (
    <header
      className="sticky top-0 z-30 border-b border-white/10"
      style={{ background: "var(--teal-dark)", color: "#fff" }}
    >
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span
            className="inline-flex h-7 w-7 items-center justify-center rounded-full"
            style={{ background: "var(--action-grad)" }}
          >
            <span className="label-mono text-white" style={{ fontSize: 10 }}>R³</span>
          </span>
          <span className="label-mono" style={{ color: "var(--amber)", fontSize: 10 }}>
            R³AP · TEACHER STUDIO
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <span
            className="inline-block h-1.5 w-1.5 rounded-full"
            style={{ background: "var(--orange-pop)", boxShadow: "0 0 6px rgba(255,107,0,0.7)" }}
          />
          <span className="label-mono" style={{ fontSize: 9, color: "rgba(255,255,255,0.7)" }}>
            {onLanding ? "10 TRACKS · TEACHER EDITION" : active ? `TRACK ${active.number}` : "STUDIO"}
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
      className="fixed inset-x-0 bottom-0 z-30 border-t"
      style={{
        background: "var(--teal-deepest)",
        borderColor: "rgba(255,255,255,0.08)",
      }}
      aria-label="Track navigation"
    >
      <div
        ref={scrollerRef}
        className="no-scrollbar mx-auto flex max-w-3xl gap-1 overflow-x-auto px-3 py-2"
      >
        {TRACKS.map((t) => {
          const isActive = active?.id === t.id;
          return (
            <Link
              key={t.id}
              href={t.href}
              ref={isActive ? activeRef : undefined}
              className="flex min-w-[64px] shrink-0 flex-col items-center justify-center rounded-lg px-2 py-2 transition-colors"
              style={{
                background: isActive ? "rgba(255,107,0,0.16)" : "transparent",
                color: isActive ? "var(--orange-pop)" : "rgba(255,255,255,0.62)",
                border: isActive
                  ? "1px solid rgba(255,107,0,0.5)"
                  : "1px solid transparent",
              }}
            >
              <span className="text-[16px] leading-none">{t.icon}</span>
              <span
                className="label-mono mt-1"
                style={{ fontSize: 8, color: isActive ? "var(--amber)" : "rgba(255,255,255,0.5)" }}
              >
                {t.number}
              </span>
              <span
                className="label-mono mt-0.5 max-w-[64px] truncate"
                style={{ fontSize: 8.5 }}
              >
                {t.id === "fog"
                  ? "Fog"
                  : t.id === "levels"
                  ? "Levels"
                  : t.id === "track"
                  ? "Track"
                  : t.id === "playbook"
                  ? "Play"
                  : t.id === "practice"
                  ? "Reps"
                  : t.id === "live"
                  ? "Live"
                  : t.id === "notes"
                  ? "Notes"
                  : t.id === "remix"
                  ? "Remix"
                  : t.id === "cypher"
                  ? "Cypher"
                  : "Flow"}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
