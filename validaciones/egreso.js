import Joi from 'joi'
import { precioValidacion } from './general.js'
import { fechaSchema } from './general.js'

export const egresoSchema = Joi.object({
    producto_id: Joi.number()
        .required()
        .integer()
        .min(1),

    lote: Joi.string()
        .min(4)
        .max(10)
        .required(),
    
    cantidad: Joi.number()
        .integer()
        .min(1)
        .required(),

    fecha_egreso: fechaSchema,
    precio_costo: precioValidacion,
    precio_venta: precioValidacion
})

export const egresoLoteCantidadProductoIdSchema = egresoSchema.fork(['fecha_egreso', 'precio_costo', 'precio_venta'], (schema) => schema.forbidden())
