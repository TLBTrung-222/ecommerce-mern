import { Request, Response, NextFunction } from 'express'

// Define the type for the controller function
export type Controller = (req: Request, res: Response, next: NextFunction) => Promise<void> | void
