import Link from "next/link";
import { notFound } from "next/navigation";
import { client } from "@/lib/sanity";
import { BlogPost, Category } from "@/types/blog";

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export async function generateStaticParams() {
  return []
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params;
  let posts: BlogPost[] = [];
  let category: Category | null = null;
  
  try {
    const categoryQuery = `*[_type == "category" && slug.current == $categorySlug][0]`;
    category = await client.fetch(categoryQuery, { categorySlug });
    
    if (category) {
      const postsQuery = `
        *[_type == "blogPost" && references($categoryId)] | order(publishedAt desc) {
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
      posts = await client.fetch(postsQuery, { categoryId: category._id });
    }
  } catch (error) {
    console.log("Sanity fetch error:", error);
  }

  if (!category) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <div className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full mb-4">
          カテゴリー
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {category.title}
        </h1>
        {category.description && (
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {category.description}
          </p>
        )}
        <p className="text-gray-500 mt-2">
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
                  {post.categories?.map((cat) => (
                    <Link
                      key={cat._id}
                      href={`/blog/category/${cat.slug.current}`}
                      className={`inline-block text-xs px-2 py-1 rounded-full transition-colors ${
                        cat._id === category._id
                          ? 'bg-blue-600 text-white'
                          : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                      }`}
                    >
                      {cat.title}
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
            このカテゴリーにはまだ記事がありません
          </h2>
          <p className="text-gray-600">
            他のカテゴリーの記事をご覧になるか、しばらくお待ちください。
          </p>
        </div>
      )}
    </div>
  );
}