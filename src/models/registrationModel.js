class Registration {
    constructor({ id, usuario_id, evento_id, status_presenca, codigo_checkin}) {
        this.id = id;
        this.usuario_id = usuario_id;
        this.evento_id = evento_id;
        this.status_presenca = status_presenca;
        this.codigo_checkin = codigo_checkin
    }
  }

module.exports = Registration;