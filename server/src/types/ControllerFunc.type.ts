import { Request, Response, NextFunction } from 'express'

// Define the type for the controller function
export type Controller<T extends Request = Request> = (
    req: T,
    res: Response,
    next: NextFunction
) => Promise<void> | void | Response
