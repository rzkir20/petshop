import {
  InferSchemaType,
  Model,
  model,
  models,
  Schema,
  Types,
} from "mongoose";

import type { BlogCategoryStatus } from "../types/blog-categories";

const blogCategorySchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"] satisfies BlogCategoryStatus[],
      default: "active",
    },
  },
  { timestamps: true, collection: "blog_categories" },
);

type BlogCategoryDocument = InferSchemaType<typeof blogCategorySchema> & {
  _id?: Types.ObjectId;
};

const BlogCategoryModel =
  (models.BlogCategory as Model<InferSchemaType<typeof blogCategorySchema>>) ||
  model("BlogCategory", blogCategorySchema);

export type CreateBlogCategoryInput = {
  name: string;
  slug: string;
  status?: BlogCategoryStatus;
};

export type UpdateBlogCategoryInput = {
  name?: string;
  slug?: string;
  status?: BlogCategoryStatus;
};

function normalizeSlug(slug: string): string {
  return String(slug || "")
    .trim()
    .toLowerCase();
}

export async function ensureIndexes(): Promise<void> {
  await BlogCategoryModel.syncIndexes();
}

export async function listBlogCategories(): Promise<BlogCategoryDocument[]> {
  const docs = await BlogCategoryModel.find().sort({ updatedAt: -1 }).lean();
  return docs as BlogCategoryDocument[];
}

export async function findById(
  id: string,
): Promise<BlogCategoryDocument | null> {
  if (!Types.ObjectId.isValid(id)) return null;
  const doc = await BlogCategoryModel.findById(id).lean();
  return doc as BlogCategoryDocument | null;
}

export async function findBySlug(
  slug: string,
): Promise<BlogCategoryDocument | null> {
  const doc = await BlogCategoryModel.findOne({
    slug: normalizeSlug(slug),
  }).lean();
  return doc as BlogCategoryDocument | null;
}

export async function createBlogCategory(
  input: CreateBlogCategoryInput,
): Promise<BlogCategoryDocument> {
  const created = await BlogCategoryModel.create({
    name: String(input.name || "").trim(),
    slug: normalizeSlug(input.slug),
    status: input.status === "inactive" ? "inactive" : "active",
  });
  return created.toObject() as BlogCategoryDocument;
}

export async function updateBlogCategory(
  id: string,
  input: UpdateBlogCategoryInput,
): Promise<BlogCategoryDocument | null> {
  if (!Types.ObjectId.isValid(id)) return null;

  const $set: Record<string, unknown> = {};
  if (input.name !== undefined) {
    $set.name = String(input.name || "").trim();
  }
  if (input.slug !== undefined) {
    $set.slug = normalizeSlug(input.slug);
  }
  if (input.status !== undefined) {
    $set.status = input.status === "inactive" ? "inactive" : "active";
  }

  if (Object.keys($set).length === 0) {
    return findById(id);
  }

  const updated = await BlogCategoryModel.findByIdAndUpdate(
    id,
    { $set },
    { new: true, runValidators: true },
  ).lean();

  return updated as BlogCategoryDocument | null;
}

export async function deleteBlogCategory(id: string): Promise<boolean> {
  if (!Types.ObjectId.isValid(id)) return false;
  const result = await BlogCategoryModel.findByIdAndDelete(id);
  return result !== null;
}

export function toPublic(category: BlogCategoryDocument | null) {
  if (!category) return null;
  return {
    _id: String(category._id || ""),
    name: category.name,
    slug: category.slug,
    status: category.status as BlogCategoryStatus,
    createdAt: category.createdAt,
    updatedAt: category.updatedAt,
  };
}
