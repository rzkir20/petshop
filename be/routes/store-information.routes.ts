import express from "express";

import { get, patch } from "../controllers/store-information.controller";

const router = express.Router();

router.get("/", get);
router.patch("/", patch);

export default router;
