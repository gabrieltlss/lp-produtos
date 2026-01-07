const { createProduct, getAllProducts, updateProduct, joinTables } = require("../services/productServices");
const { getAllCategories } = require("../services/categoryServices")
const { validateProductFields } = require("../services/validationServices");

//  === Renderização ===
async function createProductPage(req, res) {
    try {
        const getCategories = await getAllCategories();
        if (getCategories.valid === false) {
            res.render("create-product", { message: "Crie categorias antes de criar um produto" });
            return;
        }
        res.render("create-product", { categoriesExists: getCategories.valid, categories: getCategories.res });
    } catch (error) {
        res.status(500).json({ error: "Erro ao renderizar página." });
    }
}
// Falta-me terminar o tratamento de erro da página acima.

async function updateProductsPage(req, res) {
    let getProducts = null;
    let getCategories = null;

    try {
        getProducts = await getAllProducts();
        if (getProducts.valid === false) {
            res.render("update-product", { message: "Crie produtos para poder atualizá-los." });
            return;
        }

        getCategories = await getAllCategories();
        if (getCategories.valid === false) {
            res.render("update-product", { productsExists: getProducts.valid, products: getProducts.res });
            return;
        }

        const productAndCategories = joinTables(getProducts.res, getCategories.res);

        res.render("update-product", {
            productsExists: getProducts.valid,
            products: productAndCategories,
            categoriesExists: getCategories.valid,
            categories: getCategories.res
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Erro ao renderizar página." });
    }
}


// === Lógica ===
async function createNewProduct(req, res) {
    const productName = req.body.name;
    const productPrice = Number(req.body.price);
    const productUrl = req.body.url;
    const productImg = req.body.filepath;
    const productCategory = Number(req.body.category);

    const fields = validateProductFields(productName, productPrice);
    if (fields.valid === false) {
        res.render("create", { errorMessage: fields.error });
        return;
    }

    try {
        const newProduct = await createProduct(productName, productPrice, productUrl, productImg, productCategory);
        if (newProduct.valid === false) {
            res.render("create", { errorMessage: newProduct.error });
            return;
        }
        res.json("Produto criado.");
    } catch (error) {
        // Devo mudar no futuro - Não mostrar mensagem de erro do BD.
        console.log(error.message);
        res.render("create", { errorMessage: error.message });
    }

}

async function updateProductController(req, res) {
    const productId = Number(req.body["product-id"]);
    const productName = req.body["product-name"];
    const productPrice = Number(req.body["product-price"]);
    const productUrl = req.body["product-url"];
    const productImg = req.body.filepath;
    const category = req.body["product-category"];
    const productCategory = category === "null" ? null : Number(category);

    let getProducts = null;
    let getCategories = null;

    try {
        getProducts = await getAllProducts();
        if (getProducts.valid === false) {
            res.render("update-product", { message: "Crie produtos para poder atualizá-los." });
            return;
        }

        getCategories = await getAllCategories();
    } catch (error) {
        // Melhorar isto.
        console.log(error.message);
        res.status(500).json({ error: "Erro ao renderizar página." });
    }

    const productExists = getProducts.res.find(prod => +prod.id === productId);
    if (!productExists) {
        if (getCategories.valid === false) {
            res.render("update-product", {
                productsExists: getProducts.valid,
                products: getProducts.res,
                errorMessage: "O produto informado não existe."
            });
            return;
        }

        const productAndCategories = joinTables(getProducts.res, getCategories.res);

        res.render("update-product", {
            productsExists: getProducts.valid,
            products: productAndCategories,
            categoriesExists: getCategories.valid,
            categories: getCategories.res,
            errorMessage: "O produto informado não existe."
        });
        return;
    }

    const updateObj = {
        name: productName,
        price: productPrice,
        url: productUrl,
        img: productImg ? productImg : productExists.img,
        categoryId: productCategory,
        productId: productId
    };

    let updatedProduct = null;
    try {
        updatedProduct = await updateProduct(updateObj);

    } catch (error) {
        if (getCategories.valid === false) {
            res.render("update-product", {
                productsExists: getProducts.valid,
                products: getProducts.res,
                errorMessage: "Erro ao atualizar produto."
            });
            return;
        }

        const productAndCategories = joinTables(getProducts.res, getCategories.res);

        res.render("update-product", {
            productsExists: getProducts.valid,
            products: productAndCategories,
            categoriesExists: getCategories.valid,
            categories: getCategories.res,
            errorMessage: "Erro ao atualizar produto."
        });
    }

    if (updatedProduct.valid === false) {
        if (getCategories.valid === false) {
            res.render("update-product", {
                productsExists: getProducts.valid,
                products: getProducts.res,
                errorMessage: updatedProduct.error
            });
            return;
        }

        const productAndCategories = joinTables(getProducts.res, getCategories.res);

        res.render("update-product", {
            productsExists: getProducts.valid,
            products: productAndCategories,
            categoriesExists: getCategories.valid,
            categories: getCategories.res,
            errorMessage: updatedProduct.error
        });
        return;
    }
    res.redirect("/admin/product/update");
    return;
}

module.exports = { createProductPage, createNewProduct, updateProductsPage, updateProductController };