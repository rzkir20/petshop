import {
  InferSchemaType,
  Model,
  model,
  models,
  Schema,
  Types,
} from "mongoose";

const testimonialSchema = new Schema(
  {
    avatar: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    isFeatured: { type: Boolean, default: false },
    yearOfExperience: { type: Number, min: 0, default: 0 },
    rating: { type: Number, min: 0, max: 5, default: 5 },
  },
  { timestamps: true, collection: "testimonials" },
);

testimonialSchema.index({ isFeatured: -1, updatedAt: -1 });

type TestimonialDocument = InferSchemaType<typeof testimonialSchema> & {
  _id?: Types.ObjectId;
};

const TestimonialModel =
  (models.Testimonial as Model<InferSchemaType<typeof testimonialSchema>>) ||
  model("Testimonial", testimonialSchema);

export type CreateTestimonialInput = {
  avatar: string;
  description: string;
  name: string;
  role: string;
  isFeatured?: boolean;
  yearOfExperience?: number;
  rating?: number;
};

export type UpdateTestimonialInput = {
  avatar?: string;
  description?: string;
  name?: string;
  role?: string;
  isFeatured?: boolean;
  yearOfExperience?: number;
  rating?: number;
};

function clampRating(n: unknown): number {
  const x = Number(n);
  if (!Number.isFinite(x)) return 5;
  return Math.min(5, Math.max(0, x));
}

function clampYear(n: unknown): number {
  const x = Math.floor(Number(n));
  if (!Number.isFinite(x) || x < 0) return 0;
  return x;
}

export async function ensureIndexes(): Promise<void> {
  await TestimonialModel.syncIndexes();
}

export async function listTestimonials(): Promise<TestimonialDocument[]> {
  const docs = await TestimonialModel.find()
    .sort({ isFeatured: -1, updatedAt: -1 })
    .lean();
  return docs as TestimonialDocument[];
}

export async function findById(
  id: string,
): Promise<TestimonialDocument | null> {
  if (!Types.ObjectId.isValid(id)) return null;
  const doc = await TestimonialModel.findById(id).lean();
  return doc as TestimonialDocument | null;
}

export async function createTestimonial(
  input: CreateTestimonialInput,
): Promise<TestimonialDocument> {
  const created = await TestimonialModel.create({
    avatar: String(input.avatar || "").trim(),
    description: String(input.description || "").trim(),
    name: String(input.name || "").trim(),
    role: String(input.role || "").trim(),
    isFeatured: Boolean(input.isFeatured),
    yearOfExperience: clampYear(input.yearOfExperience),
    rating: clampRating(input.rating),
  });
  return created.toObject() as TestimonialDocument;
}

export async function updateTestimonial(
  id: string,
  input: UpdateTestimonialInput,
): Promise<TestimonialDocument | null> {
  if (!Types.ObjectId.isValid(id)) return null;

  const $set: Record<string, unknown> = {};

  if (input.avatar !== undefined) {
    $set.avatar = String(input.avatar || "").trim();
  }
  if (input.description !== undefined) {
    $set.description = String(input.description || "").trim();
  }
  if (input.name !== undefined) {
    $set.name = String(input.name || "").trim();
  }
  if (input.role !== undefined) {
    $set.role = String(input.role || "").trim();
  }
  if (input.isFeatured !== undefined) {
    $set.isFeatured = Boolean(input.isFeatured);
  }
  if (input.yearOfExperience !== undefined) {
    $set.yearOfExperience = clampYear(input.yearOfExperience);
  }
  if (input.rating !== undefined) {
    $set.rating = clampRating(input.rating);
  }

  if (Object.keys($set).length === 0) {
    return findById(id);
  }

  const updated = await TestimonialModel.findByIdAndUpdate(
    id,
    { $set },
    { new: true, runValidators: true },
  ).lean();

  return updated as TestimonialDocument | null;
}

export async function deleteTestimonial(id: string): Promise<boolean> {
  if (!Types.ObjectId.isValid(id)) return false;
  const result = await TestimonialModel.findByIdAndDelete(id);
  return result !== null;
}

export function toPublic(row: TestimonialDocument | null) {
  if (!row) return null;
  return {
    _id: String(row._id || ""),
    avatar: row.avatar,
    description: row.description,
    name: row.name,
    role: row.role,
    isFeatured: Boolean(row.isFeatured),
    yearOfExperience: Number(row.yearOfExperience ?? 0),
    rating: Number(row.rating ?? 0),
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}
