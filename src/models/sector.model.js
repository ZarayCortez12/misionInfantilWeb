import mongoose from "mongoose";

const sectorSchema = new mongoose.Schema({
    numero:{
        type: String,
        require: true,
        unique: true,
    },
    nombre:{
        type: String,
        require: true,
        unique: true,
    },
    direccion: {
        type: String, 
        require: true,
    },
    barrio: {
        type: String, 
        require: true,
    },
}, {
    timestamps: true
})

//Con esto interactuamos con la base de datos
export default mongoose.model('Sector', sectorSchema)