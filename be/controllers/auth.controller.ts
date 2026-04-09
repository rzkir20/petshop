import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import * as Accounts from "../models/Accounts";
import { hashPassword, verifyPassword } from "../utils/password";

function getJwtCookieOptions() {
  const isProduction = process.env.NODE_ENV === "production";
  return {
    httpOnly: true,
    sameSite: isProduction ? ("none" as const) : ("lax" as const),
    secure: isProduction,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/",
  };
}

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
      password: hashPassword(String(password || "")),
      pictures: avatar,
    });

    const publicUser = Accounts.toPublic(account);

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return res.status(500).json({ message: "JWT_SECRET is not configured" });
    }

    const token = jwt.sign(
      {
        sub: publicUser?._id,
        email: publicUser?.email,
        name: publicUser?.name,
      },
      secret,
      { expiresIn: "7d" },
    );

    res.cookie("session", token, getJwtCookieOptions());

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
    if (!account || !verifyPassword(String(password || ""), account.password)) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const publicUser = Accounts.toPublic(account);
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return res.status(500).json({ message: "JWT_SECRET is not configured" });
    }

    const token = jwt.sign(
      {
        sub: publicUser?._id,
        email: publicUser?.email,
        name: publicUser?.name,
      },
      secret,
      { expiresIn: "7d" },
    );

    res.cookie("session", token, getJwtCookieOptions());
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
  res.clearCookie("session", getJwtCookieOptions());
  return res.status(200).json({ message: "Signout successful" });
}

export async function session(req: Request, res: Response) {
  try {
    const token = req.cookies?.session as string | undefined;
    const secret = process.env.JWT_SECRET;

    if (!token || !secret) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const payload = jwt.verify(token, secret) as {
      sub?: string;
      email?: string;
      name?: string;
    };

    return res.status(200).json({
      user: {
        _id: String(payload.sub || ""),
        email: String(payload.email || ""),
        name: String(payload.name || ""),
      },
    });
  } catch (_err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
}
