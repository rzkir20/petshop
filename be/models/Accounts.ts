import { InferSchemaType, Model, model, models, Schema, Types } from "mongoose";

const accountSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    pictures: { type: String, default: "" },
    phone: { type: String, default: "" },
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

export async function findByEmailExcludingId(
  email: string,
  excludeId: string,
): Promise<AccountDocument | null> {
  const doc = await AccountModel.findOne({
    email: normalizeEmail(email),
    _id: { $ne: excludeId },
  }).lean();
  return doc as AccountDocument | null;
}

export type UpdateAccountProfileInput = {
  name?: string;
  email?: string;
  pictures?: string;
  phone?: string;
};

export async function updateProfile(
  id: string,
  input: UpdateAccountProfileInput,
): Promise<AccountDocument | null> {
  if (!Types.ObjectId.isValid(id)) return null;

  const $set: Record<string, string> = {};
  if (input.name !== undefined) {
    $set.name = String(input.name || "").trim();
  }
  if (input.email !== undefined) {
    $set.email = normalizeEmail(input.email);
  }
  if (input.pictures !== undefined) {
    $set.pictures = String(input.pictures ?? "").trim();
  }
  if (input.phone !== undefined) {
    $set.phone = String(input.phone ?? "").trim();
  }

  if (Object.keys($set).length === 0) return findById(id);

  const updated = await AccountModel.findByIdAndUpdate(id, { $set }, { new: true }).lean();
  return updated as AccountDocument | null;
}

export async function updatePasswordHash(
  id: string,
  hashedPassword: string,
): Promise<AccountDocument | null> {
  if (!Types.ObjectId.isValid(id)) return null;
  const updated = await AccountModel.findByIdAndUpdate(
    id,
    { $set: { password: hashedPassword } },
    { new: true },
  ).lean();
  return updated as AccountDocument | null;
}

export async function createAccount(
  input: CreateAccountInput,
): Promise<AccountDocument> {
  const doc: AccountBase = {
    name: String(input.name || "").trim(),
    email: normalizeEmail(input.email),
    password: input.password,
    pictures: input.pictures || "",
    phone: input.phone != null ? String(input.phone).trim() : "",
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
    phone: (account as { phone?: string }).phone || "",
    createdAt: account.createdAt,
    updatedAt: account.updatedAt,
  };
}
