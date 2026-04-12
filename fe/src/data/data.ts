import {
    BarChart3,
    BookText,
    HelpCircle,
    LayoutDashboard,
    MessageCircle,
    Package,
    Settings,
    ShoppingBag,
    Star,
    Users2,
} from 'lucide-react'

type SidebarItem = {
    id: string
    label: string
    icon: React.ComponentType<{ size?: number; className?: string }>
    href?: string
    to?: string
    subItems?: Array<{
        id: string
        label: string
        to: string
    }>
}

export const mainMenuItems: SidebarItem[] = [
    {
        id: 'dashboard',
        label: 'Dashboard',
        icon: LayoutDashboard,
        to: '/dashboard',
    },
    {
        id: 'analytics',
        label: 'Analytics',
        icon: BarChart3,
        to: '/dashboard/analytics',
    },
    { id: 'orders', label: 'Orders', icon: ShoppingBag, to: '/dashboard/orders' },
    {
        id: 'inventory',
        label: 'Inventory',
        icon: Package,
        subItems: [
            { id: 'inventory-post', label: 'Post', to: '/dashboard/inventory' },
            {
                id: 'inventory-category',
                label: 'Category',
                to: '/dashboard/inventory/categories',
            },
        ],
    },
    {
        id: 'blog',
        label: 'Blog',
        icon: BookText,
        subItems: [
            { id: 'blog-post', label: 'Post', to: '/dashboard/blog' },
            {
                id: 'blog-category',
                label: 'Category',
                to: '/dashboard/blog/categories',
            },
        ],
    },
    {
        id: 'testimonials',
        label: 'Testimonials',
        icon: Star,
        to: '/dashboard/testimonials',
    },
    {
        id: 'customers',
        label: 'Customers',
        icon: Users2,
        to: '/dashboard/costumers',
    },
    {
        id: 'template-whatsapp',
        label: 'Template WhatsApp',
        icon: MessageCircle,
        to: '/dashboard/template-whatsapp',
    },
]

export const accountItems: SidebarItem[] = [
    {
        id: 'settings',
        label: 'Settings',
        icon: Settings,
        href: '/dashboard/settings',
    },
    {
        id: 'support',
        label: 'Support',
        icon: HelpCircle,
        href: '/dashboard/support',
    },
]