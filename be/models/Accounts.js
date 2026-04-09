const { ObjectId } = require("mongodb");

const { getDb } = require("../utils/mongodb.js");

const COLLECTION = "accounts";

function normalizeEmail(email) {
  return String(email || "")
    .trim()
    .toLowerCase();
}

async function ensureIndexes() {
  const db = await getDb();
  const col = db.collection(COLLECTION);
  // Avoid crashing if index already exists
  try {
    await col.createIndex({ email: 1 }, { unique: true });
  } catch (_) {
    // ignore
  }
}

async function findByEmail(email) {
  const db = await getDb();
  return db.collection(COLLECTION).findOne({ email: normalizeEmail(email) });
}

async function findById(id) {
  const db = await getDb();
  const _id = typeof id === "string" ? new ObjectId(id) : id;
  return db.collection(COLLECTION).findOne({ _id });
}

async function createAccount({ name, email, password, pictures }) {
  const db = await getDb();
  const now = new Date();
  const doc = {
    name: String(name || "").trim(),
    email: normalizeEmail(email),
    password, // hashed password string
    pictures: pictures || "",
    createdAt: now,
    updatedAt: now,
  };

  const res = await db.collection(COLLECTION).insertOne(doc);
  return { ...doc, _id: res.insertedId };
}

function toPublic(account) {
  if (!account) return null;
  return {
    _id: String(account._id),
    name: account.name,
    email: account.email,
    pictures: account.pictures || "",
    createdAt: account.createdAt,
    updatedAt: account.updatedAt,
  };
}

module.exports = {
  ensureIndexes,
  findByEmail,
  findById,
  createAccount,
  toPublic,
};
