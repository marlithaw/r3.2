type Tone = "teal" | "orange" | "amber" | "green" | "red" | "ghost";

const TONE_BG: Record<Tone, { bg: string; fg: string; border?: string }> = {
  teal:   { bg: "var(--teal-surface)",         fg: "var(--teal-mid)" },
  orange: { bg: "rgba(255,107,0,0.12)",        fg: "var(--orange-pop)" },
  amber:  { bg: "rgba(255,152,0,0.15)",        fg: "#8a4a00" },
  green:  { bg: "rgba(45,122,79,0.14)",        fg: "var(--green-check)" },
  red:    { bg: "rgba(184,66,61,0.10)",        fg: "var(--red-warn)" },
  ghost:  { bg: "rgba(255,255,255,0.06)",      fg: "rgba(255,255,255,0.85)", border: "rgba(255,255,255,0.2)" },
};

export function Pill({
  children,
  tone = "teal",
  className = "",
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  const t = TONE_BG[tone];
  return (
    <span
      className={`label-mono inline-flex items-center rounded ${className}`}
      style={{
        background: t.bg,
        color: t.fg,
        padding: "4px 8px",
        fontSize: 10,
        letterSpacing: "0.1em",
        border: t.border ? `1px solid ${t.border}` : undefined,
      }}
    >
      {children}
    </span>
  );
}
