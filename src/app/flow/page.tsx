import { ACADEMIC_EVIDENCE, FLOW_METRICS } from "@/lib/mockData";
import { Section } from "@/components/ui/ScreenHero";

export default function FlowPage() {
  return (
    <div>
      <section
        className="relative overflow-hidden px-5 py-8"
        style={{
          background: "linear-gradient(170deg,#092D3A,#0C3645)",
          color: "#fff",
        }}
      >
        <div className="mx-auto max-w-3xl">
          <div className="label-mono" style={{ color: "var(--amber)", fontSize: 10 }}>
            TRACK 10 · MASTER THE FLOW
          </div>
          <h1
            className="h-display mt-2"
            style={{ fontSize: 28, color: "#fff" }}
          >
            The new response is the new rhythm.
          </h1>

          <div className="mt-5 grid grid-cols-2 gap-2">
            {FLOW_METRICS.map((m) => (
              <div
                key={m.label}
                className="rounded-xl p-4"
                style={{
                  background: "rgba(26,95,122,0.30)",
                  border: "1px solid rgba(50,117,140,0.40)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <div className="label-mono" style={{ color: "rgba(255,255,255,0.7)", fontSize: 9 }}>
                  {m.label}
                </div>
                <div className="metric mt-1" style={{ color: "var(--orange-pop)", fontSize: 30 }}>
                  {m.value}
                </div>
                <div className="label-mono mt-1" style={{ color: "var(--green-check)", fontSize: 10 }}>
                  {m.delta}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Section>
        <div
          className="rounded-xl p-5 text-center"
          style={{
            background: "rgba(255,152,0,0.10)",
            border: "1px solid rgba(255,152,0,0.35)",
          }}
        >
          <div className="label-mono" style={{ color: "var(--amber)", fontSize: 10 }}>
            ★ PLURAL STATE UNLOCKED
          </div>
          <div
            className="marker mt-2"
            style={{ color: "var(--teal-dark)", fontSize: 28, lineHeight: 1.15 }}
          >
            &quot;The new response is the new rhythm.&quot;
          </div>
          <div className="mt-1 text-sm" style={{ color: "var(--cool-muted)" }}>
            12 days · sustained · academic evidence confirmed
          </div>
        </div>
      </Section>

      <Section label="ACADEMIC EVIDENCE">
        <div className="grid grid-cols-3 gap-2">
          {ACADEMIC_EVIDENCE.map((e) => (
            <div key={e.label} className="card card-growth p-3">
              <div className="label-mono" style={{ color: "var(--cool-muted)", fontSize: 9 }}>
                {e.label}
              </div>
              <div
                className="metric mt-1"
                style={{ color: "var(--green-check)", fontSize: 22 }}
              >
                {e.value}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section label="TIME-TO-READINESS · 14 DAYS">
        <div className="card p-4">
          <div className="flex h-32 items-end gap-1">
            {[7.5, 7.2, 6.8, 6.5, 5.9, 5.6, 5.1, 4.8, 4.4, 4.2, 4.0, 3.8, 3.7, 3.4].map(
              (v, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t"
                  style={{
                    height: `${(v / 8) * 100}%`,
                    background: i === 13 ? "var(--orange-pop)" : "var(--teal-bright)",
                    opacity: i === 13 ? 1 : 0.4 + i * 0.04,
                  }}
                  title={`Day ${i + 1}: ${v}min`}
                />
              ),
            )}
          </div>
          <div className="mt-2 flex justify-between label-mono" style={{ color: "var(--cool-muted)", fontSize: 9 }}>
            <span>DAY 1 · 7:30</span>
            <span style={{ color: "var(--orange-pop)" }}>DAY 14 · 3:24</span>
          </div>
        </div>
      </Section>
    </div>
  );
}
