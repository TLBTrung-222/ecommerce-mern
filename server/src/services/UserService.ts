// Service là thằng sẽ làm việc với database rồi trả data về controller

import { SignUpForm } from '../types/UserRequest.type'
import * as db from '../db'
import { hashedPassword } from '../utils/password'
import UserModel from '../models/UserModel'

/**
 * Call to db to insert new user
 * @param data pass by controller
 */
export const createUser = async (data: SignUpForm) => {
    // call to db with hashed password + salt
    try {
        const { name, email, password } = data
        const { salt: pw_salt, hash: pw_hash } = await hashedPassword(password)

        const existUser = await UserModel.findByEmail(email)

        if (existUser) {
            throw new Error('Email already in use')
        }

        const newUser = await UserModel.create({ name, email, pw_salt, pw_hash })
        // no need to check for existance, it will throw error if no user is created
        return newUser
    } catch (error) {
        throw new Error(`${(error as Error).message}`)
    }
}
