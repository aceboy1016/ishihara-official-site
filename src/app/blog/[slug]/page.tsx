import Link from "next/link";
import { notFound } from "next/navigation";
import { client, blogPostQuery } from "@/lib/sanity";
import { BlogPost } from "@/types/blog";
import PortableText from "@/components/PortableText";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return []
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  let post: BlogPost | null = null;
  
  try {
    post = await client.fetch(blogPostQuery, { slug });
  } catch (error) {
    console.log("Sanity fetch error:", error);
  }

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <article>
        <header className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.categories?.map((category) => (
              <Link
                key={category._id}
                href={`/blog/category/${category.slug.current}`}
                className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full hover:bg-blue-200 transition-colors"
              >
                {category.title}
              </Link>
            ))}
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-gray-600 mb-6">
            <div className="flex items-center space-x-4">
              <time dateTime={post.publishedAt}>
                公開日: {new Date(post.publishedAt).toLocaleDateString('ja-JP')}
              </time>
              {post.updatedAt && (
                <time dateTime={post.updatedAt}>
                  更新日: {new Date(post.updatedAt).toLocaleDateString('ja-JP')}
                </time>
              )}
            </div>
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
                {post.tags.map((tag) => (
                  <Link
                    key={tag._id}
                    href={`/blog/tag/${tag.slug.current}`}
                    className="text-gray-500 hover:text-gray-700 transition-colors text-sm"
                  >
                    #{tag.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
          
          {post.mainImage && (
            <div className="mb-8">
              <div className="h-64 sm:h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">メイン画像</span>
              </div>
            </div>
          )}
          
          {post.excerpt && (
            <div className="bg-gray-50 border-l-4 border-blue-600 p-4 mb-8">
              <p className="text-lg text-gray-700 italic">{post.excerpt}</p>
            </div>
          )}
        </header>

        <div className="prose prose-lg max-w-none">
          {post.body ? (
            <PortableText value={post.body} />
          ) : (
            <p className="text-gray-600">この記事にはコンテンツがありません。</p>
          )}
        </div>
        
        <footer className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <Link
              href="/blog"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              記事一覧に戻る
            </Link>
            
            <div className="flex space-x-4">
              <button
                onClick={() => {
                  const url = window.location.href;
                  const text = post.title;
                  window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
                }}
                className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
                Twitterでシェア
              </button>
            </div>
          </div>
        </footer>
      </article>
    </div>
  );
}