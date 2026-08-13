import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");

export interface PostFrontmatter {
  title: string;
  date: string;
  excerpt: string;
  category?: string;
  tags?: string[];
  coverImage?: string;
  pinned?: boolean;
}

export interface ProjectFrontmatter {
  title: string;
  date: string;
  description: string;
  techStack?: string[];
  status?: "in-progress" | "completed" | "archived";
  links?: { label: string; url: string }[];
  order?: number;
}

export interface ContentItem<T> {
  slug: string;
  frontmatter: T;
  content: string;
}

// Get all posts
export function getAllPosts(): ContentItem<PostFrontmatter>[] {
  const postsDir = path.join(CONTENT_DIR, "posts");
  if (!fs.existsSync(postsDir)) return [];

  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".mdx"));

  const posts = files.map((filename) => {
    const filePath = path.join(postsDir, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);
    const slug = filename.replace(/\.mdx$/, "");

    return {
      slug,
      frontmatter: data as PostFrontmatter,
      content,
    };
  });

  // Sort by date descending
  return posts.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
  );
}

// Get single post by slug
export function getPostBySlug(
  slug: string
): ContentItem<PostFrontmatter> | null {
  const filePath = path.join(CONTENT_DIR, "posts", `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  return {
    slug,
    frontmatter: data as PostFrontmatter,
    content,
  };
}

// Get all projects
export function getAllProjects(): ContentItem<ProjectFrontmatter>[] {
  const projectsDir = path.join(CONTENT_DIR, "projects");
  if (!fs.existsSync(projectsDir)) return [];

  const files = fs.readdirSync(projectsDir).filter((f) => f.endsWith(".mdx"));

  const projects = files.map((filename) => {
    const filePath = path.join(projectsDir, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);
    const slug = filename.replace(/\.mdx$/, "");

    return {
      slug,
      frontmatter: data as ProjectFrontmatter,
      content,
    };
  });

  // Sort by order, then by date
  return projects.sort((a, b) => {
    const orderA = a.frontmatter.order ?? 999;
    const orderB = b.frontmatter.order ?? 999;
    if (orderA !== orderB) return orderA - orderB;
    return (
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
    );
  });
}

// Get single project by slug
export function getProjectBySlug(
  slug: string
): ContentItem<ProjectFrontmatter> | null {
  const filePath = path.join(CONTENT_DIR, "projects", `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  return {
    slug,
    frontmatter: data as ProjectFrontmatter,
    content,
  };
}

// Get all post slugs for static generation
export function getAllPostSlugs(): string[] {
  const postsDir = path.join(CONTENT_DIR, "posts");
  if (!fs.existsSync(postsDir)) return [];
  return fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

// Get all project slugs for static generation
export function getAllProjectSlugs(): string[] {
  const projectsDir = path.join(CONTENT_DIR, "projects");
  if (!fs.existsSync(projectsDir)) return [];
  return fs
    .readdirSync(projectsDir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

// Get all unique categories
export function getAllCategories(): string[] {
  const posts = getAllPosts();
  const categories = new Set(
    posts.map((p) => p.frontmatter.category).filter(Boolean) as string[]
  );
  return Array.from(categories);
}
