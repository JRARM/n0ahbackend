import { Router } from "express";
import {
  infoUser,
  login,
  register,
  refreshToken,
} from "../controllers/auth.controller.js";
import { body } from "express-validator";
import { validationResultExpress } from "../middlewares/validationResultsExpress.js";
import { requireToken } from "../middlewares/requireToken.js";
const router = Router();

router.post(
  "/register",
  [
    body("email", "Email Incorrecto").trim().isEmail().normalizeEmail(),
    body("password", "menos 5 caracteres")
      .isLength({ min: 8 })
      .custom((value, { req }) => {
        return value;
      }),
  ],
  validationResultExpress,
  register
);
router.post(
  "/login",
  [
    body("email", "Email Incorrecto").trim().isEmail().normalizeEmail(),
    body("password", "menos 5 caracteres")
      .isLength({ min: 8 })
      .custom((value, { req }) => {
        return value;
      }),
  ],
  validationResultExpress,
  login
);

router.get("/protected", requireToken, infoUser);
router.get("/refresh", refreshToken);
export default router;
