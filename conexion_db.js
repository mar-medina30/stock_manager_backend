// Create the connection to database
import mysql from 'mysql2/promise';

export default async () => {
    return await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'db_app',
        password: 'admin',
    });
}