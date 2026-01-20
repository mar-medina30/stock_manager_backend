import conexion_db from "./conexion_db.js"

export const traerTodosProductos = async (conexion) => {
    try {
        const [results] = await conexion.query(
            'SELECT * FROM `producto`'
        );
        console.log(results)
        return results
    } catch (err) {
        console.log(err)
    }
}

// FUNCIÓN PARA CREAR PRODUCTO
export const crearProducto = async (conexion, nombre, categoria_id, activo) => {
    try {
        const [result] = await conexion.query(
            'INSERT INTO producto (id, nombre, categoria_id, activo) VALUES (?, ?, ?, ?)',
            [null, nombre, categoria_id, activo]
        );
        console.log("Producto insertado con éxito")
        return result
    } catch (err) {
        console.log(err)
    }
}

// FUNCION PARA TRAER UN PRODUCTO POR SU ID
export const traerProductoPorID = async (conexion, id_a_buscar) => {
    try {
        const [results] = await conexion.query(
            "SELECT * FROM producto WHERE id=?", [id_a_buscar]
        )
        console.log(results)
        return results
    } catch (err) {
        console.log(err)
    }
}

// FUNCIÓN PARA TRAER TODOS LOS PRODUCTOS POR SU CATEGORÍA
export const traerProductoPorCategoria = async (conexion, categoria_a_buscar) => {
    try {
        const [results] = await conexion.query(
            `SELECT p.nombre AS producto, c.nombre AS categoria, p.activo
            FROM producto
            AS p JOIN categoria AS c ON p.categoria_id=c.id
            WHERE c.nombre=?`, [categoria_a_buscar]
        )
        console.log(results)
        return results
    } catch (err) {
        console.log(err)
    }
}

// FUNCIÓN PARA DAR DE BAJA UN PRODUCTO
export const eliminarProducto = async (conexion, producto_id) => {
    try {
        const [result] = await conexion.query(
            "UPDATE producto SET activo = 0 WHERE id = ?",
            [producto_id]
        )
        console.log("Producto dado de baja")
        return true
    } catch (err) {
        console.log(err)
    }
}

// FUNCIÓN PARA MODIFICAR UN PRODUCTOS
export const modificarProducto = async (conexion, id, nombre, categoria_id, activo) => {
    try {
        // IFNULL para que si el dato llega como null, mantenga el original
        const [result] = await conexion.query(
            `UPDATE producto 
             SET nombre = IFNULL(?, nombre), 
                 categoria_id = IFNULL(?, categoria_id), 
                 activo = IFNULL(?, activo)
             WHERE id = ?`,
            [nombre || null, categoria_id || null, activo ?? null, id]
        )
        console.log(result)
        return result
    } catch (err) {
        console.log("Error en DB:", err)
        throw err
    }
}