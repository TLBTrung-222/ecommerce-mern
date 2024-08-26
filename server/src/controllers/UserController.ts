import { Controller } from '../types/ControllerFunc.type'
import * as UserService from '../services/UserService'
import { SignInForm, SignUpForm } from '../types/UserRequest.type'
import { validateSignInData, validateSignUpData, validateUpdateData } from '../utils/validator'
import { AppError } from '../utils/AppError'
import { UserUpdate, UserWithId } from '../types/User.type'
import { handleError } from '../utils/handleError'

export const createUser: Controller = async (req, res, next) => {
    try {
        const body: SignUpForm = req.body
        const validationError = validateSignUpData(body)

        if (validationError) throw new AppError(validationError, 400)

        const response = await UserService.createUser(body)
        res.status(201).json({ message: 'User created successfully', user: response })
    } catch (error) {
        handleError(error, next)
    }
}

export const logInUser: Controller = async (req, res, next) => {
    try {
        const body: SignInForm = req.body
        const validationError = validateSignInData(body)
        if (validationError) throw new AppError(validationError, 400)

        const { accessToken, refreshToken } = await UserService.logInUser(body)
        res.status(200).json({ message: 'Login successful', accessToken, refreshToken })
    } catch (error) {
        handleError(error, next)
    }
}

export const updateUser: Controller<UserUpdate> = async (req, res, next) => {
    try {
        const userId = req.params.id
        const data = req.body

        const validationError = validateUpdateData(data)
        if (validationError) throw new AppError(validationError, 400)

        const updatedUser = await UserService.updateUser(userId, data)
        res.status(200).json({ message: 'User updated successfully', updatedUser })
    } catch (error) {
        handleError(error, next)
    }
}

export const deleteUser: Controller<UserWithId> = async (req, res, next) => {
    try {
        const userId = req.params.id
        const deletedUser = await UserService.deleteUser(userId)
        res.status(200).json({ message: 'User deleted successfully', deletedUser })
    } catch (error) {
        handleError(error, next)
    }
}

export const getAllUser: Controller = async (req, res, next) => {
    try {
        const users = await UserService.getAllUser()
        res.status(200).json({ users })
    } catch (error) {
        handleError(error, next)
    }
}
