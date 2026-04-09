const dotenv = require("dotenv");
const { MongoClient } = require("mongodb");

// Load .env when this module is imported (safe if already loaded)
dotenv.config({ path: ".env" });

let _client = null;
let _db = null;

function getMongoUri() {
  const uri = process.env.MONGO_SERVER;
  if (!uri) {
    throw new Error("Missing env MONGO_SERVER");
  }
  return uri;
}

async function connectMongo() {
  if (_db && _client) return { client: _client, db: _db };

  const uri = getMongoUri();
  const client = new MongoClient(uri);
  await client.connect();

  // If db name is included in URI, MongoClient picks it; otherwise default to pawsomeshop.
  const dbNameFromEnv = process.env.MONGO_DB;
  const db = client.db(dbNameFromEnv || undefined);

  _client = client;
  _db = db;

  return { client, db };
}

async function getDb() {
  const { db } = await connectMongo();
  return db;
}

async function closeMongo() {
  if (_client) {
    await _client.close();
  }
  _client = null;
  _db = null;
}

module.exports = {
  connectMongo,
  getDb,
  closeMongo,
};
