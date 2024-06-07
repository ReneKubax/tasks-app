import { Request, Response, NextFunction } from 'express';

/**
 * Handles errors and sends a JSON response with the error message.
 *
 * @param {Error} err - The error object.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @return {void}
 */
export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
}
