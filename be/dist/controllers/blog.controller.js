"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.list = list;
exports.getById = getById;
exports.getBySlug = getBySlug;
exports.create = create;
exports.update = update;
exports.remove = remove;
const mongoose_1 = require("mongoose");
const BlogCategories = __importStar(require("../models/BlogCategories"));
const Blog = __importStar(require("../models/Blog"));
const helper_1 = require("../hooks/helper");
/** Multipart `author` is often a JSON string; normalize before `parseAuthor` / `parseUpdateBlogBody`. */
function normalizedBlogBody(req) {
    const body = (req.body || {});
    if (typeof body.author === "string") {
        try {
            body.author = JSON.parse(body.author);
        }
        catch {
            // leave as string; parseAuthor will reject
        }
    }
    return body;
}
function parseAuthor(body) {
    const raw = body.author;
    if (!raw || typeof raw !== "object")
        return null;
    const a = raw;
    if (typeof a.name !== "string" || typeof a.pictures !== "string") {
        return null;
    }
    const name = a.name.trim();
    if (name.length < 1)
        return null;
    return { name, pictures: a.pictures.trim() };
}
/** Slug must exist in `blog_categories` and be active. */
async function resolveActiveBlogCategory(slug) {
    const cat = await BlogCategories.findBySlug(slug);
    if (!cat || cat.status !== "active")
        return null;
    return cat;
}
async function list(req, res) {
    try {
        await Blog.ensureIndexes();
        const categorySlug = typeof req.query.category === "string"
            ? req.query.category
            : undefined;
        const statusRaw = req.query.status;
        const status = statusRaw === "published" || statusRaw === "draft"
            ? statusRaw
            : undefined;
        let categoryId;
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
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}
async function getById(req, res) {
    try {
        const { id } = req.params;
        const row = await Blog.findById(String(id || ""));
        if (!row) {
            return res.status(404).json({ message: "Blog post not found" });
        }
        return res.status(200).json({ post: Blog.toPublic(row) });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}
async function getBySlug(req, res) {
    try {
        const { slug } = req.params;
        const row = await Blog.findBySlug(String(slug || ""));
        if (!row) {
            return res.status(404).json({ message: "Blog post not found" });
        }
        return res.status(200).json({ post: Blog.toPublic(row) });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}
async function create(req, res) {
    try {
        await Blog.ensureIndexes();
        const body = normalizedBlogBody(req);
        const categorySlug = String(body.category ?? "").trim();
        const cat = await resolveActiveBlogCategory(categorySlug);
        if (!cat) {
            return res.status(400).json({
                message: "category must be the slug of an active row in blog_categories",
            });
        }
        const author = parseAuthor(body);
        if (!author) {
            return res.status(400).json({
                message: "author must be an object with name (non-empty) and pictures (string)",
            });
        }
        const file = req.file;
        let thumbnail = String(body.thumbnail ?? "").trim();
        if (file) {
            try {
                thumbnail = await (0, helper_1.uploadImageToImageKit)(file, { folder: "/blogs" });
            }
            catch (err) {
                if (err instanceof Error &&
                    err.message === "ImageKit is not configured") {
                    return res
                        .status(500)
                        .json({ message: "ImageKit is not configured" });
                }
                throw err;
            }
        }
        const row = await Blog.createBlog({
            title: String(body.title ?? ""),
            slug: String(body.slug ?? ""),
            thumbnail,
            description: String(body.description ?? "").trim(),
            content: String(body.content ?? "").trim(),
            status: body.status === "published"
                ? "published"
                : body.status === "draft"
                    ? "draft"
                    : undefined,
            category: new mongoose_1.Types.ObjectId(String(cat._id)),
            author,
        });
        return res.status(201).json({
            message: "Blog post created",
            post: Blog.toPublic(row),
        });
    }
    catch (err) {
        if (err instanceof Error &&
            err.message === "ImageKit is not configured") {
            return res.status(500).json({ message: "ImageKit is not configured" });
        }
        if (typeof err === "object" &&
            err !== null &&
            "code" in err &&
            err.code === 11000) {
            return res.status(409).json({ message: "Slug already exists" });
        }
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}
async function update(req, res) {
    try {
        const { id } = req.params;
        const body = normalizedBlogBody(req);
        const file = req.file;
        let parsed = (0, helper_1.parseUpdateBlogBody)(body);
        if (file) {
            let thumbUrl;
            try {
                thumbUrl = await (0, helper_1.uploadImageToImageKit)(file, { folder: "/blogs" });
            }
            catch (err) {
                if (err instanceof Error &&
                    err.message === "ImageKit is not configured") {
                    return res
                        .status(500)
                        .json({ message: "ImageKit is not configured" });
                }
                throw err;
            }
            parsed = { ...(parsed ?? {}), thumbnail: thumbUrl };
        }
        if (!parsed) {
            return res.status(400).json({
                message: "Provide at least one valid field (title, slug, thumbnail, description, content, status, category, author)",
            });
        }
        const existing = await Blog.findById(String(id || ""));
        if (!existing) {
            return res.status(404).json({ message: "Blog post not found" });
        }
        const { category: categorySlug, ...rest } = parsed;
        const patch = { ...rest };
        if (categorySlug !== undefined) {
            const cat = await resolveActiveBlogCategory(categorySlug);
            if (!cat) {
                return res.status(400).json({
                    message: "category must be the slug of an active row in blog_categories",
                });
            }
            patch.category = new mongoose_1.Types.ObjectId(String(cat._id));
        }
        const row = await Blog.updateBlog(String(id || ""), patch);
        if (!row) {
            return res.status(404).json({ message: "Blog post not found" });
        }
        return res.status(200).json({
            message: "Blog post updated",
            post: Blog.toPublic(row),
        });
    }
    catch (err) {
        if (typeof err === "object" &&
            err !== null &&
            "code" in err &&
            err.code === 11000) {
            return res.status(409).json({ message: "Slug already exists" });
        }
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}
async function remove(req, res) {
    try {
        const { id } = req.params;
        const ok = await Blog.deleteBlog(String(id || ""));
        if (!ok) {
            return res.status(404).json({ message: "Blog post not found" });
        }
        return res.status(200).json({ message: "Blog post deleted" });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}
