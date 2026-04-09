"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDb = connectDb;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./config"));
if (!config_1.default.mongoUri) {
    throw new Error("Please add your MongoDB URI to .env (MONGO_SERVER).");
}
function normalizeMongoUri(rawUri) {
    try {
        const parsed = new URL(rawUri);
        if (parsed.protocol === "mongodb+srv:" && parsed.port) {
            parsed.port = "";
            return parsed.toString();
        }
    }
    catch (_err) {
        // Let MongoDB driver validate malformed URI with detailed errors.
    }
    return rawUri;
}
const uri = normalizeMongoUri(config_1.default.mongoUri);
let connectPromise;
async function connectDb() {
    if (!connectPromise) {
        connectPromise = mongoose_1.default.connect(uri);
    }
    return connectPromise;
}
