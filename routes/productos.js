import express from 'express'
import * as productodb from "../modelos_db/productos.js"
import iniciardb from "../modelos_db/conexion_db.js"
const conexion = await iniciardb()
const router = express.Router()

// middleware that is specific to this router
const timeLog = (req, res, next) => {
  console.log('Time: ', Date.now())
  next()
}
//router.use(timeLog)

router.post('/crearProducto', async (req, res) => {
    console.log(req.body)
    const { nombre, categoriaID, activo } = req.body
    const producto = await productodb.crearProducto(conexion, nombre, categoriaID, activo)
    console.log(producto)
    res.json({ ...req.body, id: producto.insertId })
})

router.get('/productoPorCategoria', async (req, res) => {
    const categoria = req.query.categoria;
    const productos = await productodb.traerProductoPorCategoria(conexion, categoria)
    res.send(productos)
})

router.get('/productoPorId', async (req, res) => {
    const id = req.query.id
    const [producto] = await productodb.traerProductoPorID(conexion, id)
    res.send(producto)
})

router.delete('/eliminarProducto', async (req, res) => {
    const { id } = req.query
    const producto = await productodb.eliminarProducto(conexion, id)
    res.send(producto)
})

router.post('/modificarProducto', async (req, res) => {
    const { id, nombre, categoria_id, activo} = req.body
    const resultado = await productodb.modificarProducto(conexion, id, nombre, categoria_id, activo)
    res.json({id:resultado.insertId, ...req.body})
})

router.get('/stockPorCategoria', async (req, res) => {
    const stock = await ingresodb.totalDeProductosPorCategoria(conexion)
    res.send(stock)
})

export default router
