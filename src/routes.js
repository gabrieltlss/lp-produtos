const { Router } = require("express");
const { login, authAdmin } = require("./controllers/admin-controller");
const { authMiddleware } = require("./middlewares/authMiddleware");

const router = Router();

// Rotas do administrador
router.get("/login", authMiddleware, login);
router.post("/authAdmin", authAdmin);
// Próxima rota -> admin

module.exports = router;