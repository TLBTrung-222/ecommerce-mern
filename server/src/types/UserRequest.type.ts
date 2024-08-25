export interface SignUpForm {
    name: string
    email: string
    password: string
    confirmPassword: string
    phone?: string
}

export interface SignInForm {
    email: string
    password: string
}

export interface UpdateForm {
    name?: string
    password?: string
    phone?: string
    address?: string
    avatar?: string
    city?: string
}
