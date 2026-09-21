"use client";
import { useEffect, useState, type ReactNode } from "react";
type Entry = { slug: string; tags: string[]; node: ReactNode };
type Theme = { tag: string; count: number; latest: string };
export function ThoughtStream({ entries, themes }: { entries: Entry[]; themes: Theme[] }) {
  const [tag, setTag] = useState<string | null>(null);
  useEffect(() => {
    const sync = () => setTag(new URL(window.location.href).searchParams.get("tag"));
    sync(); window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);
  function select(value: string | null) {
    setTag(value);
    window.history.pushState(null, "", value ? `/thoughts?tag=${encodeURIComponent(value)}` : "/thoughts");
  }
  const visible = tag ? entries.filter((entry) => entry.tags.includes(tag)) : entries;
  return <>
    {themes.length > 0 && <section className="mb-10"><h2 className="text-lg font-semibold mb-4">长期关注</h2><div className="theme-list">{themes.map((theme) => <button key={theme.tag} onClick={() => select(theme.tag)} aria-pressed={tag === theme.tag} className="theme-button"><strong>{theme.tag}</strong><span>{theme.count} 条记录 · 最近 {theme.latest}</span></button>)}</div></section>}
    <div className="section-heading"><h2>{tag ? `#${tag}` : "全部思绪"}</h2>{tag && <button onClick={() => select(null)} className="text-link">查看全部</button>}</div>
    {visible.length ? visible.map((entry) => <div key={entry.slug}>{entry.node}</div>) : <p className="empty-note">{tag ? "这个标签下暂时没有思绪。" : "念头、日常与尚未成形的思考，在这里慢慢积累。"}</p>}
  </>;
}
