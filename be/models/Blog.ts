import {
  InferSchemaType,
  Model,
  model,
  models,
  Schema,
  Types,
} from "mongoose";

const authorSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    pictures: { type: String, trim: true, default: "" },
  },
  { _id: false },
);

const blogSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    thumbnail: { type: String, trim: true, default: "" },
    description: { type: String, trim: true, default: "" },
    content: { type: String, trim: true, default: "" },
    status: {
      type: String,
      enum: ["published", "draft"] satisfies BlogPostStatus[],
      default: "draft",
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "BlogCategory",
      required: true,
    },
    author: { type: authorSchema, required: true },
  },
  { timestamps: true, collection: "blogs" },
);

type BlogDocument = InferSchemaType<typeof blogSchema> & {
  _id?: Types.ObjectId;
};

const BlogModel =
  (models.Blog as Model<InferSchemaType<typeof blogSchema>>) ||
  model("Blog", blogSchema);

const CATEGORY_POPULATE_SELECT = "slug name status";

function normalizeSlug(slug: string): string {
  return String(slug || "")
    .trim()
    .toLowerCase();
}

export type BlogUpdateFields = {
  title?: string;
  slug?: string;
  thumbnail?: string;
  description?: string;
  content?: string;
  status?: BlogPostStatus;
  category?: Types.ObjectId;
  author?: AuthorBlog;
};

export async function ensureIndexes(): Promise<void> {
  await BlogModel.syncIndexes();
}

export type { BlogDocument };

export async function listBlogs(filters?: {
  categoryId?: string;
  status?: BlogPostStatus;
}): Promise<BlogDocument[]> {
  const q: Record<string, unknown> = {};
  if (filters?.categoryId && Types.ObjectId.isValid(filters.categoryId)) {
    q.category = new Types.ObjectId(filters.categoryId);
  }
  if (filters?.status === "published" || filters?.status === "draft") {
    q.status = filters.status;
  }
  const docs = await BlogModel.find(q)
    .populate("category", CATEGORY_POPULATE_SELECT)
    .sort({ updatedAt: -1 })
    .lean();
  return docs as BlogDocument[];
}

export async function findById(id: string): Promise<BlogDocument | null> {
  if (!Types.ObjectId.isValid(id)) return null;
  const doc = await BlogModel.findById(id)
    .populate("category", CATEGORY_POPULATE_SELECT)
    .lean();
  return doc as BlogDocument | null;
}

export async function findBySlug(slug: string): Promise<BlogDocument | null> {
  const doc = await BlogModel.findOne({ slug: normalizeSlug(slug) })
    .populate("category", CATEGORY_POPULATE_SELECT)
    .lean();
  return doc as BlogDocument | null;
}

export async function createBlog(data: {
  title: string;
  slug: string;
  thumbnail: string;
  description: string;
  content: string;
  status?: BlogPostStatus;
  category: Types.ObjectId;
  author: AuthorBlog;
}): Promise<BlogDocument> {
  const created = await BlogModel.create({
    title: String(data.title || "").trim(),
    slug: normalizeSlug(data.slug),
    thumbnail: String(data.thumbnail ?? "").trim(),
    description: String(data.description ?? "").trim(),
    content: String(data.content ?? "").trim(),
    status: data.status === "published" ? "published" : "draft",
    category: data.category,
    author: {
      name: String(data.author?.name || "").trim(),
      pictures: String(data.author?.pictures ?? "").trim(),
    },
  });
  const populated = await BlogModel.findById(created._id)
    .populate("category", CATEGORY_POPULATE_SELECT)
    .lean();
  return populated as BlogDocument;
}

export async function updateBlog(
  id: string,
  input: BlogUpdateFields,
): Promise<BlogDocument | null> {
  if (!Types.ObjectId.isValid(id)) return null;

  const $set: Record<string, unknown> = {};

  if (input.title !== undefined) {
    $set.title = String(input.title || "").trim();
  }
  if (input.slug !== undefined) {
    $set.slug = normalizeSlug(input.slug);
  }
  if (input.thumbnail !== undefined) {
    $set.thumbnail = String(input.thumbnail).trim();
  }
  if (input.description !== undefined) {
    $set.description = String(input.description).trim();
  }
  if (input.content !== undefined) {
    $set.content = String(input.content).trim();
  }
  if (input.status !== undefined) {
    $set.status = input.status === "published" ? "published" : "draft";
  }
  if (input.category !== undefined) {
    $set.category = input.category;
  }
  if (input.author !== undefined) {
    $set.author = {
      name: String(input.author.name || "").trim(),
      pictures: String(input.author.pictures ?? "").trim(),
    };
  }

  if (Object.keys($set).length === 0) {
    return findById(id);
  }

  await BlogModel.findByIdAndUpdate(id, { $set }, { runValidators: true });

  return findById(id);
}

export async function deleteBlog(id: string): Promise<boolean> {
  if (!Types.ObjectId.isValid(id)) return false;
  const result = await BlogModel.findByIdAndDelete(id);
  return result !== null;
}

type LeanCategoryRef = { slug?: string; name?: string };

export function toPublic(doc: BlogDocument | null) {
  if (!doc) return null;

  const rawCat = doc.category as unknown;
  let categorySlug = "";
  let categoryName: string | undefined;
  if (rawCat && typeof rawCat === "object" && !(rawCat instanceof Types.ObjectId)) {
    const c = rawCat as LeanCategoryRef;
    categorySlug = String(c.slug ?? "");
    if (c.name != null) categoryName = String(c.name);
  }

  return {
    _id: String(doc._id || ""),
    title: doc.title,
    slug: doc.slug,
    thumbnail: doc.thumbnail,
    description: doc.description,
    content: doc.content,
    status: doc.status as BlogPostStatus,
    category: categorySlug,
    ...(categoryName !== undefined ? { categoryName } : {}),
    author: {
      name: doc.author.name,
      pictures: doc.author.pictures,
    },
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
}
