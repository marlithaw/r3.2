type Props = {
  tag: string;
  title: string;
  subtitle: string;
  variant?: "default" | "deep";
  center?: boolean;
  children?: React.ReactNode;
};

export function ScreenHero({ tag, title, subtitle, variant = "default", center, children }: Props) {
  return (
    <section
      className="relative overflow-hidden px-5 py-6"
      style={{
        background:
          variant === "deep"
            ? "linear-gradient(160deg,#092D3A 0%,#0C3645 100%)"
            : "var(--teal-dark)",
        color: "#fff",
      }}
    >
      <div className={`mx-auto max-w-3xl ${center ? "text-center" : ""}`}>
        <div className="label-mono" style={{ color: "var(--amber)", fontSize: 10 }}>
          {tag}
        </div>
        <h1
          className="h-display mt-2"
          style={{ fontSize: 28, color: "#fff", textTransform: "uppercase" }}
        >
          {title}
        </h1>
        <p
          className="mt-1 text-sm"
          style={{ color: "rgba(255,255,255,0.72)", lineHeight: 1.45 }}
        >
          {subtitle}
        </p>
        {children}
      </div>
    </section>
  );
}

export function Section({
  label,
  children,
  className = "",
}: {
  label?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`mx-auto w-full max-w-3xl px-5 py-4 ${className}`}>
      {label && (
        <div
          className="label-mono mb-2"
          style={{ color: "var(--cool-muted)", fontSize: 10 }}
        >
          {label}
        </div>
      )}
      {children}
    </section>
  );
}
