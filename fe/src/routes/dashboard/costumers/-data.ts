export type OrderRow = {
  id: string
  items: string
  date: string
  status: 'completed' | 'returned' | 'processing'
  amount: string
}

export type MonthlyBar = { label: string; heightPct: number; highlight?: boolean; title: string }

export type CustomerDetail = {
  slug: string
  name: string
  avatarSeed: string
  memberTier: string
  memberTierClass: string
  isActive: boolean
  email: string
  phone: string
  location: string
  totalOrders: number
  totalSpending: string
  memberSince: string
  orders: OrderRow[]
  perks: { text: string; locked?: boolean }[]
  monthlySpending: MonthlyBar[]
  tags: string[]
}

export const customers: CustomerDetail[] = [
  {
    slug: 'sarah-jenkins',
    name: 'Sarah Jenkins',
    avatarSeed: 'Sarah',
    memberTier: 'Gold Member',
    memberTierClass: 'bg-orange-100 text-[#ff6b35]',
    isActive: true,
    email: 'sarah.jenkins@email.com',
    phone: '+62 812-3456-7890',
    location: 'Jakarta, Indonesia',
    totalOrders: 24,
    totalSpending: 'Rp 12.450.000',
    memberSince: 'Jan 12, 2022',
    orders: [
      {
        id: '#PS-9021',
        items: '3 items (Dry Food, Toy...)',
        date: 'Oct 24, 2023',
        status: 'completed',
        amount: 'Rp 450.000',
      },
      {
        id: '#PS-8845',
        items: '1 item (Premium Salmon)',
        date: 'Oct 12, 2023',
        status: 'completed',
        amount: 'Rp 210.000',
      },
      {
        id: '#PS-8712',
        items: '2 items (Grooming Kit)',
        date: 'Sep 28, 2023',
        status: 'returned',
        amount: 'Rp 320.000',
      },
      {
        id: '#PS-8550',
        items: '4 items (Collars, Treats)',
        date: 'Sep 15, 2023',
        status: 'completed',
        amount: 'Rp 1.150.000',
      },
    ],
    perks: [
      { text: '15% Member-only discount' },
      { text: 'Priority Grooming Booking' },
      { text: 'Free Shipping on all orders' },
      { text: 'Personal Pet Nutritionist (Platinum)', locked: true },
    ],
    monthlySpending: [
      { label: 'JUN', heightPct: 40, title: 'Jun: 450k' },
      { label: 'JUL', heightPct: 60, title: 'Jul: 600k' },
      { label: 'AUG', heightPct: 30, title: 'Aug: 300k' },
      { label: 'SEP', heightPct: 85, title: 'Sep: 850k', highlight: true },
      { label: 'OCT', heightPct: 55, title: 'Oct: 550k' },
    ],
    tags: ['Dog Owner', 'High Value', 'Frequent Buyer'],
  },
  {
    slug: 'budi-santoso',
    name: 'Budi Santoso',
    avatarSeed: 'Budi',
    memberTier: 'Silver Member',
    memberTierClass: 'bg-slate-100 text-slate-600',
    isActive: true,
    email: 'budi.s@email.com',
    phone: '+62 811-2222-3333',
    location: 'Bandung, Indonesia',
    totalOrders: 12,
    totalSpending: 'Rp 4.200.000',
    memberSince: 'Mar 3, 2023',
    orders: [
      {
        id: '#PS-8900',
        items: '2 items',
        date: 'Oct 1, 2023',
        status: 'completed',
        amount: 'Rp 180.000',
      },
    ],
    perks: [
      { text: '10% Member discount' },
      { text: 'Birthday voucher' },
    ],
    monthlySpending: [
      { label: 'JUN', heightPct: 25, title: 'Jun' },
      { label: 'JUL', heightPct: 40, title: 'Jul' },
      { label: 'AUG', heightPct: 35, title: 'Aug' },
      { label: 'SEP', heightPct: 50, title: 'Sep' },
      { label: 'OCT', heightPct: 45, title: 'Oct' },
    ],
    tags: ['Cat Owner', 'Newsletter'],
  },
]

export function getCustomerBySlug(slug: string): CustomerDetail | undefined {
  return customers.find((c) => c.slug === slug)
}
