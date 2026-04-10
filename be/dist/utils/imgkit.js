"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isImageKitConfigured = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const imagekit_1 = __importDefault(require("imagekit"));
dotenv_1.default.config({ path: ".env" });
const publicKey = process.env.IMGEKIT_PUBLIC_KEY;
const privateKey = process.env.IMGEKIT_PRIVATE_KEY;
const urlEndpoint = process.env.IMGEKIT_URL_ENDPOINT;
exports.isImageKitConfigured = Boolean(publicKey && privateKey && urlEndpoint);
const imagekitInstance = exports.isImageKitConfigured
    ? new imagekit_1.default({
        publicKey,
        privateKey,
        urlEndpoint,
    })
    : null;
exports.default = imagekitInstance;
