import iniciardb from "./modelos_db/conexion_db.js"
import * as categoriadb from "./modelos_db/categoria.js"
import * as productodb from "./modelos_db/productos.js"
import * as ingresodb from "./modelos_db/ingreso.js"
import * as egresodb from "./modelos_db/egreso.js"
import express from 'express'

const conexion = await iniciardb()
const app = express()
const port = 3000
app.use(express.json());

app.get('/productoPorCategoria', async (req, res) => {
    const categoria = req.query.categoria;
    const productos = await productodb.traerProductoPorCategoria(conexion, categoria)
    res.send(productos)
})

app.get('/productoPorId', async (req, res) => {
    const id = req.query.id
    const [producto] = await productodb.traerProductoPorID(conexion, id)
    res.send(producto)
})

app.get('/rangoDeVencimiento', async (req, res) => {
    const { fecha_inicio, fecha_fin } = req.query
    const producto = await ingresodb.rangoVencimientos(conexion, fecha_inicio, fecha_fin)
    res.send(producto)
})

app.delete('/eliminarProducto', async (req, res) => {
    const { id } = req.query
    const producto = await productodb.eliminarProducto(conexion, id)
    res.send(producto)
})

app.get('/stockPorCategoria', async (req, res) => {
    const stock = await ingresodb.totalDeProductosPorCategoria(conexion)
    res.send(stock)
})

app.get('/calcularGanancia', async (req, res) => {
    const { fecha_inicio, fecha_fin } = req.query
    const ganancia = await egresodb.calcularGanancia(conexion, fecha_inicio, fecha_fin)
    res.send(ganancia)
})

app.post('/crearCategoria', async (req, res) => {
    console.log(req.body)
    const { nombre } = req.body
    const categoria = await categoriadb.crearCategoria(conexion, nombre)
    res.json({ nombre, id: categoria.insertId })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

