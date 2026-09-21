"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "首页" },
  { href: "/blog", label: "文章" },
  { href: "/projects", label: "项目" },
  { href: "/thoughts", label: "思绪" },
  { href: "/about", label: "关于我" },
];

export function Header() {
  const pathname = usePathname();
  return (
    <header className="border-b border-[var(--color-border)]">
      <nav className="site-nav" aria-label="主导航">
        <Link
          href="/"
          className="site-brand"
        >
          张路
        </Link>
        <ul className="site-nav-items">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={(item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)) ? "page" : undefined}
                className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary-600)] transition-colors"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
