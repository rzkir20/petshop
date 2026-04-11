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
const Products = __importStar(require("../models/Products"));
const STOCK_STATUS_VALUES = ["in-stock", "low-stock", "out-of-stock"];
const helper_1 = require("../hooks/helper");
async function list(req, res) {
    try {
        await Products.ensureIndexes();
        const rawCategory = (0, helper_1.asString)(req.query.category);
        const rawQ = (0, helper_1.asString)(req.query.q);
        const rows = await Products.listProducts({
            category: rawCategory && rawCategory !== "all" ? rawCategory : undefined,
            q: rawQ || undefined,
        });
        return res.status(200).json({
            products: rows.map((row) => Products.toPublic(row)),
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
        const row = await Products.findById(String(id || ""));
        if (!row) {
            return res.status(404).json({ message: "Product not found" });
        }
        return res.status(200).json({ product: Products.toPublic(row) });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}
async function create(req, res) {
    try {
        await Products.ensureIndexes();
        const body = (req.body || {});
        const categorySlug = (0, helper_1.asString)(body.category).toLowerCase();
        const status = (0, helper_1.asString)(body.status);
        const price = (0, helper_1.asNumber)(body.price);
        const stockCurrent = (0, helper_1.asNumber)(body.stockCurrent);
        const stockMax = (0, helper_1.asNumber)(body.stockMax);
        const isBestSeller = (0, helper_1.asBoolean)(body.isBestSeller) ?? false;
        const content = (0, helper_1.asString)(body.content);
        const title = (0, helper_1.asString)(body.title);
        const expiredAt = (0, helper_1.asString)(body.expiredAt);
        const flavor = (0, helper_1.asString)(body.flavor);
        const weight = (0, helper_1.asString)(body.weight);
        const slug = (0, helper_1.toSlug)((0, helper_1.asString)(body.slug) || title);
        const reorder = (0, helper_1.asString)(body.reorder);
        if (title.length < 1 ||
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
            categorySlug.length < 1) {
            return res.status(400).json({ message: "Invalid product payload" });
        }
        const category = await Categories.findBySlug(categorySlug);
        if (!category) {
            return res.status(400).json({ message: "Category not found" });
        }
        if (category.status !== "active") {
            return res.status(400).json({ message: "Category is inactive" });
        }
        const files = req.files ?? [];
        const uploadedImages = files.length > 0 ? await (0, helper_1.uploadManyImagesToImageKit)(files) : [];
        let thumbnail = (0, helper_1.asString)(body.thumbnail);
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
        await Categories.incrementCategoryCount(category.slug, 1);
        return res.status(201).json({
            message: "Product created",
            product: Products.toPublic(row),
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
        const parsed = (0, helper_1.parseUpdateProductBody)(req.body);
        const files = req.files ?? [];
        if (!parsed && files.length === 0) {
            return res.status(400).json({
                message: "Provide at least one valid product field to update",
            });
        }
        const payload = parsed ?? {};
        if (files.length > 0) {
            const uploadedImages = await (0, helper_1.uploadManyImagesToImageKit)(files);
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
            payload.slug = (0, helper_1.toSlug)(payload.title);
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
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}
