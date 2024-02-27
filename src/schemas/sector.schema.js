import { z } from "zod"

export const createSectorSchema = z.object({
    numero: z.string({
        required_error: "Numero is required"
    }),
    nombre: z.string({
        required_error: "Nombre is required"
    }),
    direccion: z.string({
        required_error: "Nombre is required"
    }),
    barrio: z.string({
        required_error: "Nombre is required"
    }),
})