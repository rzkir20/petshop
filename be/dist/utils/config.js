"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: ".env" });
const config = {
    mongoUri: process.env.MONGO_SERVER,
    port: Number(process.env.PORT || 3001),
    corsOrigin: process.env.CORS_ORIGIN || "http://localhost:3000",
};
exports.default = config;
