"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const store_information_controller_1 = require("../controllers/store-information.controller");
const router = express_1.default.Router();
router.get("/", store_information_controller_1.get);
router.patch("/", store_information_controller_1.patch);
exports.default = router;
