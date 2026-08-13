export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] mt-auto">
      <div className="max-w-3xl mx-auto px-6 py-8">
        <p className="text-sm text-[var(--color-text-secondary)] text-center">
          &copy; {new Date().getFullYear()} 张璐. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
