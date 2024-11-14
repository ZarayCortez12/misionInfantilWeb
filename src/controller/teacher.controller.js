import User from "../models/user.models.js";
import bcrypt from "bcryptjs";
import fs from "fs-extra";
import {
  updateImage,
  uploadImage,
  deleteImage,
} from "../libs/cloudinary.docente.js";
import sendEmails from "../sendEmail.js";
import path from "path";
import url from "url";
import handlebars from "handlebars";
import jwt from "jsonwebtoken";
import Curso from "../models/cursos.model.js";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createProfesor = async (req, res) => {
  try {
    const {
      identificacion,
      nombre,
      apellido,
      telefono,
      correo,
      genero,
      tipoIdentificacion,
    } = req.body;
    console.log(tipoIdentificacion);
    console.log(genero);
    let image;
    console.log(req.files.image);
    if (req.files.image) {
      console.log("SI hay Imagen");
      const result = await uploadImage(req.files.image.tempFilePath);
      await fs.remove(req.files.image.tempFilePath);
      image = {
        url: result.secure_url,
        public_id: result.public_id,
      };
      console.log("esta es la imagen", image);
    }
    const passwordHash = await bcrypt.hash("12345", 10);
    const newUser = new User({
      identificacion,
      apellido,
      correo,
      telefono,
      clave: passwordHash,
      estado: "ACTIVO",
      nombre,
      rol: "DOCENTE",
      image,
      genero: genero,
      username: `${identificacion}`,
      tipoIdentificacion: tipoIdentificacion,
    });
    console.log(newUser);
    const userSave = await newUser.save();
    const token = jwt.sign({ id: newUser._id }, "jwt-secret-key", {
      expiresIn: "1h",
    });
    res.cookie("token", token);

    const link = `http://localhost:5173/create-password/${newUser.identificacion}/${token}`;

    const filePath = path.join(
      __dirname,
      "../../Plantilla_Correo_Docente.html"
    );
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
      nombre: newUser.nombre,
      link: link,
    };

    const htmlToSend = template(replacements);
    const subject = "Crea tu contraseña";

    // Pasar `htmlToSend` en lugar de `text`
    await sendEmails(newUser.correo, subject, htmlToSend);

    console.log(userSave);

    res.json(userSave);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProfesor = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "Profesor  not found" });
    res.json(user);
  } catch (error) {
    return res.status(404).json({ message: "Profesor  no Encontrado" });
  }
};

export const getProfesores = async (req, res) => {
  try {
    const estudiantes = await User.find({ rol: "DOCENTE" });
    res.json(estudiantes);
  } catch (error) {
    return res.status(404).json({ message: "Profesor  no Encontrado" });
  }
};

export const deleteProfesor = async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { estado: "INACTIVO" },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Profesor no encontrado" });
    }
    res.status(200).json({
      message: "Profesor desactivado correctamente",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al desactivar el Profesor", error });
  }
};

export const reloadPorfesor = async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { estado: "ACTIVO" },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Profesor no encontrado" });
    }
    res.status(200).json({
      message: "Profesor desactivado correctamente",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al desactivar el Profesor", error });
  }
};

export const updateProfesor = async (req, res) => {
  try {
    const { nombre, apellido, telefono, genero, correo } = req.body;
    const userId = req.params.id;

    let updatedFields = { nombre, apellido, telefono, genero, correo };

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

export const createPassword = async (req, res) => {};

export const sendSMS = async (req, res) => {
  try {
    const client = twilio(
      process.env.TWILIO_SID,
      process.env.TWILIO_AUTH_TOKEN
    );
    const message = await client.messages.create({
      body: "Hola, este es un mensaje de spam, solo queremos avisarte que has sido registrado como docente en el sistema de Misiones Infantiles. Por favor revisa tu correo electronico para que puedas crear una contraseña de ingreso. Si tienes alguna duda, no dudes en contactarnos a nuestro correo electrónico: misionesinfantilesweb@gmail.com. Si no has recibido el correo, por favor revisa tu carpeta de spam. ¡Saludos!",
      from: process.env.PHONE_NUMBER,
      to: "+573134449879",
    });
    console.log(message);
  } catch (error) {
    console.error("Error al enviar el SMS:", error.message);
  }
};

export const updateMe = async (req, res) => {
  try {
    const { telefono, correo } = req.body;
    const userId = req.params.id;

    let updatedFields = { telefono, correo };

    const user = await User.findOne({ identificacion: userId });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (!req.files) {
      // Actualiza sin cambiar la imagen
      await User.findOneAndUpdate({ identificacion: userId }, updatedFields);
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
      await User.findOneAndUpdate({ identificacion: userId }, updatedFields);
    }

    const updatedUser = await User.findOneAndUpdate({ identificacion: userId }, updatedFields, {
      new: true,
    });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCursosDocente = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findOne({ identificacion: userId });
    const cursos = await Curso.find({ docentes: user._id });
    res.json(cursos);
  } catch (error) {
    return res.status(404).json({ message: "Usuario no Encontrado" });
  }
};

