import { Skeleton } from '#/components/ui/skelaton'

const INVENTORY_HEAD = [
  'Product Title',
  'Stock Level',
  'Reorder Point',
  'Status',
  'Last Updated',
  'Actions',
] as const

const CATEGORIES_HEAD = [
  'Category Name',
  'Description',
  'Products',
  'Slug',
  'Updated',
  'Status',
  'Action',
] as const

// ============================ Inventory Table Skelaton ============================ //
export function InventoryTableSkeleton({
  rows = 8,
}: InventoryTableSkeletonProps) {
  return (
    <table className="w-full text-left">
      <thead className="border-b border-emerald-50">
        <tr>
          <th className="w-12 py-4 pl-6" />
          <th className="w-10 px-4 py-4">
            <Skeleton className="mx-auto h-4 w-4 rounded" />
          </th>
          {INVENTORY_HEAD.map((h) => (
            <th
              key={h}
              className={`px-4 py-4 text-[10px] font-bold tracking-widest text-gray-400 uppercase ${
                h === 'Actions' ? 'text-right' : ''
              }`}
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-emerald-50/50">
        {Array.from({ length: rows }, (_, i) => (
          <tr key={i} className="hover:bg-transparent">
            <td className="py-5 pl-6">
              <Skeleton className="h-8 w-8 rounded-lg" />
            </td>
            <td className="px-4 py-5">
              <Skeleton className="h-4 w-4 rounded" />
            </td>
            <td className="px-4 py-5">
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 shrink-0 rounded-xl" />
                <Skeleton className="h-4 max-w-xs flex-1" />
              </div>
            </td>
            <td className="px-4 py-5">
              <Skeleton className="h-4 w-16" />
            </td>
            <td className="px-4 py-5">
              <Skeleton className="h-4 w-20" />
            </td>
            <td className="px-4 py-5">
              <Skeleton className="h-7 w-24 rounded-full" />
            </td>
            <td className="px-4 py-5">
              <Skeleton className="h-3 w-28" />
            </td>
            <td className="px-4 py-5 text-right">
              <div className="inline-flex justify-end gap-2">
                <Skeleton className="h-8 w-8 rounded-lg" />
                <Skeleton className="h-8 w-8 rounded-lg" />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

// ============================ Categories Table Skelaton ============================ //
export function CategoriesTableSkeleton({
  rows = 8,
}: CategoriesTableSkeletonProps) {
  return (
    <table className="w-full min-w-[680px] text-left">
      <thead>
        <tr className="text-xs font-semibold tracking-wide text-gray-400 uppercase">
          {CATEGORIES_HEAD.map((h) => (
            <th
              key={h}
              className={`px-4 py-3 ${
                h === 'Products' ? 'tabular-nums' : ''
              } ${h === 'Action' ? 'text-right' : ''}`}
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: rows }, (_, i) => (
          <tr key={i} className="border-t border-emerald-50">
            <td className="px-4 py-4">
              <Skeleton className="h-4 w-36" />
            </td>
            <td className="max-w-xs px-4 py-4">
              <Skeleton className="h-4 max-w-48" />
            </td>
            <td className="px-4 py-4 text-right tabular-nums">
              <Skeleton className="ml-auto h-4 w-10" />
            </td>
            <td className="px-4 py-4">
              <Skeleton className="h-4 w-28" />
            </td>
            <td className="px-4 py-4">
              <Skeleton className="h-3 w-24" />
            </td>
            <td className="px-4 py-4">
              <Skeleton className="h-6 w-16 rounded-full" />
            </td>
            <td className="px-4 py-4 text-right">
              <div className="inline-flex justify-end gap-1">
                <Skeleton className="h-9 w-9 rounded-lg" />
                <Skeleton className="h-9 w-9 rounded-lg" />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

// ============================ Form Products Skelaton ============================ //
function FormFieldSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="h-3 w-24" />
      <Skeleton className="h-10 w-full rounded-lg" />
    </div>
  )
}

// ============================ Form Create Products Skelaton ============================ //
export function ProductCreateFormSkeleton() {
  return (
    <div className="flex flex-col space-y-6" aria-hidden>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormFieldSkeleton />
        <FormFieldSkeleton />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <FormFieldSkeleton />
        <FormFieldSkeleton />
        <FormFieldSkeleton />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <FormFieldSkeleton />
        <FormFieldSkeleton />
        <FormFieldSkeleton />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormFieldSkeleton />
        <FormFieldSkeleton />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormFieldSkeleton />
        <FormFieldSkeleton />
      </div>
      <div className="flex flex-col gap-2">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-40 w-full rounded-xl" />
      </div>
      <div className="flex flex-col gap-2">
        <Skeleton className="h-3 w-28" />
        <Skeleton className="h-24 w-full rounded-xl" />
      </div>
      <div className="flex flex-wrap justify-end gap-2 pt-2">
        <Skeleton className="h-10 w-24 rounded-full" />
        <Skeleton className="h-10 w-36 rounded-full" />
      </div>
    </div>
  )
}
