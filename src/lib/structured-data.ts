import { BlogPost } from '@/types/blog'

export function generateWebsiteStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'イシハラ公式サイト',
    description: 'イシハラの公式サイト兼ブログ。ビジネス・投資・ライフスタイルについて発信しています。',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://ishihara-official.vercel.app',
    author: {
      '@type': 'Person',
      name: 'イシハラ',
      url: process.env.NEXT_PUBLIC_SITE_URL || 'https://ishihara-official.vercel.app',
    },
    sameAs: [
      'https://twitter.com/Ishihara',
      'https://www.instagram.com/ishihara/',
      'https://www.youtube.com/channel/UCt5BXQL8S5xhbU0Gfq8gEZQ',
    ],
  }
}

export function generateBlogStructuredData(post: BlogPost) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ishihara-official.vercel.app'
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt || '',
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      '@type': 'Person',
      name: 'イシハラ',
      url: siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'イシハラ公式サイト',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/blog/${post.slug.current}`,
    },
    url: `${siteUrl}/blog/${post.slug.current}`,
    image: post.mainImage ? `${siteUrl}/api/og?title=${encodeURIComponent(post.title)}` : undefined,
    keywords: post.tags?.map(tag => tag.title).join(', '),
    articleSection: post.categories?.map(cat => cat.title).join(', '),
  }
}

export function generatePersonStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'イシハラ',
    jobTitle: 'ブロガー・起業家',
    description: 'ビジネス・投資・ライフスタイルについて発信するブロガー・起業家',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://ishihara-official.vercel.app',
    sameAs: [
      'https://twitter.com/Ishihara',
      'https://www.instagram.com/ishihara/',
      'https://www.youtube.com/channel/UCt5BXQL8S5xhbU0Gfq8gEZQ',
    ],
    knowsAbout: ['ビジネス', '投資', 'ライフスタイル', 'ブログ', 'マーケティング'],
  }
}