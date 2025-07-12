import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">イシハラ</h3>
            <p className="text-gray-300 text-sm">
              ビジネス・投資・ライフスタイルについて発信しています。
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">サイトマップ</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  ホーム
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-white transition-colors">
                  ブログ
                </Link>
              </li>
              <li>
                <Link href="/profile" className="text-gray-300 hover:text-white transition-colors">
                  プロフィール
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  お問い合わせ
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">SNS</h4>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com/Ishihara"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/ishihara/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-2.508 0-4.54-2.033-4.54-4.54s2.032-4.54 4.54-4.54c2.508 0 4.54 2.032 4.54 4.54s-2.032 4.54-4.54 4.54zm7.119 0c-2.508 0-4.54-2.033-4.54-4.54s2.032-4.54 4.54-4.54c2.508 0 4.54 2.032 4.54 4.54s-2.032 4.54-4.54 4.54z"/>
                </svg>
              </a>
              <a
                href="https://www.youtube.com/channel/UCt5BXQL8S5xhbU0Gfq8gEZQ"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-300 text-sm">
            © 2024 イシハラ. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}