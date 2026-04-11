type BlogPostStatus = 'published' | 'draft'

type AuthorBlog = {
    name: string
    pictures: string
}

/** Bentuk respons API (`Blog.toPublic` di backend). */
type BlogPost = {
    _id: string
    title: string
    slug: string
    thumbnail: string
    description: string
    content: string
    status: BlogPostStatus
    /** Slug kategori blog (dari `blog_categories`). */
    category: string
    categoryName?: string
    author: AuthorBlog
    createdAt: string
    updatedAt: string
}

type CreateBlogPostInput = {
    title: string
    slug: string
    thumbnail?: string
    description?: string
    content: string
    status?: BlogPostStatus
    /** Slug kategori yang aktif di `blog_categories`. */
    category: string
    author: AuthorBlog
}

type UpdateBlogPostInput = {
    title?: string
    slug?: string
    thumbnail?: string
    description?: string
    content?: string
    status?: BlogPostStatus
    category?: string
    author?: AuthorBlog
}
