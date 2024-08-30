export interface SignInForm {
    email: string
    password: string
}

export interface SignUpForm {
    name: string
    email: string
    password: string
    confirmPassword: string
    phone?: string
}

export interface UpdateForm {
    name: string
    address?: string
    phone?: string
}

export interface UserData {
    id: number
    name: string
    email: string
    pw_hash: string
    pw_salt: string
    is_admin: boolean
    phone?: string
    address?: string
    avatar?: string
    city?: string
    created_at?: Date
    updated_at?: Date
}
