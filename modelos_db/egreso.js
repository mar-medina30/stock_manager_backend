import conexion_db from "./conexion_db"

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
export const crearEgreso = async (conexion, productoId, lote, cantidad, precio_venta) => {
    try {
        const[result] = await conexion.query(
            `
            INSERT INTO egreso (productoId, lote, cantidad, precio_venta) VALUES (?, ?, ?, ?)
            `, [productoId, lote, cantidad, precio_venta]
        )
        console.log(result)
        return result
    } catch(err) {
        console.log(err)
    }
}

// FUNCIÓN PARA MODIFICAR EGRESO
