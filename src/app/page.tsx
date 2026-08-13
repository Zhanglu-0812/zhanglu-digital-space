import Link from "next/link";
import { getAllPosts } from "@/lib/mdx";
import { getAllProjects } from "@/lib/mdx";

// 个人资料（后续可以移到单独的配置文件中）
const profile = {
  name: "张璐",
  tagline: "探索者 / 创造者 / 终身学习者",
  bio: "欢迎来到我的数字空间。这里记录着我的思考、项目和成长轨迹。我相信持续学习和分享的力量。",
  tags: ["产品设计", "技术创新", "个人成长", "阅读思考"],
};

export default function Home() {
  const posts = getAllPosts().slice(0, 3);
  const projects = getAllProjects().slice(0, 2);

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      {/* Hero Section */}
      <section className="mb-20">
        <h1 className="text-3xl font-bold mb-3 text-[var(--color-text-primary)]">
          {profile.name}
        </h1>
        <p className="text-lg text-[var(--color-primary-600)] mb-6">
          {profile.tagline}
        </p>
        <p className="text-[var(--color-text-secondary)] leading-relaxed max-w-xl">
          {profile.bio}
        </p>
        <div className="flex flex-wrap gap-2 mt-6">
          {profile.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1 rounded-full bg-[var(--color-primary-50)] text-[var(--color-primary-700)]"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* Recent Posts */}
      <section className="mb-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">
            最新文章
          </h2>
          <Link
            href="/blog"
            className="text-sm text-[var(--color-primary-600)] hover:text-[var(--color-primary-700)] transition-colors"
          >
            查看全部 &rarr;
          </Link>
        </div>
        <div className="space-y-8">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block group"
            >
              <article>
                <time className="text-xs text-[var(--color-text-secondary)]">
                  {post.frontmatter.date}
                </time>
                <h3 className="text-lg font-medium mt-1 group-hover:text-[var(--color-primary-600)] transition-colors">
                  {post.frontmatter.title}
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)] mt-1 line-clamp-2">
                  {post.frontmatter.excerpt}
                </p>
              </article>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Projects */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">
            精选项目
          </h2>
          <Link
            href="/projects"
            className="text-sm text-[var(--color-primary-600)] hover:text-[var(--color-primary-700)] transition-colors"
          >
            查看全部 &rarr;
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="block group"
            >
              <article className="border border-[var(--color-border)] rounded-lg p-5 hover:border-[var(--color-primary-300)] transition-colors">
                <h3 className="font-medium group-hover:text-[var(--color-primary-600)] transition-colors">
                  {project.frontmatter.title}
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)] mt-2 line-clamp-2">
                  {project.frontmatter.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-3">
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
      </section>
    </div>
  );
}
