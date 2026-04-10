type BlogCategoryStatus = 'active' | 'inactive'

type BlogCategory = {
    _id: string
    name: string
    slug: string
    status: BlogCategoryStatus
    createdAt: string
    updatedAt: string
}

type CreateBlogCategoryInput = {
    name: string
    slug: string
    status?: BlogCategoryStatus
}

type UpdateBlogCategoryInput = {
    name?: string
    slug?: string
    status?: BlogCategoryStatus
}
