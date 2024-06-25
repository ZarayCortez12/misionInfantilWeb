import mongoose from "mongoose";

const cursoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        unique: true,
    },
    docentes: {
        type: [String], // Define docentes como un array de strings
        required: true,
    },
    inscritos: {
        type: [String], // Define inscritos como un array de strings
        required: true,
    },
}, {
    timestamps: true
});

// Con esto interactuamos con la base de datos
export default mongoose.model('Curso', cursoSchema);
