const DEFAULT_SITE_URL = "https://byzhanglu.com";

function normalizeSiteUrl(url: string) {
  return url.replace(/\/$/, "");
}

export const siteConfig = {
  name: "张路的数字空间",
  description: "张路的个人数字空间 - 分享我的思考、项目和经历",
  url: normalizeSiteUrl(
    process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL
  ),
};
