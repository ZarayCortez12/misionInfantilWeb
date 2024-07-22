import Curso from '../models/cursos.model.js'

export const getCursos= async (req, res) => {
   try {
    const cursos = await Curso.find()
    res.json(cursos)
   } catch (error) {
    return res.status(404).json({ message: "Cursos no Encontrado"})
   }
}

export const createCurso = async (req, res) => {
    try {
        const { nombre, docentes, inscritos } = req.body;

        // Crear un nuevo curso con los datos del request
        const newCurso = new Curso({
            nombre,
            docentes,
            inscritos,
        });

        // Guardar el nuevo curso en la base de datos
        const savedCurso = await newCurso.save();
        res.json(savedCurso);
    } catch (error) {
        console.error("Error al crear el curso:", error);
        res.status(500).json({ message: "No se permiten datos duplicados" });
    }
};

export const getCurso = async (req, res) => {
    try {
        const curso = await Curso.findById(req.params.id);
        if (!curso) return res.status(404).json({ message: "Curso no encontrado" });
        res.json(curso);
    } catch (error) {
        console.error("Error al buscar el curso:", error);
        return res.status(500).json({ message: "Error al buscar el curso" });
    }
};

export const deleteCurso = async (req, res) => {
    try {
        const curso = await Curso.findByIdAndDelete(req.params.id);
        if (!curso) {
            return res.status(404).json({ message: "Curso no encontrado" });
        }
        return res.sendStatus(204); // Enviar un estado 204 No Content si la eliminación fue exitosa
    } catch (error) {
        console.error("Error al eliminar el curso:", error);
        return res.status(500).json({ message: "Error al eliminar el curso" });
    }
};

export const updateCurso = async (req, res) => {
    try {
        const curso = await Curso.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });

        if (!curso) {
            return res.status(404).json({ message: "Curso no encontrado" });
        }

        res.json(curso);
    } catch (error) {
        console.error("Error al actualizar el curso:", error);
        return res.status(500).json({ message: "Error al actualizar el curso" });
    }
};