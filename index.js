import dotenv from 'dotenv'
import iniciardb from "./modelos_db/conexion_db.js"
import express from 'express'
import { validarToken } from "./middleware/validarToken.js"

dotenv.config()

import productoRoute from "./routes/productos.js"
import egresoRoute from "./routes/egreso.js"
import categoriaRoute from "./routes/categoria.js"
import ingresoRoute from "./routes/ingresos.js"
import usuarioRoute from "./routes/usuarios.js"

const conexion = await iniciardb()
const app = express()
const port = process.env.PORT || 3000
app.use(express.json())
app.use("/usuario", usuarioRoute)
app.use("/producto", validarToken, productoRoute)
app.use("/egreso", validarToken, egresoRoute)
app.use("/categoria", validarToken, categoriaRoute)
app.use("/ingreso", validarToken, ingresoRoute)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})