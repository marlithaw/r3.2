export type TrackId =
  | "fog"
  | "levels"
  | "track"
  | "playbook"
  | "practice"
  | "live"
  | "notes"
  | "remix"
  | "cypher"
  | "flow";

export type TrackDef = {
  id: TrackId;
  number: string;
  name: string;
  tagline: string;
  icon: string;
  href: `/${TrackId}`;
};

export const TRACKS: readonly TrackDef[] = [
  { id: "fog",      number: "01", name: "Clear the Fog",        tagline: "Orient before you react.",                  icon: "◌",  href: "/fog" },
  { id: "levels",   number: "02", name: "Check Your Levels",    tagline: "What does the room need right now?",        icon: "▌▐", href: "/levels" },
  { id: "track",    number: "03", name: "Load the Track",       tagline: "Pick the routine to practice.",             icon: "●",  href: "/track" },
  { id: "playbook", number: "04", name: "Read the Playbook",    tagline: "Learn the move before the moment.",         icon: "▤",  href: "/playbook" },
  { id: "practice", number: "05", name: "Practice Station",     tagline: "Run the moment before it runs you.",        icon: "◐",  href: "/practice" },
  { id: "live",     number: "06", name: "Live",                 tagline: "One screen. Six zones. No scroll.",         icon: "🎙", href: "/live" },
  { id: "notes",    number: "07", name: "Liner Notes",          tagline: "Capture what happened before it slips.",    icon: "✎",  href: "/notes" },
  { id: "remix",    number: "08", name: "Remix",                tagline: "Replace the old pattern with a stronger track.", icon: "⇄", href: "/remix" },
  { id: "cypher",   number: "09", name: "The Cypher",           tagline: "Bring your track. Share the practice.",     icon: "◯",  href: "/cypher" },
  { id: "flow",     number: "10", name: "Master the Flow",      tagline: "The new response is the new rhythm.",       icon: "⌇",  href: "/flow" },
] as const;

export function trackById(id: TrackId): TrackDef {
  const t = TRACKS.find((t) => t.id === id);
  if (!t) throw new Error(`Unknown track ${id}`);
  return t;
}
