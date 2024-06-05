import { Router } from 'express';
import { getUserByEmail, createUser } from '../controllers/userController';

const router = Router();

/**
 * @swagger
 * /users/{email}:
 *   get:
 *     summary: Get a user by email
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: The email of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User found
 *       404:
 *         description: User not found
 */
router.get('/users/:email', getUserByEmail);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       500:
 *         description: Server error
 */
router.post('/users', createUser);

export default router;
