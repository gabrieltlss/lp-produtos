class User {
    #id
    #email
    #password
    #createdAt

    constructor(id, email, password, createdAt) {
        this.#id = id;
        this.#email = email;
        this.#password = password;
        this.#createdAt = createdAt;
    }

    // Métodos para obter informações do usuário.
}

module.exports = User;