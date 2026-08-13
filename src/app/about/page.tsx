import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "关于我",
  description: "了解张璐 - 我的故事、价值观和经历",
};

// Placeholder data
const profile = {
  name: "张璐",
  avatar: null, // Will be replaced with Sanity image
  intro: "你好，我是张璐。欢迎来到我的数字空间。",
  story: `我是一个对世界充满好奇的人。我相信持续学习和分享的力量，这也是我创建这个数字空间的原因。

在这里，我会分享我的思考、项目和成长轨迹。我希望通过这些内容，能够帮助到和我有相似困惑或兴趣的人。

我认为，每个人都有自己独特的价值。重要的是找到它、打磨它、然后勇敢地分享出来。`,
  values: [
    {
      title: "持续学习",
      description: "保持好奇心，永远不要停止学习新事物。",
    },
    {
      title: "真诚分享",
      description: "分享真实的思考和经验，包括失败和挫折。",
    },
    {
      title: "行动优先",
      description: "想法再好不如动手去做，在实践中学习和成长。",
    },
    {
      title: "长期主义",
      description: "关注长期价值，不被短期利益所迷惑。",
    },
  ],
  skills: [
    "产品设计",
    "用户体验",
    "项目管理",
    "数据分析",
    "写作表达",
    "公开演讲",
  ],
  timeline: [
    {
      year: "2025",
      title: "创建数字空间",
      description: "开始系统性地记录和分享我的思考与项目。",
    },
    {
      year: "2024",
      title: "示例经历",
      description: "这里可以放你的工作或学习经历。",
    },
    {
      year: "2023",
      title: "示例经历",
      description: "另一个重要的里程碑。",
    },
  ],
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
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
              className="border border-[var(--color-border)] rounded-lg p-5"
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
          技能与工具
        </h2>
        <div className="flex flex-wrap gap-2">
          {profile.skills.map((skill) => (
            <span
              key={skill}
              className="text-sm px-4 py-2 rounded-full bg-[var(--color-primary-50)] text-[var(--color-primary-700)]"
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
