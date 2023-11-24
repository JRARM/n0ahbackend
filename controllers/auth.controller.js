import { User } from "../models/User.js";
import { generateRefreshToken, generateToken } from "../utils/tokenManager.js";
export const register = async (req, res) => {
  const { name,email, password,role } = req.body;
  try {
    const user = new User({ name,email, role, password });
    console.log(user);
    await user.save();
    //generate jwt
    return res.status(201).json({ ok: true, message: "Registro Correcto" });
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      return res.status(400).json({ error: "El correo ya esta Registrado" });
    }
    return res.status(500).json({ error: "Fallo el servidor" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user)
      return res.status(403).json({ error: "El usuario no esta regsitrado" });

    const responsePassword = await user.comparePassword(password);
    if (!responsePassword)
      return res.status(403).json({ error: "Credenciales Incorrecta" });
    //generate jwt
    const { token, expiresIn } = generateToken(user.id);
    generateRefreshToken(user.id, res);
    console.log(token, expiresIn);
    return res.json({ token, expiresIn });
  } catch (error) {
    console.log(error);
  }
};

export const infoUser = async (req, res) => {
  try {
    const user = await User.findById(req.uid).lean();

    return res.json({ email: user.email, uid: user._id, role: user.role });
  } catch (error) {
    return res.status(500).json({ error: "Error del servidor" });
  }
};

export const refreshToken = (req, res) => {
  try {
    const { token, expiresIn } = generateToken(req.uid);
    return res.json({ token, expiresIn });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error del servidor" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("refreshToken");
  res.json({ message: "Se cerro la sesion correctamente" });
};
