import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
  reloadEstudiante
} from "../controller/student.controller.js";

const router = Router();

router.get("/estudiantes", getStudents);
router.get("/estudiantes/:id", getStudent);

router.post("/estudiantes", createStudent);
router.delete("/estudiantes/:id", deleteStudent);
router.put("/estudiantes/:id", updateStudent);
router.put("/estudiantes/:id/reload", reloadEstudiante);

export default router;
