import { Router } from "express";
import { authRequired } from '../middlewares/validateToken.js'
import { 
    getCursos, 
    getCurso, 
    createCurso, 
    updateCurso, 
    deleteCurso
} from '../controller/cursos.controller.js'


const router = Router()

router.get('/cursos', getCursos)
router.get('/cursos/:id', getCurso)
router.post(
    '/cursos', 
    createCurso
);
router.delete('/cursos/:id', deleteCurso)
router.put('/cursos/:id',  updateCurso)

export default router