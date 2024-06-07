import { db } from '../firebaseConfig';
import { Task } from '../models/tasks';

const getTasksByUser = async (email: string): Promise<Task[]> => {
  const tasksSnapshot = await db.collection('tasks').where('userEmail', '==', email).get();
  return tasksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Task));
};

const addTask = async (task: Task): Promise<void> => {
  await db.collection('tasks').add(task);
};

const updateTask = async (taskId: string, task: Partial<Task>): Promise<void> => {
  await db.collection('tasks').doc(taskId).update(task);
};

const deleteTask = async (taskId: string): Promise<void> => {
  await db.collection('tasks').doc(taskId).delete();
};

export { getTasksByUser, addTask, updateTask, deleteTask };
