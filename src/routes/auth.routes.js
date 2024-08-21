import { Router } from "express";
import {
  login,
  logout,
  profile,
  verifyToken,
  getUsuarios,
  sendEmail,
  resetPassword,
  updateMe,
} from "../controller/auth.controller.js";

import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { loginSchema } from "../schemas/auth.schema.js";

const router = Router();

router.post("/login", validateSchema(loginSchema), login);

router.post("/logout", logout);

router.get("/verify", verifyToken);

router.get("/profile", authRequired, profile);

router.get("/usuarios", getUsuarios);

router.post("/sendEmail", sendEmail);

router.post("/reset-password/:cedula/:token", resetPassword);

router.put("/update-me/:id", updateMe);

export default router;
