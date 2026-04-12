import express, { NextFunction, Request, Response } from "express";

import multer from "multer";

import {
  create,
  getById,
  list,
  remove,
  update,
} from "../controllers/testimonials.controller";

import { validateBody } from "../middlewares/validate";

const router = express.Router();

const avatarUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

function testimonialAvatarMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  avatarUpload.single("avatar")(req, res, (err: unknown) => {
    if (
      err &&
      typeof err === "object" &&
      "code" in err &&
      (err as { code: string }).code === "LIMIT_FILE_SIZE"
    ) {
      return res.status(400).json({ message: "Gambar avatar maksimal 5 MB" });
    }
    if (err instanceof Error) {
      return res.status(400).json({ message: err.message });
    }
    if (err) return next(err as Error);
    return next();
  });
}

router.get("/", list);

router.get("/:id", getById);

router.post(
  "/",
  testimonialAvatarMiddleware,
  validateBody({
    name: { required: true, minLen: 1 },
    description: { required: true, minLen: 1 },
    role: { required: true, minLen: 1 },
  }),
  create,
);

router.patch("/:id", testimonialAvatarMiddleware, update);

router.delete("/:id", remove);

export default router;
