import { InferSchemaType, Model, model, models, Schema, Types } from "mongoose";

const accountSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    pictures: { type: String, default: "" },
  },
  { timestamps: true, collection: "accounts" },
);

const AccountModel =
  (models.Account as Model<InferSchemaType<typeof accountSchema>>) ||
  model("Account", accountSchema);

function normalizeEmail(email: string): string {
  return String(email || "")
    .trim()
    .toLowerCase();
}

export async function ensureIndexes(): Promise<void> {
  await AccountModel.syncIndexes();
}

export async function findByEmail(
  email: string,
): Promise<AccountDocument | null> {
  const doc = await AccountModel.findOne({ email: normalizeEmail(email) }).lean();
  return doc as AccountDocument | null;
}

export async function findById(
  id: string,
): Promise<AccountDocument | null> {
  const doc = await AccountModel.findById(id).lean();
  return doc as AccountDocument | null;
}

export async function createAccount(
  input: CreateAccountInput,
): Promise<AccountDocument> {
  const doc: AccountBase = {
    name: String(input.name || "").trim(),
    email: normalizeEmail(input.email),
    password: input.password,
    pictures: input.pictures || "",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const created = await AccountModel.create(doc);
  return created.toObject() as AccountDocument;
}

export function toPublic(account: AccountDocument | null) {
  if (!account) return null;
  return {
    _id: String(account._id || ""),
    name: account.name,
    email: account.email,
    pictures: account.pictures || "",
    createdAt: account.createdAt,
    updatedAt: account.updatedAt,
  };
}
