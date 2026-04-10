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
const imgkit_1 = __importStar(require("../utils/imgkit"));
const STOCK_STATUS_VALUES = ["in-stock", "low-stock", "out-of-stock"];
function asString(value) {
    return String(value ?? "").trim();
}
function asNumber(value) {
    if (typeof value === "number")
        return value;
    if (typeof value === "string")
        return Number(value);
    return Number.NaN;
}
function asBoolean(value) {
    if (typeof value === "boolean")
        return value;
    if (typeof value === "string") {
        if (value === "true")
            return true;
        if (value === "false")
            return false;
    }
    return null;
}
function toSlug(value) {
    return String(value || "")
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]+/g, "")
        .replace(/-+/g, "-")
        .replace(/^-+|-+$/g, "");
}
async function uploadImageToImageKit(file) {
    if (!imgkit_1.isImageKitConfigured || !imgkit_1.default) {
        throw new Error("ImageKit is not configured");
    }
    const upload = await imgkit_1.default.upload({
        file: file.buffer.toString("base64"),
        fileName: `${Date.now()}-${file.originalname || "product-image"}`,
        folder: "/products",
    });
    return String(upload.url || "");
}
async function uploadManyImagesToImageKit(files) {
    const urls = await Promise.all(files.map((file) => uploadImageToImageKit(file)));
    return urls.filter(Boolean);
}
function parseUpdateBody(body) {
    const b = (body || {});
    const out = {};
    if ("title" in b) {
        const title = asString(b.title);
        if (title.length < 1)
            return null;
        out.title = title;
    }
    if ("slug" in b) {
        const slug = toSlug(asString(b.slug));
        if (slug.length < 1)
            return null;
        out.slug = slug;
    }
    if ("expiredAt" in b) {
        const expiredAt = asString(b.expiredAt);
        if (expiredAt.length < 1)
            return null;
        out.expiredAt = expiredAt;
    }
    if ("flavor" in b) {
        const flavor = asString(b.flavor);
        if (flavor.length < 1)
            return null;
        out.flavor = flavor;
    }
    if ("weight" in b) {
        const weight = asString(b.weight);
        if (weight.length < 1)
            return null;
        out.weight = weight;
    }
    if ("thumbnail" in b) {
        out.thumbnail = asString(b.thumbnail);
    }
    if ("images" in b) {
        if (Array.isArray(b.images)) {
            out.images = b.images.map((v) => asString(v)).filter(Boolean);
        }
        else if (typeof b.images === "string") {
            try {
                const parsed = JSON.parse(b.images);
                if (!Array.isArray(parsed))
                    return null;
                out.images = parsed.map((v) => asString(v)).filter(Boolean);
            }
            catch {
                return null;
            }
        }
        else {
            return null;
        }
    }
    if ("price" in b) {
        const price = asNumber(b.price);
        if (!Number.isFinite(price) || price < 0)
            return null;
        out.price = price;
    }
    if ("content" in b) {
        const content = asString(b.content);
        if (content.length < 1)
            return null;
        out.content = content;
    }
    if ("isBestSeller" in b) {
        const isBestSeller = asBoolean(b.isBestSeller);
        if (isBestSeller === null)
            return null;
        out.isBestSeller = isBestSeller;
    }
    if ("stockCurrent" in b) {
        const stockCurrent = asNumber(b.stockCurrent);
        if (!Number.isFinite(stockCurrent) || stockCurrent < 0)
            return null;
        out.stockCurrent = stockCurrent;
    }
    if ("stockMax" in b) {
        const stockMax = asNumber(b.stockMax);
        if (!Number.isFinite(stockMax) || stockMax < 0)
            return null;
        out.stockMax = stockMax;
    }
    if ("reorder" in b) {
        const reorder = asString(b.reorder);
        if (reorder.length < 1)
            return null;
        out.reorder = reorder;
    }
    if ("status" in b) {
        if (!STOCK_STATUS_VALUES.includes(asString(b.status)))
            return null;
        out.status = asString(b.status);
    }
    if ("category" in b) {
        const category = asString(b.category).toLowerCase();
        if (category.length < 1)
            return null;
        out.category = category;
    }
    if (Object.keys(out).length === 0)
        return null;
    return out;
}
async function list(req, res) {
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
        const categorySlug = asString(body.category).toLowerCase();
        const status = asString(body.status);
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
        const uploadedImages = files.length > 0 ? await uploadManyImagesToImageKit(files) : [];
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
        const parsed = parseUpdateBody(req.body);
        const files = req.files ?? [];
        if (!parsed && files.length === 0) {
            return res.status(400).json({
                message: "Provide at least one valid product field to update",
            });
        }
        const payload = parsed ?? {};
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
        const ok = await Products.deleteProduct(String(id || ""));
        if (!ok) {
            return res.status(404).json({ message: "Product not found" });
        }
        return res.status(200).json({ message: "Product deleted" });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}
