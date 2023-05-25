import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import env from '../../config/env.config';

const authToken = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = <string>req.headers['authorization'];
  const token = Boolean(authHeader) && authHeader.split(' ')[1];

  if (token === null) {
    res.sendStatus(401);
  }
  const payload = <string>jwt.verify(<string>token, env.accessToken);

  req.params.userId = payload;

  next();
};

export default authToken;
