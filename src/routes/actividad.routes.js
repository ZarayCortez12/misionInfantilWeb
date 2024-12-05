import { Router } from "express";

import {
  createActividad,
  getActividades,
  getActividad,
  getDocumentoEntregaEstudiante,
  crearEntrega,
} from "../controller/actividad.controller.js";

const router = Router();

router.get("/actividad/actividades", getActividades);
router.post("/actividad/registrarActividad", createActividad);
router.get("/actividad/:id", getActividad);
router.get("/actividad/:id/entrega/:idEstudiante", getDocumentoEntregaEstudiante);
router.post("/actividad/:id/entrega/:idEstudiante", crearEntrega);


export default router;
