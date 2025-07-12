export interface BlogPost {
  _id: string
  title: string
  slug: {
    current: string
  }
  excerpt?: string
  publishedAt: string
  updatedAt?: string
  mainImage?: {
    asset: {
      _ref: string
    }
    alt?: string
  }
  body?: unknown[]
  categories?: Category[]
  tags?: Tag[]
}

export interface Category {
  _id: string
  title: string
  slug: {
    current: string
  }
  description?: string
}

export interface Tag {
  _id: string
  title: string
  slug: {
    current: string
  }
}