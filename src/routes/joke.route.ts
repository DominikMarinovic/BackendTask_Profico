import express from 'express';
import authToken from '../middleware/authenticateToken';
import { NextFunction, Request, Response } from 'express';
import { sendEmail } from '../services/ChuckNorrisApiService';
import UserControllers, { IUser } from '../controllers/user';

const router = express.Router();

router.get(
  '/',
  authToken,
  async (req: Request, res: Response, next: NextFunction) => {
    const user: IUser = <IUser>(
      await UserControllers.getUserById(req.params.userId)
    );
    const sentEmail = await sendEmail(user.email);
    res.json({ sentEmail });
    next();
  },
);

export default router;
