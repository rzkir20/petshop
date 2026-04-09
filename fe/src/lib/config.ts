export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.toString() ?? 'http://localhost:3001'

export const STORAGE_KEYS = {
  token: 'petshop:token',
  user: 'petshop:user',
} as const

