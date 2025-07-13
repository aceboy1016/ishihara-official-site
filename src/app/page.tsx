import Link from "next/link";
import { client, blogPostsQuery } from "@/lib/sanity";
import { BlogPost } from "@/types/blog";

export default async function Home() {
  let latestPosts: BlogPost[] = [];
  
  // Sanity CMSが設定されていない場合はスキップ
  if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== 'demo-project') {
    try {
      latestPosts = await client.fetch(blogPostsQuery + " [0...2]");
    } catch (error) {
      console.log("Sanity fetch error:", error);
    }
  }

  return (
    <div className="bg-white">
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                イシハラ
              </h1>
              <p className="text-xl sm:text-2xl mb-8 text-blue-100">
                ビジネス・投資・ライフスタイルを<br />
                自由に語るブログメディア
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/blog"
                  className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                >
                  ブログを読む
                </Link>
                <Link
                  href="/profile"
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                >
                  プロフィール
                </Link>
              </div>
            </div>
            <div className="flex-shrink-0">
              <div className="w-64 h-64 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-6xl">📝</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              自己紹介
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              元々はサラリーマンでしたが、ブログやYouTubeを通じて情報発信を始め、
              現在は独立して様々なビジネスに携わっています。
              投資やライフスタイルについても積極的に発信中です。
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-4xl mb-4">💼</div>
              <h3 className="text-xl font-semibold mb-2">ビジネス</h3>
              <p className="text-gray-600">
                起業・副業・マーケティングについて実体験を元に発信
              </p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-semibold mb-2">投資</h3>
              <p className="text-gray-600">
                株式投資・仮想通貨・NFTなど幅広い投資情報をシェア
              </p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-4xl mb-4">🌱</div>
              <h3 className="text-xl font-semibold mb-2">ライフスタイル</h3>
              <p className="text-gray-600">
                田舎暮らし・健康・家族との時間を大切にした生き方
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              最新ブログ記事
            </h2>
            <p className="text-xl text-gray-600">
              最新の投稿をチェックしてみてください
            </p>
          </div>
          
          {latestPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {latestPosts.map((post) => (
                <article key={post._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  {post.mainImage && (
                    <div className="h-48 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">画像</span>
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">
                      <Link href={`/blog/${post.slug.current}`} className="hover:text-blue-600">
                        {post.title}
                      </Link>
                    </h3>
                    {post.excerpt && (
                      <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    )}
                    <div className="text-sm text-gray-500">
                      {new Date(post.publishedAt).toLocaleDateString('ja-JP')}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">
                まだブログ記事がありません。Sanity CMSをセットアップしてコンテンツを追加してください。
              </p>
            </div>
          )}
          
          <div className="text-center">
            <Link
              href="/blog"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              全ての記事を見る
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
