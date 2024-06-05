import { Router } from 'express';
import { getAllTasks, createTask, updateTaskById, deleteTaskById } from '../controllers/taskController';

const router = Router();

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks
 *     responses:
 *       200:
 *         description: List of tasks
 */
router.get('/tasks', getAllTasks);

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               createdAt:
 *                 type: string
 *                 format: date-time
 *               completed:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Task created successfully
 *       500:
 *         description: Server error
 */
router.post('/tasks', createTask);

/**
 * @swagger
 * /tasks/{taskId}:
 *   put:
 *     summary: Update an existing task
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         description: The ID of the task to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               completed:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       500:
 *         description: Server error
 */
router.put('/tasks/:taskId', updateTaskById);

/**
 * @swagger
 * /tasks/{taskId}:
 *   delete:
 *     summary: Delete an existing task
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         description: The ID of the task to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       500:
 *         description: Server error
 */
router.delete('/tasks/:taskId', deleteTaskById);

export default router;
