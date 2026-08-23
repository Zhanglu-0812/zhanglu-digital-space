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

function requireText(
  value: unknown,
  field: string,
  filePath: string
): string {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`${filePath}: ${field} 必须填写文字内容`);
  }
  return value;
}

function requireDate(value: unknown, filePath: string): string {
  const date = requireText(value, "date", filePath);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(Date.parse(date))) {
    throw new Error(`${filePath}: date 必须使用 YYYY-MM-DD 格式`);
  }
  return date;
}

function optionalStringList(
  value: unknown,
  field: string,
  filePath: string
): string[] | undefined {
  if (value === undefined) return undefined;
  if (!Array.isArray(value) || value.some((item) => typeof item !== "string")) {
    throw new Error(`${filePath}: ${field} 必须是文字列表`);
  }
  return value;
}

function parsePostFrontmatter(
  data: Record<string, unknown>,
  filePath: string
): PostFrontmatter {
  if (data.pinned !== undefined && typeof data.pinned !== "boolean") {
    throw new Error(`${filePath}: pinned 必须是 true 或 false`);
  }

  return {
    title: requireText(data.title, "title", filePath),
    date: requireDate(data.date, filePath),
    excerpt: requireText(data.excerpt, "excerpt", filePath),
    category:
      data.category === undefined
        ? undefined
        : requireText(data.category, "category", filePath),
    tags: optionalStringList(data.tags, "tags", filePath),
    coverImage:
      data.coverImage === undefined
        ? undefined
        : requireText(data.coverImage, "coverImage", filePath),
    pinned: data.pinned as boolean | undefined,
  };
}

function parseProjectFrontmatter(
  data: Record<string, unknown>,
  filePath: string
): ProjectFrontmatter {
  const validStatuses = ["in-progress", "completed", "archived"];
  if (
    data.status !== undefined &&
    (typeof data.status !== "string" || !validStatuses.includes(data.status))
  ) {
    throw new Error(
      `${filePath}: status 必须是 in-progress、completed 或 archived`
    );
  }

  if (data.order !== undefined && typeof data.order !== "number") {
    throw new Error(`${filePath}: order 必须是数字`);
  }

  let links: ProjectFrontmatter["links"];
  if (data.links !== undefined) {
    if (!Array.isArray(data.links)) {
      throw new Error(`${filePath}: links 必须是链接列表`);
    }
    links = data.links.map((link) => {
      if (typeof link !== "object" || link === null) {
        throw new Error(`${filePath}: links 中的每一项都必须包含名称和网址`);
      }
      const item = link as Record<string, unknown>;
      const url = requireText(item.url, "links.url", filePath);
      try {
        new URL(url);
      } catch {
        throw new Error(`${filePath}: ${url} 不是有效网址`);
      }
      return {
        label: requireText(item.label, "links.label", filePath),
        url,
      };
    });
  }

  return {
    title: requireText(data.title, "title", filePath),
    date: requireDate(data.date, filePath),
    description: requireText(data.description, "description", filePath),
    techStack: optionalStringList(data.techStack, "techStack", filePath),
    status: data.status as ProjectFrontmatter["status"],
    links,
    order: data.order as number | undefined,
  };
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
      frontmatter: parsePostFrontmatter(data, filePath),
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
    frontmatter: parsePostFrontmatter(data, filePath),
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
      frontmatter: parseProjectFrontmatter(data, filePath),
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
    frontmatter: parseProjectFrontmatter(data, filePath),
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
