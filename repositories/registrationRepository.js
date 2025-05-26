const db = require('../config/db');
const registrationModel = require('../models/registrationModel');

class RegistrationRepository {
    async findAll() {
        const result = await db.query('SELECT usuario_id, evento_id, status_presenca, codigo_checkin FROM inscricao');
        return result.rows.map(row => new registrationModel(row));
    }

    async findById(id) {
        const result = await db.query('SELECT usuario_id, evento_id, status_presenca, codigo_checkin FROM inscricao WHERE id = $1', [id]);
        return result.rows.length ? new registrationModel(result.rows[0]) : null;
    }

    async create(registration) {
        try {
            const result = await db.query(
                `INSERT INTO inscricao (usuario_id, evento_id, status_presenca, codigo_checkin)
                VALUES ($1, $2, $3, $4) RETURNING *`,
                [registration.usuario_id, registration.evento_id, registration.status_presenca, registration.codigo_checkin]
            );
            return new registrationModel(result.rows[0]);
        } catch (error) {
            console.error("Erro no repository:", error.message);
            throw error;
        }
    }

    async update(id, registration) {
        const result = await db.query(
            `UPDATE inscricao
            SET usuario_id = $1, evento_id = $2, status_presenca = $3, codigo_checkin = $4
            WHERE id = $5 RETURNING *`,
            [registration.usuario_id, registration.evento_id, registration.status_presenca, registration.codigo_checkin, id]
        );
        return result.rows.length ? new registrationModel(result.rows[0]) : null;
    }

    async delete(id) {
        await db.query('DELETE FROM inscricao WHERE id = $1', [id]);
    }

}

module.exports = new RegistrationRepository();