"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureIndexes = ensureIndexes;
exports.listBlogs = listBlogs;
exports.findById = findById;
exports.findBySlug = findBySlug;
exports.createBlog = createBlog;
exports.updateBlog = updateBlog;
exports.deleteBlog = deleteBlog;
exports.toPublic = toPublic;
const mongoose_1 = require("mongoose");
const authorSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    pictures: { type: String, trim: true, default: "" },
}, { _id: false });
const blogSchema = new mongoose_1.Schema({
    title: { type: String, required: true, trim: true },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    thumbnail: { type: String, trim: true, default: "" },
    description: { type: String, trim: true, default: "" },
    content: { type: String, trim: true, default: "" },
    status: {
        type: String,
        enum: ["published", "draft"],
        default: "draft",
    },
    category: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "BlogCategory",
        required: true,
    },
    author: { type: authorSchema, required: true },
}, { timestamps: true, collection: "blogs" });
const BlogModel = mongoose_1.models.Blog ||
    (0, mongoose_1.model)("Blog", blogSchema);
const CATEGORY_POPULATE_SELECT = "slug name status";
function normalizeSlug(slug) {
    return String(slug || "")
        .trim()
        .toLowerCase();
}
async function ensureIndexes() {
    await BlogModel.syncIndexes();
}
async function listBlogs(filters) {
    const q = {};
    if (filters?.categoryId && mongoose_1.Types.ObjectId.isValid(filters.categoryId)) {
        q.category = new mongoose_1.Types.ObjectId(filters.categoryId);
    }
    if (filters?.status === "published" || filters?.status === "draft") {
        q.status = filters.status;
    }
    const docs = await BlogModel.find(q)
        .populate("category", CATEGORY_POPULATE_SELECT)
        .sort({ updatedAt: -1 })
        .lean();
    return docs;
}
async function findById(id) {
    if (!mongoose_1.Types.ObjectId.isValid(id))
        return null;
    const doc = await BlogModel.findById(id)
        .populate("category", CATEGORY_POPULATE_SELECT)
        .lean();
    return doc;
}
async function findBySlug(slug) {
    const doc = await BlogModel.findOne({ slug: normalizeSlug(slug) })
        .populate("category", CATEGORY_POPULATE_SELECT)
        .lean();
    return doc;
}
async function createBlog(data) {
    const created = await BlogModel.create({
        title: String(data.title || "").trim(),
        slug: normalizeSlug(data.slug),
        thumbnail: String(data.thumbnail ?? "").trim(),
        description: String(data.description ?? "").trim(),
        content: String(data.content ?? "").trim(),
        status: data.status === "published" ? "published" : "draft",
        category: data.category,
        author: {
            name: String(data.author?.name || "").trim(),
            pictures: String(data.author?.pictures ?? "").trim(),
        },
    });
    const populated = await BlogModel.findById(created._id)
        .populate("category", CATEGORY_POPULATE_SELECT)
        .lean();
    return populated;
}
async function updateBlog(id, input) {
    if (!mongoose_1.Types.ObjectId.isValid(id))
        return null;
    const $set = {};
    if (input.title !== undefined) {
        $set.title = String(input.title || "").trim();
    }
    if (input.slug !== undefined) {
        $set.slug = normalizeSlug(input.slug);
    }
    if (input.thumbnail !== undefined) {
        $set.thumbnail = String(input.thumbnail).trim();
    }
    if (input.description !== undefined) {
        $set.description = String(input.description).trim();
    }
    if (input.content !== undefined) {
        $set.content = String(input.content).trim();
    }
    if (input.status !== undefined) {
        $set.status = input.status === "published" ? "published" : "draft";
    }
    if (input.category !== undefined) {
        $set.category = input.category;
    }
    if (input.author !== undefined) {
        $set.author = {
            name: String(input.author.name || "").trim(),
            pictures: String(input.author.pictures ?? "").trim(),
        };
    }
    if (Object.keys($set).length === 0) {
        return findById(id);
    }
    await BlogModel.findByIdAndUpdate(id, { $set }, { runValidators: true });
    return findById(id);
}
async function deleteBlog(id) {
    if (!mongoose_1.Types.ObjectId.isValid(id))
        return false;
    const result = await BlogModel.findByIdAndDelete(id);
    return result !== null;
}
function toPublic(doc) {
    if (!doc)
        return null;
    const rawCat = doc.category;
    let categorySlug = "";
    let categoryName;
    if (rawCat && typeof rawCat === "object" && !(rawCat instanceof mongoose_1.Types.ObjectId)) {
        const c = rawCat;
        categorySlug = String(c.slug ?? "");
        if (c.name != null)
            categoryName = String(c.name);
    }
    return {
        _id: String(doc._id || ""),
        title: doc.title,
        slug: doc.slug,
        thumbnail: doc.thumbnail,
        description: doc.description,
        content: doc.content,
        status: doc.status,
        category: categorySlug,
        ...(categoryName !== undefined ? { categoryName } : {}),
        author: {
            name: doc.author.name,
            pictures: doc.author.pictures,
        },
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
    };
}
