
type StockStatus = 'in-stock' | 'low-stock' | 'out-of-stock'

type ProductCategory = string

/** Raw API product (matches BE `toPublic`). */
type Product = {
    _id: string
    title: string
    slug: string
    expiredAt: string
    flavor: string
    weight: string
    thumbnail: string
    images: string[]
    price: number
    content: string
    isBestSeller: boolean
    stockCurrent: number
    stockMax: number
    reorder: string
    status: StockStatus
    category: ProductCategory
    createdAt: string
    updatedAt: string
}

/** UI row shape used by `inventory/index.tsx`. */
type ProductRow = {
    id: string
    title: string
    slug: string
    expiredAt: string
    flavor: string
    weight: string
    thumbnail: string
    images: string[]
    price: number
    content: string
    isBestSeller: boolean
    stockCurrent: number
    stockMax: number
    reorder: string
    status: StockStatus
    updated: string
    category: ProductCategory
}

type CreateProductInput = Omit<
    Product,
    '_id' | 'createdAt' | 'updatedAt' | 'images'
> & {
    images?: string[]
    thumbnail?: string
    imageFiles?: File[]
}

type UpdateProductInput = Partial<CreateProductInput>