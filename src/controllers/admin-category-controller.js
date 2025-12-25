const { getAllCategories, createCategory, deleteCategory } = require("../services/categoryServices");

// === Render category related pages ===
async function createCategoryPage(req, res) {
    try {
        const getCategories = await getAllCategories();
        if (getCategories.valid === false) {
            res.render("create-category", { message: getCategories.error });
            return;
        }
        res.render("create-category", { categoryExist: getCategories.valid, categories: getCategories.res });
    } catch (error) {
        res.redirect("/error");
    }
}

async function deleteCategoryPage(req, res) {
    try {
        const getCategories = await getAllCategories();
        if (getCategories.valid === false) {
            res.render("delete-category", { message: getCategories.error });
            return;
        }
        res.render("delete-category", { categoryExist: getCategories.valid, categories: getCategories.res });
    } catch (error) {
        res.redirect("/error");
    }
}

// === Category CRUD logic ===
async function createNewCategory(req, res) {
    const categoryName = req.body["category-name"];
    try {
        let getCategories = await getAllCategories();

        if (getCategories.valid === false) {
            const createdCategory = await createCategory(categoryName);
            if (createdCategory.valid === false) {
                res.render("create-category", {
                    creationError: createdCategory.error,
                    message: getCategories.error
                });
                return;
            }
            res.redirect("/admin/category/create");
            return;
        }

        const categoryExist = getCategories.res.find(c => c.name === categoryName);
        if (categoryExist) {
            res.render("create-category", {
                categoryExist: getCategories.valid,
                categories: getCategories.res,
                creationError: "Esta categoria já existe."
            });
            return;
        }

        const createdCategory = await createCategory(categoryName);
        if (createdCategory.valid === false) {
            res.render("create-category", {
                categoryExist: getCategories.valid,
                categories: getCategories.res,
                creationError: createdCategory.error
            });
            return;
        }
        res.redirect("/admin/category/create");
    } catch (error) {
        res.redirect("/error");
    }
}

async function deleteInformedCategory(req, res) {
    const categoryId = Number(req.body["category-id"]);
    try {
        // Não preciso cheacar se categorias existem, graças à chacagem no ejs.
        let getCategories = await getAllCategories();
        const informedCategoryExists = getCategories.res.find(c => c.id === categoryId);
        if (!informedCategoryExists) {
            res.render("delete-category", {
                categoryExist: getCategories.valid,
                categories: getCategories.res,
                deletionError: "A categoria informada não existe"
            });
            return;
        }

        // Deletar categoria
        const deleteInformedCategory = await deleteCategory(categoryId);
        if (deleteInformedCategory.valid === false) {
            res.render("delete-category", {
                categoryExist: getCategories.valid,
                categories: getCategories.res,
                deletionError: deleteInformedCategory.error
            });
            return;
        }

        res.redirect("/admin/category/delete");
    } catch (error) {
        res.redirect("/error");
    }
}

module.exports = { createCategoryPage, createNewCategory, deleteCategoryPage, deleteInformedCategory };