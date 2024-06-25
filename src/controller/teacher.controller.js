import { uploadImage } from "../libs/cloudinary.js";
import User from "../models/user.models.js";

export const registerDocente = async (req, res) => {
  try {
    const { identificacion, nombre, apellido, telefono, correo, clave } =
      req.body;

    let image;

    console.log(req.files.image);
    if (req.files.image) {
      const result = await uploadImage(req.files.image.tempFilePath);
      await fs.remove(req.files.image.tempFilePath);
      image = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }
    const userFound = await User.findOne({ correo });
    const userFound2 = await User.findOne({ identificacion });
    if (userFound2)
      return res
        .status(400)
        .json(["Identificación ya registrada en el sistema"]);
    if (userFound)
      return res.status(400).json(["Usuario ya registrado en el sistema"]);
    const passwordHash = await bcrypt.hash(clave, 10);
    const newUser = new User({
      identificacion,
      apellido,
      correo,
      telefono,
      clave: passwordHash,
      estado: "INACTIVO",
      nombre,
      rol: "DOCENTE",
      username: `${identificacion}`,
      image,
    });
    const userSave = await newUser.save();
    const token = await createAccessToken({ id: userSave._id });
    res.cookie("token", token);
    res.json({
      id: userSave._id,
      nombre: userSave.nombre,
      apellido: userSave.apellido,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateDocente = async (req, res) => {
  try {
    const { identificacion, nombre, apellido, telefono, correo, clave } =
      req.body;

    let image;

    console.log(req.files.image);
    if (req.files.image) {
      const result = await uploadImage(req.files.image.tempFilePath);
      await fs.remove(req.files.image.tempFilePath);
      image = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }
    const userFound = await User.findOne({ correo });
    const userFound2 = await User.findOne({ identificacion });
    if (userFound2)
      return res
        .status(400)
        .json(["Identificación ya registrada en el sistema"]);
    if (userFound)
      return res.status(400).json(["Usuario ya registrado en el sistema"]);
    const passwordHash = await bcrypt.hash(clave, 10);
    const newUser = new User({
      identificacion,
      apellido,
      correo,
      telefono,
      clave: passwordHash,
      estado: "INACTIVO",
      nombre,
      rol: "DOCENTE",
      username: `${identificacion}`,
      image,
    });
    const userSave = await newUser.save();
    const token = await createAccessToken({ id: userSave._id });
    res.cookie("token", token);
    res.json({
      id: userSave._id,
      nombre: userSave.nombre,
      apellido: userSave.apellido,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDocentes = async (req, res) => {
    try {
      // Consulta usuarios que tengan el rol de 'DOCENTE'
      const docentes = await User.find({ rol: 'DOCENTE' });
  
      // Si no se encontraron usuarios con ese rol, retornar un mensaje de error
      if (!docentes || docentes.length === 0) {
        return res.status(404).json({ message: "No se encontraron usuarios con rol de DOCENTE" });
      }
      console.log(docentes.length);
      // Si se encontraron usuarios con ese rol, retornar la lista de usuarios
      res.json(docentes);
    } catch (error) {
      // Capturar cualquier error de la consulta
      console.error("Error al buscar usuarios con rol de DOCENTE:", error);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  };

export const getDocente= async (req, res) => {
  const { id } = req.params;

  try {
    const teacher = await User.findById(id);
    if (!teacher) {
      return res.status(404).json({ message: "No hay este docente" });
    }

    return res.status(200).json(teacher);
  } catch (error) {
    return res.status(404).json({ message: "No hay este docente" });
  }
};
