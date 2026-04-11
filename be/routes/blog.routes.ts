import express from "express";

import multer from "multer";

import {
  create,
  getById,
  getBySlug,
  list,
  remove,
  update,
} from "../controllers/blog.controller";

import { validateBody } from "../middlewares/validate";

import { slugPattern } from "../hooks/helper";

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.get("/", list);
router.get("/by-slug/:slug", getBySlug);
router.get("/:id", getById);

router.post(
  "/",
  upload.single("thumbnail"),
  validateBody({
    title: { required: true, minLen: 1 },
    slug: {
      required: true,
      minLen: 1,
      pattern: slugPattern,
      patternMessage:
        "slug must be lowercase letters, numbers, and single hyphens between segments",
    },
    thumbnail: { required: false, minLen: 0 },
    description: { required: false, minLen: 0 },
    content: { required: true, minLen: 1 },
    status: { required: false, oneOf: ["published", "draft"] },
    category: { required: true, minLen: 1 },
  }),
  create,
);

router.patch("/:id", upload.single("thumbnail"), update);

router.delete("/:id", remove);

export default router;
