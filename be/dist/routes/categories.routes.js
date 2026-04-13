"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const categories_controller_1 = require("../controllers/categories.controller");
const validate_1 = require("../middlewares/validate");
const helper_1 = require("../hooks/helper");
const router = express_1.default.Router();
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
router.get("/", categories_controller_1.list);
router.get("/:id", categories_controller_1.getById);
router.post("/", upload.single("image"), (0, validate_1.validateBody)({
    name: { required: true, minLen: 1 },
    description: { required: false, minLen: 1 },
    slug: {
        required: true,
        minLen: 1,
        pattern: helper_1.slugPattern,
        patternMessage: "slug must be lowercase letters, numbers, and single hyphens between segments",
    },
    status: { required: false, oneOf: ["active", "inactive"] },
}), categories_controller_1.create);
router.patch("/:id", upload.single("image"), categories_controller_1.update);
router.delete("/:id", categories_controller_1.remove);
exports.default = router;
