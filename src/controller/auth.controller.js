import User from '../models/user.models.js'
import bcrypt from 'bcryptjs'
import { createAccessToken } from '../libs/jwt.js'
import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config.js'
import { uploadImage } from '../libs/cloudinary.js'
import fs from 'fs-extra'

export const registerDocente =  async (req, res) => {
    try {

        const { identificacion, nombre, apellido, telefono, correo, clave } = req.body

        let image;

        console.log(req.files.image)
        if (req.files.image) {
            const result = await uploadImage(req.files.image.tempFilePath)
            await fs.remove(req.files.image.tempFilePath)
            image = {
                url: result.secure_url,
                public_id: result.public_id
            }
        }
        const userFound = await User.findOne({correo})
        const userFound2 = await User.findOne({ identificacion })
        if (userFound2) return res.status(400).json(["Identificación ya registrada en el sistema"]);
        if (userFound) return res.status(400).json(["Usuario ya registrado en el sistema"]);
        const passwordHash = await bcrypt.hash(clave, 10)
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
            image
        });
        const userSave = await newUser.save();
        const token = await createAccessToken({ id: userSave._id });
        res.cookie('token', token);
        res.json({
            id: userSave._id,
            nombre: userSave.nombre,
            apellido: userSave.apellido
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    } 
}

export const login =  async (req, res) => {
    const { correo, clave, option} = req.body
    console.log(option)
    try {
        if (option !== "ESTUDIANTE"){
            // Verificar el formato del correo electrónico
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(correo)) {
                return res.status(400).json({ message: "Formato de correo electrónico no válido" });
            }
        }
        const userFound = await User.findOne({ correo });
        if(!userFound) return res.status(400).json({ message: "Usuario no registrado en el sistema"});
        if (userFound.rol !== option) return res.status(400).json({ message: `${option} no registrado en el sistema` });
        const isMath = await bcrypt.compare(clave, userFound.clave) 
        if(!isMath) return res.status(400).json({ message: "Contraseña Incorrecta"});
        const token = await createAccessToken({ id: userFound._id });
        
        res.cookie('token', token);
        res.json({
            id: userFound._id,
            nombre: userFound.nombre,
            apellido: userFound.apellido,
            rol: userFound.rol,
            image: userFound.image.url
        });
    } catch (error) {
        console.error("Error:", error); 
        res.status(500).json({ message: error.message });
    } 
}


export const logout = (req, res) => {
    res.cookie('token', "", {
        expires: new Date(0),
    });
    return res.sendStatus(200);
}


export const profile = async (req, res) => {
    
    const userFound = await User.findById(req.user.id)
    if (!userFound) return res.status(400).json({ message: "User Not Found"});
    return res.json({
        id: userFound._id,
        nombre: userFound.nombre,
        apellido: userFound.apellido,
        rol: userFound.rol,
    })
}

export const verifyToken = async (req, res) => {
    const {token} = req.cookies

    if (!token) return res.status(401).json({ message: "Sin autorizacion"});

    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
        if (err) return res.status(401).json({ message: "No autorizado"});
    
        const userFound = await User.findById(user.id)
        if (!userFound) return res.status(401).json({ message: "No autorizado"});
    
        return res.json({
            id: userFound._id,
            nombre: userFound.nombre,
            apellido: userFound.apellido,
            rol: userFound.rol,
        });
    });
}

export const getUsuarios = async (req, res) => {
    try {
        const usuarios = await User.find()
        res.json(usuarios)
    } catch (error) {
        return res.status(404).json({ message: "Usuario no Encontrado"})
    }
 };