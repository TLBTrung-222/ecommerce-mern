import { ApiResponse, Controller, RequestWithId, SignInForm, SignUpForm, UserUpdate } from '../types'
import * as JwtService from '../services/JwtService'
import * as UserService from '../services/UserService'
import { ApiError } from '../utils/ApiError'
import handleError from '../utils/handleError'
import { validateSignInData, validateSignUpData, validateUpdateData } from '../utils/validator'

export const createUser: Controller = async (req, res, next) => {
    try {
        const body: SignUpForm = req.body
        const validationError = validateSignUpData(body)

        if (validationError) throw new ApiError(validationError, 400)

        const user = await UserService.createUser(body)

        const { accessToken, refreshToken } = await UserService.logInUser(body)

        res.cookie('refresh_token', refreshToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 1000 // 1 day in milliseconds
            // secure: process.env.NODE_ENV === 'production'
        })

        const response: ApiResponse = {
            success: true,
            message: 'User created successfully',
            data: { accessToken, user }
        }
        res.status(201).json(response)
    } catch (error) {
        handleError(error, next)
    }
}

export const logInUser: Controller = async (req, res, next) => {
    try {
        const body: SignInForm = req.body
        const validationError = validateSignInData(body)
        if (validationError) throw new ApiError(validationError, 400)

        const { accessToken, refreshToken } = await UserService.logInUser(body)

        res.cookie('refresh_token', refreshToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 1000 // 1 day in milliseconds
            // secure: process.env.NODE_ENV === 'production'
        })

        const response: ApiResponse = { success: true, message: 'Login successful', data: { accessToken } }
        res.status(200).json(response)
    } catch (error) {
        handleError(error, next)
    }
}

export const updateUser: Controller<UserUpdate> = async (req, res, next) => {
    try {
        const userId = req.params.id
        const data = req.body

        const validationError = validateUpdateData(data)
        if (validationError) throw new ApiError(validationError, 400)

        const updatedUser = await UserService.updateUser(userId, data)
        const response: ApiResponse = { success: true, message: 'User updated successfully', data: { updatedUser } }
        res.status(200).json(response)
    } catch (error) {
        handleError(error, next)
    }
}

export const deleteUser: Controller<RequestWithId> = async (req, res, next) => {
    try {
        const userId = req.params.id
        const deletedUser = await UserService.deleteUser(userId)
        const response: ApiResponse = { success: true, message: 'User deleted successfully', data: { deletedUser } }
        res.status(200).json(response)
    } catch (error) {
        handleError(error, next)
    }
}

export const getAllUser: Controller = async (req, res, next) => {
    try {
        const users = await UserService.getAllUser()
        const response: ApiResponse = { success: true, message: 'Users retrieved successfully', data: { users } }
        res.status(200).json(response)
    } catch (error) {
        handleError(error, next)
    }
}

export const getDetail: Controller<RequestWithId> = async (req, res, next) => {
    try {
        const user = await UserService.getUserById(req.params.id)
        const response: ApiResponse = { success: true, message: 'User details retrieved successfully', data: { user } }
        res.status(200).json(response)
    } catch (error) {
        handleError(error, next)
    }
}

export const refreshAccessToken: Controller = async (req, res, next) => {
    try {
        const refreshToken = req.cookies.refresh_token

        if (!refreshToken) throw new ApiError('No refresh token found', 400)

        const newAccessToken = await JwtService.refreshAccessToken(refreshToken)
        const response: ApiResponse = {
            success: true,
            message: 'Access token refreshed successfully',
            data: { newAccessToken }
        }
        res.status(200).json(response)
    } catch (error) {
        handleError(error, next)
    }
}

export const logOutUser: Controller = async (req, res, next) => {
    try {
        res.clearCookie('refresh_token', {
            httpOnly: true,
            // secure: process.env.NODE_ENV === 'production', // Use secure in production
            sameSite: 'strict' // Protect against CSRF
        })
        const response: ApiResponse = { success: true, message: 'Log out user succesfully' }
        res.status(200).json(response)
    } catch (error) {
        handleError(error, next)
    }
}
