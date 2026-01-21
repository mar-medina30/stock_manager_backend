import iniciardb from "./modelos_db/conexion_db.js"
import * as categoriadb from "./modelos_db/categoria.js"
import * as productodb from "./modelos_db/productos.js"
import * as ingresodb from "./modelos_db/ingreso.js"
import * as egresodb from "./modelos_db/egreso.js"
import express from 'express'

import productoRoute from "./routes/productos.js"
import egresoRoute from "./routes/egreso.js"

const conexion = await iniciardb()
const app = express()
const port = 3000
app.use(express.json())
app.use("/producto", productoRoute)
app.use("/egreso", egresoRoute)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})