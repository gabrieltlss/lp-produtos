const { clientFunc, poolFunc } = require("../database/database");

const pool = poolFunc();

async function getAdminDb(email) {
    return pool.execute("SELECT * FROM user WHERE email = ?;", [email]);
}

async function createAdminDb(email, password) {
    return pool.execute(
        "INSERT INTO user (email, password) VALUES (?, ?);",
        [email, password]
    );
}

async function deleteAdminDb(email) {
    try {
        const [result] = await pool.execute("DELETE FROM user WHERE email = ?;");
        return result;
    } catch (error) {
        throw new Error("Erro ao excluir usuário.");
    }
}

module.exports = { getAdminDb, createAdminDb, deleteAdminDb };