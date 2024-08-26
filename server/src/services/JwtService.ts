import jwt from 'jsonwebtoken'
import { env } from '../config/environment'
import { IPayload } from '../types/Jwt.type'

export const generalAccessToken = (payload: IPayload) => {
    const accessToken = jwt.sign(payload, env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
    return accessToken
}

export const generalRefreshToken = (payload: IPayload) => {
    const refreshToken = jwt.sign(payload, env.REFRESH_TOKEN_SECRET, { expiresIn: '30d' })
    return refreshToken
}
