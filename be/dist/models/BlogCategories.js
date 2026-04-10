"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureIndexes = ensureIndexes;
exports.listBlogCategories = listBlogCategories;
exports.findById = findById;
exports.findBySlug = findBySlug;
exports.createBlogCategory = createBlogCategory;
exports.updateBlogCategory = updateBlogCategory;
exports.deleteBlogCategory = deleteBlogCategory;
exports.toPublic = toPublic;
const mongoose_1 = require("mongoose");
const blogCategorySchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active",
    },
}, { timestamps: true, collection: "blog_categories" });
const BlogCategoryModel = mongoose_1.models.BlogCategory ||
    (0, mongoose_1.model)("BlogCategory", blogCategorySchema);
function normalizeSlug(slug) {
    return String(slug || "")
        .trim()
        .toLowerCase();
}
async function ensureIndexes() {
    await BlogCategoryModel.syncIndexes();
}
async function listBlogCategories() {
    const docs = await BlogCategoryModel.find().sort({ updatedAt: -1 }).lean();
    return docs;
}
async function findById(id) {
    if (!mongoose_1.Types.ObjectId.isValid(id))
        return null;
    const doc = await BlogCategoryModel.findById(id).lean();
    return doc;
}
async function findBySlug(slug) {
    const doc = await BlogCategoryModel.findOne({
        slug: normalizeSlug(slug),
    }).lean();
    return doc;
}
async function createBlogCategory(input) {
    const created = await BlogCategoryModel.create({
        name: String(input.name || "").trim(),
        slug: normalizeSlug(input.slug),
        status: input.status === "inactive" ? "inactive" : "active",
    });
    return created.toObject();
}
async function updateBlogCategory(id, input) {
    if (!mongoose_1.Types.ObjectId.isValid(id))
        return null;
    const $set = {};
    if (input.name !== undefined) {
        $set.name = String(input.name || "").trim();
    }
    if (input.slug !== undefined) {
        $set.slug = normalizeSlug(input.slug);
    }
    if (input.status !== undefined) {
        $set.status = input.status === "inactive" ? "inactive" : "active";
    }
    if (Object.keys($set).length === 0) {
        return findById(id);
    }
    const updated = await BlogCategoryModel.findByIdAndUpdate(id, { $set }, { new: true, runValidators: true }).lean();
    return updated;
}
async function deleteBlogCategory(id) {
    if (!mongoose_1.Types.ObjectId.isValid(id))
        return false;
    const result = await BlogCategoryModel.findByIdAndDelete(id);
    return result !== null;
}
function toPublic(category) {
    if (!category)
        return null;
    return {
        _id: String(category._id || ""),
        name: category.name,
        slug: category.slug,
        status: category.status,
        createdAt: category.createdAt,
        updatedAt: category.updatedAt,
    };
}
