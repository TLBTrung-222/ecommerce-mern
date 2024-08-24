import { Controller } from '../types/ControllerFunc.type'
import * as UserService from '../services/UserService'
import { SignUpForm } from '../types/UserRequest.type'
import { validateSignUpData } from '../utils/validator'
import { AppError } from '../utils/AppError'

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
