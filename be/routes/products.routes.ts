import express from "express"

import multer from "multer"

import {
    create,
    getByCategory,
    getById,
    getBySlug,
    list,
    remove,
    update,
} from "../controllers/products.controller"

const router = express.Router()

const upload = multer({ storage: multer.memoryStorage() })

router.get("/", list)

router.get("/category/:category", getByCategory)

router.get("/:slug", getBySlug)

router.get("/:id", getById)

router.post("/", upload.array("images", 10), create)

router.patch("/:id", upload.array("images", 10), update)

router.delete("/:id", remove)

export default router
