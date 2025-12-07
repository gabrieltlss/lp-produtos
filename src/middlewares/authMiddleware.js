function authMiddleware(req, res, next) {
    if (req.session.user) {
        res.redirect("/admin");
    } else {
        next();
    }
}

module.exports = { authMiddleware };