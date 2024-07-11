// Get the client
import mysql from 'mysql2/promise';

import getDatabaseCredentials from '../secrectManager'; // Adjust the path as needed

async function db(query, value)
{
    const credentials = await getDatabaseCredentials();
    // Create the connection to database
    const connection = await mysql.createConnection({
        host: credentials.host,
        user: credentials.username,
        database: credentials.database,
        password: credentials.password,
        port: credentials.port,
        waitForConnections: true
    });

    let [result, field] = await connection.query(query, value)
    return result;
}

module.exports=db;