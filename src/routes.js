const { Router } = require("express");
const { authAdmin, createNewAdmin, createNewProduct } = require("./controllers/admin-controller");
const { loginAuthMiddleware, adminAuthMiddleware } = require("./middlewares/authMiddleware");
const { loginPage, adminPage, createProductPage, createCategoryPage } = require("./controllers/admin-render-controller");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../public", "img"))
    },
    filename: function (req, file, cb) {
        req.body.filepath = file.originalname;
        cb(null, file.originalname)
    }
});
const uploadImg = multer({ storage: storage });

const router = Router();

// Rotas do administrador
router.get("/login", loginAuthMiddleware, loginPage);
router.post("/authAdmin", authAdmin);
router.get("/admin", adminAuthMiddleware, adminPage);

// Produto
router.get("/admin/product/create", createProductPage);
router.post("/admin/product/create/new", uploadImg.single("image-input"), createNewProduct);
// Categoria
router.get("/admin/category/create", createCategoryPage)

// Rota manual. Incompleta.
router.post("/create", createNewAdmin);

module.exports = router;