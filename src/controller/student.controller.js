import User from '../models/user.models.js'
import bcrypt from 'bcryptjs'
import fs from 'fs-extra'
import { updateImage, uploadImage, deleteImage} from "../libs/cloudinary.estudiante.js";

export const createStudent =  async (req, res) => {
    try {

        const { identificacion, nombre, apellido, telefono, correo} = req.body
        let image;
        if (req.files.image) {
            const result = await uploadImage(req.files.image.tempFilePath)
            await fs.remove(req.files.image.tempFilePath)
            image = {
                url: result.secure_url,
                public_id: result.public_id
            }
        }
        const passwordHash = await bcrypt.hash("12345", 10)
        const newUser = new User({
            identificacion,
            apellido,
            correo,
            telefono,
            clave: passwordHash,
            estado: "ACTIVO",
            nombre,
            rol: "ESTUDIANTE",
            username: `${identificacion}`,
            image,
        });
        const userSave = await newUser.save();

        res.json(userSave);
    } catch (error) {
        res.status(500).json({ message: error.message });
    } 
}

export const getStudent = async (req, res) => {
    try {
        const user  =  await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "Student not found"});
        res.json(user)
    } catch (error) {
        return res.status(404).json({ message: "Student no Encontrado"})
    }
}

export const getStudents = async (req, res) => {
    try {
        const estudiantes = await User.find({ rol: 'ESTUDIANTE' });
     res.json(estudiantes)
    } catch (error) {
     return res.status(404).json({ message: "Sector no Encontrado"})
    }
 }

export const deleteStudent = async (req, res) => {
    try {
        const userId = req.params.id;
        const updatedUser = await User.findByIdAndUpdate(
          userId,
          { estado: 'INACTIVO' },
          { new: true }
        );
    
        if (!updatedUser) {
          return res.status(404).json({ message: 'Estudiante no encontrado' });
        }
        res.status(200).json({ message: 'Estudiante desactivado correctamente', user: updatedUser });
      } catch (error) {
        res.status(500).json({ message: 'Error al desactivar el estudiante', error });
      }
}

export const updateStudent = async (req, res) => {
  try {
    const { nombre, apellido, telefono } = req.body;
    const userId = req.params.id;

    let updatedFields = { nombre, apellido, telefono };

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    if (!req.files) {
      // Actualiza sin cambiar la imagen
      await User.findByIdAndUpdate(userId, updatedFields);
    } else {
      console.log("Imagen recibida:", req.files);

      // Elimina la imagen antigua si existe
      if (user.image && user.image.public_id) {
        await deleteImage(user.image.public_id);
      }

      // Sube la nueva imagen
      const result = await uploadImage(req.files.image.tempFilePath)
            await fs.remove(req.files.image.tempFilePath)
      const image = {
        url: result.secure_url,
        public_id: result.public_id
      };

      // Mostrar la URL de la nueva imagen
      console.log("URL de la nueva imagen:", image.url);

      updatedFields = { ...updatedFields, image };

      // Actualizar el usuario con la nueva imagen
      await User.findByIdAndUpdate(userId, updatedFields);
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updatedFields, { new: true });

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



