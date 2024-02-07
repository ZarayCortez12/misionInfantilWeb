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

router.get('/sector', authRequired, getSectores )
router.get('/sector/:id', authRequired, getSector)
router.post(
    '/sector', 
    authRequired, 
    validateSchema(createSectorSchema),
    createSector
);
router.delete('/sector/:id', authRequired, deleteSector)
router.put('/sector/:id', authRequired, updateSector)

export default router