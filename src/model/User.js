class User {
    #id
    #email
    #password

    constructor(id, email, password) {
        this.#id = id;
        this.#email = email;
        this.#password = password;
    }

    // Métodos para obter informações do usuário.
    getInfo() {
        return { id: this.#id, email: this.#email }
    }
}

module.exports = { User };