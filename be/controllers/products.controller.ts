import { Request, Response } from "express";

import * as Categories from "../models/Categories";
import * as Products from "../models/Products";
import imagekit, { isImageKitConfigured } from "../utils/imgkit";
import type { StockStatus } from "../types/products";

const STOCK_STATUS_VALUES = ["in-stock", "low-stock", "out-of-stock"] as const;

function asString(value: unknown): string {
  return String(value ?? "").trim();
}

function asNumber(value: unknown): number {
  if (typeof value === "number") return value;
  if (typeof value === "string") return Number(value);
  return Number.NaN;
}

function asBoolean(value: unknown): boolean | null {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") {
    if (value === "true") return true;
    if (value === "false") return false;
  }
  return null;
}

function toSlug(value: string): string {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]+/g, "")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function uploadImageToImageKit(file: Express.Multer.File): Promise<string> {
  if (!isImageKitConfigured || !imagekit) {
    throw new Error("ImageKit is not configured");
  }
  const upload = await imagekit.upload({
    file: file.buffer.toString("base64"),
    fileName: `${Date.now()}-${file.originalname || "product-image"}`,
    folder: "/products",
  });
  return String(upload.url || "");
}

async function uploadManyImagesToImageKit(
  files: Express.Multer.File[],
): Promise<string[]> {
  const urls = await Promise.all(files.map((file) => uploadImageToImageKit(file)));
  return urls.filter(Boolean);
}

function parseUpdateBody(body: unknown): Products.UpdateProductInput | null {
  const b = (body || {}) as Record<string, unknown>;
  const out: Products.UpdateProductInput = {};

  if ("title" in b) {
    const title = asString(b.title);
    if (title.length < 1) return null;
    out.title = title;
  }
  if ("slug" in b) {
    const slug = toSlug(asString(b.slug));
    if (slug.length < 1) return null;
    out.slug = slug;
  }
  if ("expiredAt" in b) {
    const expiredAt = asString(b.expiredAt);
    if (expiredAt.length < 1) return null;
    out.expiredAt = expiredAt;
  }
  if ("flavor" in b) {
    const flavor = asString(b.flavor);
    if (flavor.length < 1) return null;
    out.flavor = flavor;
  }
  if ("weight" in b) {
    const weight = asString(b.weight);
    if (weight.length < 1) return null;
    out.weight = weight;
  }
  if ("thumbnail" in b) {
    out.thumbnail = asString(b.thumbnail);
  }
  if ("images" in b) {
    if (Array.isArray(b.images)) {
      out.images = b.images.map((v) => asString(v)).filter(Boolean);
    } else if (typeof b.images === "string") {
      try {
        const parsed = JSON.parse(b.images) as unknown;
        if (!Array.isArray(parsed)) return null;
        out.images = parsed.map((v) => asString(v)).filter(Boolean);
      } catch {
        return null;
      }
    } else {
      return null;
    }
  }
  if ("price" in b) {
    const price = asNumber(b.price);
    if (!Number.isFinite(price) || price < 0) return null;
    out.price = price;
  }
  if ("content" in b) {
    const content = asString(b.content);
    if (content.length < 1) return null;
    out.content = content;
  }
  if ("isBestSeller" in b) {
    const isBestSeller = asBoolean(b.isBestSeller);
    if (isBestSeller === null) return null;
    out.isBestSeller = isBestSeller;
  }
  if ("stockCurrent" in b) {
    const stockCurrent = asNumber(b.stockCurrent);
    if (!Number.isFinite(stockCurrent) || stockCurrent < 0) return null;
    out.stockCurrent = stockCurrent;
  }
  if ("stockMax" in b) {
    const stockMax = asNumber(b.stockMax);
    if (!Number.isFinite(stockMax) || stockMax < 0) return null;
    out.stockMax = stockMax;
  }
  if ("reorder" in b) {
    const reorder = asString(b.reorder);
    if (reorder.length < 1) return null;
    out.reorder = reorder;
  }
  if ("status" in b) {
    if (!STOCK_STATUS_VALUES.includes(asString(b.status) as StockStatus)) return null;
    out.status = asString(b.status) as StockStatus;
  }
  if ("category" in b) {
    const category = asString(b.category).toLowerCase();
    if (category.length < 1) return null;
    out.category = category;
  }
  if (Object.keys(out).length === 0) return null;
  return out;
}

export async function list(req: Request, res: Response) {
  try {
    await Products.ensureIndexes();
    const rawCategory = asString(req.query.category);
    const rawQ = asString(req.query.q);
    const rows = await Products.listProducts({
      category: rawCategory && rawCategory !== "all" ? rawCategory : undefined,
      q: rawQ || undefined,
    });
    return res.status(200).json({
      products: rows.map((row) => Products.toPublic(row)),
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function getById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const row = await Products.findById(String(id || ""));
    if (!row) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json({ product: Products.toPublic(row) });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function create(req: Request, res: Response) {
  try {
    await Products.ensureIndexes();
    const body = (req.body || {}) as Record<string, unknown>;
    const categorySlug = asString(body.category).toLowerCase();
    const status = asString(body.status) as StockStatus;
    const price = asNumber(body.price);
    const stockCurrent = asNumber(body.stockCurrent);
    const stockMax = asNumber(body.stockMax);
    const isBestSeller = asBoolean(body.isBestSeller) ?? false;
    const content = asString(body.content);
    const title = asString(body.title);
    const expiredAt = asString(body.expiredAt);
    const flavor = asString(body.flavor);
    const weight = asString(body.weight);
    const slug = toSlug(asString(body.slug) || title);
    const reorder = asString(body.reorder);
    if (
      title.length < 1 ||
      slug.length < 1 ||
      expiredAt.length < 1 ||
      flavor.length < 1 ||
      weight.length < 1 ||
      !STOCK_STATUS_VALUES.includes(status) ||
      !Number.isFinite(price) ||
      price < 0 ||
      content.length < 1 ||
      !Number.isFinite(stockCurrent) ||
      stockCurrent < 0 ||
      !Number.isFinite(stockMax) ||
      stockMax < 0 ||
      reorder.length < 1 ||
      categorySlug.length < 1
    ) {
      return res.status(400).json({ message: "Invalid product payload" });
    }

    const category = await Categories.findBySlug(categorySlug);
    if (!category) {
      return res.status(400).json({ message: "Category not found" });
    }
    if (category.status !== "active") {
      return res.status(400).json({ message: "Category is inactive" });
    }

    const files = (req.files as Express.Multer.File[] | undefined) ?? [];
    const uploadedImages =
      files.length > 0 ? await uploadManyImagesToImageKit(files) : [];
    let thumbnail = asString(body.thumbnail);
    if (uploadedImages.length > 0) {
      thumbnail = uploadedImages[0];
    }

    const row = await Products.createProduct({
      title,
      slug,
      expiredAt,
      flavor,
      weight,
      thumbnail,
      images: uploadedImages,
      price,
      content,
      isBestSeller,
      stockCurrent,
      stockMax,
      reorder,
      status,
      category: category.slug,
    });

    return res.status(201).json({
      message: "Product created",
      product: Products.toPublic(row),
    });
  } catch (err: unknown) {
    if (err instanceof Error && err.message === "ImageKit is not configured") {
      return res.status(500).json({ message: "ImageKit is not configured" });
    }
    if (
      typeof err === "object" &&
      err !== null &&
      "code" in err &&
      (err as { code?: number }).code === 11000
    ) {
      return res.status(409).json({ message: "Slug already exists" });
    }
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function update(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const parsed = parseUpdateBody(req.body);
    const files = (req.files as Express.Multer.File[] | undefined) ?? [];
    if (!parsed && files.length === 0) {
      return res.status(400).json({
        message: "Provide at least one valid product field to update",
      });
    }
    const payload: Products.UpdateProductInput = parsed ?? {};

    if (files.length > 0) {
      const uploadedImages = await uploadManyImagesToImageKit(files);
      payload.images = uploadedImages;
      payload.thumbnail = uploadedImages[0] || payload.thumbnail;
    }

    if (payload.category !== undefined) {
      const category = await Categories.findBySlug(payload.category);
      if (!category) {
        return res.status(400).json({ message: "Category not found" });
      }
      if (category.status !== "active") {
        return res.status(400).json({ message: "Category is inactive" });
      }
      payload.category = category.slug;
    }
    if (payload.title !== undefined && payload.slug === undefined) {
      payload.slug = toSlug(payload.title);
    }

    const existing = await Products.findById(String(id || ""));
    if (!existing) {
      return res.status(404).json({ message: "Product not found" });
    }

    const row = await Products.updateProduct(String(id || ""), payload);
    if (!row) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({
      message: "Product updated",
      product: Products.toPublic(row),
    });
  } catch (err: unknown) {
    if (err instanceof Error && err.message === "ImageKit is not configured") {
      return res.status(500).json({ message: "ImageKit is not configured" });
    }
    if (
      typeof err === "object" &&
      err !== null &&
      "code" in err &&
      (err as { code?: number }).code === 11000
    ) {
      return res.status(409).json({ message: "Slug already exists" });
    }
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function remove(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const ok = await Products.deleteProduct(String(id || ""));
    if (!ok) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json({ message: "Product deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}
