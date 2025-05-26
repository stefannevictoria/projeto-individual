const db = require("../config/db");
const EntityUser = require("../models/entityUserModel");

class EntityUserRepository {
  async findAll() {
    const result = await db.query(
      "SELECT id, usuario_id, entidade_id, papel FROM entidade_usuario"
    );
    return result.rows.map((row) => new EntityUser(row));
  }

  async findById(id) {
    const result = await db.query(
      "SELECT id, usuario_id, entidade_id, papel FROM entidade_usuario WHERE id = $1",
      [id]
    );
    return result.rows.length ? new EntityUser(result.rows[0]) : null;
  }

  async create(entityUser) {
    try {
      const result = await db.query(
        `INSERT INTO entidade_usuario (usuario_id, entidade_id, papel)
         VALUES ($1, $2, $3) RETURNING *`,
        [entityUser.usuario_id, entityUser.entidade_id, entityUser.papel]
      );
      return new EntityUser(result.rows[0]);
    } catch (error) {
      console.error("Erro no repository:", error.message);
      throw error;
    }
  }

  async update(id, entityUser) {
    const result = await db.query(
      `UPDATE entidade_usuario
       SET usuario_id = $1, entidade_id = $2, papel = $3
       WHERE id = $4 RETURNING *`,
      [entityUser.usuario_id, entityUser.entidade_id, entityUser.papel, id]
    );
    return result.rows.length ? new EntityUser(result.rows[0]) : null;
  }

  async delete(id) {
    await db.query("DELETE FROM entidade_usuario WHERE id = $1", [id]);
  }
}

module.exports = new EntityUserRepository();
