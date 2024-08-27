import { Request } from 'express'

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

export interface UserWithHashedPassword {
    name: string
    email: string
    pw_hash: string
    pw_salt: string
}
