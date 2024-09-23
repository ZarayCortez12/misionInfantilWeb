import Curso from "../models/cursos.model.js";
import { updateFile, deleteFile, uploadFile } from "../libs/cloudinary.curso.js";
import fs from 'fs-extra';

export const getCursos = async (req, res) => {
  try {
    const cursos = await Curso.find();
    res.json(cursos);
  } catch (error) {
    return res.status(404).json({ message: "Cursos no Encontrado" });
  }
};

export const createCurso = async (req, res) => {
  try {
    const { nombre, descripcion, docente1, docente2 } = req.body;

    // Construir el array de docentes
    const docentes = [docente1];
    if (docente2) {
      docentes.push(docente2);
    }

    const nombreAux = await Curso.findOne({ nombre: nombre });
    console.log("Nombre actualizado", nombreAux);
    if (nombreAux) {
      return res
        .status(400)
        .json({ message: "Ya existe un curso con el mismo nombre" });
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
    const { nombre, descripcion, docente1, docente2 } = req.body;
    console.log("Datos del curso a actualizar:", req.body);
    const { id } = req.params;

    const docentes = [docente1];
    if (docente2) {
      docentes.push(docente2);
    }

    const updateData = {
      nombre,
      descripcion,
      docentes,
    };

    const curso = await Curso.findByIdAndUpdate(id, updateData, { new: true });

    if (!curso) {
      return res.status(404).json({ message: "Curso no encontrado" });
    }

    res.json(curso);
  } catch (error) {
    console.error("Error al actualizar el curso:", error);
    return res.status(500).json({ message: "Error al actualizar el curso" });
  }
};

export const uploadDocumento = async (req, res) => {
  try {
    let documento;
    console.log("Datos del archivo subido:", req.files);
    if (req.files) {
      console.log("Archivo subido:", req.files.file.name);
      const result = await uploadFile(req.files.file.tempFilePath);
      console.log("Resultado del archivo subido:", result);
      await fs.remove(req.files.file.tempFilePath);
      documento = {
        url: result.secure_url,
        nombre: req.files.file.name,
        public_id: result.public_id,
      };

      // Agregar el documento al curso correspondiente
      const cursoId = req.params.id;
      await Curso.findByIdAndUpdate(cursoId, {
        $push: { documentos: documento },
      });

      return res.status(200).json({ message: "Documento subido correctamente", documento });
    }
    return res.status(400).json({ message: "No se ha subido ningún archivo" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al subir el documento" });
  }
};

export const getDocumentos = async (req, res) => {
  try {
    const cursoId = req.params.id;
    const curso = await Curso.findById(cursoId);
    if (!curso) {
      return res.status(404).json({ message: "Curso no encontrado" });
    }
    res.json(curso.documentos);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al obtener los documentos" });
  }
};

export const deleteDocumento = async (req, res) => {
  try {
    console.log(req.params);
    const documentoId = req.params.documentoId;
    const cursoId = req.params.id;

    const curso = await Curso.findById(cursoId);
    if (!curso) {
      return res.status(404).json({ message: "Curso no encontrado" });
    }

    // Convertir documentoId a ObjectId o usar el método `equals` para comparar
    curso.documentos = curso.documentos.filter((documento) => !documento._id.equals(documentoId));
    
    await curso.save();
    res.json({ message: "Documento eliminado correctamente" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al eliminar el documento" });
  }
};