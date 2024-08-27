import { Request } from 'express'

export interface UserUpdateBody {
    name?: string
    password?: string
    phone?: string
    address?: string
    avatar?: string
    city?: string
}

export interface UserUpdate extends Request {
    params: { id: string }
    body: UserUpdateBody
}
