import "dotenv/config";
import "./database/connectiondb.js";
import express from "express";
import authRoutes from "./routes/auth.route.js";
import suspectRoutes from "./routes/suspect.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/data", suspectRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log("Servidor Iniciado http://localhost:" + PORT)
);
