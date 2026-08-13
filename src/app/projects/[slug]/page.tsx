import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, getAllProjectSlugs } from "@/lib/mdx";
import { MDXContent } from "@/components/MDXContent";

const statusMap: Record<string, string> = {
  "in-progress": "进行中",
  completed: "已完成",
  archived: "已归档",
};

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "项目未找到" };
  return {
    title: `${project.frontmatter.title} - 项目`,
    description: project.frontmatter.description,
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto px-6 py-16">
      {/* Header */}
      <header className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <Link
            href="/projects"
            className="text-sm text-[var(--color-primary-600)] hover:text-[var(--color-primary-700)] transition-colors"
          >
            &larr; 返回项目列表
          </Link>
        </div>
        <div className="flex items-start justify-between mb-4">
          <h1 className="text-3xl font-bold text-[var(--color-text-primary)]">
            {project.frontmatter.title}
          </h1>
          {project.frontmatter.status && (
            <span
              className={`text-xs px-2.5 py-1 rounded-full mt-2 ${
                project.frontmatter.status === "completed"
                  ? "bg-green-50 text-green-700"
                  : "bg-[var(--color-primary-50)] text-[var(--color-primary-700)]"
              }`}
            >
              {statusMap[project.frontmatter.status] ||
                project.frontmatter.status}
            </span>
          )}
        </div>
        <p className="text-lg text-[var(--color-text-secondary)] mb-4">
          {project.frontmatter.description}
        </p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.frontmatter.techStack?.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded bg-[var(--color-surface-secondary)] text-[var(--color-text-secondary)]"
            >
              {tag}
            </span>
          ))}
        </div>
        {project.frontmatter.links &&
          project.frontmatter.links.length > 0 && (
            <div className="flex gap-3">
              {project.frontmatter.links.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[var(--color-primary-600)] hover:text-[var(--color-primary-700)] transition-colors underline underline-offset-4"
                >
                  {link.label} &rarr;
                </a>
              ))}
            </div>
          )}
      </header>

      {/* Content */}
      <MDXContent source={project.content} />

      {/* Footer */}
      <footer className="mt-16 pt-8 border-t border-[var(--color-border)]">
        <Link
          href="/projects"
          className="text-sm text-[var(--color-primary-600)] hover:text-[var(--color-primary-700)] transition-colors"
        >
          &larr; 返回项目列表
        </Link>
      </footer>
    </article>
  );
}
