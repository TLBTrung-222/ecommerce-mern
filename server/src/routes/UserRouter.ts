import { Router } from 'express'
import * as UserController from '../controllers/UserController'
const UserRouter = Router()

/**
 * @swagger
 * /user/sign-up:
 *   post:
 *     summary: Create a new user
 *     tags:
 *        - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserSignUp'
 *     responses:
 *       201:
 *         description: User created successfully
 *       401:
 *         description: Bad request
 */
UserRouter.post('/sign-up', UserController.createUser)

/**
 * @swagger
 * /user/sign-in:
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
 *       400:
 *         description: Unauthorized
 */
UserRouter.post('/sign-in', UserController.logInUser)

/**
 * @swagger
 * /user/update-user/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdate'
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
UserRouter.put('/update-user/:id', UserController.updateUser)

export default UserRouter
