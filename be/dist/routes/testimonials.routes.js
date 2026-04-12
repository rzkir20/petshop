"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const testimonials_controller_1 = require("../controllers/testimonials.controller");
const validate_1 = require("../middlewares/validate");
const router = express_1.default.Router();
const avatarUpload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 },
});
function testimonialAvatarMiddleware(req, res, next) {
    avatarUpload.single("avatar")(req, res, (err) => {
        if (err &&
            typeof err === "object" &&
            "code" in err &&
            err.code === "LIMIT_FILE_SIZE") {
            return res.status(400).json({ message: "Gambar avatar maksimal 5 MB" });
        }
        if (err instanceof Error) {
            return res.status(400).json({ message: err.message });
        }
        if (err)
            return next(err);
        return next();
    });
}
router.get("/", testimonials_controller_1.list);
router.get("/:id", testimonials_controller_1.getById);
router.post("/", testimonialAvatarMiddleware, (0, validate_1.validateBody)({
    name: { required: true, minLen: 1 },
    description: { required: true, minLen: 1 },
    role: { required: true, minLen: 1 },
}), testimonials_controller_1.create);
router.patch("/:id", testimonialAvatarMiddleware, testimonials_controller_1.update);
router.delete("/:id", testimonials_controller_1.remove);
exports.default = router;
