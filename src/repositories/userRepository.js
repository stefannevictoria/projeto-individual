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
        const campos = [];
        const valores = [];
        let i = 1;

        if (user.nome) {
            campos.push(`nome = $${i++}`);
            valores.push(user.nome);
        }

        if (user.email) {
            campos.push(`email = $${i++}`);
            valores.push(user.email);
        }

        if (user.senha_hash) {
            campos.push(`senha_hash = $${i++}`);
            valores.push(user.senha_hash);
        }

        if (campos.length === 0) {
            throw new Error('Nenhum dado para atualizar');
        }

        const query = `UPDATE usuario SET ${campos.join(', ')} WHERE id = $${i} RETURNING *`;
        valores.push(id);

        const result = await db.query(query, valores);
        return result.rows.length ? new userModel(result.rows[0]) : null;
    }


    async delete(id) {
        await db.query('DELETE FROM usuario WHERE id = $1', [id]);
    }

    async findByEmail(email) {
        const result = await db.query(
            'SELECT id, nome, email, senha_hash FROM usuario WHERE email = $1',
            [email]
        );
        return result.rows.length ? new userModel(result.rows[0]) : null;
    }

}

module.exports = new UserRepository();
