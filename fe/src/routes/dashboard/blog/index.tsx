import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { ChevronRight, Edit2, FileText, Plus, RefreshCw, Search, Trash2 } from 'lucide-react'

import { formatUpdatedAt } from '#/hooks/format-date'
import { useBlogDashboardListState } from '#/services/blog.service'

export const Route = createFileRoute('/dashboard/blog/')({
  component: RouteComponent,
})

function statusLabel(s: BlogPostStatus): string {
  return s === 'published' ? 'Published' : 'Draft'
}

function publishedAtDisplay(post: BlogPost): string {
  if (post.status !== 'published') return '—'
  const d = new Date(post.createdAt)
  if (Number.isNaN(d.getTime())) return '—'
  return d.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function RouteComponent() {
  const navigate = useNavigate()
  const { search, setSearch, postsQuery, blogPosts, filteredPosts, deleteRow, remove } =
    useBlogDashboardListState()

  return (
    <div className="space-y-6 p-8">
      <section className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="flex items-center gap-2 text-xs font-semibold tracking-wide text-emerald-600">
            <FileText size={14} />
            Blog
            <ChevronRight size={12} />
            Posts
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight">Blog Posts</h1>
          <p className="mt-1 text-gray-500">Kelola konten artikel blog untuk storefront.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => void postsQuery.refetch()}
            disabled={postsQuery.isFetching}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-100 px-4 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-emerald-50 disabled:opacity-50"
            aria-label="Refresh"
          >
            <RefreshCw size={16} className={postsQuery.isFetching ? 'animate-spin' : ''} />
            Refresh
          </button>
          <button
            type="button"
            onClick={() => void navigate({ to: '/dashboard/blog/create' })}
            className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_4px_14px_0_rgba(16,185,129,0.15)] transition-colors hover:bg-emerald-600"
          >
            <Plus size={16} />
            Add Post
          </button>
        </div>
      </section>

      <section className="rounded-[32px] border border-emerald-50 bg-white p-5 shadow-sm">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="relative w-full max-w-sm">
            <Search
              size={16}
              className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search post title..."
              aria-label="Cari judul post"
              className="w-full rounded-full border border-emerald-100 bg-white py-2 pr-4 pl-9 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>
        </div>

        {postsQuery.isPending ? (
          <p className="py-12 text-center text-sm text-gray-500">Memuat post…</p>
        ) : postsQuery.isError ? (
          <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
            {postsQuery.error instanceof Error
              ? postsQuery.error.message
              : 'Gagal memuat daftar blog.'}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[880px] text-left text-sm">
              <thead className="bg-emerald-50 text-xs font-semibold text-emerald-700 uppercase">
                <tr>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Author</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Published</th>
                  <th className="px-4 py-3">Updated</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPosts.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-12 text-center text-sm text-gray-500">
                      {blogPosts.length === 0
                        ? 'Belum ada post. Buat post baru dari tombol Add Post.'
                        : 'Tidak ada post yang cocok dengan pencarian.'}
                    </td>
                  </tr>
                ) : (
                  filteredPosts.map((post) => (
                    <tr key={post._id} className="border-t border-emerald-50">
                      <td className="px-4 py-3 font-medium text-[#173a40]">{post.title}</td>
                      <td className="px-4 py-3 text-gray-600">
                        {post.categoryName ?? post.category}
                      </td>
                      <td className="px-4 py-3 text-gray-600">{post.author.name}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                            post.status === 'published'
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-amber-100 text-amber-700'
                          }`}
                        >
                          {statusLabel(post.status)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{publishedAtDisplay(post)}</td>
                      <td className="px-4 py-3 text-xs text-gray-500">
                        {formatUpdatedAt(post.updatedAt)}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          type="button"
                          onClick={() =>
                            void navigate({
                              to: '/dashboard/blog/$id',
                              params: { id: post._id },
                            })
                          }
                          className="inline-flex p-1 text-gray-400 hover:text-emerald-500"
                          aria-label="Edit"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          type="button"
                          disabled={remove.isPending}
                          onClick={() => void deleteRow(post._id, post.title)}
                          className="ml-2 inline-flex p-1 text-gray-400 hover:text-red-500 disabled:opacity-50"
                          aria-label="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  )
}
