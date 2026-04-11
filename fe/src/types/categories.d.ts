type CategoryStatus = 'active' | 'inactive'

type Category = {
    _id: string
    name: string
    description: string
    count: number
    slug: string
    status: CategoryStatus
    createdAt: string
    updatedAt: string
}

type CreateCategoryInput = {
    name: string
    description?: string
    slug: string
    status?: CategoryStatus
}

type UpdateCategoryInput = {
    name?: string
    description?: string
    slug?: string
    status?: CategoryStatus
}

type CategoryItem = Category & {
    description: string
}

type CreateCategoryPayload = CreateCategoryInput & {
    description?: string
}

type UpdateCategoryPayload = UpdateCategoryInput & {
    description?: string
}
