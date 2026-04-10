import * as React from 'react'

import { cn } from '#/lib/utils'

export const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentPropsWithoutRef<'input'>
>(({ className, type = 'text', ...props }, ref) => (
  <input
    type={type}
    ref={ref}
    className={cn(
      'w-full rounded-xl border border-emerald-100 bg-white px-4 py-2.5 text-sm text-[#173a40] outline-none transition placeholder:text-gray-400 focus:border-emerald-400',
      className,
    )}
    {...props}
  />
))
Input.displayName = 'Input'
