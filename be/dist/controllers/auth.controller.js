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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = signup;
exports.signin = signin;
exports.signout = signout;
exports.session = session;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Accounts = __importStar(require("../models/Accounts"));
const password_1 = require("../utils/password");
function getJwtCookieOptions() {
    const isProduction = process.env.NODE_ENV === "production";
    return {
        httpOnly: true,
        sameSite: isProduction ? "none" : "lax",
        secure: isProduction,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: "/",
    };
}
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
            password: (0, password_1.hashPassword)(String(password || "")),
            pictures: avatar,
        });
        const publicUser = Accounts.toPublic(account);
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            return res.status(500).json({ message: "JWT_SECRET is not configured" });
        }
        const token = jsonwebtoken_1.default.sign({
            sub: publicUser?._id,
            email: publicUser?.email,
            name: publicUser?.name,
        }, secret, { expiresIn: "7d" });
        res.cookie("session", token, getJwtCookieOptions());
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
        if (!account || !(0, password_1.verifyPassword)(String(password || ""), account.password)) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const publicUser = Accounts.toPublic(account);
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            return res.status(500).json({ message: "JWT_SECRET is not configured" });
        }
        const token = jsonwebtoken_1.default.sign({
            sub: publicUser?._id,
            email: publicUser?.email,
            name: publicUser?.name,
        }, secret, { expiresIn: "7d" });
        res.cookie("session", token, getJwtCookieOptions());
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
    res.clearCookie("session", getJwtCookieOptions());
    return res.status(200).json({ message: "Signout successful" });
}
async function session(req, res) {
    try {
        const token = req.cookies?.session;
        const secret = process.env.JWT_SECRET;
        if (!token || !secret) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const payload = jsonwebtoken_1.default.verify(token, secret);
        return res.status(200).json({
            user: {
                _id: String(payload.sub || ""),
                email: String(payload.email || ""),
                name: String(payload.name || ""),
            },
        });
    }
    catch (_err) {
        return res.status(401).json({ message: "Unauthorized" });
    }
}
