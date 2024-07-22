import mongoose from "mongoose";

const eventoSchema = new mongoose.Schema({
    nombre_curso: {
        type: String,
        required: true,
        unique: true,
    },
    sector: {
        type: String,
        required: true,
    },
    docentes: {
        type: [String],
        required: true,
    },
    fecha: {
        type: Date,
        required: true,
    },
    hora: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

// Con esto interactuamos con la base de datos
export default mongoose.model('Evento', eventoSchema);

