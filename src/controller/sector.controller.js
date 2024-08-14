import Sector from '../models/sector.model.js'

export const getSectores = async (req, res) => {
   try {
    const sectores = await Sector.find()
    res.json(sectores)
   } catch (error) {
    return res.status(404).json({ message: "Sector no Encontrado"})
   }
}

export const createSector = async (req, res) => {
    try {
        const { numero, nombre, direccion, barrio } = req.body;

        // Verifica si ya existe un sector con la misma dirección y barrio
        const existingSector = await Sector.findOne({ direccion, barrio });

        if (existingSector) {
            return res.status(400).json({ message: 'Ya existe un sector con esta dirección y barrio' });
        }

        // Crea el nuevo sector si no existe uno duplicado
        const newSector = new Sector({
            numero,
            nombre,
            direccion,
            barrio
        });

        const savedSector = await newSector.save();
        res.json(savedSector);

    } catch (error) {
        console.error('Error al guardar el sector:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

export const getSector = async (req, res) => {
    
    try {
        const sector  =  await Sector.findById(req.params.id)
        if (!sector) return res.status(404).json({ message: "Sector not found"});
        res.json(sector)
    } catch (error) {
        return res.status(404).json({ message: "Sector no Encontrado"})
    }
}

export const deleteSector = async (req, res) => {
    try {
        const sector  =  await Sector.findByIdAndDelete(req.params.id)
        if (!sector) return res.status(404).json({ message: "Sector not found"});
        return res.sendStatus(204) 
    } catch (error) {
        return res.status(404).json({ message: "Sector no Encontrado"})
    }
}

export const updateSector = async (req, res) => {
    try {
        const sector  =  await Sector.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })
        if (!sector) return res.status(404).json({ message: "Sector not found"});
        res.json(sector)
    } catch (error) {
        return res.status(404).json({ message: "Sector no Encontrado"})
    }
}
