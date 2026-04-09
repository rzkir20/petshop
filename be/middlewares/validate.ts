import { NextFunction, Request, Response } from "express";

type FieldRule = {
  required?: boolean;
  minLen?: number;
  email?: boolean;
};

type BodySchema = Record<string, FieldRule>;

function isEmail(value: unknown): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || "").trim());
}

export function validateBody(schema: BodySchema) {
  return function validateBodyMiddleware(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const body = (req.body || {}) as Record<string, unknown>;

    for (const [field, rules] of Object.entries(schema || {})) {
      const value = body[field];

      if (
        rules.required &&
        (value === undefined || value === null || value === "")
      ) {
        return res.status(400).json({ message: `${field} is required` });
      }

      if (value === undefined || value === null) continue;

      if (rules.minLen != null && String(value).length < rules.minLen) {
        return res
          .status(400)
          .json({ message: `${field} must be at least ${rules.minLen} characters` });
      }

      if (rules.email && !isEmail(value)) {
        return res.status(400).json({ message: `Valid ${field} is required` });
      }
    }

    return next();
  };
}
