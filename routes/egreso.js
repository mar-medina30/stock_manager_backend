import express from 'express'
import * as egresodb from "../modelos_db/egreso.js"
import iniciardb from "../modelos_db/conexion_db.js"
import { fechaSchema, paginadoSchema } from '../validaciones/general.js'
import { validador } from '../middleware/validador.js'
import { egresoLoteCantidadProductoIdSchema } from '../validaciones/egreso.js'
import validadorRol from '../middleware/validadorRol.js'
const conexion = await iniciardb()
const router = express.Router()

// middleware that is specific to this router
const timeLog = (req, res, next) => {
    console.log('Time: ', Date.now())
    next()
}
//router.use(timeLog)

// listado paginado dinámico de egresos
router.get('/', validadorRol('admin', 'cliente', 'empleado'), validador(paginadoSchema, 'query'), async (req, res) => {
    try {
        const page = Number(req.query.page || 1)
        const limit = Number(req.query.limit || 15)
        const resultado = await egresodb.traerTodosEgresos(conexion, page, limit)
        res.json(resultado)
    } catch (err) {
        res.status(400).send(err.details)
    }
})

router.get('/calcularGanancia', validadorRol('admin', 'cliente', 'empleado'), validador(fechaSchema, 'query'), async (req, res) => {
    try {
        const { fechaDesde, fechaHasta } = req.query
        const ganancia = await egresodb.calcularGanancia(conexion, fechaDesde, fechaHasta)
        res.send(ganancia)
    } catch(err) {
        res.status(400).send(err.details)
    }
})

router.post('/crearEgreso', validadorRol('admin', 'cliente', 'empleado'), validador(egresoLoteCantidadProductoIdSchema), async (req, res) => {
    try {
        const { producto_id, lote, cantidad } = req.body
        const resultado = await egresodb.crearEgreso(conexion, producto_id, lote, cantidad)
        res.json({ id: resultado.insertId, ...req.body })
    } catch(err) {
        res.status(400).send(err.details)
    }
})

router.get('/calcularCierreDeCaja', validadorRol('admin', 'cliente', 'empleado'), validador(fechaSchema, 'query'), async (req, res) => {
    try {
        const { fechaDesde, fechaHasta } = req.query
        const cierreDeCaja = await egresodb.calcularCierreDeCaja(conexion, fechaDesde, fechaHasta)
        res.send(cierreDeCaja)
    } catch(err) {
        res.status(400).send(err.details)
    }
})

router.get('/calcularProductoMasVendidoEntreFechas', validadorRol('admin', 'cliente', 'empleado'), validador(fechaSchema, 'query'), async (req, res) => {
    try {
        const { fechaDesde, fechaHasta } = req.query
        const productoMasVendido = await egresodb.calcularProductoMasVendidoEntreFechas(conexion, fechaDesde, fechaHasta)
        res.send(productoMasVendido)
    } catch(err) {
        res.status(400).send(err.details)
    }
})

export default router