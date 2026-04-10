import { createFileRoute } from '@tanstack/react-router'
import { ChevronRight, FileText, Plus, Search } from 'lucide-react'
import { useMemo, useState } from 'react'

export const Route = createFileRoute('/dashboard/blog/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [search, setSearch] = useState('')

  const blogPosts = [
    {
      id: 'POST-001',
      title: 'Tips Merawat Kucing Indoor Supaya Tetap Aktif',
      author: 'Admin Pawsome',
      category: 'Perawatan',
      status: 'Published',
      publishedAt: '2026-04-02',
      views: 1240,
    },
    {
      id: 'POST-002',
      title: '7 Makanan Anjing yang Aman untuk Harian',
      author: 'Rizki',
      category: 'Nutrisi',
      status: 'Draft',
      publishedAt: '-',
      views: 0,
    },
    {
      id: 'POST-003',
      title: 'Checklist Grooming Bulanan untuk Hewan Peliharaan',
      author: 'Admin Pawsome',
      category: 'Grooming',
      status: 'Published',
      publishedAt: '2026-04-08',
      views: 876,
    },
  ]

  const filteredPosts = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return blogPosts
    return blogPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query) ||
        post.author.toLowerCase().includes(query),
    )
  }, [search])

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
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_4px_14px_0_rgba(16,185,129,0.15)] transition-colors hover:bg-emerald-600"
        >
          <Plus size={16} />
          Add Post
        </button>
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

        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-emerald-50 text-xs font-semibold text-emerald-700 uppercase">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Author</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Published At</th>
                <th className="px-4 py-3">Views</th>
              </tr>
            </thead>
            <tbody>
              {filteredPosts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-sm text-gray-500">
                    Tidak ada post yang cocok dengan pencarian.
                  </td>
                </tr>
              ) : (
                filteredPosts.map((post) => (
                  <tr key={post.id} className="border-t border-emerald-50">
                    <td className="px-4 py-3 font-medium text-[#173a40]">{post.title}</td>
                    <td className="px-4 py-3 text-gray-600">{post.category}</td>
                    <td className="px-4 py-3 text-gray-600">{post.author}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                          post.status === 'Published'
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-amber-100 text-amber-700'
                        }`}
                      >
                        {post.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{post.publishedAt}</td>
                    <td className="px-4 py-3 text-gray-600">{post.views.toLocaleString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
