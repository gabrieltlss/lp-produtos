const { Router } = require("express");
const { obterUsuario } = require("../repository/repositorioUsuario");

const roteador = Router();

// Rotas do administrador
roteador.get("/admin", async (req, res) => {
    try {
        res.render("login");
    } catch (error) {
        res.status(404).json({ error: "Erro ao renderizar visão." });
    }
});

module.exports = roteador;