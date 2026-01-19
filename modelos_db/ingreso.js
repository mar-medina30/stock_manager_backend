//FUNCION PARA CREAR UN INGRESO

// FUNCIÓN PARA CREAR PRODUCTO
export const crearIngreso = async (conexion, producto_id, fecha_ingreso, cantidad, lote, vencimiento, precio_costo, precio_venta) => {
    try {
        const [result] = await conexion.query(
            'INSERT INTO ingreso (id, producto_id, fecha_ingreso, cantidad, lote, vencimiento, precio_costo, precio_venta) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [null, producto_id, fecha_ingreso, cantidad, lote, vencimiento, precio_costo, precio_venta]
        );
        console.log("Ingreso insertado con éxito")
        return result
    } catch (err) {
        console.log(err)
    }
}

export const traerTodosIngresos = async (conexion) => {
    try {
        const [results] = await conexion.query(
            "SELECT id, producto_id, DATE_FORMAT(fecha_ingreso, '%Y-%m-%d') AS fecha_ingreso, cantidad, lote, DATE_FORMAT(vencimiento, '%Y-%m-%d') AS vencimiento, precio_costo, precio_venta FROM ingreso"
        )
        console.log(results)
    } catch (err) {
        console.log(err)
    }
}

// FUNCIÓN PARA TRAER LOS PRODUCTOS QUE SE VENCEN A PARTIR DE TAL FECHA
export const rangoVencimientos = async (conexion, fechaInicio, fechaFin) => {
    try {
        const [results] = await conexion.query(
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

//FUNCIÒN PARA SABER EL TOTAL DE LA CANTIDAD DE PRODUCTOS QUE TENEMOS EN CADA CATEGORÌA

export const totalDeProductosPorCategoria = async (conexion) => {
    try {
        const [result] = await conexion.query(
            "SELECT c. nombre, i.cantidad as ingresos, e.cantidad as egresos, i.cantidad - e.cantidad as 'stock' FROM ingreso i JOIN producto p ON i.producto_id = p.id JOIN categoria c ON p.categoria_id = c.id join egreso e on p.id = e.producto_id"
        )
        console.log(result)
        return result
    } catch (err) {
        console.log(err)
    }
}

// FUNCIÓN PARA CAMBIAR LOS PRECIOS DE LOS PRODUCTOS (CON PORCENTAJE)
export const subirPrecioProducto = async (conexion, ids, porcentaje) => {
    try {

        const valorPorcentaje = parseFloat(porcentaje ?? 0)

        // valido que ids sea un array o que no esté vacío
        if (!Array.isArray(ids) || ids.length === 0) {
            throw new Error("No se han igresado ids de productos")
        }

        const porcentaje_calculado = 1 + (valorPorcentaje/100)

        const [result] = await conexion.query (
            `
            UPDATE ingreso
            SET precio_venta = precio_venta * ?
            WHERE id IN (?)
            `, [porcentaje_calculado, ids]
        )
        return result
    } catch(err) {
        console.log(err)
    }
}

// FUNCIÓN PARA CAMBIAR LOS PRECIOS DE LOS PRODUCTOS (CON PORCENTAJE)
export const bajarPrecioProducto = async (conexion, ids, porcentaje) => {
    try {

        const valorPorcentaje = parseFloat(porcentaje ?? 0)
         // Si el porcentaje no es un número
        if (isNaN(valorPorcentaje)) {
            throw new Error("El porcentaje no es un número válido")
        }

        if (!Array.isArray(ids) || ids.length === 0) {
            throw new Error("Debes proporcionar un array de IDs");
        }

        const porcentaje_calculado = 1 - (valorPorcentaje/100)

        const [result] = await conexion.query (
            `
            UPDATE ingreso
            SET precio_venta = precio_venta * ?
            WHERE id IN (?)
            `, [porcentaje_calculado, ids]
        )
        return result
    } catch(err) {
        console.log(err)
    }
}
