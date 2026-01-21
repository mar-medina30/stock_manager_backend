import express from 'express'
import * as egresodb from "../modelos_db/egreso.js"
import iniciardb from "../modelos_db/conexion_db.js"
import { fechaScheme } from '../validaciones/general.js'
import { validador } from '../middleware/validador.js'
import { egresoSheme } from '../validaciones/egreso.js'
const conexion = await iniciardb()
const router = express.Router()

// middleware that is specific to this router
const timeLog = (req, res, next) => {
    console.log('Time: ', Date.now())
    next()
}
//router.use(timeLog)

router.get('/calcularGanancia', validador(fechaScheme, 'query'), async (req, res) => {
    try {
        const { fechaDesde, fechaHasta } = req.query
        const ganancia = await egresodb.calcularGanancia(conexion, fechaDesde, fechaHasta)
        res.send(ganancia)
    } catch(err) {
        res.status(400).send(err.details)
    }
})

router.post('/crearEgreso', validador(egresoSheme), async (req, res) => {
    try {
        const { producto_id, lote, cantidad } = req.body
        const resultado = await egresodb.crearEgreso(conexion, producto_id, lote, cantidad)
        res.json({ id: resultado.insertId, ...req.body })
    } catch(err) {
        res.status(400).send(err.details)
    }
})

router.get('/calcularCierreDeCaja', async (req, res) => {
    const { fecha_inicio, fecha_fin } = req.query
    const cierreDeCaja = await egresodb.calcularCierreDeCaja(conexion, fecha_inicio, fecha_fin)
    res.send(cierreDeCaja)
})

router.post('/crearEgreso', async (req, res) => {
    const { producto_id, lote, cantidad } = req.body
    const resultado = await egresodb.crearEgreso(conexion, producto_id, lote, cantidad)
    res.json({ id: resultado.insertId, ...req.body })
})

router.get('/calcularProductoMasVendidoEntreFechas', validador(fechaScheme, 'query'), async (req, res) => {
    try {
        const { fechaDesde, fechaHasta } = req.query
        const productoMasVendido = await egresodb.calcularProductoMasVendidoEntreFechas(conexion, fechaDesde, fechaHasta)
        res.send(productoMasVendido)
    } catch(err) {
        res.status(400).send(err.details)
    }
})

export default router