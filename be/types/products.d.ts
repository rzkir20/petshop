type StockStatus = "in-stock" | "low-stock" | "out-of-stock";

type ProductCategory = string;

interface Product {
  _id: string;
  title: string;
  slug: string;
  expiredAt: string;
  flavor: string;
  weight: string;
  thumbnail: string;
  images: string[];
  price: number;
  content: string;
  isBestSeller: boolean;
  stockCurrent: number;
  stockMax: number;
  reorder: string;
  status: StockStatus;
  category: ProductCategory;
  createdAt: Date;
  updatedAt: Date;
}

type CreateProductBody = {
  title: string;
  slug?: string;
  expiredAt: string;
  flavor: string;
  weight: string;
  thumbnail?: string;
  images?: string[];
  price: number;
  content: string;
  isBestSeller?: boolean;
  stockCurrent: number;
  stockMax: number;
  reorder: string;
  status: StockStatus;
  category: ProductCategory;
};

type UpdateProductBody = Partial<CreateProductBody>;

type CreateProductInput = {
  title: string;
  slug?: string;
  expiredAt: string;
  flavor: string;
  weight: string;
  thumbnail?: string;
  images?: string[];
  price: number;
  content: string;
  isBestSeller?: boolean;
  stockCurrent: number;
  stockMax: number;
  reorder: string;
  status: StockStatus;
  category: string;
};

type UpdateProductInput = Partial<CreateProductInput>;

type ListProductsInput = {
  category?: string;
  q?: string;
  /** 1-based */
  page?: number;
  /** Max items per page (default 10). */
  limit?: number;
};

type ProductDocument = InferSchemaType<typeof productSchema> & {
  _id?: Types.ObjectId;
};