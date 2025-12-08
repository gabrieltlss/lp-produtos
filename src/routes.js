const { Router } = require("express");
const { loginPage, authAdmin, create, adminPage } = require("./controllers/admin-controller");
const { loginAuthMiddleware, adminAuthMiddleware } = require("./middlewares/authMiddleware");

const router = Router();

// Rotas do administrador
router.get("/login", loginAuthMiddleware, loginPage);
router.post("/authAdmin", authAdmin);
router.get("/admin", adminAuthMiddleware, adminPage);
router.post("/create", create); // Incompleta.

module.exports = router;