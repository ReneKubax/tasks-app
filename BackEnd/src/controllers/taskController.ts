import { Request, Response } from 'express';
import { getTasksByUser, addTask, updateTask, deleteTask } from '../services/taskService';
import { Task } from '../models/tasks';

/**
 * Retrieves all tasks.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} - A promise that resolves when the tasks are retrieved successfully or an error message is sent.
 */
const getAllTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await getTasksByUser(''); // Pasar un string vacío para obtener todas las tareas
    res.status(200).json(tasks);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

/**
 * Creates a new task with the provided data.
 *
 * @param {Request} req - The request object containing the task data.
 * @param {Response} res - The response object used to send the result of the operation.
 * @return {Promise<void>} - A promise that resolves when the task is created successfully or an error message is sent.
 */
const createTask = async (req: Request, res: Response) => {
  try {
    const task: Task = req.body;
    await addTask(task);
    res.status(201).json({ message: 'Task created successfully' });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

/**
 * Updates a task by its ID.
 *
 * @param {Request} req - The request object containing the task ID in the params.
 * @param {Response} res - The response object used to send the result of the operation.
 * @return {Promise<void>} - A promise that resolves when the task is updated successfully or an error message is sent.
 */
const updateTaskById = async (req: Request, res: Response) => {
  try {
    const taskId = req.params.taskId;
    const task: Partial<Task> = req.body;
    await updateTask(taskId, task);
    res.status(200).json({ message: 'Task updated successfully' });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

/**
 * Deletes a task by its ID.
 *
 * @param {Request} req - The request object containing the task ID in the params.
 * @param {Response} res - The response object used to send the result of the operation.
 * @return {Promise<void>} - A promise that resolves when the task is deleted successfully or an error message is sent.
 */
const deleteTaskById = async (req: Request, res: Response) => {
  try {
    const taskId = req.params.taskId;
    await deleteTask(taskId);
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

export { getAllTasks, createTask, updateTaskById, deleteTaskById };
