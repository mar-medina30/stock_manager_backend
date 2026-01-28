import Joi from 'joi'
import { precioValidacion, fechaSchema } from './general.js'

export const ingresoSchema = Joi.object({
    producto_id: Joi.number()
        .integer()
        .min(1)
        .required(),

    fecha_ingreso: Joi.date()
        .iso()
        .required(),

    cantidad: Joi.number()
        .integer()
        .min(1)
        .required(),

    lote: Joi.string()
        .min(4)
        .max(10)
        .required(),

    vencimiento: Joi.date()
        .iso()
        .required(),

    precio_costo: precioValidacion,
    precio_venta: precioValidacion
})

export const rangoVencimientosSchema = Joi.object({
    fecha_inicio: Joi.date()
        .iso()
        .required(),

    fecha_fin: Joi.date()
        .iso()
        .greater(Joi.ref('fecha_inicio'))
        .required()
})

export const precioProductoSchema = Joi.object({
    ids: Joi.array()
        .items(Joi.number().integer().min(1))
        .min(1)
        .required()
        .messages({
            'array.base': 'ids debe ser un array',
            'array.min': 'Debe proporcionar al menos un id'
        }),

    porcentaje: Joi.number()
        .required()
        .messages({
            'number.base': 'El porcentaje debe ser un número',
            'any.required': 'El porcentaje es obligatorio'
        })
})

export const modificarIngresoSchema = Joi.object({
    id: Joi.number()
        .integer()
        .min(1)
        .required(),

    producto_id: Joi.number()
        .integer()
        .min(1),

    cantidad: Joi.number()
        .integer()
        .min(1),

    fecha_ingreso: Joi.date()
        .iso()
})
    .or('producto_id', 'cantidad', 'fecha_ingreso')
    .messages({
        'object.missing': 'Debes ingresar al menos un campo para modificar (producto_id, cantidad o fecha_ingreso).'
    })

export const stockPorCategoriaSchema = Joi.object({})
    .unknown(false)
    .messages({
        'object.unknown': 'Este endpoint no acepta parámetros'
    })
