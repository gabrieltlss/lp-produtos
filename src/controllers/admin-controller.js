function login(req, res) {
    try {
        res.render("login");
    } catch (error) {
        res.status(404).json({ error: "Erro ao renderizar visão." });
    }
}

function authAdmin(req, res) {
    try {
        // Fazer limpeza dos dados recebidos pelo formulário (Depois).

    } catch (error) {

    }
}

module.exports = { login, authAdmin };