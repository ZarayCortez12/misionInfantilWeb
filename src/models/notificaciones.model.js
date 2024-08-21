import mongoose from "mongoose";

const notificacionesSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      require: true,
    },
    mensaje: {
      type: String,
      require: true,
    },
    estado: {
      type: String,
      require: true,
    },
    id_usuario: {
      type: [String],
      ref: "Usuario",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//Con esto interactuamos con la base de datos
export default mongoose.model("Notificaciones", notificacionesSchema);
