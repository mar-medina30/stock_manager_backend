import Joi from 'joi'

export const egresoSheme = Joi.object({
    id: Joi.number()
        .integer()
        .min(1)
        .required(),
    
    lote: Joi.string()
        .min(4)
        .max(10)
        .required(),
    
    cantidad: Joi.number()
        .integer()
        .min(1)
        .required()

})