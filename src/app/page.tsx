import Link from "next/link";
import { TRACKS } from "@/lib/tracks";

export default function Home() {
  return (
    <div>
      <section
        className="relative overflow-hidden px-5 py-10"
        style={{
          background: "linear-gradient(160deg,#092D3A 0%,#0C3645 100%)",
          color: "#fff",
        }}
      >
        <div className="mx-auto max-w-3xl">
          <div className="label-mono" style={{ color: "var(--amber)", fontSize: 10 }}>
            R³ AGENCY PRACTICE · TEACHER EDITION
          </div>
          <h1
            className="h-display mt-2"
            style={{ fontSize: 44, color: "#fff", textTransform: "uppercase" }}
          >
            The 10-Track Studio
          </h1>
          <p className="mt-3 max-w-xl text-base" style={{ color: "rgba(255,255,255,0.78)", lineHeight: 1.5 }}>
            Orient. Diagnose. Rehearse. Go live. Capture what worked. Remix what didn&apos;t.
            R³AP is the teacher&apos;s studio for protecting instruction — one track at a time.
          </p>
          <div className="mt-6 flex gap-3">
            <Link href="/fog" className="btn-primary" style={{ fontSize: 14 }}>
              Start with Track 01 →
            </Link>
            <Link href="/live" className="btn-ghost" style={{ fontSize: 13 }}>
              Jump to Live
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-3xl px-5 py-6">
        <div
          className="label-mono mb-3"
          style={{ color: "var(--cool-muted)", fontSize: 10 }}
        >
          THE STUDIO · 10 TRACKS
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {TRACKS.map((t) => (
            <Link
              key={t.id}
              href={t.href}
              className="card relative block p-4 transition-transform hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between">
                <span
                  className="label-mono"
                  style={{ color: "var(--orange-pop)", fontSize: 10 }}
                >
                  TRACK {t.number}
                </span>
                <span
                  className="text-lg"
                  style={{ color: "var(--teal-mid)" }}
                  aria-hidden
                >
                  {t.icon}
                </span>
              </div>
              <div
                className="h-section mt-2"
                style={{ color: "var(--teal-dark)", fontSize: 20 }}
              >
                {t.name}
              </div>
              <p className="mt-1 text-sm" style={{ color: "var(--cool-muted)", lineHeight: 1.4 }}>
                {t.tagline}
              </p>
              <span
                className="label-mono absolute -bottom-2 right-2 select-none"
                style={{ color: "var(--teal-mid)", opacity: 0.08, fontSize: 44 }}
              >
                {t.number}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
