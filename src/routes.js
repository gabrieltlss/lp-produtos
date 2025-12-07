const { Router } = require("express");
const { loginPage, authAdmin, create, adminPage } = require("./controllers/admin-controller");
const { authMiddleware } = require("./middlewares/authMiddleware");

const router = Router();

// Rotas do administrador
router.get("/login", authMiddleware, loginPage);
router.post("/authAdmin", authAdmin);
router.get("/admin", adminPage);
router.post("/create", create); // Incompleta.

module.exports = router;