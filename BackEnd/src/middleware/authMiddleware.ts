import { Request, Response, NextFunction } from 'express';

/**
 * Middleware function that checks if the user is authorized to access a protected route.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @return {void}
 */
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const userEmail = req.headers['x-user-email']; 
  if (!userEmail) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  req.user = { email: userEmail as string };
  next();
};

export default authMiddleware;
