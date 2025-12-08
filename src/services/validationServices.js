// Validações de entrada
function validateEmail(email) {
    if (
        email.length === 0 ||
        !email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g)
    ) return false;
    return true;
}

function validatePassword(password) {
    if (
        password.length === 0 || password.length < 8 ||
        password.match(/\s/g) || !password.match(/[0-9]/g) ||
        !password.match(/[a-zA-z]/g) || !password.match(/\W/g)
    ) return false;
    return true;
}

function validateInputs(email, password) {
    const emailRes = validateEmail(email);
    const passwordRes = validatePassword(password);

    if (!emailRes) return { valid: false, error: "E-mail inválido." };
    if (!passwordRes) return { valid: false, error: "Senha inválida." };
    return { valid: true };
}

module.exports = { validateInputs };