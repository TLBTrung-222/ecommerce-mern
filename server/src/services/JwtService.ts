import jwt from 'jsonwebtoken'
import { env } from '../config/environment'

interface IPayLoad {
    id: number
    isAdmin: boolean
}

export const generalAccessToken = (payload: IPayLoad) => {
    const accessToken = jwt.sign(payload, env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
    return accessToken
}

export const generalRefreshToken = (payload: IPayLoad) => {
    const refreshToken = jwt.sign(payload, env.REFRESH_TOKEN_SECRET, { expiresIn: '30d' })
    return refreshToken
}
