import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllPostSlugs } from "@/lib/mdx";
import { MDXContent } from "@/components/MDXContent";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "文章未找到" };
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.excerpt,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto px-6 py-16">
      {/* Header */}
      <header className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <Link
            href="/blog"
            className="text-sm text-[var(--color-primary-600)] hover:text-[var(--color-primary-700)] transition-colors"
          >
            &larr; 返回文章列表
          </Link>
        </div>
        <div className="flex items-center gap-3 mb-4">
          <time className="text-sm text-[var(--color-text-secondary)]">
            {post.frontmatter.date}
          </time>
          {post.frontmatter.category && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--color-primary-50)] text-[var(--color-primary-700)]">
              {post.frontmatter.category}
            </span>
          )}
        </div>
        <h1 className="text-3xl font-bold text-[var(--color-text-primary)] mb-4">
          {post.frontmatter.title}
        </h1>
        <p className="text-lg text-[var(--color-text-secondary)]">
          {post.frontmatter.excerpt}
        </p>
        {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-4">
            {post.frontmatter.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded bg-[var(--color-surface-secondary)] text-[var(--color-text-secondary)]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Content */}
      <MDXContent source={post.content} />

      {/* Footer */}
      <footer className="mt-16 pt-8 border-t border-[var(--color-border)]">
        <Link
          href="/blog"
          className="text-sm text-[var(--color-primary-600)] hover:text-[var(--color-primary-700)] transition-colors"
        >
          &larr; 返回文章列表
        </Link>
      </footer>
    </article>
  );
}
