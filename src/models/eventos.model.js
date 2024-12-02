import mongoose from "mongoose";

const eventoSchema = new mongoose.Schema({
  nombre_curso: {
    type: String,
    required: true,
    unique: true,
  },
  sector: {
    type: String,
    required: false, // Ajusta según tus necesidades
  },
  asistentes: {
    type: [String],
    required: false, // Ajusta según tus necesidades
  },
  fecha: {
    type: Date,
    required: true,
  },
  hora: {
    type: String,
    required: true,
  },
  curso: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Curso', // Asegúrate de que exista un modelo 'Curso'
    required: false, // Solo es necesario para eventos de curso
  },
  estado: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
});

export default mongoose.model('Evento', eventoSchema);
