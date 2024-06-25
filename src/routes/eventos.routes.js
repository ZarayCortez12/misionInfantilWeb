import { Router } from "express";
import { authRequired } from '../middlewares/validateToken.js'
import { 
    getEventos, 
    getEvento, 
    createEvento, 
    updateEvento, 
    deleteEvento
} from '../controller/eventos.controller.js'


const router = Router()

router.get('/eventos', getEventos)
router.get('/eventos/:id', getEvento)
router.post(
    '/eventos', 
    createEvento
);
router.delete('/eventos/:id', deleteEvento)
router.put('/eventos/:id',  updateEvento)

export default router