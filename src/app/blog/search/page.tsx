import Link from "next/link";
import { client } from "@/lib/sanity";
import { BlogPost } from "@/types/blog";
import SearchBar from "@/components/SearchBar";

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
  }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = q || '';
  let posts: BlogPost[] = [];
  
  if (query.trim()) {
    try {
      const searchQuery = `
        *[_type == "blogPost" && (
          title match $searchTerm ||
          excerpt match $searchTerm ||
          pt::text(body) match $searchTerm
        )] | order(publishedAt desc) {
          _id,
          title,
          slug,
          excerpt,
          publishedAt,
          mainImage,
          categories[]-> {
            _id,
            title,
            slug
          },
          tags[]-> {
            _id,
            title,
            slug
          }
        }
      `;
      posts = await client.fetch(searchQuery, { 
        searchTerm: `*${query.trim()}*` 
      });
    } catch (error) {
      console.log("Search error:", error);
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-2xl mx-auto mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          記事を検索
        </h1>
        <SearchBar initialQuery={query} />
      </div>

      <div className="mb-8">
        <Link
          href="/blog"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          すべての記事に戻る
        </Link>
      </div>

      {query.trim() ? (
        <>
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900">
              「{query}」の検索結果
            </h2>
            <p className="text-gray-600 mt-1">
              {posts.length}件の記事が見つかりました
            </p>
          </div>

          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article key={post._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  {post.mainImage && (
                    <div className="h-48 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">画像</span>
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.categories?.map((category) => (
                        <Link
                          key={category._id}
                          href={`/blog/category/${category.slug.current}`}
                          className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full hover:bg-blue-200 transition-colors"
                        >
                          {category.title}
                        </Link>
                      ))}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">
                      <Link 
                        href={`/blog/${post.slug.current}`} 
                        className="hover:text-blue-600 transition-colors"
                      >
                        {post.title}
                      </Link>
                    </h3>
                    {post.excerpt && (
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <time dateTime={post.publishedAt}>
                        {new Date(post.publishedAt).toLocaleDateString('ja-JP')}
                      </time>
                      <div className="flex flex-wrap gap-1">
                        {post.tags?.slice(0, 2).map((tag) => (
                          <Link
                            key={tag._id}
                            href={`/blog/tag/${tag.slug.current}`}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            #{tag.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-6">🔍</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                検索結果が見つかりませんでした
              </h3>
              <p className="text-gray-600 mb-6">
                別のキーワードで検索してみてください。
              </p>
              <Link
                href="/blog"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                すべての記事を見る
              </Link>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-6">📝</div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            検索キーワードを入力してください
          </h3>
          <p className="text-gray-600">
            記事のタイトル、概要、本文から検索できます。
          </p>
        </div>
      )}
    </div>
  );
}