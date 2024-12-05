import mongoose from "mongoose";

const entregaSchema = new mongoose.Schema(
  {
    estudianteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Estudiante",
      required: true,
    },
    documento: { type: String, required: true }, // URL del documento
    calificacion: {
      type: String,
    },
    fechaEntrega: { type: Date, required: true },
    horaEntrega: { type: String, required: true }, // Formato HH:mm
  },
);

const actividadSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    cursoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Curso",
      required: true,
    },
    entregas: [entregaSchema],
  },
  {
    timestamps: true,
  }
);

// Con esto interactuamos con la base de datos
export default mongoose.model("Actividad", actividadSchema);
