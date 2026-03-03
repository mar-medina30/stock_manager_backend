import express from 'express'
import * as productodb from "../modelos_db/productos.js"
import iniciardb from "../modelos_db/conexion_db.js"
import { productoSchema, productoOpcionales } from '../validaciones/productos.js'
import { idSchema, paginadoSchema } from '../validaciones/general.js'
import { validador } from '../middleware/validador.js'
import { validarToken } from '../middleware/validarToken.js'
import validadorRol from '../middleware/validadorRol.js'

const conexion = await iniciardb()
const router = express.Router()

// middleware that is specific to this router
const timeLog = (req, res, next) => {
    console.log('Time: ', Date.now())
    next()
}
//router.use(timeLog)

router.post('/crearProducto', validadorRol('admin', 'cliente', 'empleado'), validador(productoSchema), async (req, res) => {
    try {
        //await productoSchema.validateAsync(req.body)
        console.log(req.body)
        const { nombre, categoriaID, activo } = req.body
        const producto = await productodb.crearProducto(conexion, nombre, categoriaID, activo)
        console.log(producto)
        res.json({ ...req.body, id: producto.insertId })
    } catch (err) {
        res.status(400).send(err.details)
    }
})

router.get('/productoPorCategoria', validadorRol('admin', 'cliente', 'empleado'), validador(idSchema, 'query'), async (req, res) => {
    try {
        //await categoriaSchema.validateAsync(req.query)
        const id = req.query.id
        const productos = await productodb.traerProductoPorCategoria(conexion, id)
        res.send(productos)
    } catch (err) {
        res.status(400).send(err.details)
    }
})

// listado paginado dinámico
router.get('/', validadorRol('admin', 'cliente', 'empleado'), validador(paginadoSchema, 'query'), async (req, res) => {
    try {
        const page = Number(req.query.page || 1)
        const limit = Number(req.query.limit || 15)
        const resultado = await productodb.traerTodosProductos(conexion, page, limit)
        res.json(resultado)
    } catch (err) {
        res.status(400).send(err.details)
    }
})

router.get('/productoPorId', validadorRol('admin', 'cliente', 'empleado'), validador(idSchema, 'query'), async (req, res) => {
    try {
        //await idSchema.validateAsync(req.query)
        const id = req.query.id
        const [producto] = await productodb.traerProductoPorID(conexion, id)
        res.send(producto)
    } catch (err) {
        res.status(400).send(err.details)
    }
})

router.delete('/eliminarProducto', validadorRol('admin', 'cliente'), validador(idSchema, 'query'), async (req, res) => {
    try {
        //await idSchema.validateAsync(req.query)
        const { id } = req.query
        const producto = await productodb.eliminarProducto(conexion, id)
        res.send(producto)
    } catch (err) {
        res.status(400).send(err.details)
    }
})

router.post('/modificarProducto', validadorRol('admin', 'cliente'), validador(productoOpcionales), async (req, res) => {
    //await productoConId.validateAsync(req.body)
    const { id, nombre, categoriaID, activo } = req.body
    const resultado = await productodb.modificarProducto(conexion, id, nombre, categoriaID, activo)
    res.json({ id: resultado.insertId, ...req.body })
})

export default router
