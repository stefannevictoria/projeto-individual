const db = require('../config/db');
const eventModel = require('../models/eventModel');

class EventRepository {
    async findAll() {
        const result = await db.query('SELECT nome, descricao, data, local, duracao_horas, entidade_id FROM evento');
        return result.rows.map(row => new eventModel(row));
    }

    async findById(id) {
        const result = await db.query('SELECT nome, descricao, data, local, duracao_horas, entidade_id FROM evento WHERE id = $1', [id]);
        return result.rows.length ? new eventModel(result.rows[0]) : null;
    }

    async create(event) {
        try {
            const result = await db.query(
                `INSERT INTO evento (nome, descricao, data, local, duracao_horas, entidade_id)
                VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
                [event.nome, event.descricao, event.data, event.local, event.duracao_horas, event.entidade_id]
            );
            return new eventModel(result.rows[0]);
        } catch (error) {
            console.error("Erro no repository:", error.message);
            throw error;
        }
    }

    async update(id, event) {
        const result = await db.query(
            `UPDATE evento
            SET nome = $1, descricao = $2, data = $3, local = $4, duracao_horas = $5, entidade_id = $6
            WHERE id = $7 RETURNING *`,
            [event.nome, event.descricao, event.data, event.local, event.duracao_horas, event.entidade_id, id]
        );
        return result.rows.length ? new eventModel(result.rows[0]) : null;
    }

    async delete(id) {
        await db.query('DELETE FROM evento WHERE id = $1', [id]);
    }

}

module.exports = new EventRepository();