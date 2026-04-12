import express, { NextFunction, Request, Response } from "express";

import multer from "multer";

import {
  changePassword,
  patchProfile,
  session,
  signin,
  signout,
  signup,
  uploadProfilePicture,
} from "../controllers/auth.controller";

import { validateBody } from "../middlewares/validate";

const router = express.Router();

const profilePictureUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

function profilePictureMiddleware(req: Request, res: Response, next: NextFunction) {
  profilePictureUpload.single("picture")(req, res, (err: unknown) => {
    if (
      err &&
      typeof err === "object" &&
      "code" in err &&
      (err as { code: string }).code === "LIMIT_FILE_SIZE"
    ) {
      return res.status(400).json({ message: "Image must be 5MB or smaller" });
    }
    if (err instanceof Error) {
      return res.status(400).json({ message: err.message });
    }
    if (err) return next(err as Error);
    return next();
  });
}

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

router.post(
  "/password",
  validateBody({
    currentPassword: { required: true, minLen: 6 },
    newPassword: { required: true, minLen: 6 },
  }),
  changePassword,
);

router.post("/profile/picture", profilePictureMiddleware, uploadProfilePicture);

router.patch(
  "/profile",
  validateBody({
    name: { required: false, minLen: 2 },
    email: { required: false, email: true },
    pictures: { required: false },
    phone: { required: false },
  }),
  patchProfile,
);

export default router;
