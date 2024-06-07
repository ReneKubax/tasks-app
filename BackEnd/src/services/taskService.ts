import { db } from '../firebaseConfig';
import { Task } from '../models/tasks';

/**
 * Retrieves all tasks associated with a specific user.
 *
 * @param {string} email - The email of the user.
 * @return {Promise<Task[]>} A promise that resolves to an array of Task objects.
 */
const getTasksByUser = async (email: string): Promise<Task[]> => {
  const tasksSnapshot = await db.collection('tasks').where('userEmail', '==', email).get();
  return tasksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Task));
};

/**
 * Adds a new task to the database.
 *
 * @param {Task} task - The task object to be added.
 * @return {Promise<void>} A promise that resolves when the task is successfully added.
 */
const addTask = async (task: Task): Promise<void> => {
  await db.collection('tasks').add(task);
};

/**
 * Updates a task in the database.
 *
 * @param {string} taskId - The ID of the task to update.
 * @param {Partial<Task>} task - The updated task object.
 * @return {Promise<void>} A promise that resolves when the task is successfully updated.
 */
const updateTask = async (taskId: string, task: Partial<Task>): Promise<void> => {
  await db.collection('tasks').doc(taskId).update(task);
};

/**
 * Deletes a task from the database.
 *
 * @param {string} taskId - The ID of the task to be deleted.
 * @return {Promise<void>} A promise that resolves when the task is successfully deleted.
 */
const deleteTask = async (taskId: string): Promise<void> => {
  await db.collection('tasks').doc(taskId).delete();
};

export { getTasksByUser, addTask, updateTask, deleteTask };
