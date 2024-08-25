import { Controller } from '../types/ControllerFunc.type'
import * as UserService from '../services/UserService'
import * as JwtService from '../services/JwtService'
import { SignInForm, SignUpForm } from '../types/UserRequest.type'
import { validateSignUpData } from '../utils/validator'
import { AppError } from '../utils/AppError'
import { comparePassword } from '../utils/password'

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
        const { email, password } = body

        // get the user in db
        const user = await UserService.getUserByEmail(email)
        if (!user) return next(new AppError('Email not exist', 400))

        // compare password
        const correctPassword = await comparePassword(password, user.pw_hash)
        if (!correctPassword) return next(new AppError('Incorrect password', 400))

        // return jwt token to user
        // jwt token payload = id + isAdmin from user
        const payload = { id: user.id, isAdmin: user.is_admin }
        const accessToken = JwtService.generalAccessToken(payload)
        const refreshToken = JwtService.generalRefreshToken(payload)
        res.status(200).json({ message: 'correct password', accessToken, refreshToken })
    } catch (error) {
        return next(new AppError(`${(error as Error).message}`, 400))
    }
}
