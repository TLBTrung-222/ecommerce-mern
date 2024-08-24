import { Controller } from '../types/ControllerFunc.type'
import * as UserService from '../services/UserService'

export const createUser: Controller = (req, res, next) => {
    try {
        UserService.getUser()
        console.log(req.body)
        res.json({ message: 'hello from user controller' })
    } catch (error) {
        return next(error)
        // If you pass anything to the next() function (except the string 'route'),
        // Express regards the current request as being an error and will skip any remaining
        // non-error handling routing and middleware functions.
    }
}
