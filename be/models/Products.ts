import {
  InferSchemaType,
  Model,
  model,
  models,
  Schema,
  Types,
} from "mongoose";

import type { StockStatus } from "../types/products";

const productSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    expiredAt: { type: String, required: true, trim: true },
    flavor: { type: String, required: true, trim: true },
    weight: { type: String, required: true, trim: true },
    thumbnail: { type: String, default: "", trim: true },
    images: { type: [String], default: [] },
    price: { type: Number, required: true, min: 0 },
    content: { type: String, required: true, trim: true },
    isBestSeller: { type: Boolean, default: false },
    stockCurrent: { type: Number, required: true, min: 0 },
    stockMax: { type: Number, required: true, min: 0 },
    reorder: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ["in-stock", "low-stock", "out-of-stock"] satisfies StockStatus[],
      default: "in-stock",
    },
    category: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
  },
  { timestamps: true, collection: "products" },
);

type ProductDocument = InferSchemaType<typeof productSchema> & {
  _id?: Types.ObjectId;
};

const ProductModel =
  (models.Product as Model<InferSchemaType<typeof productSchema>>) ||
  model("Product", productSchema);

export type CreateProductInput = {
  title: string;
  slug?: string;
  expiredAt: string;
  flavor: string;
  weight: string;
  thumbnail?: string;
  images?: string[];
  price: number;
  content: string;
  isBestSeller?: boolean;
  stockCurrent: number;
  stockMax: number;
  reorder: string;
  status: StockStatus;
  category: string;
};

export type UpdateProductInput = Partial<CreateProductInput>;

export type ListProductsInput = {
  category?: string;
  q?: string;
};

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function slugify(value: string): string {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]+/g, "")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function ensureIndexes(): Promise<void> {
  await ProductModel.syncIndexes();
}

export async function listProducts(
  input?: ListProductsInput,
): Promise<ProductDocument[]> {
  const filter: Record<string, unknown> = {};
  const category = String(input?.category || "").trim().toLowerCase();
  const q = String(input?.q || "").trim();

  if (category) {
    filter.category = category;
  }
  if (q) {
    const safe = escapeRegExp(q);
    filter.$or = [
      { title: { $regex: safe, $options: "i" } },
      { slug: { $regex: safe, $options: "i" } },
      { flavor: { $regex: safe, $options: "i" } },
      { category: { $regex: safe, $options: "i" } },
    ];
  }

  const docs = await ProductModel.find(filter).sort({ updatedAt: -1 }).lean();
  return docs as ProductDocument[];
}

export async function findById(id: string): Promise<ProductDocument | null> {
  if (!Types.ObjectId.isValid(id)) return null;
  const doc = await ProductModel.findById(id).lean();
  return doc as ProductDocument | null;
}

export async function createProduct(
  input: CreateProductInput,
): Promise<ProductDocument> {
  const created = await ProductModel.create({
    title: String(input.title || "").trim(),
    slug: slugify(input.slug || input.title),
    expiredAt: String(input.expiredAt || "").trim(),
    flavor: String(input.flavor || "").trim(),
    weight: String(input.weight || "").trim(),
    thumbnail: String(input.thumbnail || "").trim(),
    images: Array.isArray(input.images)
      ? input.images.map((url) => String(url || "").trim()).filter(Boolean)
      : [],
    price: Number(input.price || 0),
    content: String(input.content || "").trim(),
    isBestSeller: Boolean(input.isBestSeller),
    stockCurrent: Number(input.stockCurrent || 0),
    stockMax: Number(input.stockMax || 0),
    reorder: String(input.reorder || "").trim(),
    status: input.status,
    category: input.category,
  });

  return created.toObject() as ProductDocument;
}

export async function updateProduct(
  id: string,
  input: UpdateProductInput,
): Promise<ProductDocument | null> {
  if (!Types.ObjectId.isValid(id)) return null;

  const $set: Record<string, unknown> = {};

  if (input.title !== undefined) $set.title = String(input.title || "").trim();
  if (input.slug !== undefined) $set.slug = slugify(input.slug);
  if (input.expiredAt !== undefined) {
    $set.expiredAt = String(input.expiredAt || "").trim();
  }
  if (input.flavor !== undefined) {
    $set.flavor = String(input.flavor || "").trim();
  }
  if (input.weight !== undefined) {
    $set.weight = String(input.weight || "").trim();
  }
  if (input.thumbnail !== undefined) {
    $set.thumbnail = String(input.thumbnail || "").trim();
  }
  if (input.images !== undefined) {
    $set.images = Array.isArray(input.images)
      ? input.images.map((url) => String(url || "").trim()).filter(Boolean)
      : [];
  }
  if (input.price !== undefined) {
    $set.price = Number(input.price || 0);
  }
  if (input.content !== undefined) {
    $set.content = String(input.content || "").trim();
  }
  if (input.isBestSeller !== undefined) {
    $set.isBestSeller = Boolean(input.isBestSeller);
  }
  if (input.stockCurrent !== undefined) {
    $set.stockCurrent = Number(input.stockCurrent || 0);
  }
  if (input.stockMax !== undefined) {
    $set.stockMax = Number(input.stockMax || 0);
  }
  if (input.reorder !== undefined) {
    $set.reorder = String(input.reorder || "").trim();
  }
  if (input.status !== undefined) $set.status = input.status;
  if (input.category !== undefined) $set.category = input.category;

  if (Object.keys($set).length === 0) {
    return findById(id);
  }

  const updated = await ProductModel.findByIdAndUpdate(
    id,
    { $set },
    { new: true, runValidators: true },
  ).lean();

  return updated as ProductDocument | null;
}

export async function deleteProduct(id: string): Promise<boolean> {
  if (!Types.ObjectId.isValid(id)) return false;
  const result = await ProductModel.findByIdAndDelete(id);
  return result !== null;
}

export function toPublic(product: ProductDocument | null) {
  if (!product) return null;
  return {
    _id: String(product._id || ""),
    title: product.title,
    slug: product.slug,
    expiredAt: product.expiredAt,
    flavor: product.flavor,
    weight: product.weight,
    thumbnail: product.thumbnail,
    images: Array.isArray(product.images) ? product.images : [],
    price: product.price,
    content: product.content,
    isBestSeller: product.isBestSeller,
    stockCurrent: product.stockCurrent,
    stockMax: product.stockMax,
    reorder: product.reorder,
    status: product.status as StockStatus,
    category: String(product.category || ""),
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  };
}
