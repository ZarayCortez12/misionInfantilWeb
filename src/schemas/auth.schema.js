import { z } from "zod"

export const registerDocenteSchema = z.object({
    identificacion: z
    .string({
        require_error: "Identificación es requerida"
    }),
    nombre: z.string({
        required_error: "Nombre es requerido"
    }),
    apellido: z.string({
        required_error: "Apellido es requerido"
    }),
    correo: z
    .string({
        require_error: "Correo es requerido"
    })
    .email({
        message: "Correo Invalido"
    }),
    clave: z.string({
        required_error: "Contraseña es requerido"
    }),
    telefono: z.string({
        required_error: "Telefono es requerido"
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