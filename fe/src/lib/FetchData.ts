import { requestJson } from '#/services/crud.service'

// ================================= Products =================================//
export async function fetchProducts(url: string) {
    const res = await requestJson<Record<string, unknown>>(url)
    if (!Array.isArray(res.products)) return []
    return (res.products as Array<Record<string, unknown>>).map((item) => ({
        _id: String(item._id ?? ''),
        slug: String(item.slug ?? ''),
        title: String(item.title ?? ''),
        price: Number(item.price) || 0,
        category: String(item.category ?? ''),
        thumbnail: String(item.thumbnail ?? ''),
        isBestSeller: Boolean(item.isBestSeller),
    })) satisfies ShopProductCard[]
}

// ================================= Products By Slug =================================//
export async function fetchProductBySlug(slug: string): Promise<Product | null> {
    const safeSlug = String(slug || '').trim().toLowerCase()
    if (!safeSlug) return null
    try {
        const res = await requestJson<Record<string, unknown>>(
            `/products/${encodeURIComponent(safeSlug)}`,
        )
        const raw =
            res.product && typeof res.product === 'object'
                ? (res.product as Record<string, unknown>)
                : null
        if (!raw) return null
        return {
            _id: String(raw._id ?? ''),
            title: String(raw.title ?? ''),
            slug: String(raw.slug ?? ''),
            expiredAt: String(raw.expiredAt ?? ''),
            flavor: String(raw.flavor ?? ''),
            weight: String(raw.weight ?? ''),
            images: Array.isArray(raw.images)
                ? raw.images.map((img) => String(img ?? '')).filter(Boolean)
                : [],
            highlights: Array.isArray(raw.highlights)
                ? raw.highlights.map((item) => String(item ?? '')).filter(Boolean)
                : [],
            price: Number(raw.price) || 0,
            content: String(raw.content ?? ''),
            stockCurrent: Number(raw.stockCurrent) || 0,
            stockMax: Number(raw.stockMax) || 0,
            reorder: String(raw.reorder ?? ''),
            status:
                raw.status === 'low-stock'
                    ? 'low-stock'
                    : raw.status === 'out-of-stock'
                        ? 'out-of-stock'
                        : 'in-stock',
            category: String(raw.category ?? ''),
            thumbnail: String(raw.thumbnail ?? ''),
            isBestSeller: Boolean(raw.isBestSeller),
            createdAt: String(raw.createdAt ?? ''),
            updatedAt: String(raw.updatedAt ?? ''),
        }
    } catch {
        return null
    }
}

// ================================= Categories =================================//
export async function fetchCategories(url = '/categories') {
    const res = await requestJson<Record<string, unknown>>(url)
    if (!Array.isArray(res.categories)) return []
    return (res.categories as Array<Record<string, unknown>>).map((item) => ({
        _id: String(item._id ?? ''),
        name: String(item.name ?? ''),
        description: String(item.description ?? ''),
        slug: String(item.slug ?? ''),
        image: String(item.image ?? ''),
        count: Number(item.count) || 0,
        status: item.status === 'inactive' ? 'inactive' : 'active',
    })) satisfies ShopCategoryItem[]
}

// ================================= Products By Categories =================================//
export async function fetchProductsByCategory(
    slug: string,
    input?: { q?: string; page?: number; limit?: number },
) {
    const safeSlug = String(slug || '').trim().toLowerCase()
    if (!safeSlug) {
        return {
            category: null as ShopCategoryItem | null,
            products: [] as ShopProductCard[],
            total: 0,
            page: 1,
            limit: 12,
        }
    }
    const params = new URLSearchParams()
    if (input?.q && input.q.trim()) params.set('q', input.q.trim())
    if (input?.page && Number.isFinite(input.page)) {
        params.set('page', String(Math.max(1, Math.floor(input.page))))
    }
    if (input?.limit && Number.isFinite(input.limit)) {
        params.set('limit', String(Math.max(1, Math.floor(input.limit))))
    }
    const qs = params.toString()
    const url = `/products/category/${encodeURIComponent(safeSlug)}${qs ? `?${qs}` : ''}`
    const res = await requestJson<Record<string, unknown>>(url)

    const rawCategory =
        res.category && typeof res.category === 'object'
            ? (res.category as Record<string, unknown>)
            : null
    const category: ShopCategoryItem | null = rawCategory
        ? {
            _id: String(rawCategory._id ?? ''),
            name: String(rawCategory.name ?? ''),
            description: String(rawCategory.description ?? ''),
            slug: String(rawCategory.slug ?? ''),
            image: String(rawCategory.image ?? ''),
            count: Number(rawCategory.count) || 0,
            status: rawCategory.status === 'inactive' ? 'inactive' : 'active',
        }
        : null

    const products = Array.isArray(res.products)
        ? (res.products as Array<Record<string, unknown>>).map((item) => ({
            _id: String(item._id ?? ''),
            slug: String(item.slug ?? ''),
            title: String(item.title ?? ''),
            price: Number(item.price) || 0,
            category: String(item.category ?? ''),
            thumbnail: String(item.thumbnail ?? ''),
            isBestSeller: Boolean(item.isBestSeller),
        }))
        : []

    return {
        category,
        products: products satisfies ShopProductCard[],
        total: Number(res.total) || 0,
        page: Number(res.page) || 1,
        limit: Number(res.limit) || 12,
    }
}