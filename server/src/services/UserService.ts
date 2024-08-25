// Service là thằng sẽ làm việc với database rồi trả data về controller
// if smth not works, should throw error instead of return null
// => controller don't need to check for null but catch the error directly

import { SignInForm, SignUpForm } from '../types/UserRequest.type'
import { comparePassword, hashedPassword } from '../utils/password'
import UserModel from '../models/UserModel'
import { UserData, UserUpdateBody } from '../types/User.type'
import * as JwtService from '../services/JwtService'

/**
 * Call to db to insert new user
 * @param data pass by controller
 */
export const createUser = async (data: SignUpForm) => {
    // call to db with hashed password + salt
    try {
        const { name, email, password } = data

        const existUser = await UserModel.findByEmail(email)
        if (existUser) {
            throw new Error('Email already in use')
        }

        const { salt: pw_salt, hash: pw_hash } = await hashedPassword(password)
        const newUser = await UserModel.create({ name, email, pw_salt, pw_hash })
        // no need to check for existance, it will throw error if no user is created
        return newUser
    } catch (error) {
        throw new Error(`${(error as Error).message}`)
    }
}

export const logInUser = async (data: SignInForm) => {
    try {
        const { email, password } = data
        const existUser = await UserModel.findByEmail(email)
        if (!existUser) {
            throw new Error('Email not exist')
        }

        // user existed, compare password
        const { pw_hash } = existUser
        const correctPassword = await comparePassword(password, pw_hash)
        if (!correctPassword) throw new Error('Incorrect password')

        // return jwt token to Controller
        // jwt token payload = id + isAdmin from user
        const payload = { id: existUser.id, isAdmin: existUser.is_admin }
        const accessToken = JwtService.generalAccessToken(payload)
        const refreshToken = JwtService.generalRefreshToken(payload)

        return {
            accessToken,
            refreshToken
        }
    } catch (error) {
        throw new Error(`${(error as Error).message}`)
    }
}

/**
 * Call to db to find user by their email
 * @param email
 */
export const getUserByEmail = async (email: string) => {
    try {
        const user = await UserModel.findByEmail(email)
        if (!user) throw new Error('Email not founded')
        return user
    } catch (error) {
        throw new Error(`${(error as Error).message}`)
    }
}

export const updateUser = async (user: UserData) => {
    try {
        const updatedUser = await UserModel.update(user)
        if (!updatedUser) throw new Error('Can not update user')

        return updatedUser
    } catch (error) {
        throw new Error(`${(error as Error).message}`)
    }
}

export const getUserById = async (id: string) => {
    try {
        const user = await UserModel.findById(id)
        if (!user) throw new Error('User not founded')
        return user
    } catch (error) {
        throw new Error(`${(error as Error).message}`)
    }
}
