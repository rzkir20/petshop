import {
  InferSchemaType,
  Model,
  model,
  models,
  Schema,
  Types,
} from "mongoose";

const storeInformationSchema = new Schema(
  {
    storeName: { type: String, trim: true, default: "" },
    businessEmail: { type: String, trim: true, default: "" },
    description: { type: String, trim: true, default: "" },
    storeAddress: { type: String, trim: true, default: "" },
    city: { type: String, trim: true, default: "" },
    zipCode: { type: String, trim: true, default: "" },
    businessHoursOpen: { type: String, trim: true, default: "" },
    businessHoursClose: { type: String, trim: true, default: "" },
    mapEmbedSrc: { type: String, trim: true, default: "" },
  },
  { timestamps: true, collection: "store_information" },
);

type StoreInformationDocument = InferSchemaType<typeof storeInformationSchema> & {
  _id?: Types.ObjectId;
};

const StoreInformationModel =
  (models.StoreInformation as Model<
    InferSchemaType<typeof storeInformationSchema>
  >) || model("StoreInformation", storeInformationSchema);

export type UpdateStoreInformationInput = {
  storeName?: string;
  businessEmail?: string;
  description?: string;
  storeAddress?: string;
  city?: string;
  zipCode?: string;
  businessHoursOpen?: string;
  businessHoursClose?: string;
  mapEmbedSrc?: string;
};

const MAP_EMBED_SRC_MAX_LEN = 2048;

export function isAllowedGoogleMapsEmbedUrl(url: string): boolean {
  const s = String(url || "").trim();
  if (!s || s.length > MAP_EMBED_SRC_MAX_LEN) return false;
  try {
    const u = new URL(s);
    if (u.protocol !== "https:") return false;
    const host = u.hostname.toLowerCase();
    const okHost =
      host === "www.google.com" ||
      host === "google.com" ||
      host === "maps.google.com";
    if (!okHost) return false;
    return u.pathname === "/maps/embed" || u.pathname.startsWith("/maps/embed/");
  } catch {
    return false;
  }
}

/**
 * Accepts a raw embed URL or a full iframe tag; returns trimmed src URL or null.
 */
export function parseMapEmbedInput(
  mapEmbedSrc: unknown,
  mapIframeHtml: unknown,
): string | null {
  const direct = String(mapEmbedSrc ?? "").trim();
  if (direct) return direct;

  const html = String(mapIframeHtml ?? "").trim();
  if (!html) return null;

  if (/^https?:\/\//i.test(html)) {
    return html;
  }

  const m = /src\s*=\s*["']([^"']+)["']/i.exec(html);
  return m?.[1]?.trim() ?? null;
}

export async function ensureIndexes(): Promise<void> {
  await StoreInformationModel.syncIndexes();
}

export async function getSingleton(): Promise<StoreInformationDocument | null> {
  const doc = await StoreInformationModel.findOne().lean();
  return doc as StoreInformationDocument | null;
}

export async function upsertSingleton(
  input: UpdateStoreInformationInput,
): Promise<StoreInformationDocument> {
  const existing = await StoreInformationModel.findOne();
  if (!existing) {
    const created = await StoreInformationModel.create({
      storeName: input.storeName ?? "",
      businessEmail: input.businessEmail ?? "",
      description: input.description ?? "",
      storeAddress: input.storeAddress ?? "",
      city: input.city ?? "",
      zipCode: input.zipCode ?? "",
      businessHoursOpen: input.businessHoursOpen ?? "",
      businessHoursClose: input.businessHoursClose ?? "",
      mapEmbedSrc: input.mapEmbedSrc ?? "",
    });
    return created.toObject() as StoreInformationDocument;
  }

  const $set: Record<string, string> = {};
  if (input.storeName !== undefined) $set.storeName = String(input.storeName).trim();
  if (input.businessEmail !== undefined) {
    $set.businessEmail = String(input.businessEmail).trim();
  }
  if (input.description !== undefined) {
    $set.description = String(input.description).trim();
  }
  if (input.storeAddress !== undefined) {
    $set.storeAddress = String(input.storeAddress).trim();
  }
  if (input.city !== undefined) $set.city = String(input.city).trim();
  if (input.zipCode !== undefined) $set.zipCode = String(input.zipCode).trim();
  if (input.businessHoursOpen !== undefined) {
    $set.businessHoursOpen = String(input.businessHoursOpen).trim();
  }
  if (input.businessHoursClose !== undefined) {
    $set.businessHoursClose = String(input.businessHoursClose).trim();
  }
  if (input.mapEmbedSrc !== undefined) {
    $set.mapEmbedSrc = String(input.mapEmbedSrc).trim();
  }

  if (Object.keys($set).length === 0) {
    return existing.toObject() as StoreInformationDocument;
  }

  const updated = await StoreInformationModel.findByIdAndUpdate(
    existing._id,
    { $set },
    { new: true, runValidators: true },
  ).lean();

  return updated as StoreInformationDocument;
}

export function toPublic(
  doc: StoreInformationDocument | null,
): StoreInformation | null {
  if (!doc) return null;
  return {
    _id: String(doc._id || ""),
    storeName: String(doc.storeName ?? ""),
    businessEmail: String(doc.businessEmail ?? ""),
    description: String(doc.description ?? ""),
    storeAddress: String(doc.storeAddress ?? ""),
    city: String(doc.city ?? ""),
    zipCode: String(doc.zipCode ?? ""),
    businessHoursOpen: String(doc.businessHoursOpen ?? ""),
    businessHoursClose: String(doc.businessHoursClose ?? ""),
    mapEmbedSrc: String(doc.mapEmbedSrc ?? ""),
    createdAt: doc.createdAt as Date,
    updatedAt: doc.updatedAt as Date,
  };
}

export function defaultPublicStoreInformation(): StoreInformation {
  const now = new Date();
  return {
    _id: "",
    storeName: "",
    businessEmail: "",
    description: "",
    storeAddress: "",
    city: "",
    zipCode: "",
    businessHoursOpen: "",
    businessHoursClose: "",
    mapEmbedSrc: "",
    createdAt: now,
    updatedAt: now,
  };
}
