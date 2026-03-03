import express from 'express'
import * as categoriadb from "../modelos_db/categoria.js"
import iniciardb from "../modelos_db/conexion_db.js"
import { validador } from '../middleware/validador.js'
import validadorRol from '../middleware/validadorRol.js'
import { categoriaSchema } from '../validaciones/categoria.js'
import { idSchema, paginadoSchema } from '../validaciones/general.js'
const conexion = await iniciardb()
const router = express.Router()

// middleware that is specific to this router
const timeLog = (req, res, next) => {
    console.log('Time: ', Date.now())
    next()
}
//router.use(timeLog)

router.post('/crearCategoria', validadorRol('admin', 'cliente', 'empleado'), validador(categoriaSchema), async (req, res) => {
    const { nombre } = req.body
    const categoria = await categoriadb.crearCategoria(conexion, nombre)
    res.json({ mensaje: "Categoría creada correctamente", nombre, id: categoria.insertId })
})

router.patch('/modificarCategoria/:id', validadorRol('admin', 'cliente', 'empleado'), validador(categoriaSchema), validador(idSchema, "params"), async (req, res) => {
    console.log(req.params)
    const { nombre } = req.body
    const { id } = req.params
    const resultado = await categoriadb.modificarCategoria(conexion, Number(id), nombre)
    res.json({ id, ...req.body })
})

// listado paginado dinámico de categorías
router.get('/', validador(paginadoSchema, 'query'), async (req, res) => {
    try {
        const page = Number(req.query.page || 1)
        const limit = Number(req.query.limit || 15)
        const resultado = await categoriadb.traerTodasCategorias(conexion, page, limit)
        res.json(resultado)
    } catch (err) {
        res.status(400).send(err.details)
    }
})

export default router