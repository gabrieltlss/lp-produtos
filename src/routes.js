const { Router } = require("express");
const { paginaEntrada, autenticarAdmin } = require("../controllers/controladorAdmin");

const roteador = Router();

// Rotas do administrador
roteador.get("/login", paginaEntrada);
roteador.post("/autenticarAdmin", autenticarAdmin);
// Próxima rota -> admin

module.exports = roteador;