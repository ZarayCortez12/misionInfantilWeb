import Evento from "../models/eventos.model.js";
import Sector from "../models/sector.model.js";

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
      const {
        tipoEvento,
        nombre,
        fecha,
        hora,
        lugar,
        descripcion,
        idCurso,
      } = req.body;
  
      // Validar si el tipo de evento es 'plantel'
      if (tipoEvento === "plantel") {
        const lugarEvento = await Sector.findOne({ nombre: lugar });
        if (!lugarEvento) {
          return res.status(404).json({ message: "Lugar no encontrado" });
        }
  
        // Crear un nuevo evento con los datos del request
        const newEvento = new Evento({
          nombre_curso: nombre,
          sector: lugarEvento.numero,
          descripcion,
          fecha,
          hora,
          docentes: [], // Suponiendo que no necesitas docentes para 'plantel'
        });
  
        // Guardar el nuevo evento en la base de datos
        const savedEvento = await newEvento.save();
        return res.json(savedEvento);
  
      } else if (tipoEvento === "curso") {
        // Crear un nuevo evento para un curso
        const lugarEvento = await Sector.findOne({ nombre: lugar });
        if (!lugarEvento) {
          return res.status(404).json({ message: "Lugar no encontrado" });
        }
        const newEvento = new Evento({
          nombre_curso: nombre,
          sector: lugarEvento.numero, // Puedes dejarlo vacío o ajustar según tus necesidades
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
      // Manejo de errores
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
    const evento = await Evento.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!evento) return res.status(404).json({ message: "Evento not found" });
    res.json(evento);
  } catch (error) {
    return res.status(404).json({ message: "Evento no Encontrado" });
  }
};
