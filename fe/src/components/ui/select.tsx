import * as React from 'react'

import { cn } from '#/lib/utils'

export const Select = React.forwardRef<
  HTMLSelectElement,
  React.ComponentPropsWithoutRef<'select'>
>(({ className, children, ...props }, ref) => (
  <select
    ref={ref}
    className={cn(
      'w-full cursor-pointer rounded-xl border border-emerald-100 bg-white px-4 py-2.5 text-sm text-[#173a40] outline-none transition focus:border-emerald-400',
      className,
    )}
    {...props}
  >
    {children}
  </select>
))
Select.displayName = 'Select'
