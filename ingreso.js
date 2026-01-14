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

// FUNCIÓN PARA CREAR UN INGRESO

