'use client'

import React, { Fragment } from 'react'

import { useLocation } from '@tanstack/react-router'

import Header from '../components/Header'

import Footer from '../components/Footer'

import { Toaster } from 'react-hot-toast'

const Pathname = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation()

  const isRoute =
    pathname.includes('/cart') ||
    pathname.includes('/signin') ||
    pathname.includes('/signup') ||
    pathname.includes('/dashboard') ||
    false

  return (
    <Fragment>
      {!isRoute && <Header />}
      {children}
      {!isRoute && <Footer />}
      <Toaster position="top-center" />
    </Fragment>
  )
}

export default Pathname
