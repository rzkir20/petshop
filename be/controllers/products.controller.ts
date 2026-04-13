import { Request, Response } from "express";

import * as Categories from "../models/Categories";

import * as Products from "../models/Products";

const STOCK_STATUS_VALUES = ["in-stock", "low-stock", "out-of-stock"] as const;

import {
  asString,
  asNumber,
  asBoolean,
  toSlug,
  parseUpdateProductBody,
  uploadManyImagesToImageKit,
} from "../hooks/helper";

const MAX_PRODUCT_IMAGES = 10;

function resolveCreateProductImages(
  body: Record<string, unknown>,
  uploadedImageUrls: string[],
): { ok: true; images: string[] } | { ok: false } {
  if (!("imageManifest" in body)) {
    return { ok: true, images: uploadedImageUrls };
  }
  const raw = body.imageManifest;
  const str = typeof raw === "string" ? raw.trim() : "";
  let slots: unknown;
  try {
    slots = str ? JSON.parse(str) : [];
  } catch {
    return { ok: false };
  }
  if (!Array.isArray(slots)) return { ok: false };
  if (slots.length > MAX_PRODUCT_IMAGES) return { ok: false };
  const result: string[] = [];
  for (const slot of slots) {
    if (!slot || typeof slot !== "object") return { ok: false };
    const rec = slot as Record<string, unknown>;
    const t = asString(rec.t);
    if (t === "u") {
      const v = asString(rec.v).trim();
      if (!v) return { ok: false };
      let parsed: URL;
      try {
        parsed = new URL(v);
      } catch {
        return { ok: false };
      }
      if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
        return { ok: false };
      }
      result.push(v);
    } else if (t === "f") {
      const i = asNumber(rec.i);
      if (!Number.isInteger(i) || i < 0 || i >= uploadedImageUrls.length) {
        return { ok: false };
      }
      result.push(uploadedImageUrls[i]);
    } else {
      return { ok: false };
    }
  }
  return { ok: true, images: result };
}

export async function list(req: Request, res: Response) {
  try {
    await Products.ensureIndexes();
    const rawCategory = asString(req.query.category);
    const rawQ = asString(req.query.q);
    const rawPage = asNumber(req.query.page);
    const rawLimit = asNumber(req.query.limit);
    const page =
      Number.isFinite(rawPage) && rawPage >= 1 ? Math.floor(rawPage) : 1;
    const limit =
      Number.isFinite(rawLimit) && rawLimit >= 1
        ? Math.min(100, Math.floor(rawLimit))
        : 10;

    const { rows, total } = await Products.listProducts({
      category: rawCategory && rawCategory !== "all" ? rawCategory : undefined,
      q: rawQ || undefined,
      page,
      limit,
    });
    const products = rows.map((row) => ({
      _id: String(row._id || ""),
      title: row.title,
      slug: row.slug,
      thumbnail: row.thumbnail,
      price: row.price,
      isBestSeller: row.isBestSeller,
      category: String(row.category || ""),
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    }));
    return res.status(200).json({
      products,
      total,
      page,
      limit,
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

export async function getBySlug(req: Request, res: Response) {
  try {
    const slug = asString(req.params.slug).toLowerCase();
    if (!slug) {
      return res.status(400).json({ message: "Slug is required" });
    }
    const { rows } = await Products.listProducts({
      q: slug,
      page: 1,
      limit: 100,
    });
    const row =
      rows.find((item) => String(item.slug || "").toLowerCase() === slug) || null;
    if (!row) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json({ product: Products.toPublic(row) });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function getByCategory(req: Request, res: Response) {
  try {
    await Products.ensureIndexes();
    const category = asString(req.params.category).toLowerCase();
    const rawQ = asString(req.query.q);
    const rawPage = asNumber(req.query.page);
    const rawLimit = asNumber(req.query.limit);
    const page =
      Number.isFinite(rawPage) && rawPage >= 1 ? Math.floor(rawPage) : 1;
    const limit =
      Number.isFinite(rawLimit) && rawLimit >= 1
        ? Math.min(100, Math.floor(rawLimit))
        : 10;

    if (!category) {
      return res.status(400).json({ message: "Category is required" });
    }

    const categoryRow = await Categories.findBySlug(category);
    if (!categoryRow) {
      return res.status(404).json({ message: "Category not found" });
    }

    const { rows, total } = await Products.listProducts({
      category,
      q: rawQ || undefined,
      page,
      limit,
    });

    return res.status(200).json({
      category: Categories.toPublic(categoryRow),
      products: rows.map((row) => Products.toPublic(row)),
      total,
      page,
      limit,
    });
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
    const highlights = Array.isArray(body.highlights)
      ? body.highlights.map((v) => asString(v)).filter(Boolean)
      : typeof body.highlights === "string"
        ? (() => {
            try {
              const parsed = JSON.parse(body.highlights) as unknown;
              if (!Array.isArray(parsed)) return [];
              return parsed.map((v) => asString(v)).filter(Boolean);
            } catch {
              return [];
            }
          })()
        : [];
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
    const resolved = resolveCreateProductImages(body, uploadedImages);
    if (!resolved.ok) {
      return res.status(400).json({ message: "Invalid image manifest" });
    }
    const images = resolved.images;
    let thumbnail = asString(body.thumbnail);
    if (images.length > 0) {
      thumbnail = images[0];
    }

    const createPayload = {
      title,
      slug,
      expiredAt,
      flavor,
      weight,
      thumbnail,
      images,
      highlights,
      price,
      content,
      isBestSeller,
      stockCurrent,
      stockMax,
      reorder,
      status,
      category: category.slug,
    };

    const row = await Products.createProduct(
      createPayload as CreateProductInput,
    );
    await Categories.incrementCategoryCount(category.slug, 1);

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
    const parsed = parseUpdateProductBody(req.body);
    const files = (req.files as Express.Multer.File[] | undefined) ?? [];
    if (!parsed && files.length === 0) {
      return res.status(400).json({
        message: "Provide at least one valid product field to update",
      });
    }
    const payload: UpdateProductInput = parsed ?? {};

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
    const previousCategory = String(existing.category || "").toLowerCase();

    const row = await Products.updateProduct(String(id || ""), payload);
    if (!row) {
      return res.status(404).json({ message: "Product not found" });
    }
    const nextCategory = String(row.category || "").toLowerCase();
    if (nextCategory && previousCategory && nextCategory !== previousCategory) {
      await Categories.incrementCategoryCount(previousCategory, -1);
      await Categories.incrementCategoryCount(nextCategory, 1);
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
    const existing = await Products.findById(String(id || ""));
    if (!existing) {
      return res.status(404).json({ message: "Product not found" });
    }
    const ok = await Products.deleteProduct(String(id || ""));
    if (!ok) {
      return res.status(404).json({ message: "Product not found" });
    }
    await Categories.incrementCategoryCount(String(existing.category || ""), -1);
    return res.status(200).json({ message: "Product deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}
