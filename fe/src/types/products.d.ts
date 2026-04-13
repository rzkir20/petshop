
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
    highlights: string[]
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
    createdAt: string
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

type ProductImageEntry =
    | { kind: 'url'; url: string }
    | { kind: 'file'; file: File }

/** Create payload including ordered image slots (URL + file mix). */
type CreateProductRequestInput = CreateProductInput & {
    imageEntries?: ProductImageEntry[]
}

type ListProductsResult = {
    products: ProductListItem[]
    total: number
    page: number
    limit: number
}

type ProductListItem = Pick<
    Product,
    | '_id'
    | 'title'
    | 'slug'
    | 'thumbnail'
    | 'price'
    | 'isBestSeller'
    | 'category'
    | 'createdAt'
    | 'updatedAt'
>

// =========================================== Products =========================================== //
type ShopProductCard = {
    _id: string
    slug: string
    title: string
    price: number
    category: string
    thumbnail: string
    isBestSeller: boolean
}

// =========================================== Products Detail =========================================== //
type ShopProductDetail = {
    _id: string
    title: string
    slug: string
    expiredAt: string
    flavor: string
    weight: string
    images: string[]
    price: number
    content: string
    stockCurrent: number
    stockMax: number
    reorder: string
    status: StockStatus
    category: string
    thumbnail: string
    isBestSeller: boolean
    createdAt: string
    updatedAt: string
}
