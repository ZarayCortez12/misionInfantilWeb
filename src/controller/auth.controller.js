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
      image: userFound.image.url,
      identificacion: userFound.identificacion,
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

    const token = await createAccessToken({ id: user._id });
    res.cookie("token", token);

    const link = `http://localhost:5173/reset-password/${user.identificacion}/${token}`;

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

export const resetPassword = async (req, res) => {};

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
  } catch (error) {
    return res.status(404).json({ message: "Usuario no Encontrado" });
  }
};
