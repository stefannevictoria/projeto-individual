const db = require('../config/db');
const userModel = require('../models/userModel');

class UserRepository {
    async findAll() {
        const result = await db.query('SELECT id, nome, email, senha_hash FROM usuario');
        return result.rows.map(row => new userModel(row));
    }

    async findById(id) {
        const result = await db.query('SELECT id, nome, email, senha_hash FROM usuario WHERE id = $1', [id]);
        return result.rows.length ? new userModel(result.rows[0]) : null;
    }

    async create(user) {
        try {
            const result = await db.query(
                `INSERT INTO usuario (nome, email, senha_hash)
                VALUES ($1, $2, $3) RETURNING *`,
                [user.nome, user.email, user.senha_hash]
            );
            return new userModel(result.rows[0]);
        } catch (error) {
            console.error("Erro no repository:", error.message);
            throw error;
        }
    }

    async update(id, user) {
        const result = await db.query(
            `UPDATE usuario
            SET nome = $1, email = $2, senha_hash = $3
            WHERE id = $4 RETURNING *`,
            [user.nome, user.email, user.senha_hash, id]
        );
        return result.rows.length ? new userModel(result.rows[0]) : null;
    }

    async delete(id) {
        await db.query('DELETE FROM usuario WHERE id = $1', [id]);
    }

}

module.exports = new UserRepository();
