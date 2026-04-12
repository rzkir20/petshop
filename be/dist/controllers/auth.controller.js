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
exports.signup = signup;
exports.signin = signin;
exports.signout = signout;
exports.session = session;
exports.patchProfile = patchProfile;
exports.uploadProfilePicture = uploadProfilePicture;
exports.changePassword = changePassword;
const Accounts = __importStar(require("../models/Accounts"));
const auth_input_1 = require("../utils/auth-input");
const password_1 = require("../utils/password");
const helper_1 = require("../hooks/helper");
async function signup(req, res) {
    try {
        const { name, email, password, pictures } = (req.body || {});
        await Accounts.ensureIndexes();
        const existing = await Accounts.findByEmail(String(email || ""));
        if (existing) {
            return res.status(409).json({ message: "Email already registered" });
        }
        const avatar = pictures ||
            `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(String(name || "").trim())}`;
        const account = await Accounts.createAccount({
            name: String(name || ""),
            email: String(email || ""),
            password: (0, password_1.hashPassword)((0, auth_input_1.normalizePasswordInput)(password)),
            pictures: avatar,
        });
        const publicUser = Accounts.toPublic(account);
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            return res.status(500).json({ message: "JWT_SECRET is not configured" });
        }
        (0, helper_1.issueSessionCookie)(res, publicUser);
        return res.status(201).json({
            message: "Signup successful",
            user: publicUser,
        });
    }
    catch (err) {
        if (typeof err === "object" &&
            err !== null &&
            "code" in err &&
            err.code === 11000) {
            return res.status(409).json({ message: "Email already registered" });
        }
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}
async function signin(req, res) {
    try {
        const { email, password } = (req.body || {});
        const account = await Accounts.findByEmail(String(email || ""));
        const plain = (0, auth_input_1.normalizePasswordInput)(password);
        if (!account || !(0, password_1.verifyPassword)(plain, account.password)) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const publicUser = Accounts.toPublic(account);
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            return res.status(500).json({ message: "JWT_SECRET is not configured" });
        }
        (0, helper_1.issueSessionCookie)(res, publicUser);
        return res.status(200).json({
            message: "Signin successful",
            user: publicUser,
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}
function signout(_req, res) {
    res.clearCookie("session", (0, helper_1.getJwtClearCookieOptions)());
    return res.status(200).json({ message: "Signout successful" });
}
async function session(req, res) {
    try {
        const userId = (0, helper_1.getAuthenticatedUserId)(req);
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const account = await Accounts.findById(userId);
        if (!account) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const publicUser = Accounts.toPublic(account);
        if (!publicUser) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        return res.status(200).json({ user: publicUser });
    }
    catch (_err) {
        return res.status(401).json({ message: "Unauthorized" });
    }
}
async function patchProfile(req, res) {
    try {
        const userId = (0, helper_1.getAuthenticatedUserId)(req);
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const body = (req.body || {});
        const hasUpdate = body.name !== undefined ||
            body.email !== undefined ||
            body.pictures !== undefined ||
            body.phone !== undefined;
        if (!hasUpdate) {
            return res.status(400).json({ message: "No fields to update" });
        }
        const existing = await Accounts.findById(userId);
        if (!existing) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        if (body.email !== undefined) {
            const normalized = String(body.email || "").trim().toLowerCase();
            if (normalized !== existing.email) {
                const taken = await Accounts.findByEmailExcludingId(body.email, userId);
                if (taken) {
                    return res.status(409).json({ message: "Email already in use" });
                }
            }
        }
        const updated = await Accounts.updateProfile(userId, {
            name: body.name,
            email: body.email,
            pictures: body.pictures,
            phone: body.phone,
        });
        if (!updated) {
            return res.status(500).json({ message: "Failed to update profile" });
        }
        const publicUser = Accounts.toPublic(updated);
        if (!publicUser) {
            return res.status(500).json({ message: "Failed to update profile" });
        }
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            return res.status(500).json({ message: "JWT_SECRET is not configured" });
        }
        (0, helper_1.issueSessionCookie)(res, publicUser);
        return res.status(200).json({
            message: "Profile updated",
            user: publicUser,
        });
    }
    catch (err) {
        if (typeof err === "object" &&
            err !== null &&
            "code" in err &&
            err.code === 11000) {
            return res.status(409).json({ message: "Email already in use" });
        }
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}
async function uploadProfilePicture(req, res) {
    try {
        const userId = (0, helper_1.getAuthenticatedUserId)(req);
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const file = req.file;
        if (!file?.buffer?.length) {
            return res.status(400).json({ message: "No image file provided" });
        }
        const url = await (0, helper_1.uploadImageToImageKit)(file, { folder: "/avatars" });
        const updated = await Accounts.updateProfile(userId, { pictures: url });
        if (!updated) {
            return res.status(500).json({ message: "Failed to update profile" });
        }
        const publicUser = Accounts.toPublic(updated);
        if (!publicUser) {
            return res.status(500).json({ message: "Failed to update profile" });
        }
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            return res.status(500).json({ message: "JWT_SECRET is not configured" });
        }
        (0, helper_1.issueSessionCookie)(res, publicUser);
        return res.status(200).json({
            message: "Profile picture updated",
            user: publicUser,
        });
    }
    catch (err) {
        if (err instanceof Error &&
            err.message === "ImageKit is not configured") {
            return res
                .status(503)
                .json({ message: "ImageKit is not configured" });
        }
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}
async function changePassword(req, res) {
    try {
        const userId = (0, helper_1.getAuthenticatedUserId)(req);
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const { currentPassword, newPassword } = (req.body || {});
        const cur = (0, auth_input_1.normalizePasswordInput)(currentPassword);
        const next = (0, auth_input_1.normalizePasswordInput)(newPassword);
        if (next === cur) {
            return res.status(400).json({
                message: "New password must be different from current password",
            });
        }
        const account = await Accounts.findById(userId);
        if (!account) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        if (!(0, password_1.verifyPassword)(cur, account.password)) {
            return res.status(403).json({ message: "Current password is incorrect" });
        }
        const updated = await Accounts.updatePasswordHash(userId, (0, password_1.hashPassword)(next));
        if (!updated) {
            return res.status(500).json({ message: "Failed to update password" });
        }
        res.clearCookie("session", (0, helper_1.getJwtClearCookieOptions)());
        return res.status(200).json({ message: "Password updated" });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}
