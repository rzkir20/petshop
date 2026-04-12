"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureIndexes = ensureIndexes;
exports.listTestimonials = listTestimonials;
exports.findById = findById;
exports.createTestimonial = createTestimonial;
exports.updateTestimonial = updateTestimonial;
exports.deleteTestimonial = deleteTestimonial;
exports.toPublic = toPublic;
const mongoose_1 = require("mongoose");
const testimonialSchema = new mongoose_1.Schema({
    avatar: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    isFeatured: { type: Boolean, default: false },
    yearOfExperience: { type: Number, min: 0, default: 0 },
    rating: { type: Number, min: 0, max: 5, default: 5 },
}, { timestamps: true, collection: "testimonials" });
testimonialSchema.index({ isFeatured: -1, updatedAt: -1 });
const TestimonialModel = mongoose_1.models.Testimonial ||
    (0, mongoose_1.model)("Testimonial", testimonialSchema);
function clampRating(n) {
    const x = Number(n);
    if (!Number.isFinite(x))
        return 5;
    return Math.min(5, Math.max(0, x));
}
function clampYear(n) {
    const x = Math.floor(Number(n));
    if (!Number.isFinite(x) || x < 0)
        return 0;
    return x;
}
async function ensureIndexes() {
    await TestimonialModel.syncIndexes();
}
async function listTestimonials() {
    const docs = await TestimonialModel.find()
        .sort({ isFeatured: -1, updatedAt: -1 })
        .lean();
    return docs;
}
async function findById(id) {
    if (!mongoose_1.Types.ObjectId.isValid(id))
        return null;
    const doc = await TestimonialModel.findById(id).lean();
    return doc;
}
async function createTestimonial(input) {
    const created = await TestimonialModel.create({
        avatar: String(input.avatar || "").trim(),
        description: String(input.description || "").trim(),
        name: String(input.name || "").trim(),
        role: String(input.role || "").trim(),
        isFeatured: Boolean(input.isFeatured),
        yearOfExperience: clampYear(input.yearOfExperience),
        rating: clampRating(input.rating),
    });
    return created.toObject();
}
async function updateTestimonial(id, input) {
    if (!mongoose_1.Types.ObjectId.isValid(id))
        return null;
    const $set = {};
    if (input.avatar !== undefined) {
        $set.avatar = String(input.avatar || "").trim();
    }
    if (input.description !== undefined) {
        $set.description = String(input.description || "").trim();
    }
    if (input.name !== undefined) {
        $set.name = String(input.name || "").trim();
    }
    if (input.role !== undefined) {
        $set.role = String(input.role || "").trim();
    }
    if (input.isFeatured !== undefined) {
        $set.isFeatured = Boolean(input.isFeatured);
    }
    if (input.yearOfExperience !== undefined) {
        $set.yearOfExperience = clampYear(input.yearOfExperience);
    }
    if (input.rating !== undefined) {
        $set.rating = clampRating(input.rating);
    }
    if (Object.keys($set).length === 0) {
        return findById(id);
    }
    const updated = await TestimonialModel.findByIdAndUpdate(id, { $set }, { new: true, runValidators: true }).lean();
    return updated;
}
async function deleteTestimonial(id) {
    if (!mongoose_1.Types.ObjectId.isValid(id))
        return false;
    const result = await TestimonialModel.findByIdAndDelete(id);
    return result !== null;
}
function toPublic(row) {
    if (!row)
        return null;
    return {
        _id: String(row._id || ""),
        avatar: row.avatar,
        description: row.description,
        name: row.name,
        role: row.role,
        isFeatured: Boolean(row.isFeatured),
        yearOfExperience: Number(row.yearOfExperience ?? 0),
        rating: Number(row.rating ?? 0),
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
    };
}
