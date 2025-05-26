class EntityUser {
  constructor({ id, usuario_id, entidade_id, papel }) {
    this.id = id;
    this.usuario_id = usuario_id;
    this.entidade_id = entidade_id;
    this.papel = papel;
  }
}

module.exports = EntityUser;
