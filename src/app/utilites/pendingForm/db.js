// Get the client
import mysql from 'mysql2/promise';

async function db(query, value)
{
    // Create the connection to database
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'demodatabase',
        password: 'my-secrect-pw',
        port: 3306
    });

    let [result, field] = await connection.query(query, value)
    return result;
}

module.exports=db;