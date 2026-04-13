import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { formatUpdatedAt } from '#/hooks/format-date'

import { slugifyFromName } from '#/hooks/slugify'

import { listCategories } from '#/services/categories.service'

import { createRestCrudResource, requestJson } from '#/services/crud.service'

export const productsQueryKeys = {
    all: ['products'] as const,
    list: (filters?: {
        category?: string
        q?: string
        page?: number
        limit?: number
    }) =>
        [
            ...productsQueryKeys.all,
            'list',
            filters?.category ?? '',
            filters?.q ?? '',
            filters?.page ?? 1,
            filters?.limit ?? 10,
        ] as const,
}

const api = createRestCrudResource<Product, CreateProductInput, UpdateProductInput>({
    basePath: '/products',
    listKey: 'products',
    itemKey: 'product',
})

export async function listProducts(filters?: {
    category?: string
    q?: string
    page?: number
    limit?: number
}): Promise<ListProductsResult> {
    const params = new URLSearchParams()
    if (filters?.category && filters.category !== 'all') {
        params.set('category', filters.category)
    }
    if (filters?.q && filters.q.trim()) {
        params.set('q', filters.q.trim())
    }
    const page = Math.max(1, filters?.page ?? 1)
    const limit = Math.min(100, Math.max(1, filters?.limit ?? 10))
    params.set('page', String(page))
    params.set('limit', String(limit))
    const res = await requestJson<Record<string, unknown>>(
        `/products?${params.toString()}`,
    )
    const products = Array.isArray(res.products)
        ? (res.products as Array<Record<string, unknown>>).map((item) => ({
            _id: String(item._id ?? ''),
            title: String(item.title ?? ''),
            slug: String(item.slug ?? ''),
            thumbnail: String(item.thumbnail ?? ''),
            price: Number(item.price) || 0,
            isBestSeller: Boolean(item.isBestSeller),
            category: String(item.category ?? ''),
            createdAt: String(item.createdAt ?? ''),
            updatedAt: String(item.updatedAt ?? ''),
        }))
        : []
    return {
        products,
        total: Number(res.total) || 0,
        page: Number(res.page) || page,
        limit: Number(res.limit) || limit,
    }
}

export async function getProduct(id: string): Promise<Product> {
    return api.get(id)
}

export async function createProduct(
    input: CreateProductRequestInput,
): Promise<Product> {
    const body = new FormData()
    body.set('title', input.title)
    body.set('slug', input.slug)
    body.set('expiredAt', input.expiredAt)
    body.set('flavor', input.flavor)
    body.set('weight', input.weight)
    body.set('category', input.category)
    body.set('status', input.status)
    body.set('price', String(input.price))
    body.set('content', input.content)
    body.set('isBestSeller', String(input.isBestSeller))
    body.set('stockCurrent', String(input.stockCurrent))
    body.set('stockMax', String(input.stockMax))
    body.set('reorder', input.reorder)
    body.set('thumbnail', input.thumbnail)
    body.set('highlights', JSON.stringify(input.highlights))
    const maxImages = 10
    if (input.imageEntries !== undefined) {
        if (input.imageEntries.length > maxImages) {
            throw new Error('Maksimal 10 gambar')
        }
        const imageFilesOrdered: File[] = []
        const manifest: Array<{ t: 'u'; v: string } | { t: 'f'; i: number }> = []
        for (const e of input.imageEntries) {
            if (e.kind === 'url') {
                manifest.push({ t: 'u', v: e.url.trim() })
            } else {
                manifest.push({ t: 'f', i: imageFilesOrdered.length })
                imageFilesOrdered.push(e.file)
            }
        }
        body.set('imageManifest', JSON.stringify(manifest))
        for (const file of imageFilesOrdered) {
            body.append('images', file)
        }
    } else {
        for (const file of input.imageFiles ?? []) {
            body.append('images', file)
        }
    }
    const res = await requestJson<Record<string, unknown>>('/products', {
        method: 'POST',
        body,
    })
    return res.product as Product
}

export async function updateProduct(
    id: string,
    input: UpdateProductInput,
): Promise<Product> {
    const body = new FormData()
    if (input.title !== undefined) body.set('title', input.title)
    if (input.slug !== undefined) body.set('slug', input.slug)
    if (input.expiredAt !== undefined) body.set('expiredAt', input.expiredAt)
    if (input.flavor !== undefined) body.set('flavor', input.flavor)
    if (input.weight !== undefined) body.set('weight', input.weight)
    if (input.category !== undefined) body.set('category', input.category)
    if (input.status !== undefined) body.set('status', input.status)
    if (input.price !== undefined) body.set('price', String(input.price))
    if (input.content !== undefined) body.set('content', input.content)
    if (input.isBestSeller !== undefined) {
        body.set('isBestSeller', String(input.isBestSeller))
    }
    if (input.stockCurrent !== undefined) {
        body.set('stockCurrent', String(input.stockCurrent))
    }
    if (input.stockMax !== undefined) body.set('stockMax', String(input.stockMax))
    if (input.reorder !== undefined) body.set('reorder', input.reorder)
    if (input.thumbnail !== undefined) body.set('thumbnail', input.thumbnail)
    if (input.highlights !== undefined) {
        body.set('highlights', JSON.stringify(input.highlights))
    }
    if (input.images !== undefined) {
        body.set('images', JSON.stringify(input.images))
    }
    for (const file of input.imageFiles ?? []) {
        body.append('images', file)
    }
    const res = await requestJson<Record<string, unknown>>(
        `/products/${encodeURIComponent(id)}`,
        {
            method: 'PATCH',
            body,
        },
    )
    return res.product as Product
}

export async function deleteProduct(id: string): Promise<void> {
    return api.remove(id)
}

function toRow(p: ProductListItem): ProductRow {
    const resolvedId = String(p._id || '').trim() || p.slug
    return {
        id: resolvedId,
        title: p.title,
        slug: p.slug,
        createdAt: formatUpdatedAt(p.createdAt),
        expiredAt: '',
        flavor: '',
        weight: '',
        thumbnail: p.thumbnail,
        images: p.thumbnail ? [p.thumbnail] : [],
        price: p.price,
        content: '',
        isBestSeller: p.isBestSeller,
        stockCurrent: 0,
        stockMax: 0,
        reorder: '-',
        status: 'in-stock',
        updated: formatUpdatedAt(p.updatedAt),
        category: p.category,
    }
}

export function useProductsInventoryState(filters?: {
    category?: string
    q?: string
    page?: number
    limit?: number
}) {
    const queryClient = useQueryClient()

    const listQuery = useQuery({
        queryKey: productsQueryKeys.list(filters),
        queryFn: () => listProducts(filters),
        staleTime: 30_000,
        gcTime: 10 * 60_000,
        refetchOnWindowFocus: false,
    })

    const products = (listQuery.data?.products ?? []).map(toRow)
    const total = listQuery.data?.total ?? 0

    return {
        products,
        total,
        loading: listQuery.isPending,
        error: listQuery.isError
            ? listQuery.error instanceof Error
                ? listQuery.error.message
                : 'Gagal memuat produk'
            : null,
        refresh: () => listQuery.refetch(),
        invalidate: () =>
            queryClient.invalidateQueries({ queryKey: productsQueryKeys.all }),
    }
}

export function useProductsInventoryFiltersState() {
    const categoriesQuery = useQuery({
        queryKey: ['categories', 'list'],
        queryFn: listCategories,
        staleTime: 30_000,
        gcTime: 10 * 60_000,
        refetchOnWindowFocus: false,
    })

    const [activeCategory, setActiveCategory] = useState('all')
    const [searchQuery, setSearchQuery] = useState('')

    const categoryTabs = useMemo(() => {
        const fromApi = (categoriesQuery.data ?? [])
            .filter((c) => c.status === 'active')
            .map((c) => ({
                id: c.slug,
                label: c.name,
                match: c.slug,
            }))
        return [{ id: 'all', label: 'All Categories', match: 'all' as const }, ...fromApi]
    }, [categoriesQuery.data])

    return {
        activeCategory,
        setActiveCategory,
        searchQuery,
        setSearchQuery,
        categoriesQuery,
        categoryTabs,
    }
}

export function useProductsInventoryUiState(products: ProductRow[]) {
    const [expandedId, setExpandedId] = useState<string | null>(null)
    const [detailsOpen, setDetailsOpen] = useState(false)
    const [detailProduct, setDetailProduct] = useState<ProductRow | null>(null)
    const [selected, setSelected] = useState<Set<string>>(new Set())

    const visibleIds = products.map((p) => p.id)
    const selectedCount = selected.size
    const allVisibleSelected =
        visibleIds.length > 0 && visibleIds.every((id) => selected.has(id))

    function toggleExpand(id: string) {
        if (expandedId === id) {
            setExpandedId(null)
            setDetailsOpen(false)
            setDetailProduct(null)
        } else {
            setExpandedId(id)
            const p = products.find((x) => x.id === id) ?? null
            setDetailProduct(p)
            setDetailsOpen(true)
        }
    }

    function closeDetails() {
        setDetailsOpen(false)
        setDetailProduct(null)
        setExpandedId(null)
    }

    function toggleSelect(id: string) {
        setSelected((prev) => {
            const next = new Set(prev)
            if (next.has(id)) next.delete(id)
            else next.add(id)
            return next
        })
    }

    function toggleSelectAll() {
        setSelected((prev) => {
            const next = new Set(prev)
            if (allVisibleSelected) visibleIds.forEach((id) => next.delete(id))
            else visibleIds.forEach((id) => next.add(id))
            return next
        })
    }

    function deselectAll() {
        setSelected(new Set())
    }

    function deselectOne(id: string) {
        setSelected((prev) => {
            const next = new Set(prev)
            next.delete(id)
            return next
        })
    }

    useEffect(() => {
        if (!expandedId) return
        if (products.some((p) => p.id === expandedId)) return
        setExpandedId(null)
        setDetailsOpen(false)
        setDetailProduct(null)
    }, [expandedId, products])

    return {
        expandedId,
        detailsOpen,
        detailProduct,
        selected,
        selectedCount,
        allVisibleSelected,
        visibleIds,
        toggleExpand,
        closeDetails,
        toggleSelect,
        toggleSelectAll,
        deselectAll,
        deselectOne,
    }
}

export function useProductsCrudMutations() {
    const queryClient = useQueryClient()

    const create = useMutation({
        mutationFn: (input: CreateProductRequestInput) => createProduct(input),
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: productsQueryKeys.list() })
        },
    })

    const update = useMutation({
        mutationFn: ({ id, input }: { id: string; input: UpdateProductInput }) =>
            updateProduct(id, input),
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: productsQueryKeys.list() })
        },
    })

    const remove = useMutation({
        mutationFn: (id: string) => deleteProduct(id),
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: productsQueryKeys.list() })
        },
    })

    const resetAll = useCallback(() => {
        create.reset()
        update.reset()
        remove.reset()
    }, [create, update, remove])

    return { create, update, remove, resetAll }
}

export function useProductCreateFormState() {
    const categoriesQuery = useQuery({
        queryKey: ['categories', 'list'],
        queryFn: listCategories,
        staleTime: 30_000,
        gcTime: 10 * 60_000,
        refetchOnWindowFocus: false,
    })

    const [title, setTitle] = useState('')
    const [expiredAt, setExpiredAt] = useState('')
    const [flavor, setFlavor] = useState('')
    const [weight, setWeight] = useState('')
    const [category, setCategory] = useState<ProductCategory>('')
    const [status, setStatus] = useState<StockStatus>('in-stock')
    const [imageEntries, setImageEntries] = useState<ProductImageEntry[]>([])
    const [dragOverUpload, setDragOverUpload] = useState(false)
    const [draggedImageIndex, setDraggedImageIndex] = useState<number | null>(null)
    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const [price, setPrice] = useState<number>(0)
    const [content, setContent] = useState('')
    const [isBestSeller, setIsBestSeller] = useState(false)
    const [stockCurrent, setStockCurrent] = useState<number>(0)
    const [stockMax, setStockMax] = useState<number>(0)
    const [reorder, setReorder] = useState('')
    const [highlightsText, setHighlightsText] = useState('')

    const categoryOptions = useMemo(() => {
        const rows = categoriesQuery.data ?? []
        return rows
            .filter((c) => c.status === 'active')
            .map((c) => ({
                value: c.slug,
                label: c.name,
            }))
    }, [categoriesQuery.data])

    useEffect(() => {
        if (categoryOptions.length === 0) {
            setCategory('')
            return
        }
        if (!category) {
            setCategory(categoryOptions[0].value)
        }
    }, [categoryOptions, category])

    const defaultThumbnail = useMemo(
        () => slugifyFromName(title) || category,
        [title, category],
    )
    const slug = useMemo(() => slugifyFromName(title), [title])
    const thumbnailFromFile = useMemo(() => {
        const first = imageEntries.find((e) => e.kind === 'file')
        return first ? slugifyFromName(first.file.name) : ''
    }, [imageEntries])
    const effectiveThumbnail = (thumbnailFromFile || defaultThumbnail).slice(0, 64)
    const imagePreviews = useMemo(
        () =>
            imageEntries.map((e) =>
                e.kind === 'url'
                    ? { kind: 'url' as const, url: e.url, label: e.url }
                    : {
                        kind: 'file' as const,
                        url: URL.createObjectURL(e.file),
                        label: e.file.name,
                        file: e.file,
                    },
            ),
        [imageEntries],
    )

    useEffect(() => {
        return () => {
            imagePreviews.forEach((item) => {
                if (item.kind === 'file') URL.revokeObjectURL(item.url)
            })
        }
    }, [imagePreviews])

    const maxImages = 10

    function appendFiles(files: File[]) {
        if (files.length === 0) return
        setImageEntries((prev) => {
            const room = maxImages - prev.length
            if (room <= 0) return prev
            const next: ProductImageEntry[] = [...prev]
            for (const file of files.slice(0, room)) {
                next.push({ kind: 'file', file })
            }
            return next
        })
    }

    function appendImageUrl(url: string) {
        const trimmed = url.trim()
        if (!trimmed) return
        let parsed: URL
        try {
            parsed = new URL(trimmed)
        } catch {
            return
        }
        if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return
        setImageEntries((prev) => {
            if (prev.length >= maxImages) return prev
            return [...prev, { kind: 'url', url: trimmed }]
        })
    }

    function moveImage(from: number, to: number) {
        if (from === to) return
        setImageEntries((prev) => {
            if (from < 0 || from >= prev.length || to < 0 || to >= prev.length) return prev
            const next = [...prev]
            const [moved] = next.splice(from, 1)
            next.splice(to, 0, moved)
            return next
        })
    }

    const createInput: CreateProductRequestInput = {
        title: title.trim(),
        slug,
        expiredAt,
        flavor: flavor.trim(),
        weight: weight.trim(),
        category,
        status,
        price,
        content: content.trim(),
        isBestSeller,
        stockCurrent,
        stockMax,
        reorder: reorder.trim(),
        highlights: highlightsText
            .split('\n')
            .map((v) => v.trim())
            .filter(Boolean),
        thumbnail: effectiveThumbnail,
        imageEntries,
    }

    return {
        categoriesQuery,
        categoryOptions,
        category,
        setCategory,
        title,
        setTitle,
        expiredAt,
        setExpiredAt,
        flavor,
        setFlavor,
        weight,
        setWeight,
        status,
        setStatus,
        price,
        setPrice,
        content,
        setContent,
        isBestSeller,
        setIsBestSeller,
        stockCurrent,
        setStockCurrent,
        stockMax,
        setStockMax,
        reorder,
        setReorder,
        highlightsText,
        setHighlightsText,
        slug,
        imageEntries,
        imagePreviews,
        fileInputRef,
        dragOverUpload,
        setDragOverUpload,
        draggedImageIndex,
        setDraggedImageIndex,
        appendFiles,
        appendImageUrl,
        moveImage,
        setImageEntries,
        createInput,
    }
}

export function useProductEditFormState(product: Product | null) {
    const categoriesQuery = useQuery({
        queryKey: ['categories', 'list'],
        queryFn: listCategories,
        staleTime: 30_000,
        gcTime: 10 * 60_000,
        refetchOnWindowFocus: false,
    })

    const [title, setTitle] = useState('')
    const [expiredAt, setExpiredAt] = useState('')
    const [flavor, setFlavor] = useState('')
    const [weight, setWeight] = useState('')
    const [category, setCategory] = useState<ProductCategory>('')
    const [status, setStatus] = useState<StockStatus>('in-stock')
    const [thumbnail, setThumbnail] = useState('')
    const [images, setImages] = useState<string[]>([])
    const [imageFiles, setImageFiles] = useState<File[]>([])
    const [dragOverUpload, setDragOverUpload] = useState(false)
    const [draggedExistingIndex, setDraggedExistingIndex] = useState<number | null>(null)
    const [draggedNewIndex, setDraggedNewIndex] = useState<number | null>(null)
    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const [price, setPrice] = useState<number>(0)
    const [content, setContent] = useState('')
    const [isBestSeller, setIsBestSeller] = useState(false)
    const [stockCurrent, setStockCurrent] = useState<number>(0)
    const [stockMax, setStockMax] = useState<number>(0)
    const [reorder, setReorder] = useState('')
    const [highlightsText, setHighlightsText] = useState('')

    useEffect(() => {
        if (!product) return
        setTitle(product.title)
        setExpiredAt(product.expiredAt)
        setFlavor(product.flavor)
        setWeight(product.weight)
        setCategory(product.category)
        setStatus(product.status)
        setThumbnail(product.thumbnail || '')
        setImages(product.images)
        setPrice(product.price)
        setContent(product.content)
        setIsBestSeller(product.isBestSeller)
        setStockCurrent(product.stockCurrent)
        setStockMax(product.stockMax)
        setReorder(product.reorder)
        setHighlightsText(product.highlights.join('\n'))
    }, [product])

    const categoryOptions = useMemo(() => {
        const rows = categoriesQuery.data ?? []
        return rows
            .filter((c) => c.status === 'active')
            .map((c) => ({
                value: c.slug,
                label: c.name,
            }))
    }, [categoriesQuery.data])

    const thumbnailFromFile = useMemo(
        () => slugifyFromName(imageFiles[0]?.name ?? ''),
        [imageFiles],
    )
    const effectiveThumbnail = (thumbnailFromFile || images[0] || thumbnail.trim()).slice(
        0,
        64,
    )
    const slug = useMemo(() => slugifyFromName(title), [title])
    const imagePreviews = useMemo(
        () =>
            imageFiles.map((file) => ({
                file,
                url: URL.createObjectURL(file),
            })),
        [imageFiles],
    )

    useEffect(() => {
        return () => {
            imagePreviews.forEach((item) => URL.revokeObjectURL(item.url))
        }
    }, [imagePreviews])

    function appendFiles(files: File[]) {
        if (files.length === 0) return
        setImageFiles((prev) => [...prev, ...files])
    }

    function moveExistingImage(from: number, to: number) {
        if (from === to) return
        setImages((prev) => {
            if (from < 0 || from >= prev.length || to < 0 || to >= prev.length) return prev
            const next = [...prev]
            const [moved] = next.splice(from, 1)
            next.splice(to, 0, moved)
            return next
        })
    }

    function moveNewImage(from: number, to: number) {
        if (from === to) return
        setImageFiles((prev) => {
            if (from < 0 || from >= prev.length || to < 0 || to >= prev.length) return prev
            const next = [...prev]
            const [moved] = next.splice(from, 1)
            next.splice(to, 0, moved)
            return next
        })
    }

    const updateInput: UpdateProductInput = {
        title: title.trim(),
        slug,
        expiredAt,
        flavor: flavor.trim(),
        weight: weight.trim(),
        category,
        status,
        price,
        content: content.trim(),
        isBestSeller,
        stockCurrent,
        stockMax,
        reorder: reorder.trim(),
        highlights: highlightsText
            .split('\n')
            .map((v) => v.trim())
            .filter(Boolean),
        thumbnail: effectiveThumbnail,
        images: imageFiles.length === 0 ? images : undefined,
        imageFiles,
    }

    return {
        categoriesQuery,
        categoryOptions,
        category,
        setCategory,
        title,
        setTitle,
        expiredAt,
        setExpiredAt,
        flavor,
        setFlavor,
        weight,
        setWeight,
        status,
        setStatus,
        thumbnail,
        setThumbnail,
        images,
        setImages,
        imageFiles,
        setImageFiles,
        dragOverUpload,
        setDragOverUpload,
        draggedExistingIndex,
        setDraggedExistingIndex,
        draggedNewIndex,
        setDraggedNewIndex,
        fileInputRef,
        price,
        setPrice,
        content,
        setContent,
        isBestSeller,
        setIsBestSeller,
        stockCurrent,
        setStockCurrent,
        stockMax,
        setStockMax,
        reorder,
        setReorder,
        highlightsText,
        setHighlightsText,
        slug,
        effectiveThumbnail,
        imagePreviews,
        appendFiles,
        moveExistingImage,
        moveNewImage,
        updateInput,
    }
}