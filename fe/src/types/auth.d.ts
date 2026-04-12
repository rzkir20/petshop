
type AuthStatus = 'anonymous' | 'authenticated' | 'loading'

type AuthContextValue = {
    status: AuthStatus
    user: PublicUser | null
    refreshSession: () => Promise<boolean>
    signup: (input: authService.SignupInput) => Promise<void>
    signin: (input: authService.SigninInput) => Promise<void>
    signout: () => Promise<void>
    updateProfile: (input: authService.PatchProfileInput) => Promise<PublicUser>
    uploadProfilePicture: (file: File) => Promise<PublicUser>
    changePassword: (input: ChangePasswordInput) => Promise<void>
}

type PublicUser = {
    _id: string
    name: string
    email: string
    pictures?: string
    phone?: string
    createdAt?: string
    updatedAt?: string
}

type AuthResponse = {
    message?: string
    user: PublicUser
}

type SigninInput = { email: string; password: string }

type SignupInput = {
    name: string
    email: string
    password: string
    pictures?: string
}

type PatchProfileInput = {
    name?: string
    email?: string
    pictures?: string
    phone?: string
}

type ChangePasswordInput = {
    currentPassword: string
    newPassword: string
}

type SettingsProfileActions = {
    updateProfile: (input: PatchProfileInput) => Promise<PublicUser>
    uploadProfilePicture: (file: File) => Promise<PublicUser>
}

type LoadingScreenProps = {
    className?: string
    message?: string
    subMessage?: ReactNode
}