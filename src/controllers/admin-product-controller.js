const path = require("node:path");
const { createProduct } = require("../services/productServices");
const { getAllCategories } = require("../services/categoryServices")
const { validateProductFields } = require("../services/validationServices");

//  === Renderização ===
async function createProductPage(req, res) {
    try {
        const getCategories = await getAllCategories();
        if (getCategories.valid === false) {
            res.render("create-product", { message: "Crie categorias antes de criar um produto" });
        }
        res.render("create-product", { categoriesExists: getCategories.valid, categories: getCategories.res });
    } catch (error) {
        res.status(500).json({ error: "Erro ao renderizar página." });
    }
}

async function createNewProduct(req, res) {
    const productName = req.body.name;
    const productPrice = Number(req.body.price);
    const productUrl = req.body.url;
    const imgPath = path.join(__dirname, "../../public", "img", req.body.filepath);
    const productCategory = Number(req.body.category);

    // console.log(productName, productPrice, productUrl, productCategory, imgPath);

    const fields = validateProductFields(productName, productPrice);
    if (fields.valid === false) {
        res.render("create", { errorMessage: fields.error });
        return;
    }

    try {
        const newProduct = await createProduct(productName, productPrice, productUrl, imgPath, productCategory);
        console.log(newProduct);
        if (newProduct.valid === false) {
            res.render("create", { errorMessage: newProduct.error });
            return;
        }
        res.json("Produto criado.");
    } catch (error) {
        // Devo mudar no futuro - Não mostrar mensagem de erro do BD.
        console.log(error.message)
        res.render("create", { errorMessage: error.message });
    }

}

module.exports = { createProductPage, createNewProduct };