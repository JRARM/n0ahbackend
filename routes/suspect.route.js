import { Router } from "express";
import { getIncidents } from "../controllers/suspect.controller.js";

const router = Router();

router.get("/getincidents", getIncidents);

export default router;
