import User from '../models/user.models.js'
import bcrypt from 'bcryptjs'
import { createAccessToken } from '../libs/jwt.js'

export const registerDocente =  async (req, res) => {
    const { identificacion, nombre, apellido, correo, contraseña } = req.body
    try {

        const passwordHash = await bcrypt.hash(contraseña, 10)
        const newUser = new User({
            identificacion,
            apellido,
            correo,
            contraseña: passwordHash,
            estado: "INACTIVO",
            nombre,
            rol: "DOCENTE",
            username: `${identificacion}`
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


export const loginDocente =  async (req, res) => {
    const { correo, contraseña } = req.body
    try {
        const userFound = await User.findOne({ correo });
        if(!userFound) return res.status(400).json({ message: "User Not Found"});
        const isMath = await bcrypt.compare(contraseña, userFound.contraseña) 
        if(!isMath) return res.status(400).json({ message: "Incorrect Password"});
        const token = await createAccessToken({ id: userFound._id });
        res.cookie('token', token);
        res.json({
            id: userFound._id,
            nombre: userFound.nombre,
            apellido: userFound.apellido
        });
    } catch (error) {
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
    })
}