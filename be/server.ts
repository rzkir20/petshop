import cookieParser from "cookie-parser";

import cors from "cors";

import express, { Request, Response } from "express";

import authRoutes from "./routes/auth.routes";

import categoriesRoutes from "./routes/categories.routes";
import productsRoutes from "./routes/products.routes";

import { connectToDatabase as connectDb } from "./utils/mongodb";

const app = express();
const corsOrigin = process.env.CORS_ORIGIN || "http://localhost:3000";
const port = Number(process.env.PORT || 3001);

app.use(
  cors({
    origin: corsOrigin,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use("/auth", authRoutes);

app.use("/categories", categoriesRoutes);
app.use("/products", productsRoutes);

async function bootstrap() {
  await connectDb();
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

bootstrap().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
