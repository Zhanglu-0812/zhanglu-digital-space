import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-32 text-center">
      <h1 className="text-6xl font-bold text-[var(--color-primary-600)] mb-4">
        404
      </h1>
      <p className="text-lg text-[var(--color-text-secondary)] mb-8">
        页面不存在
      </p>
      <Link
        href="/"
        className="text-sm text-[var(--color-primary-600)] hover:text-[var(--color-primary-700)] transition-colors underline underline-offset-4"
      >
        返回首页
      </Link>
    </div>
  );
}
