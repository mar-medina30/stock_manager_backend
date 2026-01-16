export const traerTodosIngresos = async (conexion) => {
    try {
        const [results] = await conexion.query(
            "SELECT id, producto_id, DATE_FORMAT(fecha_ingreso, '%Y-%m-%d') AS fecha_ingreso, cantidad, lote, DATE_FORMAT(vencimiento, '%Y-%m-%d') AS vencimiento, precio_costo, precio_venta FROM ingreso"
        )
        console.log(results)
    } catch(err) {
        console.log(err)
    }
}

// FUNCIÓN PARA TRAER LOS PRODUCTOS QUE SE VENCEN A PARTIR DE TAL FECHA
export const rangoVencimientos = async (conexion, fechaInicio, fechaFin) => {
    try {
        const [results] = await conexion.query (
        `SELECT p.nombre AS producto, DATE_FORMAT(vencimiento, '%y-%m-%d') AS vencimiento
        FROM ingreso AS i
        JOIN producto AS p ON i.producto_id = p.id
        WHERE vencimiento BETWEEN ? AND ?
        `, [fechaInicio, fechaFin]
        )
        console.log(results)
        return results
    } catch (err) {
        console.log(err)
    }
}

// FUNCIÓN PARA CREAR UN INGRESO

