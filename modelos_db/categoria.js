export const traerTodasCategorias = async (conexion) => {
  try {
    const [results, fields] = await conexion.query(
      'SELECT * FROM `categoria`'
    )

    console.log(results)
  } catch (err) {
    console.log(err)
  }
}

export const crearCategoria = async (conexion, nombre) => {
  try {
    const [result] = await conexion.query(
      `
        INSERT INTO categoria (nombre) VALUES (?)
        `, [nombre]
    )
    console.log(`Categoría ${nombre} creada con éxito!`)
    return result
  } catch (err) {
    console.log(err)
  }
}

//FUNCION PARA MODIFICAR UNA CATEGORIA
export const modificarCategoria = async (conexion, id, nombre) => {
  try {
    const [result] = await conexion.query(
      `UPDATE categoria SET nombre = ? WHERE id = ?`,
      [nombre, id]
    );

    if (result.affectedRows === 0) {
      console.log("No se encontró ninguna categoría con ese ID.");
    } else {
      console.log("Categoría actualizada con éxito");
    }

    return result;
  } catch (err) {
    console.error("Error al modificar la categoría:", err);
    throw err;
  }
}


// A simple SELECT query

/*try {
  const [results, fields] = await connection.query(
    'SELECT * FROM `categoria` WHERE id=?',
    [2]
  );

  console.log(results); // results contains rows returned by server
  console.log(fields); // fields contains extra meta data about results, if available
} catch (err) {
  console.log(err);
}finally {
}
*/