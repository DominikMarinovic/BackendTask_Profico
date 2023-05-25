import { NextFunction, Request, Response } from 'express';
import UserControllers from '../controllers/user';

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { firstName, lastName, email, password } = await req.body;
  const validate = await UserControllers.validateUser(
    firstName,
    lastName,
    email,
    password,
  );
  if (!validate) {
    res.sendStatus(400).json({ message: 'Invalid User input!' });
  } else {
    try {
      const user = await UserControllers.getUserByEmail(email);
      if (user) {
        return res.status(400).json({ message: 'User already exists' });
      } else {
        const newUser = await UserControllers.createUser(
          firstName,
          lastName,
          email,
          password,
        );
        console.log('New user successfully registered!');
        res.status(201).send({ user: newUser });
        next();
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error });
    }
  }
};
