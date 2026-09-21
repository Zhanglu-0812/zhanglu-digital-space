import Link from "next/link";
import type { Thought } from "@/lib/thoughts";
import { getThoughtPreview } from "@/lib/thought-preview";

export function HomeThoughtTimeline({ thoughts }: { thoughts: Thought[] }) {
  return (
    <div className="home-thought-timeline">
      {thoughts.map((thought) => {
        const { preview, collapsed } = getThoughtPreview(thought.content);
        const time = thought.createdAt?.slice(11, 16);

        return (
          <article key={thought.slug} className="home-thought-note">
            <time className="home-thought-time" dateTime={thought.createdAt ?? thought.date}>
              <span>{thought.date.replaceAll("-", ".")}</span>
              {time && <span>{time}</span>}
            </time>
            <span className="home-thought-node" aria-hidden="true" />
            <div className="home-thought-card">
              {thought.title && (
                <h3>
                  <Link href={`/thoughts/${thought.slug}`}>{thought.title}</Link>
                </h3>
              )}
              <p>{preview}{collapsed ? "…" : ""}</p>
              {thought.tags.length > 0 && (
                <div className="home-thought-tags">
                  {thought.tags.map((tag) => (
                    <Link key={tag} href={`/thoughts?tag=${encodeURIComponent(tag)}`}>#{tag}</Link>
                  ))}
                </div>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}
