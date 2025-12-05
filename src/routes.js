const { Router } = require("express");
const { login, authAdmin } = require("./controllers/admin-controller");

const router = Router();

// Rotas do administrador
router.get("/login", login);
router.post("/autenticarAdmin", authAdmin);
// Próxima rota -> admin

module.exports = router;