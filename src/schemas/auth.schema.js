import { z } from "zod"

export const registerDocenteSchema = z.object({
    identificacion: z
    .string({
        require_error: "Identificacion is required"
    }),
    nombre: z.string({
        required_error: "Nombre is required"
    }),
    apellido: z.string({
        required_error: "Apellido is required"
    }),
    correo: z
    .string({
        require_error: "Correo is required"
    })
    .email({
        message: "Invalid Correo"
    }),
    contraseña: z.string({
        required_error: "Contraseña is required"
    }),
    telefono: z.string({
        required_error: "Apellido is required"
    }),
});

export const loginSchema = z.object({
    correo: z
    .string({
        require_error: "Correo is required"
    }),
    clave: z.string({
        required_error: "Contraseña is required"
    }),
});