import Link from "next/link";
import { client, blogPostsQuery } from "@/lib/sanity";
import { BlogPost } from "@/types/blog";
import SearchBar from "@/components/SearchBar";

export default async function BlogPage() {
  let posts: BlogPost[] = [];
  
  try {
    posts = await client.fetch(blogPostsQuery);
  } catch (error) {
    console.log("Sanity fetch error:", error);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          ブログ記事一覧
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          最新の投稿から過去の記事まで、すべてのコンテンツをお楽しみください
        </p>
        <div className="max-w-md mx-auto">
          <SearchBar />
        </div>
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
                <h2 className="text-xl font-semibold mb-3">
                  <Link 
                    href={`/blog/${post.slug.current}`} 
                    className="hover:text-blue-600 transition-colors"
                  >
                    {post.title}
                  </Link>
                </h2>
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
          <div className="text-6xl mb-6">📝</div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            まだ記事がありません
          </h2>
          <p className="text-gray-600 mb-8">
            Sanity CMSをセットアップして、最初の記事を投稿してみましょう。
          </p>
          <a
            href="https://www.sanity.io/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Sanity ドキュメントを見る
          </a>
        </div>
      )}
    </div>
  );
}