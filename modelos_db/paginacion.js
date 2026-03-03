// utilidad genérica de paginación para tablas sencillas
// table y columns se concatenan directamente al SQL, así que sólo úsalos con nombres fijos
// whereClause debe incluir la palabra WHERE si se desea filtrar, y params los parámetros correspondientes.
export const paginar = async (
    conexion,
    table,
    page = 1,
    limit = 15,
    columns = '*',
    whereClause = '',
    params = []
) => {
    // calcular offset
    const offset = (page - 1) * limit;

    // obtener total de filas para calcular páginas
    const countSql = `SELECT COUNT(*) AS total FROM ${table} ${whereClause}`;
    const [countRows] = await conexion.query(countSql, params);
    const totalItems = countRows[0]?.total || 0;
    const totalPages = Math.ceil(totalItems / limit);

    // recuperar los datos de la página solicitada
    const dataSql = `SELECT ${columns} FROM ${table} ${whereClause} LIMIT ? OFFSET ?`;
    const [rows] = await conexion.query(dataSql, [...params, limit, offset]);

    return {
        data: rows,
        totalItems,
        totalPages,
        currentPage: page,
        perPage: limit,
    };
};
