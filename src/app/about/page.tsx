import type { Metadata } from "next";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "关于我",
  description: "了解张路 - 我的故事、价值观和经历",
};

export default function AboutPage() {
  return (
    <div className="reading-shell">
      {/* Intro */}
      <section className="mb-16">
        <h1 className="text-3xl font-bold mb-6 text-[var(--color-text-primary)]">
          关于我
        </h1>
        <p className="text-lg text-[var(--color-text-secondary)] mb-8">
          {profile.intro}
        </p>
        <div className="prose">
          {profile.story.split("\n\n").map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-8 text-[var(--color-text-primary)]">
          我相信的事
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {profile.values.map((value) => (
            <div
              key={value.title}
              className="value-note"
            >
              <h3 className="font-medium text-[var(--color-primary-600)] mb-2">
                {value.title}
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)]">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-[var(--color-text-primary)]">
          经历与方向
        </h2>
        <div className="flex flex-wrap gap-2">
          {profile.skills.map((skill) => (
            <span
              key={skill}
              className="editorial-label"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section>
        <h2 className="text-2xl font-semibold mb-8 text-[var(--color-text-primary)]">
          时间线
        </h2>
        <div className="relative pl-8 border-l-2 border-[var(--color-border)]">
          {profile.timeline.map((event, i) => (
            <div key={i} className="mb-10 last:mb-0 relative">
              <div className="absolute -left-[calc(2rem+5px)] w-2.5 h-2.5 rounded-full bg-[var(--color-primary-500)]" />
              <time className="text-sm font-medium text-[var(--color-primary-600)]">
                {event.year}
              </time>
              <h3 className="font-medium mt-1 text-[var(--color-text-primary)]">
                {event.title}
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                {event.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
