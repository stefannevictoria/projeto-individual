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

}

module.exports = new EntityRepository();