import { Router } from 'express'
import * as UserController from '../controllers/UserController'
import { adminAuth, userAuth } from '../middlewares/authMiddleware'
const UserRouter = Router()

//---------------------------------------- Auth routes ------------------------------------------------------------
// TODO: Update swagger
//---------------------------------------- Auth routes ------------------------------------------------------------
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
UserRouter.post('/auth/sign-up', UserController.createUser)

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
UserRouter.post('/auth/sign-in', UserController.logInUser)

UserRouter.post('/auth/log-out', UserController.logOutUser)

/**
 * @swagger
 * /user/refresh-token:
 *   post:
 *     tags:
 *       - User
 *     summary: Refresh access token based on refresh token
 *     description: Refresh token stored in cookie, access token stored in local storage
 *     responses:
 *       200:
 *         description: Refresh token valid, return new access token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 newAccessToken:
 *                   type: string
 *                   example: eyJhbGci...
 *       400:
 *         description: No refresh token found, or invalid refresh token
 */
UserRouter.post('/auth/refresh-token', UserController.refreshAccessToken)

//---------------------------------------- Resource routes ------------------------------------------------------------

/**
 * @swagger
 * /user/detail/{id}:
 *   get:
 *     summary: Get details about user
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
UserRouter.get('/:id', userAuth, UserController.getDetail)

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
UserRouter.put('/:id', userAuth, UserController.updateUser)

//---------------------------------------- Admin only routes ------------------------------------------------------------

/**
 * @swagger
 * /user/get-all:
 *   get:
 *     summary: Retrieve all non-admin users
 *     description: Retrieves a list of all non-admin users. This route requires authentication.
 *     tags:
 *       - User
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized - User is not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
UserRouter.get('/', adminAuth, UserController.getAllUser)

/**
 * @swagger
 * /user/delete-user/{id}:
 *   delete:
 *     summary: Delete user by id (Admin only)
 *     description: Only admin users can delete a user.
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user to delete
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       400:
 *         description: Bad request
 */
UserRouter.delete('/:id', adminAuth, UserController.deleteUser)

export default UserRouter
