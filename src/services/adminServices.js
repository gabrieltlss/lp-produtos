const { User } = require("../model/User");
const { getAdmin, createAdmin } = require("../repository/adminRepository");
const bcrypt = require("bcrypt");

/**
 * 
 * @param {string} email 
 * @param {string} password
 */

function validateCredentials(email, password) {
    if (
        email.length === 0 ||
        !email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g)
    ) { throw new Error("Formato de e-mail inválido.") }

    if (
        password.length === 0 || password.length < 8 ||
        password.match(/\s/g) || !password.match(/[0-9]/g) ||
        !password.match(/[a-zA-z]/g) || !password.match(/\W/g)
    ) { throw new Error("Formato de senha inválida") }
}

async function getUser(email) {
    const userExist = await getAdmin(email);
    if (!userExist) throw new Error("Usuário não existe.");
    return userExist;
}

async function loginUser(userEmail, userPassword) {
    validateCredentials(userEmail, userPassword);
    const user = await getUser(userEmail);
    const { id, email, password } = user;
    const checkPassword = bcrypt.compareSync(userPassword, password);
    if (!checkPassword) throw new Error("Senha incorreta.");
    return new User(id, email, password);
}

async function createUser(userEmail, userPassword) {
    validateCredentials(userEmail, userPassword);
    const userExist = await getAdmin(userEmail);
    if (userExist) throw new Error("Usuário já existe.");
    const result = await createAdmin(userEmail, bcrypt.hashSync(userPassword, 10));
    return result;
}

module.exports = { loginUser, createUser };