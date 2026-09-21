import type { MetadataRoute } from "next";
import { getAllPosts, getAllProjects } from "@/lib/mdx";
import { getAllThoughts } from "@/lib/thoughts";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteConfig.url,
      changeFrequency: "weekly",
      priority: 1,
    },
    { url: `${siteConfig.url}/thoughts`, changeFrequency: "daily", priority: 0.8 },
    {
      url: `${siteConfig.url}/about`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/blog`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/projects`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const postPages: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.frontmatter.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const projectPages: MetadataRoute.Sitemap = getAllProjects().map(
    (project) => ({
      url: `${siteConfig.url}/projects/${project.slug}`,
      lastModified: new Date(project.frontmatter.updated ?? project.frontmatter.date),
      changeFrequency: "monthly",
      priority: 0.7,
    })
  );

  const thoughtPages: MetadataRoute.Sitemap = getAllThoughts().map((thought) => ({
    url: `${siteConfig.url}/thoughts/${thought.slug}`,
    lastModified: new Date(thought.createdAt ?? thought.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...postPages, ...projectPages, ...thoughtPages];
}
