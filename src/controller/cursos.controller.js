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
      const { nombre, descripcion, docente1, docente2 } = req.body;
  
      // Construir el array de docentes
      const docentes = [docente1];
      if (docente2) {
        docentes.push(docente2);
      }
  
      // Crear el curso con el array de docentes
      const nuevoCurso = new Curso({
        nombre,
        descripcion,
        docentes,
      });
  
      await nuevoCurso.save();
  
      res.status(201).json(nuevoCurso);
    } catch (error) {
      console.error("Error al crear el curso:", error);
      res.status(500).json({ message: "Error al crear el curso." });
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