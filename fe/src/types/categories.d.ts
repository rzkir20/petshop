type CategoryStatus = 'active' | 'inactive'

type Category = {
    _id: string
    name: string
    slug: string
    status: CategoryStatus
    createdAt: string
    updatedAt: string
}

type CreateCategoryInput = {
    name: string
    slug: string
    status?: CategoryStatus
}

type UpdateCategoryInput = {
    name?: string
    slug?: string
    status?: CategoryStatus
}
