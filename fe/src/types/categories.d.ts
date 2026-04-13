type CategoryStatus = 'active' | 'inactive'

type Category = {
    _id: string
    name: string
    description: string
    image: string
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
    image?: string
    status?: CategoryStatus
}

type UpdateCategoryInput = {
    name?: string
    description?: string
    slug?: string
    image?: string
    status?: CategoryStatus
}

type CategoryItem = Category & {
    description: string
}

type CreateCategoryPayload = CreateCategoryInput & {
    description?: string
    imageFile?: File | null
}

type UpdateCategoryPayload = UpdateCategoryInput & {
    description?: string
    imageFile?: File | null
}

// =========================================== Categories =========================================== //
type ShopCategoryItem = {
    _id: string
    name: string
    description: string
    slug: string
    image: string
    count: number
    status: 'active' | 'inactive'
}