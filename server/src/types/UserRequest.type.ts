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
