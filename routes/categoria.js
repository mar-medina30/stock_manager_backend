import express from 'express'
import * as categoriadb from "../modelos_db/categoria.js"
import iniciardb from "../modelos_db/conexion_db.js"
const conexion = await iniciardb()
const router = express.Router()

// middleware that is specific to this router
const timeLog = (req, res, next) => {
    console.log('Time: ', Date.now())
    next()
}
//router.use(timeLog)

router.post('/crearCategoria', async (req, res) => {
    const { nombre } = req.body
    const categoria = await categoriadb.crearCategoria(conexion, nombre)
    res.json({ mensaje: "Categoría creada correctamente", nombre, id: categoria.insertId })
})

router.patch('/modificarCategoria/:id', async (req, res) => {
    console.log(req.params)
    const { nombre } = req.body
    const { id } = req.params
    const resultado = await categoriadb.modificarCategoria(conexion, Number(id), nombre)
    res.json({ id, ...req.body })
})

export default router