import iniciardb from "./modelos_db/conexion_db.js"
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