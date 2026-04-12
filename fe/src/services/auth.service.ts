import type { ChangeEvent } from 'react'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import toast from 'react-hot-toast'

import { API_BASE_URL } from '../lib/config'


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

export async function signup(input: SignupInput): Promise<AuthResponse> {
  return requestJson<AuthResponse>('/auth/signup', {
    method: 'POST',
    body: JSON.stringify(input),
  })
}

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

export async function patchProfile(
  input: PatchProfileInput,
): Promise<AuthResponse> {
  return requestJson<AuthResponse>('/auth/profile', {
    method: 'PATCH',
    body: JSON.stringify(input),
  })
}

export async function changePassword(
  input: ChangePasswordInput,
): Promise<{ message?: string }> {
  return requestJson<{ message?: string }>('/auth/password', {
    method: 'POST',
    body: JSON.stringify(input),
  })
}

export async function uploadProfilePicture(
  file: File,
): Promise<AuthResponse> {
  const url = `${API_BASE_URL}/auth/profile/picture`
  const form = new FormData()
  form.append('picture', file)

  const res = await fetch(url, {
    method: 'POST',
    body: form,
    credentials: 'include',
    headers: { Accept: 'application/json' },
  })

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
    const body = data as { message?: string }
    const message =
      typeof body.message === 'string'
        ? body.message
        : `Request failed (${res.status})`
    throw new Error(message)
  }

  return data as AuthResponse
}

const DEFAULT_SETTINGS_NAME = 'Admin Pawsome'

const DEFAULT_SETTINGS_EMAIL = 'admin@pawsomeshop.com'

/** Satu field password + ikon mata show/hide. */
export function usePasswordFieldVisibility() {
  const [visible, setVisible] = useState(false)
  const toggleVisibility = useCallback(() => {
    setVisible((v) => !v)
  }, [])
  const hide = useCallback(() => setVisible(false), [])
  const inputType = visible ? ('text' as const) : ('password' as const)
  return { visible, toggleVisibility, hide, inputType }
}

export function useSettingsAuthState(
  user: PublicUser | null | undefined,
  profileActions: SettingsProfileActions,
) {
  const passwordCurrent = usePasswordFieldVisibility()
  const passwordNew = usePasswordFieldVisibility()
  const passwordConfirm = usePasswordFieldVisibility()

  const { updateProfile, uploadProfilePicture: uploadProfilePictureFn } =
    profileActions
  const seededFromUser = useRef(false)

  const [fullName, setFullName] = useState(
    () => user?.name ?? DEFAULT_SETTINGS_NAME,
  )
  const [email, setEmail] = useState(
    () => user?.email ?? DEFAULT_SETTINGS_EMAIL,
  )
  const [phone, setPhone] = useState(() => user?.phone ?? '')

  const [savingProfile, setSavingProfile] = useState(false)
  const [uploadingAvatar, setUploadingAvatar] = useState(false)

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [savingPassword, setSavingPassword] = useState(false)

  useEffect(() => {
    if (!user || seededFromUser.current) return
    seededFromUser.current = true
    setFullName(user.name)
    setEmail(user.email)
    setPhone(user.phone ?? '')
  }, [user])

  const resetPasswordFields = useCallback(() => {
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
    passwordCurrent.hide()
    passwordNew.hide()
    passwordConfirm.hide()
  }, [passwordCurrent.hide, passwordNew.hide, passwordConfirm.hide])

  const savedAvatarUrl = (user?.pictures ?? '').trim()
  const avatarDisplaySrc = useMemo(
    () =>
      savedAvatarUrl !== ''
        ? savedAvatarUrl
        : `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
          fullName.trim() || user?.name || 'user',
        )}`,
    [savedAvatarUrl, fullName, user?.name],
  )

  const saveProfile = useCallback(async () => {
    setSavingProfile(true)
    try {
      const next = await updateProfile({
        name: fullName.trim(),
        phone: phone.trim(),
      })
      setFullName(next.name)
      setEmail(next.email)
      setPhone(next.phone ?? '')
    } catch {
      // Pesan error dari AuthContext (react-hot-toast)
    } finally {
      setSavingProfile(false)
    }
  }, [updateProfile, fullName, phone])

  const handleAvatarChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      e.target.value = ''
      if (!file) return
      if (!file.type.startsWith('image/')) {
        toast.error('Pilih berkas gambar (misalnya JPG, PNG, atau WebP).')
        return
      }
      setUploadingAvatar(true)
      try {
        await uploadProfilePictureFn(file)
      } catch {
        // Pesan error dari AuthContext (react-hot-toast)
      } finally {
        setUploadingAvatar(false)
      }
    },
    [uploadProfilePictureFn],
  )

  return {
    fullName,
    setFullName,
    email,
    phone,
    setPhone,
    savingProfile,
    uploadingAvatar,
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    savingPassword,
    setSavingPassword,
    resetPasswordFields,
    avatarDisplaySrc,
    saveProfile,
    handleAvatarChange,
    passwordCurrent,
    passwordNew,
    passwordConfirm,
  }
}