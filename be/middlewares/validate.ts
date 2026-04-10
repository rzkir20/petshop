import { NextFunction, Request, Response } from "express";

type FieldRule = {
  required?: boolean;
  minLen?: number;
  email?: boolean;
  pattern?: RegExp;
  patternMessage?: string;
  oneOf?: string[];
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

      if (
        rules.pattern != null &&
        String(value).length > 0 &&
        !rules.pattern.test(String(value))
      ) {
        return res.status(400).json({
          message: rules.patternMessage || `${field} format is invalid`,
        });
      }

      if (rules.oneOf != null && rules.oneOf.length > 0) {
        if (!rules.oneOf.includes(String(value))) {
          return res.status(400).json({
            message: `${field} must be one of: ${rules.oneOf.join(", ")}`,
          });
        }
      }
    }

    return next();
  };
}
