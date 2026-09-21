import type { Metadata } from "next";
import { getAllThoughts, getThemes } from "@/lib/thoughts";
import { ThoughtCard } from "@/components/ThoughtCard";
import { ThoughtStream } from "@/components/ThoughtStream";
export const metadata: Metadata = { title: "思绪", description: "日常记录、未成形的思考，以及长期关注的主题。" };
export default function ThoughtsPage() {
  const thoughts = getAllThoughts();
  return <div className="reading-shell"><header className="mb-12"><p className="eyebrow">记录，慢慢积累</p><h1 className="text-3xl font-semibold mb-4">思绪</h1><p className="muted">日常的念头、实践中的发现，还有路上看到的风景。</p></header><ThoughtStream themes={getThemes(thoughts)} entries={thoughts.map((thought) => ({ slug: thought.slug, tags: thought.tags, node: <ThoughtCard thought={thought} /> }))} /></div>;
}
