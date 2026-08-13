import Link from "next/link";

const navItems = [
  { href: "/", label: "首页" },
  { href: "/about", label: "关于我" },
  { href: "/blog", label: "文章" },
  { href: "/projects", label: "项目" },
];

export function Header() {
  return (
    <header className="border-b border-[var(--color-border)]">
      <nav className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-lg font-semibold text-[var(--color-text-primary)] hover:text-[var(--color-primary-600)] transition-colors"
        >
          张璐
        </Link>
        <ul className="flex items-center gap-6">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
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
