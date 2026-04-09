"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = hashPassword;
const crypto_js_1 = __importDefault(require("crypto-js"));
function hashPassword(password) {
    const iterations = 150000;
    const salt = crypto_js_1.default.lib.WordArray.random(16);
    const key = crypto_js_1.default.PBKDF2(String(password), salt, {
        keySize: 64 / 4,
        iterations,
        hasher: crypto_js_1.default.algo.SHA256,
    });
    return `pbkdf2$${iterations}$${salt.toString(crypto_js_1.default.enc.Hex)}$${key.toString(crypto_js_1.default.enc.Hex)}`;
}
