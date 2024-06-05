import { Request, Response } from 'express';
import { getTasks, addTask, updateTask, deleteTask } from '../services/taskService';
import { Task } from '../models/tasks';

/**
 * Retrieves all tasks from the database and sends them as a JSON response.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} - A promise that resolves when the tasks are retrieved and sent as a response.
 */
const getAllTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await getTasks();
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
 * Creates a new task from the request body and adds it to the database.
 *
 * @param {Request} req - The request object containing the task data.
 * @param {Response} res - The response object used to send the result of the operation.
 * @return {Promise<void>} - A promise that resolves when the task is successfully created and the response is sent.
 * @throws {Error} - If an error occurs while adding the task to the database, the error message is sent in the response.
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
 * Updates a task by its ID with the data provided in the request body.
 *
 * @param {Request} req - The request object containing the task ID and updated task data.
 * @param {Response} res - The response object used to send the result of the operation.
 * @return {Promise<void>} - A promise that resolves when the task is successfully updated and the response is sent.
 * @throws {Error} - If an error occurs while updating the task, the error message is sent in the response.
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
 * @param {Request} req - The request object containing the task ID.
 * @param {Response} res - The response object used to send the result of the operation.
 * @return {Promise<void>} - A promise that resolves when the task is successfully deleted and the response is sent.
 * @throws {Error} - If an error occurs while deleting the task, the error message is sent in the response.
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
