import Link from "next/link";
import { GROUPS, tracksByGroup, type TrackDef } from "@/lib/tracks";

export const metadata = {
  title: "The Studio · R³.A.P.",
};

export default function StudioPage() {
  return (
    <div
      className="relative isolate min-h-dvh overflow-x-hidden pb-32"
      style={{ background: "#06222B" }}
    >
      <AmbientBackdrop />
      <ConsoleHeader />

      <div className="relative z-10 mx-auto max-w-3xl px-5">
        {GROUPS.map((g, idx) => (
          <GroupSection key={g.id} group={g} tracks={tracksByGroup(g.id)} index={idx} />
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   Backdrop — soft gradient + faint studio image so the glass
   has something behind it to refract.
   ============================================================ */

function AmbientBackdrop() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0"
        style={{
          backgroundImage: "url('/welcome-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(40px) brightness(0.18) saturate(0.7)",
          opacity: 0.55,
          transform: "scale(1.1)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            "radial-gradient(120% 100% at 50% 0%, rgba(255,152,0,0.06) 0%, rgba(255,152,0,0) 45%), linear-gradient(180deg, rgba(6,34,43,0.4) 0%, rgba(6,34,43,0.92) 60%, rgba(6,34,43,1) 100%)",
        }}
      />
    </>
  );
}

/* ============================================================
   Header — Permanent Marker brand + Space Mono meta
   ============================================================ */

function ConsoleHeader() {
  return (
    <header className="relative z-10 px-5 pt-10 pb-8">
      <div className="mx-auto flex max-w-3xl items-start justify-between">
        <div>
          <div className="label-mono" style={{ color: "var(--teal-soft)", fontSize: 10 }}>
            AH-HA COACHING · TEACHER&apos;S EDITION
          </div>
          <div
            className="brand-marker mt-2"
            style={{ color: "#FFB347", fontSize: 56, letterSpacing: "0.04em" }}
          >
            R³.A.P.
          </div>
          <h1
            className="h-display mt-2"
            style={{ fontSize: 28, color: "var(--fg-on-dark)", maxWidth: "16ch" }}
          >
            The Studio
          </h1>
          <p
            className="mt-2 max-w-sm"
            style={{ color: "var(--teal-soft)", fontSize: 14, lineHeight: 1.55 }}
          >
            Ten tracks across three phases. Choose where you are.
          </p>
        </div>

        <div className="flex flex-col items-end gap-2">
          <div
            className="label-mono inline-flex items-center gap-2 rounded-full px-3 py-1.5"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "var(--teal-soft)",
              fontSize: 9,
            }}
          >
            <span
              className="live-dot inline-block h-1.5 w-1.5 rounded-full"
              style={{ background: "var(--amber)" }}
            />
            STUDIO · LIVE
          </div>
          <Link
            href="/"
            className="label-mono"
            style={{ color: "rgba(255,255,255,0.5)", fontSize: 9 }}
          >
            ← THE DOOR
          </Link>
        </div>
      </div>
    </header>
  );
}

/* ============================================================
   Group section — Phase eyebrow, generous negative space
   ============================================================ */

function GroupSection({
  group,
  tracks,
  index,
}: {
  group: (typeof GROUPS)[number];
  tracks: TrackDef[];
  index: number;
}) {
  return (
    <section
      className="relative"
      style={{
        marginTop: index === 0 ? 24 : 64,
      }}
    >
      <div className="flex items-baseline justify-between">
        <div>
          <div className="label-mono" style={{ color: "var(--amber)", fontSize: 10 }}>
            {group.eyebrow}
          </div>
          <h2 className="h-section mt-2" style={{ fontSize: 24, color: "var(--fg-on-dark)" }}>
            {group.title}
          </h2>
          <p className="mt-1 max-w-md" style={{ color: "var(--teal-soft)", fontSize: 13 }}>
            {group.subtitle}
          </p>
        </div>
        <div
          className="label-mono"
          style={{ color: "rgba(148,197,204,0.45)", fontSize: 9 }}
        >
          {String(tracks.length).padStart(2, "0")} TRACKS
        </div>
      </div>

      <div
        className={
          group.id === "in-the-moment"
            ? "mt-6"
            : "mt-6 grid gap-4 sm:grid-cols-2"
        }
      >
        {tracks.map((t) =>
          group.id === "in-the-moment" ? (
            <FeatureTrackCard key={t.id} track={t} />
          ) : (
            <TrackCard key={t.id} track={t} />
          ),
        )}
      </div>
    </section>
  );
}

/* ============================================================
   Track cards — glassmorphism, big Space Mono numbers, NO ASCII
   ============================================================ */

function TrackCard({ track }: { track: TrackDef }) {
  return (
    <Link
      href={track.href}
      className="glass-studio group relative block overflow-hidden p-5 transition-transform hover:-translate-y-0.5 hover:scale-[1.005]"
      style={{ minHeight: 148 }}
    >
      <div className="flex items-start justify-between">
        <span
          className="font-mono"
          style={{
            color: "rgba(255,179,71,0.85)",
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: 1,
          }}
        >
          {track.number}
        </span>
        <span
          className="label-mono"
          style={{
            color: "var(--teal-soft)",
            fontSize: 9,
            opacity: 0.7,
          }}
        >
          TRACK
        </span>
      </div>

      <h3
        className="h-section mt-5"
        style={{
          fontSize: 19,
          color: "var(--fg-on-dark)",
          letterSpacing: "-0.015em",
          lineHeight: 1.2,
        }}
      >
        {track.name}
      </h3>
      <p
        className="mt-2"
        style={{
          color: "var(--teal-soft)",
          fontSize: 13,
          lineHeight: 1.5,
        }}
      >
        {track.tagline}
      </p>

      {/* Watermark numeral */}
      <span
        aria-hidden
        className="font-mono pointer-events-none absolute -bottom-4 -right-2 select-none"
        style={{
          color: "rgba(255,179,71,0.05)",
          fontSize: 110,
          fontWeight: 700,
          lineHeight: 1,
        }}
      >
        {track.number}
      </span>
    </Link>
  );
}

function FeatureTrackCard({ track }: { track: TrackDef }) {
  return (
    <Link
      href={track.href}
      className="glass-studio-amber group relative block overflow-hidden p-6 transition-transform hover:-translate-y-0.5"
    >
      <div className="flex items-center justify-between">
        <span
          className="font-mono"
          style={{
            color: "#FFB347",
            fontSize: 36,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: 1,
          }}
        >
          {track.number}
        </span>
        <div className="flex items-center gap-2">
          <span
            className="live-dot inline-block h-2 w-2 rounded-full"
            style={{ background: "var(--orange-pop)" }}
          />
          <span
            className="label-mono"
            style={{ color: "var(--amber)", fontSize: 10 }}
          >
            ON AIR
          </span>
        </div>
      </div>

      <h3
        className="h-section mt-6"
        style={{
          fontSize: 32,
          color: "var(--fg-on-dark)",
          letterSpacing: "-0.025em",
        }}
      >
        {track.name}
      </h3>
      <p className="mt-2 max-w-md" style={{ color: "var(--cream)", fontSize: 15, lineHeight: 1.5 }}>
        {track.tagline}
      </p>

      <div
        className="label-mono mt-5 inline-flex items-center gap-2"
        style={{ color: "var(--amber)", fontSize: 10 }}
      >
        OPEN THE LIVE BOOTH →
      </div>
    </Link>
  );
}
