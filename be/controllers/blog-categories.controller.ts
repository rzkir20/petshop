import { Request, Response } from "express";

import * as BlogCategories from "../models/BlogCategories";

import { parseUpdateBlogCategoryBody } from "../hooks/helper";

export async function list(_req: Request, res: Response) {
  try {
    await BlogCategories.ensureIndexes();
    const rows = await BlogCategories.listBlogCategories();
    return res.status(200).json({
      categories: rows.map((c) => BlogCategories.toPublic(c)),
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function getById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const row = await BlogCategories.findById(String(id || ""));
    if (!row) {
      return res.status(404).json({ message: "Blog category not found" });
    }
    return res.status(200).json({ category: BlogCategories.toPublic(row) });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function create(req: Request, res: Response) {
  try {
    await BlogCategories.ensureIndexes();
    const { name, slug, status } = (req.body || {}) as {
      name?: string;
      slug?: string;
      status?: string;
    };

    const row = await BlogCategories.createBlogCategory({
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
      message: "Blog category created",
      category: BlogCategories.toPublic(row),
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
    const parsed = parseUpdateBlogCategoryBody(req.body);
    if (!parsed) {
      return res.status(400).json({
        message:
          "Provide at least one valid field: name (non-empty), slug (valid format), or status (active|inactive)",
      });
    }

    const existing = await BlogCategories.findById(String(id || ""));
    if (!existing) {
      return res.status(404).json({ message: "Blog category not found" });
    }

    const row = await BlogCategories.updateBlogCategory(String(id || ""), parsed);
    if (!row) {
      return res.status(404).json({ message: "Blog category not found" });
    }

    return res.status(200).json({
      message: "Blog category updated",
      category: BlogCategories.toPublic(row),
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
    const ok = await BlogCategories.deleteBlogCategory(String(id || ""));
    if (!ok) {
      return res.status(404).json({ message: "Blog category not found" });
    }
    return res.status(200).json({ message: "Blog category deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}
