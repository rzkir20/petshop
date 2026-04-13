"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const products_controller_1 = require("../controllers/products.controller");
const router = express_1.default.Router();
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
router.get("/", products_controller_1.list);
router.get("/category/:category", products_controller_1.getByCategory);
router.get("/:slug", products_controller_1.getBySlug);
router.get("/:id", products_controller_1.getById);
router.post("/", upload.array("images", 10), products_controller_1.create);
router.patch("/:id", upload.array("images", 10), products_controller_1.update);
router.delete("/:id", products_controller_1.remove);
exports.default = router;
