import { Request, Response, NextFunction } from 'express'

// Define a custom error type
interface CustomError extends Error {
    status?: number
}

// Define the type for the error handler middleware
type ErrorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => void

// Implement the error handler middleware
const errorHandler: ErrorHandler = (err, req, res, next) => {
    console.error(err.stack)
    const status = err.status || 500
    res.status(status).json({ message: err.message || 'Internal Server Error' })
}

export default errorHandler
