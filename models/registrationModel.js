class Registration {
    constructor({ id = null, usuario_id, entidade_id, status_presenca, codigo_checkin}) {
        this.id = id;
        this.usuario_id = usuario_id;
        this.entidade_id = entidade_id;
        this.status_presenca = status_presenca;
        this.codigo_checkin = codigo_checkin
    }
  }

  module.exports = Registration;