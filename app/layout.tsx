import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Doris AI學院",
  description: "用 AI 和科技 解決問題的課程銷售平台",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-Hant" className={inter.variable}>
      <body className="min-h-screen font-sans antialiased">
        <div className="bg-shapes">
          <div className="shape-3"></div>
        </div>
        {children}
      </body>
    </html>
  );
}
