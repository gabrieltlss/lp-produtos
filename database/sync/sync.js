const mysql = require("mysql2/promise");

async function sincronizar() {
    try {
        const conexao = await mysql.createConnection({
            host: "",
            user: "",
            password: "",
            database: ""
        })
    } catch (error) {

    }
}