"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const auth_controller_1 = require("../controllers/auth.controller");
const validate_1 = require("../middlewares/validate");
const router = express_1.default.Router();
const profilePictureUpload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 },
});
function profilePictureMiddleware(req, res, next) {
    profilePictureUpload.single("picture")(req, res, (err) => {
        if (err &&
            typeof err === "object" &&
            "code" in err &&
            err.code === "LIMIT_FILE_SIZE") {
            return res.status(400).json({ message: "Image must be 5MB or smaller" });
        }
        if (err instanceof Error) {
            return res.status(400).json({ message: err.message });
        }
        if (err)
            return next(err);
        return next();
    });
}
router.post("/signin", (0, validate_1.validateBody)({
    email: { required: true, email: true },
    password: { required: true, minLen: 6 },
}), auth_controller_1.signin);
router.post("/signup", (0, validate_1.validateBody)({
    name: { required: true, minLen: 2 },
    email: { required: true, email: true },
    password: { required: true, minLen: 6 },
    pictures: { required: false },
}), auth_controller_1.signup);
router.post("/signout", auth_controller_1.signout);
router.get("/session", auth_controller_1.session);
router.post("/password", (0, validate_1.validateBody)({
    currentPassword: { required: true, minLen: 6 },
    newPassword: { required: true, minLen: 6 },
}), auth_controller_1.changePassword);
router.post("/profile/picture", profilePictureMiddleware, auth_controller_1.uploadProfilePicture);
router.patch("/profile", (0, validate_1.validateBody)({
    name: { required: false, minLen: 2 },
    email: { required: false, email: true },
    pictures: { required: false },
    phone: { required: false },
}), auth_controller_1.patchProfile);
exports.default = router;
