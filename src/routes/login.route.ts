import express from "express";
import { logIn } from "../controllers/login.controller";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send("LOGIN");
});

router.post("/", logIn);

export default router;
