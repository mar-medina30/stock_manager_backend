import Joi from 'joi'
import { idSchema } from './general'

export const productoSchema = Joi.object({
    nombre: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    categoriaID: Joi.number()
        .integer()
        .min(1)
        .required(),

    activo: Joi.boolean()
        .required(),
})

export const productoOpcionales = Joi.object({
    id: Joi.number()
        .integer()
        .min(1),

    nombre: Joi.string()
    .alphanum()
    .min(3)
    .max(30),

    categoriaID: Joi.number()
        .integer()
        .min(1),

    activo: Joi.boolean()

})