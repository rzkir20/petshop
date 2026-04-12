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
const helper_1 = require("../hooks/helper");
const Testimonials = __importStar(require("../models/Testimonials"));
function parseBoolean(value) {
    if (value === undefined || value === null)
        return undefined;
    if (typeof value === "boolean")
        return value;
    const s = String(value).trim().toLowerCase();
    if (s === "true" || s === "1")
        return true;
    if (s === "false" || s === "0")
        return false;
    return undefined;
}
function parseUpdateBody(body) {
    if (!body || typeof body !== "object")
        return null;
    const b = body;
    const out = {};
    let any = false;
    if ("avatar" in b) {
        out.avatar = String(b.avatar ?? "").trim();
        any = true;
    }
    if ("description" in b) {
        out.description = String(b.description ?? "").trim();
        any = true;
    }
    if ("name" in b) {
        out.name = String(b.name ?? "").trim();
        any = true;
    }
    if ("role" in b) {
        out.role = String(b.role ?? "").trim();
        any = true;
    }
    if ("isFeatured" in b) {
        const v = parseBoolean(b.isFeatured);
        if (v !== undefined) {
            out.isFeatured = v;
            any = true;
        }
    }
    if ("yearOfExperience" in b) {
        out.yearOfExperience = Number(b.yearOfExperience);
        any = true;
    }
    if ("rating" in b) {
        out.rating = Number(b.rating);
        any = true;
    }
    return any ? out : null;
}
async function resolveAvatarUrl(req) {
    const file = req.file;
    if (file?.buffer?.length) {
        return (0, helper_1.uploadImageToImageKit)(file, { folder: "/testimonials" });
    }
    const body = (req.body || {});
    const url = String(body.avatar ?? "").trim();
    return url.length > 0 ? url : null;
}
async function list(_req, res) {
    try {
        await Testimonials.ensureIndexes();
        const rows = await Testimonials.listTestimonials();
        return res.status(200).json({
            testimonials: rows.map((t) => Testimonials.toPublic(t)),
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
        const row = await Testimonials.findById(String(id || ""));
        if (!row) {
            return res.status(404).json({ message: "Testimonial not found" });
        }
        return res.status(200).json({ testimonial: Testimonials.toPublic(row) });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}
async function create(req, res) {
    try {
        await Testimonials.ensureIndexes();
        const body = (req.body || {});
        let avatarUrl;
        try {
            const resolved = await resolveAvatarUrl(req);
            if (!resolved) {
                return res.status(400).json({
                    message: 'Wajib mengunggah gambar avatar (multipart field "avatar") atau kirim "avatar" berisi URL gambar',
                });
            }
            avatarUrl = resolved;
        }
        catch (err) {
            if (err instanceof Error &&
                err.message === "ImageKit is not configured") {
                return res.status(500).json({ message: "ImageKit is not configured" });
            }
            throw err;
        }
        const isFeatured = parseBoolean(body.isFeatured) ?? false;
        const yearOfExperience = body.yearOfExperience === undefined || body.yearOfExperience === null
            ? undefined
            : Number(body.yearOfExperience);
        const rating = body.rating === undefined || body.rating === null
            ? undefined
            : Number(body.rating);
        const row = await Testimonials.createTestimonial({
            avatar: avatarUrl,
            description: String(body.description || "").trim(),
            name: String(body.name || "").trim(),
            role: String(body.role || "").trim(),
            isFeatured,
            yearOfExperience,
            rating,
        });
        return res.status(201).json({
            message: "Testimonial created",
            testimonial: Testimonials.toPublic(row),
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}
async function update(req, res) {
    try {
        const { id } = req.params;
        let uploadedAvatar;
        try {
            const file = req.file;
            if (file?.buffer?.length) {
                uploadedAvatar = await (0, helper_1.uploadImageToImageKit)(file, {
                    folder: "/testimonials",
                });
            }
        }
        catch (err) {
            if (err instanceof Error &&
                err.message === "ImageKit is not configured") {
                return res.status(500).json({ message: "ImageKit is not configured" });
            }
            throw err;
        }
        const parsed = parseUpdateBody(req.body);
        const merged = { ...(parsed ?? {}) };
        if (uploadedAvatar) {
            merged.avatar = uploadedAvatar;
        }
        if (Object.keys(merged).length === 0) {
            return res.status(400).json({
                message: "Kirim minimal satu perubahan: unggah avatar (field \"avatar\") atau field JSON lain (description, name, role, isFeatured, yearOfExperience, rating)",
            });
        }
        if (merged.avatar !== undefined && merged.avatar.length === 0) {
            return res.status(400).json({ message: "avatar cannot be empty" });
        }
        if (merged.description !== undefined && merged.description.length === 0) {
            return res.status(400).json({ message: "description cannot be empty" });
        }
        if (merged.name !== undefined && merged.name.length === 0) {
            return res.status(400).json({ message: "name cannot be empty" });
        }
        if (merged.role !== undefined && merged.role.length === 0) {
            return res.status(400).json({ message: "role cannot be empty" });
        }
        const existing = await Testimonials.findById(String(id || ""));
        if (!existing) {
            return res.status(404).json({ message: "Testimonial not found" });
        }
        const row = await Testimonials.updateTestimonial(String(id || ""), merged);
        if (!row) {
            return res.status(404).json({ message: "Testimonial not found" });
        }
        return res.status(200).json({
            message: "Testimonial updated",
            testimonial: Testimonials.toPublic(row),
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}
async function remove(req, res) {
    try {
        const { id } = req.params;
        const ok = await Testimonials.deleteTestimonial(String(id || ""));
        if (!ok) {
            return res.status(404).json({ message: "Testimonial not found" });
        }
        return res.status(200).json({ message: "Testimonial deleted" });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}
