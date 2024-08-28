import UserModel from '../models/UserModel'
import * as JwtService from '../services/JwtService'
import { SignInForm, SignUpForm, UserData, UserUpdateBody } from '../types'
import { ApiError } from '../utils/ApiError'
import { comparePassword, hashedPassword } from '../utils/password'

export const createUser = async (data: SignUpForm): Promise<UserData> => {
    const { name, email, password, phone } = data

    const existUser = await UserModel.findByEmail(email)
    if (existUser) {
        throw new ApiError('Email already in use', 409)
    }

    const { salt: pw_salt, hash: pw_hash } = await hashedPassword(password)
    let newUser
    if (!phone) {
        newUser = await UserModel.create({ name, email, pw_salt, pw_hash })
    } else newUser = await UserModel.create({ name, email, pw_salt, pw_hash, phone })

    return newUser
}

export const logInUser = async (data: SignInForm) => {
    const { email, password } = data
    const existUser = await UserModel.findByEmail(email)

    if (!existUser) {
        throw new ApiError('User not found', 404)
    }

    const { pw_hash } = existUser
    const correctPassword = await comparePassword(password, pw_hash)
    if (!correctPassword) {
        throw new ApiError('Incorrect password', 401)
    }

    const payload = { id: existUser.id, isAdmin: existUser.is_admin }
    const accessToken = JwtService.generalAccessToken(payload)
    const refreshToken = JwtService.generalRefreshToken(payload)

    return { accessToken, refreshToken }
}

export const getUserByEmail = async (email: string): Promise<UserData> => {
    const user = await UserModel.findByEmail(email)
    if (!user) {
        throw new ApiError('User not found', 404)
    }
    return user
}

export const updateUser = async (userId: string, data: UserUpdateBody): Promise<UserData> => {
    const user = await getUserById(userId)

    if (!user) {
        throw new ApiError('User not found', 404)
    }

    // Validate properties in data and modify user object
    for (const [key, value] of Object.entries(data)) {
        if (['name', 'phone', 'address', 'city', 'avatar'].includes(key)) {
            //@ts-ignore
            user[key] = value as string
        } else if (key === 'password') {
            const { salt, hash } = await hashedPassword(value as string)
            user.pw_salt = salt
            user.pw_hash = hash
        }
    }

    const updatedUser = await UserModel.update(user)
    return updatedUser
}

export const getUserById = async (id: string): Promise<UserData> => {
    const user = await UserModel.findById(id)
    if (!user) {
        throw new ApiError('User not found', 404)
    }
    return user
}

export const deleteUser = async (id: string): Promise<UserData> => {
    const deletedUser = await UserModel.delete(id)
    return deletedUser
}

export const getAllUser = async (): Promise<UserData[]> => {
    const users = await UserModel.getAll()
    return users
}
