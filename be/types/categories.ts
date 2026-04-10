export type CategoryStatus = "active" | "inactive";

export interface Category {
  _id: string;
  name: string;
  slug: string;
  status: CategoryStatus;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateCategoryBody = {
  name: string;
  slug: string;
  status?: CategoryStatus;
};

export type UpdateCategoryBody = {
  name?: string;
  slug?: string;
  status?: CategoryStatus;
};
