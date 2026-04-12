import { Request, Response } from "express";

import * as Accounts from "../models/Accounts";

import { normalizePasswordInput } from "../utils/auth-input";

import { hashPassword, verifyPassword } from "../utils/password";

import { issueSessionCookie, uploadImageToImageKit, getAuthenticatedUserId, getJwtClearCookieOptions } from "../hooks/helper";

export async function signup(req: Request, res: Response) {
  try {
    const { name, email, password, pictures } = (req.body || {}) as {
      name?: string;
      email?: string;
      password?: string;
      pictures?: string;
    };

    await Accounts.ensureIndexes();

    const existing = await Accounts.findByEmail(String(email || ""));
    if (existing) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const avatar =
      pictures ||
      `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
        String(name || "").trim(),
      )}`;

    const account = await Accounts.createAccount({
      name: String(name || ""),
      email: String(email || ""),
      password: hashPassword(normalizePasswordInput(password)),
      pictures: avatar,
    });

    const publicUser = Accounts.toPublic(account);

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return res.status(500).json({ message: "JWT_SECRET is not configured" });
    }

    issueSessionCookie(res, publicUser!);

    return res.status(201).json({
      message: "Signup successful",
      user: publicUser,
    });
  } catch (err: unknown) {
    if (
      typeof err === "object" &&
      err !== null &&
      "code" in err &&
      (err as { code?: number }).code === 11000
    ) {
      return res.status(409).json({ message: "Email already registered" });
    }
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function signin(req: Request, res: Response) {
  try {
    const { email, password } = (req.body || {}) as {
      email?: string;
      password?: string;
    };

    const account = await Accounts.findByEmail(String(email || ""));
    const plain = normalizePasswordInput(password);
    if (!account || !verifyPassword(plain, account.password)) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const publicUser = Accounts.toPublic(account);
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return res.status(500).json({ message: "JWT_SECRET is not configured" });
    }

    issueSessionCookie(res, publicUser!);
    return res.status(200).json({
      message: "Signin successful",
      user: publicUser,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export function signout(_req: Request, res: Response) {
  res.clearCookie("session", getJwtClearCookieOptions());
  return res.status(200).json({ message: "Signout successful" });
}

export async function session(req: Request, res: Response) {
  try {
    const userId = getAuthenticatedUserId(req);
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const account = await Accounts.findById(userId);
    if (!account) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const publicUser = Accounts.toPublic(account);
    if (!publicUser) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    return res.status(200).json({ user: publicUser });
  } catch (_err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
}

export async function patchProfile(req: Request, res: Response) {
  try {
    const userId = getAuthenticatedUserId(req);
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const body = (req.body || {}) as {
      name?: string;
      email?: string;
      pictures?: string;
      phone?: string;
    };

    const hasUpdate =
      body.name !== undefined ||
      body.email !== undefined ||
      body.pictures !== undefined ||
      body.phone !== undefined;

    if (!hasUpdate) {
      return res.status(400).json({ message: "No fields to update" });
    }

    const existing = await Accounts.findById(userId);
    if (!existing) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (body.email !== undefined) {
      const normalized = String(body.email || "").trim().toLowerCase();
      if (normalized !== existing.email) {
        const taken = await Accounts.findByEmailExcludingId(body.email, userId);
        if (taken) {
          return res.status(409).json({ message: "Email already in use" });
        }
      }
    }

    const updated = await Accounts.updateProfile(userId, {
      name: body.name,
      email: body.email,
      pictures: body.pictures,
      phone: body.phone,
    });

    if (!updated) {
      return res.status(500).json({ message: "Failed to update profile" });
    }

    const publicUser = Accounts.toPublic(updated);
    if (!publicUser) {
      return res.status(500).json({ message: "Failed to update profile" });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return res.status(500).json({ message: "JWT_SECRET is not configured" });
    }

    issueSessionCookie(res, publicUser);

    return res.status(200).json({
      message: "Profile updated",
      user: publicUser,
    });
  } catch (err: unknown) {
    if (
      typeof err === "object" &&
      err !== null &&
      "code" in err &&
      (err as { code?: number }).code === 11000
    ) {
      return res.status(409).json({ message: "Email already in use" });
    }
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function uploadProfilePicture(req: Request, res: Response) {
  try {
    const userId = getAuthenticatedUserId(req);
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const file = req.file;
    if (!file?.buffer?.length) {
      return res.status(400).json({ message: "No image file provided" });
    }

    const url = await uploadImageToImageKit(file, { folder: "/avatars" });

    const updated = await Accounts.updateProfile(userId, { pictures: url });
    if (!updated) {
      return res.status(500).json({ message: "Failed to update profile" });
    }

    const publicUser = Accounts.toPublic(updated);
    if (!publicUser) {
      return res.status(500).json({ message: "Failed to update profile" });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return res.status(500).json({ message: "JWT_SECRET is not configured" });
    }

    issueSessionCookie(res, publicUser);

    return res.status(200).json({
      message: "Profile picture updated",
      user: publicUser,
    });
  } catch (err: unknown) {
    if (
      err instanceof Error &&
      err.message === "ImageKit is not configured"
    ) {
      return res
        .status(503)
        .json({ message: "ImageKit is not configured" });
    }
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function changePassword(req: Request, res: Response) {
  try {
    const userId = getAuthenticatedUserId(req);
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { currentPassword, newPassword } = (req.body || {}) as {
      currentPassword?: string;
      newPassword?: string;
    };

    const cur = normalizePasswordInput(currentPassword);
    const next = normalizePasswordInput(newPassword);

    if (next === cur) {
      return res.status(400).json({
        message: "New password must be different from current password",
      });
    }

    const account = await Accounts.findById(userId);
    if (!account) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!verifyPassword(cur, account.password)) {
      return res.status(403).json({ message: "Current password is incorrect" });
    }

    const updated = await Accounts.updatePasswordHash(
      userId,
      hashPassword(next),
    );

    if (!updated) {
      return res.status(500).json({ message: "Failed to update password" });
    }

    res.clearCookie("session", getJwtClearCookieOptions());
    return res.status(200).json({ message: "Password updated" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}
