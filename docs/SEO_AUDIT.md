# SEO 诊断与待处理清单

最后更新：2026-09-24

> 进度更新：2026-09-24 已将 `test.byzhanglu.com` 和 `zhanglu-digital-space-test.pages.dev` 分别设为 301 跳转到正式站，并验证首页、文章路径和查询参数。独立 Pages 预览地址仍可访问且带 `noindex`。全站 canonical 已通过提交 `f206a6f` 发布，27 个页面的构建检查通过，正式站四类页面已抽查。下方原诊断保留当时的检查结果。

## 当前结论

网站已具备基础的搜索引擎可抓取能力，HTTPS、`robots.txt`、XML 站点地图、页面标题、页面描述和静态 HTML 均正常。当前的主要短板不是内容数量，而是正式域名的规范化、搜索收录监测、文章结构化数据和站内内容连接。

2026-09-23 的原诊断仅记录问题和建议；2026-09-24 已完成上方注明的域名跳转与 canonical 发布。

## 已确认的良好状态

- `http://byzhanglu.com` 会跳转到 HTTPS。
- `www.byzhanglu.com` 会跳转到根域名并保留路径。
- `https://byzhanglu.com/robots.txt` 允许全站抓取，并指向正式站点地图。
- `https://byzhanglu.com/sitemap.xml` 可正常访问，包含 27 个正式 URL。
- 检查的 28 个 HTML 页面均有页面标题和 Meta description。
- 所有文章图片都有 Alt 文本和明确宽高。
- 检查 674 个站内资源与链接引用，未发现失效内部路径。
- 网站是静态导出，主要正文直接存在于 HTML，不依赖客户端 JavaScript 才能读取。
- 当前构建显示首次加载 JavaScript 约为 103 KB。

## P0｜优先解决

### 1. 测试域名和 Pages 默认域名产生重复站点

以下三个地址当前都可访问，首页 HTML 内容完全一致：

- `https://byzhanglu.com`
- `https://test.byzhanglu.com`
- `https://zhanglu-digital-space-test.pages.dev`

测试域名和 Pages 默认域名的 `robots.txt` 同样允许搜索引擎抓取，而全站没有 canonical。这可能让搜索引擎自行选择主版本、分散链接和收录信号。

建议处理：

1. 将 `test.byzhanglu.com` 301 跳转到 `byzhanglu.com`，或禁止对外公开访问。
2. 能重定向时，将 `pages.dev` 默认域名跳转到正式域名。
3. 全站补充自引用 canonical，并始终指向 `https://byzhanglu.com`。
4. 保留当前 `www` 到根域名的 301 跳转。

### 2. 尚未建立可观察的搜索收录闭环

本次公开搜索抽查没有看到明确的 `byzhanglu.com` 收录结果。代码、正式页面和 DNS TXT 记录中也未发现可见的 Google Search Console 验证信号，同时未发现 Google Analytics 或 Tag Manager。

不能仅根据公开页面绝对确认 Search Console 是否存在，但当前没有可见证据表明已完成配置。

建议处理：

1. 在 Google Search Console 新增 `byzhanglu.com` Domain Property。
2. 通过 Cloudflare DNS TXT 记录完成域名验证。
3. 提交 `https://byzhanglu.com/sitemap.xml`。
4. 使用 URL Inspection 分别检查首页、文章列表、最新文章和项目页。
5. 根据目标读者再决定是否同步配置 Bing Webmaster Tools 和百度搜索资源平台。

## P1｜优化搜索展示与内容理解

### 3. 全站缺少 canonical

- 28 个已检查 HTML 页面中，canonical 数量为 0。
- 带 UTM 查询参数的 URL 会直接返回页面，不会自动去除参数。
- 在多个可访问域名并存时，canonical 的缺失尤其需要优先解决。

### 4. 文章结构化数据缺失

所有页面的 JSON-LD 数量为 0。文章页建议增加 `BlogPosting`，包含以下真实字段：

- `headline`
- `description`
- `image`
- `datePublished`
- `dateModified`
- `author.name`
- `author.url`，指向站内「关于我」
- `mainEntityOfPage`

首页可以增加 `WebSite` 与 `Person`，文章、项目和思绪详情页可以增加 `BreadcrumbList`。

### 5. 社交分享元数据不完整

- 页面已经有 Open Graph title 和 description。
- 28 个页面都没有 `og:image`。
- Twitter Card 当前是无图的 `summary`。
- 文章页的 `og:type` 仍是 `website`，而不是 `article`。

建议让文章使用自己的封面图作为 `og:image`，分享卡片改为大图形式；首页和普通列表页使用站点默认分享图。

### 6. 两篇文章存在两个 H1

当前以下两篇文章同时有页面头部标题 H1 和正文内部 H1：

- 《写给和我走过这三年的人》
- 《离职第5天，我不再逼自己一次选对》

张路之前已确认保留两处可见标题，因此不建议粗暴删除任何一处。可以保留当前视觉，但将正文里的标题调整为非 H1 语义。

### 7. 站内内容连接较弱

- 文章页目前主要只有「返回文章列表」。
- 正文中几乎没有文章与文章、文章与项目之间的上下文链接。
- 新文章中提到「上一篇文章」，但没有直接链接。
- 文章的分类和标签目前只是文本，不能进入对应内容聚合页。
- 暂时没有「相关文章」或「继续阅读」模块。

可以逐步围绕现有真实内容建立三组自然主题：

1. 职业选择与个人成长。
2. AI 实践与独立项目。
3. 策略运营与问题分析。

不为了 SEO 堆叠关键词，仅在真实存在阅读关系时增加链接。

### 8. 新文章 URL 缺少语义

最新两篇文章使用时间戳形式 URL：

- `/blog/2026-09-18-194413-article`
- `/blog/2026-09-23-170322-article`

对已经上线的 URL，不要直接改名。如果要改，必须配套 301 跳转并保留原有入口。从后续新文章开始，可以使用简短、稳定、描述主题的英文 slug。

## P2｜品牌与体验完善

### 9. 站点图标缺失

以下地址当前均返回 404：

- `/favicon.ico`
- `/apple-touch-icon.png`
- `/manifest.webmanifest`

建议增加一套简洁、稳定、符合当前网站气质的站点图标，提高浏览器标签和搜索结果中的品牌识别。

### 10. 个人品牌主题表达偏宽

首页默认标题是「张路的数字空间」，默认描述是「分享我的思考、项目和经历」。「张路」是搜索歧义较强的名字，不适合只竞争姓名词。

后续可以在不编造能力和经历的前提下，在标题或描述中更清楚地表达已有方向：策略运营、AI 应用探索、独立项目实践和持续记录。

### 11. 图片性能仍可持续改善

- 文章图片已使用 WebP，封面体积整体合理。
- 目前 `ArticleImage` 使用 `unoptimized`，页面不会根据屏幕宽度自动输出多尺寸图片。
- 现有图片中最大的一张约为 958 KB，对移动端慢网络可能产生影响。
- Google PageSpeed Insights 接口在本次检查中超时，未得到可靠的 Lighthouse 和 Core Web Vitals 分数，因此不记录猜测性分数。

建议在 Search Console 有数据后优先看真实用户指标，再决定是否引入响应式图片输出或 Cloudflare 图片能力。

## 明天建议的处理顺序

1. 确认 `test.byzhanglu.com` 是继续保留、转为非公开测试，还是直接 301 到正式站。
2. 为全站补充 canonical，并检查正式域名、测试域名和 Pages 默认域名的输出。
3. 配置 Google Search Console Domain Property，完成 DNS 验证并提交 sitemap。
4. 补全文章 Open Graph、Twitter Card 和 `BlogPosting` JSON-LD。
5. 在不改变已确认视觉的前提下修正双 H1。
6. 增加 favicon。
7. 再处理相关文章、站内链接、语义化 slug 和图片性能。

## 实施边界

- 不堆叠关键词，不为 SEO 改写或夸大张路的真实经历。
- 不因为 SEO 直接删除已确认的文章视觉元素。
- 不直接修改已公开的 URL，除非同时设置 301 跳转。
- 涉及 DNS、Cloudflare、域名跳转、提交、推送或上线的操作，仍需要张路当次明确确认。
