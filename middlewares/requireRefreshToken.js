import { tokenVerificationErrors } from "../utils/tokenManager.js";
import jwt from "jsonwebtoken"; 
export const requireRefreshToken = (req, res, next) => {
  try {
    console.log(req.cookies.refreshToken);
    const refreshtokenCookie = req.cookies.refreshToken;
    if (!refreshtokenCookie) throw new Error("No Bearer");

    const { uid } = jwt.verify(refreshtokenCookie, process.env.JWT_REFRESH);
    req.uid = uid;
    next();
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .json({ error: tokenVerificationErrors[error.message] });
  }
};
