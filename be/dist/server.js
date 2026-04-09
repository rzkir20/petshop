"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const config_1 = __importDefault(require("./utils/config"));
const mongodb_1 = require("./utils/mongodb");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: config_1.default.corsOrigin,
    credentials: true,
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.get("/", (_req, res) => {
    res.send("Hello World!");
});
app.use("/auth", auth_routes_1.default);
async function bootstrap() {
    await (0, mongodb_1.connectDb)();
    app.listen(config_1.default.port, () => {
        console.log(`Server is running on port ${config_1.default.port}`);
    });
}
bootstrap().catch((err) => {
    console.error("Failed to start server:", err);
    process.exit(1);
});
