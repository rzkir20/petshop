type CategoryStatus = "active" | "inactive";

interface Category {
  _id: string;
  name: string;
  description: string;
  count: number;
  slug: string;
  status: CategoryStatus;
  createdAt: Date;
  updatedAt: Date;
}

type CreateCategoryBody = {
  name: string;
  description?: string;
  slug: string;
  status?: CategoryStatus;
};

type UpdateCategoryBody = {
  name?: string;
  description?: string;
  slug?: string;
  status?: CategoryStatus;
};

type UpdateCategoryInput = UpdateCategoryBody;
