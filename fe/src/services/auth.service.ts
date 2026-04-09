import { API_BASE_URL } from '../lib/config'

export type PublicUser = {
  _id: string
  name: string
  email: string
  pictures?: string
  createdAt?: string
  updatedAt?: string
}

export type AuthResponse = {
  message?: string
  user: PublicUser
}

async function requestJson<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const url = `${API_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`
  const headers = new Headers(init.headers)
  headers.set('Accept', 'application/json')
  if (!headers.has('Content-Type') && init.body != null) {
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
    const message =
      typeof (data as any)?.message === 'string'
        ? (data as any).message
        : `Request failed (${res.status})`
    throw new Error(message)
  }

  return data as T
}

export type SignupInput = {
  name: string
  email: string
  password: string
  pictures?: string
}

export async function signup(input: SignupInput): Promise<AuthResponse> {
  return requestJson<AuthResponse>('/auth/signup', {
    method: 'POST',
    body: JSON.stringify(input),
  })
}

// Endpoint belum ada di BE sekarang, tapi disiapkan supaya FE tinggal pakai.
export type SigninInput = { email: string; password: string }
export async function signin(input: SigninInput): Promise<AuthResponse> {
  return requestJson<AuthResponse>('/auth/signin', {
    method: 'POST',
    body: JSON.stringify(input),
  })
}

export async function signout(): Promise<{ message?: string }> {
  return requestJson<{ message?: string }>('/auth/signout', {
    method: 'POST',
  })
}

export async function getSession(): Promise<AuthResponse> {
  return requestJson<AuthResponse>('/auth/session')
}

