# 个人数字空间 - 项目文档

## 项目概述

张璐的个人数字空间，集个人简介、文章博客、项目展示于一体。

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
├── content/                ← 内容文件（你主要操作的目录）
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

## 如何添加文章

1. 打开 GitHub 仓库的 `content/posts/` 目录
2. 点击 `Add file` → `Create new file`
3. 文件名格式：`my-article-title.mdx`（英文 slug）
4. 复制以下模板：

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

5. 填写提交信息，点击 `Commit changes`
6. 1-2 分钟后网站自动更新

### 文章 Frontmatter 字段说明

| 字段 | 必填 | 说明 |
|------|------|------|
| title | 是 | 文章标题 |
| date | 是 | 发布日期，格式 YYYY-MM-DD |
| excerpt | 是 | 摘要，用于列表展示和 SEO |
| category | 否 | 分类，如「随笔」「思考」「方法论」 |
| tags | 否 | 标签数组 |

### 下架文章

在 GitHub 上删除对应的 `.mdx` 文件，提交后网站自动更新。

### 修改文章

在 GitHub 上找到对应文件，点击编辑按钮，修改后提交。

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

编辑 `src/app/page.tsx` 文件中的 `profile` 变量：

```typescript
const profile = {
  name: "张璐",           // 姓名
  tagline: "探索者 / 创造者 / 终身学习者",  // 一句话介绍
  bio: "欢迎来到...",      // 首页简介
  tags: ["产品设计", "技术创新"],  // 标签
};
```

## 部署方式

- **自动部署**：推送到 GitHub main 分支后，Vercel 自动构建并部署
- **构建命令**：`npm run build`（Vercel 自动执行）
- **环境变量**：仅 `NEXT_PUBLIC_SITE_URL`（部署后在 Vercel 设置中更新为正式域名）

## 域名规划

当前使用 Vercel 免费域名：`zhanglu-digital-space.vercel.app`

计划绑定自定义域名（推荐在 Cloudflare Registrar 注册）：
- `zhanglu.com`
- `zhanglu.dev`
- `zhanglu.me`

绑定域名后需更新：
1. `.env.local` 中的 `NEXT_PUBLIC_SITE_URL`
2. Vercel 项目设置中的域名
3. `src/app/page.tsx` 中的个人信息（如有变化）
