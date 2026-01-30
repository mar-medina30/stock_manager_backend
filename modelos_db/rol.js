import conexion_db from "./conexion_db.js"

// FUNCIÓN PARA CREAR UN NUEVO ROL
export const crearRol = async (conexion, nombre) => {
    try {
        const [result] = await conexion.query(
            'INSERT INTO rol (id, nombre) VALUES (?, ?)',
            [null, nombre]
        )
        console.log("Rol insertado con éxito")
        return result
    } catch (err) {
        console.error("Error en crearRol:", err)
        throw err
    }
}

export const obtenerRolPorNombre = async (conexion, nombre) => {
    try {
        const [results] = await conexion.query(
            'SELECT * FROM rol WHERE nombre = ? LIMIT 1',
            [nombre]
        )
        if (results.length === 0) return null
        return results[0]
    } catch (err) {
        console.error("Error en obtenerRolPorNombre:", err)
        throw err
    }
}

export default { crearRol, obtenerRolPorNombre }
