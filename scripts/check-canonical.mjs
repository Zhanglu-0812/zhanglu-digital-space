import { readFileSync, readdirSync } from "node:fs";
import { join, relative } from "node:path";

const outputDir = join(process.cwd(), "out");
const sitemap = readFileSync(join(outputDir, "sitemap.xml"), "utf8");
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) =>
  match[1].replaceAll("&amp;", "&")
);
const officialOrigin = "https://byzhanglu.com";
const expectedByPath = new Map(
  sitemapUrls.map((url) => [new URL(url).pathname.replace(/\/$/, "") || "/", url])
);

function htmlFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? htmlFiles(path) : path.endsWith(".html") ? [path] : [];
  });
}

const errors = [];
const checkedPaths = new Set();

for (const url of sitemapUrls) {
  if (new URL(url).origin !== officialOrigin) {
    errors.push(`sitemap URL uses a non-official origin: ${url}`);
  }
}

for (const file of htmlFiles(outputDir)) {
  const name = relative(outputDir, file).replaceAll("\\", "/");
  if (name === "404.html") continue;

  const path = name === "index.html" ? "/" : `/${name.replace(/\.html$/, "")}`;
  const expected = expectedByPath.get(path);
  const html = readFileSync(file, "utf8");
  const canonicalLinks = [...html.matchAll(/<link\b[^>]*>/g)]
    .map(([tag]) => tag)
    .filter((tag) => /\brel=["']canonical["']/.test(tag));

  if (!expected) errors.push(`${path}: not listed in sitemap.xml`);
  if (canonicalLinks.length !== 1) {
    errors.push(`${path}: expected one canonical link, found ${canonicalLinks.length}`);
    continue;
  }

  const href = canonicalLinks[0].match(/\bhref=["']([^"']+)["']/)?.[1];
  if (!href || !expected || new URL(href).href !== new URL(expected).href) {
    errors.push(`${path}: canonical ${href ?? "missing href"} differs from sitemap ${expected ?? "missing"}`);
  }
  checkedPaths.add(path);
}

for (const path of expectedByPath.keys()) {
  if (!checkedPaths.has(path)) errors.push(`${path}: sitemap URL has no exported HTML page`);
}

if (errors.length) {
  console.error(`Canonical check failed:\n${errors.join("\n")}`);
  process.exitCode = 1;
} else {
  console.log(`Canonical check passed for ${checkedPaths.size} pages.`);
}
