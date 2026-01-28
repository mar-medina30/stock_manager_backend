import mysql from 'mysql2/promise';

// Creamos el pool una sola vez fuera de la función (esto se ejecuta al cargar el archivo)
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'db_app',
    password: 'admin',
    waitForConnections: true,
    connectionLimit: 10, // Hasta 10 conexiones simultáneas
    queueLimit: 0
});

export default async () => {
    // Simplemente devolvemos el pool (o una conexión del pool)
    // El pool ya maneja la lógica de "si está conectado, úsalo"
    return pool;
}