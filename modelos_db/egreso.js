import conexion_db from "./conexion_db.js"

// CALCULAR GANANCIA ENTRE 2 FECHAS
export const calcularGanancia = async (conexion, fecha_inicio, fecha_fin) => {
    try {
        const [result] = await conexion.query(
            `
            SELECT DATE_FORMAT(fecha_egreso, '%y-%m-%d') AS fecha_egreso, SUM(precio_venta - precio_costo) AS ganancia_total
            FROM egreso
            WHERE fecha_egreso BETWEEN ? AND ?
            GROUP BY fecha_egreso
            `, [fecha_inicio, fecha_fin]
        )
        console.log(result)
        return result
    } catch(err) {
        console.log(err)
    }
}

// FUNCIÓN PARA CREAR EGRESO
export const crearEgreso = async (conexion, producto_id, lote, cantidad) => {
    try {
        // OBTENGO PRECIO_COSTO Y PRECIO_VENTA DE LA TABLA INGRESO
        const [ingreso] = await conexion.query(
            'SELECT precio_costo, precio_venta FROM ingreso WHERE producto_id = ? AND lote = ? LIMIT 1',
            [producto_id, lote]
        )

        // EXTRAIGO LOS PRECIOS CON INGRESO[0]
        const { precio_costo, precio_venta } = ingreso[0]
        // EXTRAIGO LA FECHA ACTUAL 
        const fecha_egreso = new Date()

        // AGREGO LOS DATOS DEL NUEVO EGRESO
        const [egreso] = await conexion.query(
            'INSERT INTO egreso (producto_id, fecha_egreso, lote, cantidad, precio_costo, precio_venta) VALUES (?, ?, ?, ?, ?, ?)',
            [producto_id, fecha_egreso, lote, cantidad, precio_costo, precio_venta]
        )

        console.log("Egreso registrado con éxito")
        return egreso
    } catch (err) {
        console.error("Error en la función crearEgreso:", err.message)
        throw err
    }
}
// FUNCIÓN PARA MODIFICAR EGRESO
