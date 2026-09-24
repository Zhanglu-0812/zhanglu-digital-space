# 个人数字空间 - 项目文档

## 项目概述

张路的个人数字空间，集个人简介、文章博客、项目展示于一体。

- **当前正式线上地址**：https://byzhanglu.com
- **Cloudflare Pages 项目**：`zhanglu-digital-space-test`（内部项目名，生产分支为 `main`）
- **原测试域名**：https://test.byzhanglu.com（现已 301 跳转正式站）
- **代码仓库**：https://github.com/Zhanglu-0812/zhanglu-digital-space
- **当前状态**：[查看项目状态与交接记录](./PROJECT_STATUS.md)
- **风格调整（另一个对话）**：[风格交接说明](./STYLE_HANDOFF.md)
- **信息完善（原对话）**：[当前内容确认清单](./CONTENT_REVIEW.md) · [固定填写与维护流程](./CONTENT_WORKFLOW.md)

## 技术栈

| 层级 | 技术 | 说明 |
|------|------|------|
| 前端框架 | Next.js 15 | React 生态，App Router |
| 语言 | TypeScript | 类型安全 |
| 样式 | Tailwind CSS 4 | 原子化 CSS |
| 内容管理 | MDX 文件 | 存放在 content/ 目录，通过 GitHub 管理 |
| 部署 | Cloudflare Pages（正式）/ Vercel（备用） | Pages 自动部署 GitHub `main`，Vercel 继续保留原部署 |
| 域名 | 正式根域名已绑定 | `test.byzhanglu.com` 与 `www` 均已配置 301 跳转到 `byzhanglu.com` |

## 目录结构

```
├── content/                ← 由 Codex 整理和维护的内容文件
│   ├── posts/              ← 文章（.mdx 文件）
│   ├── projects/           ← 项目（.mdx 文件）
│   └── thoughts/           ← 思绪（.mdx 文件）
├── src/
│   ├── app/                ← Next.js 页面
│   │   ├── page.tsx        ← 首页
│   │   ├── about/page.tsx  ← 关于我页面
│   │   ├── blog/           ← 文章列表 + 详情
│   │   ├── projects/       ← 项目列表 + 详情
│   │   ├── robots.ts       ← 搜索引擎爬虫配置
│   │   └── sitemap.ts      ← 站点地图
│   ├── components/         ← 组件
│   │   ├── Header.tsx      ← 顶部导航
│   │   ├── Footer.tsx      ← 底部
│   │   └── MDXContent.tsx  ← MDX 渲染组件
│   └── lib/
│       └── mdx.ts          ← MDX 文件读取工具
├── public/
│   └── llms.txt            ← AI 可发现性文件
└── docs/                   ← 项目文档（本目录）
```

## 与 Codex 协作发布文章

1. 将文章原文发给 Codex，可以直接粘贴或提供文件
2. Codex 整理标题、摘要、分类、标签、英文网址名称和网页排版
3. Codex 在本地执行 `npm run check`，确认代码和生产构建通过
4. 你确认文章内容与改动清单
5. Codex 提交并推送到 GitHub `main`，Cloudflare Pages 随后自动部署；发布后检查正式域名

未经你的明确确认，Codex 不会将改动推送到 GitHub。

文章在项目中的文件格式如下：

```mdx
---
title: "文章标题"
date: "2025-01-15"
excerpt: "一句话摘要"
category: "分类名"
tags: ["标签1", "标签2"]
---

正文内容，支持 Markdown 排版。

## 二级标题

正文段落。

- 列表项
- 列表项

**加粗文字**  *斜体文字*

> 引用文字
```

### 文章 Frontmatter 字段说明

| 字段 | 必填 | 说明 |
|------|------|------|
| title | 是 | 文章标题 |
| date | 是 | 发布日期，格式 YYYY-MM-DD |
| excerpt | 是 | 摘要，用于列表展示和 SEO |
| category | 否 | 分类，如「随笔」「思考」「方法论」 |
| tags | 否 | 标签数组 |

### 修改或下架文章

告诉 Codex 需要修改或下架的文章。Codex 会先在本地完成操作并展示检查结果，得到你的确认后再推送。

## 如何添加项目

和文章类似，在 `content/projects/` 目录下新建 `.mdx` 文件：

```mdx
---
title: "项目名称"
date: "2025-01-15"
updated: "2025-02-01"
description: "项目简介"
projectType: "项目类型"
role: "本人在项目中的角色"
period: "项目周期"
techStack: ["技术1", "技术2"]
accessInfo: "无法使用普通链接时的体验方式"
status: "in-progress"
links:
  - label: "线上地址"
    url: "https://example.com"
order: 1
---

## 为什么做

详细介绍...

## 用户与问题

<ProjectPlaceholder>尚未确认的内容可以先保留为本地占位，发布前必须替换。</ProjectPlaceholder>
```

### 项目 Frontmatter 字段说明

| 字段 | 必填 | 说明 |
|------|------|------|
| title | 是 | 项目名称 |
| date | 是 | 日期 |
| updated | 否 | 最近更新时间，格式 YYYY-MM-DD |
| description | 是 | 项目简介 |
| projectType | 否 | 项目类型，用于详情页顶部概览 |
| role | 否 | 本人在项目中的真实角色 |
| period | 否 | 项目起止时间或当前周期 |
| techStack | 否 | 技术栈数组 |
| accessInfo | 否 | 无法使用普通链接时显示的体验方式，例如微信搜索名称 |
| draft | 否 | `true` 时不进入项目列表、详情导出或站点地图 |
| status | 否 | `in-progress`（进行中）/ `completed`（已完成）/ `archived`（已归档） |
| links | 否 | 项目链接数组，每项含 label 和 url |
| order | 否 | 排序权重，数字越小越靠前 |

## 如何修改个人信息

个人资料采用逐项访谈方式维护。你提供真实事实、公开范围和表达偏好，Codex 负责整理成网页内容。当前首页和“关于我”的主要资料位于 `src/data/profile.ts`：

```typescript
const profile = {
  name: "张路",           // 姓名
  tagline: "探索者 / 创造者 / 终身学习者",  // 一句话介绍
  bio: "欢迎来到...",      // 首页简介
  tags: ["产品设计", "技术创新"],  // 标签
};
```

## 部署方式

- **正式部署**：Cloudflare Pages 项目 `zhanglu-digital-space-test` 自动部署 GitHub `main` 分支
- **正式域名**：`https://byzhanglu.com`
- **Pages 默认地址**：`https://zhanglu-digital-space-test.pages.dev`（现已 301 跳转正式站；独立预览地址仍可访问）
- **原测试域名**：`https://test.byzhanglu.com`（已 301 跳转正式站）
- **备用部署**：Vercel 原 Production 部署继续保留，但不再作为唯一正式网址
- **构建命令**：`npm run build`
- **Pages 输出目录**：`out`
- **完整检查**：`npm run check`（代码规范检查 + 生产构建）
- **canonical 检查**：`npm run check` 还会逐页核对导出 HTML、站点地图和正式域名 canonical；新文章、项目、思绪自动按 slug 生成，新板块需在页面元数据与 sitemap 中登记
- **SEO 基准网址**：`src/lib/site.ts` 固定为 `https://byzhanglu.com`，本地构建也输出正式域名的 canonical、sitemap 和 robots
- **上传原则**：本地检查通过并经张路确认后，才允许推送到 GitHub

## 域名与 DNS

正式域名为 `byzhanglu.com`，已于 2026-08-28 在腾讯云购买并完成实名认证。2026-09-22，域名的权威名称服务器由 DNSPod 切换至 Cloudflare，根域名随后绑定当前 Pages 项目并启用自动 HTTPS。

- Cloudflare 名称服务器：`pranab.ns.cloudflare.com`、`sneh.ns.cloudflare.com`
- `byzhanglu.com`：正式站，Pages 自定义域状态为活动，SSL 已启用
- `test.byzhanglu.com`：2026-09-24 起 301 跳转至正式站，保留路径和查询参数
- `www.byzhanglu.com`：已添加 Cloudflare 代理 DNS，并启用到 `https://byzhanglu.com` 的 301 批量重定向规则
- `zhanglu-digital-space-test.pages.dev`：Pages 自动生成的默认地址，2026-09-24 起 301 跳转正式站；项目名中的 `test` 不影响 `main` 生产分支或正式域名

代码中的 SEO 基准网址和 `public/llms.txt` 均使用 `https://byzhanglu.com`；原 `NEXT_PUBLIC_SITE_URL` 环境变量现不参与 canonical、sitemap 或 robots 生成。后续发布仍需检查 DNS、HTTPS、主要页面和 `www` 重定向；并继续观察中国大陆不同运营商和不同时段的跨境访问表现。


## 新版内容维护（2026-09-11，本地待验收）

首页顺序为「个人介绍 → 代表文章 → 正在做 → 思绪」，全部纵向排列。导航为首页、文章、项目、思绪、关于我。长期关注包含在思绪中，不另设内容目录。

### 首页精选与最新文章

在文章元数据加入 `pinned: true`，即可将文章设为首页精选，首页最多展示 2 篇。第一篇精选使用封面和完整摘要作为主入口；第二篇精选使用轻量文字入口。首页「最新发布」会自动读取未设为精选的最近 3 篇文章，避免同一篇重复出现。手机端采用同一内容规则，精选文章改为封面在上、文字在下的纵向排列。全部文章始终进入文章列表，现有文章网址不变。

### 发布思绪

在 `content/thoughts/` 新建独立 `.mdx` 文件，文件名作为稳定链接锚点，发布后避免随意改名。日期必须使用带引号的真实日期；可选 `createdAt: "2026-09-11T13:44:14+08:00"` 保留北京时间，日期须与 date 一致。同日优先按 createdAt 排序，没有精确时间则按日期和文件名排序。标题和标签均可省略。

```mdx
---
date: "2026-09-11"
tags: ["AI", "教育"]
draft: true
---

在这里放入本人提供的真实记录。确认后去掉 draft 或设为 false。
```

图片放入 `public/images/thoughts/`，在正文使用 `![图片描述](/images/thoughts/文件名.jpg)`。发布前整理图片尺寸并检查公开范围。首页在电脑和手机端均显示最近 3 条时间线笔记，标题直接进入对应全文；思绪页显示全部记录，标签链接支持直接打开和清除筛选。

### 标签自然聚合

同标签至少 **10 条已发布思绪，且覆盖 5 个不同发布日期**，才显示为「长期关注」。一条思绪的重复标签只计一次；草稿不计入。未达标标签仍可点击筛选。以记录数量倒序、最近日期倒序排列，首页最多 4 个，思绪页显示全部达标主题。无达标主题时不显示该区域。

同义词由维护时统一，例如 AI / 人工智能；当前程序只清理标签首尾空格，不擅自合并语义。

### 项目与进展

项目继续放在 `content/projects/`。`draft: true` 的项目不进入列表、详情导出或站点地图。`updated` 为可选更新日期。首页只显示 `in-progress` 项目，项目页也保留已完成和归档项目。

项目日常进展只写一条思绪，并加入 `project: "digital-space"`（对应已发布项目的文件名，不带扩展名）。该思绪会同时显示在思绪流和项目详情页，项目卡片同步最近进展与更新日期。项目还没有关联思绪时，卡片取项目正文「当前进展」段落；日期取 updated 或 date。稳定介绍、产出链接仍在项目文件里维护。

张小厨已作为进行中项目进入本地首页与项目列表，详情页仍有待补充模块，未清理占位前不得上传。AI 学习圈与原示例项目继续保持草稿，不进入公开页面。

项目详情页固定为九个模块：为什么做、用户与问题、项目结构、当前进展、过程与关键选择、已有成果、收获与反思、下一步、进展与思考。前八项维护在项目 MDX 文件中；最后一项自动读取带有对应 `project` 字段的思绪。`ProjectPlaceholder` 只用于本地明确标记缺失信息，正式发布前必须移除或替换为本人确认的真实内容。

### 本机内容管理工具

张路本机另有一个内容管理工具，可管理文章、项目和思绪。工具代码与双击启动文件属于个人本机辅助文件，已通过 `.gitignore` 排除，不随网站仓库上传，也不是网站构建或发布的依赖。

工具直接修改本地内容文件，不会自动提交 Git、上传或上线。完成修改后仍需运行网站检查、本人预览验收，并在当次明确授权后才能发布。

### 日常协作方式

可以使用本地内容管理页自行维护，也可以把原文、图片、标签或项目名发给 Codex，由 Codex 整理并运行检查。本人验收并明确授权上传后才提交、推送。聚合在构建发布时刷新，并非输入即上线；当前没有手机发布后台。预览使用本地页面，测试站更新也必须先得到明确授权。


### 文章配图维护

文章封面使用元数据 `coverImage`，正文图片使用 `<ArticleImage src="/images/posts/文章标识/图片名.webp" />`。图片尺寸与替代文本登记在 `src/data/article-images.json`，封面和正文共用该登记信息。网页版本存入 `public/images/posts/`；保持原始素材不变，只复制并生成适合网页加载的版本。所有图片维持原比例，可点击打开大图，正文按需加载。发布前检查图片路径、尺寸、替代文本以及手机端显示。


## 标题、简介和图文位置的确认

新增或修改内容时，先使用 [内容确认流程与模板](./CONTENT_WORKFLOW.md)，再按本人确认结果调整。当前三篇文章、首页个人介绍及十六条思绪的复核清单见 [当前内容待确认清单](./CONTENT_REVIEW.md)。标题、文章首页简介、封面和插图位置由本人提供或明确确认，候选不能自动定稿。

首页板块统一为「文章、项目、思绪」，各自的查看全部入口位于标题行最右侧。文章显示发布日期。思绪顺序为时间、标题、标签、正文；超过 100 字默认折叠，保留展开与收起操作。
