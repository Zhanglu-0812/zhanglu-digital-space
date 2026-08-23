# 个人数字空间 - 项目文档

## 项目概述

张路的个人数字空间，集个人简介、文章博客、项目展示于一体。

- **线上地址**：https://zhanglu-digital-space.vercel.app
- **代码仓库**：https://github.com/Zhanglu-0812/zhanglu-digital-space

## 技术栈

| 层级 | 技术 | 说明 |
|------|------|------|
| 前端框架 | Next.js 15 | React 生态，App Router |
| 语言 | TypeScript | 类型安全 |
| 样式 | Tailwind CSS 4 | 原子化 CSS |
| 内容管理 | MDX 文件 | 存放在 content/ 目录，通过 GitHub 管理 |
| 部署 | Vercel | 自动部署，推送到 GitHub 即触发 |
| 域名 | 待绑定 | 当前使用 vercel.app 免费域名 |

## 目录结构

```
├── content/                ← 由 Codex 整理和维护的内容文件
│   ├── posts/              ← 文章（.mdx 文件）
│   └── projects/           ← 项目（.mdx 文件）
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
5. Codex 提交并推送到 GitHub，Vercel 随后自动部署

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
description: "项目简介"
techStack: ["技术1", "技术2"]
status: "in-progress"
links:
  - label: "线上地址"
    url: "https://example.com"
order: 1
---

## 项目背景

详细介绍...
```

### 项目 Frontmatter 字段说明

| 字段 | 必填 | 说明 |
|------|------|------|
| title | 是 | 项目名称 |
| date | 是 | 日期 |
| description | 是 | 项目简介 |
| techStack | 否 | 技术栈数组 |
| status | 否 | `in-progress`（进行中）/ `completed`（已完成）/ `archived`（已归档） |
| links | 否 | 项目链接数组，每项含 label 和 url |
| order | 否 | 排序权重，数字越小越靠前 |

## 如何修改个人信息

个人资料采用逐项访谈方式维护。你提供真实事实、公开范围和表达偏好，Codex 负责整理成网页内容。当前首页资料位于 `src/app/page.tsx`：

```typescript
const profile = {
  name: "张路",           // 姓名
  tagline: "探索者 / 创造者 / 终身学习者",  // 一句话介绍
  bio: "欢迎来到...",      // 首页简介
  tags: ["产品设计", "技术创新"],  // 标签
};
```

## 部署方式

- **自动部署**：推送到 GitHub main 分支后，Vercel 自动构建并部署
- **构建命令**：`npm run build`（Vercel 自动执行）
- **完整检查**：`npm run check`（代码规范检查 + 生产构建）
- **环境变量**：仅 `NEXT_PUBLIC_SITE_URL`（部署后在 Vercel 设置中更新为正式域名）
- **上传原则**：本地检查通过并经张路确认后，才允许推送到 GitHub

## 域名规划

当前使用 Vercel 免费域名：`zhanglu-digital-space.vercel.app`

计划绑定自定义域名（推荐在 Cloudflare Registrar 注册）：
- `zhanglu.com`
- `zhanglu.dev`
- `zhanglu.me`

绑定域名后需更新：
1. `.env.local` 中的 `NEXT_PUBLIC_SITE_URL`
2. Vercel 项目设置中的域名和 `NEXT_PUBLIC_SITE_URL`
3. `public/llms.txt` 中的网站地址

域名未确定前，代码默认使用现有 Vercel 地址。`.env.example` 提供了环境变量示例。
