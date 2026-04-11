import express from "express";

import {
  create,
  getById,
  list,
  remove,
  update,
} from "../controllers/blog-categories.controller";

import { validateBody } from "../middlewares/validate";

import { slugPattern } from "../hooks/helper";

const router = express.Router();

router.get("/", list);
router.get("/:id", getById);

router.post(
  "/",
  validateBody({
    name: { required: true, minLen: 1 },
    slug: {
      required: true,
      minLen: 1,
      pattern: slugPattern,
      patternMessage:
        "slug must be lowercase letters, numbers, and single hyphens between segments",
    },
    status: { required: false, oneOf: ["active", "inactive"] },
  }),
  create,
);

router.patch("/:id", update);

router.delete("/:id", remove);

export default router;
