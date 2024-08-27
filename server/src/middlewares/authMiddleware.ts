import { env } from '../config/environment'
import { Controller } from '../types/ControllerFunc.type'
import jwt from 'jsonwebtoken'
import { IPayload } from '../types/Jwt.type'
import { AuthLevel } from '../types/Auth.type'
import handleError from '../utils/handleError'
import { AppError } from '../utils/AppError'
import { RequestWithId } from '../types/User.type'

/**
 * Create auth middleware correspond for admin-only and user-only route
 * @notice admin can access any user-only route
 */
const createAuthMiddleware = (requiredAuthLevel: AuthLevel): Controller<RequestWithId> => {
    return (req, res, next) => {
        try {
            if (!req.headers.authorization) {
                throw new AppError("Request's headers not include 'authorization' field", 401)
            }
            const token: string = req.headers.authorization.split(' ')[1]
            if (!token) {
                throw new AppError('No token provided', 401)
            }

            jwt.verify(token, env.ACCESS_TOKEN_SECRET, (error, decoded) => {
                if (error) throw new AppError(error.message, 401)

                const { id, isAdmin } = decoded as IPayload

                switch (requiredAuthLevel) {
                    case 'admin':
                        if (!isAdmin) throw new AppError('Forbidden: Admins only', 403)
                        break
                    case 'user':
                        if (id !== parseInt(req.params.id) && !isAdmin)
                            throw new AppError('Forbidden: You can only access your own resources', 403)
                        break
                    default:
                        break
                }
                // Attach the user info to the request object for use in subsequent middleware or route handlers
                req.user = { id, isAdmin }
                return next()
            })
        } catch (error) {
            handleError(error, next)
        }
    }
}

export const adminAuth = createAuthMiddleware('admin')
export const userAuth = createAuthMiddleware('user')
