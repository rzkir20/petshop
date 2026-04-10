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
exports.create = create;
exports.update = update;
exports.remove = remove;
const BlogCategories = __importStar(require("../models/BlogCategories"));
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
function parseUpdateBody(body) {
    const b = (body || {});
    const out = {};
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
        out.status = b.status;
    }
    if (out.name === undefined &&
        out.slug === undefined &&
        out.status === undefined) {
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
async function list(_req, res) {
    try {
        await BlogCategories.ensureIndexes();
        const rows = await BlogCategories.listBlogCategories();
        return res.status(200).json({
            categories: rows.map((c) => BlogCategories.toPublic(c)),
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
        const row = await BlogCategories.findById(String(id || ""));
        if (!row) {
            return res.status(404).json({ message: "Blog category not found" });
        }
        return res.status(200).json({ category: BlogCategories.toPublic(row) });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}
async function create(req, res) {
    try {
        await BlogCategories.ensureIndexes();
        const { name, slug, status } = (req.body || {});
        const row = await BlogCategories.createBlogCategory({
            name: String(name || ""),
            slug: String(slug || ""),
            status: status === "inactive"
                ? "inactive"
                : status === "active"
                    ? "active"
                    : undefined,
        });
        return res.status(201).json({
            message: "Blog category created",
            category: BlogCategories.toPublic(row),
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
async function update(req, res) {
    try {
        const { id } = req.params;
        const parsed = parseUpdateBody(req.body);
        if (!parsed) {
            return res.status(400).json({
                message: "Provide at least one valid field: name (non-empty), slug (valid format), or status (active|inactive)",
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
        const ok = await BlogCategories.deleteBlogCategory(String(id || ""));
        if (!ok) {
            return res.status(404).json({ message: "Blog category not found" });
        }
        return res.status(200).json({ message: "Blog category deleted" });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}
