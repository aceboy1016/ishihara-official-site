import { Metadata } from 'next'

export function generateMetadata({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
}: {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  url?: string
  type?: 'website' | 'article'
}): Metadata {
  const siteTitle = 'イシハラ公式サイト'
  const siteDescription = 'イシハラの公式サイト兼ブログ。ビジネス・投資・ライフスタイルについて発信しています。'
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ishihara-official.vercel.app'
  
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle
  const fullDescription = description || siteDescription
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl
  const fullImage = image ? `${siteUrl}${image}` : `${siteUrl}/og-image.jpg`

  return {
    title: fullTitle,
    description: fullDescription,
    keywords: keywords?.join(', '),
    openGraph: {
      title: fullTitle,
      description: fullDescription,
      url: fullUrl,
      siteName: siteTitle,
      images: [
        {
          url: fullImage,
          width: 1200,
          height: 630,
          alt: title || siteTitle,
        },
      ],
      locale: 'ja_JP',
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: fullDescription,
      images: [fullImage],
      creator: '@Ishihara',
    },
    alternates: {
      canonical: fullUrl,
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
  }
}