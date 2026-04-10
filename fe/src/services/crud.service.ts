import { API_BASE_URL } from '../lib/config'

/**
 * HTTP JSON helper with credentials; reusable for any API module.
 */
export async function requestJson<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const base = API_BASE_URL
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  const url = `${base}${normalizedPath}`
  const headers = new Headers(init.headers)
  headers.set('Accept', 'application/json')
  const isFormDataBody =
    typeof FormData !== 'undefined' && init.body instanceof FormData
  if (!headers.has('Content-Type') && init.body != null && !isFormDataBody) {
    headers.set('Content-Type', 'application/json')
  }

  const res = await fetch(url, { ...init, headers, credentials: 'include' })
  const text = await res.text()
  let data: unknown = null
  if (text) {
    try {
      data = JSON.parse(text) as unknown
    } catch {
      data = { message: text }
    }
  }

  if (!res.ok) {
    const body = data && typeof data === 'object' ? data : null
    const rawMsg =
      body && 'message' in body ? (body as { message: unknown }).message : null
    const message =
      typeof rawMsg === 'string' ? rawMsg : `Request failed (${res.status})`
    throw new Error(message)
  }

  return data as T
}

export type RestCrudResourceOptions = {
  /** e.g. "/categories" */
  basePath: string
  /** JSON key for collection on GET list, e.g. "categories" */
  listKey: string
  /** JSON key for single entity on GET/POST/PATCH, e.g. "category" */
  itemKey: string
}

/**
 * Standard REST CRUD: GET collection, GET/PATCH/DELETE by id, POST create.
 * Adjust listKey/itemKey to match your backend envelope.
 */
export function createRestCrudResource<
  TItem,
  TCreate extends object = object,
  TUpdate extends object = object,
>(opts: RestCrudResourceOptions) {
  const base = opts.basePath.replace(/\/$/, '')
  const { listKey, itemKey } = opts

  return {
    async list(): Promise<TItem[]> {
      const res = await requestJson<Record<string, unknown>>(base, {
        method: 'GET',
      })
      const arr = res[listKey]
      if (!Array.isArray(arr)) {
        throw new Error('Invalid list response')
      }
      return arr as TItem[]
    },

    async get(id: string): Promise<TItem> {
      const res = await requestJson<Record<string, unknown>>(
        `${base}/${encodeURIComponent(id)}`,
        { method: 'GET' },
      )
      return res[itemKey] as TItem
    },

    async create(body: TCreate): Promise<TItem> {
      const res = await requestJson<Record<string, unknown>>(base, {
        method: 'POST',
        body: JSON.stringify(body),
      })
      return res[itemKey] as TItem
    },

    async update(id: string, body: TUpdate): Promise<TItem> {
      const res = await requestJson<Record<string, unknown>>(
        `${base}/${encodeURIComponent(id)}`,
        {
          method: 'PATCH',
          body: JSON.stringify(body),
        },
      )
      return res[itemKey] as TItem
    },

    async remove(id: string): Promise<void> {
      await requestJson<unknown>(
        `${base}/${encodeURIComponent(id)}`,
        { method: 'DELETE' },
      )
    },
  }
}
