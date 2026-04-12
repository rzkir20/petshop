import { ChevronLeft, ChevronRight } from 'lucide-react'

import { useEffect, useMemo, useState } from 'react'

import { cn } from '#/lib/utils'

export function usePagination<T>(
  items: readonly T[],
  pageSize: number,
  /** When this value changes (e.g. filter tab), current page resets to 1. */
  resetKey?: string | number,
) {
  const [page, setPage] = useState(1)
  const totalItems = items.length
  const totalPages = totalItems === 0 ? 0 : Math.ceil(totalItems / pageSize)

  const pageSlice = useMemo(() => {
    const start = (page - 1) * pageSize
    return items.slice(start, start + pageSize)
  }, [items, page, pageSize])

  useEffect(() => {
    setPage(1)
  }, [resetKey])

  useEffect(() => {
    if (totalPages === 0) return
    setPage((p) => Math.min(p, totalPages))
  }, [totalPages])

  return {
    page,
    setPage,
    totalPages,
    totalItems,
    pageSlice,
  }
}

function visiblePageRange(
  current: number,
  total: number,
  max: number,
): number[] {
  if (total <= 0) return []
  if (total <= max) return Array.from({ length: total }, (_, i) => i + 1)
  let start = Math.max(1, current - Math.floor(max / 2))
  let end = start + max - 1
  if (end > total) {
    end = total
    start = Math.max(1, end - max + 1)
  }
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}

export function Pagination({
  page,
  totalPages,
  onPageChange,
  totalItems,
  pageSize,
  itemLabel = 'item',
  className,
  maxPageButtons = 5,
}: PaginationProps) {
  const from = totalItems === 0 ? 0 : (page - 1) * pageSize + 1
  const to = Math.min(page * pageSize, totalItems)

  const pages = visiblePageRange(page, totalPages, maxPageButtons)
  const canPrev = page > 1 && totalPages > 0
  const canNext = page < totalPages && totalPages > 0

  return (
    <div
      className={cn(
        'flex flex-col gap-4 border-t border-gray-50 bg-gray-50/20 p-8 sm:flex-row sm:items-center sm:justify-between',
        className,
      )}
    >
      <p className="text-sm font-medium text-gray-500">
        Showing{' '}
        <span className="font-bold text-[#173a40]">
          {totalItems === 0 ? '0' : `${from}-${to}`}
        </span>{' '}
        of <span className="font-bold text-[#173a40]">{totalItems}</span>{' '}
        {itemLabel}
      </p>

      {totalPages > 0 ? (
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            disabled={!canPrev}
            onClick={() => canPrev && onPageChange(page - 1)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-100 text-gray-400 transition-all hover:bg-emerald-50 disabled:pointer-events-none disabled:opacity-40"
            aria-label="Previous page"
          >
            <ChevronLeft size={18} />
          </button>
          {pages.map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => onPageChange(n)}
              className={cn(
                'flex h-10 min-w-10 items-center justify-center rounded-full px-2 text-sm font-bold transition-all',
                n === page
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'border border-emerald-100 text-gray-600 hover:bg-emerald-50',
              )}
            >
              {n}
            </button>
          ))}
          <button
            type="button"
            disabled={!canNext}
            onClick={() => canNext && onPageChange(page + 1)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-100 text-gray-400 transition-all hover:bg-emerald-50 disabled:pointer-events-none disabled:opacity-40"
            aria-label="Next page"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      ) : null}
    </div>
  )
}
