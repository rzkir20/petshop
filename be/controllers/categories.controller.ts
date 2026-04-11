import { Request, Response } from "express";

import * as Categories from "../models/Categories";

import { parseUpdateCategoryBody } from "../hooks/helper";

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
    const { name, description, slug, status } = (req.body || {}) as {
      name?: string;
      description?: string;
      slug?: string;
      status?: string;
    };

    const row = await Categories.createCategory({
      name: String(name || ""),
      description: String(description || ""),
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
    const parsed = parseUpdateCategoryBody(req.body);
    if (!parsed) {
      return res.status(400).json({
        message:
          "Provide at least one valid field: name (non-empty), description (string), slug (valid format), or status (active|inactive)",
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
