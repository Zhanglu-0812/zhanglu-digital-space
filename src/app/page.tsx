import Image from "next/image";
import Link from "next/link";
import { getAllPosts, getAllProjects } from "@/lib/mdx";
import { getAllThoughts, getThemes } from "@/lib/thoughts";
import { ProjectCard } from "@/components/ProjectCard";
import { HomeProgress } from "@/components/HomeProgress";
import { HomeThoughtTimeline } from "@/components/HomeThoughtTimeline";
import { profile } from "@/data/profile";
import articleImages from "@/data/article-images.json";

export default function Home() {
  const allPosts = getAllPosts();
  const featuredPosts = allPosts.filter((post) => post.frontmatter.pinned).slice(0, 2);
  const latestPosts = allPosts.filter((post) => !post.frontmatter.pinned).slice(0, 3);
  const projects = getAllProjects().filter((project) => project.frontmatter.status === "in-progress");
  const thoughts = getAllThoughts();
  const themes = getThemes(thoughts).slice(0, 4);

  return (
    <div className="space-shell home-shell">
      <HomeProgress />
      <section id="home-intro" className="home-intro">
        <div className="intro-inner">
          <div className="intro-opening">
            <p className="eyebrow">张路的数字空间</p>
            <h1 className="intro-name">
              <span className="intro-mobile-name">{profile.name}</span>
              <span className="intro-note">{profile.openingNote}</span>
            </h1>
            <p className="intro-signature">{profile.name}</p>
            <p className="intro-invitation">
              {profile.homeInvitation.map((line) => <span key={line}>{line}</span>)}
            </p>
          </div>

          <div className="intro-description intro-description-desktop">
            <div className="intro-bottom-row">
              <p className="intro-tagline">{profile.tagline}</p>
              <Link href="/about" className="text-link">更多关于我 →</Link>
            </div>
          </div>

        </div>
      </section>

      <section id="home-articles-section" className="home-section" aria-labelledby="home-articles">
        <div className="section-heading">
          <h2 id="home-articles">文章</h2>
          <Link href="/blog" className="text-link">查看全部文章 →</Link>
        </div>
        <div className="home-articles-desktop">
          {featuredPosts.length > 0 && (
            <div className="home-featured-group">
              <p className="home-article-group-label">精选</p>
              {featuredPosts.slice(0, 1).map((post) => {
                const cover = post.frontmatter.coverImage
                  ? articleImages[post.frontmatter.coverImage as keyof typeof articleImages]
                  : null;

                return (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="home-featured-article">
                    <div className="home-featured-copy">
                      <div className="home-featured-meta">
                        <time dateTime={post.frontmatter.date}>{post.frontmatter.date}</time>
                        {post.frontmatter.category && <span>{post.frontmatter.category}</span>}
                      </div>
                      <h3>{post.frontmatter.title}</h3>
                      <p>{post.frontmatter.excerpt}</p>
                      <span className="text-link">阅读全文 →</span>
                    </div>
                    {post.frontmatter.coverImage && cover && (
                      <figure className="home-featured-cover">
                        <Image
                          src={encodeURI(post.frontmatter.coverImage)}
                          alt={cover.alt}
                          width={cover.width}
                          height={cover.height}
                          unoptimized
                          priority
                          sizes="(min-width: 701px) 42vw, 100vw"
                        />
                      </figure>
                    )}
                  </Link>
                );
              })}
              {featuredPosts.slice(1, 2).map((post) => {
                const cover = post.frontmatter.coverImage
                  ? articleImages[post.frontmatter.coverImage as keyof typeof articleImages]
                  : null;

                return (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="home-featured-secondary">
                    {post.frontmatter.coverImage && cover && (
                      <figure className="home-featured-secondary-cover">
                        <Image
                          src={encodeURI(post.frontmatter.coverImage)}
                          alt={cover.alt}
                          width={cover.width}
                          height={cover.height}
                          unoptimized
                          sizes="(min-width: 701px) 180px, 112px"
                        />
                      </figure>
                    )}
                    <div className="home-featured-secondary-copy">
                      <span>另一篇精选 · {post.frontmatter.date}</span>
                      <h3>{post.frontmatter.title}</h3>
                    </div>
                    <span aria-hidden="true">→</span>
                  </Link>
                );
              })}
            </div>
          )}

          {latestPosts.length > 0 && (
            <div className="home-latest-group">
              <p className="home-article-group-label">最新发布</p>
              <div className="home-latest-list">
                {latestPosts.map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="home-latest-article">
                    <time dateTime={post.frontmatter.date}>{post.frontmatter.date}</time>
                    <div>
                      <h3>{post.frontmatter.title}</h3>
                      <p>{post.frontmatter.excerpt}</p>
                    </div>
                    <span aria-hidden="true">→</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

      </section>

      <section id="home-projects-section" className="home-section" aria-labelledby="home-projects">
        <div className="section-heading">
          <h2 id="home-projects">项目</h2>
          <Link href="/projects" className="text-link">查看全部项目 →</Link>
        </div>
        <div className="project-grid">
          {projects.map((project) => <ProjectCard key={project.slug} project={project} thoughts={thoughts} />)}
        </div>
      </section>

      <section id="home-thoughts-section" className="home-section" aria-labelledby="home-thoughts">
        <div className="section-heading">
          <h2 id="home-thoughts">思绪</h2>
          <Link href="/thoughts" className="text-link">查看全部思绪 →</Link>
        </div>
        {thoughts.length ? (
          <div className="home-thoughts-desktop">
            <HomeThoughtTimeline thoughts={thoughts.slice(0, 3)} />
          </div>
        ) : <p className="empty-note">念头、日常与尚未成形的思考，在这里慢慢积累。</p>}
        {themes.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">长期关注</h3>
            <div className="theme-list">
              {themes.map((theme) => <Link className="theme-button" key={theme.tag} href={`/thoughts?tag=${encodeURIComponent(theme.tag)}`}><strong>{theme.tag}</strong><span>{theme.count} 条记录 · 最近 {theme.latest}</span></Link>)}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
