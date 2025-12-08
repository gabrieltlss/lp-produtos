const { getAdminDb, createAdminDb } = require("../repository/adminRepository");
const bcrypt = require("bcrypt");

async function getAdmin(email) {
    const [rows] = await getAdminDb(email);
    if (rows.length === 0) return { valid: false, error: "Usuário não existe." };
    return { valid: true, res: rows[0] };
}

async function createAdmin(email, password) {
    const [rows] = await createAdminDb(email, bcrypt.hashSync(password, 10));
    if (typeof rows.insertId !== "number") return { valid: false, error: "Usuário não criado." };
    return { valid: true };
}

function validatePassword(inputPassword, userPassword) {
    const validPassword = bcrypt.compareSync(inputPassword, userPassword);
    if (!validPassword) return { valid: false, error: "Senha incorreta." };
    return { valid: true };
}

module.exports = { getAdmin, createAdmin, validatePassword };