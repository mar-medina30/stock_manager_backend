import express from 'express'
import * as egresodb from "../modelos_db/egreso.js"
import iniciardb from "../modelos_db/conexion_db.js"
const conexion = await iniciardb()
const router = express.Router()

// middleware that is specific to this router
const timeLog = (req, res, next) => {
    console.log('Time: ', Date.now())
    next()
}
//router.use(timeLog)

router.get('/calcularGanancia', async (req, res) => {
    const { fecha_inicio, fecha_fin } = req.query
    const ganancia = await egresodb.calcularGanancia(conexion, fecha_inicio, fecha_fin)
    res.send(ganancia)
})

router.get('/calcularCierreDeCaja', async (req, res) => {
    const { fecha_inicio, fecha_fin } = req.query
    console.log(egresodb.calcularGanancia)
    const ganancia = await egresodb.calcularCierreDeCaja(conexion, fecha_inicio, fecha_fin)
    res.send(ganancia)
})

router.post('/crearEgreso', async (req, res) => {
    const { producto_id, lote, cantidad } = req.body
    const resultado = await egresodb.crearEgreso(conexion, producto_id, lote, cantidad)
    res.json({ id: resultado.insertId, ...req.body })
})

router.get('/calcularProductoMasVendidoEntreFechas', async (req, res) => {
    const { fecha_desde, fecha_hasta } = req.query
    const productoMasVendido = await egresodb.calcularProductoMasVendidoEntreFechas(conexion, fecha_desde, fecha_hasta)
    res.send(productoMasVendido)
})

export default router