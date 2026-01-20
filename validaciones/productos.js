import Joi from 'joi'

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

export const categoriaSchema = Joi.object({
    categoria_id: Joi.number()
    .integer()
    .min(1)
    .required()
})
