import "dotenv/config";

import cookieParser from "cookie-parser";

import cors from "cors";

import express, { Request, Response } from "express";

import authRoutes from "./routes/auth.routes";

import blogCategoriesRoutes from "./routes/blog-categories.routes";

import blogRoutes from "./routes/blog.routes";

import categoriesRoutes from "./routes/categories.routes";

import productsRoutes from "./routes/products.routes";

import storeInformationRoutes from "./routes/store-information.routes";

import testimonialsRoutes from "./routes/testimonials.routes";

import { connectToDatabase as connectDb } from "./utils/mongodb";

const app = express();

const corsOrigin = process.env.CORS_ORIGIN;

const port = Number(process.env.PORT);

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

app.use("/blog-categories", blogCategoriesRoutes);
app.use("/blogs", blogRoutes);
app.use("/categories", categoriesRoutes);
app.use("/products", productsRoutes);
app.use("/store-information", storeInformationRoutes);
app.use("/testimonials", testimonialsRoutes);

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
