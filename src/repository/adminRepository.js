const { clientFunc, poolFunc } = require("../database/database");

const pool = poolFunc();

// Funções para usuário administrados
async function getAdmin(email) {
    const [usuario] = await pool.execute(
        "SELECT * FROM usuario WHERE email = ?;",
        [email]
    );
    return usuario[0];
}

async function createAdmin(email, senha) {
    // MySQL não possui função 'returning'. Pensa noutra solução.
    const [resposta] = await pool.execute(
        "INSERT INTO usuario (email, senha) VALUES (?, ?);",
        [email, senha]
    );
    return resposta;
}

async function deleteAdmin(email) {
    const [resposta] = await pool.execute("DELETE FROM usuario WHERE email = ?;");
    return resposta;
}

module.exports = { getAdmin, createAdmin, deleteAdmin };