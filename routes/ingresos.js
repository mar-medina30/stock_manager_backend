import express from 'express'
import * as ingresodb from "../modelos_db/ingreso.js"
import iniciardb from "../modelos_db/conexion_db.js"
import { validador } from '../middleware/validador.js'
import { ingresoCrearSchema, rangoVencimientosSchema, precioProductoSchema, modificarIngresoSchema, stockPorCategoriaSchema } from '../validaciones/ingresos.js'
const conexion = await iniciardb()
const router = express.Router()

// middleware that is specific to this router
const timeLog = (req, res, next) => {
    console.log('Time: ', Date.now())
    next()
}
//router.use(timeLog)

router.post('/crearIngreso', validador(ingresoCrearSchema), async (req, res) => {
    console.log(req.body)
    const { producto_id, fecha_ingreso, cantidad, lote, vencimiento, precio_costo, precio_venta } = req.body
    const [ingreso] = await ingresodb.crearIngreso(conexion, producto_id, fecha_ingreso, cantidad, lote, vencimiento, precio_costo, precio_venta)
    res.json({ ...req.body, id: ingreso.insertId })
})

router.get('/rangoDeVencimiento', validador(rangoVencimientosSchema, 'query'), async (req, res) => {
    const { fecha_inicio, fecha_fin } = req.query
    const producto = await ingresodb.rangoVencimientos(conexion, fecha_inicio, fecha_fin)
    res.send(producto)
})

router.post('/subirPrecioProducto', validador(precioProductoSchema), async (req, res) => {
    const { ids, porcentaje } = req.body
    const resultado = await ingresodb.subirPrecioProducto(conexion, ids, porcentaje)
    res.json({ id: resultado.insertId, ...req.body })
})

router.post('/bajarPrecioProducto', validador(precioProductoSchema), async (req, res) => {
    const { ids, porcentaje } = req.body
    const resultado = await ingresodb.bajarPrecioProducto(conexion, ids, porcentaje)
    res.json({ id: resultado.insertId, ids_modificados: ids })
})

router.patch('/modificarIngreso', validador(modificarIngresoSchema), async (req, res) => {
    console.log(req.body)
    const { id, producto_id, cantidad, fecha_ingreso } = req.body
    const resultado = await ingresodb.modificarIngreso(conexion, id, producto_id, cantidad, fecha_ingreso)
    res.json({ id: resultado.insertId, ...req.body })
})

router.get('/stockPorCategoria', validador(stockPorCategoriaSchema, 'query'), async (req, res) => {
    const stock = await ingresodb.totalDeProductosPorCategoria(conexion)
    res.send(stock)
})

export default router