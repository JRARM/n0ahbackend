import { Router } from "express";
import { getActivityByUser, getAllAnswersByCourse, getAllDatesByCourse, getAllSuspects, getUsers, getactivityforDay, getactivityforhour, getallCourses } from "../controllers/records.controller.js";

const router = Router();

router.get('/getactivityforday', getactivityforDay);
router.get('/getactivityforhour', getactivityforhour);

router.post("/getuseractions", getActivityByUser);

router.get("/getallusers", getUsers);

router.get('/getallcourses', getallCourses);

router.post('/getallanswersbycourse',getAllAnswersByCourse);

router.post('/getalldatesbycourse', getAllDatesByCourse);

router.post('/getallsuspects', getAllSuspects);

export default router;
