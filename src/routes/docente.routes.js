import { Router } from "express";
import { authRequired } from '../middlewares/validateToken.js'
import { 
    getProfesores , 
    getProfesor, 
    createProfesor, 
    updateProfesor , 
    deleteProfesor
} from '../controller/teacher.controller.js'


const router = Router()

router.get('/docentes', getProfesores )
router.get('/docentes/:id', getProfesor)

router.post(
    '/docentes',  
    createProfesor
);
router.delete('/docentes/:id', deleteProfesor)
router.put('/docentes/:id',  updateProfesor)

export default router