"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "home-intro", label: "开篇" },
  { id: "home-articles-section", label: "文章" },
  { id: "home-projects-section", label: "项目" },
  { id: "home-thoughts-section", label: "思绪" },
];

export function HomeProgress() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const elements = sections
      .map(({ id }) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));
    let animationFrame = 0;

    const updateActiveSection = () => {
      if (animationFrame) return;

      animationFrame = window.requestAnimationFrame(() => {
        const viewportCenter = window.innerHeight / 2;
        let closestIndex = 0;
        let closestDistance = Number.POSITIVE_INFINITY;

        elements.forEach((element, index) => {
          const rect = element.getBoundingClientRect();
          const sectionCenter = rect.top + rect.height / 2;
          const distance = Math.abs(sectionCenter - viewportCenter);

          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
          }
        });

        setActiveIndex(closestIndex);
        animationFrame = 0;
      });
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <nav className="home-progress" aria-label="首页板块进度">
      <p className="home-progress-count" aria-live="polite">
        <span>{String(activeIndex + 1).padStart(2, "0")}</span>
        <span aria-hidden="true"> / </span>
        <span>04</span>
      </p>
      <ol>
        {sections.map((section, index) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              aria-label={`前往${section.label}`}
              aria-current={index === activeIndex ? "step" : undefined}
              title={section.label}
            >
              <span aria-hidden="true" />
            </a>
          </li>
        ))}
      </ol>
      <p className="home-progress-label">{sections[activeIndex].label}</p>
    </nav>
  );
}
