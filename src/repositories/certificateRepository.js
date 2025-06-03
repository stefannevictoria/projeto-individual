const db = require('../config/db');
const certificateModel = require('../models/certificateModel');

class CertificateRepository {
    async findAll() {
        const result = await db.query('SELECT id, usuario_id, evento_id, link_pdf, data_emissao FROM certificado');
        return result.rows.map(row => new certificateModel(row));
    }

    async findById(id) {
        const result = await db.query('SELECT id, usuario_id, evento_id, link_pdf, data_emissao FROM certificado WHERE id = $1', [id]);
        return result.rows.length ? new certificateModel(result.rows[0]) : null;
    }

}

module.exports = new CertificateRepository();