import jwt from "jsonwebtoken";

export const requireToken = (req, res, next) => {
  try {
    let token = req.headers?.authorization;
    console.log(token);
    if (!token) throw new Error("No Bearer");
    token = token.split(" ")[1];
    const { uid } = jwt.verify(token, process.env.JWT_SECRET);
    console.log(uid);
    req.uid = uid;
    next();
  } catch (error) {
    const TokenVerificationErrors = {
      "invalid signature": "La firma del JWT no es valida",
      "jwt expired": "JWT Expiro",
      "invalid token": "Token no valido",
      "No Bearer": "Utiliza formato Bearer",
    };

    console.log(error);
    return res
      .status(401)
      .json({ error: TokenVerificationErrors[error.message] });
  }
};
