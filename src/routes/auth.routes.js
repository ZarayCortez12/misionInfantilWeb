import {Router} from 'express'
import {
    login, 
    registerDocente, 
    logout, 
    profile,
    verifyToken,
    getUsuarios,

} from "../controller/auth.controller.js"

import { authRequired } from '../middlewares/validateToken.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
import { registerDocenteSchema, loginSchema } from '../schemas/auth.schema.js';

const router = Router()

router.post('/registerDocente', validateSchema(registerDocenteSchema), registerDocente);

router.post('/login', validateSchema(loginSchema), login)

router.post('/logout', logout)

router.get('/verify', verifyToken)

router.get('/profile', authRequired, profile)

router.get('/usuarios', getUsuarios)

export default router;