import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/components/providers/auth-provider";
import { CartProvider } from "@/components/providers/cart-provider";

import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  metadataBase: new URL('https://doris-ai-academy.com'),
  title: {
    default: "Doris AI 學院 - 用 AI 和科技 解決問題",
    template: "%s | Doris AI 學院"
  },
  description: "專業 AI 實戰教學，提供 Vibe Coding、Prompt Engineering 等尖端科技課程，協助您將想法轉化為產品。",
  keywords: ["AI 課程", "AI 教學", "Vibe Coding", "Doris AI", "人工智慧實務", "科技學習"],
  authors: [{ name: "Doris" }],
  creator: "Doris",
  publisher: "Doris AI 學院",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'zh_TW',
    url: 'https://doris-ai-academy.com',
    siteName: 'Doris AI 學院',
    title: 'Doris AI 學院 - 用 AI 和科技 解決問題',
    description: '專業 AI 實戰教學，提供 Vibe Coding、Prompt Engineering 等尖端科技課程。',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Doris AI 學院',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Doris AI 學院',
    description: '專業 AI 實戰教學，提供 Vibe Coding 等尖端科技課程。',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-Hant" className={inter.variable}>
      <body className="min-h-screen font-sans antialiased">
        <AuthProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
