import { Router } from 'express'
import * as UserController from '../controllers/UserController'
const UserRouter = Router()

UserRouter.post('/', UserController.createUser)

export default UserRouter
