import { Request, Response } from "express";

import { Types } from "mongoose";

import * as BlogCategories from "../models/BlogCategories";

import * as Blog from "../models/Blog";

import type { BlogUpdateFields } from "../models/Blog";

import { parseUpdateBlogBody } from "../hooks/helper";

function parseAuthor(body: Record<string, unknown>): AuthorBlog | null {
    const raw = body.author;
    if (!raw || typeof raw !== "object") return null;
    const a = raw as Record<string, unknown>;
    if (typeof a.name !== "string" || typeof a.pictures !== "string") {
        return null;
    }
    const name = a.name.trim();
    if (name.length < 1) return null;
    return { name, pictures: a.pictures.trim() };
}

/** Slug must exist in `blog_categories` and be active. */
async function resolveActiveBlogCategory(slug: string) {
    const cat = await BlogCategories.findBySlug(slug);
    if (!cat || cat.status !== "active") return null;
    return cat;
}

export async function list(req: Request, res: Response) {
    try {
        await Blog.ensureIndexes();
        const categorySlug =
            typeof req.query.category === "string"
                ? req.query.category
                : undefined;
        const statusRaw = req.query.status;
        const status =
            statusRaw === "published" || statusRaw === "draft"
                ? statusRaw
                : undefined;

        let categoryId: string | undefined;
        if (categorySlug) {
            const cat = await BlogCategories.findBySlug(categorySlug);
            if (!cat) {
                return res.status(200).json({ posts: [] });
            }
            categoryId = String(cat._id);
        }

        const rows = await Blog.listBlogs({ categoryId, status });
        return res.status(200).json({
            posts: rows.map((r) => Blog.toPublic(r)),
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export async function getById(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const row = await Blog.findById(String(id || ""));
        if (!row) {
            return res.status(404).json({ message: "Blog post not found" });
        }
        return res.status(200).json({ post: Blog.toPublic(row) });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export async function getBySlug(req: Request, res: Response) {
    try {
        const { slug } = req.params;
        const row = await Blog.findBySlug(String(slug || ""));
        if (!row) {
            return res.status(404).json({ message: "Blog post not found" });
        }
        return res.status(200).json({ post: Blog.toPublic(row) });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export async function create(req: Request, res: Response) {
    try {
        await Blog.ensureIndexes();
        const body = (req.body || {}) as Record<string, unknown>;
        const categorySlug = String(body.category ?? "").trim();
        const cat = await resolveActiveBlogCategory(categorySlug);
        if (!cat) {
            return res.status(400).json({
                message:
                    "category must be the slug of an active row in blog_categories",
            });
        }

        const author = parseAuthor(body);
        if (!author) {
            return res.status(400).json({
                message: "author must be an object with name (non-empty) and pictures (string)",
            });
        }

        const row = await Blog.createBlog({
            title: String(body.title ?? ""),
            slug: String(body.slug ?? ""),
            thumbnail: String(body.thumbnail ?? "").trim(),
            description: String(body.description ?? "").trim(),
            content: String(body.content ?? "").trim(),
            status:
                body.status === "published"
                    ? "published"
                    : body.status === "draft"
                        ? "draft"
                        : undefined,
            category: new Types.ObjectId(String(cat._id)),
            author,
        });

        return res.status(201).json({
            message: "Blog post created",
            post: Blog.toPublic(row),
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
        const parsed = parseUpdateBlogBody(req.body);
        if (!parsed) {
            return res.status(400).json({
                message:
                    "Provide at least one valid field (title, slug, thumbnail, description, content, status, category, author)",
            });
        }

        const existing = await Blog.findById(String(id || ""));
        if (!existing) {
            return res.status(404).json({ message: "Blog post not found" });
        }

        const { category: categorySlug, ...rest } = parsed;
        const patch: BlogUpdateFields = { ...rest };

        if (categorySlug !== undefined) {
            const cat = await resolveActiveBlogCategory(categorySlug);
            if (!cat) {
                return res.status(400).json({
                    message:
                        "category must be the slug of an active row in blog_categories",
                });
            }
            patch.category = new Types.ObjectId(String(cat._id));
        }

        const row = await Blog.updateBlog(String(id || ""), patch);
        if (!row) {
            return res.status(404).json({ message: "Blog post not found" });
        }

        return res.status(200).json({
            message: "Blog post updated",
            post: Blog.toPublic(row),
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
        const ok = await Blog.deleteBlog(String(id || ""));
        if (!ok) {
            return res.status(404).json({ message: "Blog post not found" });
        }
        return res.status(200).json({ message: "Blog post deleted" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}
