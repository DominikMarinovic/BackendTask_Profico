import express, { Request, Response } from "express";
import { signUp } from "../controllers/signUp.controller";

const router = express.Router();

router.get("/", (_req: Request, res: Response) => {
  res.send("SIGNUP");
});

router.post("/", signUp);

export default router;
