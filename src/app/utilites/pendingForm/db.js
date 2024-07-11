// Get the client
import mysql from 'mysql2/promise';

// import getDatabaseCredentials from '../secrectManager'; // Adjust the path as needed

async function db(query, value)
{
    // const credentials = await getDatabaseCredentials();
    // Create the connection to database
    const connection = await mysql.createConnection({
        host: "34.122.80.169",
        user: "root",
        database: "development",
        password: "1d'zCnLg^n`157I$st]Q",
        port: 3306,
        waitForConnections: true
    });

    let [result, field] = await connection.query(query, value)
    return result;
}

module.exports=db;