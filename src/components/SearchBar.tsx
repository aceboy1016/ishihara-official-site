'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface SearchBarProps {
  initialQuery?: string
  onSearch?: (query: string) => void
}

export default function SearchBar({ initialQuery = '', onSearch }: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      if (onSearch) {
        onSearch(query.trim())
      } else {
        router.push(`/blog/search?q=${encodeURIComponent(query.trim())}`)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="記事を検索..."
          className="w-full px-4 py-2 pl-10 pr-4 text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <button
          type="submit"
          className="absolute inset-y-0 right-0 flex items-center pr-3"
        >
          <span className="sr-only">検索</span>
          <svg
            className="w-5 h-5 text-gray-600 hover:text-blue-600 transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5-5 5M6 12h12"
            />
          </svg>
        </button>
      </div>
    </form>
  )
}