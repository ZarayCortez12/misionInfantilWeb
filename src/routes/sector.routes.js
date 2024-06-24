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

router.get('/sectores', getSectores )
router.get('/sectores/:id', authRequired, getSector)
router.post(
    '/sectores', 
    authRequired, 
    validateSchema(createSectorSchema),
    createSector
);
router.delete('/sectores/:id', deleteSector)
router.put('/sectores/:id',  updateSector)

export default router