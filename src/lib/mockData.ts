export type FogSource =
  | "Exhaustion"
  | "Overstim"
  | "Outside Stress"
  | "Residue"
  | "Burnout"
  | "Boundary";

export const FOG_SOURCES: readonly FogSource[] = [
  "Exhaustion",
  "Overstim",
  "Outside Stress",
  "Residue",
  "Burnout",
  "Boundary",
];

export const ORIENTATION_PROMPTS = [
  "Where are you?",
  "What is happening?",
  "Who is involved?",
  "What is the immediate demand?",
  "What needs focus right now?",
] as const;

export type Pulse = "calm" | "tight" | "over";

export type LevelKey = "grade" | "routine" | "student" | "teacher" | "urgency";
export type Levels = Record<LevelKey, number>;

export const LEVEL_LABELS: Record<LevelKey, string> = {
  grade: "Grade Band",
  routine: "Routine",
  student: "Student",
  teacher: "Teacher",
  urgency: "Urgency",
};

export const DEFAULT_LEVELS: Levels = {
  grade: 70,
  routine: 45,
  student: 80,
  teacher: 60,
  urgency: 90,
};

export type Routine = {
  id: string;
  number: string;
  name: string;
  grade: string;
  difficulty: 1 | 2 | 3;
  category: "Belonging" | "Regulation" | "Growth";
  progress: number; // 0..1
  zones: string;
  active?: boolean;
};

export const ROUTINES: Routine[] = [
  { id: "entry-routine",  number: "03", name: "Entry Routine",              grade: "G7",   difficulty: 2, category: "Belonging",  progress: 0.7, zones: "7/10", active: true },
  { id: "assigned-seat",  number: "04", name: "Assigned Seat Follow-Through", grade: "G7",   difficulty: 2, category: "Regulation", progress: 0.9, zones: "9/10" },
  { id: "ixl-movement",   number: "05", name: "IXL Movement System",        grade: "G6-7", difficulty: 1, category: "Regulation", progress: 0.3, zones: "3/10" },
  { id: "profanity",      number: "06", name: "Profanity Response",         grade: "G7-8", difficulty: 3, category: "Regulation", progress: 0.5, zones: "5/10" },
  { id: "task-avoid",     number: "07", name: "Task Avoidance",             grade: "G6",   difficulty: 2, category: "Regulation", progress: 0.4, zones: "4/10" },
  { id: "repair",         number: "08", name: "Repair Conversation",        grade: "G7",   difficulty: 2, category: "Growth",     progress: 0.5, zones: "5/10" },
  { id: "exit-ticket",    number: "09", name: "Exit Ticket Routine",        grade: "G5-8", difficulty: 1, category: "Belonging",  progress: 0.2, zones: "2/10" },
  { id: "refusing",       number: "10", name: "Refusing Routine",           grade: "G7-8", difficulty: 3, category: "Regulation", progress: 0.3, zones: "3/10" },
];

export type Zone = { num: number; title: string; body: string };

export const REFUSING_ZONES: Zone[] = [
  { num: 1, title: "What this solves",   body: "Student refuses an opening expectation while peers are watching." },
  { num: 2, title: "Why it matters",     body: "If left unaddressed, the room reads the refusal as the new norm." },
  { num: 3, title: "Teacher setup",      body: "Seat posted in advance. Voice flat. Body squared. Eyes off the student first." },
  { num: 4, title: "Opening line",       body: "\"Your seat is posted. Find it.\" Then turn to the rest of the room." },
  { num: 5, title: "If escalation",      body: "Step back. Do not engage. Continue protecting instruction with students who are ready." },
  { num: 6, title: "Private follow-up",  body: "Catch them at the door. One line: \"Tomorrow we start clean.\"" },
  { num: 7, title: "What to avoid",      body: "Public ultimatums. Sarcasm. Raising the volume to match." },
  { num: 8, title: "If repeat refusal",  body: "Document. Engage support. Stick to the routine — let the system, not the moment, escalate." },
  { num: 9, title: "Repair window",      body: "End of day, two minutes, low stakes. \"I'm glad you're here tomorrow.\"" },
  { num: 10, title: "Mastery signal",    body: "Three clean entries in a row. The refusal becomes a memory, not a pattern." },
];

export type GradeBand = "G5" | "G6" | "G7" | "G8";

export const COACHING_STANCE: Record<GradeBand, { stance: string; say: string; dont: string }> = {
  G5: { stance: "Warm voice, clear pictures. Reset expectations physically — point at the seat map. Avoid abstract reasoning in the moment.",
        say: "Show me where your seat is.", dont: "How many times do I have to tell you?" },
  G6: { stance: "Calm, low-stakes redirect. Use names sparingly. Public correction increases the cost.",
        say: "Your seat is posted on the door.", dont: "Everyone is waiting on you." },
  G7: { stance: "High clarity, low emotional reactivity. Strategic attention. Precise follow-through. Address privately when the room is moving.",
        say: "Your seat is posted. Find it.", dont: "Why do you always do this?" },
  G8: { stance: "Direct, dignity-preserving. Treat as near-adult. Give the choice and the consequence in the same sentence.",
        say: "Your seat or a step into the hall. Your call.", dont: "Don't even start with me today." },
};

export type Choice = {
  text: string;
  verdict: "best" | "ok" | "bad";
  feedback: string;
};

export const PRACTICE_CHOICES: Choice[] = [
  { text: '"Sit down right now or I\'m calling home."',
    verdict: "bad",
    feedback: "Public ultimatum. Locks the room into a power struggle. The class watches and waits — instruction stops." },
  { text: '"Your seat is posted. Find it."',
    verdict: "best",
    feedback: "Flat, low, short. Names the expectation, turns attention back to the room. Instruction continues." },
  { text: '"Why are you always like this on Mondays?"',
    verdict: "bad",
    feedback: "Personal, history-based. Invites a defense. Reads as a pattern call-out, not a redirect." },
];

export const PRACTICE_SCORE_AFTER_BEST = [
  { label: "Accuracy",        value: "92%",         tone: "good" as const },
  { label: "Confidence",      value: "High",        tone: "good" as const },
  { label: "Live Support",    value: "Not needed",  tone: "good" as const },
  { label: "Instr. Protected",value: "Yes",         tone: "good" as const },
];

export const PRACTICE_SCORE_AFTER_BAD = [
  { label: "Accuracy",        value: "32%",         tone: "warn" as const },
  { label: "Confidence",      value: "Low",         tone: "warn" as const },
  { label: "Live Support",    value: "Needed",      tone: "warn" as const },
  { label: "Instr. Protected",value: "No",          tone: "warn" as const },
];

export type LiveCallout = {
  zone: "say" | "dont" | "next" | "ret";
  label: string;
  body: string;
};

export const LIVE_CALLOUTS: LiveCallout[] = [
  { zone: "say",  label: "Say This",            body: "Your seat is posted. Find it." },
  { zone: "dont", label: "Do Not Say",          body: "Why do you always do this?" },
  { zone: "next", label: "Next Move →",         body: "Return attention to the class. Follow up privately when the room is moving." },
  { zone: "ret",  label: "Return to Instruction", body: "Begin with the students who are ready." },
];

export type LinerPrompt = { q: string; a: string };

export const LINER_PROMPTS: LinerPrompt[] = [
  { q: "What happened?",   a: "4th period — Marcus refused to sit. Said his seat was \"stupid.\"" },
  { q: "What did I say?",  a: "\"Your seat is posted. Find it.\" Held the line." },
  { q: "Return to track?", a: "Yes — class started in under 4 min." },
];

export type RemixMode = "rewrite" | "routine" | "track" | "runback";

export const REMIX_LINES = {
  best:     { label: "SAY THIS",   tone: "strong" as const, text: "Your seat is posted. Find it." },
  shorter:  { label: "Shorter",    tone: "short" as const,  text: "Seat. Now." },
  bad:      { label: "Do Not Say", tone: "bad" as const,    text: "Why do you always do this?" },
  followup: { label: "Follow-up",  tone: "warm" as const,   text: "Catch him at the door. One line: \"Tomorrow we start clean.\"" },
};

export const ROUTINE_STEPS = [
  "Walk in. Eyes forward.",
  "Check the board for your seat.",
  "Sit. Pencil out. Do Now started.",
  "Phones in pouch by the door.",
  "Settle. We start when the bell stops.",
];

export type CypherPost = {
  id: string;
  author: string;
  meta: string;
  body: string;
  reactions: string[];
  variant?: "default" | "borrow" | "broadcast";
  broadcastLabel?: string;
  avatarTone?: "teal" | "amber" | "green";
};

export const CYPHER_BROADCAST: CypherPost = {
  id: "monday-drop",
  author: "Coach Marlitha",
  meta: "MONDAY DROP",
  body: "Entry routines. Tight, clean, under 4 minutes. Bring your reps to the cypher.",
  reactions: [],
  variant: "broadcast",
  broadcastLabel: "★ MONDAY DROP · COACH MARLITHA",
};

export const CYPHER_POSTS: CypherPost[] = [
  {
    id: "howard",
    author: "Ms. Howard",
    meta: "G7 · DAY 12",
    body: "Class hit readiness in 3:40 today. The \"your seat is posted\" line is doing real work.",
    reactions: ["♡ 14 helped", "↺ 6 trying", "💬 4"],
    avatarTone: "teal",
  },
  {
    id: "cardenas",
    author: "Mr. Cardenas",
    meta: "G8 · BORROW THIS",
    body: "\"Take your three breaths. Then your seat. Then your pencil.\" — used for re-entry.",
    reactions: ["↺ 9 trying"],
    variant: "borrow",
    avatarTone: "amber",
  },
  {
    id: "chen",
    author: "Mr. Chen",
    meta: "G6 · DAY 8",
    body: "Brought the seat map to the door. Took two days. Now the line works without me saying it.",
    reactions: ["♡ 22 helped", "↺ 11 trying"],
    avatarTone: "green",
  },
];

export type FlowMetric = { label: string; value: string; delta: string };

export const FLOW_METRICS: FlowMetric[] = [
  { label: "Time to Readiness", value: "3:40", delta: "▼ 4:20 vs Wk 1" },
  { label: "Redirects · Week",  value: "12",   delta: "▼ 19 vs last mo" },
  { label: "Time Protected",    value: "42m",  delta: "▲ recovered" },
  { label: "Participation",     value: "88%",  delta: "▲ +18%" },
];

export const ACADEMIC_EVIDENCE = [
  { label: "Work",         value: "+22%" },
  { label: "Target Skill", value: "+15%" },
  { label: "Exit Ticket",  value: "+12%" },
];
