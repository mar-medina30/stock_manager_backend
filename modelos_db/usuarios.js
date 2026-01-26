import conexion_db from "./conexion_db.js"

// FUNCIÓN PARA CREAR UN NUEVO USUARIO
export const crearUsuario = async (conexion, nombre, email, password_hash) => {
    try {
        const [result] = await conexion.query(
            'INSERT INTO usuario (id, nombre, email, password_hash) VALUES (?, ?, ?, ?)',
            [null, nombre, email, password_hash]
        )
        console.log("Usuario insertado con éxito")
        return result
    } catch (err) {
        console.error("Error en crearUsuario:", err)
        throw err
    }
}

// FUNCIÓN PARA OBTENER UN USUARIO POR EMAIL
export const obtenerUsuarioPorEmail = async (conexion, email) => {
    try {
        const [results] = await conexion.query(
            'SELECT * FROM usuario WHERE email = ? LIMIT 1',
            [email]
        )
        if (results.length === 0) return null
        return results[0]
    } catch (err) {
        console.error("Error en obtenerUsuarioPorEmail:", err)
        throw err
    }
}
