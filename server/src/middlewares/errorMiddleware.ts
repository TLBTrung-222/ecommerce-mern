import { Request, Response, NextFunction } from 'express'
import { ApiError } from '../utils/ApiError'
import { ApiResponse } from '../types'

/**
 * Handle error passed by controller
 * @param error
 * @param req
 * @param res
 * @param next
 */
const errorMiddleware = (error: ApiError | Error | undefined, req: Request, res: Response, next: NextFunction) => {
    let status = 500
    if (error instanceof ApiError) {
        status = error.statusCode
    }
    const errorMessage = error?.message || 'Internal Server Error'
    const response: ApiResponse = { success: false, error: errorMessage }
    res.status(status).json(response)
}

export default errorMiddleware
