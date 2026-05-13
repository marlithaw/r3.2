# R³AP — R³ Agency Practice (Teacher Edition)
## Design System · Modern Studio

> "R³AP helps educators clear the fog in the moment, choose the next grounded move, and build classroom cultures where students can regulate, belong, and grow."

R³AP is a **guided classroom-culture operating system** that merges high-end coaching intelligence with a **Studio Cypher aesthetic**: hip-hop / music-production metaphors (tracks, mixing, equalizers, vinyl, cypher) executed through clean, utilitarian software. Every screen should feel like the **control room of a world-class studio** — precision meets creativity, not a generic wellness tool.

Built for teachers (Grades 5–8 today), with Coach and Admin views layered on top. Coaches: **Marlitha Williams** and **Coach Ray**.

---

## Sources used to build this system

| Source | Where it lives |
|---|---|
| `R3AP_Master_App_UI-UX_Spec (2).docx` (v2.0, May 2026) | `uploads/spec.docx` · plaintext at `uploads/spec.txt` |
| GitHub: **marlithaw/coaching2** — brand imagery, coach portraits, studio renders, prop photography | imported into `assets/` |

The codebase has no source-level component implementation — the spec is the single source of truth for tokens and screens. UI kit components are reconstructed from the spec, anchored on the imported brand imagery.

---

## Index — what's in this folder

| File | What it is |
|---|---|
| `README.md` | This file. Brand context, content + visual fundamentals, iconography, manifest. |
| `SKILL.md` | Skill manifest — load this and the system to design with R³AP. |
| `colors_and_type.css` | All design tokens — teal depth, signal colors, type, spacing, radii, glass surfaces, primitives. |
| `assets/` | Brand imagery — coach avatars, studio props, photography, motif art. |
| `preview/` | Cards rendered into the Design System tab (tokens + components). |
| `ui_kits/teacher-app/` | High-fidelity recreation of the 10-screen R³AP Teacher app. |

---

## 1 · Product context

R³AP is built around three **Cultural Operating System Pillars**:

- **Regulation** — adults stabilize themselves and the environment so students can enter a learning-ready state.
- **Belonging** — students experience clear expectations, fair systems, dignity, structured participation, and repair.
- **Growth** — students move from readiness into measurable academic growth.

…and the **R³ Internal Change Process**: **Reflection → Resistance → Revelation.**

### The 10 core screens (Tracks)
Every screen is a "track" in the studio metaphor. Persistent bottom nav. ONE active Current Track per teacher at all times.

1. **Clear the Fog** — orientation scan
2. **Check Your Levels** — equalizer diagnostic
3. **Load the Track** — pick a Current Track
4. **Read the Playbook** — learn the move
5. **Practice Station** — rehearse the moment
6. **Live** — in-the-moment script (highest urgency, ultra-low friction)
7. **Liner Notes** — capture what happened
8. **Remix** — rewrite / rebuild / put on a track / run that back
9. **The Cypher** — cohort feed, coach broadcast, track-sharing
10. **Master the Flow / PLURAL State** — long-term dashboard, proof

Contextual systems (**not** main tabs): "Let's R.A.P. About It" coaching cards, "Run That Back" return button.

---

## 2 · CONTENT FUNDAMENTALS — how copy is written

R³AP voice is **coach-in-the-room**. Direct, grounded, action-first. Studio language is woven through but never silly — every metaphor must do real work for the teacher.

### Voice & tone
- **You-voice.** Always addressing the teacher. "Your seat is posted. Find it." not "Students should find their seats."
- **Imperative + grounded.** Verbs first. "Check your levels." "Run the moment before it runs you." "Bring your track."
- **Short. ONE LINE.** The Live card SAY THIS is **max 12 words**. The reduced variant is **max 8**. Lines do the work; paragraphs do not.
- **Studio metaphors as load-bearing nouns.** Tracks, levels, the cypher, liner notes, remix, run that back, hook, drop, playbook — these are real product nouns, not decoration.
- **Plain, dignified language about students.** No clinical jargon. No "behaviors." Patterns are named ("Refusing routine," "Reacting to perceived unfairness") — not labeled.
- **No hype.** No exclamation marks in product copy. The energy comes from precision, not punctuation.

### Casing
- **Inter Tight headings**: sentence case for screen content, **UPPERCASE for hero titles** ("CLEAR THE FOG").
- **JetBrains Mono**: ALWAYS UPPERCASE, 0.1em letter-spacing. Used for tags, screen subtitles, track labels, metric deltas, tone chips. Never lowercase mono.
- **Permanent Marker**: case as drawn — used ONLY for PLURAL State celebration text and milestone unlocks. Never anywhere else.
- **Track / screen names** in body copy: Title Case ("Clear the Fog," "Master the Flow"). When used as a track-label component, render in mono uppercase.

### Pronouns
- **"You" and "your"** for the teacher.
- **"Students," "the room," "the class"** — never "kids," never "they" as a label.
- **"I"-statements** only in Liner Notes capture prompts ("What did I say or do?") — because the teacher is reflecting in first person there.
- **"We"** appears only in coach broadcast ("This week we're working on…") and Cypher pod commitments.

### Emoji
- **Functional only.** ♡ in Cypher reactions ("♡ This Helped"), ↺ for Run That Back, ✎ for "Capture This," 💬 for thread. No emoji as decoration. No 😊 / 🎉 / 🔥 / 🚀.
- Unicode arrows (→, ↺, ●) act as iconography — they're standard product primitives, not emoji.

### Specific examples (from the spec — keep these as reference voice)
| Surface | Exact copy |
|---|---|
| Screen 01 hero | `CLEAR THE FOG` · `SCREEN 01 · ORIENTATION` |
| Screen 02 line | "Check your levels. Name the track before you try to remix it." |
| Screen 06 (Live) — SAY THIS | "Your seat is posted. Find it." |
| Screen 06 (Live) — DO NOT SAY | ~~"Why do you always do this?"~~ |
| Screen 06 line | "Live. Use the next line. Do not overtalk. Return to the track." |
| Screen 07 line | "Liner Notes. Capture what happened before the moment disappears." |
| Screen 08 line | "Remix. Replace the old pattern with a stronger track." |
| Screen 10 line | "Master the Flow. The new response becomes the new rhythm." |
| Pattern Finder output | "On days you grounded first, your class reached readiness 3 minutes faster." |
| PLURAL unlock | "PLURAL STATE UNLOCKED — The new response is the new rhythm." |
| Cypher reactions | "♡ This Helped" · "↺ I'm Trying This" · "💬 Add to thread" |

### Naming guardrails (do not deviate)
- Always **"Grade-Band Response Guidance."** Never "Grade-Band Developmental Truths."
- **Aware** = current-moment orientation. **Attentive** = somatic check-in. **Purposeful Ponder** = forward decision. Do not redefine these.
- Balance Period integration is allowed ONLY in: Clear the Fog, The Cypher, Master the Flow.
- "Run That Back" is a **recurring action**, not a tab.
- "Let's R.A.P. About It" is a **contextual coaching card**, not a tab.

---

## 3 · VISUAL FOUNDATIONS

### Color
Teal is **architecture**, not a flat shade. Use the **5-level Teal Depth System** (Deepest → Dark → Mid → Bright → Surface → Mist) to create hierarchy across hero/nav/cards/tints.

Orange Pop (#FF6B00) is **reserved for action and signal**: CTAs, active EQ bars, Live mic pulse, progress fills, selected borders, SAY THIS left-borders. Never decorative. Amber (#FF9800) is the warm secondary (hover, gradient end, track numerals). Red (#B8423D) is **warnings only** — DO NOT SAY blocks and errors. Green Check (#2D7A4F) is success / "Instruction Protected: Yes."

**Override (non-negotiable):** App canvas is **cool-slate #F8FAFC**, cards are **pure white #FFFFFF**. ZERO bronze, tan, sepia, cream, or warm-tinted backgrounds in the app. The warmth comes from Orange + Amber accents, never the background temperature. (The marketing site uses warm tones — that's a separate surface.)

### Typography
**Inter Tight + JetBrains Mono + Permanent Marker.** That's the whole stack.
- **Inter Tight 800** for hero titles (-0.04em tracking, often UPPERCASE on dark teal) and dashboard metrics.
- **Inter Tight 600/500** for body, buttons, SAY THIS lines.
- **JetBrains Mono 700 UPPERCASE 0.1em** for tags, track labels, tone chips, screen subtitles, deltas — the "studio control panel" voice.
- **Permanent Marker** for PLURAL state celebration ONLY. Treat it like an emergency siren — it has to mean something when it appears.

### Spacing
4 / 8 / 12 / 16 / 24 / 32 / 48 / 64. Micro (4–8) for tag interior + icon-to-text; component (12–24) for card padding; layout (32–64) between sections.

### Radii
- 4px for tags / inner chips
- 6px for inputs + buttons (sharper than typical app — deliberate)
- 12px for cards + modals
- 16px (top corners) for bottom sheets (coaching cards)

### Elevation / shadow system
- **Elev-0** — flat with `1px rgba(0,0,0,0.08)` border. Lists, dividers.
- **Elev-1 (cards)** — `0 4px 12px rgba(0,0,0,0.05)`. The default.
- **Elev-2 (modals)** — `0 20px 40px rgba(0,0,0,0.15)`.
- **CTA hover** — `0 8px 16px rgba(255,107,0,0.25)` + `translateY(-2px)`.
- **Glass shadow** — `0 4px 24px rgba(9,45,58,0.30)` for floating panels on teal.

### Backgrounds & imagery
- **App canvas**: solid `#F8FAFC` cool-slate. No gradients on canvas.
- **Hero / nav / dark surfaces**: solid teal (Dark or Deepest). No washes.
- **No bluish-purple gradients anywhere.**
- **Allowed gradient**: 90° `#FF6B00 → #FF9800` on primary buttons only.
- **Imagery vibe**: polished, 3D-adjacent, hip-hop-culture-aligned. Physical studio props (boombox, vinyl, headphones, mixing board, mic), classroom-in-action photography (warm, real, dignified), high-fidelity 3D coach portraits with Teal Dark + Orange color grading. No generic AI imagery. **No animals.** Photography skews warm in subject but is presented in cool-slate frames so the system stays cool.
- **Graffiti accent set** — five words (FLOW · CLEAR · LIVE · REMIX · RAP) used as **10–15% opacity** background accents, placed at edges. They're texture, not type.
- **Track numerals** (01–14) used as massive watermarks at **0.05 opacity** behind track cards.

### Animation
- **Equalizer pulse**: 5 bars, varying heights, slow **0.8s ease-in-out** loop. Orange Pop on Teal Dark.
- **Live mic glow**: **1.2s ease-in-out** pulsing orange halo on the mic dot.
- **Vinyl rotation**: **2 rpm** on the Now Playing disc; **1 rpm** on Cypher track-share thumbnails.
- **Fog dissolve**: white particle wisps fade left-to-right on Screen 01 entry (~600ms).
- **PLURAL unlock burst**: Amber particles, 800ms.
- **CTA hover**: 180ms `translateY(-2px)` + box-shadow swap.
- **Bottom sheet entry**: 240ms ease-out slide-up.
- **No bounces, no spring overshoots.** Studio software, not toy.

### Hover / press states
- **Primary button** hover: `translateY(-2px)` + `0 8px 16px rgba(255,107,0,0.25)`. Press: returns to baseline.
- **Secondary** hover: fill flips to Teal Mid, text to white.
- **Ghost (on teal)** hover: bg `rgba(255,255,255,0.08)`.
- **Card** hover: border-color shifts Teal Mid → Teal Bright; lift to elev-2.
- **Tag** selected: bg flips to Orange Tint, border + text to Orange Pop.
- **Press**: never shrink — return-to-baseline only. Sharp, deliberate.

### Borders
- **1px `rgba(0,0,0,0.08)`** standard card outline.
- **3px top-border** for accent cards (Teal Mid default, Orange Pop for action, Green Check for growth, Red for warning, Amber for Belonging).
- **4px left-border** for SAY THIS (Orange Pop) and DO NOT SAY (Red) callouts.
- **2px left-border** for structured prompt stacks (Teal Mid on Teal Mist bg).
- **No inner shadows** anywhere — borders are sharp and external.

### Transparency & blur
- **Standard glass** (over Teal Mid/Dark): `rgba(255,255,255,0.10)` bg + `blur(20px)` + `rgba(255,255,255,0.20)` 1px border.
- **Deep glass** (over Teal Deepest): `rgba(26,95,122,0.25)` + `blur(24px)` + `rgba(50,117,140,0.40)` border.
- Glass is used **only on solid teal hero/nav surfaces**. Never over white canvas (defeats the purpose, and looks cheap).

### Layout rules
- Persistent **bottom nav** (glass panel on Teal Dark) on all primary screens. Active tab: Orange Pop icon + label, inactive: Teal Bright icon only.
- **Time to Learn FAB** (Orange Pop) bottom-right on Live + Clear the Fog.
- **Hero takes ~28%** of screen on standard primary screens.
- **Live** is one-screen, six-zone, no-scroll. Every other screen can scroll.
- Responsive breakpoints: mobile 375px, tablet 768px, web 1280px. Mobile-first.

### Card anatomy (the default)
White bg → 1px outer border (8% black) → 3px top accent (Teal Mid / Orange / Green / Red / Amber depending on role) → 12px radius → elev-1 shadow → 24px interior padding → optional track numeral watermark (0.05 opacity, mono, positioned bottom-right).

---

## 4 · ICONOGRAPHY

R³AP iconography is **utilitarian + studio-coded**. Icons earn their place; nothing is decorative.

### What's used
- **Custom nav icon set** (10 icons — one per Track): fog cloud (dissolving), equalizer bars, vinyl record + Orange play indicator, open book + signal spark, headphones + mic stand, microphone (Orange pulse ring), pen + waveform, DJ fader / turntable arrows, circle of mic silhouettes, rising waveform + Amber star burst. These are commissioned, line-style, monochrome → Orange Pop on active state, Teal Bright when inactive. (Final SVGs not yet supplied — currently rendered as **placeholder glyphs** in UI kits; see flag below.)
- **CDN icon fallback**: where the custom set is incomplete, the UI kit uses **Lucide** (lucide.dev, MIT) at 1.75px stroke. Substitutions are flagged inline in the kit. Lucide's stroke style is the closest CDN match to the spec's clean studio aesthetic.
- **Unicode primitives** used as iconography (these are intentional, not emoji substitutes):
  - `●` Live indicator + active state dot
  - `→` Next move arrow
  - `↺` Run That Back
  - `♡` "This Helped" reaction
  - `✎` "Capture This"
  - `💬` thread reply (only emoji actively shipped)
- **Brand props as imagery** (not icons): vinyl, boombox, cassette, mixing board, headphones, mic — these appear at full image scale (photography or 3D renders), never as line icons. See `assets/studio-*.png`.
- **Coach avatars**: 3D portraits, 4 expression states each (Grounded · Encouraging · Challenge-accepted · Celebrating). Teal Dark + Orange color grading. Marlitha + Ray. See `assets/coach-*.png`. The repo also contains earlier portrait studies (Joy, David, PEACE) — keep on hand for variant explorations.

### What's never used
- **No animals** — not as icons, mascots, metaphors, or decorative elements. Anywhere.
- **No emoji as decoration** — see Content Fundamentals.
- **No hand-drawn SVG mascots** — utilitarian only.
- **No iconography on the Live card** beyond the `●` LIVE indicator. Live is type-only.

### ⚠ Iconography flag for the user
- The spec calls for a **custom 10-icon nav set** — these have not been supplied as production SVGs yet. The UI kit ships with Lucide substitutes for now; please supply the final SVGs so we can swap them in.
- The **graffiti accent set** (FLOW · CLEAR · LIVE · REMIX · RAP) is referenced in the spec but no source artwork is in `coaching2`. We've placeholder-typed them in `assets/graffiti-words.txt` and will render them in the type stack until art is supplied.

### ⚠ Font flag for the user
All three required typefaces — **Inter Tight**, **JetBrains Mono**, **Permanent Marker** — are available on Google Fonts and loaded directly from there in `colors_and_type.css`. No local `.ttf` files are needed unless you'd like to ship offline. If you have specific weight cuts or licensed variants, send them and we'll swap in.

---

## 5 · Asset manifest

Brand imagery imported from `marlithaw/coaching2` (renamed for sanity):

| File | What it is |
|---|---|
| `r3-cutout.png` | **Signature mark** — silhouette filled with classroom + turntable + R³ graffiti. Use as hero motif. |
| `boombox-love.png`, `studio-boombox.png` | Boombox photography — print + brand surfaces |
| `studio-vinyl.png`, `studio-headphones.png`, `studio-mixingboard.png`, `studio-wide-shot.png` | Studio prop renders — full-bleed brand imagery |
| `mixtape-hand.png`, `frustration-tape.png`, `caregiving-track.jpg`, `reflection-mix.png`, `next-bar-filings.png`, `presenting-mic.png`, `freestyle-field-guide.png` | "Mixtape" series — concept cards for Tracks |
| `coach-marlitha.png`, `coach-ray.png` | Coach 3D portraits |
| `photo-david.png`, `photo-joy.png`, `photo-peace.jpg`, `photo-day-one.png` | Portrait studies — coach avatar exploration |
| `photo-plural-mural.jpg` | PLURAL State mural — celebration screen reference |
| `educator-hallway.png` | Photography reference — real classroom |
| `teacher-meditate.png` | Grounding / Balance Period imagery |
