'use client'

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import toast from 'react-hot-toast'

import { useRouter } from '@tanstack/react-router'

import type { ChangePasswordInput, PublicUser } from '../services/auth.service'

import * as authService from '../services/auth.service'

import { changePassword as changePasswordRequest } from '../services/auth.service'

const AuthContext = createContext<AuthContextValue | null>(null)

function authErrorMessage(err: unknown, fallback: string): string {
  return err instanceof Error ? err.message : fallback
}

function translatePasswordError(msg: string): string {
  if (msg === 'Current password is incorrect') {
    return 'Kata sandi saat ini salah'
  }
  if (msg === 'New password must be different from current password') {
    return 'Kata sandi baru harus berbeda dari kata sandi saat ini'
  }
  return msg
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [status, setStatus] = useState<AuthStatus>('loading')
  const [user, setUser] = useState<PublicUser | null>(null)

  const refreshSession = useCallback(async () => {
    try {
      const res = await authService.getSession()
      setUser(res.user)
      setStatus('authenticated')
      return true
    } catch {
      setUser(null)
      setStatus('anonymous')
      return false
    }
  }, [])

  const signup = useCallback(async (input: authService.SignupInput) => {
    try {
      const res = await authService.signup(input)
      setUser(res.user)
      setStatus('authenticated')
      toast.success(res.message ?? 'Registrasi berhasil')
    } catch (err) {
      toast.error(authErrorMessage(err, 'Gagal mendaftar'))
      throw err
    }
  }, [])

  const signin = useCallback(async (input: authService.SigninInput) => {
    try {
      const res = await authService.signin(input)
      setUser(res.user)
      setStatus('authenticated')
      toast.success(res.message ?? 'Berhasil masuk')
    } catch (err) {
      toast.error(authErrorMessage(err, 'Gagal masuk'))
      throw err
    }
  }, [])

  const signout = useCallback(async () => {
    try {
      await authService.signout()
    } catch {
      // Keep clearing client auth state even if network fails.
    }
    setUser(null)
    setStatus('anonymous')
    toast.success('Anda telah keluar')
  }, [])

  const updateProfile = useCallback(
    async (input: authService.PatchProfileInput) => {
      try {
        const res = await authService.patchProfile(input)
        setUser(res.user)
        toast.success(res.message ?? 'Profil diperbarui')
        return res.user
      } catch (err) {
        toast.error(authErrorMessage(err, 'Gagal memperbarui profil'))
        throw err
      }
    },
    [],
  )

  const uploadProfilePicture = useCallback(async (file: File) => {
    try {
      const res = await authService.uploadProfilePicture(file)
      setUser(res.user)
      toast.success(res.message ?? 'Foto profil diperbarui')
      return res.user
    } catch (err) {
      toast.error(authErrorMessage(err, 'Gagal mengunggah foto profil'))
      throw err
    }
  }, [])

  const changePassword = useCallback(
    async (input: ChangePasswordInput) => {
      try {
        await changePasswordRequest(input)
        try {
          await authService.signout()
        } catch {
          // Cookie may already be cleared by change-password response; ignore.
        }
        setUser(null)
        setStatus('anonymous')
        toast.success(
          'Kata sandi berhasil diubah. Silakan masuk lagi dengan kata sandi baru.',
        )
        await router.navigate({
          to: '/signin',
          search: { reauth: '1' },
          replace: true,
        })
      } catch (err) {
        toast.error(
          translatePasswordError(
            authErrorMessage(err, 'Gagal mengubah kata sandi'),
          ),
        )
        throw err
      }
    },
    [router],
  )

  const value = useMemo<AuthContextValue>(
    () => ({
      status,
      user,
      refreshSession,
      signup,
      signin,
      signout,
      updateProfile,
      uploadProfilePicture,
      changePassword,
    }),
    [
      status,
      user,
      refreshSession,
      signup,
      signin,
      signout,
      updateProfile,
      uploadProfilePicture,
      changePassword,
    ],
  )

  useEffect(() => {
    void refreshSession()
  }, [refreshSession])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
