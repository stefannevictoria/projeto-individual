class User {
    constructor({ id, nome, email, senha_hash}) {
        this.id = id,
        this.nome = nome,
        this.email = email,
        this.senha_hash = senha_hash
    }
}

module.exports = User;