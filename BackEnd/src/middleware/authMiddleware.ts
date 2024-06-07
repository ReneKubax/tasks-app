import { Request, Response, NextFunction } from 'express';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Aquí deberías verificar el token del usuario y extraer su email.
  // Este es solo un ejemplo simple.
  const userEmail = req.headers['x-user-email']; // Suponiendo que el email del usuario viene en los headers.
  if (!userEmail) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  req.user = { email: userEmail as string };
  next();
};

export default authMiddleware;
