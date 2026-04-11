import express from "express";

import { session, signin, signout, signup } from "../controllers/auth.controller";

import { validateBody } from "../middlewares/validate";

const router = express.Router();

router.post(
  "/signin",
  validateBody({
    email: { required: true, email: true },
    password: { required: true, minLen: 6 },
  }),
  signin,
);

router.post(
  "/signup",
  validateBody({
    name: { required: true, minLen: 2 },
    email: { required: true, email: true },
    password: { required: true, minLen: 6 },
    pictures: { required: false },
  }),
  signup,
);

router.post("/signout", signout);
router.get("/session", session);

export default router;
