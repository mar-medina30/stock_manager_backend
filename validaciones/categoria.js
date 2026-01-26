import Joi from 'joi'
import { idSchema } from './general.js'

export const categoriaSchema = Joi.object({
    nombre: Joi.string()
        .alphanum()
        .min(3)
        .max(15)
        .required(),
})

export const categoriaIDSchema = categoriaSchema.concat(idSchema)