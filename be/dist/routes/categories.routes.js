"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const categories_controller_1 = require("../controllers/categories.controller");
const validate_1 = require("../middlewares/validate");
const router = express_1.default.Router();
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
router.get("/", categories_controller_1.list);
router.get("/:id", categories_controller_1.getById);
router.post("/", (0, validate_1.validateBody)({
    name: { required: true, minLen: 1 },
    slug: {
        required: true,
        minLen: 1,
        pattern: slugPattern,
        patternMessage: "slug must be lowercase letters, numbers, and single hyphens between segments",
    },
    status: { required: false, oneOf: ["active", "inactive"] },
}), categories_controller_1.create);
router.patch("/:id", categories_controller_1.update);
router.delete("/:id", categories_controller_1.remove);
exports.default = router;
