import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";

// Custom components for MDX
const components = {
  // Callout component
  Callout: ({
    type = "info",
    children,
  }: {
    type?: "info" | "warning" | "error" | "tip";
    children: React.ReactNode;
  }) => {
    const styles = {
      info: "border-[var(--color-primary-400)] bg-[var(--color-primary-50)]",
      warning: "border-yellow-400 bg-yellow-50",
      error: "border-red-400 bg-red-50",
      tip: "border-green-400 bg-green-50",
    };
    const icons = { info: "ℹ️", warning: "⚠️", error: "❌", tip: "💡" };

    return (
      <div
        className={`border-l-4 p-4 rounded-r-lg my-6 ${styles[type]}`}
        style={{ marginTop: "1.5em", marginBottom: "1.5em" }}
      >
        <span className="mr-2">{icons[type]}</span>
        {children}
      </div>
    );
  },
};

interface MDXContentProps {
  source: string;
}

export function MDXContent({ source }: MDXContentProps) {
  return (
    <div className="prose">
      <MDXRemote
        source={source}
        components={components}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [rehypeSlug, rehypeHighlight],
          },
        }}
      />
    </div>
  );
}
