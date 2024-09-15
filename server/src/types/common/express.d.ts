import { Request } from 'express'
declare global {
    namespace Express {
        interface Request {
            user: {
                id: number
                isAdmin: boolean
            }
        }
    }
}

export interface RequestWithId extends Request {
    params: { id: string }
}
