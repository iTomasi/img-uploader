import mysql from "mysql";
import secret from "../config/secret";

const connection = mysql.createPool({
    host: secret.mysql.host,
    port: secret.mysql.port,
    user: secret.mysql.user,
    password: secret.mysql.password,
    database: secret.mysql.database
});

connection.getConnection(err => {
    if (err) return console.log(err)

    console.log("MySQL Connected :)");
});

export default connection;