const { clientFunc, poolFunc } = require("../database/database");

const pool = poolFunc();

// Funções para usuário administrados
async function getAdmin(email) {
    try {
        const [user] = await pool.execute(
            "SELECT * FROM user WHERE email = ?;",
            [email]
        );
        return user[0];
    } catch (error) {
        throw new Error("Erro ao obter usuário.");
    }
}

async function createAdmin(email, password) {
    try {
        const [result] = await pool.execute(
            "INSERT INTO user (email, password) VALUES (?, ?);",
            [email, password]
        );
        return result;
    } catch (error) {
        throw new Error("Erro ao criar usuário.");
    }
}

async function deleteAdmin(email) {
    try {
        const [result] = await pool.execute("DELETE FROM user WHERE email = ?;");
        return result;
    } catch (error) {
        throw new Error("Erro ao excluir usuário.");
    }
}

module.exports = { getAdmin, createAdmin, deleteAdmin };