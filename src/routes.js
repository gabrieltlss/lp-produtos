const dotenv = require("dotenv");
dotenv.config();
const { Router } = require("express");

const roteador = Router();

roteador.get("/", (req, res) => {
    res.render("test");
});

module.exports = roteador;