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
    } catch (err) {
        console.log(err)
    }
}

// CALCULAR PRODUCTO MÀS VENDIDO ENTRE UN PERIODO DE FECHAS
export const calcularProductoMasVendidoEntreFechas = async (conexion, fecha_desde, fecha_hasta) => {
    try {
        const [result] = await conexion.query(
            `
            SELECT p.nombre as Producto, SUM(e.cantidad) as TotalVendido
            FROM egreso e
            JOIN producto as p ON e.producto_id = p.id
            WHERE e.fecha_egreso BETWEEN ? AND ?
            GROUP BY p.id, p.nombre
            ORDER BY TotalVendido DESC
            LIMIT 1
            `, [fecha_desde, fecha_hasta]
        )
        if (result.length === 0) {
            return { mensaje: "No se registraron ventas en el periodo seleccionado" };
        }
        return result[0];

    } catch (err) {
        console.error("Error en la consulta:", err);
        return { error: "Hubo un problema al consultar los datos" };
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

        // VERIFICO QUE EL LOTE EXISTA
        if (ingreso.length === 0) {
            throw new Error("No se encontró el lote especificado")
        }

        const stockActual = ingreso[0].cantidad

        // VALIDAR SI HAY SUFICIENTE STOCK
        if (stockActual < cantidad) {
            throw new Error(`Stock insuficiente. Solo quedan ${stockActual} unidades disponibles`)
        }

        // EXTRAIGO LOS PRECIOS CON INGRESO[0]
        const { precio_costo, precio_venta } = ingreso[0]
        // EXTRAIGO LA FECHA ACTUAL 
        const fecha_egreso = new Date()

        // AGREGO LOS DATOS DEL NUEVO EGRESO
        const [egreso] = await conexion.query(
            'INSERT INTO egreso (producto_id, fecha_egreso, lote, cantidad, precio_costo, precio_venta) VALUES (?, ?, ?, ?, ?, ?)',
            [producto_id, fecha_egreso, lote, cantidad, precio_costo, precio_venta]
        )

        await conexion.query(
            'UPDATE ingreso SET cantidad = cantidad - ? WHERE producto_id = ? AND lote = ?', [cantidad, producto_id, lote]
        )

        console.log("Egreso registrado con éxito")
        return egreso
    } catch (err) {
        console.error("Error en la función crearEgreso:", err.message)
        throw err
    }
}
// FUNCIÓN PARA MODIFICAR EGRESO
