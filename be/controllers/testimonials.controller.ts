import { Request, Response } from "express";

import type { UpdateTestimonialInput } from "../models/Testimonials";

import { uploadImageToImageKit } from "../hooks/helper";

import * as Testimonials from "../models/Testimonials";

function parseBoolean(value: unknown): boolean | undefined {
  if (value === undefined || value === null) return undefined;
  if (typeof value === "boolean") return value;
  const s = String(value).trim().toLowerCase();
  if (s === "true" || s === "1") return true;
  if (s === "false" || s === "0") return false;
  return undefined;
}

function parseUpdateBody(body: unknown): UpdateTestimonialInput | null {
  if (!body || typeof body !== "object") return null;

  const b = body as Record<string, unknown>;
  const out: UpdateTestimonialInput = {};
  let any = false;

  if ("avatar" in b) {
    out.avatar = String(b.avatar ?? "").trim();
    any = true;
  }
  if ("description" in b) {
    out.description = String(b.description ?? "").trim();
    any = true;
  }
  if ("name" in b) {
    out.name = String(b.name ?? "").trim();
    any = true;
  }
  if ("role" in b) {
    out.role = String(b.role ?? "").trim();
    any = true;
  }
  if ("isFeatured" in b) {
    const v = parseBoolean(b.isFeatured);
    if (v !== undefined) {
      out.isFeatured = v;
      any = true;
    }
  }
  if ("yearOfExperience" in b) {
    out.yearOfExperience = Number(b.yearOfExperience);
    any = true;
  }
  if ("rating" in b) {
    out.rating = Number(b.rating);
    any = true;
  }

  return any ? out : null;
}

async function resolveAvatarUrl(req: Request): Promise<string | null> {
  const file = req.file as Express.Multer.File | undefined;
  if (file?.buffer?.length) {
    return uploadImageToImageKit(file, { folder: "/testimonials" });
  }
  const body = (req.body || {}) as Record<string, unknown>;
  const url = String(body.avatar ?? "").trim();
  return url.length > 0 ? url : null;
}

export async function list(_req: Request, res: Response) {
  try {
    await Testimonials.ensureIndexes();
    const rows = await Testimonials.listTestimonials();
    return res.status(200).json({
      testimonials: rows.map((t) => Testimonials.toPublic(t)),
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function getById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const row = await Testimonials.findById(String(id || ""));
    if (!row) {
      return res.status(404).json({ message: "Testimonial not found" });
    }
    return res.status(200).json({ testimonial: Testimonials.toPublic(row) });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function create(req: Request, res: Response) {
  try {
    await Testimonials.ensureIndexes();
    const body = (req.body || {}) as Record<string, unknown>;

    let avatarUrl: string;
    try {
      const resolved = await resolveAvatarUrl(req);
      if (!resolved) {
        return res.status(400).json({
          message:
            'Wajib mengunggah gambar avatar (multipart field "avatar") atau kirim "avatar" berisi URL gambar',
        });
      }
      avatarUrl = resolved;
    } catch (err: unknown) {
      if (
        err instanceof Error &&
        err.message === "ImageKit is not configured"
      ) {
        return res.status(500).json({ message: "ImageKit is not configured" });
      }
      throw err;
    }

    const isFeatured = parseBoolean(body.isFeatured) ?? false;
    const yearOfExperience =
      body.yearOfExperience === undefined || body.yearOfExperience === null
        ? undefined
        : Number(body.yearOfExperience);
    const rating =
      body.rating === undefined || body.rating === null
        ? undefined
        : Number(body.rating);

    const row = await Testimonials.createTestimonial({
      avatar: avatarUrl,
      description: String(body.description || "").trim(),
      name: String(body.name || "").trim(),
      role: String(body.role || "").trim(),
      isFeatured,
      yearOfExperience,
      rating,
    });

    return res.status(201).json({
      message: "Testimonial created",
      testimonial: Testimonials.toPublic(row),
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function update(req: Request, res: Response) {
  try {
    const { id } = req.params;

    let uploadedAvatar: string | undefined;
    try {
      const file = req.file as Express.Multer.File | undefined;
      if (file?.buffer?.length) {
        uploadedAvatar = await uploadImageToImageKit(file, {
          folder: "/testimonials",
        });
      }
    } catch (err: unknown) {
      if (
        err instanceof Error &&
        err.message === "ImageKit is not configured"
      ) {
        return res.status(500).json({ message: "ImageKit is not configured" });
      }
      throw err;
    }

    const parsed = parseUpdateBody(req.body);
    const merged: UpdateTestimonialInput = { ...(parsed ?? {}) };
    if (uploadedAvatar) {
      merged.avatar = uploadedAvatar;
    }

    if (Object.keys(merged).length === 0) {
      return res.status(400).json({
        message:
          "Kirim minimal satu perubahan: unggah avatar (field \"avatar\") atau field JSON lain (description, name, role, isFeatured, yearOfExperience, rating)",
      });
    }

    if (merged.avatar !== undefined && merged.avatar.length === 0) {
      return res.status(400).json({ message: "avatar cannot be empty" });
    }
    if (merged.description !== undefined && merged.description.length === 0) {
      return res.status(400).json({ message: "description cannot be empty" });
    }
    if (merged.name !== undefined && merged.name.length === 0) {
      return res.status(400).json({ message: "name cannot be empty" });
    }
    if (merged.role !== undefined && merged.role.length === 0) {
      return res.status(400).json({ message: "role cannot be empty" });
    }

    const existing = await Testimonials.findById(String(id || ""));
    if (!existing) {
      return res.status(404).json({ message: "Testimonial not found" });
    }

    const row = await Testimonials.updateTestimonial(String(id || ""), merged);
    if (!row) {
      return res.status(404).json({ message: "Testimonial not found" });
    }

    return res.status(200).json({
      message: "Testimonial updated",
      testimonial: Testimonials.toPublic(row),
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function remove(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const ok = await Testimonials.deleteTestimonial(String(id || ""));
    if (!ok) {
      return res.status(404).json({ message: "Testimonial not found" });
    }
    return res.status(200).json({ message: "Testimonial deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}
