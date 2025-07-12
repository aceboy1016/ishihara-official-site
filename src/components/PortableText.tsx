import { PortableText as PT } from '@portabletext/react'

const components = {
  block: {
    h1: ({ children }: any) => <h1 className="text-3xl font-bold mb-6">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-2xl font-bold mb-4 mt-8">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-xl font-bold mb-3 mt-6">{children}</h3>,
    h4: ({ children }: any) => <h4 className="text-lg font-bold mb-2 mt-4">{children}</h4>,
    normal: ({ children }: any) => <p className="mb-4 leading-relaxed">{children}</p>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-blue-600 pl-4 py-2 my-6 bg-gray-50 italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }: any) => <li>{children}</li>,
    number: ({ children }: any) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }: any) => <strong className="font-bold">{children}</strong>,
    em: ({ children }: any) => <em className="italic">{children}</em>,
    link: ({ children, value }: any) => (
      <a 
        href={value.href} 
        className="text-blue-600 hover:text-blue-800 underline"
        target={value.blank ? '_blank' : undefined}
        rel={value.blank ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    ),
  },
}

interface PortableTextProps {
  value: any[]
}

export default function PortableText({ value }: PortableTextProps) {
  return <PT value={value} components={components} />
}