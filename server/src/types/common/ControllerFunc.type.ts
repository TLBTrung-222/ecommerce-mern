import { Request, Response, NextFunction } from 'express'

/**
 * The generic type represent type of req object, which should be extend if we work on properties we defined.
 * @example Controller<AuthenticatedUser> => req.user
 * @notice will represent req object with user property
 */
export type Controller<T extends Request = Request> = (
    req: T,
    res: Response,
    next: NextFunction
) => Promise<void> | void | Response
