import Joi from 'joi'

export const idSchema = Joi.object({
    id: Joi.number()
    .integer()
    .min(1)
    .required()
})

export const fechaSchema = Joi.object({
    fechaDesde: Joi.date()
        .min('2020-01-01')
        .max('2030-01-01')
        .iso()
        .required(),
    
    fechaHasta: Joi.date()
        .min('2020-01-01')
        .max('2030-01-01')
        .iso()
        .greater(Joi.ref('fechaDesde'))
        .required()
})

export const precioValidacion = Joi.number()
    .positive()
    .precision(2)
    .required()
    .messages({
        'number.base': 'El precio debe ser un número',
        'number.positive': 'El precio debe ser mayor a 0',
        'any.required': 'Este campo es obligatorio'
})