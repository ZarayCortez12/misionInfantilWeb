import Actividad from "../models/actividad.model.js";
import {
  updateFile,
  deleteFile,
  uploadFile,
} from "../libs/cloudinary.curso.js";
import fs from "fs-extra";

export const createActividad = async (req, res) => {
  try {
    const { nombre, descripcion, cursoId } = req.body;
    const actividad = new Actividad({
      nombre,
      descripcion,
      cursoId,
      entregas: [],
    });

    await actividad.save();

    res.status(201).json(actividad);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la actividad" });
  }
};

export const getActividades = async (req, res) => {
  const { cursoId } = req.params; // Obtenemos el ID del curso desde los parámetros de la URL

  try {
    // Buscamos las actividades relacionadas con el curso
    const actividades = await Actividad.find({ curso: cursoId });

    if (!actividades.length) {
      return res
        .status(404)
        .json({ message: "No hay actividades para este curso" });
    }

    // Retornamos las actividades encontradas
    res.status(200).json({ actividades });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener las actividades" });
  }
};

export const getActividad = async (req, res) => {
  try {
    const { id } = req.params;
    const actividad = await Actividad.findOne({ _id: id });
    console.log("actividad obtenida", actividad);
    res.json(actividad);
  } catch (error) {
    console.log(error);
    return res.status(404).json(error);
  }
};

export const getDocumentoEntregaEstudiante = async (req, res) => {
  try {
    console.log(req.params);
    const { idEstudiante, id } = req.params;
    const actividad = await Actividad.findById(id);
    if (!actividad)
      return res.status(404).json({ message: "Actividad no encontrada" });
    const entrega = actividad.entregas.find(
      (entrega) => entrega.estudianteId.toString() === idEstudiante
    );
    console.log("entrega", entrega);
    if (!entrega)
      return res.status(404).json({ message: "Entrega no encontrada" });
    res.json(entrega);
  } catch (error) {
    return res.status(404).json({ message: "Actividad no Encontrada" });
  }
};

export const getEntregas = async (req, res) => {
  try {
    const { id } = req.params;
    let entregas = [];
    const actividad = await Actividad.findById(id);
    if (!actividad)
      return res.status(404).json({ message: "Actividad no encontrada" });

    entregas = await Actividad.findById(id).populate("entregas");

    res.json(entregas);
  } catch (error) {
    return res.status(404).json({ message: "Actividad no Encontrada" });
  }
};

export const crearEntrega = async (req, res) => {
  console.log(req.params);
  try {
    let documento;
    console.log("Datos del archivo subido:", req.files);

    // Verificar si se subió un archivo
    if (req.files) {
      console.log("Archivo subido:", req.files.file.name);
      const result = await uploadFile(req.files.file.tempFilePath);
      console.log("Resultado del archivo subido:", result);

      // Eliminar el archivo temporal después de cargarlo
      await fs.remove(req.files.file.tempFilePath);

      // Crear la entrega
      documento = {
        estudianteId: req.params.idEstudiante,
        documento: result.secure_url,
        calificacion: "", // Deberías permitir la calificación más adelante si lo deseas
        fechaEntrega: new Date(),
        horaEntrega: new Date().toLocaleTimeString("es-ES", { hour12: false }), // Formato HH:mm
      };

      console.log("documento", documento);

      // Buscar la actividad por su ID
      const actividad = await Actividad.findById(req.params.id);
      if (!actividad) {
        return res.status(404).json({ message: "Actividad no encontrada" });
      }

      // Verificar si la entrega del estudiante ya existe
      const entregaExistente = actividad.entregas.find(
        (entrega) => entrega.estudianteId.toString() === req.params.idEstudiante
      );
      if (entregaExistente) {
        return res
          .status(400)
          .json({ message: "El estudiante ya ha entregado su actividad" });
      }

      // Agregar la nueva entrega al array de entregas de la actividad
      actividad.entregas.push(documento);

      // Guardar la actividad con la nueva entrega
      await actividad.save();

      return res
        .status(200)
        .json({ message: "Entrega registrada correctamente", actividad });
    } else {
      return res.status(400).json({ message: "No se ha subido un archivo" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al procesar la entrega" });
  }
};

export const calificarEntrega = async (req, res) => {
    try {
      const { id, estudianteId } = req.params;
      const { calificacion } = req.body;
  
      const actividad = await Actividad.findById(id);
      if (!actividad) {
        return res.status(404).json({ message: "Actividad no encontrada" });
      }
  
      // Buscar la entrega dentro del array de entregas
      const entrega = actividad.entregas.find(
        (entrega) => entrega.estudianteId.toString() === estudianteId
      );
  
      if (!entrega) {
        return res.status(404).json({ message: "Entrega no encontrada" });
      }
  
      // Actualizar la calificación
      entrega.calificacion = calificacion;
  
      // Guardar los cambios en el documento padre
      await actividad.save();
  
      res.status(200).json({ message: "Entrega calificada correctamente", actividad });
    } catch (error) {
      console.error("Error al calificar la entrega:", error);
      return res.status(500).json({ message: "Error al procesar la entrega" });
    }
  };
  
