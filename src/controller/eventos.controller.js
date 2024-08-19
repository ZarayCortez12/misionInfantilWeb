import Evento from "../models/eventos.model.js";
import Sector from "../models/sector.model.js";
import moment from "moment";
import Curso from "../models/cursos.model.js";

export const getEventos = async (req, res) => {
  try {
    const eventos = await Evento.find();
    res.json(eventos);
  } catch (error) {
    return res.status(404).json({ message: "Eventos no Encontrado" });
  }
};

export const createEvento = async (req, res) => {
  try {
    const { tipoEvento, nombre, fecha, hora, lugar, descripcion, idCurso } =
      req.body;
    console.log("Datos del evento:", req.body);
    const fechaUTC = moment.utc(fecha).startOf("day").toDate();

    const lugarFiltro = await Sector.findOne({ nombre: lugar });
    // Verificar si el evento ya existe
    const nameExist = await Evento.findOne({ nombre_curso: nombre });
    if (nameExist) {
      return res
        .status(400)
        .json({ message: "Ya existe un evento con el mismo nombre" });
    }
    const eventosPorFecha = await Evento.find({ fecha: fecha });

    const eventosEnLugar = eventosPorFecha.filter(
      (evento) => evento.sector === lugarFiltro.numero
    );

    // Filtrar eventos por hora
    const eventosEnHora = eventosEnLugar.filter(
      (evento) => evento.hora === hora
    );
    // Verificar disponibilidad
    if (eventosEnHora.length > 0) {
      return res
        .status(400)
        .json({ message: "No hay disponibilidad en ese horario y lugar" });
    }
    const palabrasNombre = nombre.split(" ");
    const nombreModificado = palabrasNombre.slice(2).join(" ");

    let existingEvent;
    if (tipoEvento === "plantel") {
      existingEvent = await Evento.findOne({
        nombre_curso: nombre,
        fecha,
        hora,
        lugar,
        tipoEvento,
      });
    } else if (tipoEvento === "curso") {
      existingEvent = await Evento.findOne({
        nombre_curso: nombre,
        fecha,
        hora,
        tipoEvento,
        curso: idCurso, // Asegura que el nombre del evento es único para cada curso
      });
    }
    if (existingEvent) {
      return res
        .status(400)
        .json({ message: "Ya existe un evento con los mismos datos" });
    }
    // Validar si el tipo de evento es 'plantel'
    if (tipoEvento === "plantel") {
      const lugarEvento = await Sector.findOne({ nombre: lugar });
      if (!lugarEvento) {
        return res.status(404).json({ message: "Lugar no encontrado" });
      }
      // Crear un nuevo evento con los datos del request
      const newEvento = new Evento({
        nombre_curso: nombre,
        sector: lugarEvento.nombre,
        descripcion,
        fecha,
        hora,
        docentes: [], // Suponiendo que no necesitas docentes para 'plantel'
      });
      // Guardar el nuevo evento en la base de datos
      const savedEvento = await newEvento.save();
      return res.json(savedEvento);
    } else if (tipoEvento === "curso") {
      const cursoAux = await Curso.findOne({ nombre: nombreModificado });

      const docentesCurso = cursoAux ? cursoAux.docentes : [];

      // Obtener todos los eventos de cursos
      const eventosCursos = await Evento.find({ curso: { $exists: true } });
      console.log("Eventos de cursos:", eventosCursos);

      for (const evento of eventosCursos) {
        const cursoAsociado = await Curso.findById(evento.curso);
  
        // Verificar si hay conflictos de docentes
        const conflicto = cursoAsociado && cursoAsociado.docentes.some((docente) =>
          docentesCurso.includes(docente)
        ) && 
        evento.fecha.getTime() === fechaUTC.getTime();
  
        if (conflicto) {
          return res.status(400).json({ message: "Conflicto de horario con otros eventos" });
        }
      }

      // Crear un nuevo evento para un curso
      const lugarEvento = await Sector.findOne({ nombre: lugar });
      if (!lugarEvento) {
        return res.status(404).json({ message: "Lugar no encontrado" });
      }
      const newEvento = new Evento({
        nombre_curso: nombre,
        sector: lugarEvento.nombre, // Puedes dejarlo vacío o ajustar según tus necesidades
        descripcion,
        fecha,
        hora,
        curso: idCurso, // Agrega el ID del curso si es necesario en el modelo
      });
      // Guardar el nuevo evento en la base de datos
      const savedEvento = await newEvento.save();
      return res.json(savedEvento);
    } else {
      return res.status(400).json({ message: "Tipo de evento no válido" });
    }
  } catch (error) {
    console.error("Error al crear el evento:", error);
    res.status(500).json({ message: "Error al crear el evento" });
  }
};

export const getEvento = async (req, res) => {
  try {
    const evento = await Evento.findById(req.params.id);
    if (!evento)
      return res.status(404).json({ message: "Evento no encontrado" });
    res.json(evento);
  } catch (error) {
    return res.status(500).json({ message: "Error al buscar el evento" });
  }
};

export const deleteEvento = async (req, res) => {
  try {
    const evento = await Evento.findByIdAndDelete(req.params.id);
    if (!evento)
      return res.status(404).json({ message: "Evento no encontrado" });
    return res.sendStatus(204); // Enviar un estado 204 No Content si la eliminación fue exitosa
  } catch (error) {
    return res.status(500).json({ message: "Error al eliminar el evento" });
  }
};

export const updateEvento = async (req, res) => {
    try {
      const { nombre, fecha, hora, lugar } = req.body;
      const { id } = req.params;
  
      // Verificar si el evento a actualizar existe
      const eventoExistente = await Evento.findById(id);
      if (!eventoExistente) {
        return res.status(404).json({ message: "Evento no encontrado" });
      }
  
      // Validar la disponibilidad del lugar y hora
      const fechaUTC = moment.utc(fecha).startOf("day").toDate();
      const lugarFiltro = await Sector.findOne({ nombre: lugar });
  
      if (!lugarFiltro) {
        return res.status(404).json({ message: "Lugar no encontrado" });
      }
  
      // Verificar si hay eventos en el mismo lugar y hora
      const eventosPorFecha = await Evento.find({ fecha: fecha });
      console.log("Eventos por fecha:", eventosPorFecha);
      const eventosEnLugar = eventosPorFecha.filter(
        (evento) => evento.sector === lugarFiltro.nombre && evento._id.toString() !== id
      );
      console.log("Eventos en lugar:", eventosEnLugar);
  
      const eventosEnHora = eventosEnLugar.filter(
        (evento) => evento.hora === hora
      );
  
      if (eventosEnHora.length > 0) {
        return res.status(400).json({ message: "No hay disponibilidad en ese horario y lugar" });
      }
  
      // Verificar conflictos de docentes para eventos de tipo 'curso'
      const eventoActualizado = await Evento.findById(id);
      if (eventoActualizado.tipoEvento === "curso") {
        const cursoAux = await Curso.findOne({ nombre: nombre });
        const docentesCurso = cursoAux ? cursoAux.docentes : [];
  
        const eventosCursos = await Evento.find({ curso: { $exists: true } });
        for (const evento of eventosCursos) {
          const cursoAsociado = await Curso.findById(evento.curso);
  
          const conflicto = cursoAsociado && cursoAsociado.docentes.some((docente) =>
            docentesCurso.includes(docente)
          ) &&
          evento.fecha.getTime() === fechaUTC.getTime() &&
          evento.hora === hora;
  
          if (conflicto) {
            return res.status(400).json({ message: "Conflicto de horario con otros eventos" });
          }
        }
      }
  
      // Actualizar el evento con los nuevos datos
      const eventoAActualizado = await Evento.findByIdAndUpdate(id, req.body, {
        new: true,
      });
  
      if (!eventoAActualizado) {
        return res.status(404).json({ message: "Evento no encontrado" });
      }
  
      res.json(eventoAActualizado);
  
    } catch (error) {
      console.error("Error al actualizar el evento:", error);
      res.status(500).json({ message: "Error al actualizar el evento" });
    }
  };
