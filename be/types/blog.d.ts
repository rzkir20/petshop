type BlogPostStatus = "published" | "draft";

type AuthorBlog = {
  name: string;
  pictures: string;
};

interface Blog {
  _id: string;
  title: string;
  slug: string;
  thumbnail: string;
  description: string;
  content: string;
  status: BlogPostStatus;
  /** Slug from populated `blog_categories` ref. */
  category: string;
  /** Present when category ref is populated. */
  categoryName?: string;
  author: AuthorBlog;
  createdAt: Date;
  updatedAt: Date;
}

type CreateBlogInput = {
  title: string;
  slug: string;
  thumbnail: string;
  description: string;
  content: string;
  status?: BlogPostStatus;
  /** Slug of an **active** row in `blog_categories` (stored as ObjectId ref on the post). */
  category: string;
  author: AuthorBlog;
};

type UpdateBlogInput = {
  title?: string;
  slug?: string;
  thumbnail?: string;
  description?: string;
  content?: string;
  status?: BlogPostStatus;
  category?: string;
  author?: AuthorBlog;
};
