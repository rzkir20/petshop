'use client'

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import type { PublicUser } from '../services/auth.service'

import * as authService from '../services/auth.service'

type AuthStatus = 'anonymous' | 'authenticated' | 'loading'

type AuthContextValue = {
  status: AuthStatus
  user: PublicUser | null
  refreshSession: () => Promise<boolean>
  signup: (input: authService.SignupInput) => Promise<void>
  signin: (input: authService.SigninInput) => Promise<void>
  signout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
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
    const res = await authService.signup(input)
    setUser(res.user)
    setStatus('authenticated')
  }, [])

  const signin = useCallback(async (input: authService.SigninInput) => {
    const res = await authService.signin(input)
    setUser(res.user)
    setStatus('authenticated')
  }, [])

  const signout = useCallback(async () => {
    try {
      await authService.signout()
    } catch {
      // Keep clearing client auth state even if network fails.
    }
    setUser(null)
    setStatus('anonymous')
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({ status, user, refreshSession, signup, signin, signout }),
    [status, user, refreshSession, signup, signin, signout],
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
