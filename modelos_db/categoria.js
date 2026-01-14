export const traerTodasCategorias = async (conexion) => {
    try {
        const [results, fields] = await conexion.query(
        'SELECT * FROM `categoria`'
    );

    console.log(results);
    } catch (err) {
    console.log(err);
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