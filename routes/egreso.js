import express from 'express'
import * as egresodb from "../modelos_db/egreso.js"
import iniciardb from "../modelos_db/conexion_db.js"
import { fechaSchema } from '../validaciones/general.js'
import { validador } from '../middleware/validador.js'
import { egresoLoteCantidadProductoIdSchema } from '../validaciones/egreso.js'
const conexion = await iniciardb()
const router = express.Router()

// middleware that is specific to this router
const timeLog = (req, res, next) => {
    console.log('Time: ', Date.now())
    next()
}
//router.use(timeLog)

router.get('/calcularGanancia', validador(fechaSchema, 'query'), async (req, res) => {
    try {
        const { fechaDesde, fechaHasta } = req.query
        const ganancia = await egresodb.calcularGanancia(conexion, fechaDesde, fechaHasta)
        res.send(ganancia)
    } catch(err) {
        res.status(400).send(err.details)
    }
})

router.post('/crearEgreso', validador(egresoLoteCantidadProductoIdSchema), async (req, res) => {
    try {
        const { producto_id, lote, cantidad } = req.body
        const resultado = await egresodb.crearEgreso(conexion, producto_id, lote, cantidad)
        res.json({ id: resultado.insertId, ...req.body })
    } catch(err) {
        res.status(400).send(err.details)
    }
})

router.get('/calcularCierreDeCaja', validador(fechaSchema, 'query'), async (req, res) => {
    try {
        const { fechaDesde, fechaHasta } = req.query
        const cierreDeCaja = await egresodb.calcularCierreDeCaja(conexion, fechaDesde, fechaHasta)
        res.send(cierreDeCaja)
    } catch(err) {
        res.status(400).send(err.details)
    }
})

router.get('/calcularProductoMasVendidoEntreFechas', validador(fechaSchema, 'query'), async (req, res) => {
    try {
        const { fechaDesde, fechaHasta } = req.query
        const productoMasVendido = await egresodb.calcularProductoMasVendidoEntreFechas(conexion, fechaDesde, fechaHasta)
        res.send(productoMasVendido)
    } catch(err) {
        res.status(400).send(err.details)
    }
})

export default router