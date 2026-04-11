import * as React from 'react'

import { cn } from '#/lib/utils'

export function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-emerald-100/70', className)}
      {...props}
    />
  )
}
