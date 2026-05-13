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

export type TrackGroup = "orienting" | "in-the-moment" | "post-moment";

export type TrackDef = {
  id: TrackId;
  number: string;
  name: string;
  tagline: string;
  group: TrackGroup;
  href: `/${TrackId}`;
};

export const TRACKS: readonly TrackDef[] = [
  // Orienting — set the state before you walk through the door.
  { id: "fog",      number: "01", name: "Clear the Fog",     tagline: "Orient before you react.",                       group: "orienting",     href: "/fog" },
  { id: "levels",   number: "02", name: "Check Your Levels", tagline: "What does the room need right now?",             group: "orienting",     href: "/levels" },
  { id: "track",    number: "03", name: "Load the Track",    tagline: "Pick the routine to practice.",                  group: "orienting",     href: "/track" },
  { id: "playbook", number: "04", name: "Read the Playbook", tagline: "Learn the move before the moment.",              group: "orienting",     href: "/playbook" },
  { id: "practice", number: "05", name: "Practice Station",  tagline: "Run the moment before it runs you.",             group: "orienting",     href: "/practice" },

  // In-The-Moment — the live room.
  { id: "live",     number: "06", name: "Live",              tagline: "One screen. Six zones. No scroll.",              group: "in-the-moment", href: "/live" },

  // Post-Moment Reflection — capture, rebuild, share, master.
  { id: "notes",    number: "07", name: "Liner Notes",       tagline: "Capture what happened before it slips.",         group: "post-moment",   href: "/notes" },
  { id: "remix",    number: "08", name: "Remix",             tagline: "Replace the old pattern with a stronger track.", group: "post-moment",   href: "/remix" },
  { id: "cypher",   number: "09", name: "The Cypher",        tagline: "Bring your track. Share the practice.",          group: "post-moment",   href: "/cypher" },
  { id: "flow",     number: "10", name: "Master the Flow",   tagline: "The new response is the new rhythm.",            group: "post-moment",   href: "/flow" },
] as const;

export const GROUPS: { id: TrackGroup; eyebrow: string; title: string; subtitle: string }[] = [
  {
    id: "orienting",
    eyebrow: "PHASE 01",
    title: "Orienting",
    subtitle: "Set your state. Pick the move. Rehearse it.",
  },
  {
    id: "in-the-moment",
    eyebrow: "PHASE 02",
    title: "In the Moment",
    subtitle: "The live room. One screen. No scroll.",
  },
  {
    id: "post-moment",
    eyebrow: "PHASE 03",
    title: "Post-Moment Reflection",
    subtitle: "Capture, rebuild, share, master.",
  },
];

export function tracksByGroup(group: TrackGroup): TrackDef[] {
  return TRACKS.filter((t) => t.group === group);
}

export function trackById(id: TrackId): TrackDef {
  const t = TRACKS.find((t) => t.id === id);
  if (!t) throw new Error(`Unknown track ${id}`);
  return t;
}
