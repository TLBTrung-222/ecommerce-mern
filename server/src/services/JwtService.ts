import jwt from 'jsonwebtoken'
import { env } from '../config/environment'
import { IPayload } from '../types/common'
import { ApiError } from '../utils/ApiError'

export const generalAccessToken = (payload: IPayload) => {
    const accessToken = jwt.sign(payload, env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
    return accessToken
}

export const generalRefreshToken = (payload: IPayload) => {
    const refreshToken = jwt.sign(payload, env.REFRESH_TOKEN_SECRET, { expiresIn: '30d' })
    return refreshToken
}

/**
 *
 * @param refreshToken
 * @returns new access token
 */
export const refreshAccessToken = (refreshToken: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        jwt.verify(refreshToken, env.REFRESH_TOKEN_SECRET, (error, decoded) => {
            if (error) {
                reject(new ApiError(error.message, 400))
            } else {
                // refresh token is okay, issue new access token
                const { id, isAdmin } = decoded as IPayload
                resolve(generalAccessToken({ id, isAdmin }))
            }
        })
    })
}
