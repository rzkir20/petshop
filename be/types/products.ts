export type StockStatus = "in-stock" | "low-stock" | "out-of-stock";

export type ProductCategory = string;

export interface Product {
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

export type CreateProductBody = {
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

export type UpdateProductBody = Partial<CreateProductBody>;
