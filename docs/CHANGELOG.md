# 变更日志

## 2025-08-13

### 完成项目初始化和上线

**技术搭建**
- 初始化 Next.js 15 + TypeScript + Tailwind CSS 项目
- 搭建 MDX 文件内容管理方案（替代 Sanity CMS）
- 配置基础 SEO（sitemap、robots.txt、llms.txt）

**页面开发**
- 首页：个人简介 + 最新文章 + 精选项目
- 关于我：个人故事、价值观、技能、时间线
- 文章：列表页 + 详情页（从 MDX 文件读取）
- 项目：列表页 + 详情页（从 MDX 文件读取）
- 404 页面

**部署上线**
- 代码推送到 GitHub：https://github.com/Zhanglu-0812/zhanglu-digital-space
- 部署到 Vercel：https://zhanglu-digital-space.vercel.app

**设计风格**
- 极简风格，蓝色点缀
- 中文优先排版
- 响应式布局

**决策记录**
- 选择 MDX 文件方案（非 Sanity CMS）：因为 Sanity 是国外服务，国内访问慢
- 选择 Vercel 部署：免费、简单、自动部署
- 域名方向：以 zhanglu 为主体

---

## 待办事项

- [ ] 将占位内容替换为真实内容
- [ ] 修改首页个人信息（src/app/page.tsx 中的 profile 变量）
- [ ] 注册并绑定自定义域名
- [ ] 更新环境变量中的 NEXT_PUBLIC_SITE_URL
- [ ] 提交搜索引擎收录（Google Search Console、百度站长）
- [ ] 考虑添加深色模式支持
- [ ] 考虑添加文章目录导航
