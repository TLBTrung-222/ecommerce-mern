import { Request, Response, NextFunction } from 'express'
import { AppError } from '../utils/AppError'

const errorMiddleware = (err: AppError | Error, req: Request, res: Response, next: NextFunction) => {
    let status = 500
    if (err instanceof AppError) {
        status = err.statusCode
    }
    const errorMessage = err.message || 'Internal Server Error'
    res.status(status).json({ error: errorMessage })
}

export default errorMiddleware
