import iniciardb from "./conexion_db.js"
import * as categoriadb from "./categoria.js"
import * as productodb from "./productos.js"
import * as ingresodb from "./ingreso.js"
import express from 'express'

const conexion = await iniciardb()
const app = express()
const port = 3000

console.log('iniciando')

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



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
