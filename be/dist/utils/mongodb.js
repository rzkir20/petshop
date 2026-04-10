"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = connectToDatabase;
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const mongodb_1 = require("mongodb");
dotenv_1.default.config({ path: ".env" });
if (!process.env.MONGO_DB_SERVER) {
    throw new Error("Please add your MongoDB URI to .env.local");
}
const uri = process.env.MONGO_DB_SERVER;
const options = {};
const dbName = process.env.MONGO_DB_NAME || "pawsomeshop";
let client;
let clientPromise;
if (process.env.NODE_ENV === "development") {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    const globalWithMongo = global;
    if (!globalWithMongo._mongoClientPromise) {
        client = new mongodb_1.MongoClient(uri, options);
        globalWithMongo._mongoClientPromise = client.connect();
    }
    clientPromise = globalWithMongo._mongoClientPromise;
}
else {
    // In production mode, it's best to not use a global variable.
    client = new mongodb_1.MongoClient(uri, options);
    clientPromise = client.connect();
}
// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
exports.default = clientPromise;
async function connectToDatabase() {
    if (mongoose_1.default.connection.readyState !== 1) {
        try {
            await mongoose_1.default.connect(uri);
            console.log("Mongoose connected successfully");
        }
        catch (error) {
            console.error("Mongoose connection error:", error);
            throw error;
        }
    }
    const client = await clientPromise;
    const db = client.db(dbName);
    return { db, client };
}
