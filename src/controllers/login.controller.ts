import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import UserControllers from './user';
import generateToken from '../middleware/generateToken';

export const logIn = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, password } = await req.body;
  const user = await UserControllers.getUserByEmail(email);

  if (!user) {
    return res.status(400).json({ message: 'User not found!' });
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(400).json({ message: 'Invalid password!' });
  }
  const accessToken = generateToken(user.id);
  console.log('Logged in');

  res.status(201).json({ accessToken: accessToken });

  next();
};
