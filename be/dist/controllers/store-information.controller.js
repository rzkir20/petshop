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
exports.get = get;
exports.patch = patch;
const StoreInformation = __importStar(require("../models/StoreInformation"));
function parseUpdateBody(body) {
    if (!body || typeof body !== "object") {
        return { ok: false, message: "Invalid body" };
    }
    const b = body;
    const out = {};
    const str = (k) => b[k] === undefined || b[k] === null ? undefined : String(b[k]).trim();
    if ("storeName" in b)
        out.storeName = str("storeName") ?? "";
    if ("businessEmail" in b)
        out.businessEmail = str("businessEmail") ?? "";
    if ("description" in b)
        out.description = str("description") ?? "";
    if ("storeAddress" in b)
        out.storeAddress = str("storeAddress") ?? "";
    if ("city" in b)
        out.city = str("city") ?? "";
    if ("zipCode" in b)
        out.zipCode = str("zipCode") ?? "";
    if ("businessHoursOpen" in b) {
        out.businessHoursOpen = str("businessHoursOpen") ?? "";
    }
    if ("businessHoursClose" in b) {
        out.businessHoursClose = str("businessHoursClose") ?? "";
    }
    if ("mapEmbedSrc" in b) {
        const raw = b.mapEmbedSrc;
        if (raw === "" || raw === null) {
            out.mapEmbedSrc = "";
        }
        else {
            const u = String(raw).trim();
            if (!StoreInformation.isAllowedGoogleMapsEmbedUrl(u)) {
                return {
                    ok: false,
                    message: "mapEmbedSrc must be a valid Google Maps embed HTTPS URL (e.g. https://www.google.com/maps/embed?pb=...)",
                };
            }
            out.mapEmbedSrc = u;
        }
    }
    else if ("mapIframeHtml" in b) {
        const html = String(b.mapIframeHtml ?? "").trim();
        if (!html) {
            out.mapEmbedSrc = "";
        }
        else {
            const src = StoreInformation.parseMapEmbedInput(null, html);
            if (!src) {
                return {
                    ok: false,
                    message: "Could not find a src URL in mapIframeHtml; paste the full iframe from Google Maps or send mapEmbedSrc directly",
                };
            }
            if (!StoreInformation.isAllowedGoogleMapsEmbedUrl(src)) {
                return {
                    ok: false,
                    message: "Extracted map URL must be a valid Google Maps embed HTTPS URL (www.google.com/maps/embed?...)",
                };
            }
            out.mapEmbedSrc = src;
        }
    }
    const keys = Object.keys(out);
    if (keys.length === 0) {
        return {
            ok: false,
            message: "Provide at least one field: storeName, businessEmail, description, storeAddress, city, zipCode, businessHoursOpen, businessHoursClose, mapEmbedSrc, or mapIframeHtml",
        };
    }
    return { ok: true, value: out };
}
async function get(_req, res) {
    try {
        await StoreInformation.ensureIndexes();
        const row = await StoreInformation.getSingleton();
        const payload = StoreInformation.toPublic(row);
        return res.status(200).json({
            storeInformation: payload ?? StoreInformation.defaultPublicStoreInformation(),
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}
async function patch(req, res) {
    try {
        await StoreInformation.ensureIndexes();
        const parsed = parseUpdateBody(req.body);
        if (!parsed.ok) {
            return res.status(400).json({ message: parsed.message });
        }
        const row = await StoreInformation.upsertSingleton(parsed.value);
        return res.status(200).json({
            message: "Store information updated",
            storeInformation: StoreInformation.toPublic(row),
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}
