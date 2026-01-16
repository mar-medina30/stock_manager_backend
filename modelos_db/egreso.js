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