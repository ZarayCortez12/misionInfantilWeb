import Evento from '../models/eventos.model.js'

export const getEventos = async (req, res) => {
   try {
    const eventos = await Evento.find()
    res.json(eventos)
   } catch (error) {
    return res.status(404).json({ message: "Eventos no Encontrado"})
   }
}

export const createEvento = async (req, res) => {
    try {
        const { nombre_curso, sector, docentes, fecha, hora } = req.body;

        // Crear un nuevo evento con los datos del request
        const newEvento = new Evento({
            nombre_curso,
            sector,
            docentes,
            fecha,
            hora,
        });

        // Guardar el nuevo evento en la base de datos
        const savedEvento = await newEvento.save();
        res.json(savedEvento);
    } catch (error) {
        // Manejo de errores, por ejemplo, si hay datos duplicados
        console.error("Error al crear el evento:", error);
        res.status(500).json({ message: "No se permiten datos duplicados" });
    }
};

export const getEvento = async (req, res) => {
    try {
        const evento = await Evento.findById(req.params.id);
        if (!evento) return res.status(404).json({ message: "Evento no encontrado" });
        res.json(evento);
    } catch (error) {
        return res.status(500).json({ message: "Error al buscar el evento" });
    }
};

export const deleteEvento = async (req, res) => {
    try {
        const evento = await Evento.findByIdAndDelete(req.params.id);
        if (!evento) return res.status(404).json({ message: "Evento no encontrado" });
        return res.sendStatus(204); // Enviar un estado 204 No Content si la eliminación fue exitosa
    } catch (error) {
        return res.status(500).json({ message: "Error al eliminar el evento" });
    }
};

export const updateEvento= async (req, res) => {
    try {
        const evento  =  await Evento.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })
        if (!evento) return res.status(404).json({ message: "Evento not found"});
        res.json(evento)
    } catch (error) {
        return res.status(404).json({ message: "Evento no Encontrado"})
    }
}