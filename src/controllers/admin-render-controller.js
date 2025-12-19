function loginPage(req, res) {
    try {
        res.render("login");
    } catch (error) {
        res.status(500).json({ error: "Erro ao renderizar página." });
    }
}

function adminPage(req, res) {
    try {
        res.render("admin");
    } catch (error) {
        res.status(500).json({ error: "Erro ao renderizar página." });
    }
}

//  === PRODUCT ===

function createProductPage(req, res) {
    try {
        res.render("create-product");
    } catch (error) {
        res.status(500).json({ error: "Erro ao renderizar página." });
    }
}

//  === CATEGORY ===

function createCategoryPage(req, res) {
    try {
        res.render("create-category");
    } catch (error) {
        res.status(500).json({ error: "Erro ao renderizar página." });
    }
}

module.exports = { loginPage, adminPage, createProductPage, createCategoryPage };