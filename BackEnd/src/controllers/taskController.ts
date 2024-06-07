import { Request, Response } from 'express';
import { getTasksByUser, addTask, updateTask, deleteTask } from '../services/taskService';
import { Task } from '../models/tasks';

const getAllTasks = async (req: Request, res: Response) => {
  try {
    const userEmail = req.user?.email; // Suponiendo que se usa algún middleware de autenticación que agrega el usuario al request
    if (!userEmail) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const tasks = await getTasksByUser(userEmail);
    res.status(200).json(tasks);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

const createTask = async (req: Request, res: Response) => {
  try {
    const userEmail = req.user?.email; // Suponiendo que se usa algún middleware de autenticación que agrega el usuario al request
    if (!userEmail) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const task: Task = { ...req.body, userEmail };
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

const updateTaskById = async (req: Request, res: Response) => {
  try {
    const taskId = req.params.taskId;
    const task: Partial<Task> = req.body;
    await updateTask(taskId, task);
    res.status(200).json({ message: 'Task updated successfully' });
  } catch (error) {
    if (error instanceof Error) {
      res.status (500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

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
