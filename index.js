import dotenv from 'dotenv'
import iniciardb from "./modelos_db/conexion_db.js"
import express from 'express'
import { validarToken } from "./middleware/validarToken.js"
import cors from 'cors'

dotenv.config()

import productoRoute from "./routes/productos.js"
import egresoRoute from "./routes/egreso.js"
import categoriaRoute from "./routes/categoria.js"
import ingresoRoute from "./routes/ingresos.js"
import usuarioRoute from "./routes/usuarios.js"
import rolRoute from "./routes/rol.js"

const app = express()
const port = process.env.PORT || 3000

app.use(cors({ origin: '*' }))
app.use(express.json())
app.use("/usuario", usuarioRoute)
app.use("/producto", validarToken, productoRoute)
app.use("/egreso", validarToken, egresoRoute)
app.use("/categoria", validarToken, categoriaRoute)
app.use("/ingreso", validarToken, ingresoRoute)
app.use("/rol", validarToken, rolRoute)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})