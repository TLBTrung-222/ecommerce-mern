import { Request, Response, NextFunction } from 'express'
import { AppError } from '../utils/AppError'

const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
    const status = err.statusCode || 500
    res.status(status).json({ message: err.message || 'Internal Server Error' })
}

export default errorHandler
