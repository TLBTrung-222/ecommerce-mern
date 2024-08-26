import { env } from '../config/environment'
import { Controller } from '../types/ControllerFunc.type'
import jwt from 'jsonwebtoken'
import { IPayload } from '../types/Jwt.type'

/**
 * @notice Only user with 'is_admin' = true
 */
export const authMiddleware: Controller = (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res.status(401).json({ message: 'No token provided' })
        }

        const token: string = req.headers.authorization.split(' ')[1]

        if (!token) {
            return res.status(401).json({ message: 'No token provided' })
        }

        jwt.verify(token, env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                return res.status(404).json({ err })
            }
            const { isAdmin } = decoded as IPayload
            if (!isAdmin) {
                return res.status(403).json({ message: 'Forbidden: Admins only' })
            }

            return next()
        })
    } catch (error) {
        next(error)
    }
}
