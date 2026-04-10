const rawApiBaseUrl = "https://petshop.spacedigitalia.biz.id"

function normalizeApiBaseUrl(value: unknown): string {
  if (typeof value !== 'string') return ''

  const normalized = value.trim()
  if (!normalized) return ''

  const lowered = normalized.toLowerCase()
  if (lowered === 'undefined' || lowered === 'null') {
    return ''
  }

  return normalized.replace(/\/$/, '')
}

export const API_BASE_URL = normalizeApiBaseUrl(rawApiBaseUrl)

export const STORAGE_KEYS = {
  token: 'petshop:token',
  user: 'petshop:user',
} as const
