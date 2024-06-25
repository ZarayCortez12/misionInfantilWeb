import {Router} from 'express'

import {
    registerDocente,
    updateDocente,
    getDocentes,
    getDocente,
} from "../controller/teacher.controller.js"

import { validateSchema } from '../middlewares/validator.middleware.js';

import { registerDocenteSchema } from '../schemas/auth.schema.js';
import { get } from 'mongoose';

const router = Router()

router.post('/updateDocente', validateSchema(registerDocenteSchema), registerDocente);
router.get('/getDocentes', getDocentes);
router.get('/getDocente/:id', getDocente);

export default router;