import Link from "next/link";
import { MDXContent } from "./MDXContent";
import type { Thought } from "@/lib/thoughts";
import { getProjectBySlug } from "@/lib/mdx";
import { getThoughtPreview } from "@/lib/thought-preview";

export function ThoughtCard({ thought }: { thought: Thought }) {
  const project = thought.project ? getProjectBySlug(thought.project) : null;
  const { preview, collapsed } = getThoughtPreview(thought.content);
  const body = <MDXContent source={thought.content} />;

  return (
    <article id={thought.slug} className="thought-entry">
      <div className="flex flex-wrap gap-4 mb-4 text-sm muted">
        <Link href={`/thoughts#${thought.slug}`}>
          <time dateTime={thought.createdAt ?? thought.date}>{thought.date}{thought.createdAt ? ` · ${thought.createdAt.slice(11, 16)}` : ""}</time>
        </Link>
        {project && <Link className="text-link" href={`/projects/${project.slug}`}>{project.frontmatter.title}</Link>}
      </div>
      {thought.title && <h3 className="text-lg font-semibold mb-2">{thought.title}</h3>}
      {thought.tags.length > 0 && (
        <div className="thought-tags flex flex-wrap gap-3 mb-4">
          {thought.tags.map((tag) => <a key={tag} className="text-link" href={`/thoughts?tag=${encodeURIComponent(tag)}`}>#{tag}</a>)}
        </div>
      )}
      {collapsed ? (
        <details className="thought-disclosure">
          <summary className="cursor-pointer">
            <span className="thought-preview">{preview}…</span>
            <span className="text-link block mt-2 thought-expand">展开思绪</span>
            <span className="text-link thought-collapse">收起思绪</span>
          </summary>
          <div className="mt-4">{body}</div>
        </details>
      ) : body}
    </article>
  );
}
