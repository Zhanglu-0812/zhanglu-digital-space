import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { getAllProjects, type ContentItem, type ProjectFrontmatter } from "./mdx";

export type Thought = { slug: string; date: string; createdAt?: string; title?: string; tags: string[]; project?: string; content: string };
export const THEME_MIN_RECORDS = 10;
export const THEME_MIN_DATES = 5;
export function getAllThoughts(): Thought[] {
  const directory = path.join(process.cwd(), "content/thoughts");
  if (!fs.existsSync(directory)) return [];
  const projects = new Set(getAllProjects().map((item) => item.slug));
  return fs.readdirSync(directory).filter((file) => file.endsWith(".mdx")).flatMap((file) => {
    const { data, content } = matter(fs.readFileSync(path.join(directory, file), "utf8"));
    const fail = (message: string): never => { throw new Error(`${file}: ${message}`); };
    if (data.draft !== undefined && typeof data.draft !== "boolean") fail("draft 必须是布尔值");
    if (data.draft) return [];
    if (typeof data.date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(data.date) || Number.isNaN(Date.parse(data.date)) || new Date(data.date).toISOString().slice(0, 10) !== data.date) fail("date 必须是有效的 YYYY-MM-DD 日期");
    if (data.createdAt !== undefined && (typeof data.createdAt !== "string" || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\+08:00$/.test(data.createdAt) || Number.isNaN(Date.parse(data.createdAt)) || data.createdAt.slice(0, 10) !== data.date)) fail("createdAt 必须是与 date 一致的北京时间");
    if (!content.trim()) fail("正文不能为空");
    if (data.title !== undefined && (typeof data.title !== "string" || !data.title.trim())) fail("标题必须是非空文字");
    if (data.tags !== undefined && (!Array.isArray(data.tags) || data.tags.some((tag: unknown) => typeof tag !== "string" || !tag.trim()))) fail("标签必须是非空文字列表");
    if (data.project !== undefined && (typeof data.project !== "string" || !projects.has(data.project))) fail("关联项目不存在或尚未发布");
    const tags: string[] = data.tags ?? [];
    return [{ slug: file.replace(/\.mdx$/, ""), date: data.date, createdAt: data.createdAt, title: data.title, tags: [...new Set(tags.map((tag) => tag.trim()))], project: data.project, content }];
  }).sort((a, b) => b.date.localeCompare(a.date) || (b.createdAt ?? b.date).localeCompare(a.createdAt ?? a.date) || b.slug.localeCompare(a.slug));
}
export function getAllThoughtSlugs() {
  return getAllThoughts().map((thought) => thought.slug);
}
export function getThoughtBySlug(slug: string) {
  return getAllThoughts().find((thought) => thought.slug === slug) ?? null;
}
export function getThemes(thoughts: Thought[]) {
  const groups = new Map<string, Thought[]>();
  for (const thought of thoughts) for (const tag of new Set(thought.tags)) groups.set(tag, [...(groups.get(tag) ?? []), thought]);
  return [...groups].map(([tag, items]) => ({ tag, count: items.length, dates: new Set(items.map((item) => item.date)).size, latest: items.map((item) => item.date).sort().at(-1)! }))
    .filter((theme) => theme.count >= THEME_MIN_RECORDS && theme.dates >= THEME_MIN_DATES)
    .sort((a, b) => b.count - a.count || b.latest.localeCompare(a.latest) || a.tag.localeCompare(b.tag, "zh-CN"));
}
export function projectActivity(project: ContentItem<ProjectFrontmatter>, thoughts: Thought[]) {
  const updates = thoughts.filter((thought) => thought.project === project.slug);
  const latest = updates[0];
  return { date: [project.frontmatter.updated ?? project.frontmatter.date, ...updates.map((item) => item.date)].sort().at(-1)!, summary: latest ? (latest.title ?? latest.content.replace(/[#*\[\]]/g, "").trim().slice(0, 80)) : (project.content.match(/## 当前进展\s+([^#]+)/)?.[1].trim() ?? project.frontmatter.description) };
}
