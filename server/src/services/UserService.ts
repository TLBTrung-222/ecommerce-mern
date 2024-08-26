import { SignInForm, SignUpForm } from '../types/UserRequest.type'
import { comparePassword, hashedPassword } from '../utils/password'
import UserModel from '../models/UserModel'
import { UserData, UserUpdateBody } from '../types/User.type'
import * as JwtService from '../services/JwtService'
import { AppError } from '../utils/AppError'

export const createUser = async (data: SignUpForm): Promise<UserData> => {
    const { name, email, password } = data

    const existUser = await UserModel.findByEmail(email)
    if (existUser) {
        throw new AppError('Email already in use', 409)
    }

    const { salt: pw_salt, hash: pw_hash } = await hashedPassword(password)
    const newUser = await UserModel.create({ name, email, pw_salt, pw_hash })

    if (!newUser) {
        throw new AppError('Failed to create user', 500)
    }

    return newUser
}

export const logInUser = async (data: SignInForm) => {
    const { email, password } = data
    const existUser = await UserModel.findByEmail(email)
    if (!existUser) {
        throw new AppError('Email not found', 404)
    }

    const { pw_hash } = existUser
    const correctPassword = await comparePassword(password, pw_hash)
    if (!correctPassword) {
        throw new AppError('Incorrect password', 401)
    }

    const payload = { id: existUser.id, isAdmin: existUser.is_admin }
    const accessToken = JwtService.generalAccessToken(payload)
    const refreshToken = JwtService.generalRefreshToken(payload)

    return { accessToken, refreshToken }
}

export const getUserByEmail = async (email: string): Promise<UserData> => {
    const user = await UserModel.findByEmail(email)
    if (!user) {
        throw new AppError('User not found', 404)
    }
    return user
}

export const updateUser = async (userId: string, data: UserUpdateBody): Promise<UserData> => {
    const user = await getUserById(userId)

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
    if (!updatedUser) {
        throw new AppError('Failed to update user', 500)
    }
    return updatedUser
}

export const getUserById = async (id: string): Promise<UserData> => {
    const user = await UserModel.findById(id)
    if (!user) {
        throw new AppError('User not found', 404)
    }
    return user
}

export const deleteUser = async (id: string): Promise<UserData> => {
    const deletedUser = await UserModel.delete(id)
    if (!deletedUser) {
        throw new AppError('Failed to delete user', 500)
    }
    return deletedUser
}

export const getAllUser = async (): Promise<UserData[]> => {
    const users = await UserModel.getAll()
    return users
}
