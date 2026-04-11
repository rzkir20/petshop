import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { useAuth } from '#/context/AuthContext'

import { slugifyFromName } from '#/hooks/slugify'

import { listBlogCategories } from '#/services/blog-categories.service'

import type { PublicUser } from '#/services/auth.service'

import { createRestCrudResource, requestJson } from '#/services/crud.service'

/** Maps session user to backend `author` ({ name, pictures }). */
export function authorBlogFromPublicUser(user: PublicUser | null | undefined): AuthorBlog | null {
    const name = (user?.name ?? '').trim()
    if (!name) return null
    return {
        name,
        pictures: user && typeof user.pictures === 'string' ? user.pictures.trim() : '',
    }
}

export const blogQueryKeys = {
    all: ['blogs'] as const,
    list: (filters?: { category?: string; status?: BlogPostStatus }) =>
        [...blogQueryKeys.all, 'list', filters?.category ?? '', filters?.status ?? ''] as const,
    detail: (id: string) => [...blogQueryKeys.all, 'detail', id] as const,
}

const blogsApi = createRestCrudResource<BlogPost, CreateBlogPostInput, UpdateBlogPostInput>({
    basePath: '/blogs',
    listKey: 'posts',
    itemKey: 'post',
})

export async function listBlogs(filters?: {
    category?: string
    status?: BlogPostStatus
}): Promise<BlogPost[]> {
    const params = new URLSearchParams()
    if (filters?.category?.trim()) {
        params.set('category', filters.category.trim())
    }
    if (filters?.status === 'published' || filters?.status === 'draft') {
        params.set('status', filters.status)
    }
    const suffix = params.toString()
    const path = suffix ? `/blogs?${suffix}` : '/blogs'
    const res = await requestJson<Record<string, unknown>>(path)
    const arr = res.posts
    if (!Array.isArray(arr)) {
        throw new Error('Invalid list response')
    }
    return arr as BlogPost[]
}

export async function getBlog(id: string): Promise<BlogPost> {
    return blogsApi.get(id)
}

export async function getBlogBySlug(slug: string): Promise<BlogPost> {
    const res = await requestJson<Record<string, unknown>>(
        `/blogs/by-slug/${encodeURIComponent(slug)}`,
    )
    return res.post as BlogPost
}

export type CreateBlogPostPayload = CreateBlogPostInput & { thumbnailFile?: File | null }

export async function createBlogPost(payload: CreateBlogPostPayload): Promise<BlogPost> {
    const { thumbnailFile, ...input } = payload
    if (thumbnailFile) {
        const fd = new FormData()
        fd.set('title', input.title)
        fd.set('slug', input.slug)
        fd.set('content', input.content)
        fd.set('category', input.category)
        fd.set('author', JSON.stringify(input.author))
        if (input.description !== undefined) fd.set('description', input.description)
        if (input.status !== undefined) fd.set('status', input.status)
        fd.append('thumbnail', thumbnailFile)
        const res = await requestJson<Record<string, unknown>>('/blogs', {
            method: 'POST',
            body: fd,
        })
        return res.post as BlogPost
    }
    return blogsApi.create(input)
}

export async function updateBlogPost(
    id: string,
    input: UpdateBlogPostInput,
    opts?: { thumbnailFile?: File | null },
): Promise<BlogPost> {
    const thumbnailFile = opts?.thumbnailFile
    if (thumbnailFile) {
        const fd = new FormData()
        if (input.title !== undefined) fd.set('title', input.title)
        if (input.slug !== undefined) fd.set('slug', input.slug)
        if (input.description !== undefined) fd.set('description', input.description)
        if (input.content !== undefined) fd.set('content', input.content)
        if (input.status !== undefined) fd.set('status', input.status)
        if (input.category !== undefined) fd.set('category', input.category)
        if (input.author !== undefined) fd.set('author', JSON.stringify(input.author))
        fd.append('thumbnail', thumbnailFile)
        const res = await requestJson<Record<string, unknown>>(
            `/blogs/${encodeURIComponent(id)}`,
            { method: 'PATCH', body: fd },
        )
        return res.post as BlogPost
    }
    return blogsApi.update(id, input)
}

export async function deleteBlogPost(id: string): Promise<void> {
    return blogsApi.remove(id)
}

export function useBlogCrudMutations() {
    const queryClient = useQueryClient()

    const create = useMutation({
        mutationFn: (input: CreateBlogPostPayload) => createBlogPost(input),
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: blogQueryKeys.all })
        },
    })

    const update = useMutation({
        mutationFn: ({
            id,
            input,
            thumbnailFile,
        }: {
            id: string
            input: UpdateBlogPostInput
            thumbnailFile?: File | null
        }) => updateBlogPost(id, input, { thumbnailFile }),
        onSuccess: (_data, vars) => {
            void queryClient.invalidateQueries({ queryKey: blogQueryKeys.all })
            void queryClient.invalidateQueries({ queryKey: blogQueryKeys.detail(vars.id) })
        },
    })

    const remove = useMutation({
        mutationFn: (id: string) => deleteBlogPost(id),
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: blogQueryKeys.all })
        },
    })

    return { create, update, remove }
}

// ——— Dashboard: list ———

export function useBlogDashboardListState() {
    const [search, setSearch] = useState('')
    const { remove } = useBlogCrudMutations()

    const postsQuery = useQuery({
        queryKey: blogQueryKeys.list(),
        queryFn: () => listBlogs(),
        staleTime: 30_000,
        gcTime: 10 * 60_000,
        refetchOnWindowFocus: false,
    })

    const blogPosts = postsQuery.data ?? []

    const filteredPosts = useMemo(() => {
        const query = search.trim().toLowerCase()
        if (!query) return blogPosts
        return blogPosts.filter((post) => {
            const catLabel = (post.categoryName ?? post.category).toLowerCase()
            return (
                post.title.toLowerCase().includes(query) ||
                catLabel.includes(query) ||
                post.author.name.toLowerCase().includes(query)
            )
        })
    }, [search, blogPosts])

    const deleteRow = useCallback(
        async (id: string, title: string) => {
            if (remove.isPending) return
            const ok = window.confirm(`Hapus artikel "${title}"?`)
            if (!ok) return
            try {
                await remove.mutateAsync(id)
            } catch {
                /* handled via query */
            }
        },
        [remove],
    )

    return {
        search,
        setSearch,
        postsQuery,
        blogPosts,
        filteredPosts,
        deleteRow,
        remove,
    }
}

// ——— Dashboard: create form ———

export function useBlogCreateFormState() {
    const { user } = useAuth()
    const authorFromSession = authorBlogFromPublicUser(user)

    const categoriesQuery = useQuery({
        queryKey: ['blog-categories', 'list'],
        queryFn: listBlogCategories,
        staleTime: 30_000,
        gcTime: 10 * 60_000,
        refetchOnWindowFocus: false,
    })

    const categoryOptions = useMemo(() => {
        return (categoriesQuery.data ?? [])
            .filter((c) => c.status === 'active')
            .map((c) => ({ value: c.slug, label: c.name }))
    }, [categoriesQuery.data])

    const thumbInputRef = useRef<HTMLInputElement>(null)
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
    const [description, setDescription] = useState('')
    const [content, setContent] = useState('')
    const [status, setStatus] = useState<BlogPostStatus>('draft')

    const slug = useMemo(() => slugifyFromName(title), [title])

    const thumbnailPreviewUrl = useMemo(
        () => (thumbnailFile ? URL.createObjectURL(thumbnailFile) : null),
        [thumbnailFile],
    )

    useEffect(() => {
        return () => {
            if (thumbnailPreviewUrl) URL.revokeObjectURL(thumbnailPreviewUrl)
        }
    }, [thumbnailPreviewUrl])

    const canSubmit =
        title.trim().length > 0 &&
        slug.length > 0 &&
        category.length > 0 &&
        content.trim().length > 0 &&
        authorFromSession != null

    const createPayload = useMemo((): CreateBlogPostPayload | null => {
        if (!authorFromSession) return null
        return {
            title: title.trim(),
            slug,
            description: description.trim(),
            content: content.trim(),
            status,
            category,
            author: authorFromSession,
            thumbnailFile,
        }
    }, [
        title,
        slug,
        description,
        content,
        status,
        category,
        authorFromSession,
        thumbnailFile,
    ])

    return {
        categoriesQuery,
        categoryOptions,
        authorFromSession,
        thumbInputRef,
        title,
        setTitle,
        category,
        setCategory,
        thumbnailFile,
        setThumbnailFile,
        description,
        setDescription,
        content,
        setContent,
        status,
        setStatus,
        slug,
        thumbnailPreviewUrl,
        canSubmit,
        createPayload,
    }
}

// ——— Dashboard: edit form ———

export function useBlogEditFormState(postId: string, post: BlogPost | null) {
    const { user } = useAuth()
    const authorFromSession = authorBlogFromPublicUser(user)

    const categoriesQuery = useQuery({
        queryKey: ['blog-categories', 'list'],
        queryFn: listBlogCategories,
        staleTime: 30_000,
        gcTime: 10 * 60_000,
        refetchOnWindowFocus: false,
    })

    const categoryOptions = useMemo(() => {
        return (categoriesQuery.data ?? [])
            .filter((c) => c.status === 'active')
            .map((c) => ({ value: c.slug, label: c.name }))
    }, [categoriesQuery.data])

    const categorySelectOptions = useMemo(() => {
        if (!post) return categoryOptions
        if (categoryOptions.some((o) => o.value === post.category)) return categoryOptions
        return [
            {
                value: post.category,
                label: `${post.categoryName ?? post.category} (tidak aktif — pilih kategori lain untuk simpan)`,
            },
            ...categoryOptions,
        ]
    }, [categoryOptions, post])

    const thumbInputRef = useRef<HTMLInputElement>(null)
    const [title, setTitle] = useState('')
    const [slug, setSlug] = useState('')
    const [category, setCategory] = useState('')
    const [thumbnail, setThumbnail] = useState('')
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
    const [description, setDescription] = useState('')
    const [content, setContent] = useState('')
    const [status, setStatus] = useState<BlogPostStatus>('draft')
    const [confirmOpen, setConfirmOpen] = useState(false)

    useEffect(() => {
        if (!post) return
        setTitle(post.title)
        setSlug(post.slug)
        setCategory(post.category)
        setThumbnail(post.thumbnail)
        setDescription(post.description)
        setContent(post.content)
        setStatus(post.status)
    }, [post])

    const newThumbPreviewUrl = useMemo(
        () => (thumbnailFile ? URL.createObjectURL(thumbnailFile) : null),
        [thumbnailFile],
    )

    useEffect(() => {
        return () => {
            if (newThumbPreviewUrl) URL.revokeObjectURL(newThumbPreviewUrl)
        }
    }, [newThumbPreviewUrl])

    const clearThumbnailFile = useCallback(() => {
        setThumbnailFile(null)
    }, [])

    const canSubmit =
        title.trim().length > 0 &&
        slug.trim().length > 0 &&
        category.length > 0 &&
        content.trim().length > 0 &&
        authorFromSession != null

    const updateVariables = useMemo(() => {
        if (!canSubmit) return null
        return {
            id: postId,
            input: {
                title: title.trim(),
                slug: slug.trim(),
                ...(!thumbnailFile ? { thumbnail: thumbnail.trim() } : {}),
                description: description.trim(),
                content: content.trim(),
                status,
                category,
                author: authorFromSession,
            },
            thumbnailFile,
        }
    }, [
        canSubmit,
        authorFromSession,
        postId,
        title,
        slug,
        thumbnailFile,
        thumbnail,
        description,
        content,
        status,
        category,
    ])

    return {
        categoriesQuery,
        categoryOptions,
        categorySelectOptions,
        authorFromSession,
        thumbInputRef,
        title,
        setTitle,
        slug,
        setSlug,
        category,
        setCategory,
        thumbnail,
        thumbnailFile,
        setThumbnailFile,
        clearThumbnailFile,
        description,
        setDescription,
        content,
        setContent,
        status,
        setStatus,
        newThumbPreviewUrl,
        canSubmit,
        updateVariables,
        confirmOpen,
        setConfirmOpen,
    }
}
