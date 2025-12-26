const { poolFunc } = require("../database/database");

const pool = poolFunc();

function getAllProductsDb() {
    return pool.execute("SELECT * FROM products;");
}

function createProductDb(name, price, url, imgPath, categoryId) {
    return pool.execute(
        "INSERT INTO products (name, price, link, img, category_id) VALUES (?, ?, ?, ?, ?);",
        [name, price, url, imgPath, categoryId]
    );
}

function updateProductDb(name, price, url, imgPath, categoryId, productId) {
    return pool.execute(
        "UPDATE products SET (name, price, link, img, category_id) VALUES (?, ?, ?, ?, ?) WHERE id = ?;",
        [name, price, url, imgPath, categoryId, productId]
    );
}

function deleteProductDb(productId) {
    return pool.execute("DELETE FROM products WHERE id = ?;", [productId]);
}

module.exports = { getAllProductsDb, createProductDb, updateProductDb, deleteProductDb };