import { Request, Response } from "express";

import * as Categories from "../models/Categories";
import type { CategoryStatus } from "../types/categories";

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function parseUpdateBody(body: unknown): Categories.UpdateCategoryInput | null {
  const b = (body || {}) as Record<string, unknown>;
  const out: Categories.UpdateCategoryInput = {};

  if ("name" in b) {
    if (typeof b.name !== "string") {
      return null;
    }
    out.name = b.name;
  }
  if ("slug" in b) {
    if (typeof b.slug !== "string") {
      return null;
    }
    out.slug = b.slug;
  }
  if ("status" in b) {
    if (b.status !== "active" && b.status !== "inactive") {
      return null;
    }
    out.status = b.status as CategoryStatus;
  }

  if (
    out.name === undefined &&
    out.slug === undefined &&
    out.status === undefined
  ) {
    return null;
  }

  if (out.name !== undefined && String(out.name).trim().length < 1) {
    return null;
  }
  if (out.slug !== undefined) {
    const s = String(out.slug).trim();
    if (s.length < 1 || !SLUG_PATTERN.test(s.toLowerCase())) {
      return null;
    }
  }

  return out;
}

export async function list(_req: Request, res: Response) {
  try {
    await Categories.ensureIndexes();
    const rows = await Categories.listCategories();
    return res.status(200).json({
      categories: rows.map((c) => Categories.toPublic(c)),
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function getById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const row = await Categories.findById(String(id || ""));
    if (!row) {
      return res.status(404).json({ message: "Category not found" });
    }
    return res.status(200).json({ category: Categories.toPublic(row) });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function create(req: Request, res: Response) {
  try {
    await Categories.ensureIndexes();
    const { name, slug, status } = (req.body || {}) as {
      name?: string;
      slug?: string;
      status?: string;
    };

    const row = await Categories.createCategory({
      name: String(name || ""),
      slug: String(slug || ""),
      status:
        status === "inactive"
          ? "inactive"
          : status === "active"
            ? "active"
            : undefined,
    });

    return res.status(201).json({
      message: "Category created",
      category: Categories.toPublic(row),
    });
  } catch (err: unknown) {
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
    if (!parsed) {
      return res.status(400).json({
        message:
          "Provide at least one valid field: name (non-empty), slug (valid format), or status (active|inactive)",
      });
    }

    const existing = await Categories.findById(String(id || ""));
    if (!existing) {
      return res.status(404).json({ message: "Category not found" });
    }

    const row = await Categories.updateCategory(String(id || ""), parsed);
    if (!row) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.status(200).json({
      message: "Category updated",
      category: Categories.toPublic(row),
    });
  } catch (err: unknown) {
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
    const ok = await Categories.deleteCategory(String(id || ""));
    if (!ok) {
      return res.status(404).json({ message: "Category not found" });
    }
    return res.status(200).json({ message: "Category deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}
