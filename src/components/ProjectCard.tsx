import Link from "next/link";
import type { ContentItem, ProjectFrontmatter } from "@/lib/mdx";
import { projectActivity, type Thought } from "@/lib/thoughts";
export function ProjectCard({ project, thoughts }: { project: ContentItem<ProjectFrontmatter>; thoughts: Thought[] }) {
 const activity = projectActivity(project, thoughts);
 const labels = { "in-progress": "进行中", completed: "已完成", archived: "已归档" };
 return <Link href={`/projects/${project.slug}`} className="project-card"><span className="eyebrow">{project.frontmatter.status ? labels[project.frontmatter.status] : "项目"}</span><h3>{project.frontmatter.title}</h3><p className="muted">{project.frontmatter.description}</p><div className="project-update"><p className="text-sm muted">最近进展</p><p>{activity.summary}</p><time className="text-sm muted" dateTime={activity.date}>更新于 {activity.date}</time></div></Link>;
}
