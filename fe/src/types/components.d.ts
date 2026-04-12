// ================================ Pagination Types ================================ //
type PaginationProps = {
    page: number
    totalPages: number
    onPageChange: (page: number) => void
    totalItems: number
    pageSize: number
    itemLabel?: string
    className?: string
    maxPageButtons?: number
}

// ================================ Button Types ================================ //
type ButtonVariant = 'default' | 'outline' | 'ghost' | 'destructive'

type ButtonSize = 'sm' | 'md' | 'icon'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant
    size?: ButtonSize
}

// ================================ Dialog Types ================================ //
type DialogContextValue = {
    open: boolean
    onOpenChange: (open: boolean) => void
}

// ================================ Empty Types ================================ //
type EmptyProps = {
    title?: string
    description?: string
}

// ================================ QuillEditor Types ================================ //
type QuillEditorProps = {
    value: string
    onChange: (value: string) => void
    placeholder?: string
    className?: string
}