import { Router } from 'express'
import * as UserController from '../controllers/UserController'
const UserRouter = Router()

/**
 * @swagger
 * /sign-up:
 *   post:
 *     summary: Create a new user
 *     tags:
 *        - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 */
UserRouter.post('/sign-up', UserController.createUser)

/**
 * @swagger
 * /sign-in:
 *   post:
 *     summary: Log in a user
 *     tags:
 *        - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       401:
 *         description: Unauthorized
 */
UserRouter.post('/sign-in', UserController.logInUser)

/**
 * @swagger
 * /update-user/{id}:
 *      tags:
 *          - User
 *      parameters:
 *          -
 *
 */
UserRouter.put('/update-user/:id', UserController.updateUser)

export default UserRouter
