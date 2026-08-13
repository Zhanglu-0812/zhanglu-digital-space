import type { Metadata } from "next";
import Link from "next/link";
import { getAllProjects } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "项目",
  description: "张璐的项目展示 - 看看我做过什么",
};

const statusMap: Record<string, string> = {
  "in-progress": "进行中",
  completed: "已完成",
  archived: "已归档",
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-3 text-[var(--color-text-primary)]">
        项目
      </h1>
      <p className="text-[var(--color-text-secondary)] mb-12">
        我做过的项目，每个都是一段学习和成长的经历。
      </p>

      <div className="space-y-8">
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="block group"
          >
            <article className="border border-[var(--color-border)] rounded-lg p-6 hover:border-[var(--color-primary-300)] transition-colors">
              <div className="flex items-start justify-between mb-3">
                <h2 className="text-xl font-semibold group-hover:text-[var(--color-primary-600)] transition-colors">
                  {project.frontmatter.title}
                </h2>
                {project.frontmatter.status && (
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full ${
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
              <p className="text-[var(--color-text-secondary)] mb-4">
                {project.frontmatter.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {project.frontmatter.techStack?.map((tag) => (
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

      {projects.length === 0 && (
        <p className="text-[var(--color-text-secondary)] text-center py-16">
          还没有项目，去 content/projects/ 目录添加你的第一个项目吧！
        </p>
      )}
    </div>
  );
}
