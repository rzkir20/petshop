import { createFileRoute, Link } from '@tanstack/react-router'

import {
  Camera,
  CheckCircle2,
  ChevronDown,
  Circle,
  Eye,
  EyeOff,
  HelpCircle,
  Loader2,
  MapPin,
  Store,
  User,
} from 'lucide-react'

import { useId, useMemo, useRef, useState } from 'react'

import toast from 'react-hot-toast'

import { Button } from '#/components/ui/button'

import { Input } from '#/components/ui/input'

import { Label } from '#/components/ui/label'

import { useAuth } from '#/context/AuthContext'

import { cn } from '#/lib/utils'

import { useSettingsAuthState } from '#/services/auth.service'

import { useStoreInformationEditor } from '#/services/store-information.service'

import {
  settingsCardClassName,
  fieldInputClassName,
} from '#/components/ui/helper'

export const Route = createFileRoute('/dashboard/settings')({
  component: RouteComponent,
  head: () => ({
    meta: [
      { title: 'Settings | Pawsome Shop' },
      {
        name: 'description',
        content:
          'Kelola akun, informasi toko, notifikasi, dan integrasi untuk Pawsome Shop.',
      },
    ],
  }),
})

function RouteComponent() {
  const { user, updateProfile, uploadProfilePicture, changePassword } =
    useAuth()
  const formTitleId = useId()
  const [feedback, setFeedback] = useState<{
    kind: 'success' | 'error'
    message: string
  } | null>(null)
  const avatarFileInputRef = useRef<HTMLInputElement>(null)

  const {
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
  } = useSettingsAuthState(user, {
    updateProfile,
    uploadProfilePicture,
  })

  const {
    storeQuery,
    patchStore,
    storeName,
    setStoreName,
    businessEmail,
    setBusinessEmail,
    storeDescription,
    setStoreDescription,
    storeAddress,
    setStoreAddress,
    city,
    setCity,
    zip,
    setZip,
    hoursOpen,
    setHoursOpen,
    hoursClose,
    setHoursClose,
    mapField,
    setMapField,
    mapPreviewSrc,
    storeFieldsDisabled,
    saveStoreInformation,
  } = useStoreInformationEditor()

  function scrollToStoreSection() {
    document
      .getElementById('store-info-section')
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const settingsCompletion = useMemo(() => {
    const phoneDone = phone.trim().length > 0
    const pictureDone = (user?.pictures ?? '').trim() !== ''

    const storeChecks = [
      storeName.trim().length > 0,
      businessEmail.trim().length > 0,
      storeDescription.trim().length > 0,
      storeAddress.trim().length > 0,
      city.trim().length > 0,
      zip.trim().length > 0,
      hoursOpen.trim().length > 0 && hoursClose.trim().length > 0,
      mapField.trim().length > 0,
    ] as const
    const storeFilled = storeChecks.filter(Boolean).length
    const storeTotal = storeChecks.length
    const storeRatio = storeQuery.isError ? 0 : storeFilled / storeTotal
    const storeDone = storeRatio >= 1

    const slice = 1 / 3
    const fraction =
      (phoneDone ? slice : 0) + (pictureDone ? slice : 0) + storeRatio * slice
    const percent = Math.min(100, Math.round(fraction * 100))

    return {
      percent,
      phoneDone,
      pictureDone,
      storeDone,
      storeFilled,
      storeTotal,
      storeRatio,
    }
  }, [
    phone,
    user?.pictures,
    storeName,
    businessEmail,
    storeDescription,
    storeAddress,
    city,
    zip,
    hoursOpen,
    hoursClose,
    mapField,
    storeQuery.isError,
  ])

  const progressRingRadius = 56
  const progressCircumference = 2 * Math.PI * progressRingRadius
  const progressFraction = settingsCompletion.percent / 100
  const progressStrokeDashoffset =
    progressCircumference * (1 - progressFraction)

  async function handlePasswordSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (newPassword.length < 6) {
      toast.error('Kata sandi baru minimal 6 karakter')
      return
    }
    if (newPassword !== confirmPassword) {
      toast.error('Konfirmasi kata sandi tidak cocok')
      return
    }
    setSavingPassword(true)
    try {
      await changePassword({
        currentPassword: currentPassword.trim(),
        newPassword: newPassword.trim(),
      })
      resetPasswordFields()
    } catch {
      // Pesan error dari AuthContext (react-hot-toast)
    } finally {
      setSavingPassword(false)
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setFeedback(null)
    try {
      await saveStoreInformation()
      setFeedback({
        kind: 'success',
        message: 'Informasi toko berhasil disimpan.',
      })
      setTimeout(() => setFeedback(null), 6000)
    } catch (err) {
      setFeedback({
        kind: 'error',
        message:
          err instanceof Error ? err.message : 'Gagal menyimpan informasi toko',
      })
    }
  }

  return (
    <div className="flex flex-col gap-8 p-8 lg:flex-row">
      <div className="min-w-0 flex-1 space-y-8">
        <div className="mb-8" id={formTitleId}>
          <h1 className="font-display text-3xl font-bold tracking-tight text-[#173a40]">
            Settings & Preferences
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your account and store configuration details.
          </p>
        </div>

        {feedback ? (
          <p
            className={cn(
              'mb-6 rounded-2xl border px-4 py-3 text-sm',
              feedback.kind === 'success'
                ? 'border-emerald-100 bg-emerald-50/80 text-emerald-900'
                : 'border-red-100 bg-red-50 text-red-800',
            )}
            role="status"
          >
            {feedback.message}
          </p>
        ) : null}

        {storeQuery.isError ? (
          <div className="mb-6 flex flex-wrap items-center gap-3 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-800">
            <span>
              {storeQuery.error instanceof Error
                ? storeQuery.error.message
                : 'Gagal memuat informasi toko'}
            </span>
            <button
              type="button"
              onClick={() => void storeQuery.refetch()}
              className="rounded-full border border-red-200 bg-white px-3 py-1 text-xs font-semibold text-red-700 hover:bg-red-100"
            >
              Coba lagi
            </button>
          </div>
        ) : null}

        <div className="space-y-8">
          <section
            id="account-settings-section"
            className={settingsCardClassName()}
          >
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-500">
                <User size={20} />
              </div>
              <h2 className="text-xl font-bold text-[#173a40]">
                Account Settings
              </h2>
            </div>

            <div className="mb-8 flex flex-col items-start gap-8 md:flex-row">
              <div className="group relative shrink-0">
                <input
                  ref={avatarFileInputRef}
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  aria-hidden
                  tabIndex={-1}
                  onChange={(e) => void handleAvatarChange(e)}
                />
                <img
                  src={avatarDisplaySrc}
                  alt=""
                  className={cn(
                    'h-24 w-24 rounded-[28px] border-4 border-white bg-emerald-50 object-cover shadow-sm transition-opacity',
                    uploadingAvatar && 'opacity-60',
                  )}
                />
                <button
                  type="button"
                  id="upload-avatar-btn"
                  disabled={uploadingAvatar || savingProfile || savingPassword}
                  className="absolute -right-2 -bottom-2 flex h-10 w-10 items-center justify-center rounded-xl border-2 border-white bg-[#ff6b35] text-white shadow-lg transition-transform hover:scale-110 disabled:pointer-events-none disabled:opacity-50"
                  aria-label="Unggah foto profil"
                  title="Pilih gambar dari perangkat (maks. 5 MB)"
                  onClick={() => avatarFileInputRef.current?.click()}
                >
                  {uploadingAvatar ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <Camera size={18} />
                  )}
                </button>
              </div>

              <div className="grid w-full flex-1 grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                    Full Name
                  </Label>
                  <Input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className={fieldInputClassName()}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                    Email login (akun)
                  </Label>
                  <Input
                    type="email"
                    id="account-login-email"
                    autoComplete="email"
                    readOnly
                    aria-readonly="true"
                    value={email}
                    className={cn(
                      fieldInputClassName(),
                      'cursor-not-allowed bg-gray-50/90 text-gray-600',
                    )}
                  />
                  <p className="text-xs text-gray-500">
                    Email login tidak dapat diubah. Dipakai untuk masuk ke
                    dashboard—terpisah dari <strong>Business Email</strong> di
                    bagian Informasi Toko.
                  </p>
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                    Phone Number
                  </Label>
                  <Input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={fieldInputClassName()}
                  />
                </div>
              </div>
            </div>

            <form
              className="space-y-6 border-t border-emerald-50 pt-8"
              onSubmit={(e) => void handlePasswordSubmit(e)}
              aria-label="Ubah kata sandi"
            >
              <h3 className="text-xs font-bold tracking-widest text-gray-400 uppercase">
                Change Password
              </h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="space-y-2">
                  <Label
                    htmlFor="settings-current-password"
                    className="text-[10px] font-bold tracking-widest text-gray-400 uppercase"
                  >
                    Current Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="settings-current-password"
                      type={passwordCurrent.inputType}
                      autoComplete="current-password"
                      placeholder="••••••••"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className={cn(fieldInputClassName(), 'pr-12')}
                    />
                    <button
                      type="button"
                      className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      onClick={passwordCurrent.toggleVisibility}
                      aria-label={
                        passwordCurrent.visible
                          ? 'Sembunyikan kata sandi'
                          : 'Tampilkan kata sandi'
                      }
                    >
                      {passwordCurrent.visible ? (
                        <EyeOff className="h-4.5 w-4.5" />
                      ) : (
                        <Eye className="h-4.5 w-4.5" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="settings-new-password"
                    className="text-[10px] font-bold tracking-widest text-gray-400 uppercase"
                  >
                    New Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="settings-new-password"
                      type={passwordNew.inputType}
                      autoComplete="new-password"
                      placeholder="Minimal 6 karakter"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className={cn(fieldInputClassName(), 'pr-12')}
                    />
                    <button
                      type="button"
                      className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      onClick={passwordNew.toggleVisibility}
                      aria-label={
                        passwordNew.visible
                          ? 'Sembunyikan kata sandi'
                          : 'Tampilkan kata sandi'
                      }
                    >
                      {passwordNew.visible ? (
                        <EyeOff className="h-4.5 w-4.5" />
                      ) : (
                        <Eye className="h-4.5 w-4.5" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="settings-confirm-password"
                    className="text-[10px] font-bold tracking-widest text-gray-400 uppercase"
                  >
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="settings-confirm-password"
                      type={passwordConfirm.inputType}
                      autoComplete="new-password"
                      placeholder="Ulangi kata sandi baru"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={cn(fieldInputClassName(), 'pr-12')}
                    />
                    <button
                      type="button"
                      className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      onClick={passwordConfirm.toggleVisibility}
                      aria-label={
                        passwordConfirm.visible
                          ? 'Sembunyikan kata sandi'
                          : 'Tampilkan kata sandi'
                      }
                    >
                      {passwordConfirm.visible ? (
                        <EyeOff className="h-4.5 w-4.5" />
                      ) : (
                        <Eye className="h-4.5 w-4.5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap justify-end gap-2">
                <Button
                  type="submit"
                  id="cta-change-password"
                  disabled={
                    savingPassword ||
                    savingProfile ||
                    uploadingAvatar ||
                    !currentPassword ||
                    !newPassword ||
                    !confirmPassword
                  }
                  className="gap-2"
                >
                  {savingPassword ? 'Menyimpan…' : 'Ubah kata sandi'}
                </Button>
              </div>
            </form>

            <div className="mt-8 flex flex-col gap-3 border-t border-emerald-50 pt-8 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
              <p className="text-xs text-gray-500">
                <strong>Simpan profil</strong> menyimpan nama dan telepon. Email
                login bersifat tetap. Foto profil diunggah lewat ikon kamera
                (ImageKit, maks. 5 MB); jika belum ada foto, dipakai avatar
                otomatis. Ubah kata sandi lewat form di atas lalu tombol{' '}
                <strong>Ubah kata sandi</strong>.
              </p>
              <div className="flex flex-wrap gap-2 sm:justify-end">
                <Button
                  type="button"
                  variant="outline"
                  id="cta-save-profile"
                  className="gap-2"
                  disabled={savingProfile || uploadingAvatar || savingPassword}
                  onClick={() => void saveProfile()}
                >
                  <User size={16} strokeWidth={2.25} />
                  {savingProfile ? 'Menyimpan…' : 'Simpan profil'}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  id="cta-scroll-store-info"
                  className="gap-2 text-emerald-700"
                  onClick={scrollToStoreSection}
                >
                  Informasi toko
                  <ChevronDown size={16} strokeWidth={2.25} />
                </Button>
              </div>
            </div>
          </section>

          <form
            onSubmit={(e) => void handleSave(e)}
            aria-label="Simpan informasi toko"
          >
            <section
              id="store-info-section"
              className={settingsCardClassName()}
            >
              <div className="mb-8 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-[#ff6b35]">
                  <Store size={20} />
                </div>
                <h2 className="text-xl font-bold text-[#173a40]">
                  Store Information
                </h2>
              </div>

              {storeQuery.isPending ? (
                <p className="mb-6 text-sm text-gray-500">Memuat data toko…</p>
              ) : null}

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                      Store Name
                    </Label>
                    <Input
                      value={storeName}
                      disabled={storeFieldsDisabled}
                      onChange={(e) => setStoreName(e.target.value)}
                      className={fieldInputClassName()}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                      Business Email
                    </Label>
                    <Input
                      type="email"
                      id="store-business-email"
                      value={businessEmail}
                      disabled={storeFieldsDisabled}
                      onChange={(e) => setBusinessEmail(e.target.value)}
                      className={fieldInputClassName()}
                    />
                    <p className="text-xs text-gray-500">
                      Email kontak toko untuk pelanggan / tampilan publik, bukan
                      email login akun admin di atas.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                      Store Description
                    </Label>
                    <textarea
                      rows={3}
                      value={storeDescription}
                      disabled={storeFieldsDisabled}
                      onChange={(e) => setStoreDescription(e.target.value)}
                      className={cn(
                        fieldInputClassName(),
                        'min-h-22 w-full resize-none',
                      )}
                    />
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                      Store Address
                    </Label>
                    <Input
                      value={storeAddress}
                      disabled={storeFieldsDisabled}
                      onChange={(e) => setStoreAddress(e.target.value)}
                      className={fieldInputClassName()}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                        City
                      </Label>
                      <Input
                        value={city}
                        disabled={storeFieldsDisabled}
                        onChange={(e) => setCity(e.target.value)}
                        className={fieldInputClassName()}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                        Zip Code
                      </Label>
                      <Input
                        value={zip}
                        disabled={storeFieldsDisabled}
                        onChange={(e) => setZip(e.target.value)}
                        className={fieldInputClassName()}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                      Business Hours
                    </Label>
                    <div className="flex items-center gap-3">
                      <Input
                        type="time"
                        value={hoursOpen}
                        disabled={storeFieldsDisabled}
                        onChange={(e) => setHoursOpen(e.target.value)}
                        className={fieldInputClassName()}
                      />
                      <span className="font-bold text-gray-400">to</span>
                      <Input
                        type="time"
                        value={hoursClose}
                        disabled={storeFieldsDisabled}
                        onChange={(e) => setHoursClose(e.target.value)}
                        className={fieldInputClassName()}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-3 border-t border-emerald-50 pt-8">
                <div className="flex items-center gap-2">
                  <MapPin size={18} className="text-[#ff6b35]" />
                  <Label
                    htmlFor="store-map-embed"
                    className="text-[10px] font-bold tracking-widest text-gray-400 uppercase"
                  >
                    Lokasi (Google Maps embed)
                  </Label>
                </div>
                <p className="text-xs text-gray-500">
                  Tempel URL embed (
                  <code className="rounded bg-emerald-50 px-1">
                    https://www.google.com/maps/embed?...
                  </code>
                  ) atau snippet{' '}
                  <code className="rounded bg-emerald-50 px-1">
                    &lt;iframe&gt;
                  </code>{' '}
                  dari Google Maps.
                </p>
                <textarea
                  id="store-map-embed"
                  rows={4}
                  value={mapField}
                  disabled={storeFieldsDisabled}
                  onChange={(e) => setMapField(e.target.value)}
                  placeholder='https://www.google.com/maps/embed?pb=... atau <iframe src="..." ...></iframe>'
                  className={cn(
                    fieldInputClassName(),
                    'w-full resize-y font-mono text-xs',
                  )}
                />
                {mapPreviewSrc ? (
                  <div className="overflow-hidden rounded-2xl border border-emerald-100 bg-emerald-50/30">
                    <p className="border-b border-emerald-100 px-3 py-2 text-[10px] font-semibold tracking-wide text-gray-500 uppercase">
                      Pratinjau peta
                    </p>
                    <iframe
                      title="Pratinjau lokasi toko"
                      src={mapPreviewSrc}
                      className="h-[min(280px,50vw)] w-full border-0"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      allowFullScreen
                    />
                  </div>
                ) : mapField.trim() ? (
                  <p className="text-xs text-amber-800">
                    Tidak bisa menampilkan pratinjau — pastikan URL embed Google
                    Maps atau iframe dengan{' '}
                    <code className="rounded bg-amber-100 px-1">src</code> yang
                    valid.
                  </p>
                ) : null}
              </div>

              <div className="mt-8 flex flex-col gap-3 border-t border-emerald-50 pt-8 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
                <p className="text-xs text-gray-500">
                  Perubahan di bawah ini disimpan ke server saat Anda menekan
                  simpan.
                </p>
                <Button
                  type="submit"
                  id="cta-save-store-info"
                  disabled={
                    patchStore.isPending ||
                    storeQuery.isPending ||
                    savingPassword
                  }
                  className="gap-2 self-start sm:self-auto"
                >
                  <Store size={16} strokeWidth={2.25} />
                  {patchStore.isPending
                    ? 'Menyimpan…'
                    : 'Simpan informasi toko'}
                </Button>
              </div>
            </section>
          </form>
        </div>
      </div>

      <aside className="w-full shrink-0 space-y-8 lg:w-80">
        <div className="rounded-[40px] bg-[#173a40] p-8 text-white shadow-xl">
          <h3 className="mb-6 text-lg font-bold">Settings Completion</h3>
          <div className="relative mx-auto mb-8 flex h-32 w-32 items-center justify-center">
            <svg
              className="h-full w-full -rotate-90"
              viewBox="0 0 128 128"
              role="img"
              aria-label={`Kelengkapan pengaturan ${settingsCompletion.percent} persen`}
            >
              <circle
                cx="64"
                cy="64"
                r={progressRingRadius}
                fill="transparent"
                stroke="currentColor"
                strokeWidth="12"
                className="text-white/10"
              />
              <circle
                cx="64"
                cy="64"
                r={progressRingRadius}
                fill="transparent"
                stroke="currentColor"
                strokeWidth="12"
                strokeDasharray={progressCircumference}
                strokeDashoffset={progressStrokeDashoffset}
                strokeLinecap="round"
                className="text-emerald-500 transition-all duration-700"
              />
            </svg>
            <span className="absolute text-2xl font-bold">
              {settingsCompletion.percent}%
            </span>
          </div>
          <p className="mb-4 text-[11px] leading-relaxed text-white/60">
            Progres dari nomor telepon, foto profil (bukan avatar otomatis), dan
            seluruh field Informasi Toko. Simpan perubahan agar data tersimpan
            di server.
          </p>
          <ul className="space-y-4">
            <li
              className={cn(
                'flex items-center gap-3 text-xs font-medium',
                settingsCompletion.phoneDone
                  ? 'text-emerald-400'
                  : 'text-gray-400',
              )}
            >
              {settingsCompletion.phoneDone ? (
                <CheckCircle2 size={16} className="shrink-0" />
              ) : (
                <Circle size={16} className="shrink-0" />
              )}
              <span>Nomor telepon</span>
            </li>
            <li
              className={cn(
                'flex items-center gap-3 text-xs font-medium',
                settingsCompletion.pictureDone
                  ? 'text-emerald-400'
                  : 'text-gray-400',
              )}
            >
              {settingsCompletion.pictureDone ? (
                <CheckCircle2 size={16} className="shrink-0" />
              ) : (
                <Circle size={16} className="shrink-0" />
              )}
              <span>Foto profil</span>
            </li>
            <li
              className={cn(
                'flex items-start gap-3 text-xs font-medium',
                settingsCompletion.storeDone
                  ? 'text-emerald-400'
                  : 'text-gray-400',
              )}
            >
              {settingsCompletion.storeDone ? (
                <CheckCircle2 size={16} className="mt-0.5 shrink-0" />
              ) : (
                <Circle size={16} className="mt-0.5 shrink-0" />
              )}
              <span className="min-w-0 leading-snug">
                Informasi toko
                {!settingsCompletion.storeDone ? (
                  <span className="mt-0.5 block font-normal text-white/50">
                    {settingsCompletion.storeFilled}/
                    {settingsCompletion.storeTotal} field terisi
                  </span>
                ) : null}
              </span>
            </li>
          </ul>
        </div>

        <div className={settingsCardClassName('p-6!')}>
          <h3 className="mb-6 text-sm font-bold text-[#173a40]">
            Recent Changes
          </h3>
          <div className="relative space-y-6 before:absolute before:top-2 before:bottom-2 before:left-2 before:w-0.5 before:bg-emerald-50">
            <div className="relative flex gap-4">
              <div className="z-10 mt-0.5 h-4 w-4 shrink-0 rounded-full border-2 border-white bg-emerald-400 shadow-sm" />
              <div>
                <p className="text-xs font-bold text-[#173a40]">
                  Password Changed
                </p>
                <p className="mt-1 text-[10px] text-gray-400">
                  Today, 09:42 AM
                </p>
              </div>
            </div>
            <div className="relative flex gap-4">
              <div className="z-10 mt-0.5 h-4 w-4 shrink-0 rounded-full border-2 border-white bg-[#ff6b35] shadow-sm" />
              <div>
                <p className="text-xs font-bold text-[#173a40]">2FA Enabled</p>
                <p className="mt-1 text-[10px] text-gray-400">
                  Yesterday, 14:12 PM
                </p>
              </div>
            </div>
            <div className="relative flex gap-4">
              <div className="z-10 mt-0.5 h-4 w-4 shrink-0 rounded-full border-2 border-white bg-blue-400 shadow-sm" />
              <div>
                <p className="text-xs font-bold text-[#173a40]">
                  Store Address Updated
                </p>
                <p className="mt-1 text-[10px] text-gray-400">Oct 24, 2023</p>
              </div>
            </div>
          </div>
        </div>

        <div
          id="support"
          className="relative overflow-hidden rounded-[40px] bg-[#ff6b35] p-8 text-white shadow-lg shadow-orange-200"
        >
          <div className="relative z-10">
            <h3 className="mb-2 text-xl font-bold">Need help?</h3>
            <p className="mb-6 text-xs leading-relaxed text-white/80">
              Our support team is here to assist you with advanced store
              configurations.
            </p>
            <Link
              to="/dashboard"
              id="cta-support-btn"
              className="block w-full rounded-full bg-white py-3 text-center text-xs font-bold text-[#ff6b35] transition-transform hover:bg-emerald-50"
            >
              Contact Support
            </Link>
          </div>
          <HelpCircle
            size={180}
            className="pointer-events-none absolute -right-6 -bottom-6 rotate-12 text-white/10"
            strokeWidth={1}
          />
        </div>
      </aside>
    </div>
  )
}
