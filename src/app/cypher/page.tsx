"use client";

import { useState } from "react";
import { ScreenHero, Section } from "@/components/ui/ScreenHero";
import { CYPHER_BROADCAST, CYPHER_POSTS, type CypherPost } from "@/lib/mockData";

export default function CypherPage() {
  const [posts, setPosts] = useState<CypherPost[]>(CYPHER_POSTS);
  const [draft, setDraft] = useState("");

  function share() {
    const text = draft.trim();
    if (!text) return;
    setPosts((prev) => [
      {
        id: `me-${prev.length}`,
        author: "You",
        meta: "G7 · TODAY",
        body: text,
        reactions: ["♡ 0 helped"],
        avatarTone: "teal",
      },
      ...prev,
    ]);
    setDraft("");
  }

  return (
    <div>
      <ScreenHero
        tag="TRACK 09 · COMMUNITY"
        title="The Cypher"
        subtitle="Bring your track. Share the practice."
      />

      <Section>
        <BroadcastCard post={CYPHER_BROADCAST} />
      </Section>

      <Section label="SHARE A REP">
        <div className="card p-3">
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={3}
            placeholder="What landed today? What did the room read?"
            className="w-full resize-none bg-transparent text-sm outline-none"
            style={{ color: "var(--deep-ink)", lineHeight: 1.5 }}
          />
          <div className="mt-2 flex justify-end">
            <button
              type="button"
              disabled={!draft.trim()}
              onClick={share}
              className="btn-primary"
              style={{ fontSize: 13, padding: "8px 16px" }}
            >
              Drop to Cypher →
            </button>
          </div>
        </div>
      </Section>

      <Section label="FEED · TODAY">
        <div className="flex flex-col gap-3">
          {posts.map((p) => (
            <FeedCard key={p.id} post={p} />
          ))}
        </div>
      </Section>
    </div>
  );
}

function BroadcastCard({ post }: { post: CypherPost }) {
  return (
    <div
      className="rounded-xl p-4"
      style={{
        background: "var(--teal-deepest)",
        borderLeft: "4px solid var(--orange-pop)",
        color: "#fff",
      }}
    >
      <div className="label-mono" style={{ color: "var(--amber)", fontSize: 10 }}>
        {post.broadcastLabel}
      </div>
      <div className="mt-1 font-bold" style={{ fontSize: 16 }}>
        This week we&apos;re working on…
      </div>
      <p className="mt-1 text-sm" style={{ color: "rgba(255,255,255,0.85)", lineHeight: 1.5 }}>
        {post.body}
      </p>
    </div>
  );
}

function FeedCard({ post }: { post: CypherPost }) {
  const avatar =
    post.avatarTone === "amber"
      ? "var(--amber)"
      : post.avatarTone === "green"
      ? "var(--green-check)"
      : "var(--teal-mid)";
  const borrow = post.variant === "borrow";

  return (
    <div
      className="card p-3"
      style={{ borderTopColor: borrow ? "var(--orange-pop)" : "var(--teal-mid)" }}
    >
      <div className="flex items-center gap-2">
        <span
          className="inline-block shrink-0 rounded-full"
          style={{ width: 28, height: 28, background: avatar }}
          aria-hidden
        />
        <div>
          <div className="font-bold" style={{ color: "var(--teal-dark)", fontSize: 13 }}>
            {post.author}
          </div>
          <div className="label-mono" style={{ color: "var(--cool-muted)", fontSize: 9 }}>
            {post.meta}
          </div>
        </div>
      </div>
      <p
        className="mt-2 text-sm"
        style={{
          color: "var(--deep-ink)",
          lineHeight: 1.45,
          fontFamily: borrow
            ? "var(--font-space-mono), monospace"
            : "var(--font-inter), system-ui, sans-serif",
        }}
      >
        {post.body}
      </p>
      <div className="mt-2 flex gap-3">
        {post.reactions.map((r) => (
          <span
            key={r}
            className="label-mono"
            style={{ color: "var(--cool-muted)", fontSize: 10 }}
          >
            {r}
          </span>
        ))}
      </div>
    </div>
  );
}
