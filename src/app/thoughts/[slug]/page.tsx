import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXContent } from "@/components/MDXContent";
import { getProjectBySlug } from "@/lib/mdx";
import { getThoughtPreview } from "@/lib/thought-preview";
import { getAllThoughtSlugs, getThoughtBySlug } from "@/lib/thoughts";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllThoughtSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const thought = getThoughtBySlug(slug);

  if (!thought) return { title: "思绪未找到" };

  return {
    title: thought.title ?? "一条思绪",
    description: getThoughtPreview(thought.content).preview,
  };
}

export default async function ThoughtDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const thought = getThoughtBySlug(slug);

  if (!thought) notFound();

  const project = thought.project ? getProjectBySlug(thought.project) : null;

  return (
    <article className="reading-shell thought-detail">
      <header className="mb-12">
        <Link href="/thoughts" className="text-link inline-block mb-8">
          ← 返回思绪列表
        </Link>
        <div className="flex flex-wrap items-center gap-3 mb-4 text-sm muted">
          <time dateTime={thought.createdAt ?? thought.date}>
            {thought.date}
            {thought.createdAt ? ` · ${thought.createdAt.slice(11, 16)}` : ""}
          </time>
          {project && (
            <Link className="text-link" href={`/projects/${project.slug}`}>
              {project.frontmatter.title}
            </Link>
          )}
        </div>
        <h1>{thought.title ?? "一条思绪"}</h1>
        {thought.tags.length > 0 && (
          <div className="thought-tags flex flex-wrap gap-3 mt-4">
            {thought.tags.map((tag) => (
              <Link key={tag} className="text-link" href={`/thoughts?tag=${encodeURIComponent(tag)}`}>
                #{tag}
              </Link>
            ))}
          </div>
        )}
      </header>

      <MDXContent source={thought.content} />

      <footer className="mt-16 pt-8 border-t border-[var(--color-border)]">
        <Link href="/thoughts" className="text-link">
          ← 返回思绪列表
        </Link>
      </footer>
    </article>
  );
}
