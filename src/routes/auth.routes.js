import {Router} from 'express'
import {
    loginDocente, 
    registerDocente, 
    logout, 
    profile,
    verifyToken,

} from "../controller/auth.controller.js"

import { authRequired } from '../middlewares/validateToken.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
import { registerDocenteSchema, loginDocentesSchema } from '../schemas/auth.schema.js';
import BienvenidaAdmin from '../../client/src/pages/ModuloAdmin/Bienvenida.jsx';

const router = Router()

router.post('/registerDocente', validateSchema(registerDocenteSchema), registerDocente);

router.post('/login', validateSchema(loginDocentesSchema), loginDocente)

router.post('/logout', logout)

router.get('/verify', verifyToken)

router.get('/profile', authRequired, profile)

router.get('/bienvenidaAdmin', BienvenidaAdmin)

export default router;