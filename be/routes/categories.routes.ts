import express from "express";

import {
  create,
  getById,
  list,
  remove,
  update,
} from "../controllers/categories.controller";
import { validateBody } from "../middlewares/validate";

const router = express.Router();

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

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
