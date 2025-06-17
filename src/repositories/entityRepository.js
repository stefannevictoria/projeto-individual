const db = require('../config/db');
const entityModel = require('../models/entityModel');

class EntityRepository {
    async findAll() {
        const result = await db.query('SELECT id, nome, tipo FROM entidade');
        return result.rows.map(row => new entityModel(row));
    }

    async findById(id) {
        const result = await db.query('SELECT id, nome, tipo FROM entidade WHERE id = $1', [id]);
        return result.rows.length ? new entityModel(result.rows[0]) : null;
    }

    async findByUserId(userId) {
    const result = await db.query(`
        SELECT e.*
        FROM entidade e
        JOIN entidade_usuario eu ON eu.entidade_id = e.id
        WHERE eu.usuario_id = $1
    `, [userId]);

    return result.rows.map(row => new entityModel(row));
    }

}

module.exports = new EntityRepository();