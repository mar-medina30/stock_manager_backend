import Joi from 'joi'

export const usuarioCrearSchema = Joi.object({
    nombre: Joi.string()
        .min(3)
        .max(50)
        .required(),
    email: Joi.string()
        .email()
        .required(),
    password: Joi.string()
        .min(6)
        .required(),
    activo: Joi.boolean()
        .default(true)
})

export const usuarioLoginSchema = Joi.object({
    email: Joi.string()
        .email()
        .required(),
    password: Joi.string()
        .required()
})
