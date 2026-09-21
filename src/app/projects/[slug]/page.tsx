import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, getAllProjectSlugs } from "@/lib/mdx";
import { getAllThoughts } from "@/lib/thoughts";
import { ThoughtCard } from "@/components/ThoughtCard";
import { MDXContent } from "@/components/MDXContent";

const statusMap: Record<string, string> = {
  "in-progress": "进行中",
  completed: "已完成",
  archived: "已归档",
};

const projectSections = [
  "为什么做",
  "用户与问题",
  "项目结构",
  "当前进展",
  "过程与关键选择",
  "已有成果",
  "收获与反思",
  "下一步",
];

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

  const relatedThoughts = getAllThoughts().filter(
    (thought) => thought.project === slug
  );
  const facts = [
    { label: "项目类型", value: project.frontmatter.projectType },
    { label: "我的角色", value: project.frontmatter.role },
    { label: "项目周期", value: project.frontmatter.period },
    {
      label: "主要工具",
      value: project.frontmatter.techStack?.join(" · "),
    },
  ];

  return (
    <article className="project-detail-shell">
      <header className="project-detail-hero">
        <Link href="/projects" className="project-detail-back">
          &larr; 返回项目列表
        </Link>

        <div className="project-detail-kicker">
          {project.frontmatter.status && (
            <span className="project-detail-status">
              {statusMap[project.frontmatter.status] || project.frontmatter.status}
            </span>
          )}
          <span>
            更新于 {project.frontmatter.updated ?? project.frontmatter.date}
          </span>
        </div>

        <h1>{project.frontmatter.title}</h1>
        <p className="project-detail-description">
          {project.frontmatter.description}
        </p>

        <dl className="project-detail-facts">
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd className={fact.value ? "" : "is-placeholder"}>
                {fact.value ?? "待补充"}
              </dd>
            </div>
          ))}
        </dl>

        <div className="project-detail-links">
          {project.frontmatter.links?.length ? (
            project.frontmatter.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label} &rarr;
              </a>
            ))
          ) : project.frontmatter.accessInfo ? (
            <span>体验方式：{project.frontmatter.accessInfo}</span>
          ) : (
            <span>项目链接待补充</span>
          )}
        </div>
      </header>

      <div className="project-detail-body">
        <nav className="project-detail-outline" aria-label="项目详情目录">
          <p>项目详情</p>
          {projectSections.map((section, index) => (
            <a key={section} href={`#${section}`}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {section}
            </a>
          ))}
          <a href="#进展与思考">
            <span>09</span>
            进展与思考
          </a>
        </nav>

        <div className="project-detail-main">
          <MDXContent source={project.content} className="project-prose" />

          <section id="进展与思考" className="project-related-thoughts">
            <p className="project-section-index">09</p>
            <h2>进展与思考</h2>
            {relatedThoughts.length ? (
              relatedThoughts.map((thought) => (
                <ThoughtCard key={thought.slug} thought={thought} />
              ))
            ) : (
              <p className="project-related-empty">
                暂时没有与这个项目关联的思绪记录。
              </p>
            )}
          </section>
        </div>
      </div>

      <footer className="project-detail-footer">
        <Link href="/projects">&larr; 返回项目列表</Link>
      </footer>
    </article>
  );
}
