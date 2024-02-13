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
        trim: true,
        unique: true,
    },
    contraseña: {
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
}, {
    timestamps: true
})

//Con esto interactuamos con la base de datos, de modo que podamos hacer consultas
export default mongoose.model('Usuario', userSchema)
