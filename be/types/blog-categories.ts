export type BlogCategoryStatus = "active" | "inactive";

export interface BlogCategory {
  _id: string;
  name: string;
  slug: string;
  status: BlogCategoryStatus;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateBlogCategoryBody = {
  name: string;
  slug: string;
  status?: BlogCategoryStatus;
};

export type UpdateBlogCategoryBody = {
  name?: string;
  slug?: string;
  status?: BlogCategoryStatus;
};
