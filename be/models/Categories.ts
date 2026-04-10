import {
  InferSchemaType,
  Model,
  model,
  models,
  Schema,
  Types,
} from "mongoose";

import type { CategoryStatus } from "../types/categories";

const categorySchema = new Schema(
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
      enum: ["active", "inactive"] satisfies CategoryStatus[],
      default: "active",
    },
  },
  { timestamps: true, collection: "categories" },
);

type CategoryDocument = InferSchemaType<typeof categorySchema> & {
  _id?: Types.ObjectId;
};

const CategoryModel =
  (models.Category as Model<InferSchemaType<typeof categorySchema>>) ||
  model("Category", categorySchema);

export type CreateCategoryInput = {
  name: string;
  slug: string;
  status?: CategoryStatus;
};

export type UpdateCategoryInput = {
  name?: string;
  slug?: string;
  status?: CategoryStatus;
};

function normalizeSlug(slug: string): string {
  return String(slug || "")
    .trim()
    .toLowerCase();
}

export async function ensureIndexes(): Promise<void> {
  await CategoryModel.syncIndexes();
}

export async function listCategories(): Promise<CategoryDocument[]> {
  const docs = await CategoryModel.find().sort({ updatedAt: -1 }).lean();
  return docs as CategoryDocument[];
}

export async function findById(
  id: string,
): Promise<CategoryDocument | null> {
  if (!Types.ObjectId.isValid(id)) return null;
  const doc = await CategoryModel.findById(id).lean();
  return doc as CategoryDocument | null;
}

export async function findBySlug(
  slug: string,
): Promise<CategoryDocument | null> {
  const doc = await CategoryModel.findOne({
    slug: normalizeSlug(slug),
  }).lean();
  return doc as CategoryDocument | null;
}

export async function createCategory(
  input: CreateCategoryInput,
): Promise<CategoryDocument> {
  const created = await CategoryModel.create({
    name: String(input.name || "").trim(),
    slug: normalizeSlug(input.slug),
    status: input.status === "inactive" ? "inactive" : "active",
  });
  return created.toObject() as CategoryDocument;
}

export async function updateCategory(
  id: string,
  input: UpdateCategoryInput,
): Promise<CategoryDocument | null> {
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

  const updated = await CategoryModel.findByIdAndUpdate(
    id,
    { $set },
    { new: true, runValidators: true },
  ).lean();

  return updated as CategoryDocument | null;
}

export async function deleteCategory(id: string): Promise<boolean> {
  if (!Types.ObjectId.isValid(id)) return false;
  const result = await CategoryModel.findByIdAndDelete(id);
  return result !== null;
}

export function toPublic(category: CategoryDocument | null) {
  if (!category) return null;
  return {
    _id: String(category._id || ""),
    name: category.name,
    slug: category.slug,
    status: category.status as CategoryStatus,
    createdAt: category.createdAt,
    updatedAt: category.updatedAt,
  };
}
