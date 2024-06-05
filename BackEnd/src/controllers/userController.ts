import { Request, Response } from 'express';
import { getUser, addUser } from '../services/userService';
import { User } from '../models/user';

/**
 * Retrieves a user by their email address.
 *
 * @param {Request} req - The request object containing the email parameter.
 * @param {Response} res - The response object used to send the user data or an error message.
 * @return {Promise<void>} - A promise that resolves when the user data is sent or an error message is sent.
 */
const getUserByEmail = async (req: Request, res: Response) => {
  try {
    const email = req.params.email;
    const user = await getUser(email);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

/**
 * Creates a new user.
 *
 * @param {Request} req - The request object containing the user data.
 * @param {Response} res - The response object used to send the result of the operation.
 * @return {Promise<void>} - A promise that resolves when the user is created successfully or an error message is sent.
 */
const createUser = async (req: Request, res: Response) => {
  try {
    const user: User = req.body;
    await addUser(user);
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

export { getUserByEmail, createUser };
