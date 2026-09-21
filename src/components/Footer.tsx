import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] mt-auto">
      <div className="site-footer-inner">
        <p className="site-footer-tagline">{profile.tagline}</p>
        <p className="text-[var(--color-text-secondary)]">
          &copy; {new Date().getFullYear()} 张路. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
