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
const Categories = __importStar(require("../models/Categories"));
const helper_1 = require("../hooks/helper");
async function list(_req, res) {
    try {
        await Categories.ensureIndexes();
        const rows = await Categories.listCategories();
        return res.status(200).json({
            categories: rows.map((c) => Categories.toPublic(c)),
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
        const row = await Categories.findById(String(id || ""));
        if (!row) {
            return res.status(404).json({ message: "Category not found" });
        }
        return res.status(200).json({ category: Categories.toPublic(row) });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}
async function create(req, res) {
    try {
        await Categories.ensureIndexes();
        const file = req.file;
        const { name, description, slug, image, status } = (req.body || {});
        let resolvedImage = String(image || "");
        if (file) {
            resolvedImage = await (0, helper_1.uploadImageToImageKit)(file, { folder: "/categories" });
        }
        const row = await Categories.createCategory({
            name: String(name || ""),
            description: String(description || ""),
            slug: String(slug || ""),
            image: resolvedImage,
            status: status === "inactive"
                ? "inactive"
                : status === "active"
                    ? "active"
                    : undefined,
        });
        return res.status(201).json({
            message: "Category created",
            category: Categories.toPublic(row),
        });
    }
    catch (err) {
        if (err instanceof Error && err.message === "ImageKit is not configured") {
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
        const file = req.file;
        let parsed = (0, helper_1.parseUpdateCategoryBody)(req.body);
        if (file) {
            const image = await (0, helper_1.uploadImageToImageKit)(file, { folder: "/categories" });
            parsed = { ...(parsed ?? {}), image };
        }
        if (!parsed) {
            return res.status(400).json({
                message: "Provide at least one valid field: name (non-empty), description (string), slug (valid format), image (string), or status (active|inactive)",
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
    }
    catch (err) {
        if (err instanceof Error && err.message === "ImageKit is not configured") {
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
async function remove(req, res) {
    try {
        const { id } = req.params;
        const ok = await Categories.deleteCategory(String(id || ""));
        if (!ok) {
            return res.status(404).json({ message: "Category not found" });
        }
        return res.status(200).json({ message: "Category deleted" });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}
