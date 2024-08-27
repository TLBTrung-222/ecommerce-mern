import { Controller } from '../types/ControllerFunc.type'
import * as UserService from '../services/UserService'
import { SignInForm, SignUpForm } from '../types/UserRequest.type'
import { validateSignInData, validateSignUpData, validateUpdateData } from '../utils/validator'
import { AppError } from '../utils/AppError'
import { UserUpdate, RequestWithId } from '../types/User.type'
import handleError from '../utils/handleError'
import * as JwtService from '../services/JwtService'

export const createUser: Controller = async (req, res, next) => {
    try {
        const body: SignUpForm = req.body
        const validationError = validateSignUpData(body)

        if (validationError) throw new AppError(validationError, 400)

        const user = await UserService.createUser(body)
        res.status(201).json({ message: 'User created successfully', user })
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

        // Set the refresh token in an HTTP-only cookie
        res.cookie('refresh_token', refreshToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 1000, // 1 day (ms)
            secure: process.env.NODE_ENV === 'production'
        })

        // Return a JSON response with accessToken
        res.status(200).json({ message: 'Login successful', accessToken })
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

export const deleteUser: Controller<RequestWithId> = async (req, res, next) => {
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

export const getDetail: Controller<RequestWithId> = async (req, res, next) => {
    try {
        const user = await UserService.getUserById(req.params.id)
        res.status(200).json(user)
    } catch (error) {
        handleError(error, next)
    }
}

// check if request have refreshToken in cookie -> verify if valid refreshToken -> create + issue new accessToken
export const refreshAccessToken: Controller = async (req, res, next) => {
    try {
        const refreshToken = req.cookies.refresh_token

        if (!refreshToken) throw new AppError('No refresh token founded', 400)

        const newAccessToken = await JwtService.refreshAccessToken(refreshToken)
        res.status(200).json({ newAccessToken })
    } catch (error) {
        handleError(error, next)
    }
}
