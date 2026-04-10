import type { FormEvent } from 'react'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { useCallback, useEffect, useMemo, useState } from 'react'

import { createRestCrudResource } from '#/hooks/crud.service'

export type CategoryStatus = 'active' | 'inactive'

export type Category = {
    _id: string
    name: string
    slug: string
    status: CategoryStatus
    createdAt: string
    updatedAt: string
}

export type CreateCategoryInput = {
    name: string
    slug: string
    status?: CategoryStatus
}

export type UpdateCategoryInput = {
    name?: string
    slug?: string
    status?: CategoryStatus
}

/** TanStack Query keys for categories (invalidate / prefetch). */
export const categoriesQueryKeys = {
    all: ['categories'] as const,
    list: () => [...categoriesQueryKeys.all, 'list'] as const,
}

const categoriesApi = createRestCrudResource<
    Category,
    CreateCategoryInput,
    UpdateCategoryInput
>({
    basePath: '/categories',
    listKey: 'categories',
    itemKey: 'category',
})

export async function listCategories(): Promise<Category[]> {
    return categoriesApi.list()
}

export async function getCategory(id: string): Promise<Category> {
    return categoriesApi.get(id)
}

export async function createCategory(
    input: CreateCategoryInput,
): Promise<Category> {
    return categoriesApi.create({
        name: input.name,
        slug: input.slug,
        ...(input.status != null ? { status: input.status } : {}),
    })
}

export async function updateCategory(
    id: string,
    input: UpdateCategoryInput,
): Promise<Category> {
    return categoriesApi.update(id, input)
}

export async function deleteCategory(id: string): Promise<void> {
    return categoriesApi.remove(id)
}

/** Derives API-safe slug from display name (lowercase, hyphens, a-z0-9 only). */
export function slugifyFromName(name: string): string {
    return name
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]+/g, '')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '')
}

export function formatUpdatedAt(iso: string): string {
    const d = new Date(iso)
    if (Number.isNaN(d.getTime())) return '—'
    const diff = Date.now() - d.getTime()
    const mins = Math.floor(diff / 60000)
    if (mins < 1) return 'Baru saja'
    if (mins < 60) return `${mins} menit lalu`
    const hours = Math.floor(mins / 60)
    if (hours < 24) return `${hours} jam lalu`
    const days = Math.floor(hours / 24)
    if (days < 7) return `${days} hari lalu`
    return d.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    })
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
    const [editing, setEditing] = useState<Category | null>(null)
    const [editName, setEditName] = useState('')
    const [deleting, setDeleting] = useState<Category | null>(null)
    const [menuRowId, setMenuRowId] = useState<string | null>(null)

    const categoriesQuery = useQuery({
        queryKey: categoriesQueryKeys.list(),
        queryFn: listCategories,
    })

    const createMutation = useMutation({
        mutationFn: async (input: CreateCategoryInput) => createCategory(input),
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
            input: UpdateCategoryInput
        }) => updateCategory(id, input),
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: categoriesQueryKeys.list() })
            setEditing(null)
        },
    })

    const deleteMutation = useMutation({
        mutationFn: (id: string) => deleteCategory(id),
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
        resetCreateMutation()
    }, [addOpen, addFormKey, resetCreateMutation])

    useEffect(() => {
        if (!editing) {
            resetUpdateMutation()
            return
        }
        setEditName(editing.name)
        resetUpdateMutation()
    }, [editing, resetUpdateMutation])

    useEffect(() => {
        if (!deleting) {
            resetDeleteMutation()
            return
        }
        resetDeleteMutation()
    }, [deleting, resetDeleteMutation])

    useEffect(() => {
        if (!menuRowId) return
        const onDocClick = () => setMenuRowId(null)
        document.addEventListener('click', onDocClick)
        return () => document.removeEventListener('click', onDocClick)
    }, [menuRowId])

    const filtered = useMemo(() => {
        const q = search.trim().toLowerCase()
        if (!q) return items
        return items.filter(
            (c) =>
                c.name.toLowerCase().includes(q) || c.slug.toLowerCase().includes(q),
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
            const slug = String(fd.get('slug') ?? '').trim()
            const status = fd.get('status') as 'active' | 'inactive' | null
            createMutation.mutate({
                name,
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
            const slug = String(fd.get('slug') ?? '').trim()
            const status = fd.get('status') as 'active' | 'inactive'
            updateMutation.mutate({ id: editing._id, input: { name, slug, status } })
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
        addSlug,
        editing,
        setEditing,
        editSubmitting,
        editError,
        onEditSubmit,
        editName,
        setEditName,
        editSlug,
        deleting,
        setDeleting,
        deleteSubmitting,
        deleteError,
        confirmDelete,
        menuRowId,
        setMenuRowId,
        resetEditError,
    }
}
