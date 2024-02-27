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

        const newSector = new Sector({
            numero, 
            nombre,
            direccion,
            barrio,
        });

        const saveSector = await newSector.save();
        res.json(saveSector);
    } catch (error) {
        res.status(500).json({ message: "No se permiten datos duplicados"});
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
