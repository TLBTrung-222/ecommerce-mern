import { Controller } from '../types/ControllerFunc.type'
import * as UserService from '../services/UserService'
import { SignInForm, SignUpForm } from '../types/UserRequest.type'
import { validateSignInData, validateSignUpData, validateUpdateData } from '../utils/validator'
import { AppError } from '../utils/AppError'
import { UserUpdate } from '../types/User.type'
import { hashedPassword } from '../utils/password'

export const createUser: Controller = async (req, res, next) => {
    try {
        const body: SignUpForm = req.body
        const validationError = validateSignUpData(body)

        if (validationError) return next(new AppError(validationError, 400)) // 400: Bad Request

        // call to service
        const response = await UserService.createUser(body)
        res.status(201).json({ message: 'user is created', user: response })
    } catch (error) {
        return next(new AppError(`${(error as Error).message}`, 400))
        // If you pass anything to the next() function (except the string 'route')
        // => Express regards the current request as being an error and will skip any remaining
        // non-error handling routing and middleware functions.
    }
}

export const logInUser: Controller = async (req, res, next) => {
    try {
        const body: SignInForm = req.body

        // validate user input
        const validationError = validateSignInData(body)
        if (validationError) return next(new AppError(validationError, 400)) // 400: Bad Request

        const { accessToken, refreshToken } = await UserService.logInUser(body)

        res.status(200).json({ message: 'correct password', accessToken, refreshToken })
    } catch (error) {
        return next(new AppError(`${(error as Error).message}`, 400))
    }
}

export const updateUser: Controller<UserUpdate> = async (req, res, next) => {
    try {
        const userId = req.params.id
        const data = req.body

        // validate input
        const validationError = validateUpdateData(data)
        if (validationError) return next(new AppError(validationError, 400)) // 400: Bad Request

        // validate id
        const user = await UserService.getUserById(userId)

        // validate properties in data and modify user
        for (const key in data) {
            if (key === 'name') user[key] = data[key] as string
            else if (key === 'phone') user[key] = data[key] as string
            else if (key === 'address') user[key] = data[key] as string
            else if (key === 'city') user[key] = data[key] as string
            else if (key === 'avatar') user[key] = data[key] as string
            else if (key === 'password') {
                // gen new password
                const { salt, hash } = await hashedPassword(data[key] as string)
                user.pw_salt = salt
                user.pw_hash = hash
            }
        }

        // call service to update user
        const updatedUser = await UserService.updateUser(user)
        res.status(200).json({ message: 'updated user succesfully!', updatedUser })
    } catch (error) {
        return next(new AppError(`${(error as Error).message}`, 400))
    }
}
