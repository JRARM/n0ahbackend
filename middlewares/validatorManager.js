import { validationResult, body } from "express-validator";

export const validationResultExpress = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const bodyLoginValidator = [
  body("email", "Email Incorrecto").trim().isEmail().normalizeEmail(),
  body("password", "La contraseña no puede tener menos de 8 caracteres")
    .isLength({ min: 8 })
    .custom((value, { req }) => {
      return value;
    }),
  validationResultExpress,
];

export const bodyRegisterValidator = [
  body("email", "Email Incorrecto").trim().isEmail().normalizeEmail(),
  body("password", "La contraseña no puede tener menos de 8 caracteres")
    .isLength({ min: 8 })
    .custom((value, { req }) => {
      return value;
    }),
  validationResultExpress,
];
