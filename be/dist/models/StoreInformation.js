"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAllowedGoogleMapsEmbedUrl = isAllowedGoogleMapsEmbedUrl;
exports.parseMapEmbedInput = parseMapEmbedInput;
exports.ensureIndexes = ensureIndexes;
exports.getSingleton = getSingleton;
exports.upsertSingleton = upsertSingleton;
exports.toPublic = toPublic;
exports.defaultPublicStoreInformation = defaultPublicStoreInformation;
const mongoose_1 = require("mongoose");
const storeInformationSchema = new mongoose_1.Schema({
    storeName: { type: String, trim: true, default: "" },
    businessEmail: { type: String, trim: true, default: "" },
    description: { type: String, trim: true, default: "" },
    storeAddress: { type: String, trim: true, default: "" },
    city: { type: String, trim: true, default: "" },
    zipCode: { type: String, trim: true, default: "" },
    businessHoursOpen: { type: String, trim: true, default: "" },
    businessHoursClose: { type: String, trim: true, default: "" },
    mapEmbedSrc: { type: String, trim: true, default: "" },
}, { timestamps: true, collection: "store_information" });
const StoreInformationModel = mongoose_1.models.StoreInformation || (0, mongoose_1.model)("StoreInformation", storeInformationSchema);
const MAP_EMBED_SRC_MAX_LEN = 2048;
function isAllowedGoogleMapsEmbedUrl(url) {
    const s = String(url || "").trim();
    if (!s || s.length > MAP_EMBED_SRC_MAX_LEN)
        return false;
    try {
        const u = new URL(s);
        if (u.protocol !== "https:")
            return false;
        const host = u.hostname.toLowerCase();
        const okHost = host === "www.google.com" ||
            host === "google.com" ||
            host === "maps.google.com";
        if (!okHost)
            return false;
        return u.pathname === "/maps/embed" || u.pathname.startsWith("/maps/embed/");
    }
    catch {
        return false;
    }
}
/**
 * Accepts a raw embed URL or a full iframe tag; returns trimmed src URL or null.
 */
function parseMapEmbedInput(mapEmbedSrc, mapIframeHtml) {
    const direct = String(mapEmbedSrc ?? "").trim();
    if (direct)
        return direct;
    const html = String(mapIframeHtml ?? "").trim();
    if (!html)
        return null;
    if (/^https?:\/\//i.test(html)) {
        return html;
    }
    const m = /src\s*=\s*["']([^"']+)["']/i.exec(html);
    return m?.[1]?.trim() ?? null;
}
async function ensureIndexes() {
    await StoreInformationModel.syncIndexes();
}
async function getSingleton() {
    const doc = await StoreInformationModel.findOne().lean();
    return doc;
}
async function upsertSingleton(input) {
    const existing = await StoreInformationModel.findOne();
    if (!existing) {
        const created = await StoreInformationModel.create({
            storeName: input.storeName ?? "",
            businessEmail: input.businessEmail ?? "",
            description: input.description ?? "",
            storeAddress: input.storeAddress ?? "",
            city: input.city ?? "",
            zipCode: input.zipCode ?? "",
            businessHoursOpen: input.businessHoursOpen ?? "",
            businessHoursClose: input.businessHoursClose ?? "",
            mapEmbedSrc: input.mapEmbedSrc ?? "",
        });
        return created.toObject();
    }
    const $set = {};
    if (input.storeName !== undefined)
        $set.storeName = String(input.storeName).trim();
    if (input.businessEmail !== undefined) {
        $set.businessEmail = String(input.businessEmail).trim();
    }
    if (input.description !== undefined) {
        $set.description = String(input.description).trim();
    }
    if (input.storeAddress !== undefined) {
        $set.storeAddress = String(input.storeAddress).trim();
    }
    if (input.city !== undefined)
        $set.city = String(input.city).trim();
    if (input.zipCode !== undefined)
        $set.zipCode = String(input.zipCode).trim();
    if (input.businessHoursOpen !== undefined) {
        $set.businessHoursOpen = String(input.businessHoursOpen).trim();
    }
    if (input.businessHoursClose !== undefined) {
        $set.businessHoursClose = String(input.businessHoursClose).trim();
    }
    if (input.mapEmbedSrc !== undefined) {
        $set.mapEmbedSrc = String(input.mapEmbedSrc).trim();
    }
    if (Object.keys($set).length === 0) {
        return existing.toObject();
    }
    const updated = await StoreInformationModel.findByIdAndUpdate(existing._id, { $set }, { new: true, runValidators: true }).lean();
    return updated;
}
function toPublic(doc) {
    if (!doc)
        return null;
    return {
        _id: String(doc._id || ""),
        storeName: String(doc.storeName ?? ""),
        businessEmail: String(doc.businessEmail ?? ""),
        description: String(doc.description ?? ""),
        storeAddress: String(doc.storeAddress ?? ""),
        city: String(doc.city ?? ""),
        zipCode: String(doc.zipCode ?? ""),
        businessHoursOpen: String(doc.businessHoursOpen ?? ""),
        businessHoursClose: String(doc.businessHoursClose ?? ""),
        mapEmbedSrc: String(doc.mapEmbedSrc ?? ""),
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
    };
}
function defaultPublicStoreInformation() {
    const now = new Date();
    return {
        _id: "",
        storeName: "",
        businessEmail: "",
        description: "",
        storeAddress: "",
        city: "",
        zipCode: "",
        businessHoursOpen: "",
        businessHoursClose: "",
        mapEmbedSrc: "",
        createdAt: now,
        updatedAt: now,
    };
}
