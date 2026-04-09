"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const validate_1 = require("../middlewares/validate");
const router = express_1.default.Router();
router.post("/signup", (0, validate_1.validateBody)({
    name: { required: true, minLen: 2 },
    email: { required: true, email: true },
    password: { required: true, minLen: 6 },
    pictures: { required: false },
}), auth_controller_1.signup);
router.post("/signout", auth_controller_1.signout);
exports.default = router;
