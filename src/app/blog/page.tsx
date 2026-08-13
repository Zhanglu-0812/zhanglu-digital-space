import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "文章",
  description: "张璐的文章 - 分享思考、经验和见解",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-3 text-[var(--color-text-primary)]">
        文章
      </h1>
      <p className="text-[var(--color-text-secondary)] mb-12">
        记录我的思考、学习和探索。
      </p>

      <div className="space-y-10">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block group"
          >
            <article>
              <div className="flex items-center gap-3 mb-2">
                <time className="text-xs text-[var(--color-text-secondary)]">
                  {post.frontmatter.date}
                </time>
                {post.frontmatter.category && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--color-primary-50)] text-[var(--color-primary-700)]">
                    {post.frontmatter.category}
                  </span>
                )}
              </div>
              <h2 className="text-xl font-semibold group-hover:text-[var(--color-primary-600)] transition-colors mb-2">
                {post.frontmatter.title}
              </h2>
              <p className="text-[var(--color-text-secondary)] line-clamp-2 mb-3">
                {post.frontmatter.excerpt}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {post.frontmatter.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 rounded bg-[var(--color-surface-secondary)] text-[var(--color-text-secondary)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          </Link>
        ))}
      </div>

      {posts.length === 0 && (
        <p className="text-[var(--color-text-secondary)] text-center py-16">
          还没有文章，去 content/posts/ 目录添加你的第一篇文章吧！
        </p>
      )}
    </div>
  );
}
