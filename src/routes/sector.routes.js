import { Router } from "express";
import { authRequired } from '../middlewares/validateToken.js'
import { 
    getSectores, 
    getSector, 
    createSector, 
    updateSector, 
    deleteSector
} from '../controller/sector.controller.js'
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createSectorSchema } from "../schemas/sector.schema.js";

const router = Router()

router.get('/sectores', authRequired, getSectores )
router.get('/sectores/:id', authRequired, getSector)
router.post(
    '/sectores', 
    authRequired, 
    validateSchema(createSectorSchema),
    createSector
);
router.delete('/sectores/:id', authRequired, deleteSector)
router.put('/sectores/:id', authRequired, updateSector)

export default router