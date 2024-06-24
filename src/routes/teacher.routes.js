import {Router} from 'express'

import {
    registerDocente,
    updateDocente,
} from "../controller/teacher.controller.js"

import { validateSchema } from '../middlewares/validator.middleware.js';

import { registerDocenteSchema } from '../schemas/auth.schema.js';

const router = Router()

router.post('/updateDocente', validateSchema(registerDocenteSchema), registerDocente);

export default router;