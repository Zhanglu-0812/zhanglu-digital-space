import type { Metadata } from "next";
import { getAllProjects } from "@/lib/mdx";
import { getAllThoughts } from "@/lib/thoughts";
import { ProjectCard } from "@/components/ProjectCard";
export const metadata: Metadata = { title: "项目", description: "正在做的事，记录过程、思考与产出。" };
export default function ProjectsPage() {
 const projects = getAllProjects(); const thoughts = getAllThoughts();
 return <div className="space-shell"><header className="mb-12"><p className="eyebrow">把想法放进实践</p><h1 className="text-3xl font-semibold mb-4">项目</h1><p className="muted">正在做的事，以及过程中的思考与产出。</p></header><div className="project-grid">{projects.map((project) => <ProjectCard key={project.slug} project={project} thoughts={thoughts} />)}</div></div>;
}
