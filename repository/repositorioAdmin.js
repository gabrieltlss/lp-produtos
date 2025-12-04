const { clientFunc, poolFunc } = require("../database/bancoDeDados");

const pool = poolFunc();

// Funções para usuário administrados
async function obterAdmin(email) {
    const [usuario] = await pool.execute(
        "SELECT * FROM usuario WHERE email = ?;",
        [email]
    );
    return usuario[0];
}

async function criarAdmin(email, senha) {
    // MySQL não possui função 'returning'. Pensa noutra solução.
    const [resposta] = await pool.execute(
        "INSERT INTO usuario (email, senha) VALUES (?, ?);",
        [email, senha]
    );
    return resposta;
}

async function excluirAdmin(email) {
    const [resposta] = await pool.execute("DELETE FROM usuario WHERE email = ?;");
    return resposta;
}

module.exports = { obterAdmin, criarAdmin, excluirAdmin };