import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { generateMetadata as generateSEOMetadata } from "@/lib/metadata";
import { generateWebsiteStructuredData } from "@/lib/structured-data";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = generateSEOMetadata({
  title: "イシハラ公式サイト",
  description: "イシハラの公式サイト兼ブログ。ビジネス・投資・ライフスタイルについて発信しています。"
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const websiteStructuredData = generateWebsiteStructuredData();

  return (
    <html lang="ja">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteStructuredData),
          }}
        />
      </head>
      <body className={`${notoSansJP.className} antialiased`}>
        <GoogleAnalytics />
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
