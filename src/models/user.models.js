import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    identificacion:{
        type: String,
        require: true,
    },
    nombre: {
        type: String, 
        require: true,
    },
    apellido: {
        type: String, 
        require: true,
    },
    correo: {
        type: String, 
        require: true,
    },
    clave: {
        type: String,
        require: true, 
    },
    estado: {
        type: String, 
        require: true, 
    },
    rol: {
        type: String,
        require: true, 
    },
    username: {
        type: String,
        require: true, 
        unique: true,
    },
    telefono: {
        type: String,
        require: true,
    },
    image: {
        url: String,
        public_id: String
    }
}, {
    timestamps: true
})

//Con esto interactuamos con la base de datos
export default mongoose.model('Usuario', userSchema)