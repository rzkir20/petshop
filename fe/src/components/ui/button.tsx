import * as React from 'react'

import { cn } from '#/lib/utils'

type ButtonVariant = 'default' | 'outline' | 'ghost' | 'destructive'

type ButtonSize = 'sm' | 'md' | 'icon'

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
}

const variantClass: Record<ButtonVariant, string> = {
  default:
    'bg-emerald-500 text-white shadow-[0_4px_14px_0_rgba(16,185,129,0.15)] hover:bg-emerald-600',
  outline:
    'border border-emerald-100 bg-white text-gray-700 hover:bg-emerald-50',
  ghost: 'bg-transparent text-gray-600 hover:bg-emerald-50',
  destructive: 'bg-red-600 text-white hover:bg-red-700',
}

const sizeClass: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-5 py-2.5 text-sm',
  icon: 'h-8 w-8 p-0',
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = 'default', size = 'md', type = 'button', ...props },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-50',
          variantClass[variant],
          sizeClass[size],
          className,
        )}
        {...props}
      />
    )
  },
)

Button.displayName = 'Button'
