import { db } from '../firebaseConfig';
import { User } from '../models/user';

const getUser = async (email: string): Promise<User | null> => {
  const userSnapshot = await db.collection('users').doc(email).get();
  return userSnapshot.exists ? (userSnapshot.data() as User) : null;
};

const addUser = async (user: User): Promise<void> => {
  await db.collection('users').doc(user.email).set(user);
};

export { getUser, addUser };
