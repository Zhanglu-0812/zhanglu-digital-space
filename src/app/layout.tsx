import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "张璐的数字空间",
    template: "%s | 张璐的数字空间",
  },
  description: "张璐的个人数字空间 - 分享我的思考、项目和经历",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://zhanglu.dev"
  ),
  openGraph: {
    type: "website",
    locale: "zh_CN",
    siteName: "张璐的数字空间",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
