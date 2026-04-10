import * as React from 'react'

import { cn } from '#/lib/utils'

export const Label = React.forwardRef<
  HTMLLabelElement,
  React.ComponentPropsWithoutRef<'label'>
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn(
      'mb-1.5 block text-xs font-semibold tracking-wide text-gray-500 uppercase',
      className,
    )}
    {...props}
  />
))
Label.displayName = 'Label'
