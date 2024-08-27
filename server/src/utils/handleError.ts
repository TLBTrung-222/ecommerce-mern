import { NextFunction } from 'express'
import { AppError } from './AppError'

const handleError = (error: unknown, next: NextFunction) => {
    if (error instanceof AppError) {
        return next(error)
    }
    return next(new AppError((error as Error).message, 500))
}

export default handleError
