import { db } from '../firebaseConfig';
import { User } from '../models/user';

/**
 * Retrieves a user from the database by their email address.
 *
 * @param {string} email - The email address of the user.
 * @return {Promise<User | null>} A promise that resolves to the user object if found, or null if not found.
 */
const getUser = async (email: string): Promise<User | null> => {
  const userSnapshot = await db.collection('users').doc(email).get();
  return userSnapshot.exists ? (userSnapshot.data() as User) : null;
};

/**
 * Adds a user to the database.
 *
 * @param {User} user - The user object to be added.
 * @return {Promise<void>} A promise that resolves when the user is added.
 */
const addUser = async (user: User): Promise<void> => {
  await db.collection('users').doc(user.email).set(user);
};

export { getUser, addUser };
