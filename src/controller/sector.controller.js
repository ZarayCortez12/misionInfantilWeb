import Sector from "../models/sector.model.js";
import Eventos from "../models/eventos.model.js";

export const getSectores = async (req, res) => {
  try {
    const sectores = await Sector.find();
    res.json(sectores);
  } catch (error) {
    return res.status(404).json({ message: "Sector no Encontrado" });
  }
};

export const createSector = async (req, res) => {
  try {
    const { numero, nombre, direccion, barrio } = req.body;

    const existingSectorNombre = await Sector.findOne({ nombre: nombre });
    if (existingSectorNombre) {
      return res
        .status(400)
        .json({ message: "Ya existe un sector con este nombre" });
    }

    // Verifica si ya existe un sector con la misma dirección y barrio
    const existingSector = await Sector.findOne({ direccion, barrio });

    if (existingSector) {
      return res
        .status(400)
        .json({ message: "Ya existe un sector con esta dirección y barrio" });
    }

    // Crea el nuevo sector si no existe uno duplicado
    const newSector = new Sector({
      numero,
      nombre,
      direccion,
      barrio,
      estado: "ACTIVO",
    });

    const savedSector = await newSector.save();
    res.json(savedSector);
  } catch (error) {
    console.error("Error al guardar el sector:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const getSector = async (req, res) => {
  try {
    const sector = await Sector.findById(req.params.id);
    if (!sector) return res.status(404).json({ message: "Sector not found" });
    res.json(sector);
  } catch (error) {
    return res.status(404).json({ message: "Sector no Encontrado" });
  }
};

export const deleteSector = async (req, res) => {
  try {
    // Buscar el sector por su ID
    console.log("ID del sector a eliminar:", req.params.id);
    const sector = await Sector.findById(req.params.id);
    console.log("Sector obtenido:", sector);
    if (!sector) return res.status(404).json({ message: "Sector not found" });

    // Obtener la fecha actual
    const currentDate = new Date();
    console.log("Fecha actual:", currentDate);

    const eventos = await Eventos.find({ sector: sector.nombre });

    const eventosPendientes = eventos.some(
      (evento) => new Date(evento.fecha) >= new Date()
    );
    console.log("Eventos próximos:", eventosPendientes);
    // Si el sector está activo y no tiene eventos próximos, se cambia el estado a inactivo
    if (sector.estado === "ACTIVO") {
      if (!eventosPendientes) {
        const updateData = {
          estado: "INACTIVO",
        };
        await Sector.findByIdAndUpdate(sector._id, updateData, {
          new: true,
        });
      } else {
        // Hay eventos próximos, no se puede cambiar el estado
        return res.status(400).json({
          message:
            "No se puede cambiar el estado de un sector con eventos próximos a suceder",
        });
      }
    }

    // Si el sector está inactivo, lo cambiamos a activo
    if (sector.estado === "INACTIVO") {
      const updateData = {
        estado: "ACTIVO",
      };
      await Sector.findByIdAndUpdate(sector._id, updateData, {
        new: true,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error al procesar la solicitud" });
  }
};

export const updateSector = async (req, res) => {
  try {
    const sector = await Sector.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!sector) return res.status(404).json({ message: "Sector not found" });
    res.json(sector);
  } catch (error) {
    return res.status(404).json({ message: "Sector no Encontrado" });
  }
};

export const getEventosSector = async (req, res) => {
  try {
    const eventos = await Eventos.find({ sector: req.params.id });
    res.json(eventos);
  } catch (error) {
    return res.status(404).json({ message: "Eventos no Encontrados" });
  }
};
