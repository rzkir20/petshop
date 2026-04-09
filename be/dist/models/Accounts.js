"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureIndexes = ensureIndexes;
exports.findByEmail = findByEmail;
exports.findById = findById;
exports.createAccount = createAccount;
exports.toPublic = toPublic;
const mongoose_1 = require("mongoose");
const accountSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    pictures: { type: String, default: "" },
}, { timestamps: true, collection: "accounts" });
const AccountModel = mongoose_1.models.Account ||
    (0, mongoose_1.model)("Account", accountSchema);
function normalizeEmail(email) {
    return String(email || "")
        .trim()
        .toLowerCase();
}
async function ensureIndexes() {
    await AccountModel.syncIndexes();
}
async function findByEmail(email) {
    const doc = await AccountModel.findOne({ email: normalizeEmail(email) }).lean();
    return doc;
}
async function findById(id) {
    const doc = await AccountModel.findById(id).lean();
    return doc;
}
async function createAccount(input) {
    const doc = {
        name: String(input.name || "").trim(),
        email: normalizeEmail(input.email),
        password: input.password,
        pictures: input.pictures || "",
        createdAt: new Date(),
        updatedAt: new Date(),
    };
    const created = await AccountModel.create(doc);
    return created.toObject();
}
function toPublic(account) {
    if (!account)
        return null;
    return {
        _id: String(account._id || ""),
        name: account.name,
        email: account.email,
        pictures: account.pictures || "",
        createdAt: account.createdAt,
        updatedAt: account.updatedAt,
    };
}
