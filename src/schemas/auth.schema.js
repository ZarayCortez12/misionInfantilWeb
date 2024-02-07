import { z } from "zod"

export const registerDocenteSchema = z.object({
    identificacion: z
    .string({
        require_error: "Identificacion is required"
    })
    .min(7, {
        message: "Identificacion no puede tener menos carcteres de 7"
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
});

export const loginDocentesSchema = z.object({
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
});