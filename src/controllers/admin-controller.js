const { loginUser, createUser } = require("../services/adminServices");

function loginPage(req, res) {
    try {
        res.render("login");
    } catch (error) {
        res.status(500).json({ error: "Erro ao renderizar página." });
    }
}

async function authAdmin(req, res) {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const user = await loginUser(email, password);
        req.session.user = user.getInfo();
        res.redirect("/admin");
    } catch (error) {
        res.render("login", { errorMessage: error.message });
    }
}

function adminPage(req, res) {
    try {
        res.render("admin");
    } catch (error) {
        res.status(500).json({ error: "Erro ao renderizar página." });
    }
}

async function create(req, res) {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const create = await createUser(email, password);
        if (typeof create.insertId === "number") {
            res.json({ status: "Usuário criado." });
        } else {
            res.json({ status: "Usuário não criado." });
        }
    } catch (error) {
        res.json(error.message);
        // Carregarei a página de criação de usuário.
        // Só um usuário admin poderá criar outro usuário.
        // Checar sessão antes de criar usuário.
    }
}

module.exports = { loginPage, authAdmin, adminPage, create };