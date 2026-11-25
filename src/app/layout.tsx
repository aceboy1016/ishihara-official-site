import type { Metadata, Viewport } from 'next'
import { Inter, Outfit, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Cursor from '@/components/motion/Cursor'
import { site } from '@/config'

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' })
const outfit = Outfit({ subsets: ['latin'], display: 'swap', variable: '--font-outfit' })
const mono = JetBrains_Mono({ subsets: ['latin'], display: 'swap', variable: '--font-mono' })

const description =
  'パーソナルトレーナー石原淳哉の公式サイト。トレーニングの現場から、AIで「続けたくなる」をつくる。トレーナー向け記録サービス「VOICEカルテ」の開発を担当（試験運用中）。'

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: '石原淳哉 | Trainer × AI', template: '%s | 石原淳哉' },
  description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    siteName: '石原淳哉 Official',
    title: '石原淳哉 | Trainer × AI',
    description,
    images: [{ url: '/junya-portrait.jpg', alt: '石原淳哉' }],
  },
  twitter: { card: 'summary_large_image', title: '石原淳哉 | Trainer × AI', description, images: ['/junya-portrait.jpg'] },
}

export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#F5F9FC' }

const personLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: '石原 淳哉',
  alternateName: 'Junya Ishihara',
  url: site.url,
  image: `${site.url}/junya-portrait.jpg`,
  jobTitle: 'パーソナルトレーナー / 開発',
  sameAs: [site.trainerSite],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" suppressHydrationWarning className={`${inter.variable} ${outfit.variable} ${mono.variable}`}>
      <head>
        {/* 描画前に実行：アニメーション対象のチラつき防止 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var d=document.documentElement;d.classList.add('js');if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)d.classList.add('motion-off')})()`,
          }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd).replace(/</g, '\\u003c') }} />
      </head>
      <body className="font-sans antialiased">
        <Cursor />
        {children}
      </body>
    </html>
  )
}
