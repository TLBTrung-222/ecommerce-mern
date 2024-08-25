import { Request } from 'express'

export interface UserData {
    id: number
    name: string
    email: string
    pw_hash: string
    pw_salt: string
    is_admin: boolean
    phone?: number
    address?: string
    avatar?: string
    city?: string
    created_at?: Date
    updated_at?: Date
}

// register user to db
export interface UserWithHashedPassword {
    name: string
    email: string
    pw_hash: string
    pw_salt: string
}

export interface UserUpdateBody {
    name?: string
    password?: string
    phone?: number
    address?: string
    avatar?: string
    city?: string
}

export interface UserUpdate extends Request {
    params: { id: string }
    body: UserUpdateBody
}
