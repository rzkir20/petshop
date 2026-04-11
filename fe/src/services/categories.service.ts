import type { FormEvent } from 'react'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { useCallback, useEffect, useMemo, useState } from 'react'

import { createRestCrudResource } from '#/services/crud.service'

import { slugifyFromName } from '#/hooks/slugify'

/** TanStack Query keys for categories (invalidate / prefetch). */
export const categoriesQueryKeys = {
    all: ['categories'] as const,
    list: () => [...categoriesQueryKeys.all, 'list'] as const,
}

const categoriesApi = createRestCrudResource<
    CategoryItem,
    CreateCategoryPayload,
    UpdateCategoryPayload
>({
    basePath: '/categories',
    listKey: 'categories',
    itemKey: 'category',
})

export async function listCategories(): Promise<CategoryItem[]> {
    return categoriesApi.list()
}

export async function getCategory(id: string): Promise<CategoryItem> {
    return categoriesApi.get(id)
}

export async function createCategory(
    input: CreateCategoryPayload,
): Promise<CategoryItem> {
    return categoriesApi.create({
        name: input.name,
        ...(input.description != null ? { description: input.description } : {}),
        slug: input.slug,
        ...(input.status != null ? { status: input.status } : {}),
    })
}

export async function updateCategory(
    id: string,
    input: UpdateCategoryPayload,
): Promise<CategoryItem> {
    return categoriesApi.update(id, input)
}

export async function deleteCategory(id: string): Promise<void> {
    return categoriesApi.remove(id)
}

function errMessage(e: unknown): string {
    return e instanceof Error ? e.message : 'Terjadi kesalahan'
}

export function useCategoriesCrudState() {
    const queryClient = useQueryClient()

    const [search, setSearch] = useState('')
    const [addOpen, setAddOpen] = useState(false)
    const [addFormKey, setAddFormKey] = useState(0)
    const [addName, setAddName] = useState('')
    const [addDescription, setAddDescription] = useState('')
    const [editing, setEditing] = useState<CategoryItem | null>(null)
    const [editName, setEditName] = useState('')
    const [editDescription, setEditDescription] = useState('')
    const [deleting, setDeleting] = useState<Category | null>(null)

    const categoriesQuery = useQuery({
        queryKey: categoriesQueryKeys.list(),
        queryFn: listCategories,
        // Cache behavior
        staleTime: 30_000, // 30s: avoid refetch spam while navigating
        gcTime: 10 * 60_000, // 10m: keep cache in memory
        refetchOnWindowFocus: false,
    })

    const createMutation = useMutation({
        mutationFn: async (input: CreateCategoryPayload) => createCategory(input),
        onMutate: async (input) => {
            await queryClient.cancelQueries({ queryKey: categoriesQueryKeys.list() })
            const previous = queryClient.getQueryData<CategoryItem[]>(
                categoriesQueryKeys.list(),
            )

            const optimistic: CategoryItem = {
                _id: `optimistic-${Math.random().toString(16).slice(2)}`,
                name: input.name,
                description: input.description ?? '',
                count: 0,
                slug: input.slug,
                status: input.status ?? 'active',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            }

            queryClient.setQueryData<CategoryItem[]>(
                categoriesQueryKeys.list(),
                (curr) => [optimistic, ...(curr ?? [])],
            )

            return { previous }
        },
        onError: (_err, _input, ctx) => {
            if (ctx?.previous) {
                queryClient.setQueryData(categoriesQueryKeys.list(), ctx.previous)
            }
        },
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: categoriesQueryKeys.list() })
            setAddOpen(false)
        },
    })

    const updateMutation = useMutation({
        mutationFn: ({
            id,
            input,
        }: {
            id: string
            input: UpdateCategoryPayload
        }) => updateCategory(id, input),
        onMutate: async ({ id, input }) => {
            await queryClient.cancelQueries({ queryKey: categoriesQueryKeys.list() })
            const previous = queryClient.getQueryData<CategoryItem[]>(
                categoriesQueryKeys.list(),
            )

            queryClient.setQueryData<CategoryItem[]>(
                categoriesQueryKeys.list(),
                (curr) =>
                    (curr ?? []).map((c) =>
                        c._id === id
                            ? {
                                ...c,
                                ...input,
                                updatedAt: new Date().toISOString(),
                            }
                            : c,
                    ),
            )

            return { previous }
        },
        onError: (_err, _vars, ctx) => {
            if (ctx?.previous) {
                queryClient.setQueryData(categoriesQueryKeys.list(), ctx.previous)
            }
        },
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: categoriesQueryKeys.list() })
            setEditing(null)
        },
    })

    const deleteMutation = useMutation({
        mutationFn: (id: string) => deleteCategory(id),
        onMutate: async (id) => {
            await queryClient.cancelQueries({ queryKey: categoriesQueryKeys.list() })
            const previous = queryClient.getQueryData<CategoryItem[]>(
                categoriesQueryKeys.list(),
            )
            queryClient.setQueryData<CategoryItem[]>(
                categoriesQueryKeys.list(),
                (curr) => (curr ?? []).filter((c) => c._id !== id),
            )
            return { previous }
        },
        onError: (_err, _id, ctx) => {
            if (ctx?.previous) {
                queryClient.setQueryData(categoriesQueryKeys.list(), ctx.previous)
            }
        },
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: categoriesQueryKeys.list() })
            setDeleting(null)
        },
    })

    const { reset: resetCreateMutation } = createMutation
    const { reset: resetUpdateMutation } = updateMutation
    const { reset: resetDeleteMutation } = deleteMutation

    const items = categoriesQuery.data ?? []
    const loading = categoriesQuery.isPending
    const loadError = categoriesQuery.isError ? errMessage(categoriesQuery.error) : null

    const refresh = useCallback(() => categoriesQuery.refetch(), [categoriesQuery])

    const addSlug = useMemo(() => slugifyFromName(addName), [addName])
    const editSlug = useMemo(() => slugifyFromName(editName), [editName])

    useEffect(() => {
        if (!addOpen) return
        setAddName('')
        setAddDescription('')
        resetCreateMutation()
    }, [addOpen, addFormKey, resetCreateMutation])

    useEffect(() => {
        if (!editing) {
            resetUpdateMutation()
            return
        }
        setEditName(editing.name)
        setEditDescription(editing.description)
        resetUpdateMutation()
    }, [editing, resetUpdateMutation])

    useEffect(() => {
        if (!deleting) {
            resetDeleteMutation()
            return
        }
        resetDeleteMutation()
    }, [deleting, resetDeleteMutation])

    const filtered = useMemo(() => {
        const q = search.trim().toLowerCase()
        if (!q) return items
        return items.filter(
            (c) =>
                c.name.toLowerCase().includes(q) ||
                c.description.toLowerCase().includes(q) ||
                c.slug.toLowerCase().includes(q),
        )
    }, [items, search])

    const openAdd = useCallback(() => {
        setAddFormKey((k) => k + 1)
        resetCreateMutation()
        setAddOpen(true)
    }, [resetCreateMutation])

    const onAddSubmit = useCallback(
        (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            const fd = new FormData(e.currentTarget)
            const name = String(fd.get('name') ?? '').trim()
            const description = String(fd.get('description') ?? '').trim()
            const slug = String(fd.get('slug') ?? '').trim()
            const status = fd.get('status') as 'active' | 'inactive' | null
            createMutation.mutate({
                name,
                description,
                slug,
                status:
                    status === 'inactive'
                        ? 'inactive'
                        : status === 'active'
                            ? 'active'
                            : undefined,
            })
        },
        [createMutation],
    )

    const onEditSubmit = useCallback(
        (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            if (!editing) return
            const fd = new FormData(e.currentTarget)
            const name = String(fd.get('name') ?? '').trim()
            const description = String(fd.get('description') ?? '').trim()
            const slug = String(fd.get('slug') ?? '').trim()
            const status = fd.get('status') as 'active' | 'inactive'
            updateMutation.mutate({
                id: editing._id,
                input: { name, description, slug, status },
            })
        },
        [editing, updateMutation],
    )

    const confirmDelete = useCallback(() => {
        if (!deleting) return
        deleteMutation.mutate(deleting._id)
    }, [deleting, deleteMutation])

    const resetEditError = useCallback(() => {
        resetUpdateMutation()
    }, [resetUpdateMutation])

    const addError = createMutation.isError ? errMessage(createMutation.error) : null
    const addSubmitting = createMutation.isPending

    const editError = updateMutation.isError ? errMessage(updateMutation.error) : null
    const editSubmitting = updateMutation.isPending

    const deleteSubmitting = deleteMutation.isPending
    const deleteError = deleteMutation.isError ? errMessage(deleteMutation.error) : null

    return {
        items,
        loading,
        loadError,
        search,
        setSearch,
        filtered,
        refresh,
        addOpen,
        setAddOpen,
        openAdd,
        addFormKey,
        addSubmitting,
        addError,
        onAddSubmit,
        addName,
        setAddName,
        addDescription,
        setAddDescription,
        addSlug,
        editing,
        setEditing,
        editSubmitting,
        editError,
        onEditSubmit,
        editName,
        setEditName,
        editDescription,
        setEditDescription,
        editSlug,
        deleting,
        setDeleting,
        deleteSubmitting,
        deleteError,
        confirmDelete,
        resetEditError,
    }
}