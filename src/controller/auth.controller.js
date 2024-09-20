import User from "../models/user.models.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";
import { uploadImage } from "../libs/cloudinary.js";
import brevo from "@getbrevo/brevo";
import { Resend } from "resend";
import sendEmails from "../sendEmail.js";
import path from "path";
import url from "url";
import fs from "fs-extra";
import handlebars from "handlebars";

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

export const login = async (req, res) => {
  const { identificacion, clave, option } = req.body;
  console.log(option);
  try {
    const userFound = await User.findOne({ identificacion });
    if (!userFound)
      return res
        .status(400)
        .json({ message: "Usuario no registrado en el sistema" });
    if (userFound.estado !== "ACTIVO")
      return res
        .status(400)
        .json({ message: "Usuario no activo en el sistema" });
    if (userFound.rol !== option)
      return res
        .status(400)
        .json({ message: `${option} no registrado en el sistema` });
    const isMath = await bcrypt.compare(clave, userFound.clave);
    if (!isMath)
      return res.status(400).json({ message: "Contraseña Incorrecta" });
    const token = await createAccessToken({ id: userFound._id });

    res.cookie("token", token);
    res.json({
      id: userFound._id,
      nombre: userFound.nombre,
      apellido: userFound.apellido,
      rol: userFound.rol,
      image: userFound.image,
      identificacion: userFound.identificacion,
      correo: userFound.correo,
      telefono: userFound.telefono,
      genero: userFound.genero,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: error.message });
  }
};

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const sendEmail = async (req, res) => {
  const email = req.body.correo;
  try {
    const user = await User.findOne({ correo: email });
    if (!user)
      return res
        .status(400)
        .json({ message: "Usuario no registrado en el sistema" });

    if (user.estado !== "ACTIVO")
      return res
        .status(400)
        .json({ message: "Usuario no activo en el sistema" });

    const token = jwt.sign({ id: user._id }, "jwt-secret-key", {
      expiresIn: "1h",
    });
    res.cookie("token", token);

    const link = `http://localhost:5173/reset-password/${user.identificacion}/${token}`;
    console.log("Link de restablecimiento de contraseña: ", link);

    const filePath = path.join(__dirname, "../../Plantilla_Correo.html");
    if (!fs.existsSync(filePath)) {
      console.error(
        "El archivo Plantilla_Correo.html no se encuentra en la ruta especificada."
      );
      return res
        .status(500)
        .json({ message: "Archivo de plantilla no encontrado." });
    }
    const source = fs.readFileSync(filePath, "utf8");
    const template = handlebars.compile(source);
    const replacements = {
      nombre: user.nombre,
      link: link,
    };

    const htmlToSend = template(replacements);
    const subject = "Restablecimiento de contraseña";

    // Pasar `htmlToSend` en lugar de `text`
    await sendEmails(user.correo, subject, htmlToSend);

    return res
      .status(200)
      .json({ successMessage: "Por favor, revisa tu correo electrónico" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  const { cedula, token } = req.params;
  const { contrasena } = req.body;
  console.log("Esta es la cedula: ", cedula);
  console.log("Este es el token: ", token);

  jwt.verify(token, "jwt-secret-key", async (err, decoded) => {
    if (err) {
      console.error("Error al verificar el token:", err);
      return res.status(401).json({ Status: "Error With Token" });
    } else {
      console.log("Token verificado correctamente:", decoded);
      try {
        console.log("Esta es la contraseña: ", typeof contrasena);
        if (typeof contrasena !== "string") {
          throw new Error("La contraseña debe ser una cadena de texto");
        }
        const hashedPassword = await bcrypt.hash(contrasena, 10);
        const user = await User.findOne({ identificacion: cedula });

        if (!user) {
          return res
            .status(400)
            .json({ message: "Usuario no registrado en el sistema" });
        }

        // Actualizar la contraseña del usuario
        user.clave = hashedPassword;

        // Guardar los cambios en la base de datos
        await user.save();

        return res
          .status(200)
          .json({ successMessage: "Contraseña actualizada correctamente" });
      } catch (error) {
        console.error("Error interno del servidor:", error);
        return res
          .status(500)
          .json({ Status: "Error interno del servidor", error: error.message });
      }
    }
  });
};

export const logout = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id);
  if (!userFound) return res.status(400).json({ message: "User Not Found" });
  return res.json({
    id: userFound._id,
    nombre: userFound.nombre,
    apellido: userFound.apellido,
    rol: userFound.rol,
  });
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;

  if (!token) return res.status(401).json({ message: "Sin autorizacion" });

  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(401).json({ message: "No autorizado" });

    const userFound = await User.findById(user.id);
    if (!userFound) return res.status(401).json({ message: "No autorizado" });

    return res.json({
      id: userFound._id,
      nombre: userFound.nombre,
      apellido: userFound.apellido,
      rol: userFound.rol,
    });
  });
};

export const getUsuarios = async (req, res) => {
  try {
    const usuarios = await User.find();
    res.json(usuarios);
    console.log("estos son los usuarios: ", usuarios);
  } catch (error) {
    return res.status(404).json({ message: "Usuario no Encontrado" });
  }
};

export const updateMe = async (req, res) => {
  try {
    const { nombre, apellido, telefono, genero, correo, identificacion } = req.body;
    const userId = req.params.id;

    let updatedFields = { nombre, apellido, telefono, genero, correo, identificacion };

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (!req.files) {
      // Actualiza sin cambiar la imagen
      await User.findByIdAndUpdate(userId, updatedFields);
    } else {
      // Elimina la imagen antigua si existe
      if (user.image && user.image.public_id) {
        await deleteImage(user.image.public_id);
      }

      // Sube la nueva imagen
      const result = await uploadImage(req.files.image.tempFilePath);
      await fs.remove(req.files.image.tempFilePath);
      const image = {
        url: result.secure_url,
        public_id: result.public_id,
      };

      updatedFields = { ...updatedFields, image };

      // Actualizar el usuario con la nueva imagen
      await User.findByIdAndUpdate(userId, updatedFields);
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updatedFields, {
      new: true,
    });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
