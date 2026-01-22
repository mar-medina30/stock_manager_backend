import Joi from 'joi'

export const productoSchema = Joi.object({
    nombre: Joi.string()
        .alphanum()
        .min(3)
        .max(50)
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
        .min(1)
        .required(),

    nombre: Joi.string()
        .alphanum()
        .min(3)
        .max(50),

    categoriaID: Joi.number()
        .integer()
        .min(1),

    activo: Joi.boolean()
})
.or('nombre', 'categoriaID', 'activo')
.messages({
    'object.missing': 'Debes ingresar al menos un campo para modificar (nombre, categoriaID o activo).'
})