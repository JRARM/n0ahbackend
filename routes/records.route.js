import { Router } from "express";
import { getActivityByUser } from "../controllers/records.controller.js";

const router = Router();

router.post("/getuseractions", getActivityByUser);

export default router;
