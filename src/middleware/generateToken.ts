import jwt from 'jsonwebtoken';
import env from '../../config/env.config';

const generateToken = (userId: string): string => {
  return jwt.sign(userId, env.accessToken);
};

export default generateToken;
