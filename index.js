import iniciardb from "./modelos_db/conexion_db.js"
import * as categoriadb from "./modelos_db/categoria.js"
import * as productodb from "./modelos_db/productos.js"
import * as ingresodb from "./modelos_db/ingreso.js"
import * as egresodb from "./modelos_db/egreso.js"
import express from 'express'

import productoRoute from "./routes/productos.js"

const conexion = await iniciardb()
const app = express()
const port = 3000
app.use(express.json())
app.use("/producto", productoRoute)

app.post('/crearIngreso', async (req, res) => {
    console.log(req.body)
    const { producto_id, fecha_ingreso, cantidad, lote, vencimiento, precio_costo, precio_venta } = req.body
    const ingreso = await ingresodb.crearIngreso(conexion, producto_id, fecha_ingreso, cantidad, lote, vencimiento, precio_costo, precio_venta)
    res.json({ ...req.body, id: ingreso.insertId })
})

app.get('/rangoDeVencimiento', async (req, res) => {
    const { fecha_inicio, fecha_fin } = req.query
    const producto = await ingresodb.rangoVencimientos(conexion, fecha_inicio, fecha_fin)
    res.send(producto)
})

app.get('/calcularGanancia', async (req, res) => {
    const { fecha_inicio, fecha_fin } = req.query
    const ganancia = await egresodb.calcularGanancia(conexion, fecha_inicio, fecha_fin)
    res.send(ganancia)
})

app.post('/crearCategoria', async (req, res) => {
    const { nombre } = req.body
    const categoria = await categoriadb.crearCategoria(conexion, nombre)
    res.json({mensaje: "Categoría creada correctamente", nombre, id: categoria.insertId })
})

app.post('/crearEgreso', async (req, res) => {
    const { producto_id, lote, cantidad } = req.body
    const resultado = await egresodb.crearEgreso(conexion, producto_id, lote, cantidad)
    res.json({id: resultado.insertId, ...req.body})
})

app.post('/subirPrecioProducto', async (req, res) => {
    const {ids, porcentaje} = req.body
    const resultado = await ingresodb.subirPrecioProducto(conexion, ids, porcentaje)
    res.json({id:resultado.insertId, ...req.body})
})

app.post('/bajarPrecioProducto', async (req, res) => {
    const {ids, porcentaje} = req.body
    const resultado = await ingresodb.bajarPrecioProducto(conexion, ids, porcentaje)
    res.json({id:resultado.insertId, ids_modificados: ids})
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

