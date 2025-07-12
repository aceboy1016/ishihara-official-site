'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm border-b">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              イシハラ
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                href="/"
                className="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                ホーム
              </Link>
              <Link
                href="/blog"
                className="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                ブログ
              </Link>
              <Link
                href="/profile"
                className="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                プロフィール
              </Link>
              <Link
                href="/contact"
                className="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                お問い合わせ
              </Link>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-900 hover:text-blue-600 focus:outline-none focus:text-blue-600"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                href="/"
                className="text-gray-900 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
              >
                ホーム
              </Link>
              <Link
                href="/blog"
                className="text-gray-900 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
              >
                ブログ
              </Link>
              <Link
                href="/profile"
                className="text-gray-900 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
              >
                プロフィール
              </Link>
              <Link
                href="/contact"
                className="text-gray-900 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
              >
                お問い合わせ
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}