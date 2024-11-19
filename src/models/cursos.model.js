import mongoose from "mongoose";

// Define el esquema para los documentos
const documentoSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true, // La URL es obligatoria
    },
    nombre: {
        type: String,
        required: true, // El nombre del archivo es obligatorio
    },
    public_id: {
        type: String,
        required: true, // Asegúrate de que el public_id sea obligatorio si es necesario
    },
});

// Define el esquema principal del curso
const cursoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        unique: true,
    },
    descripcion: {
        type: String,
        required: true,
    },
    docentes: {
        type: [String], // Array de strings para docentes
        required: true,
    },
    inscritos: {
        type: [String], // Array de strings para inscritos
        required: true,
    },
    documentos: {
        type: [documentoSchema], // Array de subdocumentos para los documentos
        required: true,
    },
    estado: {
        type: String,
        required: true,
    },
}, {
    timestamps: true, // Agrega timestamps automáticos para createdAt y updatedAt
});

// Con esto interactuamos con la base de datos
export default mongoose.model('Curso', cursoSchema);
