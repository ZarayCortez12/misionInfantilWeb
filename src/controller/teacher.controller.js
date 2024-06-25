import User from '../models/user.models.js'
import bcrypt from 'bcryptjs'
import fs from 'fs-extra'
import { updateImage, uploadImage, deleteImage} from "../libs/cloudinary.estudiante.js";

export const createProfesor =  async (req, res) => {
    try {

        const { identificacion, nombre, apellido, telefono, correo} = req.body
        let image;
        console.log(req.files.image)
        if (req.files.image) {
          console.log("SI hay Imagen");
            const result = await uploadImage(req.files.image.tempFilePath)
            await fs.remove(req.files.image.tempFilePath)
            image = {
                url: result.secure_url,
                public_id: result.public_id
            }
            console.log("esta es la imagen", image);
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
            rol: "Docente",
            username: `${identificacion}`,
            image,
        });
        const userSave = await newUser.save();

        res.json(userSave);
    } catch (error) {
        res.status(500).json({ message: error.message });
    } 
}

export const getProfesor = async (req, res) => {
    try {
        const user  =  await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "Profesor  not found"});
        res.json(user)
    } catch (error) {
        return res.status(404).json({ message: "Profesor  no Encontrado"})
    }
}

export const getProfesores = async (req, res) => {
    try {
        const estudiantes = await User.find({ rol: 'DOCENTE' });
     res.json(estudiantes)
    } catch (error) {
     return res.status(404).json({ message: "Profesor  no Encontrado"})
    }
 }

export const deleteProfesor  = async (req, res) => {
    try {
        const userId = req.params.id;
        const updatedUser = await User.findByIdAndUpdate(
          userId,
          { estado: 'INACTIVO' },
          { new: true }
        );
    
        if (!updatedUser) {
          return res.status(404).json({ message: 'Profesor no encontrado' });
        }
        res.status(200).json({ message: 'Profesor desactivado correctamente', user: updatedUser });
      } catch (error) {
        res.status(500).json({ message: 'Error al desactivar el Profesor', error });
      }
}

export const updateProfesor = async (req, res) => {
    try {
      const { nombre, apellido, telefono , estado} = req.body;
      const userId = req.params.id;
  
      let updatedFields = { nombre, apellido, telefono, estado };
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
  
      if (req.files && req.files.image) {
        // Elimina la imagen antigua si existe
        if (user.image && user.image.public_id) {
          await deleteImage(user.image.public_id);
        }
  
        // Sube la nueva imagen
        const result = await updateImage(req.files.image.tempFilePath);
        await fs.remove(req.files.image.tempFilePath);
  
        updatedFields.image = {
          url: result.secure_url,
          public_id: result.public_id
        };
      }
  
      const updatedUser = await User.findByIdAndUpdate(userId, updatedFields, { new: true });
  
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
