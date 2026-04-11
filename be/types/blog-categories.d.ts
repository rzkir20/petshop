type BlogCategoryStatus = "active" | "inactive";

interface BlogCategory {
  _id: string;
  name: string;
  slug: string;
  status: BlogCategoryStatus;
  createdAt: Date;
  updatedAt: Date;
}

type CreateBlogCategoryBody = {
  name: string;
  slug: string;
  status?: BlogCategoryStatus;
};

type UpdateBlogCategoryBody = {
  name?: string;
  slug?: string;
  status?: BlogCategoryStatus;
};


type BlogCategoryDocument = InferSchemaType<typeof blogCategorySchema> & {
  _id?: Types.ObjectId;
};


type CreateBlogCategoryInput = {
  name: string;
  slug: string;
  status?: BlogCategoryStatus;
};

type UpdateBlogCategoryInput = {
  name?: string;
  slug?: string;
  status?: BlogCategoryStatus;
};