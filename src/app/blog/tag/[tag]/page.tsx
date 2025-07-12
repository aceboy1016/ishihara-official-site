import Link from "next/link";
import { notFound } from "next/navigation";
import { client } from "@/lib/sanity";
import { BlogPost, Tag } from "@/types/blog";

interface TagPageProps {
  params: Promise<{
    tag: string;
  }>;
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag: tagSlug } = await params;
  let posts: BlogPost[] = [];
  let tag: Tag | null = null;
  
  try {
    const tagQuery = `*[_type == "tag" && slug.current == $tagSlug][0]`;
    tag = await client.fetch(tagQuery, { tagSlug });
    
    if (tag) {
      const postsQuery = `
        *[_type == "blogPost" && references($tagId)] | order(publishedAt desc) {
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
      posts = await client.fetch(postsQuery, { tagId: tag._id });
    }
  } catch (error) {
    console.log("Sanity fetch error:", error);
  }

  if (!tag) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <div className="inline-block bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full mb-4">
          タグ
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          #{tag.title}
        </h1>
        <p className="text-gray-500">
          {posts.length}件の記事
        </p>
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
                    {post.tags?.slice(0, 2).map((postTag) => (
                      <Link
                        key={postTag._id}
                        href={`/blog/tag/${postTag.slug.current}`}
                        className={`transition-colors ${
                          postTag._id === tag._id
                            ? 'text-blue-600 font-semibold'
                            : 'text-gray-400 hover:text-gray-600'
                        }`}
                      >
                        #{postTag.title}
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
          <div className="text-6xl mb-6">🏷️</div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            このタグの記事はまだありません
          </h2>
          <p className="text-gray-600">
            他のタグの記事をご覧になるか、しばらくお待ちください。
          </p>
        </div>
      )}
    </div>
  );
}