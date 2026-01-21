import Joi from 'joi'

export const idSchema = Joi.object({
    id: Joi.number()
    .integer()
    .min(1)
    .required()
})

export const fechaScheme = Joi.object({
    fechaDesde: Joi.date()
        .min('2020-01-01')
        .max('2030-01-01')
        //.iso()
        .required(),
    
    fechaHasta: Joi.date()
        .min('2020-01-01')
        .max('2030-01-01')
        //.iso()
        .greater(Joi.ref('fechaDesde'))
        .required()
})