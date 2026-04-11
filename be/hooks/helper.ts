import imagekit, { isImageKitConfigured } from "../utils/imgkit";

//================================= Slug Pattern =================================
export const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const STOCK_STATUS_VALUES = ["in-stock", "low-stock", "out-of-stock"] as const;

//================================= Jwt Cookie Options =================================//
export function getJwtCookieOptions() {
    const isProduction = process.env.NODE_ENV === "production";
    return {
        httpOnly: true,
        sameSite: isProduction ? ("none" as const) : ("lax" as const),
        secure: isProduction,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: "/",
    };
}

//================================= Parse Update Body =================================//
export function parseUpdateBlogCategoryBody(
    body: unknown,
): UpdateBlogCategoryInput | null {
    const b = (body || {}) as Record<string, unknown>;
    const out: UpdateBlogCategoryInput = {};

    if ("name" in b) {
        if (typeof b.name !== "string") {
            return null;
        }
        out.name = b.name;
    }
    if ("slug" in b) {
        if (typeof b.slug !== "string") {
            return null;
        }
        out.slug = b.slug;
    }
    if ("status" in b) {
        if (b.status !== "active" && b.status !== "inactive") {
            return null;
        }
        out.status = b.status as BlogCategoryStatus;
    }

    if (
        out.name === undefined &&
        out.slug === undefined &&
        out.status === undefined
    ) {
        return null;
    }

    if (out.name !== undefined && String(out.name).trim().length < 1) {
        return null;
    }
    if (out.slug !== undefined) {
        const s = String(out.slug).trim();
        if (s.length < 1 || !slugPattern.test(s.toLowerCase())) {
            return null;
        }
    }

    return out;
}

//================================= Parse Update Blog Body =================================//
export function parseUpdateBlogBody(body: unknown): UpdateBlogInput | null {
    const b = (body || {}) as Record<string, unknown>;
    const out: UpdateBlogInput = {};

    if ("title" in b) {
        if (typeof b.title !== "string") {
            return null;
        }
        out.title = b.title;
    }
    if ("slug" in b) {
        if (typeof b.slug !== "string") {
            return null;
        }
        out.slug = b.slug;
    }
    if ("thumbnail" in b) {
        if (typeof b.thumbnail !== "string") {
            return null;
        }
        out.thumbnail = b.thumbnail;
    }
    if ("description" in b) {
        if (typeof b.description !== "string") {
            return null;
        }
        out.description = b.description;
    }
    if ("content" in b) {
        if (typeof b.content !== "string") {
            return null;
        }
        out.content = b.content;
    }
    if ("status" in b) {
        if (b.status !== "published" && b.status !== "draft") {
            return null;
        }
        out.status = b.status as BlogPostStatus;
    }
    if ("category" in b) {
        if (typeof b.category !== "string") {
            return null;
        }
        out.category = b.category;
    }
    if ("author" in b) {
        const raw = b.author;
        if (!raw || typeof raw !== "object") {
            return null;
        }
        const a = raw as Record<string, unknown>;
        if (typeof a.name !== "string" || typeof a.pictures !== "string") {
            return null;
        }
        const name = a.name.trim();
        if (name.length < 1) {
            return null;
        }
        out.author = { name, pictures: a.pictures.trim() };
    }

    if (
        out.title === undefined &&
        out.slug === undefined &&
        out.thumbnail === undefined &&
        out.description === undefined &&
        out.content === undefined &&
        out.status === undefined &&
        out.category === undefined &&
        out.author === undefined
    ) {
        return null;
    }

    if (out.title !== undefined && String(out.title).trim().length < 1) {
        return null;
    }
    if (out.slug !== undefined) {
        const s = String(out.slug).trim();
        if (s.length < 1 || !slugPattern.test(s.toLowerCase())) {
            return null;
        }
    }

    return out;
}

//================================= Parse Update Category Body =================================//
export function parseUpdateCategoryBody(body: unknown): UpdateCategoryInput | null {
    const b = (body || {}) as Record<string, unknown>;
    const out: UpdateCategoryInput = {};

    if ("name" in b) {
        if (typeof b.name !== "string") {
            return null;
        }
        out.name = b.name;
    }
    if ("description" in b) {
        if (typeof b.description !== "string") {
            return null;
        }
        out.description = b.description;
    }
    if ("slug" in b) {
        if (typeof b.slug !== "string") {
            return null;
        }
        out.slug = b.slug;
    }
    if ("status" in b) {
        if (b.status !== "active" && b.status !== "inactive") {
            return null;
        }
        out.status = b.status as CategoryStatus;
    }

    if (
        out.name === undefined &&
        out.description === undefined &&
        out.slug === undefined &&
        out.status === undefined
    ) {
        return null;
    }

    if (out.name !== undefined && String(out.name).trim().length < 1) {
        return null;
    }
    if (out.slug !== undefined) {
        const s = String(out.slug).trim();
        if (s.length < 1 || !slugPattern.test(s.toLowerCase())) {
            return null;
        }
    }

    return out;
}

//================================= Parse Update Product Body =================================//
export function asString(value: unknown): string {
    return String(value ?? "").trim();
}

export function asNumber(value: unknown): number {
    if (typeof value === "number") return value;
    if (typeof value === "string") return Number(value);
    return Number.NaN;
}

export function asBoolean(value: unknown): boolean | null {
    if (typeof value === "boolean") return value;
    if (typeof value === "string") {
        if (value === "true") return true;
        if (value === "false") return false;
    }
    return null;
}

export function toSlug(value: string): string {
    return String(value || "")
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]+/g, "")
        .replace(/-+/g, "-")
        .replace(/^-+|-+$/g, "");
}

export function parseUpdateProductBody(body: unknown): UpdateProductInput | null {
    const b = (body || {}) as Record<string, unknown>;
    const out: UpdateProductInput = {};

    if ("title" in b) {
        const title = asString(b.title);
        if (title.length < 1) return null;
        out.title = title;
    }
    if ("slug" in b) {
        const slug = toSlug(asString(b.slug));
        if (slug.length < 1) return null;
        out.slug = slug;
    }
    if ("expiredAt" in b) {
        const expiredAt = asString(b.expiredAt);
        if (expiredAt.length < 1) return null;
        out.expiredAt = expiredAt;
    }
    if ("flavor" in b) {
        const flavor = asString(b.flavor);
        if (flavor.length < 1) return null;
        out.flavor = flavor;
    }
    if ("weight" in b) {
        const weight = asString(b.weight);
        if (weight.length < 1) return null;
        out.weight = weight;
    }
    if ("thumbnail" in b) {
        out.thumbnail = asString(b.thumbnail);
    }
    if ("images" in b) {
        if (Array.isArray(b.images)) {
            out.images = b.images.map((v) => asString(v)).filter(Boolean);
        } else if (typeof b.images === "string") {
            try {
                const parsed = JSON.parse(b.images) as unknown;
                if (!Array.isArray(parsed)) return null;
                out.images = parsed.map((v) => asString(v)).filter(Boolean);
            } catch {
                return null;
            }
        } else {
            return null;
        }
    }
    if ("price" in b) {
        const price = asNumber(b.price);
        if (!Number.isFinite(price) || price < 0) return null;
        out.price = price;
    }
    if ("content" in b) {
        const content = asString(b.content);
        if (content.length < 1) return null;
        out.content = content;
    }
    if ("isBestSeller" in b) {
        const isBestSeller = asBoolean(b.isBestSeller);
        if (isBestSeller === null) return null;
        out.isBestSeller = isBestSeller;
    }
    if ("stockCurrent" in b) {
        const stockCurrent = asNumber(b.stockCurrent);
        if (!Number.isFinite(stockCurrent) || stockCurrent < 0) return null;
        out.stockCurrent = stockCurrent;
    }
    if ("stockMax" in b) {
        const stockMax = asNumber(b.stockMax);
        if (!Number.isFinite(stockMax) || stockMax < 0) return null;
        out.stockMax = stockMax;
    }
    if ("reorder" in b) {
        const reorder = asString(b.reorder);
        if (reorder.length < 1) return null;
        out.reorder = reorder;
    }
    if ("status" in b) {
        if (!STOCK_STATUS_VALUES.includes(asString(b.status) as StockStatus)) return null;
        out.status = asString(b.status) as StockStatus;
    }
    if ("category" in b) {
        const category = asString(b.category).toLowerCase();
        if (category.length < 1) return null;
        out.category = category;
    }
    if (Object.keys(out).length === 0) return null;
    return out;
}

export async function uploadImageToImageKit(file: Express.Multer.File): Promise<string> {
    if (!isImageKitConfigured || !imagekit) {
        throw new Error("ImageKit is not configured");
    }
    const upload = await imagekit.upload({
        file: file.buffer.toString("base64"),
        fileName: `${Date.now()}-${file.originalname || "product-image"}`,
        folder: "/products",
    });
    return String(upload.url || "");
}

export async function uploadManyImagesToImageKit(
    files: Express.Multer.File[],
): Promise<string[]> {
    const urls = await Promise.all(files.map((file) => uploadImageToImageKit(file)));
    return urls.filter(Boolean);
}