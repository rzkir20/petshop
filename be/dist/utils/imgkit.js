"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const imagekit_1 = __importDefault(require("imagekit"));
dotenv_1.default.config({ path: ".env" });
const imagekitInstance = new imagekit_1.default({
    publicKey: process.env.IMGKIT_PUBLIC_KEY || "",
    privateKey: process.env.IMGKIT_PRIVATE_KEY || "",
    urlEndpoint: process.env.IMGKIT_URL_ENDPOINT || "",
});
exports.default = imagekitInstance;
